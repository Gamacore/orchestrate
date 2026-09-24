<script lang="ts">
	import type { Snippet } from 'svelte';

	let { name, children } = $props<{ name: string; children?: Snippet }>();
</script>

<div class="mr-2 inline-flex min-h-6 items-center gap-2">
	<span
		class="inline-flex h-6 w-6 -translate-y-px items-center justify-center"
		aria-hidden="true"
	>
		{@render children?.()}
	</span>
	<span class="inline-flex min-h-6 items-center text-sm font-medium">{name}</span>
</div>
