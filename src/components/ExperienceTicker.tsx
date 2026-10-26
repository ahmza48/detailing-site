import Image from "next/image";
import { publishedOrgs, type ExperienceOrg } from "@/lib/experience-orgs";
import { projectById } from "@/lib/projects";

/**
 * Typographic ticker of organisations from the senior team's PRIOR professional experience.
 *
 * Compliance rules (do not relax without owner approval):
 * - Only organisations marked confirmed AND approved in src/lib/experience-orgs.ts render.
 * - Asset owners and former employers are separate rows; never titled "Clients" or "Trusted by".
 * - The disclaimer is visible text above the row, not a tooltip, so it stays when names scroll.
 * - Names are not links (no decorative links to company homepages).
 * - Logos render only with `approvedLogoSrc` + `logoPermissionConfirmed`; otherwise text.
 * - The duplicate set exists purely for the seamless loop and is aria-hidden; reduced-motion
 *   users get a static wrapped list (see .ticker-* in globals.css).
 */
export function ExperienceTicker({
  type,
  label,
  disclaimer,
  onDark = false,
}: {
  type: ExperienceOrg["type"];
  label: string;
  disclaimer: string;
  onDark?: boolean;
}) {
  const orgs = publishedOrgs(type);
  if (orgs.length === 0) return null;
  // Repeat short lists so one set is wider than the viewport, then duplicate it for the loop.
  const repeats = Math.max(1, Math.ceil(8 / orgs.length));
  const set = Array.from({ length: repeats }, () => orgs).flat();
  const duration = `${Math.min(40, Math.max(25, set.length * 4))}s`;

  /** Repeats exist only to fill the row: hidden from assistive tech and from the reduced-motion list. */
  const item = (org: ExperienceOrg, key: string, repeat = false) => {
    const project = org.projectId ? projectById(org.projectId) : undefined;
    const showLogo = org.approvedLogoSrc && org.logoPermissionConfirmed;
    return (
      <li key={key} aria-hidden={repeat || undefined} className={`flex shrink-0 items-center gap-4 ${repeat ? "ticker-dup" : ""}`}>
        <span aria-hidden className={`size-1.5 rotate-45 ${onDark ? "bg-energy" : "bg-energy-deep"}`} />
        <span className="flex flex-col leading-tight">
          {showLogo ? (
            <Image src={org.approvedLogoSrc!} alt={org.name} width={120} height={32} className="h-8 w-auto grayscale" />
          ) : (
            <span className={`text-lg font-extrabold tracking-tight whitespace-nowrap ${onDark ? "text-white" : "text-navy-900"}`}>
              {org.name}
            </span>
          )}
          {project && type === "assetOwner" && (
            <span className={`mt-0.5 text-xs whitespace-nowrap ${onDark ? "text-haze" : "text-slate"}`}>{project.name}</span>
          )}
        </span>
      </li>
    );
  };

  return (
    <div>
      <p className={`text-xs font-bold tracking-[0.16em] uppercase ${onDark ? "text-energy" : "text-teal-700"}`}>{label}</p>
      <p className={`mt-2 max-w-3xl text-sm leading-6 ${onDark ? "text-haze" : "text-ink"}`}>{disclaimer}</p>
      <div
        role="region"
        aria-label={label}
        tabIndex={0}
        className={`ticker ticker-mask mt-6 overflow-hidden rounded-xl py-5 outline-none focus-visible:ring-2 focus-visible:ring-energy-deep ${
          onDark ? "bg-white/6" : "bg-white shadow-[0_4px_16px_rgb(0_36_56/0.06)]"
        }`}
      >
        <div className="ticker-track flex w-max" style={{ "--ticker-duration": duration } as React.CSSProperties}>
          <ul className="ticker-set flex items-center gap-12 pr-12 pl-6">{set.map((org, i) => item(org, `a-${i}`, i >= orgs.length))}</ul>
          <ul aria-hidden className="ticker-set ticker-dup flex items-center gap-12 pr-12 pl-6">
            {set.map((org, i) => item(org, `b-${i}`))}
          </ul>
        </div>
      </div>
    </div>
  );
}
