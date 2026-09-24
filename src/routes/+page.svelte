<script lang="ts">
	import { closingCta, completionWindowRows, faqItems, heroCopy } from '$lib/content/landing';
	import { pricingCopy } from '$lib/pricing/completion-windows';
	import {
		AnnouncementBanner,
		AsciiHero,
		ContactWaitlist,
		DeploymentBackdrop,
		HeroActions,
		MarketingHeader,
		TierPricingDemo,
		TrustStrip,
		WordRoll
	} from '$lib/ui';
</script>

<div class="min-h-screen overflow-x-clip bg-background text-foreground">
	<AnnouncementBanner />
	<MarketingHeader />

	<main>
		<section
			id="top"
			class="relative isolate min-h-[calc(100svh-76px)] overflow-hidden px-6 pt-14 pb-16 text-center sm:pt-16 sm:pb-20"
		>
			<div
				class="absolute inset-x-0 top-0 z-[2] h-[calc(100svh-76px)] min-h-[620px] overflow-hidden"
			>
				<AsciiHero
					class="h-full w-full"
					baseOpacity={0.78}
					clickRippleRadius={480}
					clickRippleDuration={2400}
					fontSize={10}
					frameMs={36}
					charRamp=".,:';il!+*xk0XNW@"
					palette={['#405a82', '#7590b4', '#9fb2ce']}
				/>
			</div>
			<div
				class="pointer-events-none absolute inset-x-0 top-0 z-[1] h-[calc(100svh-76px)] min-h-[620px] bg-[linear-gradient(180deg,rgb(249_251_255_/_0)_0%,rgb(249_251_255_/_0.16)_64%,var(--background)_100%)]"
			></div>

			<div class="relative z-10 mx-auto flex w-full max-w-[1120px] flex-col items-center">
				<span
					class="hero-copy hero-copy-compact mb-5 inline-flex min-h-8 items-center rounded-full border border-foreground/10 bg-background/70 px-4 text-xs font-semibold tracking-[0.08em] text-[color:var(--brand)] uppercase backdrop-blur-md"
				>
					{heroCopy.status}
				</span>
				<p
					class="hero-copy hero-copy-compact hero-balance mb-7 max-w-[20rem] text-base font-medium text-muted italic sm:max-w-none sm:text-xl"
				>
					{heroCopy.eyebrow}
				</p>

				<h1
					class="hero-copy hero-balance max-w-[1080px] text-[clamp(1.75rem,4vw,3.65rem)] leading-[1.04] font-medium tracking-normal text-foreground"
				>
					<span>{heroCopy.heading}</span>
					<span class="block min-h-[1.08em] text-[color:var(--accent-blue)]">
						<WordRoll
							words={[
								'autonomous agents',
								'agent training',
								'asynchronous tasks',
								'batch workloads',
								'RL rollouts',
								'synthetic data',
								'model evaluation',
								'data labeling',
								'deep research',
								'background agents',
								'always-on AI assistants',
								'long-horizon agents'
							]}
							intervalMs={2100}
							transitionMs={700}
						/>
					</span>
				</h1>

				<div
					class="hero-copy hero-balance mt-14 w-full max-w-[21rem] text-base leading-[1.5] font-normal text-muted sm:mt-16 sm:max-w-[760px] sm:text-xl"
				>
					<p>{heroCopy.description}</p>
				</div>

				<p
					class="hero-copy hero-copy-compact mt-6 max-w-[20rem] text-sm font-medium text-muted sm:max-w-none sm:text-base"
				>
					{heroCopy.supporting}
				</p>

				<div
					id="models"
					class="mt-10 flex w-full max-w-[760px] flex-wrap items-center justify-center gap-x-6 gap-y-2 border-y border-foreground/10 py-4 text-sm text-muted"
					aria-label="Planned platform capabilities"
				>
					<span class="hero-rail-label">OpenAI-compatible by design</span>
					<span class="h-1 w-1 rotate-45 bg-[color:var(--rail-dot)]"></span>
					<span class="hero-rail-label">GLM-5.2 FP8 first</span>
					<span class="h-1 w-1 rotate-45 bg-[color:var(--rail-dot)]"></span>
					<span class="hero-rail-label">Completion-window pricing</span>
				</div>

				<div class="mt-5 w-full">
					<HeroActions />
				</div>
			</div>
		</section>

		<section id="pricing" class="scroll-mt-20 border-y border-foreground/10 py-20 sm:py-24">
			<div class="mx-auto w-full max-w-[1120px] px-6 lg:px-0">
				<div class="mx-auto max-w-[780px] text-center">
					<p class="text-sm font-semibold text-[color:var(--brand)]">{pricingCopy.eyebrow}</p>
					<h2 class="mt-4 text-3xl leading-tight font-medium text-foreground sm:text-5xl">
						Use it now.<br />Pay less when it can wait.
					</h2>
					<p class="mx-auto mt-5 max-w-[680px] text-base leading-7 text-muted sm:text-lg">
						{pricingCopy.explanation}
					</p>
				</div>

				<div class="mx-auto mt-12 w-full max-w-[960px] border-y border-foreground/10 py-5 sm:px-5">
					<TierPricingDemo />
				</div>

				<p class="mx-auto mt-8 max-w-[620px] text-center text-sm leading-6 text-muted">
					Planned early-access rates for the same model and precision across every window.
				</p>
			</div>
		</section>

		<section id="use-cases" class="scroll-mt-20 border-b border-foreground/10 py-20 sm:py-24">
			<div class="mx-auto w-full max-w-[1120px] px-6 lg:px-0">
				<div class="grid gap-12 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:gap-20">
					<div class="max-w-[470px]">
						<p class="text-sm font-semibold text-[color:var(--brand)]">Introducing</p>
						<h2 class="mt-4 text-3xl leading-tight font-medium text-foreground sm:text-5xl">
							The completion window.
						</h2>
					</div>

					<div>
						<p class="max-w-[640px] text-lg leading-8 text-foreground sm:text-2xl sm:leading-9">
							A longer window is intended to mean a lower token price for the same intelligence.
						</p>
						<p class="mt-5 max-w-[640px] text-sm leading-6 text-muted sm:text-base sm:leading-7">
							Choose the speed-versus-cost target per request. Interactive work can use Now;
							rollouts, evaluations, deep research, and background agents can give the scheduler
							more room.
						</p>
					</div>
				</div>

				<div class="mt-14 overflow-x-auto border-y border-foreground/10">
					<table class="w-full min-w-[620px] border-collapse text-left">
						<thead>
							<tr class="border-b border-foreground/10 text-xs text-muted uppercase">
								<th class="px-3 py-4 font-medium">Window</th>
								<th class="px-3 py-4 font-medium">Target turn time</th>
								<th class="px-3 py-4 text-right font-medium">Preview positioning</th>
							</tr>
						</thead>
						<tbody>
							{#each completionWindowRows as row (row.window)}
								<tr class="border-b border-foreground/10 last:border-b-0">
									<td class="px-3 py-4 font-mono text-sm font-semibold text-foreground">
										{row.window}
									</td>
									<td class="px-3 py-4 text-sm text-muted">{row.turnTime}</td>
									<td class="px-3 py-4 text-right text-sm text-muted">{row.relativePrice}</td>
								</tr>
							{/each}
						</tbody>
					</table>
				</div>

				<div class="mt-14 grid border-y border-foreground/10 md:grid-cols-3">
					{#each [{ title: 'Drop-in by design', body: 'The planned API follows the OpenAI request shape with one additional completion-window control.' }, { title: 'Same model target', body: 'Windows are intended to change scheduling flexibility, not silently swap model weights or precision.' }, { title: 'Built for work that waits', body: 'Deep research, RL rollouts, evaluations, and background agents are the initial design-partner workloads.' }] as item, index (item.title)}
						<article
							class={`px-0 py-7 md:px-8 ${index < 2 ? 'border-b border-foreground/10 md:border-r md:border-b-0' : ''}`}
						>
							<h3 class="text-base font-semibold text-foreground">{item.title}</h3>
							<p class="mt-3 text-sm leading-6 text-muted">{item.body}</p>
						</article>
					{/each}
				</div>
			</div>
		</section>

		<section
			id="access"
			class="relative isolate scroll-mt-20 overflow-hidden border-t border-foreground/10 py-20 sm:py-24"
		>
			<DeploymentBackdrop />
			<div
				class="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(circle_at_center,color-mix(in_srgb,var(--background)_72%,transparent)_0%,var(--background)_74%)]"
			></div>
			<div
				class="relative z-10 mx-auto flex w-full max-w-[1120px] flex-col items-center px-6 text-center lg:px-0"
			>
				<p class="text-sm font-semibold text-[color:var(--brand)]">{closingCta.eyebrow}</p>
				<h2 class="mt-4 text-3xl leading-tight font-medium text-foreground sm:text-5xl">
					{closingCta.heading}
				</h2>
				<p class="mt-5 max-w-[620px] text-base leading-7 text-muted sm:text-lg">
					{closingCta.body}
				</p>
				<div class="mt-8 w-full max-w-[560px]">
					<ContactWaitlist />
				</div>
			</div>
		</section>

		<section class="border-t border-foreground/10 py-20 sm:py-24">
			<div class="mx-auto w-full max-w-[1120px] px-6 lg:px-0">
				<TrustStrip />
			</div>
		</section>

		<section id="faq" class="scroll-mt-20 border-t border-foreground/10 py-20 sm:py-24">
			<div class="mx-auto w-full max-w-[860px] px-6">
				<p class="text-sm font-semibold text-[color:var(--brand)]">FAQ</p>
				<h2 class="mt-4 text-3xl leading-tight font-medium text-foreground sm:text-5xl">
					The important details.
				</h2>

				<div class="mt-10 border-y border-foreground/10">
					{#each faqItems as item (item.question)}
						<details class="group border-b border-foreground/10 last:border-b-0">
							<summary
								class="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-left text-base font-semibold text-foreground"
							>
								<span>{item.question}</span>
								<span
									class="text-xl leading-none font-normal text-muted transition-transform duration-300 group-open:rotate-45"
									aria-hidden="true">+</span
								>
							</summary>
							<p class="max-w-[720px] pb-5 text-sm leading-6 text-muted sm:text-base">
								{item.answer}
							</p>
						</details>
					{/each}
				</div>
			</div>
		</section>
	</main>
</div>

<style>
	.hero-balance {
		text-wrap: balance;
	}

	.hero-copy {
		position: relative;
		z-index: 0;
		isolation: isolate;
		text-shadow:
			0 0 10px var(--background),
			0 0 22px var(--background),
			0 0 38px var(--background),
			0 0 54px var(--background);
	}

	.hero-copy::before {
		position: absolute;
		z-index: -1;
		inset: -0.35em -1.1em;
		border-radius: 50%;
		background: color-mix(in srgb, var(--background) 88%, transparent);
		filter: blur(16px);
		content: '';
	}

	.hero-copy-compact::before {
		inset: -0.7em -1.8em;
		background: color-mix(in srgb, var(--background) 94%, transparent);
		filter: blur(18px);
	}

	.hero-rail-label {
		position: relative;
		z-index: 0;
		isolation: isolate;
		text-shadow:
			0 0 8px var(--background),
			0 0 16px var(--background),
			0 0 26px var(--background);
	}

	.hero-rail-label::before {
		position: absolute;
		z-index: -1;
		inset: -0.45em -0.85em;
		border-radius: 999px;
		background: color-mix(in srgb, var(--background) 90%, transparent);
		filter: blur(9px);
		content: '';
	}
</style>
