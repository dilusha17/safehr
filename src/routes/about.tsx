import { Reveal, stagger } from "@/components/Reveal";
import { AppIcon } from "@/components/AppIcon";
import { createFileRoute, Link } from "@tanstack/react-router";

import { aboutServices, testimonials, premiumEquipment } from "@/data/content";
import { company } from "@/data/company";
import { Button } from "@/components/ui/button";
import { seo } from "@/lib/seo";
import { FeatureCard } from "@/components/tech/TechnologyPage";
import { ClosingCta } from "@/components/home/HomeSections";

export const Route = createFileRoute("/about")({
  head: () => seo("About", "Safe HR Consultants is a New Zealand workplace safety consultancy based in Parnell, Auckland.", "/about"),
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <section className="bg-navy-900 text-on-dark">
        <Reveal animation="fade-right" className="container-page py-14 md:py-20">
          <p className="eyebrow text-safety-500">About us</p>
          <h1 className="mt-3 text-4xl md:text-5xl">Smart safety, delivered.</h1>
          <p className="mt-5 max-w-3xl text-lg text-on-dark-muted">{premiumEquipment.opening}</p>
        </Reveal>
      </section>
      <section className="section-y border-b border-line">
        <div className="container-page">
          <Reveal><h2 className="text-3xl text-navy-900">{premiumEquipment.title}</h2><p className="mt-5 max-w-3xl text-lg leading-8 text-muted-foreground">{premiumEquipment.introduction} As distributors of {company.distributorBrand.name}, {premiumEquipment.closing}</p></Reveal>
          {/* TODO: confirm authorised distributor wording and permission to show the partner logo. */}
          <div className="mt-7 inline-flex items-center gap-3 rounded-card border border-line bg-safety-100 p-5"><AppIcon name="safety" size={40} /><span className="font-semibold text-navy-900">Distributor of {company.distributorBrand.name}</span></div>
          <div className="mt-8 grid gap-5 md:grid-cols-3">{premiumEquipment.cards.map((card, i) => <Reveal key={card.title} delay={stagger(i)}><article className="card-base h-full p-6"><AppIcon name={card.icon} size={48} /><h3 className="mt-4 text-xl text-navy-900">{card.title}</h3><p className="mt-3 text-muted-foreground">{card.body}</p></article></Reveal>)}</div>
          <div className="mt-8 flex flex-wrap gap-3"><Button asChild size="lg"><Link to="/shop">Shop equipment</Link></Button><Button asChild variant="outline" size="lg"><Link to="/bulk-orders" search={{ product: undefined }}>Bulk orders</Link></Button></div>
        </div>
      </section>
      <section className="section-y">
        <div className="container-page">
          <Reveal><h2 className="text-3xl text-navy-900">What we do</h2></Reveal>
          <div className="mt-8 grid gap-5 md:grid-cols-3">{aboutServices.map((s, i) => <FeatureCard key={s.title} {...s} delay={stagger(i)} />)}</div>
          <p className="mt-8 rounded-card bg-safety-100 p-5 font-medium text-navy-900">NZ industry expertise: local compliance knowledge and practical implementation support.</p>
        </div>
      </section>
      <section className="section-y bg-surface">
        <div className="container-page">
          <Reveal><h2 className="text-3xl text-navy-900">What clients say</h2></Reveal>
          {/* TODO: owner to confirm named approval for each testimonial */}
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <Reveal key={t.company} delay={stagger(i)}><figure className="card-base h-full p-6">
                <AppIcon name="quote" size={28} />
                <blockquote className="mt-3 text-ink">“{t.quote}”</blockquote>
                <figcaption className="mt-4 text-sm"><span className="font-semibold text-navy-900">{t.role}</span>, <span className="text-muted-foreground">{t.company}</span></figcaption>
              </figure></Reveal>
            ))}
          </div>
        </div>
      </section>
      <ClosingCta />
    </>
  );
}
