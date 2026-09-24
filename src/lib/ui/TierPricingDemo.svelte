<script lang="ts">
	import { onMount } from 'svelte';
	import type { IdeToken } from 'performative-ui';
	import type { Root } from 'react-dom/client';
	import {
		completionWindowOrder,
		completionWindows,
		pricingCopy,
		type CompletionWindow,
		type CompletionWindowKey
	} from '$lib/pricing/completion-windows';
	import 'performative-ui/styles.css';

	const tierOptions = completionWindowOrder.map((key) => ({
		key,
		label: completionWindows[key].label,
		color: '#6270df'
	}));

	let temperatureHost: HTMLDivElement;
	let codeHost: HTMLDivElement;
	let temperatureRoot: Root | null = null;
	let codeRoot: Root | null = null;
	let selected = $state<CompletionWindowKey>('now');

	const selectedTier = $derived(completionWindows[selected]);

	function currency(value: number) {
		return `$${value.toFixed(2)}`;
	}

	function codeTokens(tier: CompletionWindow): IdeToken[] {
		return [
			{ c: 'from ', cls: 'key' },
			{ c: 'openai ', cls: '' },
			{ c: 'import ', cls: 'key' },
			{ c: 'OpenAI\n\n', cls: 'fn' },
			{ c: 'client', cls: '' },
			{ c: ' = ', cls: '' },
			{ c: 'OpenAI', cls: 'fn' },
			{ c: '(\n    base_url=', cls: '' },
			{ c: '"https://api.arcten.com/v1"', cls: 'str' },
			{ c: ',\n    api_key=', cls: '' },
			{ c: '"YOUR_ARCTEN_API_KEY"', cls: 'str' },
			{ c: ',\n)\n\n', cls: '' },
			{ c: 'response', cls: '' },
			{ c: ' = client.responses.create', cls: 'fn' },
			{ c: '(\n    model=', cls: '' },
			{ c: '"zai-org/GLM-5.2"', cls: 'str' },
			{ c: ',\n    input=', cls: '' },
			{ c: '"Run a deep research task."', cls: 'str' },
			{ c: ',\n    metadata={', cls: '' },
			{ c: '"completion_window"', cls: 'str' },
			{ c: ': ', cls: '' },
			{ c: `"${tier.apiValue}"`, cls: 'str' },
			{ c: '},\n)\n', cls: '' }
		];
	}

	onMount(() => {
		let cancelled = false;
		let renderTemperature: ((key: CompletionWindowKey) => void) | null = null;
		let renderCode: ((key: CompletionWindowKey) => void) | null = null;

		const selectTier = (key: CompletionWindowKey) => {
			if (key !== selected) {
				selected = key;
			}
			renderTemperature?.(key);
			renderCode?.(key);
		};

		const previewFromPointer = (event: PointerEvent) => {
			const bounds = temperatureHost.getBoundingClientRect();
			const position = Math.max(0, Math.min(0.999, (event.clientX - bounds.left) / bounds.width));
			selectTier(tierOptions[Math.floor(position * tierOptions.length)].key as CompletionWindowKey);
		};

		temperatureHost.addEventListener('pointermove', previewFromPointer);

		async function mountDemo() {
			const [{ createElement, Fragment }, { createRoot }, { MockIDE, Temperature }] =
				await Promise.all([import('react'), import('react-dom/client'), import('performative-ui')]);

			if (cancelled || !temperatureHost || !codeHost) {
				return;
			}

			temperatureRoot = createRoot(temperatureHost);
			codeRoot = createRoot(codeHost);

			renderTemperature = (key) => {
				temperatureRoot?.render(
					createElement(Temperature, {
						options: tierOptions,
						value: key,
						labelLow: 'Faster',
						labelHigh: 'Best available rate',
						onChange: (committedKey: string) => selectTier(committedKey as CompletionWindowKey),
						className: 'arcten-temperature'
					})
				);
			};

			renderCode = (key) => {
				const tier = completionWindows[key];
				const highlightedCode = codeTokens(tier).map((token, index) =>
					createElement(
						'span',
						{
							key: `${key}-${index}`,
							className: token.cls ? `pui-tok-${token.cls}` : undefined
						},
						token.c
					)
				);

				codeRoot?.render(
					createElement(
						MockIDE,
						{
							key,
							className: 'arcten-pricing-code',
							'aria-label': `Python example using the ${tier.label} service tier`
						},
						createElement(
							Fragment,
							null,
							createElement(MockIDE.Chrome, { filename: 'quickstart.py', thinking: false }),
							createElement(
								'pre',
								{ className: 'pui-ide__body arcten-pricing-code__body' },
								highlightedCode
							)
						)
					)
				);
			};

			selectTier(selected);
		}

		void mountDemo();

		return () => {
			cancelled = true;
			renderTemperature = null;
			renderCode = null;
			temperatureHost.removeEventListener('pointermove', previewFromPointer);
			temperatureRoot?.unmount();
			codeRoot?.unmount();
			temperatureRoot = null;
			codeRoot = null;
		};
	});
</script>

<div class="tier-demo">
	<div bind:this={temperatureHost} class="temperature-host"></div>

	<div class="pricing-demo">
		<div class="estimate" aria-live="polite">
			<div class="estimate-heading">
				<div>
					<span>Open-weights model</span>
					<strong>GLM-5.2</strong>
				</div>
				<div class="tier-name">
					<span>Service tier</span>
					<strong>{selectedTier.label}</strong>
				</div>
			</div>

			<dl class="metric-grid">
				<div>
					<dt>Input</dt>
					<dd>{currency(selectedTier.inputRate)}</dd>
					<small>per 1M tokens</small>
				</div>
				<div>
					<dt>Cached</dt>
					<dd>{currency(selectedTier.cachedRate)}</dd>
					<small>per 1M tokens</small>
				</div>
				<div>
					<dt>Output</dt>
					<dd>{currency(selectedTier.outputRate)}</dd>
					<small>per 1M tokens</small>
				</div>
			</dl>

			<p>{pricingCopy.lockNotice}</p>
		</div>

		<div bind:this={codeHost} class="code-host"></div>
	</div>
</div>

<style>
	.tier-demo {
		--pui-fg: var(--foreground);
		--pui-fg-dim: var(--muted);
		--pui-fg-mute: color-mix(in srgb, var(--muted) 70%, var(--background));
		--pui-temp-track: color-mix(in srgb, var(--foreground) 18%, transparent);
		width: 100%;
	}

	.temperature-host {
		height: 128px;
		color: var(--foreground);
	}

	.pricing-demo {
		display: grid;
		align-items: stretch;
		grid-template-columns: minmax(240px, 0.72fr) minmax(0, 1.28fr);
		border-top: 1px solid color-mix(in srgb, var(--foreground) 10%, transparent);
	}

	.estimate {
		display: flex;
		min-width: 0;
		justify-content: center;
		flex-direction: column;
		padding: 2rem 2.25rem 2rem 0.25rem;
		text-align: left;
	}

	.estimate-heading {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		gap: 1rem;
	}

	.estimate-heading div {
		display: flex;
		flex-direction: column;
		gap: 0.35rem;
	}

	.estimate-heading span,
	.metric-grid dt {
		color: var(--muted);
		font-family: var(--pui-font-mono, ui-monospace, monospace);
		font-size: 0.66rem;
		letter-spacing: 0.08em;
		text-transform: uppercase;
	}

	.estimate-heading strong {
		color: var(--foreground);
		font-family: var(--pui-font-mono, ui-monospace, monospace);
		font-size: 0.9rem;
		font-weight: 700;
	}

	.tier-name {
		align-items: flex-end;
		text-align: right;
	}

	.tier-name strong {
		color: var(--brand);
	}

	.metric-grid {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 0.65rem;
		margin: 2rem 0 0;
	}

	.metric-grid div {
		display: flex;
		min-width: 0;
		flex-direction: column;
		gap: 0.35rem;
		border: 1px solid color-mix(in srgb, var(--foreground) 9%, transparent);
		border-radius: 8px;
		background: color-mix(in srgb, var(--foreground) 2%, var(--background));
		padding: 0.85rem 0.75rem;
	}

	.metric-grid dd {
		margin: 0;
		color: var(--brand);
		font-family: var(--pui-font-mono, ui-monospace, monospace);
		font-size: clamp(1.15rem, 2.25vw, 1.55rem);
		font-weight: 650;
		line-height: 1;
		font-variant-numeric: tabular-nums;
	}

	.metric-grid small {
		color: var(--muted);
		font-size: 0.58rem;
		line-height: 1.35;
	}

	.estimate p {
		margin: 0.85rem 0 0;
		color: var(--muted);
		font-size: 0.7rem;
		line-height: 1.45;
	}

	.code-host {
		min-width: 0;
		padding: 2rem 0 2rem 2.25rem;
	}

	:global(.temperature-host .arcten-temperature) {
		min-height: 128px;
		padding-inline: 0;
	}

	:global(.code-host .arcten-pricing-code) {
		height: 100%;
		min-height: 330px;
		border-radius: 8px;
		box-shadow: 0 18px 52px rgb(2 8 23 / 0.16);
	}

	:global(.code-host .pui-ide__body) {
		min-height: 280px;
		padding: 1.5rem;
		font-size: 0.76rem;
		line-height: 1.6;
	}

	@media (max-width: 760px) {
		.pricing-demo {
			grid-template-columns: 1fr;
		}

		.estimate {
			padding: 1.75rem 0;
		}

		.code-host {
			border-top: 1px solid color-mix(in srgb, var(--foreground) 10%, transparent);
			padding: 1.75rem 0 0;
		}
	}

	@media (max-width: 440px) {
		:global(.code-host .pui-ide__body) {
			padding: 1.15rem;
			font-size: 0.66rem;
		}
	}
</style>
