export interface Slide {
  id: string;
  title: string;
  content: string;
  order: number;
}

export interface Deck {
  id: string;
  title: string;
  slides?: Slide[];
}