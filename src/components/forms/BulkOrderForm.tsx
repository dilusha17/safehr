import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { buildMailtoLink, buildWhatsAppLink } from "@/lib/format";
import { Field, inputCls } from "./fields";
import { SendButtons, openExternal } from "./SendButtons";

const schema = z.object({
  name: z.string().trim().min(1, "Please enter your name").max(100),
  company: z.string().trim().max(100).optional(),
  email: z.string().trim().email("Please enter a valid email").max(255),
  phone: z.string().trim().min(6, "Please enter your phone number").max(30),
  products: z.string().trim().min(1, "Tell us which products you need").max(2000),
  quantity: z.string().trim().min(1, "Please give an approximate quantity").max(100),
  date: z.string().optional(),
  notes: z.string().trim().max(2000).optional(),
});
type Values = z.infer<typeof schema>;

export function BulkOrderForm({ productName }: { productName?: string }) {
  const { register, handleSubmit, formState: { errors } } = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", company: "", email: "", phone: "", products: productName ?? "", quantity: "", date: "", notes: "" },
  });
  const send = (via: "wa" | "email") => handleSubmit((v) => {
    const text = ["Hello Safe HR, I'd like bulk pricing for:", v.products, "", `Approximate quantity: ${v.quantity}`, `Date needed: ${v.date || "-"}`, "", `Name: ${v.name}`, `Company: ${v.company || "-"}`, `Phone: ${v.phone}`, `Email: ${v.email}`, `Notes: ${v.notes || "-"}`].join("\n");
    openExternal(via === "wa" ? buildWhatsAppLink(text) : buildMailtoLink("Bulk order enquiry", text));
    toast.success("Enquiry ready", { description: "Press send in your app to submit it." });
  });
  return (
    <form noValidate className="space-y-5" onSubmit={(e) => e.preventDefault()}>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="b-name" label="Name" error={errors.name?.message}><Input id="b-name" autoComplete="name" className={inputCls} {...register("name")} /></Field>
        <Field id="b-company" label="Company" optional><Input id="b-company" autoComplete="organization" className={inputCls} {...register("company")} /></Field>
        <Field id="b-email" label="Email" error={errors.email?.message}><Input id="b-email" type="email" autoComplete="email" className={inputCls} {...register("email")} /></Field>
        <Field id="b-phone" label="Phone" error={errors.phone?.message}><Input id="b-phone" type="tel" autoComplete="tel" className={inputCls} {...register("phone")} /></Field>
      </div>
      <Field id="b-products" label="Products wanted" error={errors.products?.message}><Textarea id="b-products" rows={3} {...register("products")} /></Field>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="b-qty" label="Approximate quantity" error={errors.quantity?.message}><Input id="b-qty" className={inputCls} {...register("quantity")} /></Field>
        <Field id="b-date" label="Date needed" optional><Input id="b-date" type="date" className={inputCls} {...register("date")} /></Field>
      </div>
      <Field id="b-notes" label="Notes" optional><Textarea id="b-notes" rows={3} {...register("notes")} /></Field>
      <SendButtons onWhatsApp={send("wa")} onEmail={send("email")} />
      <p className="text-sm text-muted-foreground">Your enquiry opens in your own WhatsApp or email app. Nothing is stored by this website.</p>
    </form>
  );
}
