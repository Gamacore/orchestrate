<script lang="ts">
	import { onMount } from 'svelte';
	import type { Root } from 'react-dom/client';
	import 'performative-ui/styles.css';

	let host: HTMLDivElement;
	let root: Root | null = null;

	onMount(() => {
		let cancelled = false;

		async function mountGraph() {
			const [{ createElement }, { createRoot }, { NodeGraphBackground }] = await Promise.all([
				import('react'),
				import('react-dom/client'),
				import('performative-ui')
			]);

			if (cancelled || !host) return;

			root = createRoot(host);
			root.render(
				createElement(NodeGraphBackground, {
					density: 48,
					speed: 0.14,
					linkDistance: 132,
					hoverDistance: 180,
					hoverGravity: 0.002,
					colors: ['#8ea5c7', '#b0bfd6', '#6270df'],
					linkColor: 'rgba(98, 112, 223, 0.09)',
					className: 'arcten-deployment-graph'
				})
			);
		}

		void mountGraph();

		return () => {
			cancelled = true;
			root?.unmount();
			root = null;
		};
	});
</script>

<div bind:this={host} class="deployment-backdrop" aria-hidden="true"></div>

<style>
	.deployment-backdrop {
		position: absolute;
		inset: 0;
		opacity: 0.48;
		pointer-events: none;
	}

	:global(.deployment-backdrop .arcten-deployment-graph) {
		position: absolute;
		inset: 0;
	}
</style>
