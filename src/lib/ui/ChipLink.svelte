<!-- eslint-disable svelte/no-navigation-without-resolve -->
<script lang="ts">
	import { resolve } from '$app/paths';
	import type { Snippet } from 'svelte';

	let {
		href,
		external = false,
		className = '',
		children
	} = $props<{
		href: string;
		external?: boolean;
		className?: string;
		children?: Snippet;
	}>();

	const resolvedHref = $derived(href.startsWith('/') ? resolve(href) : href);
	const relValue = $derived(external ? 'noopener noreferrer' : undefined);
</script>

<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
<a
	href={resolvedHref}
	class={`text-link text-link--nowrap inline-flex items-baseline text-foreground ${className}`.trim()}
	target={external ? '_blank' : undefined}
	rel={relValue}
>
	<span class="text-link__label">
		{@render children?.()}
	</span>
	<span aria-hidden="true" class="text-link__arrow-wrap">
		<span class="text-link__arrow"> ↗ </span>
	</span>
</a>
