// Converts a slide's TipTap HTML into a structured, presentation-agnostic list
// of paragraphs and inline runs. Kept pure and free of pptxgenjs so it can be
// reasoned about (and tested) on its own; the generator turns this into slides.

export type PptxAlign = "left" | "center" | "right" | "justify";
export type PptxBlockLevel = "h1" | "h2" | "h3" | "p" | "li";

export interface PptxRun {
  text: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strike?: boolean;
}

export interface PptxParagraph {
  runs: PptxRun[];
  level: PptxBlockLevel;
  align: PptxAlign;
  bullet?: boolean;
  ordered?: boolean;
  indentLevel?: number;
}

interface ActiveMarks {
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strike?: boolean;
}

const INLINE_MARK: Record<string, keyof ActiveMarks> = {
  STRONG: "bold",
  B: "bold",
  EM: "italic",
  I: "italic",
  U: "underline",
  S: "strike",
  STRIKE: "strike",
  DEL: "strike",
};

const readAlign = (el: Element): PptxAlign => {
  const raw = (el as HTMLElement).style?.textAlign;
  if (raw === "center" || raw === "right" || raw === "justify") return raw;
  return "left";
};

// Collect inline text runs from a block element, merging adjacent runs that
// share the same marks so we don't emit a run per character.
const collectRuns = (node: Node, marks: ActiveMarks, out: PptxRun[]): void => {
  node.childNodes.forEach((child) => {
    if (child.nodeType === 3 /* text */) {
      const text = child.textContent ?? "";
      if (!text) return;
      const last = out[out.length - 1];
      if (
        last &&
        !!last.bold === !!marks.bold &&
        !!last.italic === !!marks.italic &&
        !!last.underline === !!marks.underline &&
        !!last.strike === !!marks.strike
      ) {
        last.text += text;
      } else {
        out.push({ text, ...marks });
      }
      return;
    }
    if (child.nodeType === 1 /* element */) {
      const el = child as Element;
      const mark = INLINE_MARK[el.tagName];
      collectRuns(el, mark ? { ...marks, [mark]: true } : marks, out);
    }
  });
};

const paragraphFrom = (
  el: Element,
  level: PptxBlockLevel,
  opts: { bullet?: boolean; ordered?: boolean; indentLevel?: number } = {}
): PptxParagraph | null => {
  const runs: PptxRun[] = [];
  collectRuns(el, {}, runs);
  const trimmed = runs.filter((r) => r.text.length > 0);
  if (trimmed.length === 0) return null;
  return { runs: trimmed, level, align: readAlign(el), ...opts };
};

const walkList = (
  list: Element,
  ordered: boolean,
  indentLevel: number,
  out: PptxParagraph[]
): void => {
  Array.from(list.children).forEach((li) => {
    if (li.tagName !== "LI") return;
    // A list item's own text (excluding nested lists) becomes one bullet line.
    const own = li.cloneNode(true) as Element;
    Array.from(own.querySelectorAll("ul, ol")).forEach((n) => n.remove());
    const para = paragraphFrom(own, "li", { bullet: true, ordered, indentLevel });
    if (para) out.push(para);
    // Then recurse into any nested lists one indent level deeper.
    Array.from(li.children).forEach((child) => {
      if (child.tagName === "UL") walkList(child, false, indentLevel + 1, out);
      if (child.tagName === "OL") walkList(child, true, indentLevel + 1, out);
    });
  });
};

const walkBlock = (el: Element, out: PptxParagraph[]): void => {
  switch (el.tagName) {
    case "H1": {
      const p = paragraphFrom(el, "h1");
      if (p) out.push(p);
      return;
    }
    case "H2": {
      const p = paragraphFrom(el, "h2");
      if (p) out.push(p);
      return;
    }
    case "H3":
    case "H4":
    case "H5":
    case "H6": {
      const p = paragraphFrom(el, "h3");
      if (p) out.push(p);
      return;
    }
    case "UL":
      walkList(el, false, 0, out);
      return;
    case "OL":
      walkList(el, true, 0, out);
      return;
    case "P":
    case "BLOCKQUOTE": {
      const p = paragraphFrom(el, "p");
      if (p) out.push(p);
      return;
    }
    case "DIV":
      // Wrapper element: descend into its block children.
      Array.from(el.children).forEach((child) => walkBlock(child, out));
      return;
    default: {
      const p = paragraphFrom(el, "p");
      if (p) out.push(p);
    }
  }
};

// Fallback for non-browser contexts (no DOMParser): strip tags to a single line.
const plainTextFallback = (html: string): PptxParagraph[] => {
  const text = html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  return text ? [{ runs: [{ text }], level: "p", align: "left" }] : [];
};

export const htmlToParagraphs = (html: string): PptxParagraph[] => {
  if (!html) return [];
  if (typeof DOMParser === "undefined") return plainTextFallback(html);

  const doc = new DOMParser().parseFromString(html, "text/html");
  const out: PptxParagraph[] = [];
  Array.from(doc.body.children).forEach((child) => walkBlock(child, out));
  return out;
};
