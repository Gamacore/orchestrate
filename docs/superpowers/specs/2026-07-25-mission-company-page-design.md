# Arcten Mission and Company Page Design

## Objective

Give Arcten a grounded long-term mission without weakening the homepage's product story. The
site should explain that lower-cost open-model inference gives builders more intelligence per
dollar, makes more ambitious products economical, and broadens access to advanced intelligence.

Inference remains the concrete first product. The site must not claim that Arcten is building AGI,
has developed custom CUDA kernels, or operates infrastructure that has not been validated.

## Approved Direction

The homepage remains product-first. After pricing and completion-window details, a short mission
bridge connects lower inference costs to broader access and links to a dedicated Company page.

The Company page uses a minimal manifesto structure. It presents one central belief, explains why
cost and open models matter, describes inference as Arcten's first step, and ends with a grounded
vision of abundant intelligence.

The site-wide footer adopts the information hierarchy and oversized closing gesture of the Stripe
Developer Hub without copying Stripe's content or infinite-scroll behavior. It replaces the
existing three-column footer with task-oriented Arcten navigation, distinct utility and legal
rows, and one finite outlined `ARCTEN` reveal.

## Homepage Mission Bridge

Place the mission bridge after the completion-window section and before the early-access call to
action.

**Eyebrow**

> Our mission

**Heading**

> More intelligence per dollar. More people able to build.

**Body**

> As AI systems become more capable, the ability to build with them should become more widely
> available rather than increasingly limited by cost. Arcten is building lower-cost open-model
> inference so teams can make more attempts, run longer workloads, serve more people, and pursue
> ideas that would otherwise be too expensive.

**Link**

> Read our mission

The link routes to `/company`.

## Company Page

Create `/company` as a text-led page composed of unframed, full-width sections separated by the
site's existing subtle borders. Use the existing content width, typography, spacing, header,
investor strip, and footer. Do not introduce cards, a second interactive background, or new
decorative effects.

### Hero

**Eyebrow**

> Company

**Heading**

> More intelligence should create more possibility for everyone.

**Introduction**

> We believe the long-term value of AI will be measured not only by how capable models become, but
> by how many people can put that capability to work. Advanced intelligence should help more people
> learn, create, research, and build. Reaching that future requires making the underlying economics
> work.

### Cost Shapes What Gets Built

> Every inference bill places a limit on what a product can attempt. Lower costs mean more
> experiments, longer-running agents, deeper research, and useful intelligence delivered to more
> people. They also make room for ideas that would never be economical under traditional inference
> pricing.

### Open Models Keep Progress Open

> Open models can give developers more freedom to inspect, adapt, and deploy advanced intelligence
> when their licenses permit. But open weights are not enough if using them at meaningful scale
> remains prohibitively expensive. Arcten is building the infrastructure needed to make leading
> open models practical for more builders.

### Inference Is Where We Start

> Arcten is starting with completion-window inference. A request that needs a fast response can
> choose Now, while flexible workloads can give the system more time to use available capacity
> efficiently. The intended product keeps the selected model stable while giving builders control
> over the speed-versus-cost tradeoff.

### Toward Abundant Intelligence

> As AI systems become more general and useful, access to them should expand alongside their
> capabilities. We want a future where intelligence is a widely available input to human ambition:
> helping researchers explore further, small teams build more ambitious products, and individuals
> turn more of their ideas into reality. Lowering the cost of inference is our first step toward
> that future.

After the narrative, show only the existing backer portion of `TrustStrip`, followed by the
site-wide router footer. The homepage must retain both the backer and security portions. Refactor
both variants so their names, images, and copy render during prerendering rather than being
populated in `onMount`. Backer and security image paths must resolve correctly when SvelteKit uses
a non-root base path.

## Navigation

Add `Company` after `Blog` in the desktop marketing navigation. On mobile, show `Company` and
`Docs`; keep `Blog` available in the footer rather than adding a third compact header link.

Represent route links and homepage-fragment links distinctly so `MarketingHeader` does not rely on
special cases for only `/docs` and `/blog`. Resolve `/company`, the homepage bridge, and every
internal footer route or fragment destination through SvelteKit's base-path-aware APIs. Do not
rewrite `mailto:` or external social destinations. Route links must use `aria-current="page"` on
their active route.

## Site-wide Router Footer

Replace the current three-column footer on every route. The new footer has four ordered layers:

1. A task-oriented router headed `/Start here` with a small `4 paths` count.
2. A utility row for documentation, social accounts, and resources.
3. A compact legal row with the Arcten logo, copyright, terms, and theme control.
4. A large outlined `ARCTEN` brand finale.

### Task Router

Use four equal-width cells at `1024px` and above. Each cell has a two-digit index, heading,
one-sentence description, and two useful links:

**01 — Open-model inference**

> Preview the completion windows and token rates planned for early access.

Links: `Preview pricing` to `/#pricing` and `How tiers work` to `/#use-cases`.

**02 — Deploy your model**

> Arcten is working with early design partners on private-model deployment.

Links: `Private-model preview` to `/docs#private-models` and `Contact us` to the existing Arcten
inquiry email destination.

**03 — Build with Arcten**

> Review the planned OpenAI-compatible request shape and service behavior.

Links: `Read the docs` to `/docs` and `Request early access` to the existing API-access email
destination.

**04 — Why Arcten**

> More intelligence per dollar, available to more builders.

Links: `Our company` to `/company` and `Read the blog` to `/blog`.

The cells form one continuous bordered grid, not four floating cards. Use the site's normal square
or subtly rounded geometry; do not add shadows, gradients, or decorative illustrations.

### Utility and Legal Rows

The utility row has three desktop columns:

- `Docs` is the wide column. Its description is `Review Arcten's planned API, completion windows,
and request behavior.` and its link routes to `/docs`.
- `Social` links to Arcten on X and LinkedIn using the existing verified external destinations.
- `Resources` links to `Pricing` at `/#pricing`, `Service tiers` at `/#use-cases`, `Blog` at
  `/blog`, and `Terms` at `/tos`.

The legal row keeps the existing Arcten logo, dynamic copyright year, `All rights reserved.`, terms
link, and theme toggle. Do not add Privacy, Careers, API reference, status, or other destinations
until corresponding pages exist.

All section labels use restrained monospace text. Link labels remain plain and descriptive. Every
external link must preserve the current accessible label and safe new-tab attributes.

### ARCTEN Finale

Place a dedicated brand stage after the legal row. At `1024px` and above, it is a `135svh` finite
scroll region containing a `100svh` sticky inner stage. A huge outlined uppercase `ARCTEN`
wordmark settles into view as the region is traversed. The effect must:

- occupy one finite, reversible scroll region at the actual page ending;
- never reset scroll position, loop the document, or trap scrolling;
- use rendered text rather than a canvas so it remains theme-aware and does not require client
  JavaScript;
- use fixed font sizes selected at breakpoints rather than viewport-width font scaling;
- keep letter spacing at `0`, fit within the viewport, and avoid clipping the tops of glyphs;
- use the foreground color for the outline and transparent or near-transparent fill;
- be `aria-hidden="true"` and ignore pointer input;
- become a short static closing panel on compact viewports and when reduced motion is requested.

The brand stage may progressively enhance the sticky hold with a CSS scroll-linked translation.
That translation is allowed to follow the scroll direction rather than permanently latching after
its first reveal. Its fallback must already show a complete, professionally framed wordmark. It
must not imitate Stripe's endless scroll reset or rotating hidden messages.

At widths below `1024px`, remove the sticky hold and render a static brand panel. Use these fixed
wordmark sizes as implementation targets, adjusting only if visual verification finds clipping:

- below `640px`: `4.25rem`;
- `640px` through `1023px`: `8rem`;
- `1024px` through `1439px`: `13rem`;
- `1440px` and above: `17rem`.

The router, utility row, and legal row always use a centered `1120px` maximum-width container with
the site's standard horizontal page padding. Remove the current article-route footer width
override; narrow article content must not narrow the site-wide footer. The brand stage spans the
viewport width while keeping enough horizontal padding for the complete wordmark.

## Layout Dimensions

The homepage mission bridge is a full-width band with top and bottom `foreground/10` borders. Its
inner container uses the homepage's `1120px` maximum width, while the mission text is centered and
limited to `760px`.

The Company hero and each narrative section are full-width bands separated by one
`foreground/10` border. Every band uses a centered `960px` inner container. Headings and prose are
left aligned and limited to `760px`; body paragraphs use the existing text-route typography and
line height. The backer strip may use the site's standard `1120px` presentation width.

## Route Metadata

Set the Company page title to `Company | Arcten` and provide a page-specific description based on
the approved mission. Generate the canonical URL from the current route rather than leaving the
homepage URL hard-coded for every route. When a SvelteKit base such as `/preview` is configured, the
canonical must include that base, for example `https://arcten.com/preview/company`.

Add the production URL `https://arcten.com/company` to `static/sitemap.xml`. The sitemap represents
the root production deployment and does not adopt the temporary base used only during verification.

## Content Boundaries

- Describe abundant intelligence as Arcten's direction, not a promised milestone.
- Connect every broad claim to cost, access, open models, or the inference product.
- Do not mention cloud credits, specific GPU suppliers, unpublished pricing mechanics, custom
  kernels, or AGI development.
- Use `building`, `intended`, or `goal` for infrastructure and service behavior that is not yet
  generally available.
- Qualify open-model freedoms because inspection, modification, and deployment rights depend on
  each model's license.
- Do not copy wording from Sail Research or Reddit.
- Keep the prose complete and conversational rather than reducing it to disconnected slogans.

## Responsive and Accessibility Requirements

- Preserve readable line lengths on desktop and mobile.
- Keep heading sizes consistent with the existing marketing hierarchy.
- Ensure the mission link and Company navigation links have visible keyboard focus states.
- Use semantic sections and heading order without skipping levels.
- Collapse the footer router to two columns on medium screens and one column on compact screens.
- Specifically, use one router column below `640px`, two columns from `640px` through `1023px`, and
  four columns at `1024px` and above. Use the same `1024px` threshold for the utility row's
  three-column layout; stack it below that threshold.
- Keep the footer's reading and keyboard order identical to its DOM order at every breakpoint.
- Add no motion beyond the finite footer brand reveal and existing site transitions.
- Honor `prefers-reduced-motion` by removing the footer's sticky and scroll-linked behavior.

## Verification

- Add content tests for the exact homepage mission heading, the Company copy, and the Company
  navigation entries. Test the four footer path headings and ensure its internal links are
  base-path safe.
- Add negative assertions that Company copy does not claim AGI development, custom kernels,
  completed general availability, or unconditional model-license freedoms.
- Verify prerendered Company HTML includes the backer names and does not depend on client-side
  `onMount`.
- Run `bun test`, `bun run check`, `bun run lint`, and `bun run build`.
- Run a second production build with a temporary non-root SvelteKit base-path configuration and
  verify the Company route, homepage mission link, internal navigation links, canonical URL, and
  trust images. Confirm separately that the production sitemap contains
  `https://arcten.com/company`. Do not commit the temporary base-path setting.
- Inspect `/` and `/company` at `390x844` and `1440x900` in both light and dark themes.
- Inspect the header at `767x900` and `768x900` to cover both sides of its `md` breakpoint after the
  fifth desktop navigation item is added.
- Inspect the full footer at `390x844`, `768x900`, and `1440x900`. Confirm the router grid collapses
  correctly, the outlined word fits, and the brand stage reaches a normal finite document ending.
- Inspect the footer with reduced motion enabled and confirm it becomes a short static close with
  no sticky or scroll-linked behavior.
- Keyboard through the header, mission link, Company page, and every footer link; confirm visible
  focus, sensible order, and `aria-current` on Company.
- Confirm no text overlap, clipped copy, duplicate canonical tags, or unreadable contrast.
