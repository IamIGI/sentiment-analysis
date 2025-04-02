export interface SentimentPayload {
	inputs: string;
}

export interface SentimentError {
	error: string;
	warnings?: string[];
}

export type SentimentResponse = { label: 'POSITIVE' | 'NEGATIVE'; score: number }[][];

export interface AnalysisResultDesc {
	iconName: string;
	color: string;
	title: string;
	desc: string;
}
