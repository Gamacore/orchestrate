<script lang="ts">
	import { page } from '$app/state';
	import { agents, completionWindows } from '$lib/dashboard/mock-data';
	const agent = $derived(agents.find((item) => item.id === page.params.id) ?? agents[0]);
</script>

<div class="mx-auto max-w-6xl px-5 py-9 sm:px-8">
	<a href="/demo/agents" class="text-sm font-medium text-[color:var(--brand)]">Back to agents</a>
	<div class="mt-5 flex flex-wrap items-end justify-between gap-5">
		<div>
			<p class="text-sm font-medium text-[color:var(--brand)]">Agent</p>
			<h1 class="mt-1 text-3xl font-semibold tracking-tight">{agent.name}</h1>
			<p class="mt-2 max-w-xl text-sm leading-6 text-slate-500 dark:text-slate-400">
				{agent.description}
			</p>
		</div>
		<a
			href={`/demo/agents/${agent.id}/edit`}
			class="rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-semibold hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800"
			>Edit agent</a
		>
	</div>
	<div class="mt-8 grid gap-5 lg:grid-cols-[1.2fr_.8fr]">
		<section
			class="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-[#0b1525]"
		>
			<h2 class="text-sm font-semibold">Current run</h2>
			<dl class="mt-5 grid grid-cols-2 gap-5 text-sm">
				<div>
					<dt>State</dt>
					<dd>{agent.status}</dd>
				</div>
				<div>
					<dt>Target window</dt>
					<dd>{agent.window}</dd>
				</div>
				<div>
					<dt>Tokens processed</dt>
					<dd>{agent.tokens}</dd>
				</div>
				<div>
					<dt>Estimated cost</dt>
					<dd>{agent.estimatedCost}</dd>
				</div>
			</dl>
			<div
				class="mt-6 rounded-lg bg-slate-50 p-4 text-sm text-slate-500 dark:bg-slate-900/60 dark:text-slate-400"
			>
				Run input, delivery estimate, output, retry, cancellation, and failure detail are
				placeholders until request APIs are connected.
			</div>
		</section>
		<section
			class="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-[#0b1525]"
		>
			<h2 class="text-sm font-semibold">Completion window</h2>
			<div class="mt-4 space-y-2">
				{#each completionWindows as window}<div
						class:chosen={window.name === agent.window}
						class="window-option"
					>
						<span><strong>{window.name}</strong><small>{window.detail}</small></span><small
							>{window.price}</small
						>
					</div>{/each}
			</div>
		</section>
	</div>
</div>

<style>
	dt {
		color: rgb(100 116 139);
		font-size: 0.75rem;
	}
	dd {
		margin-top: 0.25rem;
		font-weight: 600;
	}
	.window-option {
		display: flex;
		align-items: center;
		justify-content: space-between;
		border: 1px solid rgb(226 232 240);
		border-radius: 0.5rem;
		padding: 0.65rem 0.75rem;
	}
	.window-option.chosen {
		border-color: var(--brand);
		background: color-mix(in srgb, var(--brand) 7%, transparent);
	}
	.window-option small {
		display: block;
		margin-top: 0.15rem;
		color: rgb(100 116 139);
		font-size: 0.7rem;
	}
	:global(.dark) .window-option {
		border-color: rgb(51 65 85);
	}
</style>
