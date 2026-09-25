<script lang="ts">
	import { page } from '$app/state';
	import { dashboardNavigation } from '$lib/dashboard/navigation';
	let { children } = $props();
</script>

<svelte:head
	><title>Arcten Dashboard</title><meta name="robots" content="noindex, nofollow" /></svelte:head
>

<div class="min-h-screen bg-[#f7f9fd] text-slate-950 dark:bg-[#08111f] dark:text-slate-100">
	<div class="flex min-h-screen">
		<aside
			class="hidden w-64 shrink-0 flex-col border-r border-slate-200 bg-white px-4 py-5 md:flex dark:border-slate-800 dark:bg-[#0b1525]"
		>
			<a href="/" class="mb-9 flex items-center gap-2.5 px-2 text-[color:var(--brand)]"
				><span
					class="grid h-7 w-7 place-items-center rounded-lg bg-[color:var(--brand)] text-sm font-bold text-white"
					>A</span
				><span class="text-base font-semibold tracking-tight">Arcten</span></a
			>
			<p class="px-2 pb-2 text-[11px] font-semibold tracking-[0.1em] text-slate-400 uppercase">
				Platform
			</p>
			<nav class="space-y-1" aria-label="Dashboard navigation">
				{#each dashboardNavigation as item}<a
						href={item.href}
						class:dashboard-nav-active={page.url.pathname === item.href}
						class="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-500 hover:bg-slate-100 hover:text-slate-950 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
						><span class="grid h-4 w-4 place-items-center rounded text-[10px] font-semibold"
							>{item.icon}</span
						>{item.label}</a
					>{/each}
			</nav>
			<div
				class="mt-auto rounded-xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-900/60"
			>
				<p class="text-xs font-medium text-slate-900 dark:text-slate-100">Early access</p>
				<p class="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">
					Your workspace is connected to preview routes.
				</p>
			</div>
		</aside>
		<main class="min-w-0 flex-1">
			<header
				class="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-5 sm:px-8 dark:border-slate-800 dark:bg-[#0b1525]"
			>
				<div class="flex items-center gap-3">
					<a href="/" class="font-semibold text-[color:var(--brand)] md:hidden">Arcten</a>
					<p class="text-sm font-medium text-slate-500 dark:text-slate-400">
						acme / <span class="text-slate-900 dark:text-white">production</span>
					</p>
				</div>
				<div class="flex items-center gap-3">
					<span class="hidden text-sm text-slate-500 sm:inline">alex@acme.ai</span><span
						class="grid h-8 w-8 place-items-center rounded-full bg-slate-900 text-xs font-semibold text-white dark:bg-slate-200 dark:text-slate-900"
						>AK</span
					>
				</div>
			</header>
			{@render children()}
		</main>
	</div>
</div>

<style>
	:global(.dashboard-nav-active) {
		background: color-mix(in srgb, var(--brand) 12%, transparent);
		color: var(--brand);
	}
</style>
