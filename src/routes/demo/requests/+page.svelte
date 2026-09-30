<script lang="ts">
	import DashboardDataState from '$lib/dashboard/DashboardDataState.svelte';

	type RequestStatus = 'Running' | 'Queued' | 'Complete' | 'Failed';
	type DataState = 'ready' | 'loading' | 'empty' | 'error' | 'forbidden';
	type Request = {
		id: string;
		agent: string;
		window: string;
		submitted: string;
		eta: string;
		cost: string;
		status: RequestStatus;
		error?: string;
	};

	let filter = $state<'All' | RequestStatus>('All');
	let dataState = $state<DataState>('ready');
	let requests = $state<Request[]>([
		{
			id: 'req_01HVX2',
			agent: 'research-scout',
			window: 'Flex',
			submitted: '2 min ago',
			eta: 'Within 22 min',
			cost: '$2.84',
			status: 'Running'
		},
		{
			id: 'req_01HVW9',
			agent: 'eval-runner',
			window: 'Standard',
			submitted: '8 min ago',
			eta: 'Within 4 min',
			cost: '$1.92',
			status: 'Queued'
		},
		{
			id: 'req_01HVQ3',
			agent: 'catalog-enricher',
			window: 'Priority',
			submitted: '34 min ago',
			eta: 'Delivered',
			cost: '$0.88',
			status: 'Complete'
		},
		{
			id: 'req_01HVP7',
			agent: 'research-scout',
			window: 'Flex',
			submitted: '1 hr ago',
			eta: 'Action needed',
			cost: '$0.00',
			status: 'Failed',
			error: 'Route capacity changed before scheduling.'
		}
	]);
	const visibleRequests = $derived(
		filter === 'All' ? requests : requests.filter((request) => request.status === filter)
	);

	function retry(id: string) {
		requests = requests.map((request) =>
			request.id === id
				? { ...request, status: 'Queued', eta: 'Within 5 min', error: undefined }
				: request
		);
	}

	function cancel(id: string) {
		requests = requests.map((request) =>
			request.id === id
				? {
						...request,
						status: 'Failed',
						eta: 'Cancelled',
						error: 'Cancelled in this demo session.'
					}
				: request
		);
	}
</script>

<div class="mx-auto max-w-6xl px-5 py-9 sm:px-8">
	<p class="text-sm font-medium text-[color:var(--brand)]">Operations</p>
	<h1 class="mt-1 text-3xl font-semibold tracking-tight">Requests</h1>
	<p class="mt-2 max-w-2xl text-sm leading-6 text-slate-500 dark:text-slate-400">
		Track scheduled work from submission through delivery. Completion windows set a target, not a
		delivery guarantee.
	</p>
	<div class="mt-6 flex flex-wrap items-center justify-between gap-4">
		<div class="flex flex-wrap gap-2" aria-label="Filter requests by state">
			{#each ['All', 'Running', 'Queued', 'Complete', 'Failed'] as status}
				<button
					aria-pressed={filter === status}
					onclick={() => (filter = status as typeof filter)}
					class:active-filter={filter === status}
					class="filter-button">{status}</button
				>
			{/each}
		</div>
		<label class="text-xs font-medium text-slate-500"
			>Preview state <select
				bind:value={dataState}
				class="ml-2 rounded-md border border-slate-200 bg-transparent px-2 py-1.5 dark:border-slate-700"
				><option value="ready">Ready</option><option value="loading">Loading</option><option
					value="empty">Empty</option
				><option value="error">Error</option><option value="forbidden">No access</option></select
			></label
		>
	</div>
	<DashboardDataState state={dataState} onRetry={() => (dataState = 'ready')}>
		<section
			class="mt-5 overflow-hidden rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-[#0b1525]"
		>
			<div class="overflow-x-auto">
				<table class="w-full min-w-[760px] text-left text-sm">
					<caption class="sr-only"
						>Inference requests filtered by {filter.toLowerCase()} state</caption
					>
					<thead
						><tr
							><th>Request</th><th>Window</th><th>Submitted</th><th>Delivery</th><th>Cost</th><th
								>State</th
							><th><span class="sr-only">Actions</span></th></tr
						></thead
					><tbody
						>{#each visibleRequests as request}<tr
								><td
									><a
										href={`/demo/agents/${request.agent}`}
										class="font-medium hover:text-[color:var(--brand)]">{request.agent}</a
									><small>{request.id}</small>{#if request.error}<small class="error-text"
											>{request.error}</small
										>{/if}</td
								><td>{request.window}</td><td>{request.submitted}</td><td>{request.eta}</td><td
									>{request.cost}</td
								><td
									><span
										class:running={request.status === 'Running'}
										class:queued={request.status === 'Queued'}
										class:failed={request.status === 'Failed'}
										class="status-chip">{request.status}</span
									></td
								><td
									>{#if request.status === 'Failed'}<button
											aria-label={`Retry ${request.id}`}
											onclick={() => retry(request.id)}
											class="action-button">Retry</button
										>{:else if request.status === 'Queued' || request.status === 'Running'}<button
											aria-label={`Cancel ${request.id}`}
											onclick={() => cancel(request.id)}
											class="action-button">Cancel</button
										>{/if}</td
								></tr
							>{/each}</tbody
					>
				</table>
			</div>
			{#if visibleRequests.length === 0}<div
					class="border-t border-slate-100 px-5 py-12 text-center text-sm text-slate-500 dark:border-slate-800"
				>
					No {filter.toLowerCase()} requests in this workspace.
				</div>{/if}
		</section>
	</DashboardDataState>
	<p class="mt-4 text-xs text-slate-500 dark:text-slate-400">
		Retry and cancel update local demo state only. They will call authenticated request APIs when
		the control plane exists.
	</p>
</div>

<style>
	.filter-button {
		border: 1px solid rgb(226 232 240);
		border-radius: 999px;
		padding: 0.4rem 0.75rem;
		color: rgb(71 85 105);
		font-size: 0.8rem;
		font-weight: 600;
	}
	.filter-button:hover,
	.filter-button.active-filter {
		border-color: var(--brand);
		background: color-mix(in srgb, var(--brand) 8%, transparent);
		color: var(--brand);
	}
	table th,
	table td {
		padding: 1rem 1.25rem;
		vertical-align: top;
	}
	table th {
		background: rgb(248 250 252);
		color: rgb(100 116 139);
		font-size: 0.75rem;
		font-weight: 600;
	}
	table tr {
		border-top: 1px solid rgb(241 245 249);
	}
	table td {
		color: rgb(71 85 105);
	}
	td small {
		display: block;
		margin-top: 0.2rem;
		color: rgb(148 163 184);
		font-size: 0.72rem;
	}
	.error-text {
		color: rgb(185 28 28);
	}
	.status-chip {
		display: inline-flex;
		border-radius: 999px;
		background: rgb(241 245 249);
		padding: 0.2rem 0.55rem;
		font-size: 0.75rem;
		font-weight: 600;
	}
	.status-chip.running {
		background: rgb(220 252 231);
		color: rgb(22 101 52);
	}
	.status-chip.queued {
		background: rgb(254 249 195);
		color: rgb(133 77 14);
	}
	.status-chip.failed {
		background: rgb(254 226 226);
		color: rgb(185 28 28);
	}
	.action-button {
		color: var(--brand);
		font-size: 0.8rem;
		font-weight: 600;
	}
	.action-button:hover {
		text-decoration: underline;
	}
	:global(.dark) table th {
		background: rgb(15 23 42);
	}
	:global(.dark) table tr {
		border-color: rgb(30 41 59);
	}
	:global(.dark) table td {
		color: rgb(203 213 225);
	}
	:global(.dark) .filter-button {
		border-color: rgb(51 65 85);
		color: rgb(203 213 225);
	}
</style>
