export interface Slide {
  id: string;
  slide_number?: number;
  headline?: string;
  
  hook?: string;
  key_points?: string[];
  speaker_notes?: string;
  visual_suggestion?: string;
  title: string; // This will now be populated by 'headline' from OpenAI
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
  description: string;
  slides?: Slide[];
  theme?: Theme;
  updatedAt: string;
}