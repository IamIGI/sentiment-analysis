import { json, type RequestHandler } from '@sveltejs/kit';
import { HUGGINGFACE_ACCESS_TOKEN } from '$env/static/private';

//--consts
const API_URL =
	'https://api-inference.huggingface.co/models/distilbert-base-uncased-finetuned-sst-2-english';

//--inner methods
async function fetchWithAuth(endpoint: string, options: RequestInit = {}): Promise<Response> {
	return fetch(endpoint, {
		...options,
		headers: {
			Authorization: `Bearer ${HUGGINGFACE_ACCESS_TOKEN}`,
			'Content-Type': 'application/json',
			...options.headers
		}
	});
}

//--requests
export const POST: RequestHandler = async ({ request }) => {
	const body = await request.json();

	const response = await fetchWithAuth(API_URL, {
		method: 'POST',
		body: JSON.stringify(body)
	});

	const result = await response.json();

	return json(result, {
		status: response.status
	});
};
