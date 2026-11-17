import { createFileRoute } from "@tanstack/react-router";
import { BlogView } from "@/components/blog/BlogView";
import { blogCopy } from "@/data/blog";
import { seo } from "@/lib/seo";
type BlogSearch = { category?: string; q?: string };
export const Route = createFileRoute("/blog/")({
  validateSearch: (search: Record<string, unknown>): BlogSearch => ({ category: typeof search.category === "string" ? search.category : undefined, q: typeof search.q === "string" ? search.q : undefined }),
  head: () => seo("Safety Insights — Blog", blogCopy.intro, "/blog"),
  component: BlogView,
});
