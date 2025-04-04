import '@testing-library/jest-dom';
import { vi } from 'vitest';

vi.mock('$app/paths', () => ({
	base: ''
}));

globalThis.Element.prototype.animate = () => ({
	onfinish: () => {},
	cancel: () => {}
});
