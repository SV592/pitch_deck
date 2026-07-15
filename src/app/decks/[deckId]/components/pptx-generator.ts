import pptxgen from "pptxgenjs";
import { Deck, Slide } from "../types";
import { resolveTheme, ResolvedTheme } from "./deck-themes";
import {
  htmlToParagraphs,
  PptxParagraph,
  PptxAlign,
} from "./html-to-pptx";

// Slide geometry, in inches, for a 16:9 layout (10 x 5.625).
const LAYOUT = { w: 10, h: 5.625 };
const MARGIN = 0.5;
const TITLE_Y = 0.3;
const TITLE_H = 0.9;
const BODY_Y = 1.4;
const BODY_H = LAYOUT.h - BODY_Y - 0.3;

const headingScale = (level: PptxParagraph["level"]): number => {
  switch (level) {
    case "h1":
      return 1.45;
    case "h2":
      return 1.2;
    case "h3":
      return 1.05;
    default:
      return 1;
  }
};

const isHeading = (level: PptxParagraph["level"]): boolean =>
  level === "h1" || level === "h2" || level === "h3";

// Turn structured paragraphs into the flat run array pptxgenjs consumes, with
// paragraph-level formatting (align, bullet, size) carried on each run.
const toTextRuns = (
  paragraphs: PptxParagraph[],
  theme: ResolvedTheme
): pptxgen.TextProps[] => {
  const runs: pptxgen.TextProps[] = [];

  paragraphs.forEach((para) => {
    const fontSize = Math.round(theme.bodySize * headingScale(para.level));
    const heading = isHeading(para.level);
    const color = para.level === "h1" ? theme.accent : theme.text;

    const bullet =
      para.bullet && para.ordered
        ? { type: "number" as const, indent: 20 }
        : para.bullet
          ? { indent: 20 }
          : undefined;

    para.runs.forEach((run, runIndex) => {
      const isLast = runIndex === para.runs.length - 1;
      runs.push({
        text: run.text,
        options: {
          bold: heading || run.bold,
          italic: run.italic,
          underline: run.underline ? { style: "sng" } : undefined,
          strike: run.strike,
          fontSize,
          color,
          fontFace: theme.fontFace,
          align: para.align as PptxAlign,
          bullet,
          indentLevel: para.indentLevel,
          paraSpaceAfter: heading ? 8 : 4,
          breakLine: isLast,
        },
      });
    });
  });

  return runs;
};

const htmlToPlainText = (html: string): string =>
  (html || "")
    .replace(/<\/(p|div|li|h[1-6]|ul|ol)>/gi, "\n")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/gi, " ")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

const sanitizeFileName = (title: string): string =>
  (title || "pitch-deck").replace(/[^a-z0-9\-_ ]/gi, "").trim().replace(/\s+/g, "-") ||
  "pitch-deck";

export const generatePptx = async (deck: Deck): Promise<void> => {
  const theme = resolveTheme(deck.theme);
  const pptx = new pptxgen();
  pptx.defineLayout({ name: "PD_16x9", width: LAYOUT.w, height: LAYOUT.h });
  pptx.layout = "PD_16x9";

  const slides: Slide[] = [...(deck.slides ?? [])].sort(
    (a, b) => (a.order ?? 0) - (b.order ?? 0)
  );

  slides.forEach((slide) => {
    const s = pptx.addSlide();
    s.background = { color: theme.background };

    s.addText(slide.title || "Untitled Slide", {
      x: MARGIN,
      y: TITLE_Y,
      w: LAYOUT.w - MARGIN * 2,
      h: TITLE_H,
      fontSize: theme.titleSize,
      bold: true,
      color: theme.accent,
      fontFace: theme.fontFace,
      align: "left",
      valign: "middle",
    });

    const paragraphs = htmlToParagraphs(slide.content || "");
    const runs = toTextRuns(paragraphs, theme);
    if (runs.length > 0) {
      s.addText(runs, {
        x: MARGIN,
        y: BODY_Y,
        w: LAYOUT.w - MARGIN * 2,
        h: BODY_H,
        color: theme.text,
        fontFace: theme.fontFace,
        valign: "top",
      });
    }

    const notes = htmlToPlainText(slide.speaker_notes || "");
    if (notes) s.addNotes(notes);
  });

  await pptx.writeFile({ fileName: `${sanitizeFileName(deck.title)}.pptx` });
};
