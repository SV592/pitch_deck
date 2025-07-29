
export interface Slide {
  id: string;
  title: string;
  content: string;
  order: number;
}

export interface Deck {
  id: number;
  title: string;
  slides: Slide[];
  versions: Version[];
}

export interface Version {
  version: string;
  date: string;
  author: string;
  changes: string;
}
