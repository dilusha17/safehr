import type { LegalPage } from "@/data/legal";
import { Breadcrumbs } from "./Breadcrumbs";

export function LegalView({ page }: { page: LegalPage }) {
  return (
    <div className="container-page max-w-3xl py-10 md:py-14">
      <Breadcrumbs items={[{ label: "Home", target: "home" }, { label: page.title }]} />
      <p className="mt-6 rounded-md border border-hivis-400 bg-hivis-400/15 p-3 text-sm font-medium text-navy-900" role="note">Draft content: to be reviewed by the business before launch.</p>
      <h1 className="mt-6 text-4xl text-navy-900">{page.title}</h1>
      <p className="mt-3 text-muted-foreground">{page.intro}</p>
      {page.sections.map((s) => (
        <section key={s.heading} className="mt-8">
          <h2 className="text-2xl text-navy-900">{s.heading}</h2>
          <p className="mt-2 text-ink">{s.body}</p>
        </section>
      ))}
    </div>
  );
}
