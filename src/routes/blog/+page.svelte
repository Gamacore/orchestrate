<script lang="ts">
	import { resolve } from '$app/paths';
	import { MarketingHeader } from '$lib/ui';
	import type { PageData } from './$types';

	let { data } = $props<{ data: PageData }>();
</script>

<svelte:head>
	<title>Inference Notes | Arcten</title>
	<meta
		name="description"
		content="Notes from Arcten on inference economics, completion windows, open models, and production deployment."
	/>
</svelte:head>

<div class="flex-1 bg-background text-foreground">
	<MarketingHeader />

	<main class="mx-auto w-full max-w-[960px] px-6 py-16 sm:py-24">
		<header class="max-w-[760px]">
			<p class="text-sm font-semibold text-[color:var(--brand)]">Inference notes</p>
			<h1 class="mt-4 text-4xl leading-[1.08] font-medium text-foreground sm:text-6xl">
				The economics behind useful AI.
			</h1>
			<p class="mt-6 max-w-[680px] text-base leading-7 text-muted sm:text-lg">
				Practical notes on token cost, scheduling flexibility, open models, and operating inference
				for production workloads.
			</p>
		</header>

		<section class="mt-14 border-y border-foreground/10" aria-label="Articles">
			{#each data.posts as post (post.slug)}
				<article class="border-b border-foreground/10 py-8 last:border-b-0 sm:py-10">
					<a
						href={resolve('/blog/[slug]', { slug: post.slug })}
						class="group grid gap-4 sm:grid-cols-[150px_minmax(0,1fr)] sm:gap-8"
					>
						<p class="text-sm text-muted">{post.formattedDate}</p>
						<div>
							<h2
								class="text-xl font-semibold text-foreground group-hover:text-[color:var(--brand)] group-focus-visible:text-[color:var(--brand)] sm:text-2xl"
							>
								{post.title}
							</h2>
							<p class="mt-3 max-w-[640px] text-sm leading-6 text-muted sm:text-base">
								{post.excerpt}
							</p>
							<div class="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-xs text-muted">
								{#each post.tags as tag (tag)}
									<span>{tag}</span>
								{/each}
							</div>
						</div>
					</a>
				</article>
			{/each}
		</section>
	</main>
</div>
