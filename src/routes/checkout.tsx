import { AppIcon } from "@/components/AppIcon";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/useCart";
import { seo } from "@/lib/seo";
import { OrderSummary } from "@/components/cart/OrderSummary";
import { OrderRequestForm } from "@/components/forms/OrderRequestForm";

export const Route = createFileRoute("/checkout")({
  head: () => seo("Order Request", "Send your safety glove order request to Safe HR Consultants by WhatsApp or email. No payment is taken online.", "/checkout"),
  component: CheckoutPage,
});

function CheckoutPage() {
  const { lines, hydrated, clearCart } = useCart();
  const navigate = useNavigate();
  const [message, setMessage] = useState<string | null>(null);
  useEffect(() => { if (hydrated && lines.length === 0 && !message) navigate({ to: "/cart", replace: true }); }, [hydrated, lines.length, message, navigate]);

  const copy = async () => {
    if (!message) return;
    try { await navigator.clipboard.writeText(message); toast.success("Request copied"); } catch { toast.error("Could not copy. Please select and copy the text."); }
  };

  return (
    <div className="container-page py-10 md:py-14">
      <h1 className="text-4xl text-navy-900">Order request</h1>
      {/* TODO(backend): replace with online payment later */}
      <p className="mt-4 flex max-w-3xl gap-2 rounded-card bg-safety-100 p-4 text-sm text-navy-900">
        <AppIcon name="info" size={16} />
        No payment is taken on this website. Our team confirms your order, delivery and payment with you.
      </p>
      <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_22rem]">
        {message ? (
          <div className="rounded-card border border-success/40 p-6" role="status">
            <AppIcon name="success" size={40} />
            <h2 className="mt-3 text-2xl text-navy-900">Your order request is ready</h2>
            <p className="mt-2 text-ink">Press send in WhatsApp or your email app to submit it. Nothing has been charged.</p>
            <pre className="mt-4 max-h-72 overflow-auto whitespace-pre-wrap rounded-md bg-surface p-4 text-sm">{message}</pre>
            <div className="mt-5 flex flex-wrap gap-3">
              <Button onClick={copy}>Copy request</Button>
              <Button variant="outline" onClick={() => { clearCart(); toast.success("Cart cleared"); }}>Clear cart</Button>
              <Button asChild variant="link"><Link to="/shop">Back to shop</Link></Button>
            </div>
          </div>
        ) : (
          <OrderRequestForm onReady={setMessage} />
        )}
        <OrderSummary readOnly />
      </div>
    </div>
  );
}
