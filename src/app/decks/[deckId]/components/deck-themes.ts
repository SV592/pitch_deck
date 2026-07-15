import { Theme } from "../types";

// Deck theme presets ("color palette"). A theme is stored on Deck.theme (JSONB)
// and consumed by both the editor preview and the PPTX exporter, so the two
// always agree on what a deck looks like.

export interface DeckThemePreset {
  id: string;
  name: string;
  theme: Theme;
}

export const DECK_THEME_PRESETS: DeckThemePreset[] = [
  {
    id: "midnight",
    name: "Midnight",
    theme: {
      colorPalette: {
        primary: "#F97316",
        secondary: "#111827",
        accent: "#F97316",
        background: "#1F2937",
        text: "#FFFFFF",
      },
      typography: { fontFamily: "Arial", titleSize: "32", bodySize: "18" },
      justification: "left",
    },
  },
  {
    id: "classic-light",
    name: "Classic Light",
    theme: {
      colorPalette: {
        primary: "#2563EB",
        secondary: "#F1F5F9",
        accent: "#2563EB",
        background: "#FFFFFF",
        text: "#0F172A",
      },
      typography: { fontFamily: "Arial", titleSize: "32", bodySize: "18" },
      justification: "left",
    },
  },
  {
    id: "slate",
    name: "Slate",
    theme: {
      colorPalette: {
        primary: "#38BDF8",
        secondary: "#1E293B",
        accent: "#38BDF8",
        background: "#0F172A",
        text: "#E2E8F0",
      },
      typography: { fontFamily: "Calibri", titleSize: "32", bodySize: "18" },
      justification: "left",
    },
  },
  {
    id: "sand",
    name: "Sand",
    theme: {
      colorPalette: {
        primary: "#B45309",
        secondary: "#FEF3C7",
        accent: "#B45309",
        background: "#FFFBEB",
        text: "#3F2D1A",
      },
      typography: { fontFamily: "Georgia", titleSize: "32", bodySize: "18" },
      justification: "left",
    },
  },
  {
    id: "forest",
    name: "Forest",
    theme: {
      colorPalette: {
        primary: "#34D399",
        secondary: "#064E3B",
        accent: "#34D399",
        background: "#052E24",
        text: "#ECFDF5",
      },
      typography: { fontFamily: "Calibri", titleSize: "32", bodySize: "18" },
      justification: "left",
    },
  },
];

export const DEFAULT_THEME_ID = "midnight";

export const getPresetById = (id?: string): DeckThemePreset =>
  DECK_THEME_PRESETS.find((p) => p.id === id) ??
  DECK_THEME_PRESETS.find((p) => p.id === DEFAULT_THEME_ID)!;

// Best-effort match of a stored theme back to a preset (by background colour),
// so the picker can highlight the deck's current theme.
export const matchPresetId = (theme?: Theme | null): string => {
  const bg = theme?.colorPalette?.background?.replace("#", "").toUpperCase();
  if (!bg) return DEFAULT_THEME_ID;
  const found = DECK_THEME_PRESETS.find(
    (p) => p.theme.colorPalette.background.replace("#", "").toUpperCase() === bg
  );
  return found?.id ?? DEFAULT_THEME_ID;
};

// Concrete values the PPTX exporter needs, with colors as bare hex (no '#').
export interface ResolvedTheme {
  background: string;
  text: string;
  accent: string;
  fontFace: string;
  titleSize: number;
  bodySize: number;
}

const stripHash = (hex: string, fallback: string): string => {
  const value = (hex || "").replace("#", "").trim();
  return /^[0-9a-fA-F]{6}$/.test(value) ? value.toUpperCase() : fallback;
};

const toNumber = (value: string | number | undefined, fallback: number): number => {
  const n = typeof value === "string" ? parseFloat(value) : value;
  return typeof n === "number" && !Number.isNaN(n) && n > 0 ? n : fallback;
};

// Resolve whatever is stored on the deck (which may be partial, a legacy shape,
// or null) into a complete theme, filling gaps from the default preset.
export const resolveTheme = (theme?: Theme | null): ResolvedTheme => {
  const fallback = getPresetById(DEFAULT_THEME_ID).theme;
  const palette = theme?.colorPalette ?? fallback.colorPalette;
  const typography = theme?.typography ?? fallback.typography;

  return {
    background: stripHash(palette.background, stripHash(fallback.colorPalette.background, "1F2937")),
    text: stripHash(palette.text, stripHash(fallback.colorPalette.text, "FFFFFF")),
    accent: stripHash(palette.accent, stripHash(fallback.colorPalette.accent, "F97316")),
    fontFace: typography.fontFamily || fallback.typography.fontFamily,
    titleSize: toNumber(typography.titleSize, 32),
    bodySize: toNumber(typography.bodySize, 18),
  };
};
