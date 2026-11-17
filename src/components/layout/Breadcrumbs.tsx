import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import type { Crumb } from "@/lib/products";
import { CategoryLink } from "./CategoryLink";
import { cn } from "@/lib/utils";

export function Breadcrumbs({ items, tone = "dark" }: { items: Crumb[]; tone?: "dark" | "light" }) {
  const linkCls = cn("rounded hover:underline", tone === "dark" ? "text-muted-foreground hover:text-navy-900" : "text-on-dark-muted hover:text-on-dark");
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-1 text-sm">
        {items.map((c, i) => {
          const last = i === items.length - 1;
          return (
            <li key={`${c.label}-${i}`} className="inline-flex items-center gap-1">
              {last || !c.target ? (
                <span aria-current={last ? "page" : undefined} className={cn("font-medium", tone === "dark" ? "text-navy-900" : "text-on-dark")}>
                  {c.label}
                </span>
              ) : c.target === "home" ? (
                <Link to="/" className={linkCls}>{c.label}</Link>
              ) : c.target === "shop" ? (
                <Link to="/shop" className={linkCls}>{c.label}</Link>
              ) : (
                <CategoryLink path={c.target} className={linkCls}>{c.label}</CategoryLink>
              )}
              {!last && <ChevronRight className={cn("size-3.5", tone === "dark" ? "text-muted-foreground" : "text-on-dark-muted")} aria-hidden />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
