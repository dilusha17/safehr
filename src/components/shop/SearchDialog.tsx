import { useNavigate } from "@tanstack/react-router";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { products } from "@/data/products";
import { allSubcategories, categoryNames, categoryTree } from "@/lib/products";
import { formatNZD } from "@/lib/format";

export function SearchDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (o: boolean) => void }) {
  const navigate = useNavigate();
  const go = (fn: () => void) => {
    onOpenChange(false);
    fn();
  };
  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput placeholder="Search gloves and categories…" aria-label="Search products" />
      <CommandList>
        <CommandEmpty>No matches. Try “cut” or “garden”.</CommandEmpty>
        <CommandGroup heading="Categories">
          {[...categoryTree, ...allSubcategories()].map((c) => (
            <CommandItem
              key={c.path.join("/")}
              value={`${c.name} category`}
              onSelect={() =>
                go(() => {
                  const [a = "", b] = c.path;
                  if (b) navigate({ to: "/shop/$category/$subcategory", params: { category: a, subcategory: b } });
                  else navigate({ to: "/shop/$category", params: { category: a } });
                })
              }
            >
              {c.name} <span className="ml-auto text-xs text-muted-foreground">{c.count}</span>
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandGroup heading="Products">
          {products.map((p) => (
            <CommandItem
              key={p.id}
              value={`${p.name} ${categoryNames(p)}`}
              onSelect={() => go(() => navigate({ to: "/product/$slug", params: { slug: p.slug } }))}
            >
              <span className="line-clamp-1">{p.name}</span>
              <span className="ml-auto text-xs font-semibold">{formatNZD(p.price)}</span>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
