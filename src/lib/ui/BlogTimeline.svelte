<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { autoUpdate, computePosition, flip, offset, shift } from '@floating-ui/dom';

	type BlogHeading = {
		id: string;
		text: string;
		level: number;
		children: BlogHeading[];
	};

	type FlatHeading = Omit<BlogHeading, 'children'>;

	let { headings } = $props<{ headings: BlogHeading[] }>();

	const flatHeadings = $derived(flattenHeadings(headings));
	let activeId = $state('');
	let hoveredId = $state('');
	let isOpen = $state(false);
	let closeTimeout: ReturnType<typeof setTimeout> | null = null;
	let panelX = $state(0);
	let panelY = $state(0);
	let referenceEl = $state<HTMLDivElement | null>(null);
	let panelEl = $state<HTMLDivElement | null>(null);

	function flattenHeadings(items: BlogHeading[]): FlatHeading[] {
		return items.flatMap((item) => [
			{
				id: item.id,
				text: item.text,
				level: item.level
			},
			...flattenHeadings(item.children)
		]);
	}

	function getTickWidth(level: number, isActive: boolean, isHovered: boolean) {
		if (isActive) {
			return level <= 2 ? 34 : level === 3 ? 28 : 23;
		}

		if (isHovered) {
			return level <= 2 ? 28 : level === 3 ? 22 : 18;
		}

		if (level <= 2) {
			return 20;
		}

		if (level === 3) {
			return 15;
		}

		return 11;
	}

	function clearCloseTimeout() {
		if (closeTimeout) {
			clearTimeout(closeTimeout);
			closeTimeout = null;
		}
	}

	function openOutline() {
		clearCloseTimeout();
		void updatePanelPosition();
		isOpen = true;
	}

	function scheduleClose() {
		clearCloseTimeout();
		closeTimeout = setTimeout(() => {
			isOpen = false;
			hoveredId = '';
		}, 120);
	}

	async function updatePanelPosition() {
		if (!referenceEl || !panelEl) {
			return;
		}

		const { x, y } = await computePosition(referenceEl, panelEl, {
			strategy: 'fixed',
			placement: 'left',
			middleware: [offset(0), shift({ padding: 16 }), flip({ fallbackPlacements: ['right'] })]
		});

		panelX = x;
		panelY = y;
	}

	onMount(() => {
		const headingElements = flatHeadings
			.map((heading) => document.getElementById(heading.id))
			.filter((element): element is HTMLElement => element instanceof HTMLElement);

		if (headingElements.length === 0) {
			return;
		}

		const updateActiveHeading = () => {
			const currentHeading =
				headingElements.filter((heading) => heading.getBoundingClientRect().top <= 144).at(-1) ??
				headingElements[0];

			activeId = currentHeading.id;
		};

		const observer = new IntersectionObserver(updateActiveHeading, {
			rootMargin: '-112px 0px -65% 0px',
			threshold: [0, 1]
		});

		for (const heading of headingElements) {
			observer.observe(heading);
		}

		updateActiveHeading();
		window.addEventListener('scroll', updateActiveHeading, { passive: true });
		window.addEventListener('resize', updateActiveHeading);

		return () => {
			observer.disconnect();
			window.removeEventListener('scroll', updateActiveHeading);
			window.removeEventListener('resize', updateActiveHeading);
		};
	});

	onDestroy(() => {
		clearCloseTimeout();
		hoveredId = '';
	});

	$effect(() => {
		if (!isOpen || !referenceEl || !panelEl) {
			return;
		}

		const cleanup = autoUpdate(referenceEl, panelEl, updatePanelPosition);

		void updatePanelPosition();

		return () => {
			cleanup();
		};
	});
</script>

{#if flatHeadings.length > 0}
	<nav
		aria-label="Table of contents"
		class="fixed inset-y-0 right-4 z-20 hidden items-center md:flex"
	>
		<div
			bind:this={referenceEl}
			role="presentation"
			class="relative flex items-center"
			onmouseenter={openOutline}
			onmouseleave={scheduleClose}
			onfocusin={openOutline}
			onfocusout={(event) => {
				const next = event.relatedTarget;

				if (!(next instanceof Node) || !event.currentTarget.contains(next)) {
					scheduleClose();
				}
			}}
		>
			<div class="flex flex-col items-end px-1 py-2">
				{#each flatHeadings as heading (heading.id)}
					<a
						href={`#${heading.id}`}
						aria-label={heading.text}
						onmouseenter={() => (hoveredId = heading.id)}
						onmouseleave={() => (hoveredId = '')}
						onfocus={() => (hoveredId = heading.id)}
						onblur={() => (hoveredId = '')}
						class="group/tick flex h-3.5 w-10 items-center justify-end"
					>
						<span
							class={`block h-[2px] rounded-full transition-[width,background-color,opacity,box-shadow] duration-150 ease-out ${
								activeId === heading.id
									? 'bg-foreground opacity-100'
									: hoveredId === heading.id
										? 'bg-foreground opacity-100'
										: 'bg-foreground/30 opacity-90 group-hover/tick:bg-foreground/80 group-hover/tick:opacity-100'
							}`}
							style={`width: ${getTickWidth(
								heading.level,
								activeId === heading.id,
								hoveredId === heading.id
							)}px;`}
						></span>
					</a>
				{/each}
			</div>

			<div
				bind:this={panelEl}
				role="presentation"
				onmouseenter={openOutline}
				onmouseleave={scheduleClose}
				onfocusin={openOutline}
				onfocusout={(event) => {
					const next = event.relatedTarget;

					if (!(next instanceof Node) || !event.currentTarget.contains(next)) {
						scheduleClose();
					}
				}}
				class={`fixed z-[30] w-[20rem] rounded-[28px] border border-foreground/10 bg-background/95 p-4 shadow-[0_20px_60px_rgba(0,0,0,0.12)] backdrop-blur-sm transition-[transform,opacity] duration-100 ${
					isOpen ? 'pointer-events-auto translate-x-0 opacity-100' : 'pointer-events-none translate-x-1.5 opacity-0'
				}`}
				style={`left: ${panelX}px; top: ${panelY}px;`}
			>
				{#snippet renderHeadings(items: BlogHeading[])}
					<ul class="space-y-1.5 pl-0">
						{#each items as item (item.id)}
							<li class="pl-0 before:hidden">
								<a
									href={`#${item.id}`}
									onmouseenter={() => (hoveredId = item.id)}
									onmouseleave={() => (hoveredId = '')}
									onfocus={() => (hoveredId = item.id)}
									onblur={() => (hoveredId = '')}
									class={`block text-sm leading-5 transition-colors ${
										activeId === item.id ? 'text-foreground' : 'text-muted hover:text-foreground'
									}`}
								>
									{item.text}
								</a>

								{#if item.children.length > 0}
									<div class="mt-1.5 border-l border-foreground/8 pl-3">
										{@render renderHeadings(item.children)}
									</div>
								{/if}
							</li>
						{/each}
					</ul>
				{/snippet}

				{@render renderHeadings(headings)}
			</div>
		</div>
	</nav>
{/if}
