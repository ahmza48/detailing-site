/**
 * Builds the watermarked drawing excerpts in public/proof-of-work from the
 * confidential source PDFs, which stay outside this repository.
 *
 *   npm run proof                       (sources in ../petrohill-proof-of-work)
 *   PROOF_OF_WORK_DIR=D:\pdfs npm run proof
 *
 * Needs Poppler's pdftoppm on PATH (or PDFTOPPM pointing at it).
 *
 * The page never receives more than these files, so this script is the real
 * protection: each image is cropped clear of title blocks, logos, drawing
 * numbers and margin notices, reduced to a size that shows the work but cannot
 * be used to build from, and has the watermark burned in behind the linework.
 * Check every crop by eye after changing one. Filenames are content hashes, so
 * they say nothing about the source sheet.
 */
import { execFile } from "node:child_process";
import { createHash } from "node:crypto";
import { mkdir, mkdtemp, readdir, readFile, rm, stat, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";
import sharp from "sharp";

const run = promisify(execFile);
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const sourceDir = path.resolve(root, process.env.PROOF_OF_WORK_DIR ?? "../petrohill-proof-of-work");
const pdftoppm = process.env.PDFTOPPM ?? "pdftoppm";
const outDir = path.join(root, "public/proof-of-work");
const assetsFile = path.join(root, "src/lib/proof-of-work-assets.json");
/**
 * Lives beside the PDFs, not in this public repository, because the filenames identify the sheets.
 * Each entry: { id, pdf, page, crop: [left, top, width, height], rotate?, mask?: [[left, top, width, height]] }.
 * `crop` is in fractions of the page after `rotate`; `mask` whites out leftovers, in fractions of the crop.
 * Captions, alt text and placement for each id are in src/lib/proof-of-work.ts.
 */
const manifestFile = path.join(sourceDir, "proof-of-work.manifest.json");

const WIDTH = 1000;
const HEIGHT = 625;
const RENDER_LONG_EDGE = 3000;
const WEBP_QUALITY = 62;
const WATERMARK_LOGO = path.join(root, "public/logo/petrohill-logo.png");
const WATERMARK_WIDTH = 560;
const WATERMARK_OPACITY = 0.17;

/** White sheet with one faint, centred logo; the drawing is multiplied over it so lines stay on top. */
async function watermarkBackground() {
  const logo = await sharp(WATERMARK_LOGO)
    .resize({ width: WATERMARK_WIDTH })
    .composite([
      {
        input: Buffer.from([255, 255, 255, Math.round(255 * WATERMARK_OPACITY)]),
        raw: { width: 1, height: 1, channels: 4 },
        tile: true,
        blend: "dest-in",
      },
    ])
    .png()
    .toBuffer();
  return sharp({ create: { width: WIDTH, height: HEIGHT, channels: 3, background: "#ffffff" } })
    .composite([{ input: logo, gravity: "centre" }])
    .png()
    .toBuffer();
}

const maskPatch = ([left, top, width, height]) => ({
  input: {
    create: {
      width: Math.round(width * WIDTH),
      height: Math.round(height * HEIGHT),
      channels: 3,
      background: "#ffffff",
    },
  },
  left: Math.round(left * WIDTH),
  top: Math.round(top * HEIGHT),
});

async function renderPage(pdf, page, workDir) {
  const prefix = path.join(workDir, createHash("sha1").update(`${pdf}#${page}`).digest("hex"));
  await run(pdftoppm, [
    "-f", String(page),
    "-l", String(page),
    "-singlefile",
    "-png",
    "-scale-to", String(RENDER_LONG_EDGE),
    path.join(sourceDir, pdf),
    prefix,
  ], { maxBuffer: 1 << 24 });
  return `${prefix}.png`;
}

async function buildExcerpt(item, workDir, background) {
  const png = await renderPage(item.pdf, item.page, workDir);
  const rotated = await sharp(png).rotate(item.rotate ?? 0).flatten({ background: "#ffffff" }).png().toBuffer();
  const { width, height } = await sharp(rotated).metadata();
  const [left, top, cropWidth, cropHeight] = item.crop;
  const excerpt = await sharp(rotated)
    .extract({
      left: Math.round(left * width),
      top: Math.round(top * height),
      width: Math.round(cropWidth * width),
      height: Math.round(cropHeight * height),
    })
    .resize(WIDTH, HEIGHT, { fit: "contain", background: "#ffffff", kernel: "lanczos3" })
    // Thin CAD lines fade when reduced; this keeps them dark against the watermark.
    .linear(1.25, -60)
    .composite((item.mask ?? []).map(maskPatch))
    .png()
    .toBuffer();
  const image = await sharp(background)
    .composite([{ input: excerpt, blend: "multiply" }])
    .webp({ quality: WEBP_QUALITY, effort: 6 })
    .toBuffer();
  const name = `${createHash("sha256").update(image).digest("hex").slice(0, 20)}.webp`;
  await writeFile(path.join(outDir, name), image);
  return { id: item.id, src: `/proof-of-work/${name}`, bytes: image.length };
}

async function main() {
  await stat(manifestFile).catch(() => {
    throw new Error(`No manifest at ${manifestFile}. Set PROOF_OF_WORK_DIR.`);
  });
  const manifest = JSON.parse(await readFile(manifestFile, "utf8"));
  await mkdir(outDir, { recursive: true });
  for (const file of await readdir(outDir)) await rm(path.join(outDir, file));

  const workDir = await mkdtemp(path.join(tmpdir(), "proof-of-work-"));
  const background = await watermarkBackground();
  const results = [];
  try {
    const queue = [...manifest];
    const worker = async () => {
      for (let item = queue.shift(); item; item = queue.shift()) {
        const result = await buildExcerpt(item, workDir, background);
        results.push(result);
        console.log(`${result.id.padEnd(28)} ${(result.bytes / 1024).toFixed(0).padStart(4)} KB`);
      }
    };
    await Promise.all(Array.from({ length: 4 }, worker));
  } finally {
    await rm(workDir, { recursive: true, force: true });
  }

  const assets = Object.fromEntries(
    manifest.map(({ id }) => [id, results.find((result) => result.id === id).src]),
  );
  await writeFile(assetsFile, `${JSON.stringify(assets, null, 2)}\n`);
  const total = results.reduce((sum, result) => sum + result.bytes, 0);
  console.log(`${results.length} excerpts, ${(total / 1024).toFixed(0)} KB total`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
