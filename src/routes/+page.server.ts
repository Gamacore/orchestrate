import { getPublishedBlogPosts } from '$lib/content/blog.server';

export const csr = true;

export function load() {
	return {
		blogPosts: getPublishedBlogPosts()
	};
}
