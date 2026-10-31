/**
 * Downloads the site photography from Unsplash (free Unsplash License:
 * commercial use allowed, no attribution required) and writes CREDITS.md.
 *
 * These are generic industry photographs, not images of the named projects.
 * Replace any file in public/images with your own photography of the same
 * name and the site picks it up with no code change.
 *
 *   npm run photos
 */
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const OUT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "public", "images");

/** file -> [unsplash photo id, photographer, description used as alt text] */
export const photos = {
  "hero-offshore.jpg": ["1749073668528-38ab64575f5d", "J.f Manzanero", "Offshore jack-up rig beside a crane vessel at sunset"],
  "offshore-platform.jpg": ["1600221574280-9bcd5d108100", "Dean Brierley", "Offshore platform topsides and steelwork lit at night"],
  "onshore-pipe-rack.jpg": ["1678984240126-70bcddd7a228", "Jakub Pabis", "Steel pipe rack and process structures at an onshore plant"],
  "services-overview.jpg": ["1678984239420-43cdc183bce6", "Jakub Pabis", "Multi-level steel process structure with large-bore piping"],
  "brownfield-structure.jpg": ["1721554146444-379243d27942", "Buddy AN", "Existing refinery units with columns, piping and steel structures"],
  "tekla-model.jpg": ["1441796522229-b3a3cb3d58fd", "Ian Mustafa", "Bolted structural steel connection where four members meet"],
  "rcc-detailing.jpg": ["1531834685032-c34bf0d84c77", "Josue Isai Ramos Figueroa", "Reinforcement cages being fixed for a concrete structure"],
  "plant-model.jpg": ["1784915480177-e5787fd4e6e7", "Julia Taubitz", "Tall steel process structure with platforms and piping against a blue sky"],
  "drawings-qaqc.jpg": ["1603901622056-0a5bee231395", "Lucas Kepner", "Engineering drawings on a desk with drafting pencils and a scale rule"],
  "greenfield-development.jpg": ["1784911545613-391bb6853d00", "Julia Taubitz", "Industrial plant under construction with tower cranes"],
  "about-experience.jpg": ["1726731782158-fcf6822b6ca4", "Christian Harb", "Refinery process columns and steel structures in daylight"],
  "capabilities-overview.jpg": ["1724814884431-5f931c9620ae", "Flanker Lee", "Structural steel framing seen from below"],
  "contact-overview.jpg": ["1786532852258-8305f40f9925", "Red Shuheart", "Process towers and a crane under an evening sky"],
  "industry-oil-gas.jpg": ["1780752849375-fd8df4632dae", "Hazel J", "Large oil and gas processing complex with pipes, tanks and structures"],
  "industry-refinery.jpg": ["1588011930968-eadac80e6a5a", "Maksym Kaharlytskyi", "Refinery stacks and columns lit at night"],
  "industry-gas-processing.jpg": ["1786532852068-a3581fc5032d", "Red Shuheart", "Spherical storage tanks and process towers at a gas facility"],
  "industry-petrochemical.jpg": ["1566221857770-508d35ee6220", "PilMo Kang", "Petrochemical plant illuminated at night"],
  "industry-fertilizer.jpg": ["1777915627530-fc3decb749cf", "Naturalist Boat", "Process plant complex at dusk"],
  "industry-industrial-energy.jpg": ["1620203853151-496c7228306c", "Ricardo Gomez Angel", "Dense network of industrial pipes and valves"],
  "industry-offshore.jpg": ["1779906913453-c1fb66ceb7dd", "Julia Taubitz", "Offshore platforms on the horizon above breaking waves"],
  "industry-power.jpg": ["1509390673020-a5b2450e33f1", "American Public Power Association", "Steel gantry structures in an electrical substation"],
  "project-hail-ghasha.jpg": ["1539186607619-df476afe6ff1", "Martin Adams", "Steel pipe bridge carrying pipework between structures"],
  "project-umm-lulu.jpg": ["1765005629275-110a02f16d65", "Laurenz Kruty", "Offshore platform topsides at a fabrication yard"],
  "project-bab-asab.jpg": ["1768128834332-7d3479c8d634", "waa towaw", "Existing process structure illuminated at night"],
  "project-diwaniya.jpg": ["1609627016501-b862497c7294", "Luca Upper", "Heavy structural steel trusses and bracing"],
  "project-hawiyah.jpg": ["1745909247906-123b53b70e06", "Araf Ibne Alam", "Stacked steel reinforcement bars"],
  "project-atyrau.jpg": ["1781364486016-d83c39eb87f2", "Yanping Ma", "Refinery columns and steel structures at dusk"],
  "project-dolphin.jpg": ["1602056820935-316884c035f8", "Tasos Mansour", "Gas processing facility lit at night"],
};

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  await mkdir(OUT, { recursive: true });
  const credits = ["# Image credits", "", "Generic industry photography from Unsplash (Unsplash License). These are not photographs of the named projects.", "", "| File | Photographer | Source |", "| --- | --- | --- |"];
  for (const [file, [id, by]] of Object.entries(photos)) {
    const res = await fetch(`https://images.unsplash.com/photo-${id}?w=2400&q=82&fm=jpg&fit=max`);
    if (!res.ok) throw new Error(`${file}: HTTP ${res.status}`);
    await sharp(Buffer.from(await res.arrayBuffer())).resize({ width: 2400, withoutEnlargement: true }).jpeg({ quality: 80, mozjpeg: true }).toFile(path.join(OUT, file));
    credits.push(`| ${file} | ${by} | https://images.unsplash.com/photo-${id} |`);
    console.log("wrote", file);
  }
  const hero = photos["hero-offshore.jpg"][0];
  const og = await fetch(`https://images.unsplash.com/photo-${hero}?w=1200&h=630&fit=crop&q=80&fm=jpg`);
  await writeFile(path.join(OUT, "og-default.jpg"), Buffer.from(await og.arrayBuffer()));
  credits.push("");
  await writeFile(path.join(OUT, "CREDITS.md"), credits.join("\n"));
}
