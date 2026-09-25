# Arcten Inference Optimization Platform Site Design

## Objective

Present Arcten as an inference optimization platform with two peer products:

1. **Arcten Inference** provides lower-cost execution for open models through completion-window
   pricing.
2. **Arcten Gateway** gives AI-native engineering teams one controlled path across Arcten and
   customer-owned provider accounts.

The root page should sell the shared outcome first: more useful AI work for a given inference
budget. It then gives visitors a clear choice between Arcten-hosted open-model execution and
customer-controlled routing across providers. Each product page carries the detailed story for its
own mechanism.

The result should borrow the clarity, technical motion, and information hierarchy of the vLLM
Semantic Router site and the useful part of PostHog's multi-product structure: one platform-level
outcome, explicit product choices, and focused detail pages. Do not copy either company's wording,
visual identity, open-source project claims, research catalog, community surfaces, or breadth.

This remains a static early-access marketing site. It must not imply that provider integrations,
automatic quality-aware routing, production APIs, or a customer dashboard are generally available
when they are not.

## Audience

The initial audience is AI-native engineering teams running expensive agent workloads:

- agent and AI application startups;
- coding-agent and developer-tool teams;
- teams running research agents, evaluations, rollouts, and background automation;
- engineering leaders who need to understand and control multi-provider model spend.

The underlying product may eventually serve a broader market, but the site should speak first to
teams already experiencing meaningful inference cost and operational complexity.

## Product Architecture

Inference and Gateway are peer products beneath the Arcten inference optimization platform.

- `/` explains the shared platform outcome and gives both products equal entry points.
- `/inference` gives Arcten Inference a complete standalone product story.
- `/gateway` gives Arcten Gateway a complete standalone product story.
- Each product page links back to the other near its end.

This preserves Sail Research's useful one-story-per-product structure without making either product
the definition of the company. The root page must not become a catalog of future tools. It
introduces exactly two products that share one cost objective and can work together without
pretending their execution contracts are identical.

### Arcten Inference

Arcten Inference is the execution layer:

- popular frontier open models;
- immediate execution and completion-window pricing;
- exact model and precision targets across completion windows;
- lower target rates when an eligible open-model workload can wait.

Completion-window discounts apply only to open-model routes that Arcten can execute or schedule.
The site must not imply that waiting automatically discounts an exact proprietary-model API call.

### Arcten Gateway

Arcten Gateway is the control layer:

- one OpenAI-compatible request shape with explicit Arcten routing extensions;
- customer-owned API keys for external providers;
- Arcten Inference as an additional route for supported open models;
- exact-model routing by default;
- optional customer-authorized model allowlists or automatic model selection;
- completion target, price cap, and fallback policies;
- per-request cost, latency, error, route, and decision records.

The relationship should remain easy to explain:

> Gateway decides where and how work runs. Inference provides Arcten's economical open-model
> execution capacity.

## Platform Positioning

### Approved Homepage Hero Copy

**Eyebrow**

> Inference optimization

**Heading**

> More intelligence per dollar.

**Supporting copy**

> Arcten optimizes where and when AI requests run. Use our open-model infrastructure, route across
> your existing providers, or combine both.

Keep the existing workload word roll as a subordinate line beginning with `Built for`. It may rotate
through the approved autonomous-agent, training, research, evaluation, and background-work
examples, but it must not compete with the fixed platform headline.

Place an `Early access` signal in the first viewport. Treat the headline as Arcten's product
objective, not a universal guarantee that every request will cost less.

The homepage hero actions are:

- `Explore products` to `#products`;
- `Request early access` to `#access`.

## Gateway Positioning

### Approved Hero Copy

**Eyebrow**

> Arcten Gateway

**Heading**

> Spend less on AI inference.

**Supporting copy**

> Arcten routes requests across models and providers using the model, timing, and budget rules you
> set.

The page must explain immediately after the hero that customers define the model, timing, budget,
and fallback constraints Arcten may use. The headline is a product objective rather than a
universal savings guarantee. Gateway may reject a request when no permitted route satisfies those
constraints.

### Supporting Message

> Bring your provider keys. Choose what Arcten can change. See every route and cost in one place.

Use `price cap`, `budget`, `completion target`, and `execution policy` in public copy. Do not use the
financial-market term `limit order` on the site.

## Inference Positioning

Apply the same outcome-led but evidence-safe structure to the `/inference` hero.

**Eyebrow**

> Arcten Inference

**Heading**

> Spend less on open-model inference.

**Description**

> For supported open models, run work now when latency matters or wait longer to pay less.

Keep an `Early access` signal in the first viewport and the existing preview-rate qualifier below
pricing. Do not duplicate the homepage word roll on this page. The page must not use
`most efficient`, `cheapest`, or another universal superlative until measured production evidence
supports it.

## Gateway Product Contract

External provider routes use customer-owned API keys in the initial product. The customer keeps the
provider relationship and is billed directly by that provider. Arcten can separately bill for
Gateway usage and Arcten-hosted inference.

| Request type          | Initial execution route                       | Billing relationship          |
| --------------------- | --------------------------------------------- | ----------------------------- |
| Proprietary model     | Customer-authorized provider account          | Provider bills customer       |
| Open model, immediate | Arcten or customer-authorized provider        | Selected route bills customer |
| Open model, delayed   | Arcten completion-window route when supported | Arcten bills customer         |

The first policy surface supports:

- **Model policy:** Keep requested, allow a shortlist, or route automatically.
- **Timing policy:** Now, by a completion target, or Flex.
- **Cost policy:** Lowest available route or a customer-set price cap.
- **Fallback policy:** Reject or use a customer-selected preferred route.

The exact requested model remains the default. Arcten must never present model substitution as
silent or mandatory.

The provider boundary is the set of BYOK accounts the customer connects plus Arcten Inference.
Gateway does not expose a separate provider-allowlist control in this version. It considers only
connected providers, and `preferred_provider` must identify one of those connected accounts or
Arcten Inference.

`max_request_usd` is a hard authorization ceiling for billable token charges, not merely an
expected-cost alert. When `cost.mode` is `price_cap`, `max_completion_tokens` is required. Admission
uses the tokenized input, `max_completion_tokens`, and the candidate route's current token rates to
calculate a maximum token charge. A route is eligible only when Gateway can enforce that maximum
and it does not exceed the cap.

For Arcten-billed routes, Arcten does not charge above the cap. For BYOK routes, Gateway constrains
the token-metered request, but the customer's upstream contract still governs taxes, minimums, or
fees outside token usage. A provider route whose token charge cannot be bounded is not eligible
under `price_cap`. `estimated_cost_usd` is the expected charge inside that ceiling;
`actual_cost_usd` may differ but cannot exceed the enforceable token-charge cap. `lowest_cost` has
no hard ceiling.

### Interactive Example Contract

The marketing demo uses one fixed illustrative request:

```text
requested model: zai-org/GLM-5.2-FP8
allowed alternate: deepseek-ai/DeepSeek-V4
deadline: 300 seconds
price cap: $0.025 per example request
preferred fallback: Customer preferred provider
```

The dollar values below are fixture data for explaining routing controls. They are not production
pricing and must be labeled `Illustrative request estimate`.

| Candidate             | Model       | Route label                 | Timing      | Illustrative cost | Normal or fallback |
| --------------------- | ----------- | --------------------------- | ----------- | ----------------: | ------------------ |
| customer-exact-now    | GLM-5.2 FP8 | Customer provider           | Immediate   |            $0.046 | Normal             |
| arcten-exact-deadline | GLM-5.2 FP8 | Arcten Inference preview    | Within 300s |            $0.028 | Normal             |
| arcten-exact-flex     | GLM-5.2 FP8 | Arcten Inference preview    | Best effort |            $0.018 | Normal             |
| customer-alt-now      | DeepSeek V4 | Customer provider           | Immediate   |            $0.032 | Normal             |
| arcten-alt-deadline   | DeepSeek V4 | Arcten Inference preview    | Within 300s |            $0.020 | Normal             |
| arcten-alt-flex       | DeepSeek V4 | Arcten Inference preview    | Best effort |            $0.014 | Normal             |
| preferred-exact-now   | GLM-5.2 FP8 | Customer preferred provider | Immediate   |            $0.024 | Fallback only      |

Derive the example receipt with these rules, in order:

1. `exact` permits only the requested GLM model. `allowlist` permits GLM and DeepSeek.
   `automatic` permits every fixture model.
2. `now` permits only immediate candidates. `deadline` permits immediate and within-300-second
   candidates. `flex` permits all candidates.
3. `lowest_cost` selects the least expensive remaining normal candidate. `price_cap` first removes
   candidates above `$0.025`, then selects the least expensive remaining normal candidate.
4. If no normal candidate remains, `reject` returns a rejected receipt.
   `preferred_provider` evaluates the fallback-only candidate against the same model, timing, and
   price constraints. It accepts that candidate only when every constraint still passes.
5. Ties resolve by fixture order so every state is deterministic.

All 36 combinations of the four controls are supported. Some intentionally produce a rejected
receipt. For example:

- `exact + now + price_cap + reject` rejects because the normal exact-model immediate route exceeds
  the illustrative cap.
- `exact + now + price_cap + preferred_provider` selects the fallback route because it meets the
  same model, timing, and cap constraints.
- `exact + deadline + lowest_cost + reject` selects the Arcten deadline route without changing the
  model.
- `allowlist + deadline + lowest_cost + reject` selects the less expensive DeepSeek route and marks
  the model as changed.
- `automatic + flex + lowest_cost + reject` selects the least expensive candidate in the fixture.

## Site Information Architecture

### Main Navigation

Use these desktop destinations in order:

1. `Inference` to `/inference`
2. `Gateway` to `/gateway`
3. `Models & Pricing` to `/inference#pricing`
4. `Docs` to `/docs`
5. `Blog` to `/blog`
6. `Company` to `/company`

Treat route links and homepage fragments as separate link types in content data. Resolve all
internal destinations through SvelteKit's base-path-aware APIs. Apply `aria-current="page"` to the
active route. Treat `/docs/*` as part of the Docs destination and `/blog/*` as part of Blog when
computing active state. The Arcten brand lockup remains the homepage link; do not add a redundant
`Platform` navigation item. `Models & Pricing` is a fragment shortcut and never receives
`aria-current="page"`; on `/inference`, only `Inference` is current.

The desktop header may use a wider maximum width than the current `1120px` container if visual
verification shows that six destinations and the access action do not fit cleanly. Do not reduce
text below the existing navigation size or use negative letter spacing to force a fit.

On compact viewports, replace the current partial link set with an accessible menu that exposes all
six destinations and the early-access action. Use Lucide `Menu` and `X` icons with accessible names.
The shared header action is `Request early access` and always targets `/#access`, including from the
Gateway page. Gateway's route-specific `Request Gateway access` action remains inside the page.

The compact menu opens from a button with `aria-expanded` and `aria-controls`. It closes when a
destination is selected, the close button is used, Escape is pressed, or a pointer action occurs
outside it. Closing without navigation restores focus to the menu trigger. Opening moves focus to
the first destination. The menu does not trap focus or page scrolling.

### Platform Homepage

Recompose `/` in this order:

1. Platform hero
2. Two-product chooser
3. Two execution paths
4. Mission bridge from the approved Company design
5. General early-access contact
6. Backers and security
7. Platform FAQ
8. Site-wide router footer from the approved Company design

Retain the existing ASCII field in the platform hero, including its click-only ripple and text
readability masks. Replace its inference-specific headline and capability rail with the approved
platform copy and these rail labels:

- `Open-model execution`
- `Provider routing`
- `Cost and latency controls`

The product chooser has `id="products"` and uses two equal, unframed columns separated by the
existing border token. It is not a pair of floating cards. Stack the columns on mobile.

**Arcten Inference**

> Run supported open models now or wait longer to pay less.

Show `Completion windows`, `Exact model and precision`, and `Arcten-hosted execution`, followed by
`Explore Inference` to `/inference`.

**Arcten Gateway**

> Route across Arcten and your provider accounts using policies you control.

Show `Bring your own provider keys`, `Model, timing, and budget policies`, and `Route receipts`,
followed by `Explore Gateway` to `/gateway`.

The shared explanation uses the heading `Two products. One cost objective.` and this restrained
diagram:

```text
Open-model request -> Arcten Inference -> selected completion window -> result
Multi-provider request -> Arcten Gateway -> permitted route -> result + route receipt
```

Explain that Inference changes when supported open-model work runs. Gateway changes where
customer-authorized traffic runs and may select Arcten Inference for supported work. Gateway owns
route receipts; direct Inference requests return normal result and usage records. Do not invent a
shared receipt type or put the full interactive Gateway policy tool on the homepage.

The root access section is platform-wide rather than model-hosting-specific:

**Eyebrow**

> Arcten early access

**Heading**

> Tell us where inference is costing you.

**Body**

> Choose Arcten Inference, Gateway, or both. Tell us what you run, what it costs, and what may
> change.

Replace the current React-mounted waitlist control with a native Svelte mailto form. It contains:

- a visibly labeled, required `type="email"` work-email field;
- a `fieldset` and visible `legend` for the product-interest radio group with `Inference`,
  `Gateway`, and `Both`;
- `Both` selected in prerendered HTML;
- a `Request early access` submit button;
- a visible `founders@arcten.com` fallback.

After native validation, JavaScript builds and opens a draft to `founders@arcten.com` with subject
`Arcten early access`. The body includes the email, selected product interest, and a short prompt
asking for workload, volume, and current cost. Without JavaScript, the visible direct-email fallback
remains usable. The form must not claim that an account or waitlist record was created.

### Inference Page

Create `/inference` in this order:

1. Focused Inference hero
2. Completion-window pricing
3. Completion-window explanation
4. Planned model and request-shape preview
5. Gateway cross-sell
6. Inference FAQ
7. Inference early-access action
8. Site-wide router footer

Move the current pricing demo, completion-window table, exact-model explanation, and related
inference FAQs from `/` to `/inference` without changing their underlying preview data. Keep the
existing `#pricing` and `#use-cases` fragments on this page.

The planned model and request-shape preview is a compact bordered band, not a second documentation
page. Use:

**Eyebrow**

> Planned first route

**Heading**

> One model. One request shape. Four completion windows.

Show `GLM-5.2 FP8`, `OpenAI-compatible by design`, and `Now / Priority / Standard / Flex` as three
plain specification rows. State that these are early-access plans, then link `Preview Inference
docs` to `/docs/inference`. Do not duplicate the full quickstart or imply that the endpoint is live.

The Gateway cross-sell is a full-width bordered band, not a card. Use a two-column desktop layout:
copy and actions on the left, a compact routing-policy preview on the right. Stack these regions on
mobile. Use the approved Gateway heading and link to `/gateway`.

The Inference hero actions are:

- `Preview pricing` to `#pricing`;
- `Request early access` to `/#access`.

The final Inference access band uses:

**Eyebrow**

> Inference early access

**Heading**

> Bring us the work that can wait.

**Body**

> Tell us the model, expected volume, and when the result needs to finish.

Link `Request Inference access` to a draft email for `founders@arcten.com` with subject
`Arcten Inference early access`. Its body contains these prompt labels in order:

```text
Model and precision:
Expected monthly input tokens:
Expected monthly output tokens:
Preferred completion window:
Required completion deadline:
Notes:
```

Link `Preview Inference docs` to `/docs/inference`.

Use these platform FAQ entries on `/`:

**What is Arcten?**

> Arcten is building an inference optimization platform. It combines economical open-model
> execution with customer-controlled routing across AI providers.

**Which Arcten product should I use?**

> Use Inference when you want Arcten to run a supported open model. Use Gateway when you want one
> policy layer across Arcten and provider accounts you already use.

**Can I use Inference and Gateway together?**

> Yes. Gateway can route supported open-model work to Arcten Inference while keeping other requests
> on customer-authorized providers.

**Will Arcten change the requested model?**

> Not by default. Inference keeps the selected model and precision across completion windows.
> Gateway changes models only when you explicitly allow it.

**Is Arcten generally available?**

> Not yet. Inference and Gateway are in early access while Arcten validates model routes,
> completion windows, and customer policies with design partners.

### Gateway Page

Create `/gateway` with the following order:

1. Light routing-field hero
2. Provider and model marquee
3. One-endpoint explanation
4. Interactive policy example
5. Request-to-route system diagram
6. Observability and route receipt
7. BYOK provider explanation
8. Arcten Inference cross-sell
9. Gateway FAQ
10. Early-access call to action
11. Site-wide router footer

Use full-width bands separated by the existing subtle borders. Do not turn the page into a grid of
decorative cards. Framed surfaces are limited to the policy example, route receipt, and code sample.

### Documentation

Convert `/docs` from one long inference page into a concise documentation hub with two primary
paths:

- `Inference`: models, pricing, completion windows, request shape, and availability.
- `Gateway`: provider setup, BYOK, policies, routing receipts, and preview API shape.

Create:

- `/docs/inference`
- `/docs/gateway`

Move the existing inference documentation to `/docs/inference`, preserving its early-access
qualifiers and pricing data source. Remove the existing private-model navigation item, section, and
deployment call to action; custom and private models are outside this version. `/docs/gateway` must
be explicitly labeled as a proposed API surface. It should document only the controls approved in
this design and must not contain install commands, live credentials, or any endpoint presented as
live. Relative paths may appear only inside a clearly labeled `Proposed API` example.

The docs hub and both detail pages should use a restrained technical layout inspired by vLLM-SR's
documentation hierarchy: clear section navigation, useful code, and direct next steps. Do not copy
its Docusaurus styling or create a large sidebar for three pages.

### Blog

Retain the existing `/blog` and article routes. Update the index toward a compact technical archive:

- one featured latest article;
- client-side title, excerpt, and tag search;
- tag filters derived from existing post metadata;
- recent article list;
- no fabricated publications or customer stories.

Without JavaScript, all posts remain visible and readable. Search and filters progressively enhance
the index.

### Existing Company Work

The approved mission bridge, `/company` page, and site-wide router footer remain governed by
`docs/superpowers/specs/2026-07-25-mission-company-page-design.md`. This design changes the shared
navigation, turns `/` into the platform homepage, and adds focused Inference and Gateway
destinations, but does not rewrite the mission or footer concept.

This spec supersedes the earlier homepage placement rule only: the mission bridge now follows the
two-execution-path explanation instead of the completion-window section, which moves to
`/inference`.

Completing and integrating the existing Company implementation plan is a prerequisite for this
implementation plan. If that work is not present on the target branch, finish the existing plan
first. This implementation may then update shared navigation and footer destinations but must not
reimplement the Company narrative or footer from scratch.

Keep the approved footer layout and motion, but replace its task-router content so the shared
platform structure remains visible on every route:

1. `Inference`: `Preview immediate and completion-window execution for supported open models.`
   Links: `Preview pricing` to `/inference#pricing`; `How windows work` to
   `/inference#use-cases`.
2. `Gateway`: `Preview model, timing, budget, and fallback controls across Arcten and your provider
accounts.` Links: `Explore Gateway` to `/gateway`; `Preview Gateway docs` to `/docs/gateway`.
3. `Build with Arcten`: `Review the proposed request shapes, service behavior, and early-access
constraints.` Links: `Read the docs` to `/docs`; `Request early access` to `/#access`.
4. `Why Arcten`: `Learn why Arcten is starting with inference optimization and where it intends to
go.` Links: `Our company` to `/company`; `Read the blog` to `/blog`.

In the footer utility row, point `Pricing` and `Service tiers` to the corresponding fragments on
`/inference`. Add direct `Inference` and `Gateway` links without removing the verified social,
legal, or theme controls. This supersedes only the earlier footer copy and destinations, not its
continuous-grid composition or finite ARCTEN finale.

This design intentionally supersedes the earlier spec's general prohibition on additional motion
only for:

- the Gateway routing field;
- the Gateway provider marquee;
- the compact Gateway cross-sell on the Inference page;
- short state transitions inside the interactive policy example.

No other page receives new decorative motion. The earlier finite-footer and reduced-motion
requirements remain unchanged.

### Explicitly Excluded Pages

Do not create:

- `/research` or a publications catalog without real Arcten research;
- `/community` without a real community program;
- a leaderboard without reproducible benchmarks;
- a dashboard or sign-in experience;
- installation instructions for software that is not available;
- custom-model upload, private-model hosting, or customer-deployment connection workflows;
- fake provider status, usage volume, customer logos, or performance statistics.

## Gateway Visual Direction

Use the approved light Arcten routing-field direction.

### Hero Composition

The Gateway hero borrows the composition of the vLLM Semantic Router homepage:

- central product label, headline, supporting copy, and actions;
- a subtle field of routing terms and system paths behind the copy;
- a continuous provider/model rail at the bottom.

It must retain Arcten's existing typography, background, border, and brand colors. Do not adopt
vLLM-SR's black-and-neon identity, logo, terminology, or exact copy.

The routing field uses only terms that describe the proposed product, including `request`, `model`,
`provider`, `policy`, `deadline`, `budget`, `fallback`, `route`, `cost`, `latency`, and `receipt`.
Do not use random scientific language or claim unavailable algorithms.

The field is decorative, ignores pointer input, and has no hover or click behavior. A soft
theme-aware fade beneath the hero copy must keep every line readable.

### Provider Marquee

Adapt the Performative UI `LogoMarquee` pattern into a Svelte-native component. The approved rail
contains typographic provider/model labels for:

- Arcten
- OpenAI
- Anthropic
- Gemini
- AWS Bedrock
- Azure AI
- Vertex AI
- Together
- Fireworks
- BYOK providers

Label the rail `Planned provider routes` or use equivalent nearby early-access language until the
integrations are available.

The marquee:

- moves continuously in one direction;
- takes approximately 40 seconds per complete track;
- uses a duplicated track with no visible jump or empty gap;
- does not pause, accelerate, or otherwise react when hovered;
- ignores pointer input;
- includes one adjacent icon-only pause/resume button with a tooltip and an accessible label that
  changes between `Pause provider routes` and `Resume provider routes`;
- preserves its current track position when paused and resumed;
- becomes a static, wrapped row when reduced motion is requested.

Use text labels as the canonical implementation. Do not hot-link external logos or add a brand-asset
dependency solely for this rail.

### Theme Behavior

The approved direction is light-first, not light-only. All routing-field, marquee, control, and
receipt colors must use existing theme tokens so the site-wide dark theme remains coherent. Dark
mode should look like Arcten in dark mode, not a separate vLLM-SR imitation.

## Interactive Policy Example

Place one interactive policy example below the one-endpoint explanation. It is a genuine framed tool,
not a decorative card.

### Controls

Use accessible segmented controls or radio groups for:

- model policy;
- timing policy;
- cost policy;
- fallback policy.

The default state is:

- Keep requested
- By deadline
- Lowest available
- Reject

### Receipt

An adjacent route receipt updates deterministically from the selected policy. Show:

- requested model;
- selected model;
- selected route category;
- completion target;
- budget result;
- whether the model changed;
- a short route reason.

Do not generate random output, call a backend, or imply that the example is a live quote. Label the
surface `Example policy` and `Example route receipt`.

Use generic route categories such as `Customer provider` and `Arcten Inference preview` where a
named provider would imply a live integration. Use only the fixture estimates defined in
`Interactive Example Contract`; do not mix them with the published per-token preview rates.

### Data Flow

The demo uses local Svelte state and a pure decision function:

```text
policy selection
-> evaluate the permitted fixture candidates
-> derive a deterministic example route or rejection
-> render receipt fields and explanation
```

The default receipt must be present in prerendered HTML. JavaScript enhances the controls but is not
required to understand the example.

Every control combination is valid. A rejected receipt is an intentional product outcome when no
fixture route satisfies the selected constraints, not a UI error. Receipt updates use a polite live
region.

## Gateway Supporting Sections

### One Inference Endpoint

Explain that Gateway is intended to accept one OpenAI-compatible inference request shape and apply
customer policies across Arcten and customer-owned routes. Read-only response and receipt paths
support deferred work; they are not additional submission surfaces. Show the preview request below.
Label it `Proposed API` and do not publish a production base URL or API key flow before they exist.

```json
{
	"model": "zai-org/GLM-5.2-FP8",
	"stream": false,
	"max_completion_tokens": 4096,
	"messages": [
		{
			"role": "user",
			"content": "Run the evaluation suite."
		}
	],
	"routing": {
		"model_policy": "exact",
		"allowed_models": [],
		"completion": {
			"mode": "deadline",
			"deadline_seconds": 300
		},
		"cost": {
			"mode": "lowest_cost"
		},
		"fallback": {
			"mode": "reject",
			"preferred_provider": null
		}
	}
}
```

Allowed preview values are:

- `model_policy`: `exact`, `allowlist`, `automatic`;
- `allowed_models`: required and non-empty only for `allowlist`;
- `completion.mode`: `now`, `deadline`, `flex`;
- `deadline_seconds`: required only for `deadline`;
- `cost.mode`: `lowest_cost`, `price_cap`;
- `max_request_usd`: required only for `price_cap`;
- `max_completion_tokens`: required when `cost.mode` is `price_cap`;
- `fallback.mode`: `reject`, `preferred_provider`;
- `preferred_provider`: required only for `preferred_provider`.

The proposed request path is `POST /v1/chat/completions`. Its request fields and successful
immediate response use the OpenAI Chat Completions shape; `routing`, deferred `202` responses, and
receipt paths are documented Arcten extensions rather than drop-in OpenAI behavior. `stream`
defaults to `false`. A request with `stream: true` returns a proposed `400` error with
`code: "streaming_not_supported"`; this preview does not claim streaming support.

Gateway selects and admits a route before dispatch, then assigns `route_id`. The proposed response
lifecycle is:

1. An immediate route blocks until completion and returns the normal OpenAI-compatible chat
   completion body with these routing headers:

```text
x-arcten-route-id
x-arcten-selected-model
x-arcten-selected-provider
x-arcten-model-changed
```

2. Any selected route with a deferred result contract returns `202` after admission. This includes
   Arcten Inference completion-window routes and a connected provider only when that provider
   explicitly supports deferred retrieval:

```json
{
	"id": "deferred_example",
	"object": "arcten.deferred_chat_completion",
	"status": "queued",
	"route_id": "route_example",
	"response_url": "/v1/responses/deferred_example",
	"route_url": "/v1/routes/route_example"
}
```

3. `GET /v1/responses/{id}` returns the same object with `status: "queued"` or
   `status: "running"` until completion, then returns the normal OpenAI-compatible chat completion
   body. Failed work returns:

```json
{
	"id": "deferred_example",
	"object": "arcten.deferred_chat_completion",
	"status": "failed",
	"route_id": "route_example",
	"error": {
		"code": "upstream_failed",
		"message": "The selected route did not complete."
	}
}
```

No webhook or streaming behavior is promised in this preview.

4. `GET /v1/routes/{route_id}` is available after admission. Its status is one of `queued`,
   `running`, `completed`, `failed`, or `rejected`.

The deferred `202` body exposes the route ID immediately. A synchronous request exposes it in the
final response headers. Document this queued receipt example:

```json
{
	"route_id": "route_example",
	"status": "queued",
	"requested_model": "zai-org/GLM-5.2-FP8",
	"selected_model": "zai-org/GLM-5.2-FP8",
	"selected_provider": "arcten_inference_preview",
	"model_changed": false,
	"completion": {
		"mode": "deadline",
		"deadline_seconds": 300
	},
	"estimated_cost_usd": 0.028,
	"actual_cost_usd": null,
	"latency_ms": null,
	"token_usage": {
		"input_tokens": null,
		"output_tokens": null,
		"total_tokens": null
	},
	"error": null,
	"reason": "Lowest illustrative exact-model route within the completion target."
}
```

Measured latency, actual cost, and token counts remain `null` until work completes. Show this
completed-state excerpt for the same receipt:

```json
{
	"route_id": "route_example",
	"status": "completed",
	"actual_cost_usd": 0.027,
	"latency_ms": 118300,
	"token_usage": {
		"input_tokens": 2400,
		"output_tokens": 680,
		"total_tokens": 3080
	},
	"error": null
}
```

A failed receipt uses `status: "failed"`, keeps any measured usage fields available at failure
time, and sets `error` to an object with `code` and `message`.

For `deadline`, Gateway rejects at admission when no candidate is predicted to finish in time. If
an admitted deferred route later misses the deadline, both the response and receipt terminate with
`status: "failed"` and `code: "deadline_missed"`. Arcten waives its own Inference execution charge
for that missed deadline; a BYOK provider may still bill work already performed under the
customer's upstream contract. `flex` has no promised completion deadline.

The initial fallback policy is admission-time only. It selects the preferred connected route when
no normal candidate satisfies the request. Runtime retry or failover after execution starts is not
promised in this preview.

For a request with no permitted route, document this proposed `409` shape:

```json
{
	"error": {
		"code": "routing_constraints_unsatisfied",
		"message": "No permitted route satisfies the selected model, timing, and cost constraints."
	},
	"route_receipt": {
		"route_id": "route_example_rejected",
		"status": "rejected",
		"requested_model": "zai-org/GLM-5.2-FP8",
		"selected_model": null,
		"selected_provider": null,
		"model_changed": false,
		"completion": {
			"mode": "now",
			"deadline_seconds": null
		},
		"estimated_cost_usd": null,
		"actual_cost_usd": null,
		"latency_ms": null,
		"token_usage": {
			"input_tokens": null,
			"output_tokens": null,
			"total_tokens": null
		},
		"error": {
			"code": "routing_constraints_unsatisfied",
			"message": "No permitted route satisfies the selected model, timing, and cost constraints."
		},
		"reason": "No exact-model immediate route fits the illustrative price cap."
	}
}
```

These shapes are preview contracts for documentation and demonstration only; they are not
implemented endpoints.

### Request-to-Route Diagram

Use one restrained horizontal system diagram on desktop and a vertical sequence on mobile:

```text
Request -> Customer policy -> Arcten Gateway -> Selected model/provider -> Route receipt
```

The diagram should communicate data flow, not pretend to visualize a proprietary learned routing
algorithm.

### Observability

Explain the initial record surface in concrete terms:

- cost;
- latency;
- token usage;
- errors;
- selected provider and model;
- model-change status;
- route reason.

Do not add tool-call correctness, task-quality scoring, replay execution, or automatic evaluation
claims in this version. A route receipt is a record of the routing decision, not proof that an
answer was correct.

### BYOK

State clearly:

> Bring your provider keys. Keep your provider contracts and direct billing.

Explain that Gateway is designed to apply routing and spend controls while upstream providers bill
the customer directly. Do not promise consolidated billing in the initial product.

Security copy must not claim completed SOC 2 compliance. Reuse the existing Vanta image and approved
`SOC 2 readiness in progress` language.

### Inference Cross-Sell

Near the bottom of `/gateway`, introduce Arcten Inference:

**Eyebrow**

> Arcten Inference

**Heading**

> Completion-window pricing for supported open models.

**Body**

> Send supported open-model requests through Arcten's completion-window infrastructure when they
> can wait.

Link to the Inference page and its pricing section.

### Gateway FAQ

Use these entries:

**Is Arcten Gateway generally available?**

> Not yet. Gateway is in early access, and the provider routes and API shown on this page are a
> preview of the intended product.

**Do I have to move my provider accounts to Arcten?**

> No. The initial Gateway design uses your provider keys, contracts, and direct billing. Arcten
> applies the routing and spend policies you choose.

**Will Gateway change the model I request?**

> Not by default. Exact-model routing is the default. Gateway may choose from an allowlist or route
> automatically only when you explicitly enable that policy.

**Can waiting make a proprietary-model request cheaper?**

> Only when the selected provider offers an eligible lower-cost route. Arcten completion-window
> pricing applies to supported open models that Arcten can execute.

**Does Gateway guarantee a cheaper or equally good result?**

> No universal guarantee can be made for every request. The provider accounts you connect define
> the available provider set, and you choose the model, timing, budget, and fallback rules. Gateway
> selects a route that satisfies those rules or rejects the request when none does.

**Is the request price cap a hard limit?**

> It is a hard ceiling for token charges on routes Gateway can enforce. BYOK provider taxes,
> minimums, and non-token fees remain governed by your upstream contract.

**What does a route receipt show?**

> The requested and selected model, provider, cost, latency, token usage, model-change status, and
> the reason the route was selected.

### Calls to Action

Use these exact labels and destinations:

- Homepage hero primary: `Explore products` to `#products`.
- Homepage hero secondary: `Request early access` to `#access`.
- Homepage product chooser: `Explore Inference` to `/inference`.
- Homepage product chooser: `Explore Gateway` to `/gateway`.
- Inference hero primary: `Preview pricing` to `#pricing`.
- Inference hero secondary: `Request early access` to `/#access`.
- Inference Gateway cross-sell primary: `Explore Gateway` to `/gateway`.
- Inference Gateway cross-sell secondary: `Preview Gateway docs` to `/docs/gateway`.
- Inference final access primary: `Request Inference access` to the specified email draft.
- Inference final access secondary: `Preview Inference docs` to `/docs/inference`.
- Gateway hero primary: `Request early access` to `#gateway-access`.
- Gateway hero secondary: `Preview Gateway docs` to `/docs/gateway`.
- Gateway Inference cross-sell: `Explore Arcten Inference` to `/inference`.
- Gateway Inference pricing link: `Preview completion-window pricing` to `/inference#pricing`.

The final Gateway access section uses:

**Eyebrow**

> Gateway early access

**Heading**

> Bring your inference traffic under control.

**Body**

> Tell us which models and providers you use, what you spend, and what Arcten may optimize.

Give this section `id="gateway-access"`. Use a native Svelte email form with a visible `Work email`
label and a required `type="email"` field. After native validation, JavaScript builds and opens a
mailto draft to `founders@arcten.com` with subject `Arcten Gateway early access`. The body includes
the submitted email and prompts for current models, providers, monthly spend, and permitted
optimizations. The submit label is `Request Gateway access`.

Retain a visible direct `founders@arcten.com` mailto fallback that works without JavaScript. The
form must not mount the existing React waitlist component or imply that an account or waitlist
record was created.

## Content Boundaries

- Use `building`, `designed for`, `planned`, `preview`, or `early access` for unavailable behavior.
- Keep the strong approved Gateway hero but place an `Early access` signal in the first viewport.
- Do not mention free AWS, Azure, or GCP credits publicly.
- Do not imply that promotional credits are permanent unit economics.
- Do not claim all external providers are live.
- Do not advertise custom-model uploads, private-model hosting, or customer deployments in this
  version.
- Do not claim automatic model routing preserves quality without customer-specific evidence.
- Do not claim proprietary-model completion-window discounts.
- Do not copy wording from vLLM-SR, Weave, Sail Research, or Performative UI.
- Do not add invented routing algorithms, research papers, benchmarks, customers, or usage numbers.

## Implementation Boundaries

The project remains SvelteKit. Do not mount React components or ship a React runtime for these
pages. Replace the existing React-mounted contact form with the native Svelte form defined above.
Recreate approved Performative UI behavior as small Svelte components using the package's
MIT-licensed patterns only where useful.

Recommended component boundaries:

- `PlatformHero.svelte`
- `PlatformProductChooser.svelte`
- `PlatformRouteFlow.svelte`
- `PlatformAccessForm.svelte`
- `InferenceHero.svelte`
- `GatewayHero.svelte`
- `GatewayRoutingField.svelte`
- `ProviderMarquee.svelte`
- `GatewayPolicyDemo.svelte`
- `RouteReceipt.svelte`
- `GatewayCrossSell.svelte`
- `GatewayAccessForm.svelte`
- `DocsSectionNav.svelte` only if shared by both docs detail routes
- `BlogFilters.svelte`

Store Gateway copy, policy options, provider labels, FAQs, and deterministic example outcomes in
`src/lib/content/gateway.ts`. Store the pure policy-to-receipt function in a separate module so it
can be tested without rendering Svelte.

Store platform-level hero, product-choice, flow, access, and FAQ copy separately from
Inference-specific pricing content so the root page does not become coupled to either product
page. Build mailto destinations through one pure, URI-encoding helper shared by the platform,
Inference, and Gateway access components. Refactor shared navigation and cross-sells rather than
duplicating route resolution in page files. Do not refactor unrelated blog rendering, theme
infrastructure, or pricing logic.

## Responsive and Accessibility Requirements

- Preserve semantic heading order and full keyboard navigation.
- Keep hero copy above the routing field with sufficient contrast in both themes.
- Ensure routing-field decoration is `aria-hidden` and ignores pointer input.
- Give the marquee one useful accessible label and hide duplicated visual tracks from assistive
  technology.
- Respect `prefers-reduced-motion` for the field, marquee, policy transitions, and existing page
  transitions.
- Stack policy controls above the receipt below the desktop two-column breakpoint.
- Keep every segmented-control label visible without horizontal scrolling at `390px`.
- Convert the request-to-route diagram from horizontal to vertical before labels collide.
- Keep the desktop navigation from wrapping; switch to the compact menu before it does.
- Preserve a useful no-JavaScript default for the policy example, blog index, and both access
  sections.
- Associate every access-form input with a visible label. Group the platform product-interest
  radios in a `fieldset` with a `legend`; do not use placeholder text as the label.
- Keep the marquee pause/resume control keyboard reachable and expose its current action through
  its accessible name.
- Add visible focus treatment to every new link, control, menu action, and filter.
- Do not use hover as the only way to reveal content or change persistent state.

## Route Metadata and Sitemap

Add route-specific metadata:

| Route             | Title                                                       | Description                                                                                                |
| ----------------- | ----------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| `/`               | `Arcten - Inference optimization for AI workloads`          | `Explore completion-window open-model inference and customer-controlled routing across AI providers.`      |
| `/inference`      | `Arcten Inference - Completion-window open-model execution` | `Preview supported open models with immediate and lower-priced completion-window options.`                 |
| `/gateway`        | `Arcten Gateway - Routing and spend controls`               | `Preview model, timing, budget, and fallback controls across Arcten and customer-owned provider accounts.` |
| `/docs`           | `Arcten Docs`                                               | `Preview Arcten Inference and Gateway concepts, pricing, policies, and request shapes.`                    |
| `/docs/inference` | `Arcten Inference Docs`                                     | `Preview open-model inference, completion windows, pricing, and request formats.`                          |
| `/docs/gateway`   | `Arcten Gateway Docs`                                       | `Preview BYOK provider routing, policy controls, route receipts, and the proposed Gateway API.`            |

Use each route's title and description for its Open Graph and Twitter summary metadata. Keep
canonical and social URLs base-path aware. Use the existing Arcten social image when available; do
not invent product screenshots. Keep Organization JSON-LD on `/` with only verified company and
social fields. Product routes may use `WebPage` JSON-LD but must not use `Product` or
`SoftwareApplication` availability, offer, rating, or pricing fields during early access.

Update `static/sitemap.xml` with `/`, `/inference`, `/gateway`, `/docs`, `/docs/inference`,
`/docs/gateway`, `/blog`, `/company`, `/tos`, and every real blog article route. Do not include
fragments, proposed API paths, or unavailable account routes. Update internal links that previously
targeted inference sections on the old root page or single `/docs` page.

## Verification

### Automated

- Add unit tests for every supported policy combination and its deterministic receipt.
- Test the shared mailto builder for platform, Inference, and Gateway subjects and body fields.
- Add content tests for the platform hero, both homepage product choices, Gateway hero, BYOK
  statement, connected-provider boundary, hard token-charge cap qualifier, both product cross-sells,
  provider preview qualifier, and navigation destinations.
- Add negative assertions against live-integration, completed-SOC-2, proprietary discount, and
  unqualified savings, quality-preservation, custom-model, private-model, or customer-deployment
  claims.
- Test blog search and tag filtering as pure functions where possible.
- Verify prerendered homepage HTML contains both product names and the default product-interest
  choice.
- Verify prerendered Inference HTML contains pricing and early-access qualifiers.
- Verify prerendered Gateway HTML contains the default example receipt, core provider labels, and
  proposed synchronous, queued, completed, rejected, failed, and unsupported-streaming behavior.
- Verify every CTA fragment has exactly one matching ID in its destination HTML.
- Verify each route renders no more than one `aria-current="page"` navigation destination and that
  `Models & Pricing` never receives it.
- Verify titles, descriptions, canonical URLs, Open Graph/Twitter summaries, permitted JSON-LD,
  and every required sitemap location.
- Verify both access pages prerender visible direct-email fallbacks and that generated drafts
  include the submitted email plus their required product fields.
- Run `bun test`.
- Run `bun run check`.
- Run `bun run lint`.
- Run `bun run build`.

### Visual and Interaction

Inspect `/`, `/inference`, `/gateway`, `/docs`, `/docs/inference`, `/docs/gateway`, and `/blog` at:

- `390x844`;
- `768x900`;
- `1440x900`.

For the root, Inference, and Gateway pages, inspect both light and dark themes. Confirm:

- no text overlap or clipped navigation;
- platform hero copy remains readable over the ASCII field;
- Gateway hero copy remains readable over the routing field;
- marquee has no visible gap or jump;
- reduced motion produces a static provider row and routing field;
- pausing and resuming the marquee preserves its track position and updates the control name;
- policy controls work by pointer and keyboard;
- receipt updates are announced without moving surrounding layout;
- the mobile menu exposes every destination and closes correctly;
- access forms pass native email validation, remain fully labeled, and generate the specified draft;
- diagrams and code blocks do not create page-level horizontal scrolling;
- footer behavior remains consistent with the approved Company design.

Run a second production build with a temporary non-root SvelteKit base path. Verify all new routes,
homepage fragments, navigation destinations, canonical URLs, and static assets. Do not commit the
temporary base-path configuration.

## Success Criteria

The implementation is successful when:

1. The first homepage viewport contains `Inference optimization`, `More intelligence per dollar.`,
   the approved supporting copy, and an `Early access` signal.
2. `#products` contains exactly two equally sized desktop product columns, both product names, their
   approved capability labels, and working links to `/inference` and `/gateway`; mobile renders the
   same content in one column.
3. `/inference` contains working `#pricing` and `#use-cases` fragments, all four preview completion
   windows, the planned first-route qualifier, and no live-availability claim.
4. `/gateway` contains the BYOK statement, the four defined policy controls, deterministic receipt
   output, the proposed synchronous/deferred lifecycle, and `#gateway-access`.
5. Automated tests cover all 36 policy combinations, including accepted, fallback, and rejected
   receipts, without an undefined control or random outcome.
6. The viewport and theme checks above pass without overlap, clipping, page-level horizontal
   scrolling, unreadable hero copy, or motion that ignores reduced-motion and pause controls.
7. `/docs`, `/docs/inference`, and `/docs/gateway` render their specified preview content; `/blog`
   exposes every real post without JavaScript and adds no fabricated publication or customer.
8. Content tests find no claim of a live integration, completed SOC 2 compliance, universal
   savings, preserved quality, proprietary-model completion-window discount, custom/private model
   support, customer deployments, or generally available production API.
