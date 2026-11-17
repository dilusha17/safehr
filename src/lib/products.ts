import { categories, type Category } from "@/data/categories";
import { products, type Product } from "@/data/products";

export type SortKey = "featured" | "price-asc" | "price-desc" | "name";
export const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price low to high" },
  { value: "price-desc", label: "Price high to low" },
  { value: "name", label: "Name A to Z" },
];

export type CategoryNode = Omit<Category, "children"> & { path: string[]; count: number; children: CategoryNode[] };

function build(cats: Category[], parent: string[]): CategoryNode[] {
  return cats
    .map((c) => {
      const path = [...parent, c.slug];
      const children = build(c.children ?? [], path);
      const count = products.filter((p) => path.every((s, i) => p.categoryPath[i] === s)).length;
      return { ...c, path, count, children };
    })
    .filter((c) => c.count > 0);
}

/** Category tree with product counts; empty categories are hidden. */
export const categoryTree: CategoryNode[] = build(categories, []);

export function findCategory(path: string[]): CategoryNode | undefined {
  let level = categoryTree;
  let found: CategoryNode | undefined;
  for (const slug of path) {
    found = level.find((c) => c.slug === slug);
    if (!found) return undefined;
    level = found.children;
  }
  return found;
}

export function allSubcategories(): CategoryNode[] {
  return categoryTree.flatMap((c) => c.children);
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function productSubcategory(p: Product): CategoryNode | undefined {
  return findCategory(p.categoryPath);
}

export function productsInPath(path: string[]): Product[] {
  return products.filter((p) => path.every((s, i) => p.categoryPath[i] === s));
}

export function priceBounds(list: Product[] = products): [number, number] {
  if (!list.length) return [0, 0];
  const prices = list.map((p) => p.price);
  return [Math.floor(Math.min(...prices)), Math.ceil(Math.max(...prices))];
}

export function allTags(list: Product[] = products): string[] {
  return Array.from(new Set(list.flatMap((p) => p.tags))).sort();
}

export function tagLabel(tag: string): string {
  return tag.split("-").map((w) => (/^\d/.test(w) ? w : (w[0] ?? "").toUpperCase() + w.slice(1))).join(" ");
}

export function categoryNames(p: Product): string {
  const names: string[] = [];
  for (let i = 1; i <= p.categoryPath.length; i++) {
    const c = findCategory(p.categoryPath.slice(0, i));
    if (c) names.push(c.name);
  }
  return names.join(" ");
}

export function searchProducts(list: Product[], q: string): Product[] {
  const term = q.trim().toLowerCase();
  if (!term) return list;
  return list.filter((p) => `${p.name} ${categoryNames(p)}`.toLowerCase().includes(term));
}

export type ProductFilters = { q?: string | undefined; sort?: SortKey | undefined; min?: number | undefined; max?: number | undefined; tag?: string | undefined };

export function applyFilters(list: Product[], f: ProductFilters): Product[] {
  let out = searchProducts(list, f.q ?? "");
  if (f.min !== undefined) out = out.filter((p) => p.price >= f.min!);
  if (f.max !== undefined) out = out.filter((p) => p.price <= f.max!);
  if (f.tag) out = out.filter((p) => p.tags.includes(f.tag!));
  const sorted = [...out];
  switch (f.sort ?? "featured") {
    case "price-asc":
      sorted.sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      sorted.sort((a, b) => b.price - a.price);
      break;
    case "name":
      sorted.sort((a, b) => a.name.localeCompare(b.name));
      break;
    default:
      sorted.sort((a, b) => Number(!!b.featured) - Number(!!a.featured));
  }
  return sorted;
}

export function relatedProducts(p: Product, limit = 4): Product[] {
  const same = products.filter((x) => x.id !== p.id && x.categoryPath.join("/") === p.categoryPath.join("/"));
  const top = products.filter(
    (x) => x.id !== p.id && x.categoryPath[0] === p.categoryPath[0] && !same.includes(x),
  );
  return [...same, ...top].slice(0, limit);
}

export type CrumbTarget = "home" | "shop" | string[];
export type Crumb = { label: string; target?: CrumbTarget };

export function categoryCrumbs(path: string[]): Crumb[] {
  const crumbs: Crumb[] = [{ label: "Home", target: "home" }, { label: "Shop", target: "shop" }];
  for (let i = 1; i <= path.length; i++) {
    const c = findCategory(path.slice(0, i));
    if (c) crumbs.push({ label: c.name, target: c.path });
  }
  return crumbs;
}
