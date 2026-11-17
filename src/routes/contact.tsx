import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, MessageCircle, Phone, type LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { company } from "@/data/company";
import { seo } from "@/lib/seo";
import { ContactForm } from "@/components/forms/ContactForm";

export const Route = createFileRoute("/contact")({
  validateSearch: z.object({ topic: z.enum(["general", "order", "bulk", "air-quality", "ai-camera"]).optional().catch(undefined) }),
  head: () => seo("Contact", "Contact Safe HR Consultants in Parnell, Auckland by phone, WhatsApp or email.", "/contact"),
  component: ContactPage,
});

function InfoCard({ Icon, title, children }: { Icon: LucideIcon; title: string; children: ReactNode }) {
  return (
    <div className="card-base flex gap-4 p-5">
      <span className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-safety-100 text-safety-700"><Icon className="size-5" aria-hidden /></span>
      <div><h2 className="text-base text-navy-900">{title}</h2><div className="mt-1 text-sm text-ink">{children}</div></div>
    </div>
  );
}

function ContactPage() {
  const { topic } = Route.useSearch();
  return (
    <div className="container-page py-10 md:py-14">
      <h1 className="text-4xl text-navy-900 md:text-5xl">Contact us</h1>
      <p className="mt-2 text-muted-foreground">Questions about products, orders or our technology? We are happy to help.</p>
      <div className="mt-10 grid gap-10 lg:grid-cols-2">
        <div className="space-y-4">
          <InfoCard Icon={MapPin} title="Address">
            <address className="not-italic">{company.address.full}</address>
            <Button asChild variant="link" className="h-auto p-0"><a href={company.mapsUrl} target="_blank" rel="noopener noreferrer">Open in Google Maps</a></Button>
          </InfoCard>
          <InfoCard Icon={Phone} title="Phone"><a href={company.phone.href} className="font-semibold hover:underline">{company.phone.display}</a></InfoCard>
          <InfoCard Icon={MessageCircle} title="WhatsApp"><a href={company.whatsapp.href} target="_blank" rel="noopener noreferrer" className="font-semibold hover:underline">{company.whatsapp.display}</a></InfoCard>
          <InfoCard Icon={Mail} title="Email"><a href={`mailto:${company.email}`} className="break-all font-semibold hover:underline">{company.email}</a></InfoCard>
          <iframe title={`Map of ${company.address.full}`} src={company.mapsEmbedUrl} loading="lazy" referrerPolicy="no-referrer-when-downgrade" width={600} height={320} className="h-80 w-full rounded-card border border-line" />
        </div>
        <div className="card-base h-fit p-6 hover:shadow-none md:p-8">
          <h2 className="text-2xl text-navy-900">Send an enquiry</h2>
          <div className="mt-6"><ContactForm key={topic ?? "general"} topic={topic} /></div>
        </div>
      </div>
    </div>
  );
}
