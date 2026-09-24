<script lang="ts">
	import type { Snippet } from 'svelte';

	let { id, children } = $props<{ id: string; children?: Snippet }>();
</script>

<a href={`#${id}`} class="inline-block">
	<h2 {id} class="mb-4 text-[0.95rem] font-semibold tracking-tight text-foreground">
		{@render children?.()}
	</h2>
</a>
