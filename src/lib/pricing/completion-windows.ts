export type CompletionWindowKey = 'now' | 'priority' | 'standard' | 'flex';

export type CompletionWindow = {
	key: CompletionWindowKey;
	label: string;
	apiValue: string;
	inputRate: number;
	cachedRate: number;
	outputRate: number;
};

export const completionWindowOrder: CompletionWindowKey[] = ['now', 'priority', 'standard', 'flex'];

export const completionWindows: Record<CompletionWindowKey, CompletionWindow> = {
	now: {
		key: 'now',
		label: 'Now',
		apiValue: 'now',
		inputRate: 1.4,
		cachedRate: 0.26,
		outputRate: 4.4
	},
	priority: {
		key: 'priority',
		label: '~1 min',
		apiValue: 'priority',
		inputRate: 0.7,
		cachedRate: 0.18,
		outputRate: 3
	},
	standard: {
		key: 'standard',
		label: '~5 min',
		apiValue: 'standard',
		inputRate: 0.5,
		cachedRate: 0.12,
		outputRate: 2.5
	},
	flex: {
		key: 'flex',
		label: 'Flexible',
		apiValue: 'flex',
		inputRate: 0.4,
		cachedRate: 0.08,
		outputRate: 1.8
	}
};

export const pricingCopy = {
	eyebrow: 'Preview pricing',
	heading: 'Use it now. Pay less when it can wait.',
	explanation:
		'These early-access targets show the intended tradeoff: the same model at a lower token rate when a request gives Arcten more scheduling flexibility.',
	lockNotice: 'Illustrative GLM-5.2 FP8 target rates. This preview is not a live quote.'
} as const;
