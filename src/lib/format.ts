import { company } from "@/data/company";

const nzd = new Intl.NumberFormat("en-NZ", { style: "currency", currency: "NZD", currencyDisplay: "narrowSymbol" });

/** Formats a number as NZ dollars, e.g. $24.95 */
export function formatNZD(n: number): string {
  return nzd.format(n);
}

export function buildWhatsAppLink(text?: string): string {
  const base = `https://wa.me/${company.whatsapp.number}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}

export function buildMailtoLink(subject: string, body: string): string {
  return `mailto:${company.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
