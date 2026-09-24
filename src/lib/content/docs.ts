export const docsCopy = {
	eyebrow: 'API preview',
	heading: 'One API. Four completion windows.',
	intro:
		'This design preview shows the API Arcten is building: select a model, choose how long the request can wait, and keep the OpenAI client you already use.',
	statusNote:
		'The request below is illustrative and documents the intended interface. api.arcten.com is not a live endpoint for general use.',
	quickstartCode: `from openai import OpenAI

client = OpenAI(
    base_url="https://api.arcten.com/v1",
    api_key="YOUR_ARCTEN_API_KEY",
)

response = client.responses.create(
    model="zai-org/GLM-5.2",
    input="Run a deep research task.",
    max_output_tokens=4096,
    metadata={"completion_window": "standard"},
)

print(response.output_text)`,
	requestFields: [
		{ name: 'model', detail: 'A model route enabled for your early-access account.' },
		{ name: 'input', detail: 'Text input in the OpenAI Responses API shape.' },
		{ name: 'max_output_tokens', detail: 'The maximum output budget for the request.' },
		{
			name: 'metadata.completion_window',
			detail: 'One of now, priority, standard, or flex.'
		}
	],
	customModels:
		'Private checkpoints and LoRAs are being evaluated with design partners. Managed private deployments are not generally available today.'
} as const;
