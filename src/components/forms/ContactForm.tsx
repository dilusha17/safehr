import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { contactTopics, type ContactTopic } from "@/data/content";
import { buildMailtoLink, buildWhatsAppLink } from "@/lib/format";
import { Field, inputCls } from "./fields";
import { SendButtons, openExternal } from "./SendButtons";

const schema = z.object({
  topic: z.enum(["general", "order", "bulk", "air-quality", "ai-camera"]),
  name: z.string().trim().min(1, "Please enter your name").max(100),
  company: z.string().trim().max(100).optional(),
  email: z.string().trim().email("Please enter a valid email").max(255),
  phone: z.string().trim().min(6, "Please enter your phone number").max(30),
  message: z.string().trim().min(1, "Please enter a message").max(2000),
});
type Values = z.infer<typeof schema>;

export function ContactForm({ topic }: { topic?: ContactTopic }) {
  const { register, control, handleSubmit, formState: { errors } } = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: { topic: topic ?? "general", name: "", company: "", email: "", phone: "", message: "" },
  });
  const build = (v: Values) => {
    const label = contactTopics.find((t) => t.value === v.topic)?.label ?? "Enquiry";
    return { label, text: [`Hello Safe HR, enquiry: ${label}`, "", v.message, "", `Name: ${v.name}`, `Company: ${v.company || "-"}`, `Phone: ${v.phone}`, `Email: ${v.email}`].join("\n") };
  };
  const send = (via: "wa" | "email") => handleSubmit((v) => {
    const { label, text } = build(v);
    openExternal(via === "wa" ? buildWhatsAppLink(text) : buildMailtoLink(`Website enquiry: ${label}`, text));
    toast.success("Message ready", { description: "Press send in your app to submit it." });
  });
  return (
    <form noValidate className="space-y-5" onSubmit={(e) => e.preventDefault()}>
      <Field id="topic" label="Topic">
        <Controller control={control} name="topic" render={({ field }) => (
          <Select value={field.value} onValueChange={field.onChange}>
            <SelectTrigger id="topic" className={inputCls}><SelectValue /></SelectTrigger>
            <SelectContent>{contactTopics.map((t) => <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>)}</SelectContent>
          </Select>
        )} />
      </Field>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="name" label="Name" error={errors.name?.message}><Input id="name" autoComplete="name" className={inputCls} aria-invalid={!!errors.name} {...register("name")} /></Field>
        <Field id="company" label="Company" optional><Input id="company" autoComplete="organization" className={inputCls} {...register("company")} /></Field>
        <Field id="email" label="Email" error={errors.email?.message}><Input id="email" type="email" autoComplete="email" className={inputCls} aria-invalid={!!errors.email} {...register("email")} /></Field>
        <Field id="phone" label="Phone" error={errors.phone?.message}><Input id="phone" type="tel" autoComplete="tel" className={inputCls} aria-invalid={!!errors.phone} {...register("phone")} /></Field>
      </div>
      <Field id="message" label="Message" error={errors.message?.message}><Textarea id="message" rows={5} aria-invalid={!!errors.message} {...register("message")} /></Field>
      <SendButtons onWhatsApp={send("wa")} onEmail={send("email")} />
      <p className="text-sm text-muted-foreground">Your message opens in your own WhatsApp or email app. Nothing is stored by this website.</p>
    </form>
  );
}
