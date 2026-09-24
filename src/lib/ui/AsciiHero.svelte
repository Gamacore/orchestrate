<script lang="ts">
	import { onMount } from 'svelte';
	import type { Root } from 'react-dom/client';
	import 'performative-ui/styles.css';

	type AsciiHeroProps = {
		class?: string;
		cols?: number;
		rows?: number;
		fontSize?: number;
		fontFamily?: string;
		charRamp?: string;
		colorful?: boolean;
		palette?: string[];
		baseOpacity?: number;
		frameMs?: number;
		clickRipple?: boolean;
		clickRippleRadius?: number;
		clickRippleDuration?: number;
	};

	type ClickRipple = {
		x: number;
		y: number;
		startedAt: number;
		maxRadius: number;
		seed: number;
	};

	let {
		class: className = '',
		cols,
		rows,
		fontSize = 11,
		fontFamily,
		charRamp,
		colorful = false,
		palette,
		baseOpacity = 0.18,
		frameMs,
		clickRipple = true,
		clickRippleRadius = 480,
		clickRippleDuration = 2400
	}: AsciiHeroProps = $props();

	let host: HTMLDivElement;
	let reactHost: HTMLDivElement;
	let rippleCanvas: HTMLCanvasElement;
	let root: Root | null = null;

	const fallbackPalette = ['#405a82', '#7590b4', '#9fb2ce'];
	const fallbackCharRamp = ".,:';il!+*xk0XNW@";

	onMount(() => {
		let cancelled = false;
		let animationFrame = 0;
		let width = 0;
		let height = 0;
		let cellWidth = Math.max(6, fontSize * 0.62);
		let cellHeight = Math.max(8, fontSize * 1.15);
		let ripples: ClickRipple[] = [];
		const context = rippleCanvas.getContext('2d');
		const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

		const resizeRippleCanvas = () => {
			if (!context || !host) {
				return;
			}

			const rect = host.getBoundingClientRect();
			const devicePixelRatio = Math.min(window.devicePixelRatio || 1, 2);

			width = rect.width;
			height = rect.height;
			rippleCanvas.width = Math.max(1, Math.floor(width * devicePixelRatio));
			rippleCanvas.height = Math.max(1, Math.floor(height * devicePixelRatio));
			context.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
			context.font = `${fontSize}px ${fontFamily ?? 'JetBrains Mono, ui-monospace, monospace'}`;
			context.textBaseline = 'top';
			cellWidth = context.measureText('M').width || Math.max(6, fontSize * 0.62);
			cellHeight = Math.max(8, fontSize * 1.15);
		};

		const drawRipples = (timestamp: number) => {
			if (!context) {
				return;
			}

			context.clearRect(0, 0, width, height);

			const colors = palette?.length ? palette : fallbackPalette;
			const ramp = charRamp || fallbackCharRamp;
			const rippleOpacity = baseOpacity * 0.32;
			const duration = reducedMotion ? Math.min(700, clickRippleDuration) : clickRippleDuration;
			const activeRipples: ClickRipple[] = [];

			for (const ripple of ripples) {
				const lifeProgress = (timestamp - ripple.startedAt) / duration;

				if (lifeProgress >= 1.35) {
					continue;
				}

				activeRipples.push(ripple);

				const progress = Math.min(1, lifeProgress);
				const waveProgress = reducedMotion ? progress : 1 - Math.pow(1 - progress, 1.08);
				const radius = waveProgress * ripple.maxRadius;
				const ringWidth = reducedMotion ? 12 : 8 + progress * 6;
				const attack = Math.min(1, progress / 0.08);
				const rowCount = Math.ceil(height / cellHeight);
				const columnCount = Math.ceil(width / cellWidth);

				for (let row = 0; row < rowCount; row += 1) {
					const y = row * cellHeight;
					const centerY = y + cellHeight / 2;

					for (let column = 0; column < columnCount; column += 1) {
						const x = column * cellWidth;
						const centerX = x + cellWidth / 2;
						const deltaX = centerX - ripple.x;
						const deltaY = centerY - ripple.y;
						const distance = Math.hypot(deltaX, deltaY);
						const angle = Math.atan2(deltaY, deltaX);
						const cellNoise =
							(Math.sin(column * 12.9898 + row * 78.233 + ripple.seed * 37.719) * 43758.5453) % 1;
						const noise = Math.abs(cellNoise);
						const segment = Math.floor(((angle + Math.PI) / (Math.PI * 2)) * 52);
						const segmentNoise = Math.abs(
							(Math.sin(segment * 91.731 + ripple.seed * 0.017) * 43758.5453) % 1
						);
						const decayNoise = Math.abs(
							(Math.sin(column * 39.346 + row * 11.135 + ripple.seed * 0.071) * 24634.6345) % 1
						);
						const fragmentNoise = segmentNoise * 0.68 + noise * 0.32;
						const decayStart = 0.42 + fragmentNoise * 0.45;
						const decayDuration = 0.18 + decayNoise * 0.3;
						const decayProgress = Math.max(
							0,
							Math.min(1, (lifeProgress - decayStart) / decayDuration)
						);
						const fragmentFade = 1 - decayProgress * decayProgress * (3 - 2 * decayProgress);
						const frayGrowth = Math.pow(progress, 1.35);
						const segmentOffset = (segmentNoise - 0.5) * frayGrowth * 60;
						const granularFray = (noise - 0.5) * frayGrowth * 22;
						const frayedDistance = distance + segmentOffset + granularFray;
						const ring =
							Math.exp(-((frayedDistance - radius) ** 2) / (2 * ringWidth ** 2)) * 0.78 +
							Math.exp(-((frayedDistance - radius) ** 2) / (2 * (ringWidth * 1.8) ** 2)) * 0.18;
						const breakup = 0.55 + noise * 0.7;
						const intensity = Math.min(1, ring * breakup) * attack * fragmentFade;

						if (intensity < 0.02) {
							continue;
						}

						const character = ramp[Math.floor(Math.min(1, intensity * 2.4) * (ramp.length - 1))];

						if (!character) {
							continue;
						}

						context.globalAlpha = Math.min(rippleOpacity, intensity * rippleOpacity);
						context.fillStyle = colors[(column + row * 2 + ripple.seed) % colors.length];
						context.fillText(character, x, y);
					}
				}
			}

			context.globalAlpha = 1;
			ripples = activeRipples;

			if (ripples.length > 0) {
				animationFrame = requestAnimationFrame(drawRipples);
			} else {
				animationFrame = 0;
			}
		};

		const startRipple = (event: PointerEvent) => {
			if (!clickRipple || (event.pointerType === 'mouse' && event.button !== 0) || !host) {
				return;
			}

			const rect = host.getBoundingClientRect();

			if (
				event.clientX < rect.left ||
				event.clientX > rect.right ||
				event.clientY < rect.top ||
				event.clientY > rect.bottom
			) {
				return;
			}

			const x = event.clientX - rect.left;
			const y = event.clientY - rect.top;
			const maxRadius = clickRippleRadius;

			ripples = [
				...ripples,
				{
					x,
					y,
					startedAt: performance.now(),
					maxRadius,
					seed: Math.floor(Math.random() * 1_000_000)
				}
			];

			if (animationFrame === 0) {
				animationFrame = requestAnimationFrame(drawRipples);
			}
		};

		async function mountAsciiHero() {
			const [{ createElement }, { createRoot }, { AsciiHero: PerformativeAsciiHero }] =
				await Promise.all([import('react'), import('react-dom/client'), import('performative-ui')]);

			if (cancelled || !reactHost) {
				return;
			}

			root = createRoot(reactHost);
			root.render(
				createElement(PerformativeAsciiHero, {
					variant: 'bare',
					cols,
					rows,
					fontSize,
					fontFamily,
					charRamp,
					colorful,
					palette,
					baseOpacity,
					reactive: false,
					frameMs,
					className: 'arcten-performative-ascii',
					style: {
						position: 'absolute',
						inset: 0,
						width: '100%',
						height: '100%',
						cursor: 'default'
					}
				})
			);
		}

		const resizeObserver = new ResizeObserver(resizeRippleCanvas);

		resizeObserver.observe(host);
		resizeRippleCanvas();
		window.addEventListener('pointerdown', startRipple, { passive: true });
		void mountAsciiHero();

		return () => {
			cancelled = true;
			cancelAnimationFrame(animationFrame);
			resizeObserver.disconnect();
			window.removeEventListener('pointerdown', startRipple);
			root?.unmount();
			root = null;
		};
	});
</script>

<div bind:this={host} class={`ascii-hero ${className}`} aria-hidden="true">
	<div bind:this={reactHost} class="ascii-react-host"></div>
	<canvas bind:this={rippleCanvas} class="click-ripple-canvas"></canvas>
</div>

<style>
	.ascii-hero {
		position: relative;
		display: block;
		overflow: hidden;
		cursor: default;
		touch-action: manipulation;
		user-select: none;
	}

	.ascii-react-host,
	.click-ripple-canvas {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
	}

	.ascii-react-host {
		z-index: 0;
		pointer-events: none;
		-webkit-mask-image: linear-gradient(180deg, black 0%, black 62%, transparent 100%);
		mask-image: linear-gradient(180deg, black 0%, black 62%, transparent 100%);
	}

	.click-ripple-canvas {
		z-index: 1;
		display: block;
		pointer-events: none;
	}

	:global(.ascii-hero .pui-ascii),
	:global(.ascii-hero .arcten-performative-ascii) {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		pointer-events: none;
	}

	:global(.ascii-hero .pui-ascii > canvas) {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
	}
</style>
