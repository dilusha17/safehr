import { useRef, useState } from "react";
import { Link, getRouteApi } from "@tanstack/react-router";
import { Search, X } from "lucide-react";
import { AppIcon } from "@/components/AppIcon";
import { Reveal, stagger } from "@/components/Reveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { articles, blogCategories, blogCopy } from "@/data/blog";
import { BLOG_PAGE_SIZE, filterArticles } from "@/lib/blog";
import { ArticleCard } from "./ArticleCard";
const route = getRouteApi("/blog/");
export function BlogView() {
  const search = route.useSearch();
  const navigate = route.useNavigate();
  const initial = useRef(search);
  const [changed, setChanged] = useState(false);
  const [limit, setLimit] = useState(BLOG_PAGE_SIZE);
  const matches = filterArticles(search.category, search.q);
  const featured = articles.find(a => a.featured);
  const animate = !changed && initial.current.category === search.category && initial.current.q === search.q;
  function update(q: string) { setChanged(true); setLimit(BLOG_PAGE_SIZE); void navigate({ search: prev => ({ ...prev, q }) , resetScroll: false }); }
  return <>
    <section className="border-b border-line bg-surface"><div className="container-page py-12 md:py-16"><p className="eyebrow text-safety-700">Safe HR journal</p><h1 className="mt-3 text-4xl text-navy-900 md:text-5xl">Safety Insights</h1><p className="mt-4 max-w-2xl text-lg text-muted-foreground">{blogCopy.intro}</p></div></section>
    <section className="container-page py-10 md:py-12">
      {featured && <ArticleCard article={featured} featured />}
      <div className="mt-12 flex flex-col gap-5 border-b border-line pb-6">
        <div className="relative max-w-lg"><label className="sr-only" htmlFor="article-search">Search articles</label><Search aria-hidden className="absolute left-3 top-3 size-4 text-muted-foreground" /><Input id="article-search" type="search" placeholder="Search insights…" value={search.q ?? ""} onChange={e => update(e.target.value)} className="h-10 pl-10" /></div>
        <nav aria-label="Article categories" className="flex flex-wrap gap-2">
          {[{ name: "All", icon: "newspaper" as const }, ...blogCategories].map(c => <Button key={c.name} asChild variant={(!search.category || search.category === "All") ? (c.name === "All" ? "default" : "ghost") : (search.category === c.name ? "default" : "ghost")}><Link to="/blog" search={prev => ({ ...prev, category: c.name === "All" ? undefined : c.name })} resetScroll={false} onClick={() => { setChanged(true); setLimit(BLOG_PAGE_SIZE); }} aria-current={(!search.category && c.name === "All") || search.category === c.name ? "page" : undefined}><AppIcon name={c.icon} size={20} />{c.name}</Link></Button>)}
        </nav>
      </div>
      <p className="my-6 text-sm text-muted-foreground" aria-live="polite">{matches.length} {matches.length === 1 ? "article" : "articles"}</p>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3" data-blog-grid>
        {matches.slice(0, limit).map((a, i) => animate ? <Reveal key={a.id} delay={stagger(i)}><ArticleCard article={a} /></Reveal> : <div key={a.id}><ArticleCard article={a} /></div>)}
      </div>
      {!matches.length && <div className="py-16 text-center"><AppIcon name="newspaper" size={64} /><h2 className="mt-4 text-2xl text-navy-900">No articles found</h2><Button asChild variant="outline" className="mt-6"><Link to="/blog" search={{ category: undefined, q: undefined }} onClick={() => { setChanged(true); setLimit(BLOG_PAGE_SIZE); }} resetScroll={false}><X />Clear filters</Link></Button></div>}
      {matches.length > limit && <div className="mt-10 text-center"><Button variant="outline" size="lg" onClick={() => { setChanged(true); setLimit(n => n + BLOG_PAGE_SIZE); }}>Load more</Button></div>}
    </section>
  </>;
}
