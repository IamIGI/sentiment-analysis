import Modal from '$lib/components/modals/modal.svelte';
import { cleanup, render, screen } from '@testing-library/svelte';
import { createRawSnippet, type Snippet } from 'svelte';
import { afterEach, describe, expect, test } from 'vitest';

const childrenComponent = () => ({
	render() {
		return `<span>Click me</span>`;
	}
});
const snippet = createRawSnippet(childrenComponent);
const setup = (
	props: { children: Snippet<[]> } = {
		children: snippet
	}
) => {
	return render(Modal, {
		props
	});
};

describe('Modal component', () => {
	afterEach(() => {
		cleanup();
	});
	test('to be rendered', async () => {
		setup();

		const modal = screen.getByTestId('modal');

		expect(modal).toBeInTheDocument();
	});
	test('renders children', async () => {
		setup();

		// Check if the children content is rendered
		const children = screen.getByText('Click me');

		expect(children).toBeInTheDocument();
	});
});
