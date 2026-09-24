<script lang="ts">
	import { docsCopy } from '$lib/content/docs';
	import {
		completionWindowOrder,
		completionWindows,
		pricingCopy
	} from '$lib/pricing/completion-windows';
	import { MarketingHeader } from '$lib/ui';

	const windows = completionWindowOrder.map((key) => completionWindows[key]);

	function currency(value: number) {
		return `$${value.toFixed(2)}`;
	}
</script>

<svelte:head>
	<title>Docs | Arcten</title>
	<meta
		name="description"
		content="Preview the proposed Arcten API, completion windows, target rates, and private-model workflow."
	/>
</svelte:head>

<div class="min-h-screen bg-background text-foreground">
	<MarketingHeader />

	<main class="mx-auto w-full max-w-[960px] px-6 py-16 sm:py-24">
		<header class="max-w-[760px]">
			<p class="text-sm font-semibold text-[color:var(--brand)]">{docsCopy.eyebrow}</p>
			<h1 class="mt-4 text-4xl leading-[1.08] font-medium text-foreground sm:text-6xl">
				{docsCopy.heading}
			</h1>
			<p class="mt-6 max-w-[700px] text-base leading-7 text-muted sm:text-lg">
				{docsCopy.intro}
			</p>
		</header>

		<nav
			class="mt-10 flex flex-wrap gap-x-6 gap-y-3 border-y border-foreground/10 py-4 text-sm font-medium text-muted"
			aria-label="Documentation sections"
		>
			<a href="#quickstart" class="hover:text-foreground focus-visible:text-foreground"
				>Quickstart</a
			>
			<a href="#windows" class="hover:text-foreground focus-visible:text-foreground"
				>Completion windows</a
			>
			<a href="#request" class="hover:text-foreground focus-visible:text-foreground"
				>Request shape</a
			>
			<a href="#private-models" class="hover:text-foreground focus-visible:text-foreground"
				>Private models</a
			>
		</nav>

		<section id="quickstart" class="scroll-mt-28 py-16 sm:py-20">
			<div class="grid gap-8 md:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] md:gap-12">
				<div>
					<p class="text-xs font-semibold tracking-[0.12em] text-muted uppercase">Quickstart</p>
					<h2 class="mt-3 text-2xl font-semibold text-foreground">Proposed API surface.</h2>
					<p class="mt-4 text-sm leading-6 text-muted">
						{docsCopy.statusNote}
					</p>
				</div>

				<div class="min-w-0 overflow-hidden rounded-lg border border-foreground/10 bg-[#07101f]">
					<div
						class="flex items-center justify-between border-b border-white/10 px-4 py-3 font-mono text-[0.68rem] text-white/60"
					>
						<span>quickstart.py</span>
						<span>Python</span>
					</div>
					<pre
						class="overflow-x-auto p-5 font-mono text-[0.72rem] leading-6 text-[#eff4ff] sm:p-6 sm:text-[0.78rem]"><code
							>{docsCopy.quickstartCode}</code
						></pre>
				</div>
			</div>
		</section>

		<section id="windows" class="scroll-mt-28 border-t border-foreground/10 py-16 sm:py-20">
			<div class="max-w-[700px]">
				<p class="text-xs font-semibold tracking-[0.12em] text-muted uppercase">Service tiers</p>
				<h2 class="mt-3 text-2xl font-semibold text-foreground">
					Choose when the work must finish.
				</h2>
				<p class="mt-4 text-sm leading-6 text-muted">
					The intended contract keeps the model and API stable. A longer completion window gives
					Arcten more room to use available capacity efficiently.
				</p>
			</div>

			<div class="mt-8 overflow-x-auto border-y border-foreground/10">
				<table class="w-full min-w-[680px] border-collapse text-left">
					<caption class="sr-only">Preview GLM-5.2 token rates by completion window</caption>
					<thead>
						<tr
							class="border-b border-foreground/10 text-xs tracking-[0.08em] text-muted uppercase"
						>
							<th class="px-3 py-4 font-medium">Window</th>
							<th class="px-3 py-4 font-medium">API value</th>
							<th class="px-3 py-4 text-right font-medium">Input /M</th>
							<th class="px-3 py-4 text-right font-medium">Cache read /M</th>
							<th class="px-3 py-4 text-right font-medium">Output /M</th>
						</tr>
					</thead>
					<tbody class="font-mono text-sm">
						{#each windows as window (window.key)}
							<tr class="border-b border-foreground/10 last:border-b-0">
								<td class="px-3 py-4 font-sans font-semibold text-foreground">{window.label}</td>
								<td class="px-3 py-4 text-muted">{window.apiValue}</td>
								<td class="px-3 py-4 text-right text-foreground">{currency(window.inputRate)}</td>
								<td class="px-3 py-4 text-right text-foreground">{currency(window.cachedRate)}</td>
								<td class="px-3 py-4 text-right text-foreground">{currency(window.outputRate)}</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
			<p class="mt-4 text-xs leading-5 text-muted">{pricingCopy.lockNotice}</p>
		</section>

		<section id="request" class="scroll-mt-28 border-t border-foreground/10 py-16 sm:py-20">
			<div class="grid gap-8 md:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] md:gap-12">
				<div>
					<p class="text-xs font-semibold tracking-[0.12em] text-muted uppercase">Request shape</p>
					<h2 class="mt-3 text-2xl font-semibold text-foreground">
						Only the controls that matter.
					</h2>
				</div>

				<dl class="border-y border-foreground/10">
					{#each docsCopy.requestFields as field (field.name)}
						<div class="border-b border-foreground/10 py-5 last:border-b-0">
							<dt class="font-mono text-sm font-semibold text-foreground">{field.name}</dt>
							<dd class="mt-2 text-sm leading-6 text-muted">{field.detail}</dd>
						</div>
					{/each}
				</dl>
			</div>
		</section>

		<section id="private-models" class="scroll-mt-28 border-y border-foreground/10 py-16 sm:py-20">
			<div class="grid gap-8 md:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] md:gap-12">
				<div>
					<p class="text-xs font-semibold tracking-[0.12em] text-muted uppercase">Private models</p>
					<h2 class="mt-3 text-2xl font-semibold text-foreground">
						Private-model design partners.
					</h2>
				</div>
				<div>
					<p class="text-sm leading-6 text-muted">{docsCopy.customModels}</p>
					<a
						href="mailto:founders@arcten.com?subject=Private%20model%20on%20Arcten"
						class="mt-6 inline-flex items-center rounded-full bg-[color:var(--brand)] px-5 py-3 text-sm font-semibold text-white hover:-translate-y-0.5 hover:bg-[color:var(--brand-strong)] focus-visible:-translate-y-0.5 focus-visible:bg-[color:var(--brand-strong)]"
					>
						Discuss the preview
					</a>
				</div>
			</div>
		</section>
	</main>
</div>
