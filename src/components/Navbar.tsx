"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { ArrowRight, ChevronDown, MapPin, Menu, Phone, X } from "lucide-react";
import { primaryNav, site, telHref, whatsappHref } from "@/lib/site";
import { services, servicePath } from "@/lib/services";
import { Logo } from "./Logo";
import { WhatsAppIcon } from "./WhatsAppButton";

const isActive = (pathname: string, href: string) =>
  href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

const stagger = (index: number) => ({ "--i": index }) as React.CSSProperties;

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const dropdownRef = useRef<HTMLLIElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);
  const closeTimer = useRef<number | undefined>(undefined);
  const dropdownId = useId();
  const mobileId = useId();
  const mobileServicesId = useId();

  // Close menus when the route changes. Adjusting state during render avoids
  // a stale open menu flashing on the next page.
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setServicesOpen(false);
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
    if (!servicesOpen && !mobileOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setServicesOpen(false);
      if (mobileOpen) {
        setMobileOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    const onPointer = (event: PointerEvent) => {
      if (!dropdownRef.current?.contains(event.target as Node)) setServicesOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [servicesOpen, mobileOpen]);

  useEffect(() => {
    if (!mobileOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [mobileOpen]);

  // A short grace period stops the menu closing while the pointer crosses the gap.
  const openServices = () => {
    window.clearTimeout(closeTimer.current);
    setServicesOpen(true);
  };
  const closeServicesSoon = () => {
    window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setServicesOpen(false), 140);
  };

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
        className={`container-site flex items-center justify-between gap-6 transition-[height] duration-500 ${
          scrolled ? "h-[4.5rem]" : "h-[4.5rem] xl:h-20"
        }`}
      >
        <Link href="/" aria-label={`${site.name} home`} className="shrink-0 text-white">
          <Logo />
        </Link>

        <nav aria-label="Primary" className="hidden xl:block">
          <ul className="flex items-center">
            {primaryNav.map((item) => {
              const active = isActive(pathname, item.href);
              const linkClass = `nav-link relative inline-flex h-11 items-center px-2.5 text-xs font-semibold tracking-[0.06em] whitespace-nowrap uppercase 2xl:px-3.5 2xl:text-[0.8125rem] transition-colors duration-300 hover:text-white ${
                active ? "text-white" : "text-mist/85"
              }`;

              if (item.href !== "/services") {
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      data-active={active || undefined}
                      className={linkClass}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              }

              return (
                <li
                  key={item.href}
                  ref={dropdownRef}
                  className="relative flex items-center"
                  onMouseEnter={openServices}
                  onMouseLeave={closeServicesSoon}
                  onBlur={(event) => {
                    if (!event.currentTarget.contains(event.relatedTarget)) setServicesOpen(false);
                  }}
                >
                  <Link
                    href={item.href}
                    aria-current={pathname === item.href ? "page" : undefined}
                    data-active={active || undefined}
                    className={`${linkClass} pr-1`}
                  >
                    {item.label}
                  </Link>
                  <button
                    type="button"
                    aria-expanded={servicesOpen}
                    aria-controls={dropdownId}
                    aria-label="Show service categories"
                    onClick={() => setServicesOpen((open) => !open)}
                    className="grid size-7 place-items-center rounded text-mist/85 transition-colors hover:text-white"
                  >
                    <ChevronDown
                      aria-hidden
                      strokeWidth={2.5}
                      className={`size-3.5 transition-transform duration-300 ${servicesOpen ? "rotate-180 text-energy" : ""}`}
                    />
                  </button>

                  {servicesOpen && (
                    <div id={dropdownId} className="absolute top-full left-1/2 w-[46rem] -translate-x-1/2 pt-4">
                      <div className="menu-in grid grid-cols-[15rem_1fr] overflow-hidden rounded-xl bg-white shadow-[0_24px_60px_rgb(0_26_41/0.35)]">
                        <div className="flex flex-col justify-between bg-navy-800 p-7 text-mist">
                          <div>
                            <span aria-hidden className="slab mb-5 h-8 w-10" />
                            <p className="text-lg leading-6 font-extrabold uppercase">Our Services</p>
                            <p className="mt-3 text-[0.8125rem] leading-5 text-haze">
                              Civil &amp; structural design, detailing and 3D modelling for onshore and offshore energy
                              projects.
                            </p>
                          </div>
                          <Link
                            href="/services"
                            className="group mt-6 inline-flex items-center gap-2 text-sm font-bold text-white hover:text-energy"
                          >
                            <ArrowRight aria-hidden className="size-4 text-energy transition-transform group-hover:translate-x-1" />
                            All services
                          </Link>
                        </div>
                        <ul className="p-3">
                          {services.map((service, index) => {
                            const href = servicePath(service.slug);
                            const current = pathname === href;
                            return (
                              <li key={service.slug} className="menu-item" style={stagger(index)}>
                                <Link
                                  href={href}
                                  aria-current={current ? "page" : undefined}
                                  className={`group flex items-center gap-4 rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors duration-200 hover:bg-paper ${
                                    current ? "bg-paper text-energy-ink" : "text-navy-900"
                                  }`}
                                >
                                  <span className="w-5 text-xs font-bold text-energy-deep tabular-nums">
                                    {String(index + 1).padStart(2, "0")}
                                  </span>
                                  <span className="flex-1">{service.title}</span>
                                  <ArrowRight
                                    aria-hidden
                                    className="size-4 shrink-0 -translate-x-2 text-energy-deep opacity-0 transition duration-300 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100"
                                  />
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/contact"
            className="group hidden h-11 items-center gap-2.5 rounded-lg bg-energy-deep px-5 text-sm font-semibold whitespace-nowrap text-white transition-[background-color,box-shadow] duration-300 hover:bg-energy-ink hover:shadow-[0_8px_20px_rgb(0_179_80/0.35)] sm:inline-flex"
          >
            Discuss a Project
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
              const active = isActive(pathname, item.href);
              const rowClass = `flex min-h-14 flex-1 items-center text-[0.9375rem] font-semibold tracking-[0.06em] uppercase ${
                active ? "text-energy" : "text-mist"
              }`;

              return (
                <li key={item.href} className="menu-item border-b border-white/10" style={stagger(index)}>
                  {item.href !== "/services" ? (
                    <Link href={item.href} aria-current={active ? "page" : undefined} className={rowClass}>
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
                          aria-expanded={mobileServicesOpen}
                          aria-controls={mobileServicesId}
                          aria-label="Show service categories"
                          onClick={() => setMobileServicesOpen((open) => !open)}
                          className="grid size-14 place-items-center text-white"
                        >
                          <ChevronDown
                            aria-hidden
                            className={`size-5 transition-transform duration-300 ${mobileServicesOpen ? "rotate-180 text-energy" : ""}`}
                          />
                        </button>
                      </div>
                      {mobileServicesOpen && (
                        <ul id={mobileServicesId} className="menu-in border-l-2 border-energy-deep pb-4 pl-4">
                          {services.map((service) => {
                            const href = servicePath(service.slug);
                            return (
                              <li key={service.slug}>
                                <Link
                                  href={href}
                                  aria-current={pathname === href ? "page" : undefined}
                                  className={`flex min-h-12 items-center py-2 text-[0.9375rem] leading-snug font-medium ${
                                    pathname === href ? "text-energy" : "text-haze"
                                  }`}
                                >
                                  {service.title}
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                      )}
                    </>
                  )}
                </li>
              );
            })}
          </ul>

          <div className="container-site menu-item space-y-4 pt-4 pb-10" style={stagger(primaryNav.length)}>
            <Link
              href="/contact"
              className="flex min-h-12 items-center justify-center gap-2.5 rounded-lg bg-energy-deep px-6 text-[0.9375rem] font-semibold text-white"
            >
              Discuss a Project
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
