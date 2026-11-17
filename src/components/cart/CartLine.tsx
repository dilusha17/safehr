import { Link } from "@tanstack/react-router";
import { Trash2 } from "lucide-react";
import { MAX_QTY_PER_LINE } from "@/config/commerce";
import { useCart } from "@/hooks/useCart";
import { formatNZD } from "@/lib/format";
import type { CartLineView } from "@/context/CartContext";
import { QuantityStepper } from "@/components/shop/QuantityStepper";
import { SafeImage } from "@/components/shop/SafeImage";
import { BulkOrderCta } from "@/components/shop/BulkOrderCta";

export function CartLine({ line, compact, onNavigate }: { line: CartLineView; compact?: boolean; onNavigate?: () => void }) {
  const { setQty, removeItem } = useCart();
  const p = line.product;
  return (
    <li className="flex gap-4 py-4">
      <div className={compact ? "size-16 shrink-0" : "size-24 shrink-0"}>
        <SafeImage src={p.imageUrl} alt={p.name} width={96} height={96} className="size-full rounded-md border border-line bg-surface object-contain p-1" />
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-2">
        <div className="flex justify-between gap-2">
          <Link to="/product/$slug" params={{ slug: p.slug }} onClick={onNavigate} className="line-clamp-2 text-sm font-semibold text-navy-900 hover:underline">
            {p.name}
          </Link>
          <p className="shrink-0 font-bold">{formatNZD(p.price * line.qty)}</p>
        </div>
        <p className="text-xs text-muted-foreground">{formatNZD(p.price)} each</p>
        <div className="flex flex-wrap items-center gap-3">
          <QuantityStepper size="sm" value={line.qty} onChange={(n) => setQty(p.id, n)} label={`Quantity for ${p.name}`} />
          <button type="button" onClick={() => removeItem(p.id)} className="inline-flex items-center gap-1 rounded text-xs font-medium text-muted-foreground hover:text-destructive" aria-label={`Remove ${p.name}`}>
            <Trash2 className="size-3.5" aria-hidden /> Remove
          </button>
        </div>
        {line.qty >= MAX_QTY_PER_LINE && <BulkOrderCta variant="inline" product={p} />}
      </div>
    </li>
  );
}
