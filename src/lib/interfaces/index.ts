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

export enum ResultCategoryEnum {
	Good = 'good',
	Neutral = 'neutral',
	Bad = 'bad'
}

export interface SentimentAnalysis {
	resultCategory: ResultCategoryEnum;
	score: string;
}
