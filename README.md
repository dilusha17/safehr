# Safe HR Consultants – Safety Store

Front-end only store (no backend). Run with `bun install && bun run dev`.

- Data: `src/data/` (products, categories, company, content, legal). Commerce constants: `src/config/commerce.ts`.
- Add a product: append to `src/data/products.ts` with a `categoryPath` matching `src/data/categories.ts`.
- Add a category: add it to the tree in `src/data/categories.ts`; empty categories stay hidden.
- Orders: cart (localStorage `safehr_cart_v1`) → `/checkout` → WhatsApp or email message.

## TODOs
- Confirm GST-inclusive pricing, email address, shipping/returns and terms.
- Download product images into `src/assets/products/` before the old site is retired.
- Confirm testimonial approvals and AI camera privacy wording (Privacy Act 2020).
- Confirm bulk-order process; supply technology specs if wanted.
- Replace hero background photos and the text logo with real brand assets.
- TODO(backend): online payment / order API.
