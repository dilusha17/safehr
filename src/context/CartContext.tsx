import { createContext, useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { CART_STORAGE_KEY, MAX_QTY_PER_LINE } from "@/config/commerce";
import { getProductById } from "@/lib/products";
import type { Product } from "@/data/products";

export type CartItem = { productId: string; qty: number };
export type CartLineView = CartItem & { product: Product };

export type CartContextValue = {
  items: CartItem[];
  lines: CartLineView[];
  totalQty: number;
  subtotal: number;
  addItem: (productId: string, qty?: number) => void;
  setQty: (productId: string, qty: number) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
  isOpen: boolean;
  setOpen: (open: boolean) => void;
  hydrated: boolean;
};

export const CartContext = createContext<CartContextValue | null>(null);

export const clampQty = (n: number) => Math.min(MAX_QTY_PER_LINE, Math.max(1, Math.round(n) || 1));

function readStorage(): CartItem[] {
  try {
    const raw = window.localStorage.getItem(CART_STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter(
        (i): i is CartItem =>
          typeof i === "object" && i !== null && typeof i.productId === "string" && typeof i.qty === "number",
      )
      .filter((i) => getProductById(i.productId))
      .map((i) => ({ productId: i.productId, qty: clampQty(i.qty) }));
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const loaded = useRef(false);

  useEffect(() => {
    setItems(readStorage());
    loaded.current = true;
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!loaded.current) return;
    try {
      window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* storage unavailable */
    }
  }, [items]);

  const addItem = useCallback((productId: string, qty = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.productId === productId);
      if (existing) return prev.map((i) => (i.productId === productId ? { ...i, qty: clampQty(i.qty + qty) } : i));
      return [...prev, { productId, qty: clampQty(qty) }];
    });
  }, []);
  const setQty = useCallback((productId: string, qty: number) => {
    setItems((prev) => prev.map((i) => (i.productId === productId ? { ...i, qty: clampQty(qty) } : i)));
  }, []);
  const removeItem = useCallback((productId: string) => {
    setItems((prev) => prev.filter((i) => i.productId !== productId));
  }, []);
  const clearCart = useCallback(() => setItems([]), []);

  const value = useMemo<CartContextValue>(() => {
    const lines = items.flatMap((i) => {
      const product = getProductById(i.productId);
      return product ? [{ ...i, product }] : [];
    });
    return {
      items,
      lines,
      totalQty: lines.reduce((s, l) => s + l.qty, 0),
      subtotal: lines.reduce((s, l) => s + l.qty * l.product.price, 0),
      addItem,
      setQty,
      removeItem,
      clearCart,
      isOpen,
      setOpen,
      hydrated,
    };
  }, [items, isOpen, hydrated, addItem, setQty, removeItem, clearCart]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
