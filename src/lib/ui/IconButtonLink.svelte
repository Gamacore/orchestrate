<!-- eslint-disable svelte/no-navigation-without-resolve -->
<script lang="ts">
	import { resolve } from '$app/paths';
	import type { Snippet } from 'svelte';
	import SquircleBox from '$lib/ui/SquircleBox.svelte';

	let {
		href,
		label,
		external = false,
		ghost = false,
		className = '',
		children
	} = $props<{
		href: string;
		label: string;
		external?: boolean;
		ghost?: boolean;
		className?: string;
		children?: Snippet;
	}>();

	const resolvedHref = $derived(href.startsWith('/') ? resolve(href) : href);
	const relValue = $derived(external ? 'noopener noreferrer' : undefined);
	const variantClass = $derived(
		ghost
			? 'bg-transparent text-muted hover:bg-foreground/5 hover:text-foreground'
			: 'bg-foreground/5 text-muted hover:bg-foreground/10 hover:text-foreground'
	);
</script>

<SquircleBox
	as="a"
	radius={8}
	href={resolvedHref}
	className={`inline-flex items-center justify-center p-1.5 transition-all ${variantClass} ${className}`.trim()}
	target={external ? '_blank' : undefined}
	rel={relValue}
	aria-label={label}
>
	{@render children?.()}
</SquircleBox>
