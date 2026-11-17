import { Link, useNavigate } from "@tanstack/react-router";
import { ShoppingCart } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/useCart";
import { formatNZD } from "@/lib/format";
import { productSubcategory } from "@/lib/products";
import type { Product } from "@/data/products";
import { SafeImage } from "./SafeImage";

export function useAddToCart() {
  const { addItem } = useCart();
  const navigate = useNavigate();
  return (p: Product, qty = 1) => {
    addItem(p.id, qty);
    toast.success("Added to cart", {
      description: p.name,
      action: { label: "View cart", onClick: () => navigate({ to: "/cart" }) },
    });
  };
}

export function ProductCard({ product }: { product: Product }) {
  const add = useAddToCart();
  const sub = productSubcategory(product);
  return (
    <article className="card-base group relative flex flex-col overflow-hidden hover:-translate-y-0.5">
      <div className="aspect-square bg-surface p-4">
        <SafeImage src={product.imageUrl} alt={product.name} width={400} height={400} className="size-full object-contain transition-transform duration-200 group-hover:scale-[1.03]" />
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        {sub && <span className="w-fit rounded-full bg-surface px-2.5 py-0.5 text-xs font-medium text-muted-foreground">{sub.name}</span>}
        <h3 className="line-clamp-2 font-sans text-sm font-semibold leading-snug text-navy-900 md:text-base">
          <Link to="/product/$slug" params={{ slug: product.slug }} className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none">
            {product.name}
          </Link>
        </h3>
        <p className="mt-auto text-lg font-bold text-navy-900">{formatNZD(product.price)}</p>
        {product.inStock ? (
          <Button className="relative z-10 w-full" onClick={() => add(product)} aria-label={`Add ${product.name} to cart`}>
            <ShoppingCart /> Add to cart
          </Button>
        ) : (
          <Button className="relative z-10 w-full" disabled>Out of stock</Button>
        )}
      </div>
    </article>
  );
}
