import { AppIcon } from "@/components/AppIcon";
import { Link } from "@tanstack/react-router";

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/useCart";
import { formatNZD } from "@/lib/format";
import { CartLine } from "./CartLine";

export function CartDrawer() {
  const { isOpen, setOpen, lines, subtotal } = useCart();
  const close = () => setOpen(false);
  return (
    <Sheet open={isOpen} onOpenChange={setOpen}>
      <SheetContent side="right" className="flex w-full flex-col sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="font-display text-2xl">Your cart</SheetTitle>
          <SheetDescription>No payment is taken on this website.</SheetDescription>
        </SheetHeader>
        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 p-6 text-center">
            <AppIcon name="cart" size=48 />
            <p className="font-semibold">Your cart is empty</p>
            <Button asChild onClick={close}><Link to="/shop">Browse the shop</Link></Button>
          </div>
        ) : (
          <>
            <ul className="flex-1 divide-y divide-line overflow-y-auto px-4">
              {lines.map((l) => <CartLine key={l.productId} line={l} compact onNavigate={close} />)}
            </ul>
            <div className="space-y-3 border-t border-line p-4">
              <div className="flex items-baseline justify-between">
                <span className="font-semibold">Subtotal</span>
                <span className="text-xl font-bold">{formatNZD(subtotal)} <span className="text-xs font-medium text-muted-foreground">NZD</span></span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Button asChild variant="outline" onClick={close}><Link to="/cart">View cart</Link></Button>
                <Button asChild onClick={close}><Link to="/checkout">Request order</Link></Button>
              </div>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
