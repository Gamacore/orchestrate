import { Marked, marked } from 'marked';
import { createHighlighter } from 'shiki';
import { siteConfig } from '$lib/config/site';

type BlogFrontmatter = {
	title: string;
	slug: string;
	published_date: string;
	tags: string[];
	publish: boolean;
	make_discoverable: boolean;
	is_page: boolean;
};

export type BlogPostListItem = {
	title: string;
	slug: string;
	publishedDate: string;
	formattedDate: string;
};

export type BlogPost = BlogPostListItem & {
	tags: string[];
	html: string;
	headings: BlogHeading[];
	plainText: string;
	makeDiscoverable: boolean;
};

export type BlogHeading = {
	id: string;
	text: string;
	level: number;
	children: BlogHeading[];
};

type FlatBlogHeading = Omit<BlogHeading, 'children'>;

type MarkdownToken = {
	type: string;
	text?: string;
	depth?: number;
	tokens?: MarkdownToken[];
	items?: Array<MarkdownToken & { tokens?: MarkdownToken[] }>;
};

const blogModules = import.meta.glob('/content/blog/*.md', {
	query: '?raw',
	import: 'default',
	eager: true
}) as Record<string, string>;

const siteHostname = new URL(siteConfig.url).hostname.replace(/^www\./, '');
const shikiHighlighter = await createHighlighter({
	themes: ['vitesse-light', 'vitesse-black'],
	langs: ['shellscript', 'markdown', 'python', 'docker', 'xml', 'html']
});

const shikiLanguageMap: Record<string, string> = {
	bash: 'shellscript',
	dockerfile: 'docker',
	html: 'html',
	md: 'markdown',
	markdown: 'markdown',
	py: 'python',
	python: 'python',
	sh: 'shellscript',
	shell: 'shellscript',
	shellscript: 'shellscript',
	xml: 'xml'
};

function parseFrontmatter(source: string): BlogFrontmatter {
	const match = source.match(/^---\n([\s\S]*?)\n---/);

	if (!match) {
		throw new Error('Missing frontmatter in blog post.');
	}

	const frontmatter: Record<string, string> = {};

	for (const rawLine of match[1].split('\n')) {
		const line = rawLine.trim();

		if (!line) {
			continue;
		}

		const separatorIndex = line.indexOf(':');

		if (separatorIndex === -1) {
			continue;
		}

		const key = line.slice(0, separatorIndex).trim();
		const value = line.slice(separatorIndex + 1).trim();

		frontmatter[key] = value;
	}

	return {
		title: frontmatter.title ?? '',
		slug: frontmatter.slug ?? '',
		published_date: frontmatter.published_date ?? '',
		tags: (frontmatter.tags ?? '')
			.split(',')
			.map((tag) => tag.trim())
			.filter(Boolean),
		publish: frontmatter.publish === 'true',
		make_discoverable: frontmatter.make_discoverable === 'true',
		is_page: frontmatter.is_page === 'true'
	};
}

function stripFrontmatter(source: string) {
	return source.replace(/^---\n[\s\S]*?\n---\n*/, '');
}

function formatBlogDate(date: string) {
	return new Date(date).toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'short',
		day: 'numeric',
		timeZone: 'UTC'
	});
}

function escapeHtmlAttribute(value: string) {
	return value
		.replaceAll('&', '&amp;')
		.replaceAll('"', '&quot;')
		.replaceAll('<', '&lt;')
		.replaceAll('>', '&gt;');
}

function escapeHtml(value: string) {
	return value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
}

function renderPlainCodeBlock(text: string) {
	const lines = text
		.split('\n')
		.map((line) => `<span class="line">${line ? escapeHtml(line) : ''}</span>`)
		.join('');

	return `<pre class="shiki shiki-plain"><code>${lines}</code></pre>`;
}

function slugifyHeading(text: string) {
	return text
		.toLowerCase()
		.trim()
		.replace(/[`'"()[\]{}:.,!?/\\]/g, '')
		.replace(/\s+/g, '-')
		.replace(/-+/g, '-');
}

function createHeadingSlugger() {
	const counts = new Map<string, number>();

	return (text: string) => {
		const base = slugifyHeading(text) || 'section';
		const count = counts.get(base) ?? 0;

		counts.set(base, count + 1);

		return count === 0 ? base : `${base}-${count}`;
	};
}

function collectHeadingTokens(
	tokens: MarkdownToken[],
	headings: FlatBlogHeading[],
	slugify: (text: string) => string
) {
	for (const token of tokens) {
		if (token.type === 'heading') {
			const text = token.text?.trim();

			if (text) {
				headings.push({
					id: slugify(text),
					text,
					level: token.depth ?? 1
				});
			}
		}

		if (token.tokens?.length) {
			collectHeadingTokens(token.tokens, headings, slugify);
		}

		if (token.items?.length) {
			for (const item of token.items) {
				if (item.tokens?.length) {
					collectHeadingTokens(item.tokens, headings, slugify);
				}
			}
		}
	}
}

function extractFlatHeadings(markdown: string) {
	const headings: FlatBlogHeading[] = [];
	const tokens = marked.lexer(markdown) as MarkdownToken[];
	const slugify = createHeadingSlugger();

	collectHeadingTokens(tokens, headings, slugify);

	return headings;
}

function buildHeadingTree(flatHeadings: FlatBlogHeading[]) {
	const root: BlogHeading[] = [];
	const stack: BlogHeading[] = [];

	for (const heading of flatHeadings) {
		const node: BlogHeading = {
			...heading,
			children: []
		};

		while (stack.length > 0 && stack[stack.length - 1].level >= node.level) {
			stack.pop();
		}

		if (stack.length === 0) {
			root.push(node);
		} else {
			stack[stack.length - 1].children.push(node);
		}

		stack.push(node);
	}

	return root;
}

function renderMarkdown(markdown: string, flatHeadings: FlatBlogHeading[]) {
	let headingIndex = 0;
	const parser = new Marked({
		gfm: true,
		breaks: false
	});

	parser.use({
		renderer: {
			code(token) {
				const requestedLanguage = token.lang?.trim().toLowerCase();
				const language = requestedLanguage ? shikiLanguageMap[requestedLanguage] : undefined;

				if (!language) {
					return renderPlainCodeBlock(token.text);
				}

				return shikiHighlighter.codeToHtml(token.text, {
					lang: language,
					themes: {
						light: 'vitesse-light',
						dark: 'vitesse-black'
					}
				});
			},
			heading(token) {
				const id = flatHeadings[headingIndex]?.id ?? slugifyHeading(token.text ?? 'section');
				const depth = token.depth ?? 2;

				headingIndex += 1;

				return `<h${depth} id="${escapeHtmlAttribute(id)}">${this.parser.parseInline(token.tokens)}</h${depth}>`;
			},
			link(token) {
				const href = token.href?.trim();

				if (!href) {
					return this.parser.parseInline(token.tokens);
				}

				const external = isExternalHref(href);
				const text = this.parser.parseInline(token.tokens);
				const title = token.title ? ` title="${escapeHtmlAttribute(token.title)}"` : '';
				const target = external ? ' target="_blank" rel="noopener noreferrer"' : '';
				const arrow = external ? '&#8599;' : '&#8594;';

				return `<a href="${escapeHtmlAttribute(href)}" class="text-link text-link--muted"${title}${target}><span class="text-link__label">${text}</span><span aria-hidden="true" class="text-link__arrow-wrap"><span class="text-link__arrow"> ${arrow} </span></span></a>`;
			}
		}
	});

	return parser.parse(markdown) as string;
}

function isExternalHref(href: string) {
	if (!href || href.startsWith('/') || href.startsWith('#') || href.startsWith('mailto:')) {
		return false;
	}

	try {
		const url = new URL(href, siteConfig.url);

		if (url.protocol !== 'http:' && url.protocol !== 'https:') {
			return false;
		}

		return url.hostname.replace(/^www\./, '') !== siteHostname;
	} catch {
		return false;
	}
}

function toPlainText(markdown: string) {
	return markdown
		.replace(/```[\s\S]*?```/g, ' ')
		.replace(/`([^`]+)`/g, '$1')
		.replace(/!\[[^\]]*\]\([^)]+\)/g, ' ')
		.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
		.replace(/^#{1,6}\s+/gm, '')
		.replace(/^>\s?/gm, '')
		.replace(/[*_~]/g, '')
		.replace(/\n+/g, ' ')
		.replace(/\s+/g, ' ')
		.trim();
}

function getAllBlogPosts(): BlogPost[] {
	return Object.values(blogModules)
		.map((source) => {
			const frontmatter = parseFrontmatter(source);
			const markdown = stripFrontmatter(source).trim();
			const flatHeadings = extractFlatHeadings(markdown);

			return {
				title: frontmatter.title,
				slug: frontmatter.slug,
				publishedDate: frontmatter.published_date,
				formattedDate: formatBlogDate(frontmatter.published_date),
				tags: frontmatter.tags,
				headings: buildHeadingTree(flatHeadings),
				html: renderMarkdown(markdown, flatHeadings),
				plainText: toPlainText(markdown),
				makeDiscoverable: frontmatter.make_discoverable,
				publish: frontmatter.publish,
				is_page: frontmatter.is_page
			};
		})
		.filter((post) => post.publish && !post.is_page)
		.sort((left, right) => {
			return new Date(right.publishedDate).getTime() - new Date(left.publishedDate).getTime();
		});
}

export function getPublishedBlogPosts(): BlogPostListItem[] {
	return getAllBlogPosts()
		.filter((post) => post.makeDiscoverable)
		.map((post) => ({
			title: post.title,
			slug: post.slug,
			publishedDate: post.publishedDate,
			formattedDate: post.formattedDate
		}));
}

export function getPublishedBlogPostSlugs() {
	return getAllBlogPosts().map((post) => post.slug);
}

export function getPublishedBlogPostBySlug(slug: string) {
	return getAllBlogPosts().find((post) => post.slug === slug) ?? null;
}
