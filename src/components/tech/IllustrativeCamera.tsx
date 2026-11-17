import { AppIcon } from "@/components/AppIcon";


/** Illustrative camera + alert card. No real footage, no numbers. */
export function IllustrativeCamera({ tone = "dark" }: { tone?: "dark" | "light" }) {
  return (
    <figure className="relative mx-auto w-full max-w-md">
      <svg viewBox="0 0 320 200" className="w-full" aria-hidden>
        <rect x="40" y="20" width="12" height="60" rx="4" className="fill-line" />
        <g transform="rotate(14 120 70)">
          <rect x="46" y="50" width="150" height="54" rx="14" className="fill-background" />
          <rect x="182" y="56" width="34" height="42" rx="8" className="fill-navy-700" />
          <circle cx="199" cy="77" r="12" className="fill-navy-900" />
          <circle cx="199" cy="77" r="5" className="fill-safety-500" />
          <circle cx="70" cy="66" r="4" className="fill-success" />
        </g>
        <path d="M216 100 L310 190 L180 190 Z" className="fill-safety-500/20" />
      </svg>
      <div className="absolute bottom-0 right-0 w-56 rounded-xl bg-background p-4 shadow-xl" aria-hidden>
        <div className="flex items-center gap-2">
          <span className="flex size-8 items-center justify-center rounded-md bg-safety-100 text-safety-700"><AppIcon name="warning" size={16} /></span>
          <p className="text-sm font-bold text-navy-900">PPE alert</p>
        </div>
        <div className="mt-3 flex items-center gap-2 rounded-lg bg-surface p-2 text-xs text-ink">
          <AppIcon name="safety" size={16} /> Hard hat not detected · Zone B
        </div>
        <div className="mt-2 h-2 w-2/3 rounded-full bg-line" />
      </div>
      <figcaption className={tone === "dark" ? "mt-3 text-xs text-on-dark-muted" : "mt-3 text-xs text-muted-foreground"}>Illustrative display</figcaption>
    </figure>
  );
}
