import { createFileRoute } from "@tanstack/react-router";
import { MessageCircle } from "lucide-react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { getProductBySlug } from "@/lib/products";
import { buildWhatsAppLink } from "@/lib/format";
import { seo } from "@/lib/seo";
import { BulkOrderForm } from "@/components/forms/BulkOrderForm";
import { StepList } from "@/components/tech/TechnologyPage";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";

export const Route = createFileRoute("/bulk-orders")({
  validateSearch: z.object({ product: z.string().optional().catch(undefined) }),
  head: () => seo("Bulk Orders", "Buying safety gloves for a team, site or fleet? Contact Safe HR Consultants for bulk pricing.", "/bulk-orders"),
  component: BulkPage,
});

function BulkPage() {
  const { product } = Route.useSearch();
  const p = product ? getProductBySlug(product) : undefined;
  const wa = buildWhatsAppLink(p ? `Hello Safe HR, I'd like bulk pricing for ${p.name}.` : "Hello Safe HR, I'd like to ask about bulk pricing.");
  return (
    <>
      <section className="bg-navy-900 text-on-dark">
        <div className="container-page py-14 md:py-20">
          <Breadcrumbs tone="light" items={[{ label: "Home", target: "home" }, { label: "Bulk orders" }]} />
          <h1 className="mt-6 max-w-3xl text-4xl md:text-5xl">Buying for a team, site or fleet? Contact the seller for bulk pricing.</h1>
          <Button asChild size="lg" className="mt-8"><a href={wa} target="_blank" rel="noopener noreferrer"><MessageCircle /> WhatsApp the seller</a></Button>
        </div>
      </section>
      <section className="section-y">
        <div className="container-page">
          {/* TODO: owner to confirm process and turnaround; do not state a turnaround time */}
          <StepList steps={["Tell us what you need.", "We come back to you with pricing.", "Confirm your order with our team."]} />
          <p className="mt-6 text-sm text-muted-foreground">Contact us for bulk pricing if you need more than 20 pairs of one product, or have 10 or more items in your cart.</p>
          <div className="mt-12 max-w-3xl">
            <h2 className="text-3xl text-navy-900">Send a bulk enquiry</h2>
            <div className="mt-6"><BulkOrderForm key={p?.slug ?? "none"} {...(p ? { productName: p.name } : {})} /></div>
          </div>
        </div>
      </section>
    </>
  );
}
