export interface Slide {
  id: string;
  title: string;
  content: string;
  order: number;
}

export interface Deck {
  id: number;
  title: string;
  slides?: Slide[];
}