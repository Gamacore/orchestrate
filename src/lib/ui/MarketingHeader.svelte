<script lang="ts">
	import { resolve } from '$app/paths';
	import { siteConfig } from '$lib/config/site';
	import { marketingNav } from '$lib/content/landing';
	import BrandLockup from '$lib/ui/BrandLockup.svelte';
	import ArctenLogo from '$lib/ui/icons/ArctenLogo.svelte';
</script>

<header class="sticky top-0 z-30 border-b border-foreground/10 bg-background/90 backdrop-blur-xl">
	<nav
		class="mx-auto flex h-[76px] w-full max-w-[1120px] items-center justify-between px-5 sm:px-6 lg:px-0"
		aria-label="Main navigation"
	>
		<a
			href={resolve('/')}
			class="flex items-center text-[color:var(--brand)] transition-opacity hover:opacity-80 focus-visible:opacity-80"
			aria-label={`${siteConfig.name} home`}
		>
			<BrandLockup name={siteConfig.name}>
				<ArctenLogo class="h-7 w-7" />
			</BrandLockup>
		</a>

		<div
			class="hidden items-center gap-7 rounded-full border border-foreground/8 bg-background/92 px-7 py-3 text-[0.9rem] font-medium text-muted shadow-[0_8px_28px_rgb(15_23_42_/_0.06)] backdrop-blur-xl md:flex"
		>
			{#each marketingNav as item (item.label)}
				<!-- Section fragments are appended to SvelteKit's resolved base path. -->
				<!-- eslint-disable svelte/no-navigation-without-resolve -->
				<a
					href={item.href === '/docs'
						? resolve('/docs')
						: item.href === '/blog'
							? resolve('/blog')
							: `${resolve('/')}${item.href}`}
					class="inline-flex items-center whitespace-nowrap hover:text-foreground focus-visible:text-foreground"
				>
					{item.label}
				</a>
				<!-- eslint-enable svelte/no-navigation-without-resolve -->
			{/each}
		</div>

		<div class="flex items-center gap-3">
			<a
				href={resolve('/blog')}
				class="text-sm font-medium text-muted hover:text-foreground focus-visible:text-foreground md:hidden"
			>
				Blog
			</a>
			<a
				href={resolve('/docs')}
				class="text-sm font-medium text-muted hover:text-foreground focus-visible:text-foreground md:hidden"
			>
				Docs
			</a>
			<a
				href={`${resolve('/')}#access`}
				class="inline-flex h-10 items-center justify-center rounded-full border border-[color:var(--brand)] bg-[color:var(--brand)] px-4 text-sm font-semibold text-white shadow-[0_10px_30px_rgb(40_70_130_/_0.18)] hover:-translate-y-0.5 hover:bg-[color:var(--brand-strong)] focus-visible:-translate-y-0.5 focus-visible:bg-[color:var(--brand-strong)] sm:h-12 sm:px-6"
			>
				<span class="sm:hidden">Access</span>
				<span class="hidden sm:inline">Request early access</span>
			</a>
		</div>
	</nav>
</header>
