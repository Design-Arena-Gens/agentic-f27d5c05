import slidesData from "./slides.json";

export type Slide = {
  id: string;
  title: string;
  tagline?: string;
  points: string[];
  highlight?: string;
};

export const slides = slidesData as Slide[];
