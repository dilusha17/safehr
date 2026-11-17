import { describe, expect, it } from "vitest";
import { clampQty } from "@/context/CartContext";
import { buildOrderMessage } from "@/lib/orderRequest";
import { formatNZD } from "@/lib/format";

describe("commerce rules", () => {
  it("caps a cart line at 20", () => expect(clampQty(25)).toBe(20));
  it("never goes below 1", () => expect(clampQty(0)).toBe(1));
  it("formats NZD as $24.95", () => expect(formatNZD(24.95)).toBe("$24.95"));
  it("builds the order line and subtotal", () => {
    const msg = buildOrderMessage({
      lines: [{ name: "SAFE HR Cut Resistant Glove – Cut Level 3 (A3)", qty: 2, price: 15.95 }],
      customer: { fullName: "A", email: "a@b.nz", phone: "021", address: "X" },
    });
    expect(msg).toContain("1. SAFE HR Cut Resistant Glove – Cut Level 3 (A3) x 2 @ $15.95 = $31.90");
    expect(msg).toContain("Subtotal: $31.90 NZD");
  });
});
