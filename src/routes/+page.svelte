<script lang="ts">
	import { resolve } from '$app/paths';
	import type { PageData } from './$types';
	import { ArrowRight } from 'lucide-svelte';
	import { siteConfig } from '$lib/config/site';
	import { AsciiHero, BrandLockup, ChipLink } from '$lib/ui';
	import ArctenLogo from '$lib/ui/icons/ArctenLogo.svelte';
	import LocationIcon from '$lib/ui/icons/LocationIcon.svelte';

	let { data } = $props<{ data: PageData }>();
</script>

<div class="flex flex-1 flex-col">
	<main
		class="mx-auto flex max-w-full flex-1 flex-col justify-center px-8 py-16"
		style={`width: ${siteConfig.contentWidth};`}
	>
		<header class="mb-8">
			<div class="mb-4">
				<div class="flex items-center gap-3 text-sm">
					<BrandLockup name={siteConfig.name}>
						<ArctenLogo class="h-6 w-6" />
					</BrandLockup>
					<ChipLink
						href="https://x.com/arcteninc"
						external
						className="text-muted hover:text-foreground focus-visible:text-foreground"
					>
						x
					</ChipLink>
					<ChipLink
						href="https://github.com/arcten"
						external
						className="text-muted hover:text-foreground focus-visible:text-foreground"
					>
						git
					</ChipLink>
				</div>
			</div>
			<h1 class="max-w-[32rem] text-sm font-semibold tracking-tight text-foreground">
				{siteConfig.headline}
			</h1>
			<div class="mt-3 space-y-1 text-sm leading-relaxed text-muted">
				<p>
					Backed by <ChipLink href="https://www.ycombinator.com/companies/arcten" external>
						Y Combinator
					</ChipLink>. Roots in AI research at Caltech.
				</p>
			</div>
		</header>

		<div class="mb-8">
			<AsciiHero />
			<div class="mt-2 text-left">
				<span class="inline-flex items-center gap-1 text-sm text-muted">
					<LocationIcon class="h-3 w-3" />
					We're based in San Francisco!
				</span>
			</div>
		</div>

		{#if data.blogPosts.length > 0}
			<section aria-labelledby="blog-heading" class="mt-12">
				<h2 id="blog-heading" class="mb-4 text-base font-medium text-foreground">Blog</h2>

				<div class="flex flex-col">
					{#each data.blogPosts as post (post.slug)}
						<article>
							<a
								href={resolve('/blog/[slug]', { slug: post.slug })}
								class="group flex w-full min-w-0 flex-col items-start gap-1 py-2.5 opacity-40 transition-opacity duration-0 hover:opacity-100 sm:flex-row sm:items-center sm:justify-between"
							>
								<div class="flex w-full min-w-0 items-center gap-1.5">
									<h3 class="truncate text-sm font-medium text-foreground">{post.title}</h3>
									<span
										class="hidden w-0 overflow-hidden transition-all duration-100 ease-out group-hover:ml-1 group-hover:w-3 sm:inline-flex"
									>
										<ArrowRight
											size={12}
											strokeWidth={2.5}
											class="-translate-x-1 opacity-0 transition-all duration-100 ease-out group-hover:translate-x-0 group-hover:opacity-100"
										/>
									</span>
								</div>
								<span class="text-sm text-muted sm:ml-4 sm:shrink-0">
									{post.formattedDate}
								</span>
							</a>
						</article>
					{/each}
				</div>
			</section>
		{/if}
	</main>
</div>
