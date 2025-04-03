import {
	ResultCategoryEnum,
	type SentimentAnalysis,
	type SentimentResponse
} from '$lib/interfaces';

export default {
	getSentimentAnalysis: (data: SentimentResponse): SentimentAnalysis => {
		const borderScore = 0.65;
		const sentimentScores = data[0];

		const positiveScore = sentimentScores.find((s) => s.label === 'POSITIVE')?.score ?? 0;
		const negativeScore = sentimentScores.find((s) => s.label === 'NEGATIVE')?.score ?? 0;

		let resultCategory: ResultCategoryEnum = ResultCategoryEnum.Neutral;
		if (positiveScore > borderScore) resultCategory = ResultCategoryEnum.Good;
		if (negativeScore > borderScore) resultCategory = ResultCategoryEnum.Bad;
		const finalScore = positiveScore.toFixed(2);

		return {
			resultCategory,
			score: finalScore.split('.')[1] == '00' ? finalScore.split('.')[0] : finalScore
		};
	}
};
