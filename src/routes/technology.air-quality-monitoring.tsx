import { createFileRoute } from "@tanstack/react-router";
import { airQuality } from "@/data/content";
import { seo } from "@/lib/seo";
import { TechnologyPage } from "@/components/tech/TechnologyPage";
import { IllustrativeSensor } from "@/components/tech/IllustrativeSensor";

export const Route = createFileRoute("/technology/air-quality-monitoring")({
  head: () => seo("Air Quality Monitoring Device", airQuality.summary, "/technology/air-quality-monitoring"),
  component: () => <TechnologyPage content={airQuality} visual={<IllustrativeSensor />} />,
});
