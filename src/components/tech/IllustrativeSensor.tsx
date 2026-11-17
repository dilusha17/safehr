import { AppIcon } from "@/components/AppIcon";
import type { IconName } from "@/lib/icons";

/** Illustrative sensor + dashboard. Deliberately shows no numeric readings. */
export function IllustrativeSensor({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const tiles = [
    { label: "Air quality", Icon: "air" as IconName },
    { label: "Carbon monoxide", Icon: "warning" as IconName },
    { label: "Environment", Icon: "sensor" as IconName },
  ];
  return (
    <figure className="relative mx-auto flex w-full max-w-md items-center gap-4">
      <div className="relative flex h-52 w-28 shrink-0 flex-col items-center rounded-2xl border-4 border-line bg-background p-3 shadow-xl" aria-hidden>
        <div className="h-2 w-10 rounded-full bg-line" />
        <div className="mt-4 grid grid-cols-3 gap-1">
          {Array.from({ length: 9 }).map((_, i) => <span key={i} className="size-2 rounded-full bg-navy-700/30" />)}
        </div>
        <div className="mt-auto flex items-center gap-1.5">
          <span className="size-2.5 animate-pulse rounded-full bg-success" />
          <span className="text-[0.6rem] font-bold uppercase tracking-wider text-navy-900">Live</span>
        </div>
        <span className="mt-2 font-display text-xs font-bold text-navy-900">SAFE HR</span>
      </div>
      <div className="flex-1 rounded-xl bg-background p-4 shadow-xl" aria-hidden>
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Site overview</p>
        <div className="mt-3 space-y-2">
          {tiles.map(({ label, Icon }) => (
            <div key={label} className="flex items-center gap-3 rounded-lg bg-surface p-2.5">
              <span className="flex size-8 items-center justify-center rounded-md bg-safety-100 text-safety-700"><AppIcon name={Icon} size={28} /></span>
              <span className="text-sm font-semibold text-navy-900">{label}</span>
              <span className="ml-auto h-1.5 w-12 rounded-full bg-success/60" />
            </div>
          ))}
        </div>
      </div>
      <figcaption className={tone === "dark" ? "absolute -bottom-7 right-0 text-xs text-on-dark-muted" : "absolute -bottom-7 right-0 text-xs text-muted-foreground"}>
        Illustrative display
      </figcaption>
    </figure>
  );
}
