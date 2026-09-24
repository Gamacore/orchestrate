<script lang="ts">
	import { resolve } from '$app/paths';
	import ArctenLogo from '$lib/ui/icons/ArctenLogo.svelte';
	import LinkedInLogo from '$lib/ui/icons/LinkedInLogo.svelte';
	import XLogo from '$lib/ui/icons/XLogo.svelte';
	import Container from '$lib/ui/Container.svelte';
	import ThemeToggle from '$lib/ui/ThemeToggle.svelte';

	let { width = 'var(--content-width)' } = $props<{ width?: string }>();
	const year = new Date().getFullYear();
</script>

<footer class="border-t border-foreground/10 bg-background text-foreground">
	<Container
		{width}
		className="flex min-h-[640px] flex-col px-6 pt-12 pb-8 sm:min-h-[590px] sm:px-8 sm:pt-14 sm:pb-10"
	>
		<div class="grid grid-cols-2 gap-x-10 gap-y-10 sm:grid-cols-3 sm:gap-x-16">
			<section>
				<h2 class="text-sm font-semibold text-foreground">Product</h2>
				<nav class="mt-4 flex flex-col items-start gap-3 text-sm text-muted" aria-label="Product">
					<!-- Footer section fragments use SvelteKit's resolved base path. -->
					<!-- eslint-disable svelte/no-navigation-without-resolve -->
					<a
						href={`${resolve('/')}#pricing`}
						class="hover:text-foreground focus-visible:text-foreground">Pricing</a
					>
					<a
						href={`${resolve('/')}#use-cases`}
						class="hover:text-foreground focus-visible:text-foreground">Use cases</a
					>
					<!-- eslint-enable svelte/no-navigation-without-resolve -->
					<a href={resolve('/docs')} class="hover:text-foreground focus-visible:text-foreground"
						>Docs</a
					>
				</nav>
			</section>

			<section>
				<h2 class="text-sm font-semibold text-foreground">Deploy</h2>
				<nav class="mt-4 flex flex-col items-start gap-3 text-sm text-muted" aria-label="Deploy">
					<!-- Footer section fragments use SvelteKit's resolved base path. -->
					<!-- eslint-disable svelte/no-navigation-without-resolve -->
					<a
						href={`${resolve('/')}#models`}
						class="hover:text-foreground focus-visible:text-foreground">Initial models</a
					>
					<a
						href={`${resolve('/docs')}#windows`}
						class="hover:text-foreground focus-visible:text-foreground">Completion windows</a
					>
					<a
						href={`${resolve('/docs')}#private-models`}
						class="hover:text-foreground focus-visible:text-foreground">Private-model preview</a
					>
					<!-- eslint-enable svelte/no-navigation-without-resolve -->
				</nav>
			</section>

			<section>
				<h2 class="text-sm font-semibold text-foreground">Company</h2>
				<nav class="mt-4 flex flex-col items-start gap-3 text-sm text-muted" aria-label="Company">
					<a
						href="mailto:founders@arcten.com?subject=Arcten%20API%20access"
						class="hover:text-foreground focus-visible:text-foreground">Request API access</a
					>
					<a
						href="mailto:founders@arcten.com?subject=Arcten%20inquiry"
						class="hover:text-foreground focus-visible:text-foreground">Contact</a
					>
					<a href={resolve('/blog')} class="hover:text-foreground focus-visible:text-foreground"
						>Blog</a
					>
					<a href={resolve('/tos')} class="hover:text-foreground focus-visible:text-foreground"
						>Terms of service</a
					>
				</nav>
			</section>
		</div>

		<div class="min-h-24 flex-1 sm:min-h-36"></div>

		<div class="flex items-center justify-end gap-6 text-muted">
			<a
				href="https://x.com/arcteninc"
				target="_blank"
				rel="noreferrer"
				class="inline-flex h-7 w-7 items-center justify-center hover:text-foreground focus-visible:text-foreground"
				aria-label="Arcten on X"
				title="Arcten on X"
			>
				<XLogo class="h-[18px] w-[18px]" />
			</a>
			<a
				href="https://www.linkedin.com/company/arcten/"
				target="_blank"
				rel="noreferrer"
				class="inline-flex h-7 w-7 items-center justify-center hover:text-foreground focus-visible:text-foreground"
				aria-label="Arcten on LinkedIn"
				title="Arcten on LinkedIn"
			>
				<LinkedInLogo class="h-[22px] w-[22px]" />
			</a>
		</div>

		<div
			class="mt-10 flex flex-col gap-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between"
		>
			<div class="flex flex-wrap items-center gap-x-4 gap-y-2">
				<ArctenLogo class="h-8 w-8 text-[color:var(--brand)]" />
				<span>&copy; Arcten, Inc. {year}</span>
				<span>All rights reserved.</span>
			</div>

			<div class="flex items-center gap-5">
				<a href={resolve('/tos')} class="hover:text-foreground focus-visible:text-foreground"
					>Terms</a
				>
				<ThemeToggle />
			</div>
		</div>
	</Container>
</footer>
