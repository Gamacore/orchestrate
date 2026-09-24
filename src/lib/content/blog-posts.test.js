import { describe, expect, test } from 'bun:test';
import { readFileSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';

const blogDirectory = resolve(import.meta.dir, '../../../content/blog');
const discoverablePosts = readdirSync(blogDirectory)
	.filter((filename) => filename.endsWith('.md'))
	.map((filename) => readFileSync(resolve(blogDirectory, filename), 'utf8'))
	.filter((source) => source.includes('make_discoverable: true'));

describe('inference blog', () => {
	test('publishes a useful initial collection', () => {
		expect(discoverablePosts.length).toBeGreaterThanOrEqual(3);
	});

	test('covers inference economics, completion windows, and private models', () => {
		const copy = discoverablePosts.join(' ').toLowerCase();

		expect(copy).toContain('inference cost');
		expect(copy).toContain('completion window');
		expect(copy).toContain('private model');
	});
});
