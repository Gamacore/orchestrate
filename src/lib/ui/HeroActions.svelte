<script lang="ts">
	import { onMount } from 'svelte';
	import type { Root } from 'react-dom/client';
	import { heroActions } from '$lib/content/landing';
	import 'performative-ui/styles.css';

	let host: HTMLDivElement;
	let root: Root | null = null;

	onMount(() => {
		let cancelled = false;

		async function mountActions() {
			const [{ createElement }, { createRoot }, { Button }] = await Promise.all([
				import('react'),
				import('react-dom/client'),
				import('performative-ui')
			]);

			if (cancelled || !host) {
				return;
			}

			root = createRoot(host);
			root.render(
				createElement(
					'div',
					{ className: 'arcten-hero-actions' },
					heroActions.map((action) =>
						createElement(
							Button,
							{
								key: action.label,
								as: 'a',
								href: action.href,
								variant: 'ghost',
								size: 'lg',
								className: `arcten-glass-button arcten-glass-button--${action.primary ? 'primary' : 'secondary'}`
							},
							createElement('span', { className: 'arcten-glass-button__label' }, [
								action.label,
								createElement(
									'span',
									{
										key: 'arrow',
										className: 'arcten-glass-button__arrow',
										'aria-hidden': true
									},
									'\u2192'
								)
							])
						)
					)
				)
			);
		}

		void mountActions();

		return () => {
			cancelled = true;
			root?.unmount();
			root = null;
		};
	});
</script>

<div bind:this={host} class="actions-host"></div>

<style>
	.actions-host {
		--pui-fg: var(--foreground);
		--pui-fg-dim: var(--muted);
		--pui-border-bright: color-mix(in srgb, var(--foreground) 15%, transparent);
		--pui-bg-elev: color-mix(in srgb, var(--background) 78%, transparent);
		width: 100%;
	}

	:global(.actions-host .arcten-hero-actions) {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 0.75rem;
	}

	:global(.actions-host .arcten-glass-button) {
		min-height: 3rem;
		border-radius: 999px;
		font-family: inherit;
		font-size: 0.875rem;
		font-weight: 650;
		box-shadow:
			inset 0 1px 0 rgb(255 255 255 / 0.62),
			0 10px 30px rgb(29 48 86 / 0.1);
		-webkit-backdrop-filter: blur(16px) saturate(135%);
		backdrop-filter: blur(16px) saturate(135%);
		transition:
			transform 260ms cubic-bezier(0.22, 1, 0.36, 1),
			background-color 260ms ease,
			border-color 260ms ease,
			box-shadow 260ms ease;
	}

	:global(.actions-host .arcten-glass-button:hover),
	:global(.actions-host .arcten-glass-button:focus-visible) {
		transform: translateY(-2px);
	}

	:global(.actions-host .arcten-glass-button--primary) {
		min-width: 9.5rem;
		border-color: color-mix(in srgb, var(--brand) 42%, white 20%);
		background: color-mix(in srgb, var(--brand) 80%, transparent);
		color: white;
	}

	:global(.actions-host .arcten-glass-button--primary:hover),
	:global(.actions-host .arcten-glass-button--primary:focus-visible) {
		border-color: color-mix(in srgb, var(--brand) 62%, white 25%);
		background: color-mix(in srgb, var(--brand-strong) 86%, transparent);
		box-shadow:
			inset 0 1px 0 rgb(255 255 255 / 0.68),
			0 14px 34px rgb(29 48 86 / 0.18);
	}

	:global(.actions-host .arcten-glass-button--secondary) {
		border-color: color-mix(in srgb, var(--foreground) 14%, transparent);
		background: color-mix(in srgb, var(--background) 68%, transparent);
		color: var(--foreground);
	}

	:global(.actions-host .arcten-glass-button--secondary:hover),
	:global(.actions-host .arcten-glass-button--secondary:focus-visible) {
		border-color: color-mix(in srgb, var(--brand) 30%, var(--foreground) 10%);
		background: color-mix(in srgb, var(--background) 82%, transparent);
		box-shadow:
			inset 0 1px 0 rgb(255 255 255 / 0.72),
			0 14px 34px rgb(29 48 86 / 0.13);
	}

	:global(.actions-host .arcten-glass-button__label) {
		display: inline-flex;
		align-items: center;
		gap: 0.45rem;
	}

	:global(.actions-host .arcten-glass-button__arrow) {
		font-size: 1rem;
		line-height: 1;
		transition: transform 260ms cubic-bezier(0.22, 1, 0.36, 1);
	}

	:global(.actions-host .arcten-glass-button--secondary:hover .arcten-glass-button__arrow),
	:global(.actions-host .arcten-glass-button--secondary:focus-visible .arcten-glass-button__arrow) {
		transform: translateX(3px);
	}

	@media (min-width: 640px) {
		:global(.actions-host .arcten-hero-actions) {
			flex-direction: row;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		:global(.actions-host .arcten-glass-button),
		:global(.actions-host .arcten-glass-button__arrow) {
			transition: none;
		}
	}
</style>
