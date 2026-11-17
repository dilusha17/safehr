import { createFileRoute } from "@tanstack/react-router";
import { ShopView } from "@/components/shop/ShopView";
import { shopSearchSchema } from "@/lib/shopSearch";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/shop/")({
  validateSearch: shopSearchSchema,
  head: () => seo("Shop All Products", "Browse every safety glove from Safe HR Consultants. Prices in NZD, bulk pricing on request.", "/shop"),
  component: ShopPage,
});

function ShopPage() {
  const search = Route.useSearch();
  const navigate = Route.useNavigate();
  return <ShopView path={[]} title="All products" search={search} onSearch={(s) => navigate({ search: s, replace: true })} />;
}
