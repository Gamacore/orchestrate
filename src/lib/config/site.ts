export const siteConfig = {
	name: 'Arcten',
	title: 'Arcten | Cost-effective inference for autonomous agents',
	headline: 'The most cost-effective inference for autonomous agents.',
	description:
		'Run popular open models or deploy your own with immediate inference when speed matters and lower rates when work can wait.',
	url: 'https://arcten.com',
	twitterHandle: '@arcteninc',
	contentWidth: '1120px'
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
