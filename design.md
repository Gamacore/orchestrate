# Landing-page design direction

## Goal

Make Arcten feel like an ambitious research-and-engineering company, not a generic SaaS template. The page should be editorially calm at rest and feel alive as the reader moves between distinct chapters. Preserve clarity, fast loading, keyboard access, and the existing light/dark theme toggle.

## Reference-study brief

Study these landing pages for design inspiration:

- https://site1.com
- https://site2.com
- https://site3.com

Do not copy them literally. These are currently inaccessible placeholder URLs, so replace them with reachable references before treating them as visual evidence.

For each viable reference, record recurring principles—not screenshots or isolated flourishes—across:

- typography
- spacing and density
- navigation
- hero composition
- CTA treatment
- section ordering
- cards
- borders/radii
- color usage
- imagery
- motion/interactions

Turn the findings into one coherent Arcten direction. Test each choice against the product: long-horizon autonomous research and coding agents need confidence, evidence, and legibility more than novelty.

Use the reference libraries as research inputs, not styles to copy:

- [Land-book](https://land-book.com/) and [Lapa Ninja](https://www.lapa.ninja/) for conversion-oriented hero composition, page rhythm, and full-page hierarchy.
- [Godly](https://godly.design/sites/) and [Awwwards](https://www.awwwards.com/) for one memorable art-directed moment and purposeful scroll choreography.
- [Mobbin](https://mobbin.com/) and [SaaSFrame](https://www.saasframe.io/) for real product UI density, legible controls, and believable workflow states.

Before each implementation pass, save 3–5 examples that answer one specific question (for example, “how do research products reveal a product demo?”). Do not combine unrelated visual trends from several examples.

## Visual system

### Gradient: `Aurora Field`

Use a deep indigo-to-electric-cyan aurora gradient as the company’s distinctive visual asset. This family is familiar enough to read as modern AI/research software, while the restrained treatment keeps Arcten credible.

```css
--ink: #eaf2ff;
--ink-soft: #eaf2ff; /* All readable text uses this exact token. */
--night: #07111f;
--indigo: #465dff;
--cyan: #30d6e6;
--violet: #966bff;
--line: rgb(234 242 255 / 0.16);
--aurora: linear-gradient(118deg, #465dff 0%, #30d6e6 48%, #966bff 100%);
```

- Use `--aurora` on the hero field, selected dividers, the product-window edge light, and a single closing CTA. It must never become a decorative wash behind every card.
- Keep every readable text element—including headings, body, navigation, metadata, buttons, links, and icon-label pairs—at `color: var(--ink)`. Create hierarchy with font size, weight, opacity on non-text borders/surfaces, spacing, and layout; **never** by changing text color.
- For accessibility, put text only on a sufficiently dark, stable part of the gradient. Do not place copy directly over animated bright cyan or violet.
- Dark mode is the primary expression. The light theme may retain the same gradient but needs a near-white `--ink` only when the background is dark enough; the “one text color” rule remains true within each theme.

### Type and layout

- Retain Geist Variable unless a later brand decision changes it. Its precise, technical character fits autonomous research better than a fashion-led display serif.
- Use a 12-column desktop grid, with long left-aligned reading measures (about 60–70 characters), and one clear focal axis per section.
- Make the hero product preview an active research workspace: a task, evidence trail, plan, and output—not a generic dashboard of cards.
- Replace visible placeholder copy before visual polish. Real claims and concise proof make the page feel designed.

## Section choreography

The page is a sequence of environments, not a stack of identical bands:

1. **Hero / horizon** — full-bleed `Aurora Field`, strong promise, and a large product-window reveal. The gradient is the memorable visual moment.
2. **Proof / signal** — a narrow, quiet dark strip. Facts move horizontally as a restrained ticker only if they are real; otherwise, use static proof points.
3. **Why now / evidence** — switch to a grid-paper or faint ruled surface. Present the problem as evidence and outcomes, with asymmetrical feature blocks rather than three identical cards.
4. **How it works / execution** — transition into a focused operational view. Reveal the workflow as a single connected path, borrowing the legibility of product UI rather than adding decorative steps.
5. **Field notes / credibility** — return to a calm editorial surface. Blog cards are secondary; the writing should have space to breathe.
6. **Closing CTA / return to horizon** — bring back the aurora as a distant, softened glow, creating a visual loop to the hero.

Use full-width section boundaries, changes in grid density, and surface texture to make the change of chapter obvious. Avoid relying on more rounded cards to establish separation.

## YC product-page structure study

Poke and comparable product-led YC companies share a conversion structure, even though their visuals differ:

```
navigation
→ promise + immediate CTA + product moment
→ “fits into your workflow” integrations / use cases
→ capability chapters that explain the product in plain language
→ advanced or technical extension
→ proof, customer stories, or field notes
→ pricing / access decision
→ final CTA
→ footer
```

Poke uses the pattern as hero, integrations, recipes/scheduled/proactive capabilities, advanced developer use cases, pricing, and final CTA. Linear uses a closely related product-system story: promise, workflow capabilities, proof/customer stories, then a final conversion point. The structure is therefore shared; the brand, visuals, copy, and interaction details must remain Arcten’s own.

For Arcten, apply the structure with these placeholders:

1. **Navigation** — `[PRODUCT]`, `[RESEARCH]`, `[FIELD NOTES]`, `[PRIMARY CTA]`.
2. **Hero** — `[SPECIFIC LONG-HORIZON OUTCOME]`, `[WHO IT IS FOR]`, `[PRIMARY CTA]`, and a live research/coding workspace preview.
3. **Workflow fit** — `[REPOSITORIES]`, `[KNOWLEDGE BASE]`, `[ISSUE TRACKER]`, `[RESEARCH DATA]` as horizontally browsable integration chips.
4. **Core capabilities** — `[CAPTURE CONTEXT]`, `[RUN THE INVESTIGATION]`, `[SHIP THE RESULT]` in an evidence-led narrative.
5. **Advanced extension** — `[AGENT / DEVELOPER / CUSTOM WORKFLOW]` for technical teams that need deeper control.
6. **Proof and thinking** — real `[CUSTOMER OUTCOME]`, `[BENCHMARK]`, or `[FIELD NOTE]`; never invented social proof.
7. **Access** — `[EXPLORER]`, `[TEAM]`, `[FRONTIER]` tiers with real audience, capability, and price copy when available.
8. **Final CTA** — `[START A RESEARCH RUN]` / `[TALK TO THE TEAM]`, followed by a simple footer.

## Motion rules

Motion should explain the transition between sections, not decorate every element.

- On first load, stage one 700–900 ms hero sequence: gradient settles, product-window mask reveals, then copy becomes visible. Do not independently animate every word or button.
- At each section boundary, use one transition device: a horizontal scan line, an expanding grid, or a clipped aurora edge. Alternate these; do not stack effects.
- Use `IntersectionObserver` to add a single `is-visible` class once per section. Animate the section’s main visual and heading as one composition with 450–650 ms transforms/opacity—not repeated card pop-ins.
- Animate product UI only to show real progress: a progress fill, evidence lines appearing, or a result resolving. Keep loops slow and pause them outside the viewport.
- Buttons and links get responsive 150–220 ms hover/focus feedback; no bounce, continuous float, parallax drift, or cursor-following effects.
- Implement `prefers-reduced-motion: reduce` so all reveals resolve immediately, the gradient is static, and no ticker or loop runs.

## Implementation checklist

- Define the tokens in `src/app.css`; do not scatter raw colors through component styles.
- Use `--surface-radius: 18px` for every panel, product window, card group, and future boxed surface. Use `--control-radius: 12px` for buttons and compact controls; only pills such as filters may use a fully rounded radius.
- Use the landing page's `ui-rounded` / `Arial Rounded MT Bold` fallback stack for friendly, technical warmth. Keep weights controlled and avoid cartoonish oversized type.
- Apply a shared `landing-section` and `section--{chapter}` structure in `src/routes/+page.svelte` so each chapter owns its surface and transition.
- Build the gradient with CSS backgrounds and pseudo-elements before considering image assets or WebGL.
- Test at 320 px, 768 px, and 1440 px. On mobile, keep the chapter transitions but remove nonessential animation and avoid horizontal overflow.
- Verify keyboard focus remains highly visible using the same `--ink` text color plus an outline/surface treatment.
- Run `bun run lint` and test both theme modes after each pass.

## Quality bar

The finished page should feel coherent without motion, compelling with motion, and unmistakably Arcten rather than a collage of gallery trends. If an effect does not clarify the product, emphasize the company’s long-horizon work, or improve orientation between sections, remove it.
