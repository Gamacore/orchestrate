export const heroCopy = {
	status: 'Early access',
	eyebrow: 'Infrastructure for autonomous agents',
	heading: 'Open-model inference for',
	description:
		'Arcten is building an OpenAI-compatible inference service for long-running work. Choose faster delivery when it matters, or give the workload more time to reach a lower target rate.',
	supporting: 'Built around high-throughput agent workloads.'
} as const;

export const closingCta = {
	eyebrow: 'Early access',
	heading: 'Bring us the work that can wait.',
	body: 'Tell us the model, monthly token volume, and delivery time your workload can tolerate. We are selecting design partners for the first Arcten routes.',
	formPlaceholder: 'you@company.com',
	formLabel: 'Request early access',
	formFootnote: 'For early access and design-partner conversations.',
	emailSubject: 'Arcten early access',
	emailPrompt: 'What would you like to run?'
} as const;

export const securityCopy = {
	heading: 'SOC 2 readiness in progress',
	detail: 'Controls and evidence collection underway.'
} as const;

export const marketingNav = [
	{ label: 'Use cases', href: '#use-cases' },
	{ label: 'Pricing', href: '#pricing' },
	{ label: 'Docs', href: '/docs' },
	{ label: 'Blog', href: '/blog' }
] as const;

export const heroActions = [
	{ label: 'Request early access', href: '#access', primary: true },
	{ label: 'Preview pricing', href: '#pricing', primary: false }
] as const;

export const completionWindowRows = [
	{ window: 'Now', turnTime: 'Immediate', relativePrice: 'Baseline' },
	{ window: 'Priority', turnTime: '~1 minute target', relativePrice: 'Lower target rate' },
	{ window: 'Standard', turnTime: '~5 minute target', relativePrice: 'Lower target rate' },
	{ window: 'Flex', turnTime: 'Best effort', relativePrice: 'Lowest target rate' }
] as const;

export const useCases = [
	{
		title: 'Long-running agents',
		body: 'Run deep research, background agents, and always-on assistants that need large token budgets rather than interactive latency.'
	},
	{
		title: 'RL and training',
		body: 'Generate rollouts, synthetic data, and evaluations at a lower token cost by giving the scheduler more time.'
	},
	{
		title: 'Batch processing',
		body: 'Move labeling, enrichment, extraction, and other asynchronous batch work into the most economical completion window.'
	},
	{
		title: 'Private models',
		body: 'Deploy a private checkpoint or LoRA and use the same API and completion-window controls as the hosted catalog.'
	}
] as const;

export const faqItems = [
	{
		question: 'Is Arcten generally available?',
		answer:
			'Not yet. Arcten is working with a small number of early-access design partners while the first model routes and completion windows are validated.'
	},
	{
		question: 'What is a completion window?',
		answer:
			'A completion window tells Arcten how much scheduling flexibility a request has. The product is being designed so that more flexibility can support a lower token rate for the same model.'
	},
	{
		question: 'Are the displayed rates available today?',
		answer:
			'No. The displayed GLM-5.2 FP8 prices are preview rates and early-access targets, not a live quote. Availability and final pricing may change as capacity is validated.'
	},
	{
		question: 'Does a slower window change the model?',
		answer:
			'The intended contract keeps the selected model and precision the same across windows. The window changes scheduling flexibility rather than silently substituting another model.'
	},
	{
		question: 'Which models are planned?',
		answer:
			'Arcten is starting with frontier open models that have meaningful demand for agent and batch workloads. The initial catalog will be published as routes become ready for early access.'
	},
	{
		question: 'Can Arcten serve our own model?',
		answer:
			'Private checkpoints and LoRAs are being evaluated with design partners, but they are not presented as a generally available self-serve product today.'
	},
	{
		question: 'Is Arcten SOC 2 compliant?',
		answer:
			'SOC 2 readiness work is in progress. Controls and evidence collection are underway; Arcten does not yet claim a completed SOC 2 attestation.'
	}
] as const;
