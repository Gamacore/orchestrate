<script lang="ts">
	import { onMount } from 'svelte';
	import type { Root } from 'react-dom/client';
	import { securityCopy } from '$lib/content/landing';
	import 'performative-ui/styles.css';

	let backersHost: HTMLDivElement;
	let securityHost: HTMLDivElement;
	let backersRoot: Root | null = null;
	let securityRoot: Root | null = null;

	onMount(() => {
		let cancelled = false;

		async function mountTrustSignals() {
			const [{ createElement }, { createRoot }, { LogoRow }] = await Promise.all([
				import('react'),
				import('react-dom/client'),
				import('performative-ui')
			]);

			if (cancelled || !backersHost || !securityHost) {
				return;
			}

			const logos = [
				{
					kind: 'node' as const,
					key: 'Y Combinator',
					node: createElement(
						'span',
						{ className: 'backer-card backer-card--yc' },
						createElement('img', { src: '/logos/y-combinator.svg', alt: '' }),
						createElement('span', null, 'Y Combinator')
					)
				},
				{
					kind: 'node' as const,
					key: 'Unanimous Capital',
					node: createElement(
						'span',
						{ className: 'backer-card backer-card--wordmark' },
						createElement('img', {
							src: '/logos/unanimous-capital.svg',
							alt: 'Unanimous Capital'
						})
					)
				},
				{
					kind: 'node' as const,
					key: 'Team Ignite Ventures',
					node: createElement(
						'span',
						{ className: 'backer-card backer-card--ignite' },
						createElement('img', { src: '/logos/team-ignite-ventures.webp', alt: '' }),
						createElement('span', null, 'Team Ignite Ventures')
					)
				},
				{
					kind: 'node' as const,
					key: 'Angel investors',
					node: createElement(
						'span',
						{ className: 'backer-card backer-card--angels' },
						createElement('strong', null, 'Founders & operators'),
						createElement('span', null, 'Angel investors')
					)
				}
			];

			backersRoot = createRoot(backersHost);
			backersRoot.render(createElement(LogoRow, { heading: 'Backed by', logos }));

			securityRoot = createRoot(securityHost);
			securityRoot.render(
				createElement(LogoRow, {
					heading: 'Security',
					logos: [
						{
							kind: 'node' as const,
							key: 'SOC 2 readiness in progress',
							node: createElement(
								'span',
								{ className: 'security-lockup' },
								createElement('img', {
									src: '/logos/vanta-soc-2.png',
									alt: 'SOC 2 readiness in progress'
								}),
								createElement(
									'span',
									{ className: 'security-copy' },
									createElement('strong', null, securityCopy.heading),
									createElement('span', null, securityCopy.detail)
								)
							)
						}
					]
				})
			);
		}

		void mountTrustSignals();

		return () => {
			cancelled = true;
			backersRoot?.unmount();
			securityRoot?.unmount();
			backersRoot = null;
			securityRoot = null;
		};
	});
</script>

<div class="trust-strip">
	<div bind:this={backersHost} class="backers-host"></div>
	<div bind:this={securityHost} class="security-host"></div>
</div>

<style>
	.trust-strip {
		--pui-fg: var(--foreground);
		--pui-fg-dim: var(--muted);
		--pui-fg-mute: color-mix(in srgb, var(--muted) 68%, var(--background));
		--pui-border-bright: color-mix(in srgb, var(--foreground) 12%, transparent);
		--pui-glass-soft: color-mix(in srgb, var(--background) 82%, transparent);
		display: flex;
		align-items: center;
		flex-direction: column;
		gap: 1.75rem;
	}

	.backers-host {
		width: 100%;
		min-width: 0;
	}

	.security-host {
		width: 100%;
		min-width: 0;
	}

	:global(.backers-host .pui-logo-row) {
		width: 100%;
		text-align: center;
	}

	:global(.backers-host .pui-logo-row__heading) {
		margin-bottom: 2rem;
		color: var(--muted);
		font-size: 0.95rem;
		letter-spacing: 0;
	}

	:global(.security-host .pui-logo-row) {
		width: 100%;
		text-align: center;
	}

	:global(.security-host .pui-logo-row__heading) {
		margin-bottom: 1.25rem;
		color: var(--muted);
		font-size: 0.78rem;
		letter-spacing: 0.12em;
	}

	:global(.security-host .pui-logo-row__items) {
		display: flex;
		justify-content: center;
		opacity: 1;
	}

	:global(.security-host .pui-logo-row__text) {
		display: block;
		width: 100%;
		white-space: normal;
	}

	:global(.security-host .security-lockup) {
		display: inline-flex;
		width: min(100%, 390px);
		align-items: center;
		gap: 1.25rem;
		text-align: left;
	}

	:global(.security-host .security-lockup img) {
		display: block;
		width: 92px;
		height: auto;
		filter: none;
		opacity: 1;
	}

	:global(.security-host .security-copy) {
		display: flex;
		min-width: 0;
		flex-direction: column;
		gap: 0.35rem;
	}

	:global(.security-host .security-copy strong) {
		color: var(--foreground);
		font-size: 1rem;
		font-weight: 650;
	}

	:global(.security-host .security-copy span) {
		max-width: 240px;
		color: var(--muted);
		font-size: 0.8rem;
		font-weight: 450;
		line-height: 1.45;
		overflow-wrap: anywhere;
	}

	:global(.backers-host .pui-logo-row__items) {
		display: grid;
		grid-template-columns: repeat(4, minmax(0, 1fr));
		gap: 1rem;
		opacity: 1;
	}

	:global(.backers-host .pui-logo-row__text) {
		display: block;
	}

	:global(.backers-host .backer-card) {
		display: flex;
		min-height: 126px;
		align-items: center;
		justify-content: center;
		gap: 0.75rem;
		border: 1px solid rgb(15 23 42 / 0.1);
		border-radius: 8px;
		background: #ffffff;
		padding: 1.5rem;
		color: #172033;
		font-size: 0.9rem;
		font-weight: 600;
		box-shadow: 0 10px 30px rgb(15 23 42 / 0.04);
	}

	:global(.backers-host .backer-card img) {
		display: block;
		width: auto;
		max-width: 150px;
		height: 38px;
		object-fit: contain;
		filter: none;
		opacity: 1;
	}

	:global(.backers-host .backer-card--yc img) {
		width: 36px;
		height: 36px;
	}

	:global(.backers-host .backer-card--ignite img) {
		width: 42px;
		height: 42px;
	}

	:global(.backers-host .backer-card--wordmark img) {
		width: min(100%, 170px);
		height: auto;
	}

	:global(.backers-host .backer-card--angels) {
		flex-direction: column;
		gap: 0.3rem;
	}

	:global(.backers-host .backer-card--angels strong) {
		font-size: 1rem;
	}

	:global(.backers-host .backer-card--angels span) {
		color: #566176;
		font-size: 0.8rem;
		font-weight: 500;
	}

	@media (max-width: 760px) {
		:global(.backers-host .pui-logo-row__items) {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}
	}

	@media (max-width: 440px) {
		:global(.backers-host .pui-logo-row__items) {
			grid-template-columns: 1fr;
		}

		:global(.security-host .security-lockup) {
			gap: 0.85rem;
		}

		:global(.security-host .security-lockup img) {
			width: 78px;
			height: auto;
		}

		:global(.security-host .security-copy span) {
			max-width: 210px;
		}
	}
</style>
