<script lang="ts">
	let {
		title,
		description,
		integration
	}: { title: string; description: string; integration: string } = $props();
</script>

<div class="mx-auto max-w-6xl px-5 py-9 sm:px-8">
	<p class="text-sm font-medium text-[color:var(--brand)]">Workspace</p>
	<h1 class="mt-1 text-3xl font-semibold tracking-tight">{title}</h1>
	<p class="mt-2 max-w-xl text-sm leading-6 text-slate-500 dark:text-slate-400">{description}</p>
	<section
		class="mt-8 max-w-2xl rounded-xl border border-dashed border-slate-300 bg-white p-6 dark:border-slate-700 dark:bg-[#0b1525]"
	>
		<p class="text-sm font-semibold">Frontend placeholder</p>
		<p class="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">{integration}</p>
		<span
			class="mt-5 inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-500 dark:bg-slate-800 dark:text-slate-300"
			>Backend connection pending</span
		>
	</section>
</div>
