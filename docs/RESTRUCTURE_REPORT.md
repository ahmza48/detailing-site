# Service & Information-Architecture Restructure — Implementation Report

Implements `Hormuz_Energy_Copilot_Website_Restructure_Spec.md` (24 Oct 2026). Branch: `restructure/service-taxonomy`.
Content and structure changed; the visual theme (colours, Montserrat type, cards, buttons, heroes, motion, header/footer styling) was reused, not replaced. No dependencies were added.

## 1. Final service hierarchy

| Group | ID | Service | URL |
| --- | --- | --- | --- |
| Engineering Drawings & Models | S01 | Civil & Structural CAD Drafting | `/services/civil-structural-drafting` (new) |
| | S02 | 3D Structural & Plant Modelling | `/services/plant-structural-3d-modelling` (kept) |
| Detailed Fabrication & Construction Documentation | S03 | Structural Steel Detailing & Fabrication | `/services/steel-detailing-fabrication` (kept) |
| | S04 | RCC & Reinforcement Detailing | `/services/rcc-reinforcement-detailing` (kept) |
| Modifications & Engineering Documentation | S05 | Brownfield Modifications & As-Builts | `/services/brownfield-structural-modifications` (kept) |
| | S06 | MTO & Engineering Documentation | `/services/material-takeoffs-documentation` (new) |
| Engagement route (not a service) | — | Engineering Outsourcing | `/engineering-outsourcing` (new) |

Subservice IDs (S01.1–S06.C4) and their order are stored explicitly in `src/lib/services.ts`.

## 2. Where every old service item now lives

| Old service line | Now |
| --- | --- |
| Onshore Civil & Structural Design & Detailing | Industry page `/industries/onshore-oil-gas` (sector content, coordination focus). Drafting content → S01; steel → S03; RCC → S04. |
| Offshore Structural Design & Detailing | Industry page `/industries/offshore-energy` (offshore content, exclusions). Links to S02, S03, S05. |
| Brownfield Structural Modifications & Rehabilitation | S05, same URL, re-sequenced (existing records → verified as-builts). |
| Steel Detailing & Fabrication Drawings | S03, same URL, re-sequenced (model → connections → assembly → part → erection → lists). |
| RCC & Reinforcement Detailing | S04, same URL, re-sequenced. |
| Plant Structural 3D Modelling | S02, same URL, new H1 (TEKLA & 3D Structural Modelling), legacy environments qualified. |
| Structural Drawings, MTO & QA/QC | Split: drawings → S01; MTO / registers / documentation checks → S06; QA process → `/quality-delivery`. |

## 3. Route migration

| Old route | Action | New route |
| --- | --- | --- |
| `/`, `/services`, `/about`, `/capabilities`, `/project-experience`, `/industries`, `/contact` | Kept | same |
| `/services/steel-detailing-fabrication`, `/services/rcc-reinforcement-detailing`, `/services/brownfield-structural-modifications`, `/services/plant-structural-3d-modelling` | Kept | same |
| `/services/onshore-civil-structural-design-detailing` | 308, single hop | `/industries/onshore-oil-gas` |
| `/services/offshore-structural-design-detailing` | 308, single hop | `/industries/offshore-energy` |
| `/services/structural-drawings-mto-qaqc` | 308, single hop | `/services/material-takeoffs-documentation` |
| `/industries#oil-gas`, `#refineries`, `#petrochemical`, `#gas-processing-ngl`, `#fertilizer-process`, `#industrial-energy`, `#power-electrical`, `#offshore` | Anchors preserved as aliases on the hub | same |
| `/project-experience#<id>` (all seven) | Anchors unchanged | same |
| `/capabilities#qa-qc` | Anchor kept; content moved | `/quality-delivery` |
| `/contact?service=<old slug>` | Old slugs map to successors in the form | same |

New pages: `/services/civil-structural-drafting`, `/services/material-takeoffs-documentation`, `/engineering-outsourcing`, `/industries/{onshore-oil-gas, gas-processing-ngl, offshore-energy, refining-petrochemicals, process-plants, power-industrial}`, `/applications`, `/capabilities/codes-standards`, `/quality-delivery`.

Deferred: `/work-samples` — no authorised samples exist. A transparent "Technical Work Samples" section sits on `/project-experience#work-samples` and the homepage instead; placeholder drawings stay labelled as placeholders.

## 4. Files

- Data: `src/lib/services.ts` (rewritten), `industries.ts` (rewritten), `projects.ts` (remapped), `software.ts`, `site.ts`, `contact.ts`, new `standards.ts`, `applications.ts`, `delivery.ts`; removed `service-details.ts` (merged into services).
- Components: `Navbar`, `Footer`, `ServicePageLayout`, `IndustrySection`, `ProjectCaseStudy`, `ContactForm`, `CTASection`, `SoftwareCapabilities`; new `ProcessSteps`, `StandardsSummary`.
- Pages: home, services hub, about, capabilities, contact, industries, project experience; new pages listed above.
- Config: `next.config.ts` (redirects), `src/app/sitemap.ts`.

## 5. Theme preservation

Reused: `Hero`, `ImageBand`, `SectionHeading` (slab mark), `ButtonLink`/`ArrowLink`, service/project/industry cards, focus bands, scroll-driven reveals, header and footer styling, photography. New sections are built from those components and existing tokens only.

Visual changes made for function: the header has three dropdowns instead of one (same panel design); the footer has an extra link column width; the RFQ form has extra optional fields in the existing form style.

## 6. Verification (production build, local)

| Check | Result |
| --- | --- |
| `npm run lint` | Pass |
| `npm run typecheck` | Pass |
| `npm run build` | Pass. 30 static pages. The first build attempt per session stops with a Next.js security-advisory notice; a retry completes (see §9). |
| Crawl | 23 pages, every internal link and anchor resolves, 49 images load, one H1 per page, unique titles and descriptions, valid JSON-LD, no `noindex`, sitemap = crawled pages. |
| Redirects | All three: 308, single hop, destination 200. |
| Claims scan | No STAAD/SACS/SAP2000, ISO-certified, "only work we do", absolute independent-check promises or TODO markers in public HTML. "Fatigue analysis" appears only as an explicit exclusion. |
| Navigation | Three dropdowns list the expected items. Keyboard: Enter opens, Tab moves into the panel, Escape closes. No label wrapping at 1280 px. Mobile accordions work. |
| Service → project anchors | `/services/steel-detailing-fabrication` and `/services/rcc-reinforcement-detailing` land on their case study just below the header, with the highlight applied. |
| Lightbox | Opens, arrow keys move between images, Escape closes. |
| RFQ | Preselection works for current slugs, legacy slugs and `engineering-outsourcing`. Server validation keeps entered values. A minimal valid submission reaches the delivery step; without email credentials it returns the failure message with phone/WhatsApp. **End-to-end email delivery was not verified** (no Resend credentials). |
| Responsive | No horizontal overflow at 390 px on ten key pages. |
| Reduced motion | Reveal animations disabled. |

Not measured: Lighthouse / Core Web Vitals, Search Console.

Known limitation: unknown slugs under `/services/` and `/industries/` render the not-found page with HTTP 200 (Cache Components does not support `dynamicParams = false`); unknown top-level paths return 404.

## 7. Claims register — owner approval needed

`TODO_VERIFY` markers in source (never rendered publicly) flag these:

| Item | Where | Current public wording |
| --- | --- | --- |
| "30+ years": whose experience and the basis | `site.ts` | "Senior professional experience" |
| Seven historical projects: names, roles, software, deliverables against the CV | `projects.ts` | Unchanged facts; prior-engagement disclaimer next to every reference |
| Current software licences and versions | `software.ts` | Listed as senior personnel's project experience; versions confirmed at scope review |
| Whether a named independent production checker exists | `delivery.ts` | "Where resourced and agreed in the scope" |
| Engagement models offered | `/engineering-outsourcing` | Stated as options agreed per proposal; no turnaround or capacity promise |
| Capability tier for each service (all marked "confirmed") | `services.ts` | — |
| Standards editions | `standards.ts` | No editions published; confirmed per project |
| Client/organisation names and permissions (ADNOC, Aramco, etc.) | `site.ts`, `projects.ts` | Text only, with disclaimer |
| Brand form | `site.ts` | "Hormuz-Energy", as previously instructed by the owner (spec suggests "Hormuz Energy") |

No CV was available in the repository, so no new project detail was added.

## 8. Suggested next steps (by business impact)

1. Configure Resend credentials and test a real enquiry end to end.
2. Set `NEXT_PUBLIC_SITE_URL` to the production domain and resubmit the sitemap in Search Console.
3. Owner review of the claims register above.
4. Publish authorised or clearly labelled demonstration work samples, then add `/work-samples`.
5. Replace generic photography with the company's own images where available.

## 9. Framework security upgrade

`next build` on Next.js 16.4.0 reported advisory GHSA-p3m5-59mp-jv5r (denial of service in App Router Server Actions, affecting 16.0.0–16.4.0; the RFQ form uses a Server Action). `next upgrade --agent=security` required a 16.5.0 canary CLI, so the fix was applied by upgrading to the patched stable release instead:

- `next` and `eslint-config-next` 16.4.0 → 16.4.3 (exact versions), via pnpm (which manages `node_modules`).
- `package-lock.json` regenerated to match, and its stale `zod` entry (GHSA-mrhx-c7xc-m3w5) updated.
- `pnpm audit` and `npm audit --package-lock-only`: no known vulnerabilities.
- Lint, type check, production build (no advisory), crawl QA and browser regression re-run: all pass.

The repository tracks both `pnpm-lock.yaml` and `package-lock.json`. Keeping one package manager (pnpm, given the current `node_modules`) and removing the other lockfile would avoid drift; that is left for the owner to decide.
