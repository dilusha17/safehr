import { createFileRoute } from "@tanstack/react-router";
import { privacy } from "@/data/legal";
import { seo } from "@/lib/seo";
import { LegalView } from "@/components/layout/LegalView";

export const Route = createFileRoute("/privacy")({
  head: () => seo("Privacy", "How the Safe HR Consultants website handles your information.", "/privacy"),
  component: () => <LegalView page={privacy} />,
});
