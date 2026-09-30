<script lang="ts">
	let range = $state('30 days');
	const windowUsage = [
		{ name: 'Now', tokens: '0.36M', spend: '$48.10', share: 13 },
		{ name: 'Priority', tokens: '0.48M', spend: '$39.84', share: 17 },
		{ name: 'Standard', tokens: '0.76M', spend: '$48.26', share: 27 },
		{ name: 'Flex', tokens: '1.24M', spend: '$47.99', share: 43 }
	];
</script>

<div class="mx-auto max-w-6xl px-5 py-9 sm:px-8">
	<div class="flex flex-wrap items-end justify-between gap-5">
		<div>
			<p class="text-sm font-medium text-[color:var(--brand)]">Workspace</p>
			<h1 class="mt-1 text-3xl font-semibold tracking-tight">Usage</h1>
			<p class="mt-2 max-w-xl text-sm leading-6 text-slate-500 dark:text-slate-400">
				See where completion flexibility reduces the target rate.
			</p>
		</div>
		<div class="flex rounded-lg border border-slate-200 p-1 dark:border-slate-700">
			{#each ['7 days', '30 days', '90 days'] as option}<button
					onclick={() => (range = option)}
					class:chosen={range === option}
					class="range-button">{option}</button
				>{/each}
		</div>
	</div>
	<div class="mt-8 grid gap-4 sm:grid-cols-3">
		<div class="usage-card">
			<p>Tokens</p>
			<strong>2.84M</strong><span>During {range}</span>
		</div>
		<div class="usage-card">
			<p>Estimated spend</p>
			<strong>$184.20</strong><span>Preview rates</span>
		</div>
		<div class="usage-card">
			<p>Flex savings</p>
			<strong>38%</strong><span>Compared with Now</span>
		</div>
	</div>
	<section
		class="mt-7 rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-[#0b1525]"
	>
		<div class="flex items-center justify-between">
			<div>
				<h2 class="text-sm font-semibold">Completion-window breakdown</h2>
				<p class="mt-1 text-xs text-slate-500">Representative usage during {range}</p>
			</div>
			<button class="text-sm font-semibold text-[color:var(--brand)]">Export CSV</button>
		</div>
		<div class="mt-6 space-y-5">
			{#each windowUsage as window}<div
					class="grid gap-2 sm:grid-cols-[100px_1fr_100px_80px] sm:items-center"
				>
					<strong class="text-sm">{window.name}</strong>
					<div class="h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
						<div
							class="h-full rounded-full bg-[color:var(--brand)]"
							style={`width: ${window.share}%`}
						></div>
					</div>
					<span class="text-sm text-slate-500">{window.tokens}</span><span
						class="text-right text-sm font-medium">{window.spend}</span
					>
				</div>{/each}
		</div>
	</section>
	<section
		class="mt-7 rounded-xl border border-dashed border-slate-300 bg-white p-5 dark:border-slate-700 dark:bg-[#0b1525]"
	>
		<h2 class="text-sm font-semibold">Budget alerts</h2>
		<p class="mt-1 text-sm text-slate-500 dark:text-slate-400">
			No budget configured. Backend-backed alerts will be added with workspace controls.
		</p>
		<button
			class="mt-4 rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold dark:border-slate-700"
			>Set a budget</button
		>
	</section>
</div>

<style>
	.range-button {
		border-radius: 0.375rem;
		padding: 0.4rem 0.65rem;
		color: rgb(100 116 139);
		font-size: 0.75rem;
		font-weight: 600;
	}
	.range-button.chosen {
		background: var(--brand);
		color: white;
	}
	.usage-card {
		border: 1px solid rgb(226 232 240);
		border-radius: 0.75rem;
		background: white;
		padding: 1.25rem;
	}
	.usage-card p,
	.usage-card span {
		color: rgb(100 116 139);
		font-size: 0.78rem;
		font-weight: 500;
	}
	.usage-card strong {
		display: block;
		margin-top: 0.45rem;
		font-size: 1.5rem;
		letter-spacing: -0.04em;
	}
	.usage-card span {
		display: block;
		margin-top: 0.35rem;
		font-size: 0.75rem;
	}
	:global(.dark) .usage-card {
		border-color: rgb(30 41 59);
		background: #0b1525;
	}
</style>
