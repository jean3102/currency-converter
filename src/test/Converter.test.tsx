import { render, screen } from '@testing-library/react';
import Converter from '../components/Converter';

beforeEach(() => {
	render(<Converter />);
});

describe('Converter Component', () => {
	test('check if component is rendered', () => {
		expect(screen.getByRole('heading', { name: 'Currency Converter' }));
	});
});
