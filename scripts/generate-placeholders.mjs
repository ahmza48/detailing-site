/**
 * Generates original placeholder artwork for the site.
 *
 * Every image under /public/images is produced by this script as line-art
 * illustration, so nothing here is a third-party or copyrighted asset.
 * Replace any file with a licensed photograph, model screenshot or approved
 * drawing of the same name and the site picks it up with no code change.
 *
 *   npm run images
 */
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const OUT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "public", "images");

const C = {
  navy950: "#04232E",
  navy900: "#062F3D",
  navy800: "#073846",
  teal: "#075C69",
  tealLight: "#0E7F8F",
  green: "#1FDF98",
  paper: "#F4F7F6",
  mist: "#E8EEEC",
  ink: "#102A31",
  line: "#9FC3C9",
};

/* ---------- helpers ---------- */

function rng(seed) {
  let s = seed >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const n = (v) => Math.round(v * 10) / 10;
const line = (x1, y1, x2, y2, stroke, w = 2, extra = "") =>
  `<line x1="${n(x1)}" y1="${n(y1)}" x2="${n(x2)}" y2="${n(y2)}" stroke="${stroke}" stroke-width="${w}" ${extra}/>`;
const rect = (x, y, w, h, fill, extra = "") =>
  `<rect x="${n(x)}" y="${n(y)}" width="${n(w)}" height="${n(h)}" fill="${fill}" ${extra}/>`;
const circle = (cx, cy, r, fill, extra = "") =>
  `<circle cx="${n(cx)}" cy="${n(cy)}" r="${n(r)}" fill="${fill}" ${extra}/>`;
const poly = (pts, fill, extra = "") =>
  `<polygon points="${pts.map((p) => `${n(p[0])},${n(p[1])}`).join(" ")}" fill="${fill}" ${extra}/>`;
const text = (x, y, str, size, fill, extra = "") =>
  `<text x="${n(x)}" y="${n(y)}" font-family="Arial, Helvetica, sans-serif" font-size="${size}" fill="${fill}" ${extra}>${str}</text>`;

function darkBackdrop(W, H, { horizon = 0.72, glowX = 0.7 } = {}) {
  return `
  <defs>
    <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${C.navy950}"/>
      <stop offset="${horizon}" stop-color="${C.navy800}"/>
      <stop offset="1" stop-color="${C.navy950}"/>
    </linearGradient>
    <radialGradient id="glow" cx="${glowX}" cy="${horizon}" r="0.6">
      <stop offset="0" stop-color="${C.tealLight}" stop-opacity="0.55"/>
      <stop offset="1" stop-color="${C.tealLight}" stop-opacity="0"/>
    </radialGradient>
    <pattern id="grid" width="80" height="80" patternUnits="userSpaceOnUse">
      <path d="M80 0H0V80" fill="none" stroke="${C.line}" stroke-opacity="0.06" stroke-width="1"/>
    </pattern>
  </defs>
  ${rect(0, 0, W, H, "url(#sky)")}
  ${rect(0, 0, W, H, "url(#glow)")}
  ${rect(0, 0, W, H, "url(#grid)")}`;
}

/* ---------- structural primitives ---------- */

/** Braced multi-tier rack elevation. */
function rack(x, base, { bays, bayW, tiers, tierH, stroke, w = 3, fill = "none", pipes = true, r }) {
  let s = "";
  const top = base - tiers * tierH;
  for (let i = 0; i <= bays; i++) s += line(x + i * bayW, base, x + i * bayW, top, stroke, w * 1.4);
  for (let t = 1; t <= tiers; t++) {
    const y = base - t * tierH;
    s += line(x - bayW * 0.12, y, x + bays * bayW + bayW * 0.12, y, stroke, w * 1.2);
    if (pipes) {
      const count = 3 + Math.floor(r() * 4);
      for (let p = 0; p < count; p++) {
        const py = y - 6 - p * w * 2.4;
        s += line(x - bayW * 0.4, py, x + bays * bayW + bayW * 0.4, py, stroke, w * (0.8 + r() * 1.4), `stroke-opacity="0.75"`);
      }
    }
  }
  for (let i = 0; i < bays; i++) {
    if (r() > 0.45) {
      const t = Math.floor(r() * tiers);
      const y0 = base - t * tierH;
      const y1 = y0 - tierH;
      s += line(x + i * bayW, y0, x + (i + 1) * bayW, y1, stroke, w * 0.8);
      s += line(x + (i + 1) * bayW, y0, x + i * bayW, y1, stroke, w * 0.8);
    }
  }
  if (fill !== "none") s = rect(x, top, bays * bayW, tiers * tierH, fill, `fill-opacity="0.25"`) + s;
  return s;
}

/** Process column with ring platforms and ladder. */
function tower(x, base, wd, ht, fill, stroke) {
  let s = rect(x, base - ht, wd, ht, fill, `rx="${wd / 2}"`);
  const rings = Math.max(2, Math.floor(ht / 150));
  for (let i = 1; i <= rings; i++) {
    const y = base - (ht * i) / (rings + 1);
    s += line(x - wd * 0.35, y, x + wd * 1.35, y, stroke, 3);
    s += line(x - wd * 0.35, y, x - wd * 0.35, y - 22, stroke, 2);
    s += line(x + wd * 1.35, y, x + wd * 1.35, y - 22, stroke, 2);
    s += line(x - wd * 0.35, y - 22, x + wd * 1.35, y - 22, stroke, 1.5);
  }
  s += line(x + wd * 1.15, base, x + wd * 1.15, base - ht * 0.92, stroke, 2);
  return s;
}

function stack(x, base, wd, ht, fill) {
  return poly(
    [
      [x, base],
      [x + wd * 0.2, base - ht],
      [x + wd * 0.8, base - ht],
      [x + wd, base],
    ],
    fill,
  );
}

function sphere(cx, base, rad, fill, stroke) {
  let s = circle(cx, base - rad * 1.25, rad, fill);
  for (const dx of [-0.6, -0.2, 0.2, 0.6]) s += line(cx + dx * rad, base, cx + dx * rad, base - rad * 0.9, stroke, 3);
  s += line(cx - rad, base - rad * 1.25, cx + rad, base - rad * 1.25, stroke, 1.5, `stroke-opacity="0.5"`);
  return s;
}

/** Offshore jacket platform with topsides, crane and flare boom. */
function platform(cx, sea, scale, fill, stroke) {
  const k = scale;
  const deckW = 520 * k;
  const jacketTop = sea - 90 * k;
  const jacketBot = sea + 260 * k;
  let s = "";
  // jacket
  const tl = cx - deckW * 0.36, tr = cx + deckW * 0.36;
  const bl = cx - deckW * 0.5, br = cx + deckW * 0.5;
  s += line(tl, jacketTop, bl, jacketBot, stroke, 7 * k);
  s += line(tr, jacketTop, br, jacketBot, stroke, 7 * k);
  s += line(cx, jacketTop, cx, jacketBot, stroke, 5 * k);
  const levels = 4;
  for (let i = 0; i < levels; i++) {
    const f0 = i / levels, f1 = (i + 1) / levels;
    const y0 = jacketTop + (jacketBot - jacketTop) * f0;
    const y1 = jacketTop + (jacketBot - jacketTop) * f1;
    const l0 = tl + (bl - tl) * f0, l1 = tl + (bl - tl) * f1;
    const r0 = tr + (br - tr) * f0, r1 = tr + (br - tr) * f1;
    s += line(l0, y0, r0, y0, stroke, 4 * k);
    s += line(l0, y0, cx, y1, stroke, 3 * k);
    s += line(cx, y0, l1, y1, stroke, 3 * k);
    s += line(r0, y0, cx, y1, stroke, 3 * k);
    s += line(cx, y0, r1, y1, stroke, 3 * k);
  }
  // decks
  const decks = [
    [deckW, 26],
    [deckW * 0.94, 22],
    [deckW * 0.8, 20],
  ];
  let y = jacketTop;
  decks.forEach(([wd, th], i) => {
    s += rect(cx - wd / 2, y - th * k, wd, th * k, fill);
    const modH = (i === 2 ? 70 : 84) * k;
    // modules between decks
    for (let m = 0; m < 5; m++) {
      const mx = cx - wd / 2 + (wd / 5) * m + 10 * k;
      s += rect(mx, y - th * k - modH, wd / 5 - 20 * k, modH, fill, `fill-opacity="${0.55 + (m % 2) * 0.3}"`);
      s += line(mx, y - th * k - modH, mx + wd / 5 - 20 * k, y - th * k, stroke, 1.5 * k, `stroke-opacity="0.5"`);
    }
    for (let c = 0; c <= 6; c++) s += line(cx - wd / 2 + (wd / 6) * c, y - th * k, cx - wd / 2 + (wd / 6) * c, y - th * k - modH, stroke, 3 * k);
    y -= th * k + modH;
  });
  s += rect(cx - deckW * 0.4, y - 14 * k, deckW * 0.8, 14 * k, fill);
  // helideck
  s += rect(cx - deckW * 0.62, y - 46 * k, deckW * 0.3, 10 * k, fill);
  s += line(cx - deckW * 0.5, y - 36 * k, cx - deckW * 0.38, y, stroke, 4 * k);
  s += line(cx - deckW * 0.36, y - 36 * k, cx - deckW * 0.38, y, stroke, 4 * k);
  // crane
  const cb = cx + deckW * 0.18;
  s += rect(cb - 14 * k, y - 120 * k, 28 * k, 120 * k, fill);
  s += rect(cb - 30 * k, y - 150 * k, 60 * k, 34 * k, fill);
  s += line(cb, y - 140 * k, cb + 300 * k, y - 300 * k, stroke, 7 * k);
  s += line(cb, y - 190 * k, cb + 300 * k, y - 300 * k, stroke, 2.5 * k);
  s += line(cb, y - 150 * k, cb, y - 190 * k, stroke, 5 * k);
  s += line(cb + 300 * k, y - 300 * k, cb + 300 * k, y - 170 * k, stroke, 2 * k);
  // flare boom
  const fb = cx - deckW * 0.3;
  s += line(fb, y, fb - 330 * k, y - 250 * k, stroke, 6 * k);
  s += line(fb + 40 * k, y, fb - 330 * k, y - 250 * k, stroke, 3 * k);
  for (let i = 1; i < 7; i++) {
    const f = i / 7;
    s += line(fb - 330 * k * f, y - 250 * k * f, fb + 40 * k - 370 * k * f + 18 * k * f, y - 250 * k * f + 26 * k * (1 - f), stroke, 2 * k);
  }
  return s;
}

/** Isometric steel frame, in the manner of a detailing-model view. */
function isoFrame(ox, oy, { nx, ny, nz, bx, by, bz, palette, w = 4, r }) {
  const P = (i, j, k) => [ox + (i * bx - j * by) * 0.866, oy + (i * bx + j * by) * 0.5 - k * bz];
  const seg = (a, b, stroke, sw) => line(a[0], a[1], b[0], b[1], stroke, sw, `stroke-linecap="round"`);
  let s = "";
  for (let j = ny; j >= 0; j--) {
    for (let i = 0; i <= nx; i++) {
      s += seg(P(i, j, 0), P(i, j, nz), palette.column, w * 1.5);
      for (let k = 1; k <= nz; k++) {
        if (i < nx) s += seg(P(i, j, k), P(i + 1, j, k), palette.beam, w);
        if (j < ny) s += seg(P(i, j, k), P(i, j + 1, k), palette.beam, w);
        if (i < nx && r() > 0.72) {
          s += seg(P(i, j, k - 1), P(i + 1, j, k), palette.brace, w * 0.6);
          s += seg(P(i + 1, j, k - 1), P(i, j, k), palette.brace, w * 0.6);
        }
      }
      // base plate
      const b = P(i, j, 0);
      s += `<ellipse cx="${n(b[0])}" cy="${n(b[1])}" rx="${w * 3}" ry="${w * 1.5}" fill="${palette.column}" fill-opacity="0.5"/>`;
    }
  }
  // secondary beams / pipes on top tier
  for (let i = 0; i < nx; i++) {
    for (let q = 1; q < 4; q++) {
      s += seg(P(i + q / 4, 0, nz), P(i + q / 4, ny, nz), palette.secondary, w * 0.6);
    }
  }
  return s;
}

/** Rebar mat with stirrup section. */
function rebar(x, y, wd, ht, stroke, accent, spacing = 44) {
  let s = rect(x, y, wd, ht, "none", `stroke="${stroke}" stroke-width="4"`);
  for (let i = spacing; i < wd; i += spacing) s += line(x + i, y + 14, x + i, y + ht - 14, stroke, 3);
  for (let j = spacing; j < ht; j += spacing) s += line(x + 14, y + j, x + wd - 14, y + j, accent, 3, `stroke-opacity="0.9"`);
  for (let i = spacing; i < wd; i += spacing)
    for (let j = spacing; j < ht; j += spacing) s += circle(x + i, y + j, 4, stroke);
  return s;
}

/* ---------- scenes ---------- */

function sceneOffshore(W, H, seed, { main = 0.56, scale = 1.25, far = true } = {}) {
  const r = rng(seed);
  const sea = H * 0.68;
  let s = darkBackdrop(W, H, { horizon: 0.68, glowX: main });
  if (far) {
    s += `<g opacity="0.35">${platform(W * (main > 0.5 ? 0.14 : 0.86), sea + 6, scale * 0.28, C.teal, C.tealLight)}</g>`;
  }
  s += rect(0, sea, W, H - sea, C.navy950, `fill-opacity="0.82"`);
  s += `<g>${platform(W * main, sea, scale, "#0A4753", "#3FA3B0")}</g>`;
  s += rect(0, sea + 4, W, H - sea, C.navy950, `fill-opacity="0.62"`);
  for (let i = 0; i < 46; i++) {
    const y = sea + 8 + r() * (H - sea - 10);
    const x = r() * W;
    const len = 40 + r() * 260;
    s += line(x, y, x + len, y, C.line, 1.5, `stroke-opacity="${0.05 + r() * 0.14}"`);
  }
  s += line(0, sea, W, sea, C.line, 1.5, `stroke-opacity="0.35"`);
  return s;
}

function sceneRefinery(W, H, seed, { density = 1, spheres = true, racks = true } = {}) {
  const r = rng(seed);
  const base = H * 0.78;
  let s = darkBackdrop(W, H, { horizon: 0.78, glowX: 0.25 + r() * 0.5 });
  // far layer
  let farLayer = "";
  for (let x = -40; x < W; x += 90 + r() * 120) {
    const ht = 120 + r() * 330;
    farLayer += r() > 0.5 ? tower(x, base, 26 + r() * 22, ht, C.teal, C.tealLight) : stack(x, base, 26 + r() * 16, ht * 1.2, C.teal);
  }
  s += `<g opacity="0.32">${farLayer}</g>`;
  // mid layer
  let mid = "";
  const count = Math.round(6 * density);
  for (let i = 0; i < count; i++) {
    const x = (W / count) * i + r() * 120;
    const ht = 300 + r() * 420;
    mid += tower(x, base, 46 + r() * 34, ht, "#0A4753", "#3FA3B0");
    if (spheres && r() > 0.55) mid += sphere(x + 190, base, 70 + r() * 30, "#0A4753", "#3FA3B0");
  }
  s += `<g opacity="0.85">${mid}</g>`;
  if (racks) {
    s += rack(W * 0.04, base + 36, { bays: 9, bayW: W * 0.105, tiers: 3, tierH: 78, stroke: "#58B7C4", w: 3.4, r });
  }
  s += rect(0, base + 36, W, H - base, C.navy950, `fill-opacity="0.9"`);
  s += line(0, base + 36, W, base + 36, C.line, 2, `stroke-opacity="0.4"`);
  return s;
}

function scenePipeRack(W, H, seed, { tiers = 4 } = {}) {
  const r = rng(seed);
  const base = H * 0.82;
  let s = darkBackdrop(W, H, { horizon: 0.82, glowX: 0.3 });
  s += `<g opacity="0.3">${rack(W * 0.1, base - 30, { bays: 14, bayW: W * 0.06, tiers: 3, tierH: 70, stroke: C.tealLight, w: 2, r })}</g>`;
  s += rack(-W * 0.02, base, { bays: 6, bayW: W * 0.18, tiers, tierH: H * 0.15, stroke: "#58B7C4", w: 5, r });
  s += rect(0, base, W, H - base, C.navy950);
  s += line(0, base, W, base, C.line, 2, `stroke-opacity="0.4"`);
  return s;
}

function sceneModel(W, H, seed, { nx = 5, ny = 2, nz = 3, zoom = 1 } = {}) {
  const r = rng(seed);
  let s = darkBackdrop(W, H, { horizon: 0.6, glowX: 0.5 });
  const bx = 150 * zoom, by = 190 * zoom, bz = 130 * zoom;
  const ox = W / 2 - ((nx * bx - ny * by) * 0.866) / 2;
  const oy = H * 0.56 - ((nx * bx + ny * by) * 0.5) / 2 + (nz * bz) / 2;
  s += isoFrame(ox, oy, {
    nx, ny, nz, bx, by, bz, w: 4 * zoom, r,
    palette: { column: "#58B7C4", beam: "#CFE5E8", brace: C.green, secondary: "#2A8D9A" },
  });
  return s;
}

function sceneRebar(W, H, seed) {
  let s = darkBackdrop(W, H, { horizon: 0.5, glowX: 0.5 });
  s += `<g transform="translate(${W * 0.5} ${H * 0.5}) rotate(-24) skewX(18) translate(${-W * 0.6} ${-H * 0.6})">${rebar(0, 0, W * 1.2, H * 1.2, "#58B7C4", "#CFE5E8", 70)}</g>`;
  s += rect(0, 0, W, H, C.navy950, `fill-opacity="0.35"`);
  void seed;
  return s;
}

function sceneBrownfield(W, H, seed) {
  const r = rng(seed);
  const base = H * 0.8;
  let s = darkBackdrop(W, H, { horizon: 0.8, glowX: 0.6 });
  s += `<g opacity="0.3">${tower(W * 0.08, base, 60, 520, C.teal, C.tealLight)}${tower(W * 0.82, base, 70, 640, C.teal, C.tealLight)}</g>`;
  // existing structure
  s += rack(W * 0.08, base, { bays: 5, bayW: W * 0.14, tiers: 3, tierH: H * 0.16, stroke: "#3F8F9B", w: 4.5, r });
  // new / modified members highlighted
  const x0 = W * 0.08 + W * 0.14 * 5;
  const tierH = H * 0.16;
  const g = `stroke-linecap="square"`;
  s += line(x0, base, x0, base - tierH * 3, C.green, 6, g);
  s += line(x0 + W * 0.14, base, x0 + W * 0.14, base - tierH * 3, C.green, 6, g);
  for (let t = 1; t <= 3; t++) s += line(x0, base - tierH * t, x0 + W * 0.14, base - tierH * t, C.green, 5, g);
  s += line(x0, base, x0 + W * 0.14, base - tierH, C.green, 3.5);
  s += line(x0 + W * 0.14, base, x0, base - tierH, C.green, 3.5);
  s += rect(0, base, W, H - base, C.navy950);
  s += line(0, base, W, base, C.line, 2, `stroke-opacity="0.4"`);
  return s;
}

function scenePower(W, H, seed) {
  const r = rng(seed);
  const base = H * 0.8;
  let s = darkBackdrop(W, H, { horizon: 0.8, glowX: 0.4 });
  const gantry = (x, wd, ht, stroke, w) => {
    let g = line(x, base, x, base - ht, stroke, w * 1.6) + line(x + wd, base, x + wd, base - ht, stroke, w * 1.6);
    g += line(x - wd * 0.08, base - ht, x + wd * 1.08, base - ht, stroke, w * 1.4);
    g += line(x - wd * 0.08, base - ht + 36, x + wd * 1.08, base - ht + 36, stroke, w);
    for (let i = 0; i < 8; i++) {
      const a = x + (wd / 8) * i, b = x + (wd / 8) * (i + 1);
      g += line(a, base - ht, b, base - ht + 36, stroke, w * 0.6) + line(b, base - ht, a, base - ht + 36, stroke, w * 0.6);
    }
    for (let i = 1; i < 4; i++) {
      const ix = x + (wd / 4) * i;
      g += line(ix, base - ht + 36, ix, base - ht + 110, stroke, w * 0.8);
      g += circle(ix, base - ht + 120, 9, stroke);
    }
    return g;
  };
  s += `<g opacity="0.3">${gantry(W * 0.1, W * 0.2, H * 0.34, C.tealLight, 2.5)}${gantry(W * 0.62, W * 0.22, H * 0.36, C.tealLight, 2.5)}</g>`;
  s += gantry(W * 0.18, W * 0.3, H * 0.5, "#58B7C4", 4);
  s += gantry(W * 0.52, W * 0.3, H * 0.5, "#58B7C4", 4);
  for (let i = 0; i < 3; i++) {
    const y = base - H * 0.5 + 120;
    s += `<path d="M ${n(W * 0.18 + W * 0.075 * (i + 1))} ${n(y)} Q ${n(W * 0.5)} ${n(y + 90 + i * 14)} ${n(W * 0.52 + W * 0.075 * (i + 1))} ${n(y)}" fill="none" stroke="${C.line}" stroke-opacity="0.5" stroke-width="2"/>`;
  }
  // cable tray rack
  s += rack(W * 0.0, base, { bays: 12, bayW: W * 0.09, tiers: 1, tierH: 70, stroke: "#3F8F9B", w: 3, r });
  s += rect(0, base, W, H - base, C.navy950);
  s += line(0, base, W, base, C.line, 2, `stroke-opacity="0.4"`);
  return s;
}

/* ---------- drawing sheets (project diagram placeholders) ---------- */

function sheet(W, H, { title, type, body }) {
  const m = 44;
  const tbW = 520, tbH = 150;
  let s = rect(0, 0, W, H, C.paper);
  s += rect(m, m, W - 2 * m, H - 2 * m, "none", `stroke="${C.ink}" stroke-width="3"`);
  s += rect(m + 10, m + 10, W - 2 * m - 20, H - 2 * m - 20, "none", `stroke="${C.ink}" stroke-width="1"`);
  s += body;
  // title block
  const tx = W - m - 10 - tbW, ty = H - m - 10 - tbH;
  s += rect(tx, ty, tbW, tbH, C.paper, `stroke="${C.ink}" stroke-width="2"`);
  s += line(tx, ty + 50, tx + tbW, ty + 50, C.ink, 1);
  s += line(tx, ty + 100, tx + tbW, ty + 100, C.ink, 1);
  s += line(tx + 330, ty + 50, tx + 330, ty + tbH, C.ink, 1);
  s += text(tx + 16, ty + 33, "PLACEHOLDER — REPRESENTATIVE ILLUSTRATION", 19, C.ink, `font-weight="700"`);
  s += text(tx + 16, ty + 82, title, 20, C.ink, `font-weight="700"`);
  s += text(tx + 16, ty + 132, type, 18, C.ink);
  s += text(tx + 346, ty + 82, "NOT A PROJECT DWG", 15, C.ink);
  s += text(tx + 346, ty + 132, "REV 0", 16, C.ink);
  return s;
}

function gridBubbles(x, y, count, spacing, vertical = false) {
  let s = "";
  for (let i = 0; i <= count; i++) {
    const cx = vertical ? x : x + i * spacing;
    const cy = vertical ? y + i * spacing : y;
    s += circle(cx, cy, 20, C.paper, `stroke="${C.ink}" stroke-width="1.5"`);
    s += text(cx, cy + 6, vertical ? String.fromCharCode(65 + i) : String(i + 1), 17, C.ink, `text-anchor="middle"`);
  }
  return s;
}

function dim(x1, y, x2, label) {
  return (
    line(x1, y, x2, y, C.ink, 1) +
    line(x1, y - 8, x1, y + 8, C.ink, 1) +
    line(x2, y - 8, x2, y + 8, C.ink, 1) +
    text((x1 + x2) / 2, y - 8, label, 15, C.ink, `text-anchor="middle"`)
  );
}

function bodyGA(W, H, seed, { bays = 6, tiers = 3 } = {}) {
  const r = rng(seed);
  const x = 220, base = H - 330, bayW = (W - 520) / bays, tierH = 120;
  let s = rack(x, base, { bays, bayW, tiers, tierH, stroke: C.ink, w: 2.4, r });
  s += line(x - 80, base, x + bays * bayW + 80, base, C.ink, 1.5, `stroke-dasharray="18 6 4 6"`);
  for (let i = 0; i <= bays; i++) {
    s += line(x + i * bayW, base, x + i * bayW, base + 70, C.ink, 0.8, `stroke-dasharray="10 6"`);
    s += rect(x + i * bayW - 26, base, 52, 16, "none", `stroke="${C.ink}" stroke-width="1.5"`);
  }
  s += gridBubbles(x, base + 96, bays, bayW);
  for (let i = 0; i < bays; i++) s += dim(x + i * bayW, base - tiers * tierH - 60, x + (i + 1) * bayW, "6000");
  for (let t = 1; t <= tiers; t++) s += text(x + bays * bayW + 40, base - t * tierH + 5, `EL. +${(t * 3.5 + 100).toFixed(3)}`, 15, C.ink);
  return s;
}

function bodyPlan(W, H, seed, { nx = 6, ny = 3 } = {}) {
  const r = rng(seed);
  const x = 240, y = 190, sx = (W - 560) / nx, sy = (H - 560) / ny;
  let s = "";
  for (let i = 0; i <= nx; i++) s += line(x + i * sx, y - 40, x + i * sx, y + ny * sy + 40, C.ink, 0.8, `stroke-dasharray="14 6 3 6"`);
  for (let j = 0; j <= ny; j++) s += line(x - 40, y + j * sy, x + nx * sx + 40, y + j * sy, C.ink, 0.8, `stroke-dasharray="14 6 3 6"`);
  for (let i = 0; i <= nx; i++)
    for (let j = 0; j <= ny; j++) {
      s += line(x + i * sx - 12, y + j * sy, x + i * sx + 12, y + j * sy, C.ink, 4);
      s += line(x + i * sx - 12, y + j * sy - 10, x + i * sx - 12, y + j * sy + 10, C.ink, 3);
      s += line(x + i * sx + 12, y + j * sy - 10, x + i * sx + 12, y + j * sy + 10, C.ink, 3);
      if (i < nx) s += line(x + i * sx + 16, y + j * sy, x + (i + 1) * sx - 16, y + j * sy, C.ink, 2.4);
      if (j < ny) s += line(x + i * sx, y + j * sy + 14, x + i * sx, y + (j + 1) * sy - 14, C.ink, 2.4);
    }
  for (let i = 0; i < nx; i++)
    for (let j = 0; j < ny; j++) {
      if (r() > 0.5) {
        for (let q = 1; q < 3; q++) s += line(x + i * sx + (sx / 3) * q, y + j * sy, x + i * sx + (sx / 3) * q, y + (j + 1) * sy, C.ink, 1.2);
      } else if (r() > 0.6) {
        s += line(x + i * sx, y + j * sy, x + (i + 1) * sx, y + (j + 1) * sy, C.ink, 1, `stroke-dasharray="8 6"`);
        s += line(x + (i + 1) * sx, y + j * sy, x + i * sx, y + (j + 1) * sy, C.ink, 1, `stroke-dasharray="8 6"`);
      }
    }
  s += gridBubbles(x, y - 76, nx, sx);
  s += gridBubbles(x - 80, y, ny, sy, true);
  return s;
}

function bodyShop(W) {
  // beam with end plates, bolt groups and a section mark
  const x = 200, y = 330, len = W - 400, d = 130;
  let s = rect(x, y, len, d, "none", `stroke="${C.ink}" stroke-width="2.4"`);
  s += line(x, y + 16, x + len, y + 16, C.ink, 1.2) + line(x, y + d - 16, x + len, y + d - 16, C.ink, 1.2);
  for (const ex of [x - 16, x + len]) s += rect(ex, y - 24, 16, d + 48, C.mist, `stroke="${C.ink}" stroke-width="2"`);
  const bolts = (bx, by) => {
    let b = "";
    for (let i = 0; i < 2; i++) for (let j = 0; j < 3; j++) b += circle(bx + i * 44, by + j * 34, 7, "none", `stroke="${C.ink}" stroke-width="1.6"`);
    return b;
  };
  s += bolts(x + 40, y + 31) + bolts(x + len - 84, y + 31);
  for (const f of [0.3, 0.5, 0.7]) {
    s += rect(x + len * f - 6, y + 16, 12, d - 32, "none", `stroke="${C.ink}" stroke-width="1.4"`);
  }
  s += dim(x, y - 70, x + len, "9150 O/A");
  s += dim(x, y + d + 70, x + len * 0.3, "2745");
  s += dim(x + len * 0.3, y + d + 70, x + len * 0.5, "1830");
  s += dim(x + len * 0.5, y + d + 70, x + len * 0.7, "1830");
  s += dim(x + len * 0.7, y + d + 70, x + len, "2745");
  // section A-A
  const sx = 260, sy = 620;
  s += rect(sx, sy, 150, 16, C.mist, `stroke="${C.ink}" stroke-width="2"`);
  s += rect(sx, sy + 174, 150, 16, C.mist, `stroke="${C.ink}" stroke-width="2"`);
  s += rect(sx + 69, sy + 16, 12, 158, C.mist, `stroke="${C.ink}" stroke-width="2"`);
  s += text(sx + 75, sy + 232, "SECTION A-A", 17, C.ink, `text-anchor="middle" font-weight="700"`);
  // detail: base plate
  const bx = 600, by = 610;
  s += rect(bx, by, 220, 200, "none", `stroke="${C.ink}" stroke-width="2"`);
  for (const [dx, dy] of [[34, 34], [186, 34], [34, 166], [186, 166]]) s += circle(bx + dx, by + dy, 11, "none", `stroke="${C.ink}" stroke-width="1.6"`);
  s += rect(bx + 60, by + 50, 100, 100, "none", `stroke="${C.ink}" stroke-width="2.4"`);
  s += text(bx + 110, by + 242, "DETAIL 1 — BASE PLATE", 17, C.ink, `text-anchor="middle" font-weight="700"`);
  // parts list
  const lx = 940, ly = 570;
  s += rect(lx, ly, 420, 200, "none", `stroke="${C.ink}" stroke-width="1.5"`);
  for (let i = 1; i < 5; i++) s += line(lx, ly + i * 40, lx + 420, ly + i * 40, C.ink, 0.8);
  for (const cx of [70, 250, 330]) s += line(lx + cx, ly, lx + cx, ly + 200, C.ink, 0.8);
  ["MARK", "DESCRIPTION", "QTY", "LENGTH"].forEach((h, i) => (s += text(lx + [12, 82, 262, 342][i], ly + 27, h, 14, C.ink, `font-weight="700"`)));
  return s;
}

function bodyRCC() {
  let s = rebar(200, 180, 620, 420, C.ink, C.ink, 52);
  s += text(510, 650, "PLAN — BOTTOM REINFORCEMENT", 17, C.ink, `text-anchor="middle" font-weight="700"`);
  // section with stirrups
  const sx = 940, sy = 200;
  s += rect(sx, sy, 420, 260, C.mist, `stroke="${C.ink}" stroke-width="2.4"`);
  s += rect(sx + 26, sy + 26, 368, 208, "none", `stroke="${C.ink}" stroke-width="2" rx="14"`);
  for (let i = 0; i < 6; i++) {
    s += circle(sx + 44 + i * 66.4, sy + 44, 9, C.ink);
    s += circle(sx + 44 + i * 66.4, sy + 216, 9, C.ink);
  }
  s += text(sx + 210, sy + 306, "SECTION 1-1", 17, C.ink, `text-anchor="middle" font-weight="700"`);
  // bar schedule
  const lx = 200, ly = 700;
  s += rect(lx, ly, 620, 160, "none", `stroke="${C.ink}" stroke-width="1.5"`);
  for (let i = 1; i < 4; i++) s += line(lx, ly + i * 40, lx + 620, ly + i * 40, C.ink, 0.8);
  for (const cx of [90, 190, 290, 400, 510]) s += line(lx + cx, ly, lx + cx, ly + 160, C.ink, 0.8);
  ["BAR MARK", "DIA", "NO.", "LENGTH", "SHAPE", "SPACING"].forEach((h, i) => (s += text(lx + [10, 100, 200, 300, 410, 520][i], ly + 27, h, 14, C.ink, `font-weight="700"`)));
  s += dim(200, 150, 820, "7200");
  return s;
}

function bodyIso(W, H, seed, opts = {}) {
  const r = rng(seed);
  const { nx = 4, ny = 2, nz = 3 } = opts;
  const bx = 150, by = 180, bz = 120;
  const ox = W / 2 - ((nx * bx - ny * by) * 0.866) / 2 - 60;
  const oy = H * 0.5 - ((nx * bx + ny * by) * 0.5) / 2 + (nz * bz) / 2;
  return isoFrame(ox, oy, { nx, ny, nz, bx, by, bz, w: 2.4, r, palette: { column: C.ink, beam: C.ink, brace: C.teal, secondary: "#6C8389" } });
}

/* ---------- output ---------- */

const svg = (W, H, inner) => `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">${inner}</svg>`;

async function write(name, W, H, inner, quality = 80) {
  const file = path.join(OUT, name);
  await mkdir(path.dirname(file), { recursive: true });
  await sharp(Buffer.from(svg(W, H, inner))).jpeg({ quality, mozjpeg: true }).toFile(file);
  console.log("wrote", name);
}

const PW = 2000, PH = 1250; // scene size
const SW = 1600, SH = 1000; // drawing sheet size

const scenes = {
  "hero-offshore.jpg": [2400, 1500, (W, H) => sceneOffshore(W, H, 11, { main: 0.68, scale: 1.3 })],
  "og-default.jpg": [1200, 630, (W, H) => sceneOffshore(W, H, 12, { main: 0.72, scale: 0.72 })],
  "onshore-pipe-rack.jpg": [PW, PH, (W, H) => scenePipeRack(W, H, 21)],
  "offshore-platform.jpg": [PW, PH, (W, H) => sceneOffshore(W, H, 22, { main: 0.5, scale: 1.4 })],
  "brownfield-structure.jpg": [PW, PH, (W, H) => sceneBrownfield(W, H, 23)],
  "tekla-model.jpg": [PW, PH, (W, H) => sceneModel(W, H, 24, { nx: 5, ny: 2, nz: 3, zoom: 1.15 })],
  "rcc-detailing.jpg": [PW, PH, (W, H) => sceneRebar(W, H, 25)],
  "plant-model.jpg": [PW, PH, (W, H) => sceneModel(W, H, 26, { nx: 7, ny: 3, nz: 2, zoom: 0.95 })],
  "drawings-qaqc.jpg": [PW, PH, (W, H) => sceneModel(W, H, 27, { nx: 3, ny: 3, nz: 4, zoom: 1.05 })],
  "greenfield-development.jpg": [PW, PH, (W, H) => sceneRefinery(W, H, 28, { density: 0.7 })],
  "about-experience.jpg": [PW, PH, (W, H) => sceneRefinery(W, H, 29, { density: 1.1 })],
  "services-overview.jpg": [PW, PH, (W, H) => scenePipeRack(W, H, 30, { tiers: 3 })],
  "capabilities-overview.jpg": [PW, PH, (W, H) => sceneModel(W, H, 31, { nx: 6, ny: 2, nz: 3, zoom: 1.05 })],
  "contact-overview.jpg": [PW, PH, (W, H) => sceneRefinery(W, H, 32, { density: 0.8, spheres: false })],
  "industry-oil-gas.jpg": [PW, PH, (W, H) => sceneRefinery(W, H, 41, { density: 0.9 })],
  "industry-refinery.jpg": [PW, PH, (W, H) => sceneRefinery(W, H, 42, { density: 1.4, spheres: false })],
  "industry-gas-processing.jpg": [PW, PH, (W, H) => sceneRefinery(W, H, 43, { density: 0.8, racks: true })],
  "industry-petrochemical.jpg": [PW, PH, (W, H) => sceneRefinery(W, H, 44, { density: 1.2 })],
  "industry-fertilizer.jpg": [PW, PH, (W, H) => sceneRefinery(W, H, 45, { density: 1.0, racks: false })],
  "industry-industrial-energy.jpg": [PW, PH, (W, H) => scenePipeRack(W, H, 46, { tiers: 3 })],
  "industry-offshore.jpg": [PW, PH, (W, H) => sceneOffshore(W, H, 47, { main: 0.4, scale: 1.2 })],
  "industry-power.jpg": [PW, PH, (W, H) => scenePower(W, H, 48)],
  "project-hail-ghasha.jpg": [PW, PH, (W, H) => scenePipeRack(W, H, 51, { tiers: 3 })],
  "project-umm-lulu.jpg": [PW, PH, (W, H) => sceneOffshore(W, H, 52, { main: 0.6, scale: 1.3 })],
  "project-bab-asab.jpg": [PW, PH, (W, H) => sceneBrownfield(W, H, 53)],
  "project-diwaniya.jpg": [PW, PH, (W, H) => sceneModel(W, H, 54, { nx: 4, ny: 2, nz: 4, zoom: 1.05 })],
  "project-hawiyah.jpg": [PW, PH, (W, H) => sceneRebar(W, H, 55)],
  "project-atyrau.jpg": [PW, PH, (W, H) => sceneModel(W, H, 56, { nx: 6, ny: 3, nz: 2, zoom: 1.0 })],
  "project-dolphin.jpg": [PW, PH, (W, H) => sceneRefinery(W, H, 57, { density: 0.9 })],
};

const S = (title, type, body) => sheet(SW, SH, { title, type, body });
const M = (seed, o) => sceneModel(SW, SH, seed, o);

const sheets = {
  "projects/onshore-civil-structural-1.jpg": S("PIPE BRIDGE", "GENERAL ARRANGEMENT — ELEVATION", bodyGA(SW, SH, 101, { bays: 5, tiers: 2 })),
  "projects/onshore-civil-structural-2.jpg": S("ACCESS PLATFORM", "FRAMING PLAN", bodyPlan(SW, SH, 102, { nx: 5, ny: 2 })),
  "projects/onshore-civil-structural-3.jpg": S("CROSSOVER STRUCTURE", "ISOMETRIC VIEW", bodyIso(SW, SH, 103, { nx: 3, ny: 1, nz: 2 })),
  "projects/offshore-structural-1.jpg": S("DECK FRAMING", "DETAILED DRAWING — PLAN", bodyPlan(SW, SH, 111, { nx: 5, ny: 3 })),
  "projects/offshore-structural-2.jpg": S("DECK GIRDER", "SHOP DRAWING", bodyShop(SW, SH)),
  "projects/offshore-structural-3.jpg": M(113, { nx: 4, ny: 3, nz: 3, zoom: 0.85 }),
  "projects/brownfield-modifications-1.jpg": S("EXISTING PIPE SUPPORT", "MODIFICATION — ELEVATION", bodyGA(SW, SH, 121, { bays: 4, tiers: 2 })),
  "projects/brownfield-modifications-2.jpg": S("SUPPORT STEELWORK", "DETAIL DRAWING", bodyShop(SW, SH)),
  "projects/brownfield-modifications-3.jpg": M(123, { nx: 5, ny: 1, nz: 2, zoom: 0.95 }),
  "projects/steel-detailing-1.jpg": M(131, { nx: 5, ny: 2, nz: 4, zoom: 0.8 }),
  "projects/steel-detailing-2.jpg": S("BEAM ASSEMBLY", "FABRICATION DRAWING", bodyShop(SW, SH)),
  "projects/steel-detailing-3.jpg": S("STRUCTURE FRAMING", "GENERAL ARRANGEMENT — PLAN", bodyPlan(SW, SH, 133, { nx: 6, ny: 3 })),
  "projects/steel-detailing-4.jpg": S("PIPE RACK", "GENERAL ARRANGEMENT — ELEVATION", bodyGA(SW, SH, 134, { bays: 7, tiers: 3 })),
  "projects/rcc-detailing-1.jpg": S("FOUNDATION", "RCC DETAIL &amp; BAR SCHEDULE", bodyRCC(SW, SH)),
  "projects/rcc-detailing-2.jpg": S("PIPE RACK", "LAYOUT — ELEVATION", bodyGA(SW, SH, 142, { bays: 6, tiers: 3 })),
  "projects/rcc-detailing-3.jpg": S("RCC STRUCTURE", "GENERAL ARRANGEMENT — PLAN", bodyPlan(SW, SH, 143, { nx: 4, ny: 3 })),
  "projects/plant-3d-modelling-1.jpg": M(151, { nx: 7, ny: 3, nz: 2, zoom: 0.72 }),
  "projects/plant-3d-modelling-2.jpg": S("STEEL STRUCTURE", "ARRANGEMENT DRAWING — PLAN", bodyPlan(SW, SH, 152, { nx: 6, ny: 2 })),
  "projects/plant-3d-modelling-3.jpg": M(153, { nx: 3, ny: 2, nz: 4, zoom: 0.8 }),
  "projects/plant-3d-modelling-4.jpg": S("PIPE RACK", "ARRANGEMENT — ELEVATION", bodyGA(SW, SH, 154, { bays: 6, tiers: 3 })),
  "projects/drawings-qaqc-1.jpg": S("STRUCTURAL LAYOUT", "DETAILED ENGINEERING DRAWING", bodyPlan(SW, SH, 161, { nx: 5, ny: 3 })),
  "projects/drawings-qaqc-2.jpg": M(162, { nx: 5, ny: 2, nz: 3, zoom: 0.85 }),
  "projects/drawings-qaqc-3.jpg": S("STEELWORK", "DETAIL DRAWING &amp; MATERIAL LIST", bodyShop(SW, SH)),
};

// Banner/section imagery is now photography (see fetch-photos.mjs). Pass --scenes to
// regenerate the original line-art scenes instead; this overwrites those photographs.
if (process.argv.includes("--scenes")) {
  for (const [name, [W, H, fn]] of Object.entries(scenes)) await write(name, W, H, fn(W, H), 78);
}
for (const [name, inner] of Object.entries(sheets)) await write(name, SW, SH, inner, 84);
