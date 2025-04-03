import AsyncButton from '../lib/components/asyncButton.svelte';
import { afterEach, describe, expect, test } from 'vitest';
import { createRawSnippet } from 'svelte';
import { cleanup, render } from '@testing-library/svelte';

const childrenComponent = () => ({
	render() {
		return `<span>Click me</span>`; // This is correct
	}
});
const snippet = createRawSnippet(childrenComponent);

describe('AsyncButton Component', () => {
	afterEach(() => {
		cleanup(); // Automatically cleans up after each test, preventing memory leaks
	});
	test('to be rendered', async () => {
		const { getByRole } = render(AsyncButton, { props: { isLoading: false } });

		// Check if button is in the document
		const button = getByRole('button');
		expect(button).toBeInTheDocument();
	});
	test('renders children when not loading', async () => {
		const { getByText } = render(AsyncButton, {
			props: { isLoading: false, children: snippet }
		});

		// Check if the children content is rendered
		expect(getByText('Click me')).toBeInTheDocument();
	});

	test('shows loading spinner when isLoading is true', async () => {
		const { container } = render(AsyncButton, {
			props: { isLoading: true, children: snippet }
		});

		// Check if the loader spinner is in the document
		const loader = container.querySelector('.loader-spinner');
		expect(loader).toBeInTheDocument();
	});

	test('does not show children when loading', async () => {
		const { queryByText } = render(AsyncButton, {
			props: { isLoading: true, children: snippet }
		});

		// Check if the children text is not present when loading
		const childrenText = queryByText('Click me');
		expect(childrenText).not.toBeInTheDocument();
	});
	test('passes AsyncButton props correctly', async () => {
		const { getByRole } = render(AsyncButton, {
			props: { isLoading: false, children: snippet, type: 'submit' }
		});

		// Check if the button has the correct type attribute
		const button = getByRole('button');
		expect(button).toHaveAttribute('type', 'submit');
	});
});
