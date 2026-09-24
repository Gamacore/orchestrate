<script lang="ts">
	import Container from '$lib/ui/Container.svelte';
	import MonitorIcon from '$lib/ui/icons/MonitorIcon.svelte';
	import MoonIcon from '$lib/ui/icons/MoonIcon.svelte';
	import SunIcon from '$lib/ui/icons/SunIcon.svelte';

	let { width = 'var(--content-width)' } = $props<{ width?: string }>();
</script>

<footer class="py-8">
	<Container {width} className="flex items-center justify-start px-8 text-sm text-muted">
		<div class="flex items-center gap-0.5" role="group" aria-label="Theme toggle">
			<button
				type="button"
				class="inline-flex cursor-pointer items-center justify-center rounded-[4px] border-0 bg-transparent p-1 text-inherit transition-colors hover:bg-foreground/10 hover:text-foreground focus-visible:bg-foreground/10 focus-visible:text-foreground aria-pressed:bg-foreground/10 aria-pressed:text-foreground"
				data-theme-toggle="light"
				aria-label="Light mode"
				aria-pressed="false"
			>
				<SunIcon />
			</button>
			<button
				type="button"
				class="inline-flex cursor-pointer items-center justify-center rounded-[4px] border-0 bg-transparent p-1 text-inherit transition-colors hover:bg-foreground/10 hover:text-foreground focus-visible:bg-foreground/10 focus-visible:text-foreground aria-pressed:bg-foreground/10 aria-pressed:text-foreground"
				data-theme-toggle="dark"
				aria-label="Dark mode"
				aria-pressed="false"
			>
				<MoonIcon />
			</button>
			<button
				type="button"
				class="inline-flex cursor-pointer items-center justify-center rounded-[4px] border-0 bg-transparent p-1 text-inherit transition-colors hover:bg-foreground/10 hover:text-foreground focus-visible:bg-foreground/10 focus-visible:text-foreground aria-pressed:bg-foreground/10 aria-pressed:text-foreground"
				data-theme-toggle="system"
				aria-label="System preference"
				aria-pressed="true"
			>
				<MonitorIcon />
			</button>
		</div>
	</Container>
</footer>
