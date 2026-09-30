<script lang="ts">
	import { completionWindows } from '$lib/dashboard/mock-data';
	let selectedWindow = $state('Standard');
</script>

<div class="mx-auto max-w-3xl px-5 py-9 sm:px-8">
	<a href="/demo/agents" class="text-sm font-medium text-[color:var(--brand)]">Back to agents</a>
	<h1 class="mt-5 text-3xl font-semibold tracking-tight">New agent</h1>
	<p class="mt-2 text-sm text-slate-500 dark:text-slate-400">
		Define the scheduling contract before connecting an execution backend.
	</p>
	<form
		class="mt-8 space-y-6 rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-[#0b1525]"
	>
		<label class="block text-sm font-medium"
			>Agent name<input placeholder="e.g. Research scout" class="field mt-2" /></label
		><label class="block text-sm font-medium"
			>Model<select class="field mt-2"
				><option>GLM-5.2</option><option disabled>More models coming soon</option></select
			></label
		>
		<fieldset>
			<legend class="text-sm font-medium">Completion window</legend>
			<div class="mt-3 grid gap-2 sm:grid-cols-2">
				{#each completionWindows as window}<button
						type="button"
						onclick={() => (selectedWindow = window.name)}
						class:selected={selectedWindow === window.name}
						class="window-choice"
						><strong>{window.name}</strong><span>{window.detail} · {window.price}</span></button
					>{/each}
			</div>
		</fieldset>
		<div class="flex justify-end gap-3">
			<a href="/demo/agents" class="rounded-lg px-4 py-2.5 text-sm font-semibold">Cancel</a><button
				type="button"
				class="rounded-lg bg-[color:var(--brand)] px-4 py-2.5 text-sm font-semibold text-white"
				>Create agent</button
			>
		</div>
		<p class="text-xs text-slate-500">
			Demo only: creation is intentionally not connected to a backend yet.
		</p>
	</form>
</div>

<style>
	.field {
		width: 100%;
		border: 1px solid rgb(203 213 225);
		border-radius: 0.5rem;
		background: transparent;
		padding: 0.65rem 0.75rem;
		font-size: 0.875rem;
	}
	.window-choice {
		border: 1px solid rgb(226 232 240);
		border-radius: 0.5rem;
		padding: 0.75rem;
		text-align: left;
	}
	.window-choice.selected {
		border-color: var(--brand);
		background: color-mix(in srgb, var(--brand) 7%, transparent);
	}
	.window-choice span {
		display: block;
		margin-top: 0.25rem;
		color: rgb(100 116 139);
		font-size: 0.75rem;
	}
	:global(.dark) .field,
	:global(.dark) .window-choice {
		border-color: rgb(51 65 85);
	}
</style>
