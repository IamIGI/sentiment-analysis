import envConstants from '$lib/constants/env.constants';
import type { SentimentError, SentimentPayload, SentimentResponse } from '$lib/interfaces';

const API_URL =
	'https://api-inference.huggingface.co/models/distilbert-base-uncased-finetuned-sst-2-english';
const ACCESS_TOKEN = envConstants.VITE_API_HUGGINGFACE_ACCESS_TOKEN;

async function fetchWithAuth(endpoint: string, options: RequestInit = {}): Promise<Response> {
	return fetch(endpoint, {
		...options,
		headers: {
			Authorization: `Bearer ${ACCESS_TOKEN}`,
			'Content-Type': 'application/json',
			...options.headers
		}
	});
}

async function submitSentiment(text: string): Promise<SentimentResponse | SentimentError> {
	const payload: SentimentPayload = { inputs: text };

	try {
		const response = await fetchWithAuth(API_URL, {
			method: 'POST',
			body: JSON.stringify(payload)
		});

		return await response.json();
	} catch (error) {
		console.error('Error:', error);
		return { error: 'Pobranie analizy sentymentu zakończone niepowodzeniem.' };
	}
}

export default {
	submitSentiment
};
