# Hormuz-Energy implementation report (v2 deep-research specification)

Specification: `Hormuz_Energy_Copilot_Deep_Research_Implementation_v2.md`. This report follows the template in its section 17.3.

## Repository and deployment examined

- **Source branch / commits:** `content/v2-deep-research`, branched from `master` at `23ee99a` (merged PR #1).
  - `56428ec` Phase 1: canonical names, groups and RFQ options.
  - `95feeab` Phase 2: six service pages.
  - `733b2dc` Phase 3: supporting pages.
  - `97e9005` Phase 4: titles, H1s, meta descriptions and canonical host.
  - Not pushed or deployed.
- **Site framework:** Next.js 16.4.3 (App Router, `cacheComponents`), Tailwind CSS v4, self-hosted Montserrat.
- **Public deployment examined:** https://detailing-site-liart.vercel.app (serves `master` / `23ee99a`).
- **Theme preserved:**
  - Design tokens unchanged: colour, type scale, slab, spacing, motion.
  - Logo unchanged.
  - Card, hero, ImageBand and FAQ patterns unchanged.
  - No global CSS was changed. New blocks reuse existing classes only.

### Phase 0 finding: mixed six / seven taxonomy

The spec reports that the live Services hub shows "seven service lines". This could not be reproduced: every live route checked serves the six-service taxonomy from the merged restructure. The observation most likely predates PR #1 or came from a cached crawl. No stale strings remain in source.

## Changes made

| File | Reason | Service / page affected |
|---|---|---|
| `src/lib/services.ts` | v2 §3–4: canonical names and H1s; subservices in the spec's order; fit, requirements, formats, review, responsibility and CTA fields; §5.3 summaries; §14.1 SEO; related links resolved from the registry | S01–S06, menus, footer, home, hub, RFQ |
| `src/components/ServicePageLayout.tsx` | §4.0 section order: "Where This Service Fits", Scope of Services, Applications, Inputs vs Deliverables, Project Requirements & Interfaces, Software & Exchange Formats, Typical Workflow, Drawing & Model Review, Technical Responsibility | S01–S06 |
| `src/components/StandardsSummary.tsx` | Requirement-family mode; standards shown only as illustrative, non-exhaustive examples (§9.3) | S01–S06 |
| `src/app/page.tsx`, `src/lib/site.ts` | §5 hero, packages, buyer-capacity needs, structure directory, standards statement; §12.4 asset-owner references; canonical host fallback | Home, sitewide SEO |
| `src/app/services/page.tsx`, `ServicePreview.tsx` | §6 lead and fit copy, "How We Define a Work Package", specific link text | Services hub |
| `src/app/engineering-outsourcing/page.tsx` | §7 package list, four engagement models, six-step process, confidentiality copy, FAQs | Outsourcing |
| `src/lib/industries.ts`, `src/app/industries/page.tsx` | §8.1 sector names, cross-links and hub copy; §8.2 offshore copy | Industries |
| `src/lib/applications.ts`, `src/app/applications/page.tsx` | §8.3 eight applications with landing paragraphs; §8.4 lifecycle note | Applications |
| `src/app/capabilities/codes-standards/page.tsx` | §9 rewrite: requirement families, examples policy, workflow, responsibility matrix, FAQ | Standards |
| `src/app/capabilities/page.tsx`, `src/lib/software.ts` | §10 capability areas, per-tool cautions, file-format rules; "FrameWorks Plus" spelling | Capabilities |
| `src/app/quality-delivery/page.tsx`, `src/lib/delivery.ts` | §11 seven stages, checking terminology, labelled hypothetical traceability example, FAQ | Quality & Delivery |
| `src/app/about/page.tsx` | §12.1 buyers, technical focus, professional background; softened capacity and NDA wording | About |
| `src/app/contact/page.tsx`, `ContactForm.tsx`, `src/lib/contact.ts` | §13 intro, inline FAQ, submit label, NDA / secure-transfer wording, `?service=mixed` preselect, v2 RFQ options | Contact |
| `src/lib/projects.ts` | Product-name spelling only ("FrameWorks Plus") | Project experience |
| Other page files | §14.1 titles, H1s and meta descriptions | All pages |

Claims removed or narrowed:

- S03: "the model and drawings decide whether steel arrives on site and fits".
- Brownfield: "fit first time".
- Offshore: "fabrication-ready".
- Outsourcing, About and Contact: "NDA available / we will send one", replaced with "can be discussed".
- About: "capacity that scales".
- Home: unverified organisation names.

## Route audit

| Source URL | Final canonical URL | Redirect or retained? | HTTP / live check |
|---|---|---|---|
| `/`, `/services`, `/engineering-outsourcing`, `/industries`, `/applications`, `/capabilities`, `/capabilities/codes-standards`, `/quality-delivery`, `/project-experience`, `/about`, `/contact` | Same path | Retained | 200 locally, one H1 each |
| `/services/{six canonical slugs}` | Same path | Retained | 200, one H1, Service + BreadcrumbList JSON-LD |
| `/industries/{six slugs}` | Same path | Retained | 200, one H1 |
| `/services/onshore-civil-structural-design-detailing` | `/industries/onshore-oil-gas` | 308 redirect | Verified locally and live |
| `/services/offshore-structural-design-detailing` | `/industries/offshore-energy` | 308 redirect | Verified locally |
| `/services/structural-drawings-mto-qaqc` | `/services/material-takeoffs-documentation` | 308 redirect | Verified locally |
| `/applications#cable-pipeline-supports` | Same page | New anchor | Resolves |

- **Sitemap:** 23 URLs, with no redirecting paths.
- **Known limitation:** unknown dynamic slugs (for example `/services/not-a-service`) return a soft 200 because `dynamicParams` is unavailable under `cacheComponents`. No site link points to one.

## Content and claims requiring owner verification

| Claim | Source | Status | Required approval |
|---|---|---|---|
| Brand spelled "Hormuz-Energy" (spec uses "Hormuz Energy") | Owner instruction | Kept as instructed | Confirm; one-line change in `src/lib/site.ts` |
| Asset owners ADNOC, ADMA, Saudi Aramco, Dolphin Energy / QOC, each shown with its project | `src/lib/projects.ts` | Shown with "not clients" wording | Publication permission per name |
| Maersk Oil Qatar, SABIC, BHP | Previous home grid | **Removed**: no recorded project | Restore only with a verified project |
| "30+ Years Senior Professional Experience" | `trustMetrics` | Unchanged | Whose experience and basis, against the CV |
| Software list (Tekla, AutoCAD, MicroStation, PDS, FrameWorks Plus, PDMS, Navisworks) | Prior personnel experience | Labelled as experience, with per-tool cautions | Current licences and versions before any present-tense claim |
| NC / DSTV, IFC and DGN outputs | Service pages | "Where contracted / supported" | Confirm each can actually be produced |
| Second-person (peer) checking | Quality, About | "Where resourced and agreed" | Confirm a named checker exists before strengthening |
| NDA / secure-transfer follow-up | Contact form option | Request is emailed with the enquiry | Confirm a handling procedure exists |
| "Hormuz-Energy is developing a specialist offering" | About (§12.1) | Published | Confirm business maturity and trading details |
| Project facts and individual scopes | `src/lib/projects.ts` | Unchanged; no CV was available | Re-check roles, dates and permissions against the CV |
| Present-day delivery capability (team size, resources) | §12.1 item 5 | **Not published** | Provide evidence to add it |
| Technical work samples | Home, Project Experience | Labelled placeholders retained | Produce the §12.5 demonstration samples |

## Test results

| Test | Command / device / method | Result |
|---|---|---|
| Type check | `tsc --noEmit` | Pass |
| Lint | `eslint src` | Pass (0 problems) |
| Production build | `next build` | Pass, 30/30 static pages |
| Crawl: links, anchors, images, H1, JSON-LD, sitemap, redirects | Scripted fetch of every page | Pass: 23 pages, 50 images, 0 broken links. One flagged term is a false positive: "fatigue analysis" appears in the offshore *exclusions* list |
| Menus, keyboard, anchors, lightbox | Playwright, 1280 px | Pass: six canonical services plus outsourcing; Escape closes; anchors clear the header |
| RFQ preselect (`?service=` canonical, legacy, outsourcing) | Playwright | Pass |
| RFQ validation and value retention | Playwright | Pass: field errors shown, entered values kept |
| RFQ submit | Playwright on a local production build | Shows the honest failure message because `RESEND_API_KEY` is not set locally; success appears only after the backend confirms (§13.2) |
| Mobile overflow and menu | Playwright, 390 px, 10 templates | Pass, no horizontal scroll |
| Reduced motion | Playwright, emulated | Pass |
| Overclaim sweep | Search for "guarantee", "certified", "world-class", "24/7", "every deliverable", "fit first time" and similar | No unqualified matches |
| Canonical host | Build with `VERCEL_PROJECT_PRODUCTION_URL` set | Canonical, robots and sitemap use the real host |

## Visual regression results

- **Desktop (1366 px):**
  - Pages captured before and after: home, services hub, S03, S06, standards, quality, outsourcing, applications.
  - No colour, type, spacing or component changes.
  - New blocks use existing card, list, table and FAQ patterns.
- **Mobile (390 px):**
  - Hero H1s for services, contact and S02 wrap cleanly.
  - Overflow checks pass on 10 templates.
- **Approved differences:** new content sections and renamed headings.
- **One layout fix:** the outsourcing "Before You Commission" link cards no longer stretch to the full column height.
- **Unexpected differences:** none found.

## Remaining gaps and next actions

1. **Set `NEXT_PUBLIC_SITE_URL` on Vercel.**
   - Live canonicals, robots and sitemap currently point at `https://www.example.com`.
   - Phase 4 adds a fallback to Vercel's production domain, but the custom domain should be set explicitly.
2. **Configure enquiry delivery on Vercel** (`RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`), then test one live submission end to end.
3. **Owner verification** of the claims table above, especially software licences, the CV-backed project scopes and the asset-owner publication permissions.
4. **Produce the six demonstration work samples** (§12.5) to replace the labelled placeholders.
5. **Review this branch, then merge and deploy.** After deployment, re-run the live route, redirect and title checks.
