# AGENTS.md

## Cursor Cloud specific instructions

### Overview

This is Arcten's marketing/landing page — a static SvelteKit website with no backend, database, or external service dependencies. The site is deployed to Cloudflare Pages via Wrangler.

### Package manager

The project uses **Bun** (lockfile: `bun.lock`). Always use `bun` commands (not npm/yarn/pnpm).

### Key commands

| Task             | Command         |
| ---------------- | --------------- |
| Install deps     | `bun install`   |
| Dev server       | `bun run dev`   |
| Production build | `bun run build` |
| Lint             | `bun run lint`  |

### Notes

- Bun must be installed system-wide (`curl -fsSL https://bun.sh/install | bash`). It is not managed by nvm.
- `bun run check` runs `svelte-check` against the generated SvelteKit tsconfig.
- `bun run lint` should pass; if it fails, it usually indicates formatting or lint regressions that should be fixed rather than ignored.
- No environment variables, secrets, or `.env` files are needed.
- No Docker, databases, or external services are required.
- The theme toggle (light/dark/system) is in the footer; it is the primary interactive element.
