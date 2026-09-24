# Arcten Inference Optimization Platform Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild Arcten's static marketing site around one inference-optimization platform with focused Inference and Gateway product pages, native Svelte interactions, truthful early-access copy, complete documentation, and a compact technical blog.

**Architecture:** Keep product claims and navigation in typed content modules, put deterministic routing, mail-draft generation, filtering, and metadata behavior in pure tested functions, and render all first-load content during SvelteKit prerendering. Use small native Svelte components for progressive enhancement; remove the React/Performative UI runtime while preserving the approved ASCII ripple, completion-window selector, provider marquee, policy demo, theme behavior, and finite footer.

**Tech Stack:** SvelteKit 2, Svelte 5 runes, TypeScript, Tailwind CSS 4, component-scoped CSS, Lucide Svelte, Bun tests, Cloudflare Pages adapter, agent-browser for interaction and screenshot verification.

---

## Source Of Truth

- Primary design: `docs/superpowers/specs/2026-07-29-inference-gateway-product-site-design.md`
- Mission/footer design: `docs/superpowers/specs/2026-07-25-mission-company-page-design.md`
- This plan supersedes `docs/superpowers/plans/2026-07-25-mission-company-footer-implementation.md`. Do not execute the older plan separately; its stale private-model and root-fragment destinations are intentionally replaced here.

## Baseline And Worktree Safety

The target worktree contains substantial uncommitted site work. Do not reset, restore, or broadly format it. Before every commit:

```bash
git status --short
git diff --cached --check
git diff --cached --stat
```

Stage only the files named by the current task and inspect their full staged diffs. As of 2026-07-30:

- `bun test`: 17 tests pass.
- `bun run check`: 0 errors and 0 warnings.
- `bun run build`: succeeds.
- `bun run lint`: fails only because Prettier currently scans planning artifacts under `.superpowers/` and `docs/superpowers/`.

## File Map

### Content And Pure Logic

- Create `src/lib/content/navigation.ts` for typed route, fragment, email, and external links plus active-route logic.
- Create `src/lib/content/platform.ts` for homepage copy, product choices, execution paths, access options, and FAQ.
- Create `src/lib/content/inference.ts` for the Inference hero, completion explanation, planned route, cross-sell, access copy, and FAQ.
- Create `src/lib/content/gateway.ts` for Gateway marketing copy, providers, policy options, fixture candidates, receipt labels, and FAQ.
- Create `src/lib/content/gateway-docs.ts` for proposed Gateway request/response lifecycle examples.
- Create `src/lib/content/company.ts` for the approved mission bridge and Company narrative.
- Create `src/lib/content/footer.ts` for the four-path footer, utility links, social links, and legal links.
- Create `src/lib/content/docs-hub.ts` for the two-path documentation index.
- Create `src/lib/content/inference-docs.ts` for Inference documentation.
- Retain the current `src/lib/content/docs.ts` compatibility shape until the old Docs route is
  replaced, then delete it.
- Create `src/lib/gateway/policy.ts` for the deterministic policy-to-receipt evaluator.
- Create `src/lib/contact/mailto.ts` for platform, Inference, and Gateway email drafts.
- Create `src/lib/blog/filter.ts` for progressive title, excerpt, and tag filtering.
- Create `src/lib/seo/metadata.ts` for route metadata, canonical URLs, and permitted JSON-LD.
- Modify `src/lib/config/site.ts` to remove private-model and unverified organization claims.
- Retain `src/lib/pricing/completion-windows.ts` as the sole completion-window rate source.

Each pure module receives a neighboring `*.test.js` file. Replace the stale assertions in
`src/lib/content/landing.test.js` and `src/lib/content/blog-posts.test.js`; delete
`src/lib/content/landing.ts` and its test after every consumer has migrated.

### Shared Svelte Components

- Rewrite `src/lib/ui/AsciiHero.svelte`, `WordRoll.svelte`, `TierPricingDemo.svelte`, and `TrustStrip.svelte` as native Svelte.
- Create `src/lib/ui/ActionLinks.svelte`, `FaqList.svelte`, `CodePanel.svelte`, `PageMetadata.svelte`, and `MissionBridge.svelte`.
- Rewrite `src/lib/ui/MarketingHeader.svelte` and `SiteFooter.svelte`.
- Delete the obsolete React-wrapper components after root migration:
  `AnnouncementBanner.svelte`, `ContactWaitlist.svelte`, `DeploymentBackdrop.svelte`, and
  `HeroActions.svelte`.
- Update `src/lib/ui/index.ts`.

### Platform And Product Components

- Create `src/lib/ui/PlatformHero.svelte`, `PlatformProductChooser.svelte`,
  `PlatformRouteFlow.svelte`, and `PlatformAccessForm.svelte`.
- Create `src/lib/ui/InferenceHero.svelte`, `InferencePlannedRoute.svelte`,
  `GatewayCrossSell.svelte`, and `InferenceAccessBand.svelte`.
- Create `src/lib/ui/GatewayHero.svelte`, `GatewayRoutingField.svelte`,
  `ProviderMarquee.svelte`, `GatewayPolicyDemo.svelte`, `RouteReceipt.svelte`,
  `GatewayRouteFlow.svelte`, and `GatewayAccessForm.svelte`.
- Create `src/lib/ui/DocsSectionNav.svelte` only for the shared compact docs navigation.
- Create `src/lib/ui/BlogFilters.svelte`.

### Routes And Verification

- Rewrite `src/routes/+page.svelte`; delete the now-unused `src/routes/+page.server.ts`.
- Create skeletal `src/routes/inference/+page.svelte`, `src/routes/gateway/+page.svelte`,
  `src/routes/docs/inference/+page.svelte`, and `src/routes/docs/gateway/+page.svelte` with the
  shared shell, then expand them in their product/docs tasks.
- Create `src/routes/company/+page.svelte`.
- Rewrite `src/routes/docs/+page.svelte`.
- Create `src/routes/docs/inference/+page.svelte` and `src/routes/docs/gateway/+page.svelte`.
- Rewrite `src/routes/blog/+page.svelte`; update both blog route metadata surfaces.
- Modify `src/routes/+layout.svelte` and `src/routes/+layout.ts`.
- Modify `src/routes/tos/+page.svelte` only for shared metadata integration.
- Create `scripts/verify-prerendered-site.ts`.
- Modify `src/app.css`, `svelte.config.js`, `package.json`, `bun.lock`, `.prettierignore`, and
  `static/sitemap.xml`.

---

### Task 1: Capture The Current Site Foundation And Fix Lint

**Files:**

- Modify: `.prettierignore`
- Modify: `bun.lock`
- Modify: `package.json`
- Create: `content/blog/hosted-open-models-or-a-private-deployment.md`
- Create: `content/blog/inference-cost-is-a-product-decision.md`
- Create: `content/blog/what-a-completion-window-buys-you.md`
- Modify: `src/app.css`
- Modify: `src/app.html`
- Create: `src/fontsource.d.ts`
- Modify: `src/lib/config/site.ts`
- Modify: `src/lib/content/blog.server.ts`
- Create: `src/lib/content/blog-posts.test.js`
- Create: `src/lib/content/docs.ts`
- Create: `src/lib/content/landing.test.js`
- Create: `src/lib/content/landing.ts`
- Create: `src/lib/pricing/completion-windows.test.js`
- Create: `src/lib/pricing/completion-windows.ts`
- Modify: `src/lib/theme.ts`
- Modify: `src/lib/ui/AsciiHero.svelte`
- Modify: `src/lib/ui/BlogTimeline.svelte`
- Modify: `src/lib/ui/BrandLockup.svelte`
- Delete: `src/lib/ui/FooterThemeToggle.svelte`
- Create: `src/lib/ui/AnnouncementBanner.svelte`
- Create: `src/lib/ui/ContactWaitlist.svelte`
- Create: `src/lib/ui/DeploymentBackdrop.svelte`
- Create: `src/lib/ui/HeroActions.svelte`
- Create: `src/lib/ui/MarketingHeader.svelte`
- Create: `src/lib/ui/SiteFooter.svelte`
- Create: `src/lib/ui/ThemeToggle.svelte`
- Create: `src/lib/ui/TierPricingDemo.svelte`
- Create: `src/lib/ui/TrustStrip.svelte`
- Create: `src/lib/ui/WordRoll.svelte`
- Create: `src/lib/ui/icons/LinkedInLogo.svelte`
- Modify: `src/lib/ui/index.ts`
- Modify: `src/routes/+layout.svelte`
- Modify: `src/routes/+page.server.ts`
- Modify: `src/routes/+page.svelte`
- Create: `src/routes/blog/+page.server.ts`
- Create: `src/routes/blog/+page.svelte`
- Modify: `src/routes/blog/[slug]/+page.svelte`
- Create: `src/routes/docs/+page.svelte`
- Modify: `svelte.config.js`
- Modify: `tsconfig.json`
- Create: `static/logos/team-ignite-ventures.webp`
- Create: `static/logos/unanimous-capital.svg`
- Create: `static/logos/vanta-soc-2.png`
- Create: `static/logos/y-combinator.svg`

- [ ] **Step 1: Reproduce the existing failure**

Run:

```bash
bun run lint
```

Expected: FAIL first on formatting warnings under `.superpowers/**` and `docs/superpowers/**`.
Running `bun x eslint .` separately also reports the existing unresolved-fragment link in
`MarketingHeader.svelte`.

- [ ] **Step 2: Exclude planning artifacts and fix the one existing lint error**

Append:

```text
# Planning artifacts
.superpowers/
docs/superpowers/
```

Do not format or rewrite the existing specs and brainstorm artifacts.

In `MarketingHeader.svelte`, keep `${resolve('/')}#access` so the configured base is preserved, and
place a targeted
`<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->` immediately before that
anchor. Include a comment explaining that only the fragment is appended after SvelteKit resolves
the route. This is an intermediate lint fix; Task 7 replaces the header with the final typed
navigation helper and the same narrowly scoped rule exception for resolved route-plus-fragment
links.

- [ ] **Step 3: Verify the current application baseline**

Run:

```bash
bun test
bun run check
bun run lint
bun run build
```

Expected: 17 tests pass, Svelte diagnostics are clean, lint passes, and the production build
succeeds.

- [ ] **Step 4: Stage the exact current-site foundation**

The files listed in this task are the already-built Arcten site foundation that later tasks depend
on. Stage every listed path and no others. In particular, do **not** stage:

```text
.superpowers/
docs/superpowers/plans/2026-07-30-inference-optimization-platform-site-implementation.md
content/blog/evidence-that-forge-code-cheated-on-terminal-bench.md
```

The last file contains an unrelated user edit. Leave it untouched.

Run `git status --short`, then stage the exact Task 1 file list in manageable path groups. Confirm
the staged diff contains the currently passing site, pricing source, blog loader/routes, logos,
font declarations, and package lock.

- [ ] **Step 5: Commit the reproducible baseline**

```bash
git diff --cached --check
git commit -m "chore: capture current marketing site baseline"
```

- [ ] **Step 6: Verify the commit from a clean worktree**

Use `@using-git-worktrees` to create `/tmp/arcten-aura-baseline` at the new `HEAD`. In that clean
worktree run:

```bash
bun install --frozen-lockfile
bun test
bun run check
bun run lint
bun run build
```

Expected: the same passing baseline without relying on untracked files from `/mnt/z/aura`.
Remove only the temporary verification worktree afterward. Do not touch the original dirty
worktree.

---

### Task 2: Define Navigation, Platform, Mission, And Footer Contracts

**Files:**

- Create: `src/lib/content/navigation.ts`
- Create: `src/lib/content/navigation.test.js`
- Create: `src/lib/content/platform.ts`
- Create: `src/lib/content/platform.test.js`
- Create: `src/lib/content/company.ts`
- Create: `src/lib/content/company.test.js`
- Create: `src/lib/content/footer.ts`
- Create: `src/lib/content/footer.test.js`

- [ ] **Step 1: Write failing navigation tests**

Use this contract in `navigation.test.js`:

```js
import { describe, expect, test } from 'bun:test';
import { isCurrentNavItem, marketingNav } from './navigation';

describe('marketing navigation', () => {
	test('exposes the six approved destinations in order', () => {
		expect(marketingNav.map(({ label, route, kind }) => ({ label, route, kind }))).toEqual([
			{ label: 'Inference', route: '/inference', kind: 'route' },
			{ label: 'Gateway', route: '/gateway', kind: 'route' },
			{ label: 'Models & Pricing', route: '/inference', kind: 'fragment' },
			{ label: 'Docs', route: '/docs', kind: 'route' },
			{ label: 'Blog', route: '/blog', kind: 'route' },
			{ label: 'Company', route: '/company', kind: 'route' }
		]);
		expect(marketingNav[2].hash).toBe('#pricing');
	});

	test('marks route families but never marks the pricing fragment current', () => {
		expect(
			marketingNav
				.filter((item) => isCurrentNavItem('/docs/gateway', item))
				.map((item) => item.label)
		).toEqual(['Docs']);
		expect(
			marketingNav
				.filter((item) => isCurrentNavItem('/blog/[slug]', item))
				.map((item) => item.label)
		).toEqual(['Blog']);
		expect(
			marketingNav.filter((item) => isCurrentNavItem('/inference', item)).map((item) => item.label)
		).toEqual(['Inference']);
	});
});
```

- [ ] **Step 2: Write failing platform, mission, and footer tests**

Tests must assert:

- homepage eyebrow `Inference optimization`;
- homepage heading `More intelligence per dollar.`;
- exactly two products named `Arcten Inference` and `Arcten Gateway`;
- rail labels `Open-model execution`, `Provider routing`, and `Cost and latency controls`;
- homepage actions and product-choice links match the exact labels/destinations in `Calls to Action`;
- the five approved platform FAQ answers;
- mission heading `More intelligence per dollar. More people able to build.`;
- all four Company narrative headings from the mission spec;
- footer paths in final order: `Inference`, `Gateway`, `Build with Arcten`, `Why Arcten`;
- pricing/service-tier links point to `/inference#pricing` and `/inference#use-cases`;
- verified social links are exactly X and LinkedIn;
- no footer or mission string contains `private model`, `deploy your model`, `custom kernel`,
  `building AGI`, or a completed SOC 2 claim.

- [ ] **Step 3: Run the focused tests**

```bash
bun test src/lib/content/navigation.test.js src/lib/content/platform.test.js src/lib/content/company.test.js src/lib/content/footer.test.js
```

Expected: FAIL because the modules do not exist.

- [ ] **Step 4: Implement the typed link model**

`navigation.ts` must distinguish routes and fragments:

```ts
export type SiteRoute =
	| '/'
	| '/inference'
	| '/gateway'
	| '/docs'
	| '/docs/inference'
	| '/docs/gateway'
	| '/blog'
	| '/company'
	| '/tos';

export type InternalLink =
	| { label: string; kind: 'route'; route: SiteRoute }
	| {
			label: string;
			kind: 'fragment';
			route: '/' | '/inference' | '/gateway';
			hash: `#${string}`;
	  };

export type MarketingLink =
	| InternalLink
	| { label: string; kind: 'email'; href: `mailto:${string}` }
	| { label: string; kind: 'external'; href: `https://${string}` };

export const marketingNav = [
	{ label: 'Inference', kind: 'route', route: '/inference' },
	{ label: 'Gateway', kind: 'route', route: '/gateway' },
	{
		label: 'Models & Pricing',
		kind: 'fragment',
		route: '/inference',
		hash: '#pricing'
	},
	{ label: 'Docs', kind: 'route', route: '/docs' },
	{ label: 'Blog', kind: 'route', route: '/blog' },
	{ label: 'Company', kind: 'route', route: '/company' }
] as const satisfies readonly InternalLink[];

export function isCurrentNavItem(routeId: string | null, item: InternalLink) {
	if (!routeId || item.kind === 'fragment') return false;
	if (item.route === '/docs') return routeId === '/docs' || routeId.startsWith('/docs/');
	if (item.route === '/blog') return routeId === '/blog' || routeId.startsWith('/blog/');
	return routeId === item.route;
}
```

- [ ] **Step 5: Implement the approved copy modules**

Copy the exact homepage, product chooser, two-path explanation, access, and FAQ prose from
`Platform Homepage` in the primary spec into `platform.ts`. Copy the exact mission bridge and all
four Company sections from the mission spec into `company.ts`.

In `footer.ts`, export the four final paths from `Existing Company Work` in the primary spec. Use
the shared `MarketingLink` union. Include direct `Inference`, `Gateway`, `Pricing`,
`Service tiers`, `Docs`, `Blog`, and `Terms` utility links; X and LinkedIn external links; and no
destination for a page that does not exist.

- [ ] **Step 6: Run tests**

```bash
bun test src/lib/content/navigation.test.js src/lib/content/platform.test.js src/lib/content/company.test.js src/lib/content/footer.test.js
bun run check
bun run build
```

Expected: all focused tests pass, diagnostics remain clean, and the current site still builds.

- [ ] **Step 7: Commit**

```bash
git add src/lib/content/navigation.ts src/lib/content/navigation.test.js src/lib/content/platform.ts src/lib/content/platform.test.js src/lib/content/company.ts src/lib/content/company.test.js src/lib/content/footer.ts src/lib/content/footer.test.js
git diff --cached --check
git commit -m "feat: define platform navigation and mission content"
```

---

### Task 3: Define Inference, Gateway, And Documentation Contracts

**Files:**

- Create: `src/lib/content/inference.ts`
- Create: `src/lib/content/inference.test.js`
- Create: `src/lib/content/gateway.ts`
- Create: `src/lib/content/gateway.test.js`
- Create: `src/lib/content/gateway-docs.ts`
- Create: `src/lib/content/docs-hub.ts`
- Create: `src/lib/content/inference-docs.ts`
- Create: `src/lib/content/docs.test.js`

- [ ] **Step 1: Write failing product-content tests**

Cover these exact contracts:

```js
expect(inferenceCopy.hero.heading).toBe('Spend less on open-model inference.');
expect(inferenceCopy.hero.description).toContain('run work now');
expect(inferenceCopy.hero.description).toContain('wait longer to pay less');
expect(inferenceCopy.plannedRoute.model).toBe('GLM-5.2 FP8');

expect(gatewayCopy.hero.heading).toBe('Spend less on AI inference.');
expect(gatewayCopy.byokStatement).toBe(
	'Bring your provider keys. Keep your provider contracts and direct billing.'
);
expect(gatewayProviderLabels).toContain('Arcten');
expect(gatewayProviderLabels).toContain('BYOK providers');
expect(gatewayCopy.providerQualifier.toLowerCase()).toContain('planned');
```

Also assert:

- the connected-provider boundary includes only customer BYOK accounts plus Arcten Inference;
- the price-cap copy calls it a hard token-charge ceiling and requires
  `max_completion_tokens`;
- model substitution is opt-in;
- the Inference and Gateway cross-sells point to each other;
- every Inference and Gateway action matches the exact label/destination table in
  `Calls to Action`;
- every unavailable surface says `planned`, `preview`, `building`, or `early access`;
- no copy claims universal savings, preserved quality, proprietary-model completion discounts,
  live integrations, custom/private models, customer deployments, or completed SOC 2 compliance.

- [ ] **Step 2: Write failing docs tests**

Assert that:

- `/docs` content presents exactly `Inference` and `Gateway`;
- Inference docs preserve all four completion windows and the preview-rate source;
- Gateway docs contain `POST /v1/chat/completions`, `max_completion_tokens`, the four routing
  policy groups, immediate response headers, deferred `202`, queued/running/completed/failed
  states, `409`, `streaming_not_supported`, and the hard-cap qualifier;
- relative API paths appear only in content labeled `Proposed API`;
- no docs content contains a private-model navigation item, install command, credential, or live
  production endpoint claim.

- [ ] **Step 3: Run tests and verify failure**

```bash
bun test src/lib/content/inference.test.js src/lib/content/gateway.test.js src/lib/content/docs.test.js
```

Expected: FAIL because the new product and replacement docs modules are absent.

- [ ] **Step 4: Implement Inference content without duplicating pricing data**

`inference.ts` contains prose and rows only. Import rates from
`src/lib/pricing/completion-windows.ts` wherever values are needed; do not copy numeric token rates
into the content module. Use exact hero, planned-route, cross-sell, access, and FAQ copy from the
primary spec.

- [ ] **Step 5: Implement Gateway marketing fixtures**

In `gateway.ts`, define the four policy unions and the seven candidates exactly:

```ts
export type ModelPolicy = 'exact' | 'allowlist' | 'automatic';
export type TimingPolicy = 'now' | 'deadline' | 'flex';
export type CostPolicy = 'lowest_cost' | 'price_cap';
export type FallbackPolicy = 'reject' | 'preferred_provider';

export const illustrativeRequest = {
	requestedModel: 'zai-org/GLM-5.2-FP8',
	allowedModels: ['deepseek-ai/DeepSeek-V4'],
	deadlineSeconds: 300,
	maxRequestUsd: 0.025,
	preferredProvider: 'Customer preferred provider'
} as const;

export const gatewayCandidates = [
	['customer-exact-now', 'zai-org/GLM-5.2-FP8', 'Customer provider', 'now', 0.046, 'normal'],
	[
		'arcten-exact-deadline',
		'zai-org/GLM-5.2-FP8',
		'Arcten Inference preview',
		'deadline',
		0.028,
		'normal'
	],
	['arcten-exact-flex', 'zai-org/GLM-5.2-FP8', 'Arcten Inference preview', 'flex', 0.018, 'normal'],
	['customer-alt-now', 'deepseek-ai/DeepSeek-V4', 'Customer provider', 'now', 0.032, 'normal'],
	[
		'arcten-alt-deadline',
		'deepseek-ai/DeepSeek-V4',
		'Arcten Inference preview',
		'deadline',
		0.02,
		'normal'
	],
	[
		'arcten-alt-flex',
		'deepseek-ai/DeepSeek-V4',
		'Arcten Inference preview',
		'flex',
		0.014,
		'normal'
	],
	[
		'preferred-exact-now',
		'zai-org/GLM-5.2-FP8',
		'Customer preferred provider',
		'now',
		0.024,
		'fallback'
	]
] as const;
```

Convert tuple fixtures to a typed object array if that makes the evaluator clearer, but preserve
this exact order and values.

- [ ] **Step 6: Add replacement docs content without breaking the current route**

Put the two-path hub in `docs-hub.ts` and the replacement Inference documentation in
`inference-docs.ts`. Put the long proposed Gateway request, queued receipt, completed excerpt,
failed behavior, streaming error, and rejection examples in `gateway-docs.ts`. Copy those JSON/text
examples exactly from `One Inference Endpoint` in the primary spec; do not invent endpoint hosts
or API keys.

Do not modify or delete the current `docs.ts` yet. The existing `/docs` route still consumes its
`docsCopy.customModels` field. Task 11 switches the route to the replacement modules and deletes
that compatibility file in the same commit.

- [ ] **Step 7: Run tests**

```bash
bun test src/lib/content/inference.test.js src/lib/content/gateway.test.js src/lib/content/docs.test.js src/lib/pricing/completion-windows.test.js
bun run check
bun run build
```

Expected: all focused tests pass, diagnostics remain clean, and the compatibility routes still
build.

- [ ] **Step 8: Commit**

```bash
git add src/lib/content/inference.ts src/lib/content/inference.test.js src/lib/content/gateway.ts src/lib/content/gateway.test.js src/lib/content/gateway-docs.ts src/lib/content/docs-hub.ts src/lib/content/inference-docs.ts src/lib/content/docs.test.js
git diff --cached --check
git commit -m "feat: define inference and gateway product contracts"
```

---

### Task 4: Implement The Deterministic Gateway Policy Engine

**Files:**

- Create: `src/lib/gateway/policy.ts`
- Create: `src/lib/gateway/policy.test.js`

- [ ] **Step 1: Write the 36-state matrix test**

Build the Cartesian product of 3 model policies, 3 timing policies, 2 cost policies, and 2
fallback policies. Assert exactly 36 unique states and these outcomes:

```js
const expected = {
	exact: {
		now: {
			lowest_cost: ['customer-exact-now', 'customer-exact-now'],
			price_cap: [null, 'preferred-exact-now']
		},
		deadline: {
			lowest_cost: ['arcten-exact-deadline', 'arcten-exact-deadline'],
			price_cap: [null, 'preferred-exact-now']
		},
		flex: {
			lowest_cost: ['arcten-exact-flex', 'arcten-exact-flex'],
			price_cap: ['arcten-exact-flex', 'arcten-exact-flex']
		}
	},
	allowlist: {
		now: {
			lowest_cost: ['customer-alt-now', 'customer-alt-now'],
			price_cap: [null, 'preferred-exact-now']
		},
		deadline: {
			lowest_cost: ['arcten-alt-deadline', 'arcten-alt-deadline'],
			price_cap: ['arcten-alt-deadline', 'arcten-alt-deadline']
		},
		flex: {
			lowest_cost: ['arcten-alt-flex', 'arcten-alt-flex'],
			price_cap: ['arcten-alt-flex', 'arcten-alt-flex']
		}
	},
	automatic: {
		now: {
			lowest_cost: ['customer-alt-now', 'customer-alt-now'],
			price_cap: [null, 'preferred-exact-now']
		},
		deadline: {
			lowest_cost: ['arcten-alt-deadline', 'arcten-alt-deadline'],
			price_cap: ['arcten-alt-deadline', 'arcten-alt-deadline']
		},
		flex: {
			lowest_cost: ['arcten-alt-flex', 'arcten-alt-flex'],
			price_cap: ['arcten-alt-flex', 'arcten-alt-flex']
		}
	}
};
```

Each two-element outcome is `[reject-mode outcome, preferred-provider-mode outcome]`; `null`
means a rejected receipt.

- [ ] **Step 2: Add focused receipt assertions**

Tests must additionally prove:

- default `exact + deadline + lowest_cost + reject` selects
  `arcten-exact-deadline`;
- `modelChanged` is true for DeepSeek and false for exact/fallback GLM;
- rejected receipts contain no selected model/provider/cost;
- price-cap selections never exceed `$0.025`;
- fallback candidates are ignored while a normal candidate remains;
- an injected equal-cost fixture resolves by original fixture order;
- receipt reasons and status are deterministic and contain no random values.

- [ ] **Step 3: Run the test**

```bash
bun test src/lib/gateway/policy.test.js
```

Expected: FAIL because `evaluateGatewayPolicy` does not exist.

- [ ] **Step 4: Implement the evaluator as a pure function**

Use this evaluation order:

```ts
const timingRank = { now: 0, deadline: 1, flex: 2 } as const;

function permitsModel(policy: GatewayPolicy, candidate: GatewayCandidate) {
	if (policy.model === 'exact') return candidate.model === illustrativeRequest.requestedModel;
	if (policy.model === 'allowlist') {
		return [illustrativeRequest.requestedModel, ...illustrativeRequest.allowedModels].includes(
			candidate.model
		);
	}
	return true;
}

function permitsTiming(policy: GatewayPolicy, candidate: GatewayCandidate) {
	return timingRank[candidate.timing] <= timingRank[policy.timing];
}

function permitsCost(policy: GatewayPolicy, candidate: GatewayCandidate) {
	return (
		policy.cost === 'lowest_cost' ||
		candidate.illustrativeCostUsd <= illustrativeRequest.maxRequestUsd
	);
}
```

Filter normal candidates first, sort by `illustrativeCostUsd` and then original fixture index, and
select the first. Evaluate the single fallback-only candidate only when no normal candidate
survives and fallback mode is `preferred_provider`. Return a complete accepted or rejected
`ExampleRouteReceipt` with:

```ts
status;
candidateId;
requestedModel;
selectedModel;
selectedRoute;
completionTarget;
budgetResult;
modelChanged;
illustrativeCostUsd;
reason;
```

Do not read browser state, mutate fixture arrays, use current time, or generate IDs.

- [ ] **Step 5: Run tests**

```bash
bun test src/lib/gateway/policy.test.js
bun run check
bun run build
```

Expected: 36 matrix cases plus focused receipt/tie tests pass, diagnostics remain clean, and the
site builds.

- [ ] **Step 6: Commit**

```bash
git add src/lib/gateway/policy.ts src/lib/gateway/policy.test.js
git diff --cached --check
git commit -m "feat: add deterministic gateway policy evaluator"
```

---

### Task 5: Add Mailto, Blog Filter, And SEO Helpers

**Files:**

- Create: `src/lib/contact/mailto.ts`
- Create: `src/lib/contact/mailto.test.js`
- Create: `src/lib/blog/filter.ts`
- Create: `src/lib/blog/filter.test.js`
- Create: `src/lib/seo/metadata.ts`
- Create: `src/lib/seo/metadata.test.js`
- Modify: `src/lib/config/site.ts`

- [ ] **Step 1: Write failing mail-draft tests**

Assert decoded subjects and ordered body fields for:

- platform: email, selected `Inference | Gateway | Both`, then workload, volume, current cost;
- Inference: the six exact prompt labels from the spec;
- Gateway: email, current models, providers, monthly spend, permitted optimizations.

Also assert every href begins with `mailto:founders@arcten.com?`, encodes newlines safely, and does
not claim an account or waitlist record was created.

- [ ] **Step 2: Write failing blog-filter tests**

Use three fixture posts to prove:

- blank query and `all` return every post in source order;
- matching is case-insensitive across title, excerpt, and tags;
- tag filters are derived, unique, and alphabetized;
- query and tag compose;
- no match returns an empty array without mutating input.

- [ ] **Step 3: Write failing metadata tests**

Assert exact title/description pairs from `Route Metadata And Sitemap` for `/`, `/inference`,
`/gateway`, `/docs`, `/docs/inference`, and `/docs/gateway`. Also assert:

```js
expect(canonicalUrl('/preview/gateway')).toBe('https://arcten.com/preview/gateway');
```

Organization JSON-LD may contain only the organization name, production URL, icon, description,
and verified X/LinkedIn destinations. Product pages use `WebPage`, never `Product`,
`SoftwareApplication`, `Offer`, rating, or availability fields.

- [ ] **Step 4: Run tests**

```bash
bun test src/lib/contact/mailto.test.js src/lib/blog/filter.test.js src/lib/seo/metadata.test.js
```

Expected: FAIL because the helpers do not exist.

- [ ] **Step 5: Implement one URI-encoding helper**

Use `URLSearchParams` rather than hand-built escaping:

```ts
const CONTACT_EMAIL = 'founders@arcten.com';

export function buildMailto(subject: string, lines: readonly string[]) {
	const query = new URLSearchParams({
		subject,
		body: lines.join('\n')
	});
	return `mailto:${CONTACT_EMAIL}?${query.toString()}` as const;
}
```

Export `platformEarlyAccessMailto`, `inferenceEarlyAccessMailto`, and
`gatewayEarlyAccessMailto`. Keep subject/body construction in this module so form components do
not duplicate copy or encoding.

- [ ] **Step 6: Implement pure filtering**

Export:

```ts
export function deriveBlogTags(posts: readonly BlogPostListItem[]): string[];
export function filterBlogPosts(
	posts: readonly BlogPostListItem[],
	query: string,
	tag: string
): BlogPostListItem[];
```

Normalize with `trim().toLocaleLowerCase('en-US')`; use exact tag equality after normalization.

- [ ] **Step 7: Implement route metadata**

Replace the site description with the approved platform description. Remove `deploy your own`,
the placeholder founder, unverified GitHub, and unverified YC profile from `site.ts`.

In `metadata.ts`, export a typed `routeMetadata` map, `canonicalUrl(pathname)`,
`organizationJsonLd`, and `webPageJsonLd(metadata, pathname)`. Strip a trailing slash except for
root, but preserve a configured base prefix such as `/preview`.

- [ ] **Step 8: Run tests**

```bash
bun test src/lib/contact/mailto.test.js src/lib/blog/filter.test.js src/lib/seo/metadata.test.js
bun run check
bun run build
```

Expected: all focused tests pass, diagnostics remain clean, and the current routes build.

- [ ] **Step 9: Commit**

```bash
git add src/lib/contact/mailto.ts src/lib/contact/mailto.test.js src/lib/blog/filter.ts src/lib/blog/filter.test.js src/lib/seo/metadata.ts src/lib/seo/metadata.test.js src/lib/config/site.ts
git diff --cached --check
git commit -m "feat: add contact filtering and metadata helpers"
```

---

### Task 6: Remove React While Preserving Existing Page Behavior

**Files:**

- Modify: `src/lib/ui/AsciiHero.svelte`
- Modify: `src/lib/ui/WordRoll.svelte`
- Modify: `src/lib/ui/TierPricingDemo.svelte`
- Modify: `src/lib/ui/TrustStrip.svelte`
- Modify: `src/lib/ui/AnnouncementBanner.svelte`
- Modify: `src/lib/ui/HeroActions.svelte`
- Modify: `src/lib/ui/ContactWaitlist.svelte`
- Modify: `src/lib/ui/DeploymentBackdrop.svelte`
- Create: `src/lib/ui/ActionLinks.svelte`
- Create: `src/lib/ui/FaqList.svelte`
- Create: `src/lib/ui/CodePanel.svelte`
- Modify: `src/lib/ui/index.ts`
- Modify: `package.json`
- Modify: `bun.lock`

- [ ] **Step 1: Record the React dependency boundary**

```bash
rg -n "react|react-dom|performative-ui" src package.json
```

Expected before the refactor: matches in all eight wrapper components and dependency declarations.

- [ ] **Step 2: Rewrite the ASCII base layer and keep the tested click behavior**

Import `heroAscii` from `src/lib/content/hero-ascii.ts` and render it in an absolutely positioned,
masked `<pre aria-hidden="true">`. Preserve the existing canvas ripple algorithm, including:

- pointer-down only, never hover;
- multiple concurrent ripples;
- random seed per click;
- narrow outward ring;
- fragmented radial offsets and per-cell decay;
- existing duration/radius props;
- reduced-motion shortening;
- default cursor, no hand cursor.

Remove the React host and Performative imports. The static ASCII field must be in prerendered HTML.

- [ ] **Step 3: Rewrite the word roll and pricing selector in Svelte**

`WordRoll.svelte` must prerender its first word, rotate with a timer only after mount, keep each word
long enough to read, and show a static first word under reduced motion.

`TierPricingDemo.svelte` must:

- prerender `Now` rates and code;
- expose four native radio controls in a labeled fieldset;
- update on keyboard, click, and pointer movement across the track;
- retain the last hovered/selected state on pointer leave;
- never reset to a prior clicked value;
- use the existing completion-window data and code sample;
- keep all labels visible at `390px`;
- use a polite live region for changed rate/code details.

- [ ] **Step 4: Rewrite trust and temporary wrappers as server-rendered Svelte**

`TrustStrip.svelte` accepts `showBackers` and `showSecurity` booleans, defaults both to true, and
uses `$app/paths` `asset()` for all logo paths. Backer names and
`SOC 2 readiness in progress` must exist in prerendered markup.

Rewrite the four remaining wrapper files with equivalent native markup so the current root remains
buildable during migration. `DeploymentBackdrop` may be a static CSS pattern at this intermediate
stage. Do not add new behavior or dependencies; these four files are deleted in Task 8.

- [ ] **Step 5: Add small shared primitives**

`ActionLinks.svelte` accepts two typed internal links and renders restrained primary/secondary
glass actions. `FaqList.svelte` renders semantic `<details>` rows. `CodePanel.svelte` renders a
filename/language chrome and an overflow-safe `<pre><code>`.

- [ ] **Step 6: Remove React and Performative packages**

```bash
bun remove performative-ui react react-dom @types/react @types/react-dom
```

- [ ] **Step 7: Prove the runtime is gone**

```bash
rg -n "react|react-dom|performative-ui" src package.json
```

Expected: no matches.

Run:

```bash
bun test
bun run check
bun run build
```

Expected: all pass; the current site still prerenders.

- [ ] **Step 8: Commit**

```bash
git add src/lib/ui/AsciiHero.svelte src/lib/ui/WordRoll.svelte src/lib/ui/TierPricingDemo.svelte src/lib/ui/TrustStrip.svelte src/lib/ui/AnnouncementBanner.svelte src/lib/ui/HeroActions.svelte src/lib/ui/ContactWaitlist.svelte src/lib/ui/DeploymentBackdrop.svelte src/lib/ui/ActionLinks.svelte src/lib/ui/FaqList.svelte src/lib/ui/CodePanel.svelte src/lib/ui/index.ts package.json bun.lock
git diff --cached --check
git commit -m "refactor: replace performative react wrappers with svelte"
```

---

### Task 7: Build The Shared Header, Metadata, Company Page, And Footer

**Files:**

- Create: `src/lib/ui/PageMetadata.svelte`
- Create: `src/lib/ui/MissionBridge.svelte`
- Modify: `src/lib/ui/MarketingHeader.svelte`
- Modify: `src/lib/ui/SiteFooter.svelte`
- Modify: `src/lib/ui/index.ts`
- Modify: `src/routes/+layout.svelte`
- Modify: `src/routes/+layout.ts`
- Modify: `src/routes/+page.svelte`
- Modify: `src/routes/docs/+page.svelte`
- Modify: `src/routes/blog/+page.svelte`
- Modify: `src/routes/blog/[slug]/+page.svelte`
- Modify: `src/routes/tos/+page.svelte`
- Create: `src/routes/company/+page.svelte`
- Create: `src/routes/inference/+page.svelte`
- Create: `src/routes/gateway/+page.svelte`
- Create: `src/routes/docs/inference/+page.svelte`
- Create: `src/routes/docs/gateway/+page.svelte`
- Modify: `src/app.css`
- Create: `scripts/verify-prerendered-site.ts`

- [ ] **Step 1: Add failing prerender expectations**

Create `scripts/verify-prerendered-site.ts` with reusable `readPage`, `expectContains`,
`expectCount`, and `expectNotContains` helpers. Its first assertions should require:

- `company.html` contains all four Company headings and `Y Combinator`;
- every current page contains footer headings `Inference`, `Gateway`, `Build with Arcten`, and
  `Why Arcten`;
- `company.html` contains one canonical URL ending `/company`;
- `inference.html` contains `Spend less on open-model inference.` and `Early access`;
- `gateway.html` contains `Spend less on AI inference.` and `Early access`;
- `docs/inference.html` and `docs/gateway.html` exist with their exact metadata, an
  `Early access` or `Proposed API` qualifier, and links back to `/docs`.

Run:

```bash
bun run build
bun scripts/verify-prerendered-site.ts
```

Expected: FAIL because `/company` and the new footer do not exist.

- [ ] **Step 2: Implement one metadata component**

`PageMetadata.svelte` receives `title`, `description`, and optional `jsonLd`. It derives the
canonical from `page.url.pathname`, emits title, description, canonical, Open Graph, and Twitter
summary tags, escapes `<` in JSON-LD, and emits no fake social image.

Remove route-specific title/description/canonical/JSON-LD defaults from `+layout.svelte`; retain
author, robots, font/CSS import, and the global footer. Use `asset('/icon.svg')` for the favicon.
In the same step, replace every existing route's ad hoc head block with `PageMetadata`: root,
Docs, blog index, blog article, and Terms. New routes must add `PageMetadata` when created, so no
intermediate commit ships duplicate or missing metadata.

- [ ] **Step 3: Enable minimal site-wide hydration**

Change `+layout.ts` to:

```ts
export const prerender = true;
export const csr = true;
```

The header menu, forms, theme-aware components, and route demos need native Svelte enhancement on
all routes. The pages remain statically prerendered.

- [ ] **Step 4: Create non-404 product route shells**

Before switching navigation, create minimal prerendered Inference, Gateway, Inference Docs, and
Gateway Docs route shells using their approved content modules, `MarketingHeader`, and
`PageMetadata`. The Inference shell includes empty-but-labeled `#pricing` and `#use-cases`
destination bands; the Gateway shell includes its approved hero and early-access qualifier. The
docs shells clearly say `Preview` or `Proposed API`, link back to `/docs`, and contain no
installation instructions. These are truthful route shells, not fake live-product pages. Tasks 9,
10, and 11 expand them without recovering source from a previous commit.

- [ ] **Step 5: Implement the six-destination header**

Use `marketingNav`, `resolve()`, and `page.route.id`. Desktop must not wrap. Switch to the compact
menu before the six links and action collide.

The compact menu must:

- use Lucide `Menu` and `X`;
- expose all six links and `Request early access`;
- set `aria-expanded` and `aria-controls`;
- focus the first destination after opening;
- close on destination selection, close button, Escape, and outside pointer action;
- restore trigger focus for every non-navigation close;
- leave scrolling and focus untrapped;
- apply at most one `aria-current="page"`.

The shared action is always `Request early access` and resolves to `/#access`, including from
Inference, Gateway, Docs, Blog, and Company.

- [ ] **Step 6: Implement the Company page**

Render the approved hero and four full-width text bands at a `960px` container, then
`<TrustStrip showSecurity={false} />`. Use `PageMetadata` with `Company | Arcten` and the approved
mission description.

- [ ] **Step 7: Implement the site-wide router footer**

Render:

1. `/Start here` and `4 paths`;
2. the four continuous-grid path cells from `footer.ts`;
3. Docs, Social, and Resources utility areas;
4. legal/logo/year/terms/theme controls;
5. one finite outlined `ARCTEN` stage.

Use one column below `640px`, two through `1023px`, and four at `1024px+`. At `1024px+`, use a
finite `135svh` region with a `100svh` sticky inner stage. Use fixed word sizes of `4.25rem`,
`8rem`, `13rem`, and `17rem` at the approved breakpoints; letter spacing remains `0`.
Reduced-motion and compact screens render a short static close.

- [ ] **Step 8: Add global focus treatment**

In `app.css`, add a visible, theme-aware `:focus-visible` outline for links, buttons, form controls,
and summaries. Do not add viewport-scaled fonts, gradients, or global card styling.

- [ ] **Step 9: Verify**

```bash
bun test src/lib/content/navigation.test.js src/lib/content/company.test.js src/lib/content/footer.test.js
bun run check
bun run build
bun scripts/verify-prerendered-site.ts
```

Expected: all checks pass for the shared shell, Company page, and non-404 product/docs route
shells.

- [ ] **Step 10: Commit**

```bash
git add scripts/verify-prerendered-site.ts src/lib/ui/PageMetadata.svelte src/lib/ui/MissionBridge.svelte src/lib/ui/MarketingHeader.svelte src/lib/ui/SiteFooter.svelte src/lib/ui/index.ts src/routes/+layout.svelte src/routes/+layout.ts src/routes/+page.svelte src/routes/docs/+page.svelte src/routes/docs/inference/+page.svelte src/routes/docs/gateway/+page.svelte src/routes/blog/+page.svelte src/routes/blog/[slug]/+page.svelte src/routes/tos/+page.svelte src/routes/company/+page.svelte src/routes/inference/+page.svelte src/routes/gateway/+page.svelte src/app.css
git diff --cached --check
git commit -m "feat: add shared company navigation and router footer"
```

---

### Task 8: Recompose The Platform Homepage

**Files:**

- Create: `src/lib/ui/PlatformHero.svelte`
- Create: `src/lib/ui/PlatformProductChooser.svelte`
- Create: `src/lib/ui/PlatformRouteFlow.svelte`
- Create: `src/lib/ui/PlatformAccessForm.svelte`
- Modify: `src/lib/ui/index.ts`
- Modify: `src/routes/+page.svelte`
- Delete: `src/routes/+page.server.ts`
- Delete: `src/lib/content/landing.ts`
- Delete: `src/lib/content/landing.test.js`
- Delete: `src/lib/ui/AnnouncementBanner.svelte`
- Delete: `src/lib/ui/ContactWaitlist.svelte`
- Delete: `src/lib/ui/DeploymentBackdrop.svelte`
- Delete: `src/lib/ui/HeroActions.svelte`
- Modify: `scripts/verify-prerendered-site.ts`

- [ ] **Step 1: Extend the verifier before implementation**

Require `index.html` to contain:

- `Inference optimization`;
- `More intelligence per dollar.`;
- `Early access`;
- exactly one `id="products"` and one `id="access"`;
- `Arcten Inference` and `Arcten Gateway`;
- the two approved route-flow lines;
- the mission heading;
- all three product-interest radio values with `Both` checked in HTML;
- visible `founders@arcten.com`;
- all five platform FAQ questions;
- Organization JSON-LD and no Product/Offer JSON-LD.

Run the build/verifier and confirm failure.

- [ ] **Step 2: Build the platform hero**

Retain `AsciiHero` and its click-only ripple. Render the approved eyebrow, fixed heading,
supporting copy, `Early access` signal, subordinate `Built for` native word roll, and rail labels:

```text
Open-model execution
Provider routing
Cost and latency controls
```

Use `ActionLinks` for `Explore products` and `Request early access`. Keep the existing text
readability masks over the ASCII field in both themes.

- [ ] **Step 3: Build the equal product chooser and route flow**

`PlatformProductChooser` has exactly two unframed equal columns separated by the existing border
token and stacked on mobile. Render exact capability labels and links from `platform.ts`.

`PlatformRouteFlow` renders the two approved data-flow lines and the heading
`Two products. One cost objective.` It must explain the distinction between changing when work
runs and changing where it runs without inventing a shared receipt.

- [ ] **Step 4: Build the native platform access form**

Render visible Work email label, required email input, fieldset/legend, three product radios, and
`Both` checked by default. On valid submit, set `window.location.href` to
`platformEarlyAccessMailto(email, interest)`. Keep a visible plain fallback link to
`founders@arcten.com`.

- [ ] **Step 5: Recompose the root in the exact approved order**

Render:

1. `PlatformHero`
2. `PlatformProductChooser`
3. `PlatformRouteFlow`
4. `MissionBridge`
5. platform access
6. backers and security
7. platform FAQ

Use root `PageMetadata` and Organization JSON-LD. The footer remains in the layout.

- [ ] **Step 6: Remove obsolete root files and exports**

Delete the four temporary wrapper components, `landing.ts`, its stale test, and the unused root
server load. Remove their exports/imports. Confirm no source still references them.

- [ ] **Step 7: Verify**

```bash
bun test
bun run check
bun run build
bun scripts/verify-prerendered-site.ts
```

Expected: root assertions pass and both products/default radio are present without JavaScript.

- [ ] **Step 8: Commit**

```bash
git add src/lib/ui/PlatformHero.svelte src/lib/ui/PlatformProductChooser.svelte src/lib/ui/PlatformRouteFlow.svelte src/lib/ui/PlatformAccessForm.svelte src/lib/ui/index.ts src/routes/+page.svelte src/routes/+page.server.ts src/lib/content/landing.ts src/lib/content/landing.test.js src/lib/ui/AnnouncementBanner.svelte src/lib/ui/ContactWaitlist.svelte src/lib/ui/DeploymentBackdrop.svelte src/lib/ui/HeroActions.svelte scripts/verify-prerendered-site.ts
git diff --cached --check
git commit -m "feat: recompose the inference optimization homepage"
```

---

### Task 9: Build The Inference Product Page

**Files:**

- Create: `src/lib/ui/InferenceHero.svelte`
- Create: `src/lib/ui/InferencePlannedRoute.svelte`
- Create: `src/lib/ui/GatewayCrossSell.svelte`
- Create: `src/lib/ui/InferenceAccessBand.svelte`
- Modify: `src/lib/ui/index.ts`
- Modify: `src/routes/inference/+page.svelte`
- Modify: `scripts/verify-prerendered-site.ts`

- [ ] **Step 1: Add failing Inference output assertions**

Require `inference.html` to contain:

- the exact hero and `Early access`;
- one `id="pricing"` and one `id="use-cases"`;
- all four completion windows and numeric preview rates from
  `completion-windows.ts`;
- `GLM-5.2 FP8`, `OpenAI-compatible by design`, and
  `Now / Priority / Standard / Flex`;
- preview/not-live qualifiers;
- the Gateway cross-sell and both links;
- all Inference FAQ entries;
- the six ordered Inference email prompt labels in the generated mailto;
- no word roll, custom/private model, customer deployment, or general-availability claim.

- [ ] **Step 2: Build the focused hero and move pricing**

Use a text-led Inference hero with the approved eyebrow, heading, description, and actions. Move
the existing pricing demo and completion-window explanation/table from root without changing the
rate source or `#pricing`/`#use-cases` fragment IDs.

- [ ] **Step 3: Add the planned route and Gateway cross-sell**

`InferencePlannedRoute` is a compact bordered specification band, not another docs page.
`GatewayCrossSell` is a full-width two-column band with a compact static policy preview on the
right and the approved `/gateway` and `/docs/gateway` actions on the left.

- [ ] **Step 4: Add FAQ and access**

Use `FaqList` and the exact Inference FAQ. `InferenceAccessBand` uses the prebuilt static mailto
from the shared helper and links to `/docs/inference`.

- [ ] **Step 5: Verify**

```bash
bun test src/lib/content/inference.test.js src/lib/pricing/completion-windows.test.js src/lib/contact/mailto.test.js
bun run check
bun run build
bun scripts/verify-prerendered-site.ts
```

Expected: all Inference assertions pass.

- [ ] **Step 6: Commit**

```bash
git add src/lib/ui/InferenceHero.svelte src/lib/ui/InferencePlannedRoute.svelte src/lib/ui/GatewayCrossSell.svelte src/lib/ui/InferenceAccessBand.svelte src/lib/ui/index.ts src/routes/inference/+page.svelte scripts/verify-prerendered-site.ts
git diff --cached --check
git commit -m "feat: add completion-window inference product page"
```

---

### Task 10: Build The Gateway Product Page And Interactive Demo

**Files:**

- Create: `src/lib/ui/GatewayHero.svelte`
- Create: `src/lib/ui/GatewayRoutingField.svelte`
- Create: `src/lib/ui/ProviderMarquee.svelte`
- Create: `src/lib/ui/GatewayPolicyDemo.svelte`
- Create: `src/lib/ui/RouteReceipt.svelte`
- Create: `src/lib/ui/GatewayRouteFlow.svelte`
- Create: `src/lib/ui/GatewayAccessForm.svelte`
- Modify: `src/lib/ui/index.ts`
- Modify: `src/routes/gateway/+page.svelte`
- Modify: `scripts/verify-prerendered-site.ts`

- [ ] **Step 1: Add failing Gateway output assertions**

Require `gateway.html` to contain:

- exact Gateway hero, `Early access`, BYOK statement, and connected-provider qualifier;
- all ten provider/model labels and nearby `Planned provider routes`;
- exactly four labeled policy fieldsets;
- the default exact/deadline/lowest/reject receipt selecting
  `Arcten Inference preview` at `$0.028`;
- `Illustrative request estimate`, never a live quote;
- request, customer policy, Gateway, selected model/provider, and route receipt flow labels;
- cost, latency, token usage, errors, selected provider/model, model-change status, and reason;
- proposed immediate, `202`, queued, running, completed, failed, rejected, `409`, and unsupported
  streaming behavior;
- `id="gateway-access"` and a visible direct email fallback;
- no automatic quality, tool-call correctness, evaluation, consolidated billing, runtime failover,
  or live-integration claim.

- [ ] **Step 2: Build the routing-field hero**

Render a deterministic, `aria-hidden`, pointer-ignoring field made only from the approved terms:
`request`, `model`, `provider`, `policy`, `deadline`, `budget`, `fallback`, `route`, `cost`,
`latency`, and `receipt`. Use a subtle CSS drift only where readable, a theme-aware mask beneath
copy, and a static field under reduced motion.

- [ ] **Step 3: Build the provider marquee**

Render the ten canonical text labels in an accessible hidden list plus two `aria-hidden` visual
tracks. The track duration is approximately 40 seconds, has no visual gap, ignores hover and
pointer input, and pauses only through one adjacent Lucide pause/play icon button.

The button's accessible name changes between `Pause provider routes` and
`Resume provider routes`; `animation-play-state` preserves track position. Associate it with a
small theme-aware tooltip that appears on hover and keyboard focus and repeats the current action.
Reduced motion renders one static wrapped row.

- [ ] **Step 4: Build the policy tool around the pure evaluator**

Use four native fieldsets or segmented radio groups. Default to exact, deadline, lowest cost,
reject. On every change call `evaluateGatewayPolicy`; do not reimplement routing in the component.
`RouteReceipt` renders the complete accepted/rejected result in a stable-height polite live region.
All segmented labels must fit at `390px`.

- [ ] **Step 5: Build supporting bands**

In the exact route order from the spec, add:

- one-endpoint explanation and `Proposed API` code panel;
- interactive policy example;
- responsive request-to-route diagram;
- observability plus queued/completed receipt excerpts;
- BYOK/direct-billing explanation plus `<TrustStrip showBackers={false} />` so the existing Vanta
  image and `SOC 2 readiness in progress` language render without a compliance claim;
- Arcten Inference cross-sell;
- Gateway FAQ;
- Gateway access form.

The access form uses native validation and `gatewayEarlyAccessMailto(email)`. Keep framed surfaces
limited to policy example, receipt, and code.

- [ ] **Step 6: Verify**

```bash
bun test src/lib/gateway/policy.test.js src/lib/content/gateway.test.js src/lib/contact/mailto.test.js
bun run check
bun run build
bun scripts/verify-prerendered-site.ts
```

Expected: Gateway output contains the default SSR receipt and all proposed lifecycle states.

- [ ] **Step 7: Commit**

```bash
git add src/lib/ui/GatewayHero.svelte src/lib/ui/GatewayRoutingField.svelte src/lib/ui/ProviderMarquee.svelte src/lib/ui/GatewayPolicyDemo.svelte src/lib/ui/RouteReceipt.svelte src/lib/ui/GatewayRouteFlow.svelte src/lib/ui/GatewayAccessForm.svelte src/lib/ui/index.ts src/routes/gateway/+page.svelte scripts/verify-prerendered-site.ts
git diff --cached --check
git commit -m "feat: add gateway routing product page"
```

---

### Task 11: Split The Documentation

**Files:**

- Create: `src/lib/ui/DocsSectionNav.svelte`
- Modify: `src/lib/ui/index.ts`
- Modify: `src/routes/docs/+page.svelte`
- Modify: `src/routes/docs/inference/+page.svelte`
- Modify: `src/routes/docs/gateway/+page.svelte`
- Delete: `src/lib/content/docs.ts`
- Modify: `scripts/verify-prerendered-site.ts`

- [ ] **Step 1: Add failing docs output assertions**

Require:

- `docs.html` contains exactly two primary paths, Inference and Gateway;
- `docs/inference.html` contains models, preview pricing, all completion windows, request fields,
  and availability qualifiers;
- `docs/gateway.html` contains BYOK setup concepts, all approved routing controls, the exact
  proposed request, synchronous headers, deferred/retrieval paths, queued/completed/failed/rejected
  receipts, price-cap semantics, deadline-missed semantics, and admission-only fallback;
- all three pages avoid private/custom models, install commands, live credentials, and a production
  host;
- the built site no longer contains `Private-model preview`.

- [ ] **Step 2: Build the compact docs hub**

Use two equal unframed paths with direct links to `/docs/inference` and `/docs/gateway`. Add only a
small section navigation, useful copy, and direct next steps; do not build a large sidebar.

- [ ] **Step 3: Move the existing Inference documentation**

Preserve the four-window table, pricing source, request shape, and early-access qualifier. Remove
the entire private-model nav item, section, and contact action. Import the replacement content from
`docs-hub.ts` and `inference-docs.ts`. After all three new docs routes compile without it, delete
the old `docs.ts` compatibility module in this same step.

- [ ] **Step 4: Render the proposed Gateway docs**

Use `gateway-docs.ts` as the only source for the long code examples. Every API block must have a
visible `Proposed API` label. Explain that Gateway extensions are not drop-in OpenAI behavior and
that streaming/webhooks/runtime failover are not promised.

- [ ] **Step 5: Verify**

```bash
bun test src/lib/content/docs.test.js src/lib/content/gateway.test.js
bun run check
bun run build
bun scripts/verify-prerendered-site.ts
```

Expected: all docs assertions pass.

- [ ] **Step 6: Commit**

```bash
git add src/lib/ui/DocsSectionNav.svelte src/lib/ui/index.ts src/lib/content/docs.ts src/routes/docs/+page.svelte src/routes/docs/inference/+page.svelte src/routes/docs/gateway/+page.svelte scripts/verify-prerendered-site.ts
git diff --cached --check
git commit -m "feat: split inference and gateway documentation"
```

---

### Task 12: Turn The Blog Into A Progressive Technical Archive

**Files:**

- Create: `src/lib/ui/BlogFilters.svelte`
- Modify: `src/lib/ui/index.ts`
- Modify: `src/routes/blog/+page.svelte`
- Modify: `src/routes/blog/[slug]/+page.svelte`
- Modify: `src/lib/content/blog-posts.test.js`
- Modify: `content/blog/hosted-open-models-or-a-private-deployment.md`
- Modify: `scripts/verify-prerendered-site.ts`

- [ ] **Step 1: Replace the stale private-model blog test**

Keep the requirement for at least three useful inference posts, but require discoverable coverage
of inference cost and completion windows rather than private deployments. Assert no discoverable
post claims that Arcten accepts custom/private models or customer deployments.

- [ ] **Step 2: Add failing archive assertions**

Require `blog.html` to contain:

- the latest discoverable article as a featured article;
- a visible Search label/input and tag controls;
- every discoverable article title in prerendered HTML;
- no fabricated publication, customer, benchmark, or testimonial.

- [ ] **Step 3: Clarify the existing deployment article without removing its route**

Preserve its existing slug, `publish: true`, and `make_discoverable: true`; the primary spec
requires retaining existing article routes. Change the title to
`Hosted Open Models or Self-Hosting?` and revise only the product-boundary framing:

- describe private deployment as customer-operated self-hosting, not an Arcten offer;
- remove the sentence promising one Arcten API across hosted and private deployments;
- end with a plain scope note that Arcten v1 covers supported open-model Inference and Gateway,
  not custom or private-model hosting.

Keep the useful utilization analysis. The route
`/blog/hosted-open-models-or-a-private-deployment` must continue to build and remain in the
sitemap.

- [ ] **Step 4: Implement the progressive archive**

`BlogFilters.svelte` receives server-loaded posts. Its initial state renders all posts, with the
first as featured and the remainder as recent. Native text input and tag buttons call the pure
filter helper after hydration. A no-results message appears only after a filter produces no match.
The unenhanced HTML keeps every post link.

- [ ] **Step 5: Update article metadata**

Replace per-page ad hoc `<svelte:head>` blocks with `PageMetadata`. Keep the article body renderer
and timeline unchanged.

- [ ] **Step 6: Verify**

```bash
bun test src/lib/blog/filter.test.js src/lib/content/blog-posts.test.js
bun run check
bun run build
bun scripts/verify-prerendered-site.ts
```

Expected: all existing published routes remain available, every discoverable post remains visible
without JavaScript, and the revised article does not imply private-model support.

- [ ] **Step 7: Commit**

```bash
git add src/lib/ui/BlogFilters.svelte src/lib/ui/index.ts src/routes/blog/+page.svelte src/routes/blog/[slug]/+page.svelte src/lib/content/blog-posts.test.js content/blog/hosted-open-models-or-a-private-deployment.md scripts/verify-prerendered-site.ts
git diff --cached --check
git commit -m "feat: add progressive technical blog archive"
```

---

### Task 13: Complete Metadata, Sitemap, And Base-Path Verification

**Files:**

- Modify: `src/routes/+layout.svelte`
- Modify: `src/routes/tos/+page.svelte`
- Modify: all new route pages only if metadata integration is missing
- Modify: `static/sitemap.xml`
- Modify: `svelte.config.js`
- Modify: `scripts/verify-prerendered-site.ts`

- [ ] **Step 1: Extend the verifier for metadata and links**

For every required route, assert:

- exact title and description;
- one canonical;
- matching Open Graph and Twitter title/description;
- canonical/OG URL matching the expected base;
- no duplicate `id` for CTA fragments;
- no more than one `aria-current="page"`;
- `Models & Pricing` never carries `aria-current`;
- internal links and static image paths contain the expected base prefix.

Read `static/sitemap.xml` and require:

```text
https://arcten.com/
https://arcten.com/inference
https://arcten.com/gateway
https://arcten.com/docs
https://arcten.com/docs/inference
https://arcten.com/docs/gateway
https://arcten.com/blog
https://arcten.com/company
https://arcten.com/tos
```

Also require every published blog article slug, including
`/blog/hosted-open-models-or-a-private-deployment`. In the standalone verifier, read
`content/blog/*.md` and derive `slug`/`publish` from frontmatter directly; do not import
`blog.server.ts`, because its Vite-only `import.meta.glob` cannot execute in a plain Bun script.
Exclude fragments, proposed API paths, and account routes.

- [ ] **Step 2: Add a test-only base-path switch**

In `svelte.config.js`, keep production behavior unchanged while allowing:

```js
const verificationBase = process.env.SVELTEKIT_TEST_BASE_PATH ?? '';
```

Set `kit.paths.base` to `verificationBase`. No environment variable is required in normal
development or deployment.

- [ ] **Step 3: Apply `PageMetadata` to every route**

Use exact route metadata from `metadata.ts`. Root alone gets Organization JSON-LD; Inference and
Gateway may get `WebPage`; no page gets `Product`, offers, pricing, ratings, or availability
schema. The Terms and blog pages keep accurate route-specific titles.

- [ ] **Step 4: Update the production sitemap**

Add the required route URLs and every actual published article route. Keep production root URLs
even when running the temporary `/preview` verification build.

- [ ] **Step 5: Verify the normal build**

```bash
bun run build
bun scripts/verify-prerendered-site.ts
```

Expected: all route, fragment, metadata, JSON-LD, and sitemap checks pass.

- [ ] **Step 6: Verify a non-root build**

```bash
SVELTEKIT_TEST_BASE_PATH=/preview bun run build
EXPECTED_BASE_PATH=/preview bun scripts/verify-prerendered-site.ts
```

Expected: all application links, canonical/OG URLs, and static assets include `/preview`; the
production sitemap remains rooted at `https://arcten.com`.

- [ ] **Step 7: Restore a normal build**

```bash
bun run build
```

Expected: the final local build returns to root-path output.

- [ ] **Step 8: Commit**

```bash
git add src/routes/+layout.svelte src/routes/tos/+page.svelte src/routes/+page.svelte src/routes/inference/+page.svelte src/routes/gateway/+page.svelte src/routes/company/+page.svelte src/routes/docs/+page.svelte src/routes/docs/inference/+page.svelte src/routes/docs/gateway/+page.svelte src/routes/blog/+page.svelte src/routes/blog/[slug]/+page.svelte static/sitemap.xml svelte.config.js scripts/verify-prerendered-site.ts
git diff --cached --check
git commit -m "feat: complete site metadata and sitemap"
```

---

### Task 14: Full Interaction, Accessibility, And Visual Verification

**Files:**

- Modify only files implicated by a reproduced verification failure.

- [ ] **Step 1: Run the complete automated gate**

Use `@verification-before-completion`.

```bash
bun test
bun run check
bun run lint
bun run build
bun scripts/verify-prerendered-site.ts
rg -n "react|react-dom|performative-ui|deploy your own|private-model preview" src package.json
```

Expected: tests/check/lint/build/verifier pass and the final search has no matches.

- [ ] **Step 2: Prove the final commit from a clean worktree**

Use `@using-git-worktrees` to create `/tmp/arcten-aura-final` at `HEAD`. In that clean worktree run:

```bash
bun install --frozen-lockfile
bun test
bun run check
bun run lint
bun run build
bun scripts/verify-prerendered-site.ts
```

Expected: the committed implementation passes without any untracked file from the original
workspace. Remove the temporary verification worktree afterward.

- [ ] **Step 3: Start a persistent local server**

```bash
bun run dev -- --host 0.0.0.0
```

Keep the yielded session running. Record the actual URL Vite prints; if `5173` is occupied, use the
next port Vite selects. Do not report a stale port.

- [ ] **Step 4: Inspect every required route**

Use `@agent-browser`. Inspect `/`, `/inference`, `/gateway`, `/docs`, `/docs/inference`,
`/docs/gateway`, `/blog`, and `/company` at:

```text
390x844
768x900
1440x900
```

Capture full-page screenshots for each route at `390x844` and `1440x900`. Inspect root, Inference,
Gateway, and Company in both light and dark themes. Inspect the shared header separately at
`767x900`, `768x900`, and both sides of the actual compact/desktop breakpoint selected for the
six-link navigation.

- [ ] **Step 5: Exercise interactions**

Verify:

- ASCII changes only on pointer click, supports multiple simultaneous ripples, and never shows a
  hand cursor;
- pricing pointer movement retains the last hovered tier, and click/keyboard select all four;
- policy controls support pointer and keyboard and all tested states update the receipt;
- rejected receipts are announced as normal outcomes;
- provider marquee pause/resume keeps its position and updates the accessible name;
- mobile menu exposes all destinations, closes through all required mechanisms, and restores focus;
- forms reject invalid email natively and generate decoded subjects/body fields correctly;
- tag/search controls combine and clearing them restores all posts;
- keyboard order and focus remain sensible through the Company narrative and every footer link;
- footer reaches a normal finite end.

- [ ] **Step 6: Verify reduced motion and no-JavaScript fallbacks**

With reduced motion:

- provider labels become a static wrapped row;
- routing field stops;
- footer becomes a short static close;
- word roll stops;
- transitions do not flash.

Inspect generated HTML directly to confirm default policy receipt, all blog posts, both direct-email
fallbacks, and the root `Both` radio remain useful without JavaScript.

- [ ] **Step 7: Check layout quality**

At every viewport confirm:

- no page-level horizontal scrolling;
- no clipped or overlapping navigation, code, controls, headings, or footer wordmark;
- hero masks keep text readable in both themes;
- provider marquee has no gap or jump;
- diagrams switch orientation before labels collide;
- controls do not resize surrounding layouts;
- no nested cards or marketing-style card grids were introduced.

- [ ] **Step 8: Request final code review**

Use `@requesting-code-review` against the complete diff. Fix only verified findings, rerun the
automated gate, and repeat visual checks for affected routes.

- [ ] **Step 9: Commit verification fixes**

List the files changed solely to resolve reproduced findings. Stage each one explicitly with
`git add -- path/to/file`; do not use `git add .` in the dirty worktree. Then run:

```bash
git diff --cached --check
git commit -m "fix: resolve platform site verification findings"
```

Skip this commit if no files changed.

- [ ] **Step 10: Leave the site available**

If Step 9 created a fix commit, recreate `/tmp/arcten-aura-final` at the new `HEAD` and repeat the
clean-worktree command set from Step 2 before handoff.

Confirm the dev-server session is still running and provide its actual reachable URL in the final
handoff together with:

- the final command results;
- the normal/base-path build results;
- screenshot locations;
- any residual risk or unverified external behavior.
