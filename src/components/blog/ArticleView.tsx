import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronRight, Copy, ArrowUpRight } from "lucide-react";
import { toast } from "sonner";
import { AppIcon } from "@/components/AppIcon";
import { Reveal, stagger } from "@/components/Reveal";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/shop/ProductCard";
import { CategoryLink } from "@/components/layout/CategoryLink";
import { blogCopy, type Article } from "@/data/blog";
import { company } from "@/data/company";
import { categoryTree, getProductBySlug } from "@/lib/products";
import { keepReading } from "@/lib/blog";
import { ArticleBody } from "./ArticleBody";
import { ArticleCard, ArticleMeta } from "./ArticleCard";

export function ArticleView({ article }: { article: Article }) {
  const bodyRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const url = `https://safehr.lovable.app/blog/${article.slug}`;
  const [shareUrl, setShareUrl] = useState(url);
  useEffect(() => {
    setShareUrl(window.location.href);
    function update() {
      const body = bodyRef.current;
      if (!body) return;
      const rect = body.getBoundingClientRect();
      const start = rect.top + window.scrollY;
      const distance = Math.max(1, rect.height - window.innerHeight + 100);
      setProgress(Math.min(100, Math.max(0, (window.scrollY - start + 100) / distance * 100)));
    }
    update(); window.addEventListener("scroll", update, { passive: true }); window.addEventListener("resize", update);
    return () => { window.removeEventListener("scroll", update); window.removeEventListener("resize", update); };
  }, [article.slug]);
  const related = (article.relatedProductSlugs ?? []).flatMap(slug => { const product = getProductBySlug(slug); return product ? [product] : []; });
  async function copyLink() { try { await navigator.clipboard.writeText(shareUrl); toast.success("Article link copied"); } catch { toast.error("Could not copy the link. Please copy the address from your browser."); } }
  return <>
    <progress className="blog-reading-progress fixed inset-x-0 top-0 z-50 h-1 w-full" max={100} value={progress} aria-label="Article reading progress" />
    <section className="border-b border-line bg-surface"><div className="container-page py-8 md:py-12">
      <nav aria-label="Breadcrumb"><ol className="flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground"><li><Link to="/" className="hover:underline">Home</Link></li><ChevronRight className="size-3" aria-hidden /><li><Link to="/blog" className="hover:underline">Blog</Link></li><ChevronRight className="size-3" aria-hidden /><li><Link to="/blog" search={{ category: article.category }} className="hover:underline">{article.category}</Link></li><ChevronRight className="size-3" aria-hidden /><li className="text-navy-900" aria-current="page">{article.title}</li></ol></nav>
      <div className="mx-auto mt-8 max-w-4xl"><div className="flex items-center gap-3"><AppIcon name={article.icon} size={56} /><span className="rounded-full bg-safety-100 px-3 py-1 text-sm font-semibold text-safety-700">{article.category}</span></div><h1 className="mt-6 text-3xl leading-tight text-navy-900 md:text-5xl">{article.title}</h1><p className="mt-5 max-w-3xl text-lg text-muted-foreground">{article.excerpt}</p><div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3"><span className="text-sm font-semibold text-navy-900">Safe HR team</span><ArticleMeta article={article} /></div></div>
    </div></section>
    <div className="container-page py-10 md:py-14">
      <div className="mx-auto max-w-3xl" ref={bodyRef}>
        {article.keyStats && <div className="mb-10 grid gap-4 sm:grid-cols-2">{article.keyStats.map(stat => <div key={stat.label} className="card-base flex items-start gap-4 p-5"><AppIcon name={article.icon} size={48} /><div><p className="font-display text-4xl font-bold text-navy-900">{stat.value}</p><p className="mt-2 text-sm text-muted-foreground">{stat.label}</p></div></div>)}</div>}
        <ArticleBody blocks={article.body} />
        {article.id === "a05" && <nav aria-label="Hand protection categories" className="mt-6 flex flex-wrap gap-2">{categoryTree.flatMap(c => c.children).filter(c => c.slug !== "garden-use").map(c => <Button key={c.slug} asChild variant="outline" size="sm"><CategoryLink path={c.path}>{c.name}</CategoryLink></Button>)}</nav>}
        {article.id === "a06" && <div className="mt-6 flex flex-wrap gap-4"><Button asChild variant="outline"><a href="tel:0800030040">Call WorkSafe</a></Button><Button asChild variant="link"><a href="https://www.worksafe.govt.nz/notify-worksafe" target="_blank" rel="noopener noreferrer">Notify WorkSafe<ArrowUpRight /></a></Button></div>}
        {article.id === "a07" && <Button asChild variant="link" className="mt-4"><Link to="/about">About our equipment supply<ArrowUpRight /></Link></Button>}
        <section className="mt-12 border-t border-line pt-8"><h2 className="text-2xl text-navy-900">Sources</h2><ul className="mt-4 space-y-3 text-sm">{article.sources.map(source => <li key={source.url}>{source.url.startsWith("/") ? <Link to="/shop" className="font-medium text-safety-700 underline">{source.title}</Link> : <a href={source.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-start gap-2 font-medium text-safety-700 underline">{source.title}<ArrowUpRight className="mt-0.5 size-4 shrink-0" /></a>}</li>)}</ul>{article.category !== "New Products" && <p className="mt-6 text-sm leading-6 text-muted-foreground">{blogCopy.disclaimer}</p>}</section>
        <div className="mt-8 flex flex-wrap gap-3 border-t border-line pt-6"><Button variant="outline" onClick={copyLink}><Copy />Copy link</Button><Button asChild variant="ghost"><a href={`https://wa.me/?text=${encodeURIComponent(`${article.title}\n${shareUrl}`)}`} target="_blank" rel="noopener noreferrer"><AppIcon name="whatsapp" size={20} />Share on WhatsApp</a></Button></div>
      </div>
      {related.length > 0 && <section className="mt-16 border-t border-line pt-10"><h2 className="mb-6 text-3xl text-navy-900">Related products</h2><div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{related.map(product => <ProductCard key={product.id} product={product} />)}</div></section>}
      <section className="mt-16 border-t border-line pt-10"><h2 className="mb-6 text-3xl text-navy-900">Keep reading</h2><div className="grid gap-6 md:grid-cols-3">{keepReading(article).map((a, i) => <Reveal key={a.id} delay={stagger(i)}><ArticleCard article={a} /></Reveal>)}</div></section>
      <aside className="mt-12 rounded-card border border-line bg-safety-100 p-6 md:flex md:items-center md:justify-between md:gap-6 md:p-8"><h2 className="text-2xl text-navy-900">{blogCopy.help}</h2><div className="mt-5 flex flex-wrap gap-3 md:mt-0"><Button asChild><Link to="/contact" search={{ topic: undefined }}>Contact</Link></Button><Button asChild variant="outline"><a href={company.whatsapp.href} target="_blank" rel="noopener noreferrer"><AppIcon name="whatsapp" size={20} />WhatsApp</a></Button></div></aside>
    </div>
  </>;
}
