import { Link } from "@tanstack/react-router";
import logo from "@/assets/logo.svg.asset.json";
import { cn } from "@/lib/utils";

export function Logo({ variant = "dark", className }: { variant?: "dark" | "light"; className?: string }) {
  return (
    <Link to="/" className={cn("inline-flex shrink-0 items-center rounded-md", variant === "light" && "bg-background p-2", className)} aria-label="Safe HR Consultants home">
      <img src={logo.url} alt="Safe HR Consultants" width={2026} height={627} className={cn("w-auto object-contain", variant === "light" ? "h-10" : "h-10 md:h-12")} />
    </Link>
  );
}
