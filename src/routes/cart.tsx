import { AppIcon } from "@/components/AppIcon";
import { createFileRoute, Link } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";
import { BULK_HINT_TOTAL_QTY } from "@/config/commerce";
import { useCart } from "@/hooks/useCart";
import { seo } from "@/lib/seo";
import { CartLine } from "@/components/cart/CartLine";
import { OrderSummary } from "@/components/cart/OrderSummary";
import { BulkOrderCta } from "@/components/shop/BulkOrderCta";

export const Route = createFileRoute("/cart")({
  head: () => seo("Your Cart", "Review the safety gloves in your cart and continue to your order request.", "/cart"),
  component: CartPage,
});

function CartPage() {
  const { lines, totalQty, hydrated } = useCart();
  return (
    <div className="container-page py-10 md:py-14">
      <h1 className="text-4xl text-navy-900">Your cart</h1>
      {hydrated && lines.length === 0 ? (
        <div className="mt-10 flex flex-col items-center gap-4 rounded-card border border-dashed border-line p-12 text-center">
          <AppIcon name="cart" size=48 />
          <p className="font-display text-2xl font-bold">Your cart is empty</p>
          <Button asChild size="lg"><Link to="/shop">Browse the shop</Link></Button>
        </div>
      ) : (
        <>
          {totalQty >= BULK_HINT_TOTAL_QTY && (
            <BulkOrderCta variant="box" className="mt-6" title="Ordering 10 or more items?" body="Contact the seller for bulk pricing. Send a bulk enquiry or message us on WhatsApp." />
          )}
          <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_22rem]">
            <div>
              <ul className="divide-y divide-line border-y border-line">{lines.map((l) => <CartLine key={l.productId} line={l} />)}</ul>
              <Link to="/shop" className="mt-6 inline-block font-semibold text-safety-700 hover:underline">← Continue shopping</Link>
            </div>
            <OrderSummary>
              <Button asChild size="lg" className="w-full"><Link to="/checkout">Continue to order request</Link></Button>
              <p className="text-xs text-muted-foreground">No payment is taken on this website. Our team confirms your order, delivery and payment with you.</p>
            </OrderSummary>
          </div>
        </>
      )}
    </div>
  );
}
