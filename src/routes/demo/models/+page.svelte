<script lang="ts">
	let showAvailable = $state(true);
	const models = [
		{
			name: 'GLM-5.2',
			context: '128k context',
			route: 'Healthy',
			availability: 'Available',
			detail: 'General-purpose agent and batch workloads'
		},
		{
			name: 'Private checkpoint',
			context: 'Your deployment',
			route: 'Preview',
			availability: 'Coming soon',
			detail: 'Dedicated checkpoint or LoRA for design partners'
		},
		{
			name: 'Open model catalog',
			context: 'Route dependent',
			route: 'Planned',
			availability: 'Coming soon',
			detail: 'Additional frontier open-model routes'
		}
	];
	const visibleModels = $derived(
		showAvailable ? models.filter((model) => model.availability === 'Available') : models
	);
</script>

<div class="mx-auto max-w-6xl px-5 py-9 sm:px-8">
	<div class="flex flex-wrap items-end justify-between gap-5">
		<div>
			<p class="text-sm font-medium text-[color:var(--brand)]">Workspace</p>
			<h1 class="mt-1 text-3xl font-semibold tracking-tight">Models</h1>
			<p class="mt-2 max-w-xl text-sm leading-6 text-slate-500 dark:text-slate-400">
				Model availability and route status for this environment.
			</p>
		</div>
		<label class="flex items-center gap-2 text-sm font-medium"
			><input
				type="checkbox"
				checked={showAvailable}
				onchange={(event) => (showAvailable = event.currentTarget.checked)}
			/> Available only</label
		>
	</div>
	<div class="mt-8 grid gap-4 lg:grid-cols-3">
		{#each visibleModels as model}<article
				class="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-[#0b1525]"
			>
				<div class="flex items-start justify-between gap-4">
					<div>
						<h2 class="font-semibold">{model.name}</h2>
						<p class="mt-1 text-xs text-slate-500">{model.context}</p>
					</div>
					<span class:healthy={model.route === 'Healthy'} class="route-chip">{model.route}</span>
				</div>
				<p class="mt-5 min-h-10 text-sm leading-6 text-slate-500 dark:text-slate-400">
					{model.detail}
				</p>
				<div
					class="mt-5 border-t border-slate-100 pt-4 text-xs text-slate-500 dark:border-slate-800"
				>
					<span>Completion windows: </span><strong>Now · Priority · Standard · Flex</strong>
				</div>
			</article>{:else}<div
				class="rounded-xl border border-dashed border-slate-300 p-8 text-sm text-slate-500 dark:border-slate-700"
			>
				No models match this filter.
			</div>{/each}
	</div>
	<p class="mt-5 text-xs text-slate-500">
		Route health is representative. The control plane will provide live capacity, pricing, and
		availability.
	</p>
</div>

<style>
	.route-chip {
		border-radius: 999px;
		background: rgb(241 245 249);
		padding: 0.2rem 0.5rem;
		color: rgb(71 85 105);
		font-size: 0.7rem;
		font-weight: 600;
	}
	.route-chip.healthy {
		background: rgb(220 252 231);
		color: rgb(22 101 52);
	}
	:global(.dark) .route-chip {
		background: rgb(30 41 59);
		color: rgb(203 213 225);
	}
</style>
