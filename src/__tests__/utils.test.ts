import { describe, it, expect, afterEach } from 'vitest';
import sentimentUtils from '../lib/utils/app.utils';
import { ResultCategoryEnum, type SentimentResponse } from '../lib/interfaces/index';
import { cleanup } from '@testing-library/svelte';

afterEach(() => {
	cleanup(); // Automatically cleans up after each test, preventing memory leaks
});

describe('getSentimentAnalysis', () => {
	it('should return Good category with correct score when positive score exceeds borderScore', () => {
		const mockResponse: SentimentResponse = [
			[
				{ label: 'POSITIVE', score: 0.8997 },
				{ label: 'NEGATIVE', score: 0.1 }
			]
		];

		const result = sentimentUtils.getSentimentAnalysis(mockResponse);

		expect(result.resultCategory).toBe(ResultCategoryEnum.Good);
		expect(result.score).toBe('0.90');
	});

	it('should return Bad category with correct score when negative score exceeds borderScore', () => {
		const mockResponse: SentimentResponse = [
			[
				{ label: 'POSITIVE', score: 0.3 },
				{ label: 'NEGATIVE', score: 0.7 }
			]
		];

		const result = sentimentUtils.getSentimentAnalysis(mockResponse);

		expect(result.resultCategory).toBe(ResultCategoryEnum.Bad);
		expect(result.score).toBe('0.30');
	});

	it('should return Neutral category with correct score when neither score exceeds borderScore', () => {
		const mockResponse: SentimentResponse = [
			[
				{ label: 'POSITIVE', score: 0.5 },
				{ label: 'NEGATIVE', score: 0.5 }
			]
		];

		const result = sentimentUtils.getSentimentAnalysis(mockResponse);

		expect(result.resultCategory).toBe(ResultCategoryEnum.Neutral);
		expect(result.score).toBe('0.50');
	});

	it('should return integer score when decimal part is zero', () => {
		const mockResponse: SentimentResponse = [
			[
				{ label: 'POSITIVE', score: 0.999 },
				{ label: 'NEGATIVE', score: 0.0 }
			]
		];

		const result = sentimentUtils.getSentimentAnalysis(mockResponse);

		expect(result.resultCategory).toBe(ResultCategoryEnum.Good);
		expect(result.score).toBe('1');
	});
});
