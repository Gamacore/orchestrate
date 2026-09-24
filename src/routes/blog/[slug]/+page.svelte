<script lang="ts">
	import { resolve } from '$app/paths';
	import type { PageData } from './$types';
	import BlogTimeline from '$lib/ui/BlogTimeline.svelte';
	import { MarketingHeader } from '$lib/ui';

	let { data } = $props<{ data: PageData }>();
</script>

<svelte:head>
	<title>{data.post.title} | Arcten</title>
	<meta name="description" content={data.post.plainText.slice(0, 160)} />
</svelte:head>

<div class="flex-1 bg-background text-foreground">
	<MarketingHeader />

	<div class="px-6 py-16 sm:px-8">
		<BlogTimeline headings={data.post.headings} />

		<article class="blog-post mx-auto max-w-full" style="width: min(720px, 100%);">
			<div class="space-y-4">
				<a
					href={resolve('/blog')}
					class="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-foreground"
				>
					<span aria-hidden="true">←</span>
					All articles
				</a>
				<div class="space-y-3">
					<p class="text-sm text-muted">{data.post.formattedDate}</p>
					<h1 class="text-3xl leading-tight font-semibold text-foreground sm:text-5xl">
						{data.post.title}
					</h1>
				</div>
			</div>

			<div class="blog-prose mt-12">
				<!-- eslint-disable-next-line svelte/no-at-html-tags -->
				{@html data.post.html}
			</div>
		</article>
	</div>
</div>
