/**
 * Organisations referenced in the senior team's PRIOR professional experience
 * (Home / About / FAQ brief, section D). Single source for the experience tickers.
 *
 * Publishing rules:
 * - An entry renders only when `confirmedPriorExperience` AND `approvedForPublicListing` are true.
 *   "Confirmed" here means recorded against a project in src/lib/projects.ts; the owner should still
 *   verify each one against employment / CV evidence (TODO_VERIFY).
 * - Asset owners and former employers are separate groups and are never mixed in one row.
 * - These are never clients, partners or endorsers of the company; every ticker keeps a visible disclaimer.
 * - Logos are third-party trademarks. Typography only, unless `approvedLogoSrc` is set AND
 *   `logoPermissionConfirmed` is true (no logo assets are approved at present).
 */
export type ExperienceOrg = {
  name: string;
  type: "assetOwner" | "formerEmployer";
  evidenceNote: string;
  /** Project id in src/lib/projects.ts that the reference comes from, if any. */
  projectId?: string;
  confirmedPriorExperience: boolean;
  approvedForPublicListing: boolean;
  approvedLogoSrc?: string;
  logoPermissionConfirmed?: boolean;
};

export const experienceOrgs: ExperienceOrg[] = [
  // --- Project asset owners ---
  { name: "ADNOC", type: "assetOwner", projectId: "onshore-civil-structural", evidenceNote: "Hail & Ghasha Development Project (ADNOC-associated)", confirmedPriorExperience: true, approvedForPublicListing: true },
  { name: "ADMA", type: "assetOwner", projectId: "offshore-structural", evidenceNote: "Umm Lulu Full Development Project", confirmedPriorExperience: true, approvedForPublicListing: true },
  { name: "Saudi Aramco", type: "assetOwner", projectId: "rcc-detailing", evidenceNote: "Hawiyah NGL Recovery Project (Saudi Aramco-associated)", confirmedPriorExperience: true, approvedForPublicListing: true },
  { name: "Dolphin Energy / QOC", type: "assetOwner", projectId: "drawings-qaqc", evidenceNote: "Dolphin Energy Project", confirmedPriorExperience: true, approvedForPublicListing: true },
  // Previously shown on the site but not recorded against any project: held back until verified.
  { name: "Maersk Oil Qatar", type: "assetOwner", evidenceNote: "No recorded project — owner to verify", confirmedPriorExperience: false, approvedForPublicListing: false },
  { name: "SABIC", type: "assetOwner", evidenceNote: "No recorded project — owner to verify", confirmedPriorExperience: false, approvedForPublicListing: false },
  { name: "BHP", type: "assetOwner", evidenceNote: "No recorded project — owner to verify", confirmedPriorExperience: false, approvedForPublicListing: false },

  // --- Former employers / engagement settings ---
  { name: "NPCC", type: "formerEmployer", projectId: "offshore-structural", evidenceNote: "Umm Lulu (experience through NPCC)", confirmedPriorExperience: true, approvedForPublicListing: true },
  { name: "Penspen", type: "formerEmployer", projectId: "onshore-civil-structural", evidenceNote: "Hail & Ghasha; BAB & ASAB", confirmedPriorExperience: true, approvedForPublicListing: true },
  { name: "CH2M Hill / VECO", type: "formerEmployer", projectId: "drawings-qaqc", evidenceNote: "Dolphin Energy Project", confirmedPriorExperience: true, approvedForPublicListing: true },
  { name: "JGC Descon", type: "formerEmployer", projectId: "plant-3d-modelling", evidenceNote: "Atyrau Refinery Reconstruction Project", confirmedPriorExperience: true, approvedForPublicListing: true },
  { name: "Dar Al Riyadh", type: "formerEmployer", projectId: "rcc-detailing", evidenceNote: "Hawiyah NGL Recovery Project", confirmedPriorExperience: true, approvedForPublicListing: true },
  { name: "Descon", type: "formerEmployer", evidenceNote: "Listed previously; no project recorded separately from JGC Descon — owner to verify", confirmedPriorExperience: false, approvedForPublicListing: false },
];

export const publishedOrgs = (type: ExperienceOrg["type"]) =>
  experienceOrgs.filter((org) => org.type === type && org.confirmedPriorExperience && org.approvedForPublicListing);
