import { AppIcon } from "@/components/AppIcon";
import { createFileRoute } from "@tanstack/react-router";

import { aboutServices, testimonials } from "@/data/content";
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
        <div className="container-page py-14 md:py-20">
          <p className="eyebrow text-safety-500">About us</p>
          <h1 className="mt-3 text-4xl md:text-5xl">Smart safety, delivered.</h1>
          <p className="mt-5 max-w-3xl text-lg text-on-dark-muted">Safe HR Consultants is a New Zealand workplace safety consultancy based in Parnell, Auckland. We pair practical compliance know-how with safety products and technology for modern operations.</p>
        </div>
      </section>
      <section className="section-y">
        <div className="container-page">
          <h2 className="text-3xl text-navy-900">What we do</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-3">{aboutServices.map((s) => <FeatureCard key={s.title} {...s} />)}</div>
          <p className="mt-8 rounded-card bg-safety-100 p-5 font-medium text-navy-900">NZ industry expertise: local compliance knowledge and practical implementation support.</p>
        </div>
      </section>
      <section className="section-y bg-surface">
        <div className="container-page">
          <h2 className="text-3xl text-navy-900">What clients say</h2>
          {/* TODO: owner to confirm named approval for each testimonial */}
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {testimonials.map((t) => (
              <figure key={t.company} className="card-base p-6">
                <AppIcon name="quote" size={28} />
                <blockquote className="mt-3 text-ink">“{t.quote}”</blockquote>
                <figcaption className="mt-4 text-sm"><span className="font-semibold text-navy-900">{t.role}</span>, <span className="text-muted-foreground">{t.company}</span></figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>
      <ClosingCta />
    </>
  );
}
