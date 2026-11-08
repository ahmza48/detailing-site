"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import {
  Anchor,
  ArrowRight,
  BookOpen,
  Boxes,
  Columns3,
  Globe,
  Box,
  ChevronDown,
  ClipboardList,
  Construction,
  Cylinder,
  DraftingCompass,
  Factory,
  FileStack,
  FlaskConical,
  Flame,
  Grid3x3,
  Handshake,
  Layers,
  Mail,
  MapPin,
  Menu,
  MonitorCog,
  Phone,
  ShieldCheck,
  Ship,
  Wrench,
  X,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { industries, industryPath } from "@/lib/industries";
import { landingPath, specialistPages, type LandingPage, type LandingSlug } from "@/lib/landing-pages";
import { marketPaths, marketRegions, marketsPath, regionPages } from "@/lib/markets";
import { serviceGroups, servicePath, servicesInGroup, type ServiceSlug } from "@/lib/services";
import type { IndustrySlug } from "@/lib/industries";
import {
  applicationsLink,
  capabilitiesMenu,
  outsourcingLink,
  primaryNav,
  quoteCta,
  site,
  telHref,
  whatsappHref,
  type NavLink,
  type NavMenuId,
} from "@/lib/site";
import { Logo } from "./Logo";
import { WhatsAppIcon } from "./WhatsAppButton";

const isActive = (pathname: string, href: string) =>
  href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

/** Sections that own routes outside their own path prefix (for the active state). */
const sectionAlso: Partial<Record<NavMenuId, string[]>> = {
  services: ["/engineering-outsourcing"],
  industries: ["/applications"],
  markets: marketPaths,
  capabilities: ["/quality-delivery"],
};

const stagger = (index: number) => ({ "--i": index }) as React.CSSProperties;

type MenuLink = NavLink & { text?: string; icon: LucideIcon };
/** `compact` renders single-line links (small icon, no description) so secondary groups stay short. */
type MenuSection = { heading?: string; links: MenuLink[]; compact?: boolean };
type MenuContent = {
  title: string;
  text: string;
  all: NavLink;
  sections: MenuSection[];
  /** Columns for the links grid in the desktop panel. */
  columns: 1 | 2;
  /** "side-by-side" puts each section in its own column instead of stacking them. */
  layout?: "stacked" | "side-by-side";
};

const serviceIcons: Record<ServiceSlug, LucideIcon> = {
  "civil-structural-drafting": DraftingCompass,
  "plant-structural-3d-modelling": Box,
  "steel-detailing-fabrication": Construction,
  "rcc-reinforcement-detailing": Grid3x3,
  "brownfield-structural-modifications": Wrench,
  "material-takeoffs-documentation": ClipboardList,
};

const industryIcons: Record<IndustrySlug, LucideIcon> = {
  "onshore-oil-gas": Flame,
  "gas-processing-ngl": Cylinder,
  "offshore-energy": Ship,
  "refining-petrochemicals": Factory,
  "process-plants": FlaskConical,
  "power-industrial": Zap,
};

const landingIcons: Partial<Record<LandingSlug, LucideIcon>> = {
  "pipe-rack-detailing": Columns3,
  "tekla-detailing-outsourcing": Boxes,
  "offshore-structural-detailing": Anchor,
};

const capabilityMeta: Record<string, { icon: LucideIcon; text: string }> = {
  "/capabilities": { icon: MonitorCog, text: "Deliverables and software experience" },
  "/capabilities/codes-standards": { icon: BookOpen, text: "How project standards are applied" },
  "/quality-delivery": { icon: ShieldCheck, text: "Checking, revisions and handover" },
  "/capabilities#formats": { icon: FileStack, text: "Platforms, versions and exchange" },
};

const marketLink = (page: LandingPage, hub?: LandingSlug): MenuLink => ({
  label: page.slug === hub ? `${page.nav.label} overview` : page.nav.label,
  href: landingPath(page.slug),
  text: page.nav.text,
  icon: page.slug === hub ? Globe : MapPin,
});

/** Dropdown contents. Built once; the same data drives the mobile accordions. */
const menus: Record<NavMenuId, MenuContent> = {
  services: {
    title: "Our Services",
    text: "Six technical service lines, from arrangement drawings to fabrication documentation. Any one can be engaged on its own.",
    all: { label: "View all services", href: "/services" },
    columns: 2,
    sections: [
      ...serviceGroups.map((group) => ({
        heading: group.title,
        links: servicesInGroup(group.id).map((service) => ({
          label: service.title,
          href: servicePath(service.slug),
          text: service.menuText,
          icon: serviceIcons[service.slug],
        })),
      })),
      {
        // One section for both keeps the panel inside a 1280×800 viewport.
        heading: "Specialist detailing & outsourcing",
        compact: true,
        links: [
          ...specialistPages.map((page) => ({
            label: page.nav.label,
            href: landingPath(page.slug),
            text: page.nav.text,
            icon: landingIcons[page.slug] ?? Construction,
          })),
          { ...outsourcingLink, text: "Subcontract a defined drawing, modelling or detailing package", icon: Handshake },
        ],
      },
    ],
  },
  industries: {
    title: "Industries",
    text: "Where our services are applied, onshore and offshore, on new and existing facilities.",
    all: { label: "All industries", href: "/industries" },
    columns: 2,
    sections: [
      {
        links: industries.map((industry) => ({
          label: industry.short,
          href: industryPath(industry.slug),
          icon: industryIcons[industry.slug],
        })),
      },
      {
        heading: "Find by structure",
        links: [{ ...applicationsLink, text: "Pipe racks, platforms, supports, foundations", icon: Layers }],
      },
    ],
  },
  markets: {
    title: "Markets We Serve",
    text: "Steel detailing for fabricators and EPC contractors in five regions, to local standards and in hours that suit them.",
    all: { label: "All markets", href: marketsPath },
    columns: 1,
    layout: "side-by-side",
    // Two balanced columns: the GCC region with its country pages, then the single-page regions.
    sections: [
      ...marketRegions
        .filter((region) => region.hub)
        .map((region) => ({ heading: region.label, links: regionPages(region).map((page) => marketLink(page, region.hub)) })),
      {
        heading: "Americas, Europe & Australia",
        links: marketRegions.filter((region) => !region.hub).flatMap(regionPages).map((page) => marketLink(page)),
      },
    ],
  },
  capabilities: {
    title: "Technical Capabilities",
    text: "Software, deliverables, standards and how every package is checked and handed over.",
    all: { label: "Capabilities overview", href: "/capabilities" },
    columns: 2,
    sections: [
      {
        links: capabilitiesMenu.map((link) => ({ ...link, ...capabilityMeta[link.href] })),
      },
    ],
  },
};

/** One menu entry: tinted icon tile, label and optional one-line description. */
function MenuItem({ link, current, compact = false }: { link: MenuLink; current: boolean; compact?: boolean }) {
  const Icon = link.icon;
  return (
    <Link
      href={link.href}
      aria-current={current ? "page" : undefined}
      className={`group flex gap-3 rounded-lg px-3 transition-colors duration-200 hover:bg-paper ${compact ? "items-center py-2" : "items-start py-2.5"} ${
        current ? "bg-paper" : ""
      }`}
    >
      <span
        className={`grid shrink-0 place-items-center rounded-lg transition-colors duration-200 group-hover:bg-energy-deep group-hover:text-white ${
          compact ? "size-8" : "size-10"
        } ${current ? "bg-energy-deep text-white" : "bg-energy-deep/10 text-energy-ink"}`}
      >
        <Icon aria-hidden className={compact ? "size-4" : "size-5"} strokeWidth={1.75} />
      </span>
      <span className={`min-w-0 flex-1 ${compact ? "" : "pt-0.5"}`}>
        <span className={`block text-sm leading-5 font-bold ${current ? "text-energy-ink" : "text-navy-900"} group-hover:text-energy-ink`}>
          {link.label}
        </span>
        {link.text && !compact && <span className="mt-0.5 block text-xs leading-4 text-slate">{link.text}</span>}
      </span>
    </Link>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState<NavMenuId | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSection, setMobileSection] = useState<NavMenuId | null>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);
  const closeTimer = useRef<number | undefined>(undefined);
  const idBase = useId();
  const mobileId = useId();

  // Close menus when the route changes. Adjusting state during render avoids
  // a stale open menu flashing on the next page.
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpenMenu(null);
    setMobileOpen(false);
  }

  // Header state + reading-progress bar. The bar is written straight to the
  // DOM inside a frame callback so scrolling never re-renders React.
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const y = window.scrollY;
      setScrolled(y > 24);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (progressRef.current) progressRef.current.style.transform = `scaleX(${max > 0 ? Math.min(y / max, 1) : 0})`;
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [pathname]);

  useEffect(() => {
    if (!openMenu && !mobileOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpenMenu(null);
      if (mobileOpen) {
        setMobileOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    const onPointer = (event: PointerEvent) => {
      if (!(event.target as Element).closest?.("[data-nav-menu]")) setOpenMenu(null);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [openMenu, mobileOpen]);

  useEffect(() => {
    if (!mobileOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [mobileOpen]);

  // A short grace period stops a menu closing while the pointer crosses the gap.
  const openSoon = (id: NavMenuId) => {
    window.clearTimeout(closeTimer.current);
    setOpenMenu(id);
  };
  const closeSoon = () => {
    window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setOpenMenu(null), 140);
  };

  const sectionActive = (href: string, menu?: NavMenuId) =>
    isActive(pathname, href) || (menu ? (sectionAlso[menu] ?? []).some((p) => isActive(pathname, p)) : false);

  const solid = scrolled || mobileOpen;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 text-mist transition-[background-color,box-shadow,backdrop-filter] duration-500 ${
        solid
          ? "bg-navy-900/95 shadow-[0_8px_30px_rgb(0_26_41/0.28)] backdrop-blur-md"
          : "bg-linear-to-b from-navy-900/70 to-transparent"
      }`}
    >
      <div
        // From xl the header is a little wider than the page container, with tighter side padding, so the
        // logo, nine menu items and the CTA keep even spacing on 1280px screens.
        className={`mx-auto flex w-full max-w-[80rem] items-center justify-between gap-4 px-5 transition-[height] duration-500 sm:px-8 lg:px-12 xl:max-w-[84rem] xl:px-6 ${
          scrolled ? "h-[4.5rem]" : "h-[4.5rem] xl:h-20"
        }`}
      >
        <Link href="/" aria-label={`${site.name} home`} className="shrink-0 text-white">
          <Logo eager className="h-12 w-auto sm:h-14 xl:h-[50px]" />
        </Link>

        <nav aria-label="Primary" className="hidden xl:block">
          <ul className="flex items-center">
            {primaryNav.map((item) => {
              const active = sectionActive(item.href, item.menu);
              const linkClass = `nav-link relative inline-flex h-11 items-center px-1.5 text-xs font-semibold tracking-[0.05em] xl:tracking-[0.03em] whitespace-nowrap min-[1360px]:px-2 uppercase transition-colors duration-300 hover:text-white ${
                active ? "text-white" : "text-mist/85"
              }`;

              if (!item.menu) {
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={pathname === item.href ? "page" : undefined}
                      data-active={active || undefined}
                      className={linkClass}
                    >
                      {item.short ?? item.label}
                    </Link>
                  </li>
                );
              }

              const menuId = item.menu;
              const menu = menus[menuId];
              const panelId = `${idBase}-${menuId}`;
              const open = openMenu === menuId;
              const wide = menuId === "services";
              const sideBySide = menu.layout === "side-by-side";

              return (
                <li
                  key={item.href}
                  data-nav-menu
                  className="relative flex items-center"
                  onMouseEnter={() => openSoon(menuId)}
                  onMouseLeave={closeSoon}
                  onBlur={(event) => {
                    if (!event.currentTarget.contains(event.relatedTarget)) setOpenMenu((m) => (m === menuId ? null : m));
                  }}
                >
                  <Link
                    href={item.href}
                    aria-current={pathname === item.href ? "page" : undefined}
                    data-active={active || undefined}
                    className={`${linkClass} pr-0.5`}
                  >
                    {item.short ?? item.label}
                  </Link>
                  <button
                    type="button"
                    aria-expanded={open}
                    aria-controls={panelId}
                    aria-label={`Show ${item.label.toLowerCase()} menu`}
                    onClick={() => setOpenMenu((m) => (m === menuId ? null : menuId))}
                    className="grid size-7 place-items-center rounded text-mist/85 transition-colors hover:text-white"
                  >
                    <ChevronDown
                      aria-hidden
                      strokeWidth={2.5}
                      className={`size-3.5 transition-transform duration-300 ${open ? "rotate-180 text-energy" : ""}`}
                    />
                  </button>

                  {open && (
                    <div
                      id={panelId}
                      className={`absolute top-full pt-4 ${
                        wide ? "left-1/2 w-[58rem] -translate-x-[40%]" : sideBySide ? "left-1/2 w-[52rem] -translate-x-1/2" : "left-1/2 w-[44rem] -translate-x-1/2"
                      }`}
                    >
                      <div
                        className={`menu-in grid overflow-hidden rounded-xl bg-white shadow-[0_24px_60px_rgb(0_26_41/0.35)] ${
                          wide ? "grid-cols-[13rem_1fr]" : "grid-cols-[13rem_1fr]"
                        }`}
                      >
                        <div className="flex flex-col justify-between bg-navy-800 p-7 text-mist">
                          <div>
                            <span aria-hidden className="slab mb-5 h-8 w-10" />
                            <p className="text-lg leading-6 font-extrabold uppercase">{menu.title}</p>
                            <p className="mt-3 text-[0.8125rem] leading-5 text-haze">{menu.text}</p>
                          </div>
                          <Link
                            href={menu.all.href}
                            className="group mt-6 inline-flex items-center gap-2 text-sm font-bold text-white hover:text-energy"
                          >
                            <ArrowRight aria-hidden className="size-4 text-energy transition-transform group-hover:translate-x-1" />
                            {menu.all.label}
                          </Link>
                        </div>
                        <div
                          className={`max-h-[calc(100dvh-5.5rem)] overflow-y-auto overscroll-contain p-4 ${
                            sideBySide ? "grid grid-cols-2 gap-4" : ""
                          }`}
                        >
                          {menu.sections.map((section, s) => (
                            <div
                              key={section.heading ?? s}
                              className={s === 0 ? "" : sideBySide ? "border-l border-line pl-4" : "mt-1.5 border-t border-line pt-2.5"}
                            >
                              {section.heading && (
                                <p className="px-3 pt-0.5 pb-1 text-[0.6875rem] font-bold tracking-[0.12em] text-energy-ink uppercase">
                                  {section.heading}
                                </p>
                              )}
                              <ul className={`grid gap-1 ${menu.columns === 2 && section.links.length > 1 ? "grid-cols-2" : ""}`}>
                                {section.links.map((link, index) => (
                                  <li key={link.href} className="menu-item" style={stagger(s * 2 + index)}>
                                    <MenuItem link={link} current={pathname === link.href} compact={section.compact} />
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <Link
            href={quoteCta.href}
            className="group hidden h-11 items-center gap-2 rounded-lg bg-energy-deep px-4 text-sm font-semibold whitespace-nowrap text-white transition-[background-color,box-shadow] duration-300 hover:bg-energy-ink hover:shadow-[0_8px_20px_rgb(0_179_80/0.35)] sm:inline-flex"
          >
            {quoteCta.label}
            <ArrowRight aria-hidden className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
          <button
            ref={menuButtonRef}
            type="button"
            aria-expanded={mobileOpen}
            aria-controls={mobileId}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            onClick={() => setMobileOpen((open) => !open)}
            className="grid size-11 place-items-center rounded-lg text-white transition-colors hover:bg-white/10 xl:hidden"
          >
            {mobileOpen ? <X aria-hidden className="size-6" /> : <Menu aria-hidden className="size-6" />}
          </button>
        </div>
      </div>

      {/* Reading progress */}
      <span
        ref={progressRef}
        aria-hidden
        className={`absolute bottom-0 left-0 h-0.5 w-full origin-left bg-energy-deep transition-opacity duration-300 ${
          scrolled ? "opacity-100" : "opacity-0"
        }`}
        style={{ transform: "scaleX(0)" }}
      />

      {mobileOpen && (
        <nav
          id={mobileId}
          aria-label="Mobile"
          className="drawer-in h-[calc(100dvh-4.5rem)] overflow-y-auto overscroll-contain border-t border-white/10 bg-navy-900 xl:hidden"
        >
          <ul className="container-site py-3">
            {primaryNav.map((item, index) => {
              const active = sectionActive(item.href, item.menu);
              const rowClass = `flex min-h-14 flex-1 items-center text-[0.9375rem] font-semibold tracking-[0.06em] uppercase ${
                active ? "text-energy" : "text-mist"
              }`;
              const menu = item.menu ? menus[item.menu] : undefined;
              const sectionId = `${idBase}-m-${item.menu}`;
              const expanded = !!item.menu && mobileSection === item.menu;

              return (
                <li key={item.href} className="menu-item border-b border-white/10" style={stagger(index)}>
                  {!menu ? (
                    <Link href={item.href} aria-current={pathname === item.href ? "page" : undefined} className={rowClass}>
                      {item.label}
                    </Link>
                  ) : (
                    <>
                      <div className="flex items-center">
                        <Link href={item.href} aria-current={pathname === item.href ? "page" : undefined} className={rowClass}>
                          {item.label}
                        </Link>
                        <button
                          type="button"
                          aria-expanded={expanded}
                          aria-controls={sectionId}
                          aria-label={`Show ${item.label.toLowerCase()} menu`}
                          onClick={() => setMobileSection((m) => (m === item.menu ? null : (item.menu ?? null)))}
                          className="grid size-14 place-items-center text-white"
                        >
                          <ChevronDown
                            aria-hidden
                            className={`size-5 transition-transform duration-300 ${expanded ? "rotate-180 text-energy" : ""}`}
                          />
                        </button>
                      </div>
                      {expanded && (
                        <div id={sectionId} className="menu-in border-l-2 border-energy-deep pb-4 pl-4">
                          {menu.sections.map((section, s) => (
                            <div key={section.heading ?? s}>
                              {section.heading && (
                                <p className="pt-3 pb-1 text-[0.6875rem] font-bold tracking-[0.12em] text-energy uppercase">
                                  {section.heading}
                                </p>
                              )}
                              <ul>
                                {section.links.map((link) => (
                                  <li key={link.href}>
                                    <Link
                                      href={link.href}
                                      aria-current={pathname === link.href ? "page" : undefined}
                                      className={`flex min-h-12 items-center py-2 text-[0.9375rem] leading-snug font-medium ${
                                        pathname === link.href ? "text-energy" : "text-haze"
                                      }`}
                                    >
                                      {link.label}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      )}
                    </>
                  )}
                </li>
              );
            })}
          </ul>

          <div className="container-site menu-item space-y-4 pt-4 pb-10" style={stagger(primaryNav.length)}>
            <Link
              href={quoteCta.href}
              className="flex min-h-12 items-center justify-center gap-2.5 rounded-lg bg-energy-deep px-6 text-[0.9375rem] font-semibold text-white"
            >
              {quoteCta.label}
              <ArrowRight aria-hidden className="size-4" />
            </Link>
            <div className="grid gap-3 text-sm text-haze">
              <a href={telHref} className="inline-flex min-h-11 items-center gap-3">
                <Phone aria-hidden className="size-4 text-energy" />
                {site.phone.display}
              </a>
              <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-3">
                <WhatsAppIcon className="size-4 text-energy" />
                Chat on WhatsApp
              </a>
              <a href={`mailto:${site.email.projects}`} className="inline-flex min-h-11 items-center gap-3 break-all">
                <Mail aria-hidden className="size-4 shrink-0 text-energy" />
                {site.email.projects}
              </a>
              <p className="flex items-start gap-3">
                <MapPin aria-hidden className="mt-0.5 size-4 shrink-0 text-energy" />
                {site.address.lines.join(", ")}
              </p>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
