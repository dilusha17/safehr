import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Clock } from "lucide-react";
import { AppIcon } from "@/components/AppIcon";
import { Button } from "@/components/ui/button";
import type { Article } from "@/data/blog";
import { articleDate } from "@/lib/blog";

export function ArticleMeta({ article }: { article: Article }) {
  return <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground"><time dateTime={article.publishedAt}>{articleDate(article.publishedAt)}</time><span className="inline-flex items-center gap-1.5"><Clock className="size-3.5" aria-hidden />{article.readMinutes} min read</span></div>;
}
export function ArticleCard({ article, featured = false }: { article: Article; featured?: boolean }) {
  return <article className={`card-base flex h-full flex-col overflow-hidden ${featured ? "md:grid md:grid-cols-[0.8fr_1.2fr]" : ""}`}>
    <Link to="/blog/$slug" params={{ slug: article.slug }} aria-label={article.title} tabIndex={-1} className={`flex items-center justify-center bg-linear-to-br from-safety-100 to-background ${featured ? "min-h-52 md:min-h-80" : "h-44"}`}><AppIcon name={article.icon} size={featured ? 144 : 88} /></Link>
    <div className={`flex flex-1 flex-col ${featured ? "p-6 md:p-10" : "p-5"}`}>
      <div className="mb-3 flex flex-wrap items-center gap-2">{featured && <span className="text-xs font-semibold uppercase text-safety-700">Featured insight</span>}<span className="w-fit rounded-full bg-safety-100 px-3 py-1 text-xs font-semibold text-safety-700">{article.category}</span></div>
      <ArticleMeta article={article} />
      <h2 className={`mt-4 text-navy-900 ${featured ? "text-2xl md:text-3xl" : "line-clamp-2 min-h-14 text-xl leading-7"}`}><Link to="/blog/$slug" params={{ slug: article.slug }} className="hover:underline">{article.title}</Link></h2>
      <p className="mt-3 line-clamp-3 text-muted-foreground">{article.excerpt}</p>
      <Button asChild variant="link" className="mt-5 justify-start self-start"><Link to="/blog/$slug" params={{ slug: article.slug }}>Read article<ArrowUpRight /></Link></Button>
    </div>
  </article>;
}
