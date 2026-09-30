export const agents = [
	{
		id: 'research-scout',
		name: 'Research scout',
		description: 'Collects and synthesizes source material for research briefs.',
		model: 'GLM-5.2',
		window: 'Flex',
		status: 'Running',
		lastRun: '2 minutes ago',
		tokens: '84.2k',
		estimatedCost: '$2.84'
	},
	{
		id: 'eval-runner',
		name: 'Eval runner',
		description: 'Runs model and tool-call evaluations against a curated task set.',
		model: 'GLM-5.2',
		window: 'Standard',
		status: 'Queued',
		lastRun: '8 minutes ago',
		tokens: '42.8k',
		estimatedCost: '$1.92'
	},
	{
		id: 'catalog-enricher',
		name: 'Catalog enricher',
		description: 'Extracts structured product data from incoming catalog records.',
		model: 'GLM-5.2',
		window: 'Priority',
		status: 'Complete',
		lastRun: '34 minutes ago',
		tokens: '12.4k',
		estimatedCost: '$0.88'
	}
] as const;

export const completionWindows = [
	{ name: 'Now', detail: 'Immediate start', price: 'Baseline' },
	{ name: 'Priority', detail: '~1 minute target', price: 'Lower target rate' },
	{ name: 'Standard', detail: '~5 minute target', price: 'Lower target rate' },
	{ name: 'Flex', detail: 'Best effort', price: 'Lowest target rate' }
] as const;
