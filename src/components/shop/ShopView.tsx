import { Link } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PAGE_SIZE } from "@/config/commerce";
import { products as allProducts } from "@/data/products";
import { allTags, applyFilters, categoryCrumbs, priceBounds, productsInPath } from "@/lib/products";
import type { ShopSearch } from "@/lib/shopSearch";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { FilterSidebar } from "./FilterSidebar";
import { FilterSheet } from "./FilterSheet";
import { SortSelect } from "./SortSelect";
import { ProductGrid } from "./ProductGrid";
import { BulkOrderCta } from "./BulkOrderCta";

type Props = { path: string[]; title: string; description?: string | undefined; search: ShopSearch; onSearch: (s: ShopSearch) => void };

export function ShopView({ path, title, description, search, onSearch }: Props) {
  const base = useMemo(() => (path.length ? productsInPath(path) : allProducts), [path]);
  const bounds = priceBounds(allProducts);
  const tags = allTags(base);
  const results = applyFilters(base, search);
  const [visible, setVisible] = useState(PAGE_SIZE);
  const [q, setQ] = useState(search.q ?? "");
  useEffect(() => setVisible(PAGE_SIZE), [path, search.q, search.sort, search.min, search.max, search.tag]);
  useEffect(() => setQ(search.q ?? ""), [search.q]);
  useEffect(() => {
    const t = setTimeout(() => { if ((search.q ?? "") !== q) onSearch({ ...search, q: q || undefined }); }, 250);
    return () => clearTimeout(t);
  }, [q]); // eslint-disable-line react-hooks/exhaustive-deps

  const update = (patch: Partial<ShopSearch>) => onSearch({ ...search, ...patch });
  const clear = () => { setQ(""); onSearch({}); };
  const filterProps = {
    activePath: path, bounds, min: search.min, max: search.max, tags, tag: search.tag,
    onPrice: ([min, max]: [number, number]) => update({ min: min === bounds[0] ? undefined : min, max: max === bounds[1] ? undefined : max }),
    onTag: (tag: string | undefined) => update({ tag }),
    onClear: clear,
  };
  const crumbs = path.length ? categoryCrumbs(path) : [{ label: "Home", target: "home" as const }, { label: "Shop" }];

  return (
    <>
      <section className="border-b border-line bg-surface">
        <div className="container-page py-10">
          <Breadcrumbs items={crumbs} />
          <h1 className="mt-4 text-4xl text-navy-900 md:text-5xl">{title}</h1>
          {description && <p className="mt-2 max-w-2xl text-muted-foreground">{description}</p>}
          <p className="mt-2 text-sm text-muted-foreground" aria-live="polite">{results.length} {results.length === 1 ? "product" : "products"}</p>
        </div>
      </section>
      <div className="container-page grid gap-10 py-10 lg:grid-cols-[16rem_1fr]">
        <aside className="hidden lg:block" aria-label="Filters"><FilterSidebar {...filterProps} /></aside>
        <div>
          <div className="mb-6 flex flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
              <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search products" aria-label="Search products" className="h-11 pl-9" />
            </div>
            <div className="flex gap-3">
              <FilterSheet {...filterProps} />
              <SortSelect value={search.sort ?? "featured"} onChange={(sort) => update({ sort: sort === "featured" ? undefined : sort })} />
            </div>
          </div>
          {results.length === 0 ? (
            <div className="rounded-card border border-dashed border-line p-10 text-center">
              <p className="font-display text-2xl font-bold text-navy-900">No products match those filters</p>
              <p className="mt-2 text-muted-foreground">Try clearing the filters, or ask us and we will help you find the right glove.</p>
              <div className="mt-5 flex justify-center gap-3">
                <Button onClick={clear}>Clear filters</Button>
                <Button asChild variant="outline"><Link to="/contact" search={{ topic: undefined }}>Contact us</Link></Button>
              </div>
            </div>
          ) : (
            <>
              <ProductGrid products={results.slice(0, visible)} withSidebar />
              {visible < results.length && (
                <div className="mt-8 text-center"><Button variant="outline" size="lg" onClick={() => setVisible((v) => v + PAGE_SIZE)}>Load more</Button></div>
              )}
            </>
          )}
        </div>
      </div>
      <div className="container-page pb-16"><BulkOrderCta /></div>
    </>
  );
}
