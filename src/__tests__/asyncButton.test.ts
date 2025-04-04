import AsyncButton from '$lib/components/ui/asyncButton.svelte';
import { afterEach, describe, expect, test } from 'vitest';
import { createRawSnippet, type Snippet } from 'svelte';
import { cleanup, render, screen } from '@testing-library/svelte';
import type { HTMLButtonAttributes } from 'svelte/elements';

const childrenComponent = () => ({
	render() {
		return `<span>Click me</span>`; // This is correct
	}
});
const snippet = createRawSnippet(childrenComponent);
const setup = (
	props: { isLoading: boolean; children?: Snippet<[]> } & Partial<HTMLButtonAttributes> = {
		isLoading: false,
		children: snippet
	}
) => {
	return render(AsyncButton, {
		props
	});
};

describe('AsyncButton Component', () => {
	afterEach(() => {
		cleanup();
	});
	test('to be rendered', async () => {
		setup();

		const button = screen.getByRole('button');
		expect(button).toBeInTheDocument();
	});
	test('renders children when not loading', async () => {
		setup();

		// Check if the children content is rendered
		const children = screen.getByText('Click me');

		expect(children).toBeInTheDocument();
	});

	test('shows loading spinner when isLoading is true', async () => {
		const { container } = setup({ isLoading: true });

		// Check if the loader spinner is in the document
		const loader = container.querySelector('.loader-spinner');

		expect(loader).toBeInTheDocument();
	});

	test('does not show children when loading', async () => {
		setup({ isLoading: true });

		// Check if the children text is not present when loading
		const childrenText = screen.queryByText('Click me');

		expect(childrenText).not.toBeInTheDocument();
	});
	test('passes AsyncButton props correctly', async () => {
		setup({ isLoading: false, type: 'submit' });

		// Check if the button has the correct type attribute
		const button = screen.getByRole('button');

		expect(button).toHaveAttribute('type', 'submit');
	});
});
