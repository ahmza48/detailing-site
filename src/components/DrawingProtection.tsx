"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { Lock, X } from "lucide-react";
import { quoteCta } from "@/lib/site";

const PROTECTED = "[data-protected-drawing]";
const OBSCURED = "data-drawings-obscured";
const CLEARED_CLIPBOARD = "Confidential drawing. Available to clients only.";
/** Keeps the cover up after the keys lift, because capture tools take a moment to grab the screen. */
const COVER_HOLD_MS = 1500;

/** Save, print, view source and developer tools (Ctrl on Windows, Cmd on Mac). */
function isCaptureShortcut(event: KeyboardEvent) {
  const key = event.key.toLowerCase();
  const mod = event.ctrlKey || event.metaKey;
  if (key === "f12") return true;
  if (mod && ["s", "p", "u"].includes(key)) return true;
  if (mod && event.shiftKey && ["i", "j", "c", "s"].includes(key)) return true;
  return event.metaKey && event.altKey && ["i", "j", "c"].includes(key);
}

/** macOS Cmd+Shift+3/4/5 and the start of Windows Win+Shift+S. */
const isScreenshotChord = (event: KeyboardEvent) =>
  event.metaKey && (event.key === "Shift" || event.key === "Meta" || ["3", "4", "5", "s", "S"].includes(event.key));

/**
 * Sitewide handler for every DrawingGallery, so the galleries themselves stay
 * server-rendered and ship no JavaScript. Mounted once in the root layout; it
 * does nothing on pages without drawings.
 *
 * A browser cannot stop a screenshot or a determined visitor. These measures
 * deter casual copying: on a shortcut or loss of focus the drawings are swapped
 * for a solid cover, so a capture taken then shows nothing. Print Screen is the
 * gap, as the browser only hears it after the capture. What is actually protected
 * is that the site only ever serves cropped, reduced, watermarked excerpts (see
 * scripts/build-proof-of-work.mjs).
 */
export function DrawingProtection() {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const root = document.documentElement;
    const hasDrawings = () => document.querySelector(PROTECTED) !== null;
    let release: ReturnType<typeof setTimeout> | undefined;
    const obscure = (on: boolean) => {
      clearTimeout(release);
      root.toggleAttribute(OBSCURED, on);
    };
    const notify = () => {
      const dialog = dialogRef.current;
      if (dialog && !dialog.open) dialog.showModal();
    };

    const onPointer = (event: MouseEvent) => {
      if (!(event.target instanceof Element) || !event.target.closest(PROTECTED)) return;
      event.preventDefault();
      notify();
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (!hasDrawings()) return;
      if (isScreenshotChord(event)) obscure(true);
      if (isCaptureShortcut(event)) {
        event.preventDefault();
        notify();
      }
    };
    const onKeyUp = (event: KeyboardEvent) => {
      if (!hasDrawings()) return;
      // Windows delivers Print Screen on key-up only, after the capture, so replace what it copied.
      if (event.key === "PrintScreen") {
        navigator.clipboard?.writeText(CLEARED_CLIPBOARD).catch(() => {});
        notify();
      }
      if (root.hasAttribute(OBSCURED) && (event.key === "Meta" || event.key === "Shift")) {
        clearTimeout(release);
        release = setTimeout(() => obscure(!document.hasFocus()), COVER_HOLD_MS);
      }
    };
    // Snipping tools and other apps take focus; drawings stay covered until the page has it back.
    const onBlur = () => obscure(true);
    const onFocus = () => obscure(false);
    const onVisibility = () => obscure(document.hidden);
    const onBeforePrint = () => obscure(true);
    const onAfterPrint = () => obscure(false);

    document.addEventListener("click", onPointer);
    document.addEventListener("contextmenu", onPointer);
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("keyup", onKeyUp);
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("blur", onBlur);
    window.addEventListener("focus", onFocus);
    window.addEventListener("beforeprint", onBeforePrint);
    window.addEventListener("afterprint", onAfterPrint);
    return () => {
      document.removeEventListener("click", onPointer);
      document.removeEventListener("contextmenu", onPointer);
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("keyup", onKeyUp);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("blur", onBlur);
      window.removeEventListener("focus", onFocus);
      window.removeEventListener("beforeprint", onBeforePrint);
      window.removeEventListener("afterprint", onAfterPrint);
      obscure(false);
    };
  }, []);

  const close = () => dialogRef.current?.close();

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="clients-only-title"
      onClick={(event) => {
        if (event.target === event.currentTarget) close();
      }}
      className="m-auto w-[min(28rem,calc(100vw-2rem))] rounded-xl bg-white p-0 text-ink shadow-[0_18px_40px_rgb(0_36_56/0.25)] backdrop:bg-navy-950/70"
    >
      <div className="relative p-7 sm:p-8">
        <button
          type="button"
          autoFocus
          onClick={close}
          aria-label="Close"
          className="absolute top-3 right-3 grid size-11 place-items-center rounded-lg text-navy-900 hover:bg-paper"
        >
          <X aria-hidden className="size-5" />
        </button>
        <span className="grid size-12 place-items-center rounded-lg bg-navy-900 text-energy">
          <Lock aria-hidden className="size-5" />
        </span>
        <h2 id="clients-only-title" className="mt-5 text-xl font-extrabold text-navy-900">
          For Clients Only
        </h2>
        <p className="mt-3 text-[0.9375rem] leading-7 text-ink">
          Our project drawings are confidential. Full views, downloads and copies are available to clients only. Contact
          us to discuss samples relevant to your scope.
        </p>
        <Link
          href={quoteCta.href}
          onClick={close}
          className="mt-6 inline-flex min-h-12 items-center rounded-lg bg-navy-900 px-6 text-sm font-bold text-white transition-colors hover:bg-teal-700"
        >
          Contact Us
        </Link>
      </div>
    </dialog>
  );
}
