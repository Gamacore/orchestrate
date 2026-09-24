import { describe, expect, test } from 'bun:test';
import {
	closingCta,
	completionWindowRows,
	faqItems,
	heroActions,
	heroCopy,
	marketingNav,
	securityCopy
} from './landing';
import { docsCopy } from './docs';

describe('landing page closing copy', () => {
	test('asks for a concrete early-access workload without claiming general availability', () => {
		expect(closingCta.heading).toBe('Bring us the work that can wait.');
		expect(closingCta.body).toContain('model');
		expect(closingCta.body).toContain('monthly token volume');
		expect(closingCta.formFootnote).toContain('early access');
		expect(closingCta.body.toLowerCase()).not.toContain('without limits');
	});

	test('does not present private deployment as an already-available product', () => {
		expect(closingCta.body.toLowerCase()).not.toContain('deploy your own');
		expect(closingCta.body.toLowerCase()).not.toContain('private checkpoint');
	});
});

describe('early-access positioning', () => {
	test('keeps the Sail-style product framing while stating that Arcten is being built', () => {
		expect(heroCopy.eyebrow).toBe('Infrastructure for autonomous agents');
		expect(heroCopy.heading).toBe('Open-model inference for');
		expect(heroCopy.description).toContain('Arcten is building');
		expect(heroCopy.status).toBe('Early access');
	});

	test('does not claim market leadership or a live unlimited service', () => {
		const copy = Object.values(heroCopy).join(' ').toLowerCase();

		expect(copy).not.toContain('most cost-effective');
		expect(copy).not.toContain('most efficient');
		expect(copy).not.toContain('all frontier open models');
		expect(copy).not.toContain('without limits');
	});
});

describe('security copy', () => {
	test('describes readiness without claiming completed compliance', () => {
		const copy = `${securityCopy.heading} ${securityCopy.detail}`.toLowerCase();

		expect(securityCopy.heading).toBe('SOC 2 readiness in progress');
		expect(copy).not.toContain('soc 2 compliant');
		expect(copy).not.toContain('soc 2 certified');
	});
});

describe('marketing navigation', () => {
	test('only exposes destinations with real informational content', () => {
		expect(marketingNav).toEqual([
			{ label: 'Use cases', href: '#use-cases' },
			{ label: 'Pricing', href: '#pricing' },
			{ label: 'Docs', href: '/docs' },
			{ label: 'Blog', href: '/blog' }
		]);
	});

	test('uses an early-access action instead of a free-product claim', () => {
		expect(heroActions).toEqual([
			{ label: 'Request early access', href: '#access', primary: true },
			{ label: 'Preview pricing', href: '#pricing', primary: false }
		]);
		expect(heroActions.some((item) => item.label.toLowerCase().includes('free'))).toBe(false);
	});
});

describe('product information', () => {
	test('explains the four completion windows without presenting descriptions as guarantees', () => {
		expect(completionWindowRows).toEqual([
			{ window: 'Now', turnTime: 'Immediate', relativePrice: 'Baseline' },
			{ window: 'Priority', turnTime: '~1 minute target', relativePrice: 'Lower target rate' },
			{ window: 'Standard', turnTime: '~5 minute target', relativePrice: 'Lower target rate' },
			{ window: 'Flex', turnTime: 'Best effort', relativePrice: 'Lowest target rate' }
		]);
	});

	test('answers material pricing and completion-window questions', () => {
		const copy = faqItems.map((item) => `${item.question} ${item.answer}`).join(' ');

		expect(faqItems.length).toBeGreaterThanOrEqual(5);
		expect(copy).toContain('preview rates');
		expect(copy).toContain('early access');
		expect(copy).toContain('SOC 2 readiness work is in progress');
	});
});

describe('docs content', () => {
	test('shows the OpenAI-compatible request shape and completion window', () => {
		expect(docsCopy.quickstartCode).toContain('https://api.arcten.com/v1');
		expect(docsCopy.quickstartCode).toContain('completion_window');
		expect(docsCopy.quickstartCode).toContain('standard');
	});

	test('labels the API and private-model workflow as design previews', () => {
		expect(docsCopy.intro).toContain('design preview');
		expect(docsCopy.statusNote).toContain('illustrative');
		expect(docsCopy.statusNote).toContain('not a live endpoint');
		expect(docsCopy.customModels).toContain('being evaluated');
		expect(docsCopy.customModels).toContain('not generally available');
	});
});
