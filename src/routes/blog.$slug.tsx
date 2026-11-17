import { createFileRoute, notFound } from "@tanstack/react-router";
import { ArticleView } from "@/components/blog/ArticleView";
import { findArticle } from "@/lib/blog";
import { seo } from "@/lib/seo";
import { company } from "@/data/company";
export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => { const article = findArticle(params.slug); if (!article) throw notFound(); return article; },
  head: ({ loaderData }) => {
    if (!loaderData) return { ...seo("Article unavailable", "This Safe HR article could not be found.", "/blog"), meta: [...seo("Article unavailable", "This Safe HR article could not be found.", "/blog").meta, { name: "robots", content: "noindex" }] };
    const article = loaderData;
    return { ...seo(article.title, article.excerpt, `/blog/${article.slug}`, "article"), scripts: [{ type: "application/ld+json", children: JSON.stringify({ "@context": "https://schema.org", "@type": "Article", headline: article.title, datePublished: article.publishedAt, author: { "@type": "Organization", name: company.name }, publisher: { "@type": "Organization", name: company.name }, mainEntityOfPage: `https://safehr.lovable.app/blog/${article.slug}` }) }] };
  },
  component: ArticlePage,
});
function ArticlePage() { const article = Route.useLoaderData(); return <ArticleView key={article.slug} article={article} />; }
