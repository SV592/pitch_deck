
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
  versions: Version[];
  thumbnail?: string;
  slideCount?: number;
  description?: string;
  currentVersion?: string;
  lastModified?: string;
  collaborators?: any[];
}

export interface Version {
  version: string;
  date: string;
  author: string;
  changes: string;
}
