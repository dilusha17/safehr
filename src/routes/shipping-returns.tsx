import { createFileRoute } from "@tanstack/react-router";
import { shippingReturns } from "@/data/legal";
import { seo } from "@/lib/seo";
import { LegalView } from "@/components/layout/LegalView";

export const Route = createFileRoute("/shipping-returns")({
  head: () => seo("Shipping and Returns", "Delivery and returns information for Safe HR Consultants orders.", "/shipping-returns"),
  component: () => <LegalView page={shippingReturns} />,
});
