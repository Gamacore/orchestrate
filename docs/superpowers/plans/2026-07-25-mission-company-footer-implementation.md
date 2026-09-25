# Arcten Mission, Company Page, and Router Footer Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development
> (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use
> checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add Arcten's grounded mission to the homepage, publish a minimal Company page, and replace
the site-wide footer with the approved task router and finite outlined `ARCTEN` finale.

**Architecture:** Keep all claims in typed content modules and render the experience with
prerender-safe Svelte components. Route and fragment navigation remain distinct so SvelteKit can
apply the configured base path correctly. The footer reveal is CSS-only progressive enhancement;
its complete static rendering is the fallback.

**Tech Stack:** SvelteKit 2, Svelte 5 runes, TypeScript, Tailwind CSS 4, component-scoped CSS, Bun
tests, Cloudflare Pages adapter.

**Design spec:** `docs/superpowers/specs/2026-07-25-mission-company-page-design.md`

---

## File Map

**Create**

- `src/lib/content/company.ts` — approved homepage mission and Company-page narrative.
- `src/lib/content/company.test.js` — exact-copy and claim-boundary tests.
- `src/lib/content/footer.ts` — typed task-router, utility, social, and legal link data.
- `src/lib/content/footer.test.js` — footer copy, destination, and early-access status tests.
- `src/routes/company/+page.svelte` — prerendered Company page.

**Modify**

- `src/lib/content/landing.ts` — typed marketing navigation with the Company destination.
- `src/lib/content/landing.test.js` — navigation contract and mobile-link expectations.
- `src/lib/config/site.ts` — canonical URL helper.
- `src/lib/ui/MarketingHeader.svelte` — route/fragment resolution and active-route semantics.
- `src/lib/ui/TrustStrip.svelte` — server-rendered backer/security variants with base-safe images.
- `src/lib/ui/SiteFooter.svelte` — full router footer and finite brand finale.
- `src/routes/+page.svelte` — homepage mission bridge.
- `src/routes/+layout.svelte` — route-aware canonical/OG URL and unconstrained shared footer.
- `static/sitemap.xml` — Company route.

Do not touch or revert unrelated dirty files. Before each commit, inspect `git status --short` and
stage only the paths named by that task. Several target files already contain uncommitted site work;
review their complete staged diffs before committing.

---

### Task 1: Lock the mission, footer, and navigation contracts

**Files:**

- Create: `src/lib/content/company.ts`
- Create: `src/lib/content/company.test.js`
- Create: `src/lib/content/footer.ts`
- Create: `src/lib/content/footer.test.js`
- Modify: `src/lib/content/landing.ts`
- Modify: `src/lib/content/landing.test.js`

- [ ] **Step 1: Write failing mission-content tests**

Create `src/lib/content/company.test.js`:

```js
import { describe, expect, test } from 'bun:test';
import { companyCopy, homepageMission } from './company';

describe('mission copy', () => {
	test('keeps the homepage product-first and links cost to access', () => {
		expect(homepageMission.eyebrow).toBe('Our mission');
		expect(homepageMission.heading).toBe(
			'More intelligence per dollar. More people able to build.'
		);
		expect(homepageMission.href).toBe('/company');
		expect(homepageMission.body).toContain('lower-cost open-model inference');
	});

	test('presents inference as the first grounded step', () => {
		const copy = [
			companyCopy.hero.heading,
			companyCopy.hero.introduction,
			...companyCopy.sections.flatMap((section) => [section.heading, section.body])
		].join(' ');

		expect(copy).toContain('Arcten is starting with completion-window inference');
		expect(copy).toContain('Lowering the cost of inference is our first step');
		expect(copy.toLowerCase()).not.toContain('building agi');
		expect(copy.toLowerCase()).not.toContain('custom kernels');
		expect(copy.toLowerCase()).not.toContain('generally available');
		expect(copy.toLowerCase()).not.toContain('open models always');
	});
});
```

- [ ] **Step 2: Write failing footer-content tests**

Create `src/lib/content/footer.test.js`:

```js
import { describe, expect, test } from 'bun:test';
import { footerPaths, footerResources, footerSocial } from './footer';

describe('site-wide footer content', () => {
	test('contains the four approved task paths in order', () => {
		expect(footerPaths.map((path) => path.heading)).toEqual([
			'Open-model inference',
			'Deploy your model',
			'Build with Arcten',
			'Why Arcten'
		]);
	});

	test('uses real destinations and preview language', () => {
		const links = footerPaths.flatMap((path) => path.links);
		expect(links).toContainEqual({
			label: 'Preview pricing',
			href: '#pricing',
			kind: 'fragment'
		});
		expect(links).toContainEqual({
			label: 'Our company',
			href: '/company',
			kind: 'route'
		});

		const copy = footerPaths
			.map((path) => path.description)
			.join(' ')
			.toLowerCase();
		expect(copy).toContain('planned for early access');
		expect(copy).toContain('planned openai-compatible');
		expect(copy).not.toContain('integrate arcten');
	});

	test('exposes only verified social and existing resource destinations', () => {
		expect(footerSocial).toEqual([
			{ label: 'X', href: 'https://x.com/arcteninc', kind: 'external' },
			{
				label: 'LinkedIn',
				href: 'https://www.linkedin.com/company/arcten/',
				kind: 'external'
			}
		]);
		expect(footerResources.map((link) => link.href)).toEqual([
			'#pricing',
			'#use-cases',
			'/blog',
			'/tos'
		]);
	});
});
```

- [ ] **Step 3: Update the navigation test before its implementation**

Change the expected `marketingNav` value in `src/lib/content/landing.test.js`:

```js
expect(marketingNav).toEqual([
	{ label: 'Use cases', href: '#use-cases', kind: 'fragment' },
	{ label: 'Pricing', href: '#pricing', kind: 'fragment' },
	{ label: 'Docs', href: '/docs', kind: 'route' },
	{ label: 'Blog', href: '/blog', kind: 'route' },
	{ label: 'Company', href: '/company', kind: 'route' }
]);
```

Add a second assertion for the compact header:

```js
expect(mobileMarketingNav.map((item) => item.label)).toEqual(['Company', 'Docs']);
```

- [ ] **Step 4: Run the focused tests and verify they fail**

Run:

```bash
bun test src/lib/content/company.test.js src/lib/content/footer.test.js src/lib/content/landing.test.js
```

Expected: `company.ts`, `footer.ts`, the `kind` fields, and `mobileMarketingNav` are missing.

- [ ] **Step 5: Implement `company.ts` with the exact approved prose**

Export:

```ts
export const homepageMission = {
	eyebrow: 'Our mission',
	heading: 'More intelligence per dollar. More people able to build.',
	body: 'As AI systems become more capable, the ability to build with them should become more widely available rather than increasingly limited by cost. Arcten is building lower-cost open-model inference so teams can make more attempts, run longer workloads, serve more people, and pursue ideas that would otherwise be too expensive.',
	linkLabel: 'Read our mission',
	href: '/company'
} as const;

export const companyCopy = {
	hero: {
		eyebrow: 'Company',
		heading: 'More intelligence should create more possibility for everyone.',
		introduction:
			'We believe the long-term value of AI will be measured not only by how capable models become, but by how many people can put that capability to work. Advanced intelligence should help more people learn, create, research, and build. Reaching that future requires making the underlying economics work.'
	},
	sections: [
		{
			heading: 'Cost shapes what gets built',
			body: 'Every inference bill places a limit on what a product can attempt. Lower costs mean more experiments, longer-running agents, deeper research, and useful intelligence delivered to more people. They also make room for ideas that would never be economical under traditional inference pricing.'
		},
		{
			heading: 'Open models keep progress open',
			body: 'Open models can give developers more freedom to inspect, adapt, and deploy advanced intelligence when their licenses permit. But open weights are not enough if using them at meaningful scale remains prohibitively expensive. Arcten is building the infrastructure needed to make leading open models practical for more builders.'
		},
		{
			heading: 'Inference is where we start',
			body: 'Arcten is starting with completion-window inference. A request that needs a fast response can choose Now, while flexible workloads can give the system more time to use available capacity efficiently. The intended product keeps the selected model stable while giving builders control over the speed-versus-cost tradeoff.'
		},
		{
			heading: 'Toward abundant intelligence',
			body: 'As AI systems become more general and useful, access to them should expand alongside their capabilities. We want a future where intelligence is a widely available input to human ambition: helping researchers explore further, small teams build more ambitious products, and individuals turn more of their ideas into reality. Lowering the cost of inference is our first step toward that future.'
		}
	]
} as const;
```

- [ ] **Step 6: Implement typed footer and navigation data**

In `src/lib/content/footer.ts`, define a true discriminated union. Keep route paths as a literal
union so SvelteKit's typed `resolve()` accepts them:

```ts
type FooterRoute = '/docs' | '/company' | '/blog' | '/tos';
type FooterFragment = '#pricing' | '#use-cases';

type LinkBase = {
	label: string;
};

export type FooterLink =
	| (LinkBase & {
			href: FooterRoute;
			hash?: '#private-models';
			kind: 'route';
	  })
	| (LinkBase & { href: FooterFragment; kind: 'fragment' })
	| (LinkBase & { href: `mailto:${string}`; kind: 'email' })
	| (LinkBase & { href: `https://${string}`; kind: 'external' });
```

Populate `footerPaths` with the exact four headings, descriptions, and destinations from the design
spec. Reuse these existing email values:

```ts
'mailto:founders@arcten.com?subject=Arcten%20inquiry';
'mailto:founders@arcten.com?subject=Arcten%20API%20access';
```

Represent `Private-model preview` as:

```ts
{
	label: 'Private-model preview',
	href: '/docs',
	hash: '#private-models',
	kind: 'route'
}
```

Export:

```ts
export const footerDocs = {
	description: "Review Arcten's planned API, completion windows, and request behavior.",
	link: { label: 'Read the docs', href: '/docs', kind: 'route' }
} as const;

export const footerSocial = [
	{ label: 'X', href: 'https://x.com/arcteninc', kind: 'external' },
	{
		label: 'LinkedIn',
		href: 'https://www.linkedin.com/company/arcten/',
		kind: 'external'
	}
] as const satisfies readonly FooterLink[];

export const footerResources = [
	{ label: 'Pricing', href: '#pricing', kind: 'fragment' },
	{ label: 'Service tiers', href: '#use-cases', kind: 'fragment' },
	{ label: 'Blog', href: '/blog', kind: 'route' },
	{ label: 'Terms', href: '/tos', kind: 'route' }
] as const satisfies readonly FooterLink[];
```

In `src/lib/content/landing.ts`, add the same `kind` discriminator to `marketingNav`, append
`Company`, and export:

```ts
export const mobileMarketingNav = [
	{ label: 'Company', href: '/company', kind: 'route' },
	{ label: 'Docs', href: '/docs', kind: 'route' }
] as const;
```

- [ ] **Step 7: Run focused tests**

Run:

```bash
bun test src/lib/content/company.test.js src/lib/content/footer.test.js src/lib/content/landing.test.js
```

Expected: all focused tests pass.

- [ ] **Step 8: Commit only the content contract**

```bash
git add src/lib/content/company.ts src/lib/content/company.test.js src/lib/content/footer.ts src/lib/content/footer.test.js src/lib/content/landing.ts src/lib/content/landing.test.js
git diff --cached --check
git commit -m "feat: define mission and footer content"
```

---

### Task 2: Render trust signals without client-side React

**Files:**

- Modify: `src/lib/ui/TrustStrip.svelte`

- [ ] **Step 1: Record the current prerendering failure**

Run a production build, then search the generated HTML:

```bash
bun run build
rg -n "Y Combinator|SOC 2 readiness" .svelte-kit/cloudflare
```

Expected before the refactor: the trust names are absent from the prerendered homepage HTML because
`TrustStrip` populates empty hosts in `onMount`.

- [ ] **Step 2: Replace React mounting with semantic Svelte markup**

Remove `onMount`, `react-dom/client`, dynamic imports, bound hosts, and the Performative UI
dependency from this component. Keep `performative-ui` installed because other components use it.

Use a prop contract:

```ts
let {
	showBackers = true,
	showSecurity = true
}: {
	showBackers?: boolean;
	showSecurity?: boolean;
} = $props();
```

Import `base` from `$app/paths` and prefix all three local images:

```svelte
<img src={`${base}/logos/y-combinator.svg`} alt="" />
<img src={`${base}/logos/unanimous-capital.svg`} alt="Unanimous Capital" />
<img src={`${base}/logos/team-ignite-ventures.webp`} alt="" />
<img src={`${base}/logos/vanta-soc-2.png`} alt="SOC 2 readiness in progress" />
```

Render the existing four backer cells when `showBackers` is true and the existing Vanta/security
lockup when `showSecurity` is true. Preserve the exact visible names and `securityCopy`; use plain
Svelte sections with `aria-labelledby` instead of recreating React class names.

- [ ] **Step 3: Preserve the approved visual treatment**

Keep:

- a centered `Backed by` heading;
- one continuous four-cell grid on desktop, two cells below `760px`, one below `440px`;
- white backer cells in both themes so logos remain readable;
- the real Vanta SOC 2 image and readiness copy;
- `8px` maximum corner radius.

Delete obsolete `:global(.pui-...)` selectors and scope styles to the new Svelte classes.

- [ ] **Step 4: Verify SSR output and component checks**

Run:

```bash
bun run check
bun run build
rg -n "Y Combinator|Unanimous Capital|Team Ignite Ventures|SOC 2 readiness" .svelte-kit/cloudflare
```

Expected: all four strings are present in generated HTML and Svelte reports zero errors.

- [ ] **Step 5: Commit the SSR trust strip**

```bash
git add src/lib/ui/TrustStrip.svelte
git diff --cached --check
git commit -m "refactor: prerender trust signals"
```

---

### Task 3: Add the homepage mission bridge and Company page

**Files:**

- Modify: `src/routes/+page.svelte`
- Create: `src/routes/company/+page.svelte`

- [ ] **Step 1: Add the homepage mission bridge**

Import `homepageMission` in `src/routes/+page.svelte`. Insert a new section after
`#use-cases` and before `#access`:

```svelte
<section class="border-b border-foreground/10 py-20 sm:py-24" aria-labelledby="mission-heading">
	<div class="mx-auto w-full max-w-[1120px] px-6 lg:px-0">
		<div class="mx-auto max-w-[760px] text-center">
			<p class="text-sm font-semibold text-[color:var(--brand)]">{homepageMission.eyebrow}</p>
			<h2
				id="mission-heading"
				class="mt-4 text-3xl leading-tight font-medium tracking-normal text-foreground sm:text-5xl"
			>
				{homepageMission.heading}
			</h2>
			<p class="mt-6 text-base leading-7 text-muted sm:text-lg sm:leading-8">
				{homepageMission.body}
			</p>
			<a
				href={resolve(homepageMission.href)}
				class="text-link mt-7 font-medium focus-visible:outline-2 focus-visible:outline-offset-4"
			>
				<span class="text-link__label">{homepageMission.linkLabel}</span>
				<span aria-hidden="true">&nbsp;→</span>
			</a>
		</div>
	</div>
</section>
```

Add `import { resolve } from '$app/paths';`.

- [ ] **Step 2: Create the minimal manifesto page**

Create `src/routes/company/+page.svelte` with:

- `MarketingHeader` at the top;
- `<svelte:head>` title `Company | Arcten` and the spec's page-specific description;
- one `960px` hero band and four `960px` narrative bands;
- left-aligned copy limited to `760px`;
- `TrustStrip showBackers={true} showSecurity={false}` after the narrative;
- no cards, decorative background, or new interactive component.

Use semantic markup:

```svelte
<main>
	<section aria-labelledby="company-heading" class="border-b border-foreground/10 py-20 sm:py-28">
		<div class="mx-auto w-full max-w-[960px] px-6">
			<div class="max-w-[760px]">
				<p class="text-sm font-semibold text-[color:var(--brand)]">{companyCopy.hero.eyebrow}</p>
				<h1
					id="company-heading"
					class="mt-5 text-4xl leading-tight font-medium tracking-normal sm:text-6xl"
				>
					{companyCopy.hero.heading}
				</h1>
				<p class="mt-7 text-lg leading-8 text-muted sm:text-xl sm:leading-9">
					{companyCopy.hero.introduction}
				</p>
			</div>
		</div>
	</section>

	{#each companyCopy.sections as section, index (section.heading)}
		<section
			class="border-b border-foreground/10 py-16 sm:py-20"
			aria-labelledby={`company-section-${index}`}
		>
			<div class="mx-auto w-full max-w-[960px] px-6">
				<div class="max-w-[760px]">
					<h2
						id={`company-section-${index}`}
						class="text-2xl font-medium tracking-normal sm:text-3xl"
					>
						{section.heading}
					</h2>
					<p class="mt-5 text-base leading-7 text-muted sm:text-lg sm:leading-8">{section.body}</p>
				</div>
			</div>
		</section>
	{/each}
</main>
```

- [ ] **Step 3: Run focused content and Svelte checks**

Run:

```bash
bun test src/lib/content/company.test.js
bun run check
```

Expected: tests pass and Svelte reports zero errors.

- [ ] **Step 4: Build and verify prerendered Company content**

Run:

```bash
bun run build
rg -n "More intelligence should create more possibility|Y Combinator" .svelte-kit/cloudflare
```

Expected: Company copy and backer names appear in generated HTML.

- [ ] **Step 5: Commit the mission surfaces**

```bash
git add src/routes/+page.svelte src/routes/company/+page.svelte
git diff --cached --check
git commit -m "feat: add Arcten mission and company page"
```

---

### Task 4: Make navigation and metadata route-aware

**Files:**

- Modify: `src/lib/config/site.ts`
- Modify: `src/lib/ui/MarketingHeader.svelte`
- Modify: `src/routes/+layout.svelte`
- Modify: `static/sitemap.xml`
- Test: `src/lib/content/landing.test.js`
- Create: `src/lib/config/site.test.js`

- [ ] **Step 1: Write the failing canonical helper test**

Create `src/lib/config/site.test.js`:

```js
import { describe, expect, test } from 'bun:test';
import { canonicalUrl } from './site';

describe('canonicalUrl', () => {
	test('keeps the current route and a configured base path', () => {
		expect(canonicalUrl('/')).toBe('https://arcten.com/');
		expect(canonicalUrl('/company')).toBe('https://arcten.com/company');
		expect(canonicalUrl('/preview/company')).toBe('https://arcten.com/preview/company');
	});
});
```

- [ ] **Step 2: Run the test and verify failure**

Run:

```bash
bun test src/lib/config/site.test.js
```

Expected: `canonicalUrl` is not exported.

- [ ] **Step 3: Implement route-aware canonical URLs**

Add to `src/lib/config/site.ts`:

```ts
export function canonicalUrl(pathname: string) {
	return new URL(pathname, `${siteConfig.url}/`).toString();
}
```

In `src/routes/+layout.svelte`:

- import `canonicalUrl`;
- derive `const canonical = $derived(canonicalUrl(page.url.pathname));`;
- replace hard-coded canonical and `og:url` values with `canonical`;
- remove `footerWidth`;
- render `<SiteFooter />` without a width prop.

- [ ] **Step 4: Refactor header destination resolution**

Import `page` from `$app/state` and `mobileMarketingNav` from `landing.ts`.

Use one helper for desktop and mobile data:

```ts
type NavItem = (typeof marketingNav)[number] | (typeof mobileMarketingNav)[number];

function navHref(item: NavItem) {
	return item.kind === 'route' ? resolve(item.href) : `${resolve('/')}${item.href}`;
}

function isCurrent(item: NavItem) {
	if (item.kind !== 'route') return false;
	const routeId = page.route.id;
	return routeId === item.href || routeId?.startsWith(`${item.href}/`) === true;
}
```

Render `aria-current={isCurrent(item) ? 'page' : undefined}` on route links. Replace hard-coded
mobile Blog/Docs links with `mobileMarketingNav`, preserving the request-access button. The mobile
order must be Company, then Docs. Route IDs do not contain a configured deployment base, so this
active-state comparison remains stable even when `resolve()` emits a relative URL during
prerendering.

- [ ] **Step 5: Add Company to the sitemap**

Append:

```xml
<url>
  <loc>https://arcten.com/company</loc>
  <changefreq>monthly</changefreq>
  <priority>0.7</priority>
</url>
```

Keep the sitemap on the root production domain.

- [ ] **Step 6: Run tests, checks, and build**

Run:

```bash
bun test src/lib/config/site.test.js src/lib/content/landing.test.js
bun run check
bun run build
```

Expected: tests pass, checks report zero errors, and `/company` prerenders.

- [ ] **Step 7: Commit route awareness**

```bash
git add src/lib/config/site.ts src/lib/config/site.test.js src/lib/ui/MarketingHeader.svelte src/routes/+layout.svelte static/sitemap.xml
git diff --cached --check
git commit -m "feat: add company navigation and route metadata"
```

---

### Task 5: Replace the footer with the approved router and ARCTEN finale

**Files:**

- Modify: `src/lib/ui/SiteFooter.svelte`
- Test: `src/lib/content/footer.test.js`

- [ ] **Step 1: Add footer completeness assertions**

Extend `src/lib/content/footer.test.js`:

```js
test('does not advertise destinations that do not exist', () => {
	const labels = [
		...footerPaths.flatMap((path) => path.links.map((link) => link.label)),
		...footerResources.map((link) => link.label)
	];

	expect(labels).not.toContain('Privacy');
	expect(labels).not.toContain('Careers');
	expect(labels).not.toContain('API reference');
	expect(labels).not.toContain('Status');
});
```

- [ ] **Step 2: Run the footer test**

Run:

```bash
bun test src/lib/content/footer.test.js
```

Expected: pass after Task 1, establishing the data contract before markup changes.

- [ ] **Step 3: Implement base-safe link resolution**

In `SiteFooter.svelte`, import the four footer exports and remove the `width` prop. Add:

```ts
function footerHref(link: FooterLink) {
	if (link.kind === 'route') return `${resolve(link.href)}${link.hash ?? ''}`;
	if (link.kind === 'fragment') return `${resolve('/')}${link.href}`;
	return link.href;
}
```

For `external` links, add `target="_blank"` and `rel="noreferrer"`. Email links remain in the same
tab. Every link keeps visible `:focus-visible` treatment.

- [ ] **Step 4: Build the four-layer semantic footer**

Render in this DOM order:

1. `/Start here` header and `4 paths`.
2. An ordered list of four route cells.
3. Docs, Social, and Resources utility sections.
4. Logo/copyright/legal/theme row.
5. Decorative brand stage.

Use:

```svelte
<div class="footer-shell">
	<div class="router-heading">
		<span>/Start here</span>
		<span>4 paths</span>
	</div>
	<ol class="router-grid">
		{#each footerPaths as path, index (path.heading)}
			<li class="router-cell">
				<span class="router-index">{String(index + 1).padStart(2, '0')}</span>
				<h2>{path.heading}</h2>
				<p>{path.description}</p>
				<nav aria-label={path.heading}>
					{#each path.links as link (link.label)}
						<a href={footerHref(link)}>{link.label}<span aria-hidden="true"> →</span></a>
					{/each}
				</nav>
			</li>
		{/each}
	</ol>
</div>
```

Use analogous semantic sections for Docs, Social, and Resources. Preserve the existing `ArctenLogo`,
dynamic year, `ThemeToggle`, `XLogo`, and `LinkedInLogo`.

- [ ] **Step 5: Style the continuous router and utility grid**

Component-scoped CSS requirements:

- `.footer-shell`, utility, and legal content: `max-width: 1120px`, centered, standard `24px`
  horizontal padding;
- router: one column below `640px`, two columns from `640px`, four from `1024px`;
- utility row: one column below `1024px`, three columns at `1024px`;
- router cells share one border grid and are not floating cards;
- no shadows, gradients, nested cards, or radius above `8px`;
- labels use the existing monospace stack with `letter-spacing: 0`;
- all copy wraps without fixed text heights.

- [ ] **Step 6: Implement the finite CSS-only brand stage**

Markup:

```svelte
<div class="brand-stage" aria-hidden="true">
	<div class="brand-stage__sticky">
		<span class="brand-stage__word">ARCTEN</span>
	</div>
</div>
```

Core CSS:

```css
.brand-stage {
	height: 18rem;
	overflow: clip;
	border-top: 1px solid color-mix(in srgb, var(--foreground) 10%, transparent);
	pointer-events: none;
}

.brand-stage__sticky {
	display: flex;
	height: 100%;
	align-items: flex-end;
	justify-content: center;
	overflow: clip;
	padding: 2rem 1.5rem 0;
}

.brand-stage__word {
	display: block;
	max-width: 100%;
	color: color-mix(in srgb, var(--foreground) 2%, transparent);
	font-size: 4.25rem;
	font-weight: 760;
	line-height: 1;
	letter-spacing: 0;
	white-space: nowrap;
	-webkit-text-stroke: 1.5px var(--foreground);
}

@media (min-width: 640px) {
	.brand-stage {
		height: 24rem;
	}
	.brand-stage__word {
		font-size: 8rem;
	}
}

@media (min-width: 1024px) {
	.brand-stage {
		height: 135svh;
		view-timeline-axis: block;
		view-timeline-name: --footer-brand;
	}

	.brand-stage__sticky {
		position: sticky;
		top: 0;
		height: 100svh;
	}

	.brand-stage__word {
		font-size: 13rem;
	}
}

@media (min-width: 1440px) {
	.brand-stage__word {
		font-size: 17rem;
	}
}

@supports (animation-timeline: view()) {
	@media (min-width: 1024px) {
		.brand-stage__word {
			animation: footer-brand-settle linear both;
			animation-range: entry 5% cover 70%;
			animation-timeline: --footer-brand;
		}
	}
}

@keyframes footer-brand-settle {
	from {
		opacity: 0.35;
		transform: translateY(18%);
	}
	to {
		opacity: 1;
		transform: translateY(0);
	}
}

@media (prefers-reduced-motion: reduce) {
	.brand-stage {
		height: 24rem;
	}
	.brand-stage__sticky {
		position: relative;
		height: 100%;
	}
	.brand-stage__word {
		animation: none;
		opacity: 1;
		transform: none;
	}
}
```

If the `17rem` word clips at `1440px`, reduce only that fixed breakpoint value. Do not replace it
with `vw`, `clamp()` containing viewport units, a canvas, or JavaScript.

- [ ] **Step 7: Run footer tests, checks, lint, and build**

Run:

```bash
bun test src/lib/content/footer.test.js
bun run check
bun run lint
bun run build
```

Expected: all commands pass.

- [ ] **Step 8: Commit the footer**

```bash
git add src/lib/content/footer.test.js src/lib/ui/SiteFooter.svelte
git diff --cached --check
git commit -m "feat: add site-wide router footer"
```

---

### Task 6: Verify base paths, themes, responsiveness, and keyboard behavior

**Files:**

- Temporarily modify, then restore: `svelte.config.js`
- Modify only if verification finds a defect: files from Tasks 2–5

- [ ] **Step 1: Run the complete automated suite**

Run each command independently:

```bash
bun test
bun run check
bun run lint
bun run build
```

Expected: all commands exit `0`.

- [ ] **Step 2: Verify a non-root base-path production build**

Temporarily add this inside `kit` in `svelte.config.js`:

```js
paths: {
	base: '/preview'
},
```

Run:

```bash
bun run build
rg -n "/preview/logos/" .svelte-kit/cloudflare
rg -n "https://arcten.com/preview/company" .svelte-kit/cloudflare
bun run preview -- --host 127.0.0.1 --port 4175
```

With that preview process running, open `http://127.0.0.1:4175/preview/company` in the browser used
for visual verification. Inspect the resolved `.href` property, not only each anchor's serialized
attribute, for:

- `Our company` → `http://127.0.0.1:4175/preview/company`;
- `Read the docs` → `http://127.0.0.1:4175/preview/docs`;
- `Preview pricing` → `http://127.0.0.1:4175/preview/#pricing`;
- `How tiers work` → `http://127.0.0.1:4175/preview/#use-cases`.

Follow each link and confirm the route or fragment loads. SvelteKit may serialize route links as
relative URLs during prerendering, so do not require a literal `/preview` prefix in every generated
`href`. Trust images and the canonical URL must contain the literal base because they are emitted
from `base` and `page.url.pathname`, respectively.

Remove only the temporary `paths.base` block with `apply_patch`, run `bun run build` again, and
confirm:

```bash
git diff -- svelte.config.js
rg -n "https://arcten.com/company" static/sitemap.xml
```

Expected: no temporary base-path diff remains, and the production sitemap uses the root domain.

- [ ] **Step 3: Start a local production preview**

Run:

```bash
bun run preview -- --host 0.0.0.0
```

Keep the process running and use the printed port for browser checks.

- [ ] **Step 4: Capture responsive screenshots**

Using Playwright or the `agent-browser` skill, capture `/` and `/company` at:

- `390x844` in light and dark themes;
- `768x900` for the medium footer grid;
- `1440x900` in light and dark themes;
- header-only checks at `767x900` and `768x900`.

Inspect the actual image pixels, not only DOM measurements. Confirm:

- mission and Company prose do not overlap or clip;
- backer logos remain readable in both themes;
- the router is one, two, and four columns at the specified widths;
- `ARCTEN` is complete, outlined, and not clipped;
- the large stage ends normally after a finite scroll;
- the header shows Company after Blog on desktop and Company then Docs on mobile.

- [ ] **Step 5: Verify reduced motion**

Emulate `prefers-reduced-motion: reduce` at `1440x900`. Confirm the brand stage is a short static
panel, has no sticky hold, and shows the complete word.

- [ ] **Step 6: Verify keyboard and route semantics**

Keyboard through:

1. header;
2. homepage mission link;
3. Company page;
4. all footer router, utility, social, legal, and theme controls.

Confirm visible focus, DOM-order traversal, no focus on decorative `ARCTEN`, and
`aria-current="page"` for Company and Blog routes.

- [ ] **Step 7: Check the browser console and document end**

Confirm:

- no console errors or hydration warnings;
- no duplicate canonical tags;
- no horizontal overflow at any viewport;
- scrolling reaches one stable document end without reset or loop.

- [ ] **Step 8: Fix verification defects and rerun the affected checks**

Keep fixes scoped. For every code change, rerun at least:

```bash
bun test
bun run check
bun run lint
bun run build
```

- [ ] **Step 9: Commit verification fixes only if needed**

```bash
git add <only-the-files-fixed-during-verification>
git diff --cached --check
git commit -m "fix: polish mission and footer responsiveness"
```

Do not create an empty commit when no fixes were required.
