import { render, screen, fireEvent, waitFor, cleanup } from '@testing-library/svelte';
import { describe, test, expect, vi } from 'vitest';
import ResultModal from '$lib/components/resultModal.svelte';
import { ResultCategoryEnum } from '$lib/interfaces';
import { afterEach } from 'node:test';

const mockClose = vi.fn();
const setup = (
	props: { result: ResultCategoryEnum; score: string; onModalClose: () => void } = {
		result: ResultCategoryEnum.Good,
		score: '0.92',
		onModalClose: mockClose
	}
) => {
	return render(ResultModal, props);
};
describe('ResultModal.svelte', () => {
	afterEach(() => {
		cleanup();
	});

	test('to be rendered', () => {
		setup();

		const textarea = screen.getByTestId('resultModal');

		expect(textarea).toBeInTheDocument();
	});

	test('renders correctly with positive sentiment', async () => {
		setup();

		expect(screen.getByText('Twoja analiza jest gotowa!')).toBeInTheDocument();
		expect(screen.getByText('Pozytywny sentyment')).toBeInTheDocument();
		expect(screen.getByText('0.92')).toBeInTheDocument();
		expect(screen.getByText(/Świetnie! Twój tekst wywołuje pozytywne emocje/)).toBeInTheDocument();
	});

	test('renders correctly with negative sentiment', async () => {
		setup({ result: ResultCategoryEnum.Bad, score: '0.30', onModalClose: () => {} });

		expect(screen.getByText('Negatywny sentyment')).toBeInTheDocument();
		expect(screen.getByText('0.30')).toBeInTheDocument();
		expect(screen.getByText(/Twój tekst może być odbierany jako negatywny/)).toBeInTheDocument();
	});

	test('renders correctly with neutral sentiment', async () => {
		setup({ result: ResultCategoryEnum.Neutral, score: '0.50', onModalClose: () => {} });

		expect(screen.getByText('Neutralny sentyment')).toBeInTheDocument();
		expect(screen.getByText('0.50')).toBeInTheDocument();
		expect(screen.getByText(/Twój tekst jest neutralny/)).toBeInTheDocument();
	});

	test('calls onModalClose when the close button is clicked', async () => {
		setup();

		const closeButton = screen.getByRole('button', { name: /ok/i });
		await fireEvent.click(closeButton);

		expect(mockClose).toHaveBeenCalled();
	});

	test('closes when clicking outside the modal', async () => {
		setup();

		// Click outside the modal
		await fireEvent.click(document.body);

		await waitFor(() => expect(mockClose).toHaveBeenCalled());
	});

	test('closes when pressing Escape key', async () => {
		setup();

		await fireEvent.keyDown(document, { key: 'Escape' });

		await waitFor(() => expect(mockClose).toHaveBeenCalled());
	});
});
