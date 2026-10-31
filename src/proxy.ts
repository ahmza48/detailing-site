import { NextResponse, type NextRequest } from "next/server";

const denied = `<!doctype html><html lang="en"><meta charset="utf-8"><meta name="robots" content="noindex"><title>For clients only</title>
<body style="font-family:system-ui,sans-serif;display:grid;place-items:center;min-height:90vh;margin:0;padding:1rem;color:#002438;text-align:center">
<main><h1>For clients only</h1><p>Our project drawings are confidential.</p><a href="/contact">Contact us</a></main></body></html>`;

/** Browsers send Sec-Fetch-* on real page loads; the Referer check covers those that predate them. */
function isEmbeddedInOwnPage(request: NextRequest) {
  const destination = request.headers.get("sec-fetch-dest");
  if (destination) return destination === "image" && request.headers.get("sec-fetch-site") === "same-origin";
  const referer = request.headers.get("referer");
  return referer !== null && URL.canParse(referer) && new URL(referer).host === request.nextUrl.host;
}

/**
 * Drawings load as images inside this site's pages, but opening one directly
 * (pasted URL, "open image in new tab") or embedding it elsewhere is refused.
 * Runs on these paths only, so the rest of the site is untouched.
 */
export function proxy(request: NextRequest) {
  if (isEmbeddedInOwnPage(request)) return NextResponse.next();
  return new NextResponse(denied, {
    status: 403,
    headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store", "X-Robots-Tag": "noindex" },
  });
}

export const config = {
  matcher: "/proof-of-work/:path*",
};
