import { articles, blogCategories, type Article } from "@/data/blog";
export const BLOG_PAGE_SIZE = 6;
export function filterArticles(category = "", query = ""): Article[] {
  const term = query.trim().toLocaleLowerCase("en-NZ");
  return articles.filter(a => (!category || category === "All" || a.category === category) && `${a.title} ${a.excerpt} ${a.category}`.toLocaleLowerCase("en-NZ").includes(term));
}
export const articleDate = (iso: string) => new Intl.DateTimeFormat("en-NZ", { day: "numeric", month: "short", year: "numeric", timeZone: "Pacific/Auckland" }).format(new Date(`${iso}T00:00:00Z`));
export const findArticle = (slug: string) => articles.find(a => a.slug === slug);
export const categoryIcon = (category: string) => blogCategories.find(c => c.name === category)?.icon ?? "newspaper";
export function keepReading(article: Article) {
  return [...articles.filter(a => a.id !== article.id && a.category === article.category), ...articles.filter(a => a.id !== article.id && a.category !== article.category)].slice(0, 3);
}
export function articleWordCount(article: Article) {
  return article.body.flatMap(block => {
    switch (block.type) {
      case "paragraph": case "heading": return [block.text];
      case "bulletList": return block.items;
      case "callout": return [block.title, block.text];
      case "barList": return [block.caption, block.note, ...block.items.map(i => `${i.label} ${i.value}`)];
      case "table": return [block.caption, ...block.columns, ...block.rows.flat()];
    }
  }).join(" ").trim().split(/\s+/).length;
}
