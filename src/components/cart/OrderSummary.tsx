import { useCart } from "@/hooks/useCart";
import { formatNZD } from "@/lib/format";
import type { ReactNode } from "react";

export function OrderSummary({ readOnly, children }: { readOnly?: boolean; children?: ReactNode }) {
  const { lines, subtotal, totalQty } = useCart();
  return (
    <aside className="card-base h-fit p-6 hover:shadow-none" aria-label="Order summary">
      <h2 className="text-xl">Order summary</h2>
      {readOnly && (
        <ul className="mt-4 divide-y divide-line text-sm">
          {lines.map((l) => (
            <li key={l.productId} className="flex justify-between gap-3 py-2">
              <span className="min-w-0">{l.product.name} <span className="text-muted-foreground">× {l.qty}</span></span>
              <span className="shrink-0 font-semibold">{formatNZD(l.product.price * l.qty)}</span>
            </li>
          ))}
        </ul>
      )}
      <dl className="mt-4 space-y-2 border-t border-line pt-4">
        <div className="flex justify-between text-sm"><dt>Items</dt><dd>{totalQty}</dd></div>
        <div className="flex items-baseline justify-between">
          <dt className="font-semibold">Subtotal</dt>
          {/* TODO: confirm GST-inclusive */}
          <dd className="text-xl font-bold">{formatNZD(subtotal)} <span className="text-xs font-medium text-muted-foreground">NZD</span></dd>
        </div>
      </dl>
      <p className="mt-3 text-xs text-muted-foreground">
        Delivery cost and any applicable taxes are confirmed by our team. {/* TODO: confirm terms */}
      </p>
      {children && <div className="mt-5 space-y-3">{children}</div>}
    </aside>
  );
}
