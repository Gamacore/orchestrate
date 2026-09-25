<script lang="ts">
	const requests = [
		{
			agent: 'research-scout',
			model: 'GLM-5.2',
			window: 'Flex',
			tokens: '84.2k',
			status: 'Running'
		},
		{
			agent: 'eval-runner',
			model: 'GLM-5.2',
			window: 'Standard',
			tokens: '42.8k',
			status: 'Queued'
		},
		{
			agent: 'catalog-enricher',
			model: 'GLM-5.2',
			window: 'Priority',
			tokens: '12.4k',
			status: 'Complete'
		}
	];
</script>

<div class="mx-auto max-w-6xl px-5 py-9 sm:px-8">
	<div class="flex flex-wrap items-end justify-between gap-5">
		<div>
			<p class="text-sm font-medium text-[color:var(--brand)]">Workspace</p>
			<h1 class="mt-1 text-3xl font-semibold tracking-tight">Overview</h1>
			<p class="mt-2 max-w-xl text-sm leading-6 text-slate-500 dark:text-slate-400">
				Monitor long-running work, choose the right completion window, and keep cost aligned with
				urgency.
			</p>
		</div>
		<a
			href="/demo/agents"
			class="rounded-lg bg-[color:var(--brand)] px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[color:var(--brand-strong)]"
			>New agent</a
		>
	</div>
	<div class="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
		<div class="dashboard-card">
			<p>Tokens this month</p>
			<strong>2.84M</strong><span class="positive">+18.4%</span>
		</div>
		<div class="dashboard-card">
			<p>Estimated spend</p>
			<strong>$184.20</strong><span>Preview rate</span>
		</div>
		<div class="dashboard-card">
			<p>Active agents</p>
			<strong>4</strong><span>2 running now</span>
		</div>
		<div class="dashboard-card">
			<p>Flex savings</p>
			<strong>38%</strong><span>vs. immediate</span>
		</div>
	</div>
	<section
		class="mt-7 overflow-hidden rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-[#0b1525]"
	>
		<div
			class="flex items-center justify-between border-b border-slate-200 px-5 py-4 dark:border-slate-800"
		>
			<div>
				<h2 class="text-sm font-semibold">Recent work</h2>
				<p class="mt-0.5 text-xs text-slate-500">Latest requests across your agents</p>
			</div>
			<a href="/demo/agents" class="text-sm font-medium text-[color:var(--brand)]">View all</a>
		</div>
		<div class="overflow-x-auto">
			<table class="w-full min-w-[640px] text-left text-sm">
				<thead
					class="bg-slate-50 text-xs font-medium text-slate-500 dark:bg-slate-900/50 dark:text-slate-400"
					><tr><th>Agent</th><th>Model</th><th>Window</th><th>Tokens</th><th>Status</th></tr></thead
				><tbody
					>{#each requests as request}<tr class="border-t border-slate-100 dark:border-slate-800"
							><td class="font-medium">{request.agent}</td><td>{request.model}</td><td
								>{request.window}</td
							><td>{request.tokens}</td><td>{request.status}</td></tr
						>{/each}</tbody
				>
			</table>
		</div>
	</section>
</div>

<style>
	.dashboard-card {
		border: 1px solid rgb(226 232 240);
		border-radius: 0.75rem;
		background: white;
		padding: 1.25rem;
	}
	:global(.dark) .dashboard-card {
		border-color: rgb(30 41 59);
		background: #0b1525;
	}
	.dashboard-card p,
	.dashboard-card span {
		color: rgb(100 116 139);
		font-size: 0.78rem;
		font-weight: 500;
	}
	.dashboard-card strong {
		display: block;
		margin-top: 0.45rem;
		font-size: 1.5rem;
		letter-spacing: -0.04em;
	}
	.dashboard-card span {
		display: block;
		margin-top: 0.35rem;
		font-size: 0.75rem;
	}
	.dashboard-card .positive {
		color: rgb(5 150 105);
	}
	table th,
	table td {
		padding: 0.9rem 1.25rem;
	}
	table td {
		color: rgb(71 85 105);
	}
</style>
