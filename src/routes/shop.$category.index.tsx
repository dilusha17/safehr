import { createFileRoute, notFound } from "@tanstack/react-router";
import { ShopView } from "@/components/shop/ShopView";
import { shopSearchSchema } from "@/lib/shopSearch";
import { findCategory } from "@/lib/products";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/shop/$category/")({
  validateSearch: shopSearchSchema,
  loader: ({ params }) => {
    const cat = findCategory([params.category]);
    if (!cat) throw notFound();
    return { name: cat.name, description: cat.description };
  },
  head: ({ loaderData, params }) =>
    loaderData
      ? seo(loaderData.name, loaderData.description ?? `Shop ${loaderData.name} from Safe HR Consultants.`, `/shop/${params.category}`)
      : { meta: [{ title: "Not found | Safe HR Consultants" }, { name: "robots", content: "noindex" }] },
  component: CategoryPage,
});

function CategoryPage() {
  const { category } = Route.useParams();
  const data = Route.useLoaderData();
  const search = Route.useSearch();
  const navigate = Route.useNavigate();
  return <ShopView path={[category]} title={data.name} description={data.description} search={search} onSearch={(s) => navigate({ search: s, replace: true })} />;
}
