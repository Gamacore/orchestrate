# SvelteKit Port Design

## Goal

Replace the current minimal Next.js marketing site with a fresh SvelteKit app while preserving the exact homepage structure, content, and theme behavior.

## Scope

- Move the current Next.js app into `old/` as an archive.
- Stand up a new SvelteKit app at the repository root.
- Rebuild `/` as a near-1:1 port of the current page.
- Extract the reusable visual primitives into `src/lib/ui`.
- Keep deployment friendly for Vercel and preserve the existing SEO basics.

## UI System

The new app should use a tiny shared library rather than inline page-specific styling. The initial primitives are:

- `Container`
- `BrandLockup`
- `ChipLink`
- `SectionHeading`
- `AsciiHero`
- `FooterThemeToggle`
- shared SVG icons

These primitives should stay visually quiet and consistent with the current minimal typography and theme behavior.

## Architecture

- Global tokens and theme variables live in `src/app.css`.
- Site metadata lives in `src/lib/config/site.ts`.
- Theme persistence and class application live in `src/lib/theme.ts`.
- The homepage is composed in `src/routes/+page.svelte`.
- Static SEO artifacts live in `static/`.

## Out Of Scope

- No redesign.
- No blog implementation yet.
- No CMS or markdown pipeline yet.

## Verification

Success means the new SvelteKit app builds, reproduces the current `/` page faithfully, and leaves the old Next.js app intact in `old/`.
