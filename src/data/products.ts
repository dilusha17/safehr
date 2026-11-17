// TODO: download product images into src/assets/products/ before the old site is retired.
// Descriptions come only from the old product names and intros; add no specifications beyond `details`.
// TODO: confirm GST-inclusive pricing.
export type Product = {
  id: string; slug: string; name: string; price: number; // NZD
  categoryPath: string[];
