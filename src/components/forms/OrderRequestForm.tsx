import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { buildMailtoLink, buildWhatsAppLink } from "@/lib/format";
import { buildOrderMessage, type OrderCustomer } from "@/lib/orderRequest";
import { useCart } from "@/hooks/useCart";
import { Field, inputCls } from "./fields";
import { SendButtons, openExternal } from "./SendButtons";

const schema = z.object({
  fullName: z.string().trim().min(1, "Please enter your full name").max(100),
  company: z.string().trim().max(100).optional(),
  email: z.string().trim().email("Please enter a valid email").max(255),
  phone: z.string().trim().min(6, "Please enter your phone number").max(30),
  address: z.string().trim().min(5, "Please enter your delivery address").max(500),
  notes: z.string().trim().max(1000).optional(),
});

export function OrderRequestForm({ onReady }: { onReady: (message: string) => void }) {
  const { lines } = useCart();
  const { register, handleSubmit, formState: { errors } } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: { fullName: "", company: "", email: "", phone: "", address: "", notes: "" },
  });
  const send = (via: "wa" | "email") => handleSubmit((values) => {
    const customer: OrderCustomer = { ...values, company: values.company ?? "", notes: values.notes ?? "" };
    const message = buildOrderMessage({ customer, lines: lines.map((l) => ({ name: l.product.name, qty: l.qty, price: l.product.price })) });
    openExternal(via === "wa" ? buildWhatsAppLink(message) : buildMailtoLink("Order request", message));
    onReady(message);
  });
  return (
    <form noValidate className="space-y-5" onSubmit={(e) => e.preventDefault()}>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="o-name" label="Full name" error={errors.fullName?.message}><Input id="o-name" autoComplete="name" className={inputCls} {...register("fullName")} /></Field>
        <Field id="o-company" label="Company" optional><Input id="o-company" autoComplete="organization" className={inputCls} {...register("company")} /></Field>
        <Field id="o-email" label="Email" error={errors.email?.message}><Input id="o-email" type="email" autoComplete="email" className={inputCls} {...register("email")} /></Field>
        <Field id="o-phone" label="Phone" error={errors.phone?.message}><Input id="o-phone" type="tel" autoComplete="tel" className={inputCls} {...register("phone")} /></Field>
      </div>
      <Field id="o-address" label="Delivery address" error={errors.address?.message}><Textarea id="o-address" rows={3} autoComplete="street-address" {...register("address")} /></Field>
      <Field id="o-notes" label="Notes" optional><Textarea id="o-notes" rows={3} {...register("notes")} /></Field>
      <SendButtons onWhatsApp={send("wa")} onEmail={send("email")} waLabel="Send order request via WhatsApp" />
    </form>
  );
}
