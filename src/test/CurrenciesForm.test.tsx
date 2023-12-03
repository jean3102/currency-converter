import { render, screen, fireEvent } from '@testing-library/react';
import CurrenciesForm from '../components/CurrenciesForm';

describe('currenciesForm Component', () => {
	let inputAmount: HTMLInputElement;
	let inputFrom: HTMLInputElement;
	let inputTo: HTMLInputElement;
	let exchangeButton: HTMLButtonElement;
	let clearButton: HTMLButtonElement;

	beforeEach(() => {
		render(
			<CurrenciesForm
				currenciesList={{}}
				errorMessage={null}
			/>
		);
		//handle values
		inputAmount = screen.getByLabelText(/amount/i);
		inputFrom = screen.getByLabelText(/from/i);
		inputTo = screen.getByLabelText(/to/i);
		exchangeButton = screen.getByRole('button', { name: /exchange/i });
		clearButton = screen.getByRole('button', { name: /clear/i });

		//Simulate user input
		fireEvent.change(inputAmount, { target: { value: '20' } });
		fireEvent.change(inputFrom, { target: { value: 'ALL - Albanian Lek' } });
		fireEvent.change(inputTo, { target: { value: 'USD - United States Dollar' }});
	});

	test('check if get value when user is typing', () => {
		//assert that the form inputs have the correct values
		expect(inputAmount.value).toBe('20');
		expect(inputFrom.value).toBe('ALL - Albanian Lek');
		expect(inputTo.value).toBe('USD - United States Dollar');
	});

	test('check if button clean if work ', () => {
		//Simulate user click in clear button
		fireEvent.click(clearButton);

		//make sure the form will be clean after user clicked
		expect(inputAmount.value).toBe('0');
		expect(inputFrom.value).toBe('');
		expect(inputTo.value).toBe('');
	});

	test('check if values swap places', () => {
		//simulate user click  in exchange button
		fireEvent.click(exchangeButton);

		//make sure the values swaps places
		expect(inputFrom.value).toBe('USD - United States Dollar');
		expect(inputTo.value).toBe('ALL - Albanian Lek');
	});

	
});
