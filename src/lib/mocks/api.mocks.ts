import { ResultCategoryEnum, type SentimentAnalysis } from '$lib/interfaces';

export const response = [
	[
		{
			label: 'POSITIVE',
			score: 0.9994519352912903
		},
		{
			label: 'NEGATIVE',
			score: 0.000548055162653327
		}
	]
];
export const text = 'Svelte is most favorite framework across the developers';
export const SENTIMENT_ANALYSIS_MOCK: SentimentAnalysis = {
	resultCategory: ResultCategoryEnum.Bad,
	score: '0.612'
};
export const payload = { inputs: text };
