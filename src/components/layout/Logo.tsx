import { Link } from "@tanstack/react-router";
import { ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

/** Text wordmark. Replace the inner markup with the real SVG logo when supplied. */
export function Logo({ tone = "dark", className }: { tone?: "dark" | "light"; className?: string }) {
  return (
    <Link to="/" className={cn("inline-flex items-center gap-2 rounded-md", className)} aria-label="Safe HR Consultants home">
      <ShieldCheck className="size-8 shrink-0 text-safety-500" aria-hidden strokeWidth={2.25} />
      <span className="flex flex-col leading-none">
        <span className={cn("font-display text-2xl font-bold tracking-tight", tone === "dark" ? "text-navy-900" : "text-on-dark")}>
          SAFE HR
        </span>
        <span className={cn("text-[0.7rem] font-medium uppercase tracking-[0.22em]", tone === "dark" ? "text-muted-foreground" : "text-on-dark-muted")}>
          Consultants
        </span>
      </span>
    </Link>
  );
}
