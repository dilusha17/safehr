import { createFileRoute } from "@tanstack/react-router";
import { terms } from "@/data/legal";
import { seo } from "@/lib/seo";
import { LegalView } from "@/components/layout/LegalView";

export const Route = createFileRoute("/terms")({
  head: () => seo("Terms", "Terms of use for the Safe HR Consultants website.", "/terms"),
  component: () => <LegalView page={terms} />,
});
