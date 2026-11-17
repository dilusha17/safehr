import { Link } from "@tanstack/react-router";
import { CheckCircle2, Layers, MessageCircle, type LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import type { TechContent } from "@/data/content";
import { buildWhatsAppLink } from "@/lib/format";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { IndustriesStrip, SectionHeading } from "@/components/home/HomeSections";

export function FeatureCard({ title, body, Icon = CheckCircle2 }: { title: string; body: string; Icon?: LucideIcon }) {
  return (
    <div className="card-base p-6">
      <Icon className="size-7 text-safety-700" aria-hidden />
      <h3 className="mt-3 text-lg text-navy-900">{title}</h3>
      <p className="mt-1 text-sm text-muted-foreground">{body}</p>
    </div>
  );
}

export function StepList({ steps }: { steps: string[] }) {
  return (
    <ol className="grid gap-5 md:grid-cols-3">
      {steps.map((s, i) => (
        <li key={s} className="relative rounded-card bg-surface p-6">
          <span className="font-display text-5xl font-bold text-safety-500">{i + 1}</span>
          <p className="mt-2 font-medium text-navy-900">{s}</p>
        </li>
      ))}
    </ol>
  );
}

export function TechnologyPage({ content, visual, afterHero }: { content: TechContent; visual: ReactNode; afterHero?: ReactNode }) {
  const wa = buildWhatsAppLink(`Hello Safe HR, I'd like to know more about the ${content.name}.`);
  return (
    <>
      <section className="bg-navy-900 text-on-dark">
        <div className="container-page grid gap-12 py-14 md:grid-cols-2 md:items-center md:py-20">
          <div>
            <Breadcrumbs tone="light" items={[{ label: "Home", target: "home" }, { label: "Technology" }, { label: content.name }]} />
            <h1 className="mt-6 text-4xl md:text-5xl">{content.name}</h1>
            <p className="mt-4 text-lg text-on-dark-muted">{content.summary}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button asChild size="lg"><Link to="/contact" search={{ topic: content.topic }}>Request a demo</Link></Button>
              <Button asChild size="lg" variant="outlineLight"><a href={wa} target="_blank" rel="noopener noreferrer"><MessageCircle /> WhatsApp us</a></Button>
            </div>
          </div>
          <div className="pb-8">{visual}</div>
        </div>
      </section>
      {afterHero}
      <section className="section-y">
        <div className="container-page">
          <SectionHeading eyebrow="What it does" title="Key capabilities" />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {content.features.map((f) => <FeatureCard key={f.title} {...f} />)}
          </div>
        </div>
      </section>
      <section className="section-y pt-0">
        <div className="container-page">
          <SectionHeading eyebrow="How it works" title="Three simple steps" />
          <div className="mt-10"><StepList steps={content.steps} /></div>
        </div>
      </section>
      <IndustriesStrip title="Where it helps" />
      <section className="bg-safety-100">
        <div className="container-page flex flex-col items-start gap-4 py-10 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <Layers className="size-8 text-safety-700" aria-hidden />
            <p className="font-display text-xl font-bold text-navy-900">Works with the Safe HR safety platform</p>
          </div>
          <Button asChild variant="navy"><Link to="/contact" search={{ topic: content.topic }}>Talk to us</Link></Button>
        </div>
      </section>
      <section className="section-y">
        <div className="container-page max-w-3xl">
          <SectionHeading eyebrow="FAQ" title="Common questions" />
          <Accordion type="single" collapsible className="mt-8">
            {content.faq.map((f) => (
              <AccordionItem key={f.q} value={f.q}>
                <AccordionTrigger className="text-left text-base font-semibold text-navy-900">{f.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
      <section className="section-y bg-navy-900 text-center text-on-dark">
        <div className="container-page">
          <h2 className="text-3xl md:text-4xl">See how it would work at your site</h2>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Button asChild size="lg"><Link to="/contact" search={{ topic: content.topic }}>Request a demo</Link></Button>
            <Button asChild size="lg" variant="outlineLight"><a href={wa} target="_blank" rel="noopener noreferrer">WhatsApp us</a></Button>
          </div>
        </div>
      </section>
    </>
  );
}
