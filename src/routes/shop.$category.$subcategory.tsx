import { createFileRoute, notFound } from "@tanstack/react-router";
import { ShopView } from "@/components/shop/ShopView";
import { shopSearchSchema } from "@/lib/shopSearch";
import { findCategory } from "@/lib/products";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/shop/$category/$subcategory")({
  validateSearch: shopSearchSchema,
  loader: ({ params }) => {
    const sub = findCategory([params.category, params.subcategory]);
    const top = findCategory([params.category]);
    if (!sub || !top) throw notFound();
    return { name: sub.name, parent: top.name };
  },
  head: ({ loaderData, params }) =>
    loaderData
      ? seo(`${loaderData.name} ${loaderData.parent}`, `Shop ${loaderData.name.toLowerCase()} ${loaderData.parent.toLowerCase()} from Safe HR Consultants, Auckland. Prices in NZD.`, `/shop/${params.category}/${params.subcategory}`)
      : { meta: [{ title: "Not found | Safe HR Consultants" }, { name: "robots", content: "noindex" }] },
  component: SubPage,
});

function SubPage() {
  const { category, subcategory } = Route.useParams();
  const data = Route.useLoaderData();
  const search = Route.useSearch();
  const navigate = Route.useNavigate();
  return <ShopView path={[category, subcategory]} title={data.name} search={search} onSearch={(s) => navigate({ search: s, replace: true })} />;
}
