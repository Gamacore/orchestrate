import type { Metadata } from 'next';
import './globals.css';

const siteConfig = {
	name: 'Arcten',
	description: 'YC-backed team of AI engineers and researchers from Caltech.',
	url: 'https://arcten.com',
	ogImage: 'https://arcten.com/og.png',
	keywords: [
		'Arcten',
		'AI agents',
		'Y Combinator',
		'YC',
		'AI research',
		'coding agents',
		'multiplayer coding',
		'AI engineers',
		'San Francisco',
		'Caltech'
	]
};

export const metadata: Metadata = {
	metadataBase: new URL(siteConfig.url),
	title: {
		default: siteConfig.name,
		template: `%s | ${siteConfig.name}`
	},
	description: siteConfig.description,
	keywords: siteConfig.keywords,
	authors: [{ name: 'Arcten', url: siteConfig.url }],
	creator: 'Arcten',
	publisher: 'Arcten',
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			'max-video-preview': -1,
			'max-image-preview': 'large',
			'max-snippet': -1
		}
	},
	openGraph: {
		type: 'website',
		locale: 'en_US',
		url: siteConfig.url,
		title: siteConfig.name,
		description: siteConfig.description,
		siteName: siteConfig.name,
		images: [
			{
				url: siteConfig.ogImage,
				width: 1200,
				height: 630,
				alt: siteConfig.name
			}
		]
	},
	twitter: {
		card: 'summary_large_image',
		title: siteConfig.name,
		description: siteConfig.description,
		images: [siteConfig.ogImage],
		creator: '@arcaborat'
	},
	alternates: {
		canonical: siteConfig.url
	},
	icons: {
		icon: '/icon.svg',
		apple: '/apple-icon.png'
	}
};

const jsonLd = {
	'@context': 'https://schema.org',
	'@type': 'Organization',
	name: 'Arcten',
	url: 'https://arcten.com',
	logo: 'https://arcten.com/icon.svg',
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
	sameAs: ['https://www.ycombinator.com/companies/arcten']
};

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
				/>
				<script
					dangerouslySetInnerHTML={{
						__html: `
              (function() {
                var theme = localStorage.getItem('arcten-theme');
                if (theme === 'light') {
                  document.documentElement.classList.add('light');
                } else if (theme === 'dark') {
                  document.documentElement.classList.add('dark');
                }
              })();
            `
					}}
				/>
			</head>
			<body className="bg-background text-foreground antialiased selection:bg-foreground selection:text-background">
				{children}
			</body>
		</html>
	);
}
