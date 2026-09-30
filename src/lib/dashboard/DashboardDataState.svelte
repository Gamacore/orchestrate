<script lang="ts">
	import type { Snippet } from 'svelte';
	type DataState = 'ready' | 'loading' | 'empty' | 'error' | 'forbidden';
	let {
		state = 'ready',
		children,
		onRetry
	}: { state?: DataState; children: Snippet; onRetry?: () => void } = $props();
</script>

{#if state === 'ready'}
	{@render children()}
{:else if state === 'loading'}
	<div class="state-panel" role="status" aria-live="polite">
		<div class="h-3 w-28 animate-pulse rounded bg-slate-200 dark:bg-slate-700"></div>
		<div class="mt-4 h-3 w-full animate-pulse rounded bg-slate-100 dark:bg-slate-800"></div>
		<div class="mt-2 h-3 w-3/4 animate-pulse rounded bg-slate-100 dark:bg-slate-800"></div>
		<span class="sr-only">Loading dashboard data</span>
	</div>
{:else if state === 'empty'}
	<div class="state-panel" role="status">
		<h2>No data yet</h2>
		<p>New activity will appear here after the first request is submitted.</p>
	</div>
{:else if state === 'error'}
	<div class="state-panel" role="alert">
		<h2>Data could not be loaded</h2>
		<p>The dashboard service did not return a response. Your data has not been changed.</p>
		{#if onRetry}<button type="button" onclick={onRetry}>Try again</button>{/if}
	</div>
{:else}
	<div class="state-panel" role="alert">
		<h2>Access required</h2>
		<p>Your workspace role does not allow access to this information.</p>
	</div>
{/if}

<style>
	.state-panel {
		margin-top: 1.25rem;
		border: 1px dashed rgb(203 213 225);
		border-radius: 0.75rem;
		background: white;
		padding: 2rem;
		color: rgb(71 85 105);
		font-size: 0.875rem;
	}
	.state-panel h2 {
		color: rgb(15 23 42);
		font-weight: 600;
	}
	.state-panel p {
		margin-top: 0.4rem;
		line-height: 1.5;
	}
	.state-panel button {
		margin-top: 1rem;
		border-radius: 0.5rem;
		background: var(--brand);
		padding: 0.5rem 0.75rem;
		color: white;
		font-weight: 600;
	}
	:global(.dark) .state-panel {
		border-color: rgb(51 65 85);
		background: #0b1525;
		color: rgb(148 163 184);
	}
	:global(.dark) .state-panel h2 {
		color: rgb(241 245 249);
	}
</style>
