<script lang="ts">
	import { onMount } from 'svelte';
	import type { Root } from 'react-dom/client';
	import 'performative-ui/styles.css';

	let host: HTMLDivElement;
	let root: Root | null = null;

	onMount(() => {
		let cancelled = false;

		async function mountBanner() {
			const [{ createElement }, { createRoot }, { StickyBanner }] = await Promise.all([
				import('react'),
				import('react-dom/client'),
				import('performative-ui')
			]);

			if (cancelled || !host) {
				return;
			}

			const trailing = createElement(
				'a',
				{
					href: '#access',
					className: 'arcten-banner-link'
				},
				'Request access  →'
			);

			root = createRoot(host);
			root.render(
				createElement(
					StickyBanner,
					{ trailing, className: 'arcten-announcement' },
					'Arcten is opening early access for high-volume agent workloads'
				)
			);
		}

		void mountBanner();

		return () => {
			cancelled = true;
			root?.unmount();
			root = null;
		};
	});
</script>

<div bind:this={host} class="announcement-host"></div>

<style>
	.announcement-host {
		--pui-fg-dim: var(--muted);
		--pui-border: color-mix(in srgb, var(--foreground) 9%, transparent);
	}

	:global(.announcement-host .arcten-announcement) {
		min-height: 34px;
		background: color-mix(in srgb, var(--brand) 7%, var(--background));
		color: var(--muted);
		font-family: var(--font-sans);
		font-size: 0.78rem;
	}

	:global(.announcement-host .arcten-banner-link) {
		color: var(--foreground);
		font-weight: 600;
		text-decoration: none;
	}
</style>
