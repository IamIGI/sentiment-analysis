import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/svelte';
import { afterEach, describe, expect, test, vi } from 'vitest';
import TextAnalysis from '$lib/components/textAnalysis.svelte';
import apiConfig from '$lib/api/api.config';
import {
	ResultCategoryEnum,
	type SentimentAnalysisResult,
	type SentimentResponse
} from '$lib/interfaces';

// Mock successful API response
const mockApiSuccessResult: SentimentResponse = [
	[
		{
			label: 'POSITIVE',
			score: 0.924519352912903
		},
		{
			label: 'NEGATIVE',
			score: 0.000548055162653327
		}
	]
];
const mockSuccessResult: SentimentAnalysisResult = {
	resultCategory: ResultCategoryEnum.Good,
	score: '0.92'
};

const setup = (onResult = vi.fn()) => {
	return render(TextAnalysis, { props: { onResult } });
};

describe('SentimentComponent', () => {
	afterEach(() => {
		vi.restoreAllMocks();
		cleanup();
	});

	test('renders the component properly', () => {
		setup();

		// Check if the component is in the document
		const component = screen.getByTestId('textAnalysis');

		expect(component).toBeInTheDocument();
	});

	test('disables submit button when text is empty', async () => {
		setup();

		const textarea = screen.getByTestId('customTextarea');
		const button = screen.getByTestId('asyncButton');

		waitFor(() => expect(button).toBeDisabled());

		// Enter valid text
		await fireEvent.input(textarea, { target: { value: 'Valid input' } });
		waitFor(() => expect(button).not.toBeDisabled());
	});

	test('displays error message on API failure', async () => {
		setup();
		vi.spyOn(apiConfig, 'submitSentiment').mockResolvedValueOnce({ error: 'API error occurred' });

		const textarea = screen.getByTestId('customTextarea');
		const button = screen.getByTestId('asyncButton');

		await fireEvent.input(textarea, { target: { value: 'Test' } });
		await fireEvent.click(button);

		// Wait for error message
		await waitFor(() => {
			expect(screen.getByText('API error occurred')).toBeInTheDocument();
		});
	});

	test('clear error message when user types', async () => {
		setup();
		const errorMsg = 'API error occurred';
		vi.spyOn(apiConfig, 'submitSentiment').mockResolvedValueOnce({
			error: errorMsg
		});

		const textarea = screen.getByTestId('customTextarea');
		const button = screen.getByTestId('asyncButton');

		await fireEvent.input(textarea, { target: { value: 'Test' } });
		await fireEvent.click(button);

		// Wait for error message
		await waitFor(() => {
			expect(screen.getByText('API error occurred')).toBeInTheDocument();
		});

		//Typing should trigger clear error msg
		await fireEvent.input(textarea, { target: { value: 'Test message' } });

		await waitFor(() => {
			const updatedErrMsg = screen.queryByText(errorMsg);
			expect(updatedErrMsg).not.toBeInTheDocument();
		});
	});

	test('clears input and calls onResult on successful API response', async () => {
		const mockOnResult = vi.fn();
		setup(mockOnResult);
		vi.spyOn(apiConfig, 'submitSentiment').mockResolvedValueOnce(mockApiSuccessResult);

		const textarea = screen.getByTestId('customTextarea') as HTMLTextAreaElement;
		const button = screen.getByTestId('asyncButton');

		await fireEvent.input(textarea, { target: { value: 'Test' } });
		await fireEvent.click(button);

		expect(apiConfig.submitSentiment).toHaveBeenCalledWith('Test');
		await waitFor(() => {
			expect(mockOnResult).toHaveBeenCalledWith(expect.objectContaining(mockSuccessResult));
		});
		expect(textarea.value).toBe('');
	});

	test('onSubmit is triggered when Enter is pressed', async () => {
		setup();
		const mockSubmit = vi
			.spyOn(apiConfig, 'submitSentiment')
			.mockResolvedValueOnce(mockApiSuccessResult);

		const textarea = screen.getByTestId('customTextarea') as HTMLTextAreaElement;

		await fireEvent.input(textarea, { target: { value: 'Test' } });
		await fireEvent.keyDown(textarea, { key: 'Enter', shiftKey: false });

		expect(mockSubmit).toHaveBeenCalled();
	});
});
