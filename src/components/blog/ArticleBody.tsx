import type { Block } from "@/data/blog";
export function ArticleBody({ blocks }: { blocks: Block[] }) {
  return <div className="space-y-6 text-lg leading-8 text-ink">{blocks.map((block, i) => {
    switch (block.type) {
      case "paragraph": return <p key={i}>{block.text}</p>;
      case "heading": return <h2 key={i} className="pt-5 text-2xl leading-tight text-navy-900">{block.text}</h2>;
      case "bulletList": return <ul key={i} className="list-disc space-y-2 pl-6 marker:text-safety-700">{block.items.map(item => <li key={item}>{item}</li>)}</ul>;
      case "callout": return <aside key={i} className="border-l-4 border-safety-500 bg-safety-100 p-5 text-navy-900"><h3 className="text-xl">{block.title}</h3><p className="mt-2">{block.text}</p></aside>;
      case "table": return <div key={i} className="overflow-x-auto"><table className="w-full border-collapse text-base"><caption className="mb-3 text-left font-semibold">{block.caption}</caption><thead><tr>{block.columns.map(c => <th key={c} className="border-b border-line bg-surface p-3 text-left">{c}</th>)}</tr></thead><tbody>{block.rows.map((row, r) => <tr key={r}>{row.map((cell, c) => <td key={c} className="border-b border-line p-3">{cell}</td>)}</tr>)}</tbody></table></div>;
      case "barList": return <figure key={i} className="py-4"><figcaption className="mb-5 text-base font-semibold text-navy-900">{block.caption}</figcaption><ul className="space-y-3">{block.items.map(item => <li key={item.label} className="grid grid-cols-[3rem_1fr] items-center gap-3"><span className="text-sm font-semibold">{item.label}</span><div className="relative h-9"><progress className="blog-bar h-9 w-full" max={Math.max(...block.items.map(x => x.value))} value={item.value} aria-label={`${item.label}: ${item.value} serious non-fatal injuries per 100,000 FTEs`} /><span className="absolute inset-y-0 left-3 flex items-center text-sm font-bold text-navy-900" aria-hidden>{item.value}</span></div></li>)}</ul><p className="mt-4 text-sm leading-6 text-muted-foreground">{block.note}</p></figure>;
    }
  })}</div>;
}
