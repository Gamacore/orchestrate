import { describe, expect, test } from 'bun:test';
import { completionWindowOrder, completionWindows, pricingCopy } from './completion-windows';

describe('completion-window pricing', () => {
	test('offers the four Sail-style completion windows in speed order', () => {
		expect(completionWindowOrder).toEqual(['now', 'priority', 'standard', 'flex']);
		expect(completionWindowOrder.map((key) => completionWindows[key].label)).toEqual([
			'Now',
			'~1 min',
			'~5 min',
			'Flexible'
		]);
	});

	test('uses the current on-demand GLM-5.2 rate for Now', () => {
		expect(completionWindows.now).toMatchObject({
			apiValue: 'now',
			inputRate: 1.4,
			cachedRate: 0.26,
			outputRate: 4.4
		});
	});

	test('reduces every token rate as scheduling flexibility increases', () => {
		for (let index = 1; index < completionWindowOrder.length; index += 1) {
			const faster = completionWindows[completionWindowOrder[index - 1]];
			const moreFlexible = completionWindows[completionWindowOrder[index]];

			expect(moreFlexible.inputRate).toBeLessThan(faster.inputRate);
			expect(moreFlexible.cachedRate).toBeLessThan(faster.cachedRate);
			expect(moreFlexible.outputRate).toBeLessThan(faster.outputRate);
		}
	});

	test('labels rates as a preview rather than claiming a live price lock', () => {
		expect(pricingCopy.eyebrow).toBe('Preview pricing');
		expect(pricingCopy.explanation).toContain('early-access targets');
		expect(pricingCopy.lockNotice).toContain('not a live quote');
		expect(pricingCopy.lockNotice).toContain('GLM-5.2 FP8');
		expect(pricingCopy.lockNotice.toLowerCase()).not.toContain('locked');
	});
});
