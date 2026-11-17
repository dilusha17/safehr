export type Category = {
  slug: string;
  name: string;
  description?: string;
  children?: Category[];
};

/** Nested category tree. Add new top-level categories (e.g. Safety Equipment) here; empty ones are hidden automatically. */
export const categories: Category[] = [
  {
    slug: "safety-gloves",
    name: "Safety Gloves",
    description: "Cut, chemical, impact, general-use and garden protection.",
    children: [
      { slug: "cut-resistance", name: "Cut Resistance" },
      { slug: "chemical-resistance", name: "Chemical Resistance" },
      { slug: "general-use", name: "General Use" },
      { slug: "impact-protection", name: "Impact Protection" },
      { slug: "garden-use", name: "Garden Use" },
    ],
  },
];
