import type { SentimentError, SentimentPayload, SentimentResponse } from '$lib/interfaces';

async function submitSentiment(text: string): Promise<SentimentResponse | SentimentError> {
	const payload: SentimentPayload = { inputs: text };

	try {
		const response = await fetch('/api/sentiment', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
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
