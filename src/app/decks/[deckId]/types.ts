export interface Slide {
  id: string;
  slide_number?: number;
  slide_title: string;
  headline?: string;
  hook?: string;
  key_points?: string[];
  speaker_notes?: string;
  visual_suggestion?: string;
  // Keeping original fields for compatibility if needed, or remove if fully replaced
  title: string; // Maps to slide_title
  content: string; // Maps to speaker_notes
  order: number;
}

export interface ColorPalette {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
}

export interface Typography {
  fontFamily: string;
  titleSize: string;
  bodySize: string;
}

export interface Theme {
  colorPalette: ColorPalette;
  typography: Typography;
  justification: string;
}

export interface Deck {
  id: string;
  title: string;
  slides?: Slide[];
  theme?: Theme;
}