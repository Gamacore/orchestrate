# Arcten

Arcten's main site now runs on SvelteKit and is configured for Cloudflare Pages deployments via Wrangler.

## Commands

```bash
bun install
bun run dev
bun run build
bun run lint
bun run cf:project:create
bun run cf:deploy
```

## Structure

- `src/routes/+page.svelte` contains the current homepage.
- `src/lib/ui` contains the shared UI primitives for the site.
- `src/lib/config/site.ts` contains site metadata and width tokens.
- `old/` preserves the archived Next.js implementation.

## Notes

- The current site intentionally only ships `/`.
- Theme selection is stored in `localStorage` with light, dark, and system modes.
- The Cloudflare adapter is configured already, so the app builds to `.svelte-kit/cloudflare`.

## Cloudflare Pages

Create the Pages project once:

```bash
bun run cf:project:create
```

Deploy the current build:

```bash
bun run cf:deploy
```

If you prefer running Wrangler yourself, the equivalent flow is:

```bash
bun run build
bunx wrangler pages deploy .svelte-kit/cloudflare
```
