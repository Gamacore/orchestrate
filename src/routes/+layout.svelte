<script lang="ts">
	import { page } from '$app/state';
	import '@fontsource-variable/geist';
	import '../app.css';
	import { SiteFooter } from '$lib/ui';
	import { organizationJsonLd, siteConfig } from '$lib/config/site';

	const jsonLdMarkup =
		'<scr' +
		`ipt type="application/ld+json">${JSON.stringify(organizationJsonLd).replace(/</g, '\\u003c')}` +
		'</scr' +
		'ipt>';
	let { children } = $props();
	const footerWidth = $derived(
		page.url.pathname.startsWith('/blog/') ? 'calc(720px + 4rem)' : siteConfig.contentWidth
	);
</script>

<svelte:head>
	<title>{siteConfig.title}</title>

	<meta name="description" content={siteConfig.description} />

	<meta name="author" content={siteConfig.name} />
	<meta name="creator" content={siteConfig.name} />
	<meta name="publisher" content={siteConfig.name} />
	<meta name="robots" content="index, follow" />

	<meta
		name="googlebot"
		content="index, follow, max-video-preview:-1, max-image-preview:large, max-snippet:-1"
	/>

	<link rel="canonical" href={siteConfig.url} />
	<link rel="icon" href="/icon.svg" />
	<meta property="og:type" content="website" />
	<meta property="og:locale" content="en_US" />
	<meta property="og:site_name" content={siteConfig.name} />
	<meta property="og:title" content={siteConfig.title} />

	<meta property="og:description" content={siteConfig.description} />

	<meta property="og:url" content={siteConfig.url} />
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:title" content={siteConfig.title} />

	<meta name="twitter:description" content={siteConfig.description} />
	<meta name="twitter:site" content={siteConfig.twitterHandle} />
	<meta name="twitter:creator" content={siteConfig.twitterHandle} />

	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	{@html jsonLdMarkup}
</svelte:head>

<div class="flex min-h-screen flex-col">
	{@render children()}
	<SiteFooter width={footerWidth} />
</div>
