import { formatNZD } from "./format";

export type OrderLine = { name: string; qty: number; price: number };
export type OrderCustomer = {
  fullName: string;
  company?: string | undefined;
  email: string;
  phone: string;
  address: string;
  notes?: string | undefined;
};
export type OrderRequest = { lines: OrderLine[]; customer: OrderCustomer };

// TODO(backend): replace message building with an order API / payment provider later.
export function buildOrderMessage(order: OrderRequest): string {
  const lines = order.lines.map(
    (l, i) => `${i + 1}. ${l.name} x ${l.qty} @ ${formatNZD(l.price)} = ${formatNZD(l.price * l.qty)}`,
  );
  const subtotal = order.lines.reduce((s, l) => s + l.price * l.qty, 0);
  const c = order.customer;
  return [
    "Hello Safe HR, I'd like to order:",
    ...lines,
    `Subtotal: ${formatNZD(subtotal)} NZD`,
    "",
    `Name: ${c.fullName}`,
    `Company: ${c.company || "-"}`,
    `Phone: ${c.phone}`,
    `Email: ${c.email}`,
    `Delivery address: ${c.address}`,
    `Notes: ${c.notes || "-"}`,
  ].join("\n");
}
