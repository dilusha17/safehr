import type { Product } from "@/data/products";
import { cn } from "@/lib/utils";
import { ProductCard } from "./ProductCard";

export function ProductGrid({ products, withSidebar, className }: { products: Product[]; withSidebar?: boolean; className?: string }) {
  return (
    <ul className={cn("grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3", withSidebar ? "xl:grid-cols-3" : "xl:grid-cols-4", className)}>
      {products.map((p) => (
        <li key={p.id} className="flex"><div className="flex w-full"><ProductCard product={p} /></div></li>
      ))}
    </ul>
  );
}
