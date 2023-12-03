import { screen, render } from '@testing-library/react';
import DetailCurrencies from '../components/DetailCurrencies';

describe('Detail Currencies Component', () => {
	const currencies = {
		success: true,
		query: {
			from: 'ALL',
			to: 'AMD',
			amount: 5,
		},
		result: 21.669135,
	};

	test('check if list is rendered', () => {
		render(<DetailCurrencies currencies={currencies} />);
		screen.getByText(/5 ALL = 21.669 AMD/!);
		screen.getByText(/1 ALL = 4.334 AMD/!);
		screen.getByText(/1 AMD = 0.231 AMD/!);
	});

	test('does not render when data is undefined', () => {
		const { container } = render(<DetailCurrencies currencies={undefined} />);
		expect(container.firstChild).toBeNull();
	});
});

