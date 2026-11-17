import { Minus, Plus } from "lucide-react";
import { MAX_QTY_PER_LINE } from "@/config/commerce";
import { cn } from "@/lib/utils";

type Props = { value: number; onChange: (n: number) => void; label: string; size?: "sm" | "md"; className?: string };

export function QuantityStepper({ value, onChange, label, size = "md", className }: Props) {
  const btn = cn("flex items-center justify-center text-navy-900 hover:bg-surface disabled:opacity-40 disabled:cursor-not-allowed", size === "sm" ? "size-8" : "size-11");
  return (
    <div role="group" aria-label={label} className={cn("inline-flex items-center rounded-md border border-input bg-background", className)}>
      <button type="button" className={btn} onClick={() => onChange(value - 1)} disabled={value <= 1} aria-label="Decrease quantity">
        <Minus className="size-4" />
      </button>
      <input
        type="number"
        inputMode="numeric"
        min={1}
        max={MAX_QTY_PER_LINE}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        aria-label="Quantity"
        className={cn("w-10 bg-transparent text-center font-semibold [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none", size === "sm" ? "text-sm" : "text-base")}
      />
      <button type="button" className={btn} onClick={() => onChange(value + 1)} disabled={value >= MAX_QTY_PER_LINE} aria-label="Increase quantity">
        <Plus className="size-4" />
      </button>
    </div>
  );
}
