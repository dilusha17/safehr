import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { AppIcon } from "@/components/AppIcon";
import type { IconName } from "@/lib/icons";
import { Reveal, stagger } from "@/components/Reveal";
import { Button } from "@/components/ui/button";
import { products } from "@/data/products";
import { industries, whyShop } from "@/data/content";
import { allSubcategories, productsInPath } from "@/lib/products";
import { CategoryLink } from "@/components/layout/CategoryLink";
import { SafeImage } from "@/components/shop/SafeImage";
import { ProductGrid } from "@/components/shop/ProductGrid";

export function SectionHeading({ eyebrow, title, body, center }: { eyebrow?: string; title: string; body?: string; center?: boolean }) {
  return (
    <Reveal><div className={center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      {eyebrow && <p className="eyebrow text-safety-700">{eyebrow}</p>}
      <h2 className="mt-2 text-3xl text-navy-900 md:text-4xl">{title}</h2>
      {body && <p className="mt-3 text-muted-foreground">{body}</p>}
    </div></Reveal>
  );
}

const categoryIcons: Record<string, IconName> = { "cut-resistant": "cut", "chemical-resistant": "chemical", "general-use": "gloves", "impact-protection": "impact", "garden-use": "garden" };

export function CategoryTiles() {
  const subs = allSubcategories();
  return (
    <section className="section-y">
      <div className="container-page">
        <SectionHeading eyebrow="Shop by category" title="Find the right glove for the task" />
        <ul className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
          {subs.map((c, i) => {
            const img = productsInPath(c.path)[0]?.imageUrl;
            return (
              <li key={c.slug}>
                <Reveal animation="zoom-in" delay={stagger(i)} className="h-full"><CategoryLink path={c.path} className="card-base group flex h-full flex-col overflow-hidden">
                  <div className="aspect-square bg-surface p-4">
                    {img && <SafeImage src={img} alt="" width={240} height={240} className="size-full object-contain transition-transform duration-200 group-hover:scale-105" />}
                  </div>
                  <div className="flex items-center justify-between gap-2 p-4">
                    <span>
                      <AppIcon name={categoryIcons[c.slug] ?? "gloves"} size={32} /><span className="block font-display text-lg font-bold text-navy-900">{c.name}</span>
                      <span className="text-xs text-muted-foreground">{c.count} {c.count === 1 ? "product" : "products"}</span>
                    </span>
                    <ArrowRight className="size-4 text-safety-700 transition-transform group-hover:translate-x-1" aria-hidden />
                  </div>
                </CategoryLink></Reveal>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

export function FeaturedProducts() {
  const featured = products.filter((p) => p.featured).slice(0, 4);
  return (
    <section className="section-y bg-surface">
      <div className="container-page">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading eyebrow="Best sellers" title="Popular with NZ workplaces" />
          <Button asChild variant="link"><Link to="/shop">View all products <ArrowRight /></Link></Button>
        </div>
        <ProductGrid animate products={featured} className="mt-10" />
      </div>
    </section>
  );
}

export function WhyShop() {
  const icons = ["safety", "bulk", "whatsapp"] as const;
  return (
    <section className="section-y">
      <div className="container-page">
        <SectionHeading eyebrow="Why shop with Safe HR" title="Protection chosen by safety people" center />
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {whyShop.map((w, i) => {
            const icon = icons[i] ?? "safety";
            return (
              <Reveal key={w.title} delay={stagger(i)}><div className="card-base h-full p-6">
                <AppIcon name={icon} />
                <h3 className="mt-4 text-xl text-navy-900">{w.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{w.body}</p>
              </div></Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function TechTeaser() {
  const items = [
    { to: "/technology/air-quality-monitoring" as const, Icon: "air" as IconName, title: "Air Quality Monitoring Device", body: "IoT sensors for air quality, carbon monoxide and environmental data, feeding a live compliance view." },
    { to: "/technology/ai-safety-camera-system" as const, Icon: "camera" as IconName, title: "AI Safety Camera System", body: "AI camera analytics with Redvision integration that help detect unsafe acts and PPE breaches earlier." },
  ];
  return (
    <section className="section-y bg-surface">
      <div className="container-page">
        <SectionHeading eyebrow="Technology" title="Safety technology for modern sites" body="Enquiry only. Talk to us about how these fit your workplace." />
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {items.map(({ to, Icon, title, body }, i) => (
            <Reveal key={to} delay={stagger(i)}><Link to={to} className="card-base group flex gap-5 p-6">
              <AppIcon name={Icon} size={56} />
              <span>
                <span className="block font-display text-xl font-bold text-navy-900">{title}</span>
                <span className="mt-1 line-clamp-2 block text-sm text-muted-foreground">{body}</span>
                <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-safety-700">Learn more <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden /></span>
              </span>
            </Link></Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

const industryIcons = { Agriculture: "agriculture", Logistics: "logistics", Warehousing: "warehousing", Manufacturing: "manufacturing" } as const;

export function IndustriesStrip({ title = "Industries we protect" }: { title?: string }) {
  return (
    <section className="section-y">
      <div className="container-page">
        <SectionHeading eyebrow="Industries" title={title} />
        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {industries.map((ind, i) => {
            const Icon = industryIcons[ind.name];
            return (
              <li key={ind.name}><Reveal delay={stagger(i)} className="h-full border-t-4 border-safety-500 bg-surface p-6">
                <AppIcon name={Icon} />
                <h3 className="mt-3 text-xl text-navy-900">{ind.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{ind.description}</p>
              </Reveal></li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

export function ClosingCta() {
  return (
    <section className="section-y">
      <Reveal className="container-page text-center">
        <h2 className="mx-auto max-w-2xl text-3xl text-navy-900 md:text-4xl">Need help choosing the right protection?</h2>
        <p className="mt-3 text-muted-foreground">Tell us about the job and we will point you to the right glove.</p>
        <Button asChild size="lg" className="mt-6"><Link to="/contact" search={{ topic: undefined }}>Contact us</Link></Button>
      </Reveal>
    </section>
  );
}
