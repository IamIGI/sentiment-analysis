export interface SentimentPayload {
	inputs: string;
}

export interface SentimentError {
	error: string;
	warnings?: string[];
}

export type SentimentResponse = { label: 'POSITIVE' | 'NEGATIVE'; score: number }[][];
