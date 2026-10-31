# PetroHill — Civil & Structural Detailing for Energy Projects

Corporate website for a civil & structural design, detailing and 3D modelling company serving onshore and offshore energy projects.

Next.js 16 (App Router, Cache Components) · TypeScript · Tailwind CSS v4 · Montserrat (self-hosted) · Lucide icons.

## Commands

```bash
npm run dev        # local development
npm run lint       # ESLint
npm run typecheck  # route type generation + tsc
npm run build      # production build
npm run start      # serve the production build
npm run images     # regenerate placeholder project drawings in public/images/projects
npm run photos     # re-download the banner photographs into public/images
```

## Before launch

1. **Identity & contact** – name, phone (+92 337 4954695), WhatsApp and the DHA Lahore address live in `src/lib/site.ts`. The "H" frame logo in `src/components/Logo.tsx` and `src/app/icon.svg` is a working mark; swap in the final brand asset when ready.
2. **Environment** – copy `.env.example` to `.env.local`. `NEXT_PUBLIC_SITE_URL` drives canonical URLs, sitemap, robots and JSON-LD.
3. **Enquiry form** – set `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`. Without them the form logs to the console in development and shows a failure message in production. To use another provider, change `src/lib/enquiry-delivery.ts` only.
4. **Images** – banner and section photographs in `public/images` are generic industry photos from Unsplash (free Unsplash License; sources in `public/images/CREDITS.md`, re-download with `npm run photos`). They are not photographs of the named projects: replace any file with your own photography of the same name and no code change is needed. Project drawings in `public/images/projects` are generated placeholders (`npm run images`) and are labelled as such on the page; update the captions in `src/components/DiagramViewer.tsx` when real drawings are added.
5. **Theme** – colours and layout patterns follow the NMDC Energy reference theme; tokens live at the top of `src/app/globals.css`. Typography is Montserrat (the reference site's typeface), self-hosted from `src/app/fonts` under the SIL Open Font License. No NMDC images, logo or copy are used.
6. **Static assets** – every photograph, drawing and font is stored in the project (`public/images`, `src/app/fonts`); nothing is loaded from third-party hosts at runtime.

## Where content lives

| File | Content |
| --- | --- |
| `src/lib/site.ts` | Name, contact details, navigation and menus, trust metrics, organization lists, disclaimers |
| `src/lib/services.ts` | The six canonical services (S01–S06): ordered subservices, inputs/outputs, boundaries, standards, workflow, FAQs |
| `src/lib/industries.ts` | Six industry / project-environment pages and the services relevant to each |
| `src/lib/applications.ts` | Structures & applications directory and each structure's documentation path |
| `src/lib/projects.ts` | Prior professional project experience, mapped to services and industries |
| `src/lib/standards.ts` | Codes & standards register (no editions; confirmed per project) |
| `src/lib/delivery.ts` | Engagement steps, quality process, check types |
| `src/lib/software.ts` | Software experience and the services each tool supports |
| `src/lib/contact.ts` | RFQ options and validation |
| `src/lib/seo.ts` | Metadata builder and JSON-LD |

The restructure that produced this model, the route migration and the open claims register are documented in `docs/RESTRUCTURE_REPORT.md`.

## Content rules

- Project and organization names describe the **prior professional experience of senior team members**. Never word them as clients or contracts of the company.
- "30+ years" refers to senior professional experience, not company age.
- List only proven capabilities. Structural analysis packages and offshore analysis services are intentionally absent.
- Onshore and offshore are industries, not services. Engineering Outsourcing is an engagement route, not a seventh service.
- Production checking is described on Quality & Delivery. Never promise independent checks, design verification or certification unless a real, documented workflow exists.
- Software is listed as senior personnel's experience; versions and formats are confirmed at scope review.
- `TODO_VERIFY` comments mark facts awaiting owner evidence; they must never appear in rendered text.
- No client or software logos without permission.
