import { describe, expect, it } from "vitest";
import { articles } from "@/data/blog";
import { products } from "@/data/products";
import { BLOG_PAGE_SIZE, articleWordCount, filterArticles, keepReading } from "@/lib/blog";

describe("owner-supplied blog rules", () => {
  it("contains seven original articles within the requested word range", () => {
    expect(articles).toHaveLength(7);
    for (const a of articles) { expect(articleWordCount(a)).toBeGreaterThanOrEqual(300); expect(articleWordCount(a)).toBeLessThanOrEqual(450); }
  });
  it("initially shows six articles and keeps the seventh for load more", () => {
    expect(BLOG_PAGE_SIZE).toBe(6); expect(filterArticles().slice(0, BLOG_PAGE_SIZE)).toHaveLength(6); expect(filterArticles().slice(BLOG_PAGE_SIZE)).toHaveLength(1);
  });
  it("filters the supplied categories and searches titles and excerpts", () => {
    expect(filterArticles("Research and Statistics").map(a => a.id)).toEqual(["a03", "a04"]);
    expect(filterArticles("", "touchscreen").map(a => a.id)).toEqual(["a07"]);
    expect(filterArticles("Industry News", "touchscreen")).toEqual([]);
  });
  it("preserves the exact serious-injury figures and stats", () => {
    const a = articles.find(a => a.id === "a03");
    expect(a?.keyStats?.map(s => s.value)).toEqual(["14.7", "11%"]);
    const b = a?.body.find(b => b.type === "barList");
    expect(b?.type === "barList" ? b.items : []).toEqual([{ label: "2016", value: 14.3 }, { label: "2017", value: 16.9 }, { label: "2019", value: 18.3 }, { label: "2020", value: 16.5 }, { label: "2021", value: 14.7 }]);
  });
  it("preserves the supplied fatality stats", () => { expect(articles.find(a => a.id === "a04")?.keyStats?.map(s => s.value)).toEqual(["70", "2.4"]); });
  it("links only to existing related products and keeps three other articles", () => {
    for (const a of articles) { for (const slug of a.relatedProductSlugs ?? []) expect(products.some(p => p.slug === slug)).toBe(true); expect(keepReading(a)).toHaveLength(3); expect(keepReading(a).some(x => x.id === a.id)).toBe(false); }
  });
});
