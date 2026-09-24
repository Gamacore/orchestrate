import { error } from '@sveltejs/kit';
import { getPublishedBlogPostBySlug, getPublishedBlogPostSlugs } from '$lib/content/blog.server';

export function entries() {
	return getPublishedBlogPostSlugs().map((slug) => ({
		slug
	}));
}

export function load({ params }) {
	const post = getPublishedBlogPostBySlug(params.slug);

	if (!post) {
		throw error(404, 'Post not found.');
	}

	return {
		post
	};
}
