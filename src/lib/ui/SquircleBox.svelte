<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		as = 'div',
		radius,
		className = '',
		style = '',
		children,
		...restProps
	} = $props<{
		as?: keyof HTMLElementTagNameMap;
		radius: number;
		className?: string;
		style?: string;
		children?: Snippet;
		[key: string]: unknown;
	}>();

	const mergedStyle = $derived.by(() => {
		const parts = [
			style,
			`--squircle-radius: ${radius}px`,
			`--squircle-radius-supported: ${radius * 2}px`
		];

		return parts.filter(Boolean).join('; ');
	});

	const mergedClass = $derived(['squircle-box', className].filter(Boolean).join(' '));
</script>

<svelte:element this={as} class={mergedClass} style={mergedStyle} {...restProps}>
	{@render children?.()}
</svelte:element>
