<script lang="ts">
	import { resolve } from '$app/paths';
	import type { PageData } from './$types';
	import BlogTimeline from '$lib/ui/BlogTimeline.svelte';

	let { data } = $props<{ data: PageData }>();
</script>

<svelte:head>
	<title>{data.post.title} | Arcten</title>
	<meta name="description" content={data.post.plainText.slice(0, 160)} />
</svelte:head>

<div class="flex-1 px-8 py-16">
	<BlogTimeline headings={data.post.headings} />

	<article class="blog-post mx-auto max-w-full" style="width: min(720px, 100%);">
		<div class="space-y-3">
			<a
				href={resolve('/')}
				class="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-foreground"
			>
				<span aria-hidden="true">←</span>
				Home
			</a>
			<div class="space-y-2">
				<p class="text-sm text-muted">{data.post.formattedDate}</p>
				<h1 class="text-[1.15rem] font-semibold tracking-tight text-foreground sm:text-[1.3rem]">
					{data.post.title}
				</h1>
			</div>
		</div>

		<div class="blog-prose mt-10">
			<!-- eslint-disable-next-line svelte/no-at-html-tags -->
			{@html data.post.html}
		</div>
	</article>
</div>
