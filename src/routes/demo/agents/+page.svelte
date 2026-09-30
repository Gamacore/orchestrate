<script lang="ts">
	import { agents } from '$lib/dashboard/mock-data';
</script>

<div class="mx-auto max-w-6xl px-5 py-9 sm:px-8">
	<div class="flex flex-wrap items-end justify-between gap-5">
		<div>
			<p class="text-sm font-medium text-[color:var(--brand)]">Workspace</p>
			<h1 class="mt-1 text-3xl font-semibold tracking-tight">Agents</h1>
			<p class="mt-2 max-w-xl text-sm leading-6 text-slate-500 dark:text-slate-400">
				Configure work that can trade scheduling flexibility for a lower target rate.
			</p>
		</div>
		<a
			href="/demo/agents/new"
			class="rounded-lg bg-[color:var(--brand)] px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[color:var(--brand-strong)]"
			>New agent</a
		>
	</div>
	<div
		class="mt-8 overflow-hidden rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-[#0b1525]"
	>
		{#each agents as agent, index}
			<a
				href={`/demo/agents/${agent.id}`}
				class:top-border={index > 0}
				class="group flex flex-col gap-4 px-5 py-5 hover:bg-slate-50 sm:flex-row sm:items-center sm:justify-between dark:hover:bg-slate-900/50"
			>
				<div class="min-w-0">
					<div class="flex items-center gap-3">
						<h2 class="font-semibold">{agent.name}</h2>
						<span
							class:running={agent.status === 'Running'}
							class:queued={agent.status === 'Queued'}
							class="status-chip">{agent.status}</span
						>
					</div>
					<p class="mt-1 truncate text-sm text-slate-500 dark:text-slate-400">
						{agent.description}
					</p>
				</div>
				<div class="flex shrink-0 items-center gap-6 text-sm">
					<div>
						<p class="text-xs text-slate-400">Window</p>
						<p class="mt-1 font-medium">{agent.window}</p>
					</div>
					<div>
						<p class="text-xs text-slate-400">Last run</p>
						<p class="mt-1 font-medium">{agent.lastRun}</p>
					</div>
					<span class="text-[color:var(--brand)]">View</span>
				</div>
			</a>
		{/each}
	</div>
	<p class="mt-4 text-xs text-slate-500 dark:text-slate-400">
		Demo data only. Agent creation and live run status will connect to the workspace API in
		Milestone 4.
	</p>
</div>

<style>
	.top-border {
		border-top: 1px solid rgb(241 245 249);
	}
	.status-chip {
		display: inline-flex;
		border-radius: 999px;
		background: rgb(241 245 249);
		padding: 0.2rem 0.55rem;
		font-size: 0.75rem;
		font-weight: 500;
		color: rgb(71 85 105);
	}
	.status-chip.running {
		background: rgb(220 252 231);
		color: rgb(22 101 52);
	}
	.status-chip.queued {
		background: rgb(254 249 195);
		color: rgb(133 77 14);
	}
	:global(.dark) .top-border {
		border-color: rgb(30 41 59);
	}
	:global(.dark) .status-chip {
		background: rgb(30 41 59);
		color: rgb(203 213 225);
	}
</style>
