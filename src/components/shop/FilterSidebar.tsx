import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { categoryTree, tagLabel } from "@/lib/products";
import { formatNZD } from "@/lib/format";
import { cn } from "@/lib/utils";
import { CategoryLink } from "@/components/layout/CategoryLink";

export type FilterProps = {
  activePath: string[];
  bounds: [number, number];
  min?: number | undefined;
  max?: number | undefined;
  tags: string[];
  tag?: string | undefined;
  onPrice: (range: [number, number]) => void;
  onTag: (tag: string | undefined) => void;
  onClear: () => void;
  onNavigate?: (() => void) | undefined;
};

export function FilterSidebar({ activePath, bounds, min, max, tags, tag, onPrice, onTag, onClear, onNavigate }: FilterProps) {
  const isActive = (path: string[]) => path.join("/") === activePath.join("/");
  const itemCls = (active: boolean) =>
    cn("flex justify-between rounded-md px-2 py-1.5 text-sm hover:bg-surface", active ? "bg-safety-100 font-semibold text-safety-700" : "text-ink");
  return (
    <div className="space-y-8">
      <section aria-labelledby="f-cat">
        <h2 id="f-cat" className="text-base">Categories</h2>
        <ul className="mt-3 space-y-0.5">
          <li><CategoryLink path={[]} className={itemCls(activePath.length === 0)} onClick={onNavigate}><span>All products</span></CategoryLink></li>
          {categoryTree.map((top) => (
            <li key={top.slug}>
              <CategoryLink path={top.path} className={itemCls(isActive(top.path))} onClick={onNavigate}>
                <span>{top.name}</span><span className="text-muted-foreground">{top.count}</span>
              </CategoryLink>
              <ul className="ml-3 mt-0.5 space-y-0.5 border-l border-line pl-2">
                {top.children.map((sub) => (
                  <li key={sub.slug}>
                    <CategoryLink path={sub.path} className={itemCls(isActive(sub.path))} onClick={onNavigate}>
                      <span>{sub.name}</span><span className="text-muted-foreground">{sub.count}</span>
                    </CategoryLink>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </section>
      <section aria-labelledby="f-price">
        <h2 id="f-price" className="text-base">Price</h2>
        <Slider
          className="mt-5"
          min={bounds[0]}
          max={bounds[1]}
          step={1}
          value={[min ?? bounds[0], max ?? bounds[1]]}
          onValueChange={(v) => onPrice([v[0] ?? bounds[0], v[1] ?? bounds[1]])}
          aria-label="Price range"
        />
        <p className="mt-3 text-sm text-muted-foreground">
          {formatNZD(min ?? bounds[0])} – {formatNZD(max ?? bounds[1])}
        </p>
      </section>
      {tags.length > 0 && (
        <section aria-labelledby="f-tag">
          <h2 id="f-tag" className="text-base">Features</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {tags.map((t) => (
              <Button
                key={t}
                type="button"
                aria-pressed={tag === t}
                onClick={() => onTag(tag === t ? undefined : t)}
                variant="ghost"
                className={cn(
                  "h-auto rounded-full border px-3 py-1 text-sm font-normal transition-colors",
                  tag === t ? "border-safety-500 bg-safety-500 text-navy-900 hover:bg-safety-600" : "border-line bg-background text-ink hover:border-safety-500",
                )}
              >
                {tagLabel(t)}
              </Button>
            ))}
          </div>
        </section>
      )}
      <Button variant="outline" size="sm" onClick={onClear}>Clear filters</Button>
    </div>
  );
}
