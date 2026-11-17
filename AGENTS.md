<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.

## What Lovable manages

Rules outside this block are the project's own. Change the pieces below in
Lovable, not by hand. With the [Lovable MCP](https://mcp.lovable.dev)
connected, `send_message` asks Lovable to do it; otherwise ask the user to
use the editor.

- **Database.** Do not add or edit `supabase/migrations/` or `drizzle/`.
  Ask Lovable to change the schema.
- **Generated files.** Do not edit a file whose header says it is automatically
  generated.
- **AI gateway.** Keep model calls on Lovable's gateway, and keep
  `LOVABLE_API_KEY` out of browser code.
- **Connectors.** Lovable provides native connectors. `list_connectors` shows
  which are enabled; `add_connector` only returns the dashboard link. When a
  connector is enabled, calls go through the connector gateway and need
  `LOVABLE_API_KEY`. When Lovable does not provide one, users can bring their
  own key and store it in Secrets.
- **Secrets.** Lovable manages them. Do not put secret values in the repo.
<!-- LOVABLE:END -->

## Project rules
- Front-end only store: no backend, database, auth or payments; orders are sent by WhatsApp/email via `src/lib/orderRequest.ts` (owner requirement; swap point for a future backend).
- All products, categories, company details and copy live in `src/data/`; components derive nav, counts and breadcrumbs from them, never hard-code.
- Routing is TanStack file routes with per-route `head()` (the brief's React Router/Helmet were mapped to these); shop filters live in validated URL search params.
- Register bundled decorative icon sets through `src/lib/icons.ts` and render them through `AppIcon`; this prevents runtime icon API requests.
- Initialize AOS once in the root through `useAos`; `Reveal` opts in only below-fold content, and changed shop grids drop reveals to keep results visible.
- Reference the uploaded original logo only from `Logo`; public copies serve the favicon and page-specific sharing metadata.
