export const siteConfig = {
	name: 'Arcten',
	title: 'Arcten | Long-horizon autonomous research and coding agents',
	headline: 'Long-horizon autonomous research and coding agents.',
	description:
		'Arcten builds long-horizon autonomous research and coding agents, backed by Y Combinator with roots in AI research at Caltech and based in San Francisco.',
	url: 'https://arcten.com',
	twitterHandle: '@arcteninc',
	contentWidth: '560px'
} as const;

export const organizationJsonLd = {
	'@context': 'https://schema.org',
	'@type': 'Organization',
	name: siteConfig.name,
	url: siteConfig.url,
	logo: `${siteConfig.url}/icon.svg`,
	description: siteConfig.description,
	foundingDate: '2024',
	founders: [
		{
			'@type': 'Person',
			name: 'Arcten Team'
		}
	],
	address: {
		'@type': 'PostalAddress',
		addressLocality: 'San Francisco',
		addressRegion: 'CA',
		addressCountry: 'US'
	},
	sameAs: [
		'https://x.com/arcteninc',
		'https://github.com/arcten',
		'https://www.ycombinator.com/companies/arcten'
	]
} as const;
