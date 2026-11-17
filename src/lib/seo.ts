export function seo(title: string, description: string, path: string, type = "website") {
  const full = `${title} | Safe HR Consultants`;
  const url = new URL(path, "https://safehr.lovable.app").href;
  return {
    meta: [
      { title: full },
      { name: "description", content: description },
      { property: "og:title", content: full },
      { property: "og:description", content: description },
      { property: "og:type", content: type },
      { property: "og:url", content: url },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: url }],
  };
}
