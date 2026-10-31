import Link from "next/link";
import type { ReactNode } from "react";

/**
 * Minimal Markdown renderer for the /resources articles (server-side, no dependency).
 * Supports exactly what the approved article bodies use: ## / ### headings, paragraphs with
 * soft line breaks, bulleted, numbered and "- [ ]" checklist items, pipe tables, **bold** and
 * [links](url). Text is rendered as React text, so nothing is injected as raw HTML.
 */

export type TocEntry = { id: string; title: string };

export const slugify = (text: string) =>
  text
    .toLowerCase()
    .replace(/\*\*/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

/** Inline: **bold** and [label](href). Internal links use next/link; external open in a new tab. */
function inline(text: string, key = "i"): ReactNode[] {
  const nodes: ReactNode[] = [];
  const pattern = /\*\*(.+?)\*\*|\[([^\]]+)\]\(([^)\s]+)\)/g;
  let last = 0;
  let match: RegExpExecArray | null;
  let n = 0;
  while ((match = pattern.exec(text))) {
    if (match.index > last) nodes.push(text.slice(last, match.index));
    if (match[1] !== undefined) {
      nodes.push(
        <strong key={`${key}-${n++}`} className="font-bold text-navy-900">
          {inline(match[1], `${key}-b${n}`)}
        </strong>,
      );
    } else {
      const [label, href] = [match[2], match[3]];
      const className = "font-semibold text-energy-ink underline decoration-energy-deep/40 underline-offset-4 hover:decoration-energy-deep";
      nodes.push(
        href.startsWith("/") ? (
          <Link key={`${key}-${n++}`} href={href} className={className}>
            {label}
          </Link>
        ) : (
          <a key={`${key}-${n++}`} href={href} target="_blank" rel="noopener noreferrer" className={className}>
            {label}
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        ),
      );
    }
    last = pattern.lastIndex;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
}

const isTableRow = (line: string) => /^\|.*\|$/.test(line.trim());
const isListItem = (line: string) => /^(- |\* |\d+\. )/.test(line);
const cells = (line: string) =>
  line
    .trim()
    .replace(/^\||\|$/g, "")
    .split("|")
    .map((c) => c.trim());

/** Renders the body and returns the H2 table of contents. */
export function renderMarkdown(source: string): { content: ReactNode; toc: TocEntry[] } {
  const lines = source.replace(/\r\n/g, "\n").split("\n");
  const blocks: ReactNode[] = [];
  const toc: TocEntry[] = [];
  let i = 0;
  let k = 0;

  while (i < lines.length) {
    const line = lines[i];
    if (!line.trim()) {
      i++;
      continue;
    }

    const heading = line.match(/^(#{2,3}) (.+)$/);
    if (heading) {
      const level = heading[1].length;
      const title = heading[2].trim();
      const id = slugify(title);
      if (level === 2) {
        toc.push({ id, title: title.replace(/\*\*/g, "") });
        blocks.push(
          <h2 key={k++} id={id} className="mt-12 scroll-mt-28 text-2xl leading-tight font-extrabold text-navy-900 first:mt-0 sm:text-[1.75rem]">
            {inline(title)}
          </h2>,
        );
      } else {
        blocks.push(
          <h3 key={k++} id={id} className="mt-8 scroll-mt-28 text-lg font-extrabold text-navy-900">
            {inline(title)}
          </h3>,
        );
      }
      i++;
      continue;
    }

    if (isTableRow(line)) {
      const rows: string[] = [];
      while (i < lines.length && isTableRow(lines[i])) rows.push(lines[i++]);
      const [head, , ...body] = rows; // second row is the |---| separator
      blocks.push(
        <div key={k++} className="my-6 overflow-x-auto rounded-xl ring-1 ring-line">
          <table className="w-full min-w-[34rem] text-left text-sm">
            <thead className="bg-navy-900 text-xs tracking-[0.08em] text-white uppercase">
              <tr>
                {cells(head).map((cell, c) => (
                  <th key={c} scope="col" className="px-4 py-3 font-bold">
                    {inline(cell, `th${c}`)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {body.map((row, r) => (
                <tr key={r} className="border-t border-line align-top even:bg-paper">
                  {cells(row).map((cell, c) => (
                    <td key={c} className={`px-4 py-3 leading-6 ${c === 0 ? "font-semibold text-navy-900" : "text-ink"}`}>
                      {inline(cell, `td${r}-${c}`)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>,
      );
      continue;
    }

    if (isListItem(line)) {
      const items: string[] = [];
      while (i < lines.length && isListItem(lines[i])) items.push(lines[i++]);
      const ordered = /^\d+\. /.test(items[0]);
      const checklist = items.every((item) => /^- \[[ x]\] /.test(item));
      const text = (item: string) => item.replace(/^(- \[[ x]\] |- |\* |\d+\. )/, "");
      if (checklist) {
        blocks.push(
          <ul key={k++} className="my-5 space-y-2.5">
            {items.map((item, n) => (
              <li key={n} className="flex gap-3 text-[1.0625rem] leading-7 text-ink">
                <span aria-hidden className="mt-1.5 size-4 shrink-0 rounded-[3px] border-2 border-energy-deep" />
                <span>{inline(text(item), `c${n}`)}</span>
              </li>
            ))}
          </ul>,
        );
      } else if (ordered) {
        blocks.push(
          <ol key={k++} className="my-5 space-y-3">
            {items.map((item, n) => (
              <li key={n} className="flex gap-4 text-[1.0625rem] leading-7 text-ink">
                <span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-full bg-energy-deep text-xs font-bold text-white tabular-nums">
                  {n + 1}
                </span>
                <span>{inline(text(item), `o${n}`)}</span>
              </li>
            ))}
          </ol>,
        );
      } else {
        blocks.push(
          <ul key={k++} className="my-5 space-y-2.5">
            {items.map((item, n) => (
              <li key={n} className="flex gap-3 text-[1.0625rem] leading-7 text-ink">
                <span aria-hidden className="mt-3 size-1.5 shrink-0 bg-energy-deep" />
                <span>{inline(text(item), `u${n}`)}</span>
              </li>
            ))}
          </ul>,
        );
      }
      continue;
    }

    // Paragraph: consecutive non-empty lines that are not another block type.
    const para: string[] = [];
    while (i < lines.length && lines[i].trim() && !/^#{2,3} /.test(lines[i]) && !isTableRow(lines[i]) && !isListItem(lines[i])) {
      para.push(lines[i++].trim());
    }
    // FAQ pattern: a fully bold question line followed by its answer.
    if (para.length > 1 && /^\*\*[^*]+\*\*$/.test(para[0])) {
      blocks.push(
        <div key={k++} className="mt-6 rounded-xl bg-paper p-5 sm:p-6">
          <p className="text-base font-bold text-navy-900">{para[0].slice(2, -2)}</p>
          <p className="mt-2 text-[1.0625rem] leading-7 text-ink">{inline(para.slice(1).join(" "), `fa${k}`)}</p>
        </div>,
      );
    } else {
      blocks.push(
        <p key={k++} className="mt-5 text-[1.0625rem] leading-8 text-ink first:mt-0">
          {inline(para.join(" "), `p${k}`)}
        </p>,
      );
    }
  }

  return { content: blocks, toc };
}
