<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		as = 'div',
		width = 'var(--content-width)',
		className = '',
		children
	} = $props<{
		as?: keyof HTMLElementTagNameMap;
		width?: string;
		className?: string;
		children?: Snippet;
	}>();
</script>

<svelte:element
	this={as}
	class={`mx-auto max-w-full ${className}`.trim()}
	style={`width: ${width};`}
>
	{@render children?.()}
</svelte:element>
