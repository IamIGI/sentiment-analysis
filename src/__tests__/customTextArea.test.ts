import CustomTextarea from '$lib/components/customTextarea.svelte';
import { cleanup, render, screen, fireEvent } from '@testing-library/svelte';
import { afterEach, describe, expect, test, vi } from 'vitest';

const setup = (
	props: { onSubmit: () => void; onTextChange: (text: string) => void } = {
		onSubmit: () => {},
		onTextChange: (text: string) => console.log(text || 'testText')
	}
) => {
	return render(CustomTextarea, { props });
};

describe('CustomTextArea Component', () => {
	afterEach(() => {
		cleanup();
	});
	test('to be rendered', () => {
		setup();

		const textarea = screen.getByTestId('customTextarea');

		expect(textarea).toBeInTheDocument();
	});

	test('updates character count as text is entered', async () => {
		setup();

		const textarea = screen.getByTestId('customTextarea');
		await fireEvent.input(textarea, { target: { value: 'Hello' } });

		const charCounter = screen.getByText(/5 \/ 500/);
		expect(charCounter).toBeInTheDocument();
		expect(charCounter.textContent).toBe('5 / 500');
	});

	test('trims text to 500 characters', async () => {
		setup();

		const textarea = screen.getByTestId('customTextarea');
		const longText = 'A'.repeat(525); // Text longer than 500 characters
		await fireEvent.input(textarea, { target: { value: longText } });

		expect(screen.getByText('500 / 500')).toBeInTheDocument();
	});

	test('calls onTextChange when input changes', async () => {
		const onTextChange = vi.fn();
		setup({ onSubmit: () => {}, onTextChange });

		const textarea = screen.getByTestId('customTextarea');
		await fireEvent.input(textarea, { target: { value: 'New text' } });

		expect(onTextChange).toHaveBeenCalledWith('New text');
	});

	test('calls onSubmit when Enter is pressed (without Shift)', async () => {
		const onSubmit = vi.fn();
		setup({ onSubmit, onTextChange: () => {} });

		const textarea = screen.getByTestId('customTextarea');
		await fireEvent.keyDown(textarea, { key: 'Enter', shiftKey: false });

		expect(onSubmit).toHaveBeenCalled();
	});

	test('does not call onSubmit when Shift + Enter is pressed', async () => {
		const onSubmit = vi.fn();
		setup({ onSubmit, onTextChange: () => {} });

		const textarea = screen.getByTestId('customTextarea');
		await fireEvent.keyDown(textarea, { key: 'Enter', shiftKey: true });

		expect(onSubmit).not.toHaveBeenCalled();
	});

	test('adjusts textarea height based on content', async () => {
		setup();

		const textarea = screen.getByTestId('customTextarea');
		const initialHeight = textarea.style.height;

		// Input content to make the height adjust
		await fireEvent.input(textarea, { target: { value: 'Some text' } });
		const newHeight = textarea.style.height;

		expect(newHeight).not.toBe(initialHeight); // Height should change after input
	});
});
