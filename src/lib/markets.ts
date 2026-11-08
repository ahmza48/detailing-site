import { landingBySlug, type LandingPage, type LandingSlug } from "./landing-pages";

/**
 * Markets we serve, grouped by region (owner brief, Nov 2026). Drives the Markets menu, the
 * /markets hub, the footer and market-page breadcrumbs. GCC & MENA has its own region page
 * (`hub`) because it covers several countries; the other regions are a single page each.
 */
export type MarketRegionId = "americas" | "gcc-mena" | "europe" | "uk" | "australia";

export type MarketRegion = {
  id: MarketRegionId;
  label: string;
  text: string;
  hub?: LandingSlug;
  countries: LandingSlug[];
};

export const marketsPath = "/markets";

export const marketRegions: MarketRegion[] = [
  {
    id: "americas",
    label: "Americas",
    text: "Overnight detailing for US fabricators and EPC teams, to AISC 360 and AISC 303.",
    countries: ["steel-detailing-usa"],
  },
  {
    id: "gcc-mena",
    label: "GCC & MENA",
    text: "Gulf-hours support where our senior team's experience was built, to operator and project specifications.",
    hub: "steel-detailing-middle-east",
    countries: ["steel-detailing-uae", "steel-detailing-saudi-arabia", "steel-detailing-qatar"],
  },
  {
    id: "europe",
    label: "Europe",
    text: "Detailing to EN 1090-2 execution classes, Eurocodes and NORSOK where specified.",
    countries: ["steel-detailing-europe"],
  },
  {
    id: "uk",
    label: "United Kingdom",
    text: "Overflow Tekla capacity for UK steelwork contractors, to BS EN 1090-2 and BS 8666.",
    countries: ["steel-detailing-uk"],
  },
  {
    id: "australia",
    label: "Australia",
    text: "AS/NZS 5131 detailing with drawings ready by your next morning.",
    countries: ["steel-detailing-australia"],
  },
];

/** Every page in a region: the region page first, then its countries. */
export const regionPages = (region: MarketRegion): LandingPage[] =>
  [...(region.hub ? [region.hub] : []), ...region.countries].map(landingBySlug);

export const regionOf = (slug: LandingSlug) =>
  marketRegions.find((region) => region.hub === slug || region.countries.includes(slug));

/** Paths for the Markets menu's active state. */
export const marketPaths = marketRegions.flatMap(regionPages).map((page) => `/${page.slug}`);
