import { AppIcon } from "@/components/AppIcon";
import { createFileRoute, notFound, useNavigate } from "@tanstack/react-router";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "@tanstack/react-router";
import { MAX_QTY_PER_LINE } from "@/config/commerce";
import { useCart } from "@/hooks/useCart";
import { formatNZD } from "@/lib/format";
import { categoryCrumbs, getProductBySlug, productSubcategory, relatedProducts } from "@/lib/products";
import { seo } from "@/lib/seo";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { ProductGallery } from "@/components/shop/ProductGallery";
import { QuantityStepper } from "@/components/shop/QuantityStepper";
import { BulkOrderCta } from "@/components/shop/BulkOrderCta";
import { ProductGrid } from "@/components/shop/ProductGrid";
import { useAddToCart } from "@/components/shop/ProductCard";
import { clampQty } from "@/context/CartContext";
import { Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/product/$slug")({
  loader: ({ params }) => {
    const product = getProductBySlug(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) return { meta: [{ title: "Product not found | Safe HR Consultants" }, { name: "robots", content: "noindex" }] };
    const p = loaderData.product;
    const base = seo(p.name, `${p.shortDescription} ${formatNZD(p.price)} NZD from Safe HR Consultants.`, `/product/${params.slug}`, "product");
    return {
      ...base,
      meta: [...base.meta, { property: "og:image", content: p.imageUrl }, { name: "twitter:image", content: p.imageUrl }],
      scripts: [{
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org", "@type": "Product", name: p.name, image: [p.imageUrl, ...(p.images ?? [])],
          description: p.shortDescription, brand: { "@type": "Brand", name: "SAFE HR" },
          offers: { "@type": "Offer", price: p.price.toFixed(2), priceCurrency: "NZD" },
        }),
      }],
    };
  },
  component: ProductPage,
});

function ProductPage() {
  const { product: p } = Route.useLoaderData();
  const [qty, setQty] = useState(1);
  const [url, setUrl] = useState("");
  const add = useAddToCart();
  const { addItem } = useCart();
  const navigate = useNavigate();
  const sub = productSubcategory(p);
  useEffect(() => { setUrl(window.location.href); setQty(1); }, [p.slug]);
  const buyNow = () => { addItem(p.id, qty); navigate({ to: "/cart" }); };
  const images = [p.imageUrl, ...(p.images ?? [])];

  return (
    <>
      <div className="container-page py-8 pb-28 md:pb-16">
        <Breadcrumbs items={[...categoryCrumbs(p.categoryPath), { label: p.name }]} />
        <div className="mt-8 grid gap-10 md:grid-cols-2">
          <ProductGallery images={images} alt={p.name} />
          <div>
            {sub && <span className="rounded-full bg-surface px-3 py-1 text-xs font-medium text-muted-foreground">{sub.name}</span>}
            <h1 className="mt-3 text-3xl text-navy-900 md:text-4xl">{p.name}</h1>
            {/* TODO: confirm GST-inclusive */}
            <p className="mt-4 text-3xl font-bold text-safety-700">{formatNZD(p.price)} <span className="text-sm font-medium text-muted-foreground">NZD</span></p>
            <p className="mt-4 text-ink">{p.shortDescription}</p>
            <dl className="mt-6 divide-y divide-line rounded-card border border-line">
              {p.details.map((d) => (
                <div key={d.label} className="flex justify-between px-4 py-2.5 text-sm"><dt className="text-muted-foreground">{d.label}</dt><dd className="font-semibold">{d.value}</dd></div>
              ))}
            </dl>
            {p.inStock ? (
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <QuantityStepper value={qty} onChange={(n) => setQty(clampQty(n))} label="Quantity" />
                <Button size="lg" onClick={() => add(p, qty)}><AppIcon name="cart" size={20} /> Add to cart</Button>
                <Button size="lg" variant="outline" onClick={buyNow}><AppIcon name="buy" size={20} /> Buy now</Button>
              </div>
            ) : (
              <Button size="lg" className="mt-6" disabled>Out of stock</Button>
            )}
            {qty >= MAX_QTY_PER_LINE && <p className="mt-3 text-sm font-medium text-safety-700" role="status">For larger quantities, contact us for bulk pricing</p>}
            <BulkOrderCta variant="box" product={p} productUrl={url} className="mt-6" />
          </div>
        </div>
        <Tabs defaultValue="description" className="mt-14">
          <TabsList>
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="shipping">Shipping and Returns</TabsTrigger>
          </TabsList>
          <TabsContent value="description" className="max-w-3xl pt-4 text-ink">{p.shortDescription}</TabsContent>
          <TabsContent value="details" className="max-w-3xl pt-4">
            <ul className="list-disc space-y-1 pl-5">{p.details.map((d) => <li key={d.label}>{d.label}: {d.value}</li>)}</ul>
          </TabsContent>
          <TabsContent value="shipping" className="max-w-3xl pt-4 text-ink">
            {/* TODO: confirm shipping and returns terms */}
            Delivery and returns terms are being confirmed. Our team confirms delivery with you when you place an order request.{" "}
            <Link to="/shipping-returns" className="font-semibold text-safety-700 underline">Shipping and Returns</Link>
          </TabsContent>
        </Tabs>
        <section className="mt-16">
          <Reveal><h2 className="text-2xl text-navy-900 md:text-3xl">Related products</h2></Reveal>
          <ProductGrid products={relatedProducts(p)} className="mt-6" />
        </section>
      </div>
      {p.inStock && (
        <div className="fixed inset-x-0 bottom-0 z-30 flex items-center gap-3 border-t border-line bg-background p-3 shadow-lg md:hidden">
          <p className="font-bold">{formatNZD(p.price)}</p>
          <Button className="flex-1" size="lg" onClick={() => add(p, qty)}><AppIcon name="cart" size={20} /> Add to cart</Button>
        </div>
      )}
    </>
  );
}
