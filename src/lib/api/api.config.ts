import envConstants from '$lib/constants/env.constants';
import type { SentimentError, SentimentPayload, SentimentResponse } from '$lib/interfaces';

const API_URL =
	'https://api-inference.huggingface.co/models/distilbert-base-uncased-finetuned-sst-2-english';
const ACCESS_TOKEN = envConstants.VITE_API_HUGGINGFACE_ACCESS_TOKEN;

async function submitSentiment(text: string): Promise<SentimentResponse | SentimentError> {
	const payload: SentimentPayload = { inputs: text };
	try {
		const response = await fetch(API_URL, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${ACCESS_TOKEN}`,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(payload)
		});

		return await response.json();
	} catch (error) {
		console.error('Error:', error);
		if (typeof (error as SentimentError).error === 'string') {
			return error as SentimentError;
		}

		return {
			error: 'Failed to fetch sentiment result'
		};
	}
}

export default {
	submitSentiment
};
