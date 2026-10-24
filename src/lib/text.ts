/**
 * Title Case for labels: subservice names, list items, chips and card titles.
 * Sentences (descriptions, intros, FAQ answers) are left in sentence case.
 *
 * - Minor words (and, of, the, ...) stay lower case unless they start the label
 *   or follow a colon / opening bracket.
 * - Words that already contain capitals or digits (MTO, RCC, TEKLA, GA, NC, DSTV,
 *   3D, ISO, AutoCAD) are kept exactly as written.
 * - Hyphenated and slashed words are capitalised per part (Single-Part, As-Built).
 */
const MINOR = new Set([
  "a", "an", "and", "as", "at", "but", "by", "for", "from", "in", "into", "nor",
  "of", "on", "or", "per", "the", "to", "via", "vs", "with",
]);

const capitalise = (part: string) => (part ? part.charAt(0).toUpperCase() + part.slice(1) : part);

function caseWord(core: string, forceCapital: boolean): string {
  // Acronyms, product names and numbers (MTO, AutoCAD, 3D): keep as written.
  if (/[0-9]/.test(core) || /[A-Z]/.test(core.slice(1))) return core;
  if (!forceCapital && MINOR.has(core)) return core;
  return core
    .split(/([-/])/)
    .map((segment, i) =>
      segment === "-" || segment === "/" ? segment : i > 0 && MINOR.has(segment) ? segment : capitalise(segment),
    )
    .join("");
}

export function titleCase(input: string): string {
  let startOfPhrase = true;
  return input
    .split(/(\s+)/)
    .map((token) => {
      if (/^\s+$/.test(token) || token === "") return token;
      const match = token.match(/^([^A-Za-z0-9]*)(.*?)([^A-Za-z0-9]*)$/);
      if (!match) return token;
      const [, lead, core, trail] = match;
      const forced = startOfPhrase || /[(\[]/.test(lead);
      const result = core ? lead + caseWord(core, forced) + trail : token;
      // The next word starts a new phrase after a colon, dash separator or opening bracket.
      startOfPhrase = core === "" ? startOfPhrase : /[:–—]$/.test(trail);
      return result;
    })
    .join("");
}

/** Short alias used in JSX. */
export const tc = titleCase;
