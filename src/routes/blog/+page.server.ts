import { getPublishedBlogPosts } from '$lib/content/blog.server';

export function load() {
	return {
		posts: getPublishedBlogPosts()
	};
}
