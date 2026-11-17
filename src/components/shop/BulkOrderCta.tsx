import { AppIcon } from "@/components/AppIcon";
import { Link } from "@tanstack/react-router";
import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/ui/button";
import { buildWhatsAppLink } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { Product } from "@/data/products";

type Variant = "banner" | "box" | "inline";
type Props = {
  variant?: Variant;
  product?: Product;
  productUrl?: string;
  title?: string;
  body?: string;
  className?: string;
};

/** Single source for every "contact the seller for bulk pricing" call to action. */
export function BulkOrderCta({ variant = "banner", product, productUrl, title, body, className }: Props) {
  const message = product
    ? `Hello Safe HR, I'd like bulk pricing for ${product.name}.${productUrl ? ` ${productUrl}` : ""}`
    : "Hello Safe HR, I'd like to ask about bulk pricing.";
  const wa = buildWhatsAppLink(message);

  if (variant === "inline") {
    return (
      <p className={cn("text-xs font-medium text-safety-700", className)}>
        Need more?{" "}
        <Link to="/bulk-orders" search={{ product: product?.slug }} className="underline underline-offset-2">
          Contact us for bulk pricing
        </Link>
      </p>
    );
  }

  if (variant === "box") {
    return (
      <div className={cn("rounded-card border border-safety-500/40 bg-safety-100 p-5", className)}>
        <p className="font-display text-lg font-bold text-navy-900">{title ?? "Need more than 20 pairs?"}</p>
        <p className="mt-1 text-sm text-ink">{body ?? "Bulk orders: contact the seller."}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          <Button asChild variant="navy">
            <a href={wa} target="_blank" rel="noopener noreferrer"><AppIcon name="whatsapp" size={20} /> WhatsApp the seller</a>
          </Button>
          <Button asChild variant="outline">
            <Link to="/bulk-orders" search={{ product: product?.slug }}><AppIcon name="email" size={20} /> Send an enquiry</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <section className={cn("rounded-card bg-navy-900 p-8 text-on-dark md:p-12", className)} aria-label="Bulk orders">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <Reveal animation="fade-right" className="max-w-2xl">
          <p className="eyebrow text-safety-500">Bulk orders</p>
          <h2 className="mt-2 text-2xl md:text-3xl">{title ?? "Ordering for a whole team or site? Contact us for bulk pricing."}</h2>
          {body && <p className="mt-2 text-on-dark-muted">{body}</p>}
        </Reveal>
        <Reveal animation="fade-left" className="flex flex-wrap gap-3">
          <Button asChild size="lg">
            <a href={wa} target="_blank" rel="noopener noreferrer"><AppIcon name="whatsapp" size={20} /> WhatsApp us</a>
          </Button>
          <Button asChild size="lg" variant="outlineLight">
            <Link to="/bulk-orders" search={{ product: product?.slug }}><AppIcon name="email" size={20} /> Send an enquiry</Link>
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
