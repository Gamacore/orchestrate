<script lang="ts">
	import { onMount } from 'svelte';
	import type { Root } from 'react-dom/client';
	import 'performative-ui/styles.css';

	type WordRollProps = {
		words: string[];
		intervalMs?: number;
		transitionMs?: number;
		direction?: 'up' | 'down';
		class?: string;
	};

	let {
		words,
		intervalMs = 2100,
		transitionMs = 700,
		direction = 'up',
		class: className = ''
	}: WordRollProps = $props();

	let host: HTMLSpanElement;
	let root: Root | null = null;

	onMount(() => {
		let cancelled = false;

		async function mountWordRoll() {
			const [{ createElement }, { createRoot }, { WordRoll: PerformativeWordRoll }] =
				await Promise.all([import('react'), import('react-dom/client'), import('performative-ui')]);

			if (cancelled || !host) {
				return;
			}

			root = createRoot(host);
			root.render(
				createElement(PerformativeWordRoll, {
					words,
					intervalMs,
					transitionMs,
					direction,
					className: 'arcten-word-roll'
				})
			);
		}

		void mountWordRoll();

		return () => {
			cancelled = true;
			root?.unmount();
			root = null;
		};
	});
</script>

<span bind:this={host} class={`word-roll-host ${className}`}></span>

<style>
	.word-roll-host {
		display: inline-block;
		min-height: 1.08em;
		vertical-align: top;
	}

	:global(.word-roll-host .arcten-word-roll) {
		color: inherit;
		font: inherit;
		letter-spacing: 0;
	}

	@media (prefers-reduced-motion: reduce) {
		:global(.word-roll-host .pui-roll__word) {
			transition-duration: 0.01ms !important;
		}
	}
</style>
