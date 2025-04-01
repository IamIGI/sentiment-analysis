import type { SentimentResponse } from '$lib/interfaces';

export default {
	getSentimentAnalysis: (data: SentimentResponse): string => {
		const sentimentScores = data[0];
		const highestScore = sentimentScores.reduce((prev, current) =>
			prev.score > current.score ? prev : current
		);
		return `Label: ${highestScore.label}, Score: ${highestScore.score.toFixed(3)}`;
	}
};
