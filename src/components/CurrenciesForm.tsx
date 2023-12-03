import React, { useRef, useState } from 'react';
import DetailCurrencies from './DetailCurrencies';
import { Convert } from '../interfaces/Convert';
import { CurrenciesList } from '../interfaces/Currencies';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowsRotate } from '@fortawesome/free-solid-svg-icons';
import { faMoneyBillTransfer } from '@fortawesome/free-solid-svg-icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

import '../css/currenciesForm.css';
import { inputValidation } from '../helpers/inputValidation';
import Loading from './Loading';
import useConvert from '../hooks/useConvert';

type CurrenciesFormProps = {
	currenciesList: CurrenciesList;
	errorMessage: string | null;
};

const CurrenciesForm = ({
	currenciesList,
	errorMessage,
}: CurrenciesFormProps) => {
	const fromRef = useRef<HTMLInputElement | null>(null);
	const toRef = useRef<HTMLInputElement | null>(null);
	const amountRef = useRef<HTMLInputElement | null>(null);
	const { callConvert, result, error, loading } = useConvert();

	const [currentForm, setCurrentForm] = useState({
		from: '',
		to: '',
		amount: 0,
	});

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		setCurrentForm((prevFormData) => ({ ...prevFormData, [name]: value }));

		event.target.style.border = '1px solid #cccccc'; //* reset default color on input
	};

	const handleValidation = ({ from, to, amount }: Convert): boolean => {
		const validations = [
			{
				current: amountRef.current,
				validation: amount > 0,
			},
			{
				current: fromRef.current,
				validation: from !== '',
			},
			{
				current: toRef.current,
				validation: to !== '',
			},
		];

		return inputValidation(validations);
	};

	const handleData = () => {
		const from = currentForm.from.split('-');
		const to = currentForm.to.split('-');
		const amount = currentForm.amount;

		return {
			from: from[0].trim(),
			to: to[0].trim(),
			amount: amount,
		};
	};

	const exchangeCoins = () => {
		setCurrentForm((preventForm) => ({
			...preventForm,
			from: currentForm.to,
			to: currentForm.from,
		}));
	};

	const clearForm = () => {
		setCurrentForm({
			from: '',
			to: '',
			amount: 0,
		});
	};

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const values = handleData(); //* format he input data
		if (!handleValidation(values)) return; //!validate input data

		if(!errorMessage) callConvert(values);
	};

	return (
		<>
			<form onSubmit={handleSubmit}>
				<fieldset className="formGroup">
					<label htmlFor="amount">Amount</label>
					<input
						id="amount"
						type="number"
						name="amount"
						ref={amountRef}
						value={currentForm.amount}
						onChange={handleChange}
					/>
				</fieldset>
				<fieldset className="formGroup">
					<label htmlFor="from">From:</label>
					<input
						list="currenciesListFrom"
						id="from"
						name="from"
						value={currentForm.from}
						onChange={handleChange}
						ref={fromRef}
					/>
					<datalist id="currenciesListFrom">
						{Object.entries(currenciesList).map(([code, name]) => {
							return (
								<option
									key={code}
									value={`${code} - ${name}`}></option>
							);
						})}
					</datalist>
				</fieldset>
				<fieldset className="formGroup">
					<label htmlFor="to">To:</label>
					<input
						list="currenciesListTo"
						id="to"
						name="to"
						value={currentForm.to}
						onChange={handleChange}
						ref={toRef}
					/>

					<datalist id="currenciesListTo">
						{Object.entries(currenciesList).map(([code, name]) => {
							return (
								<option
									key={code}
									value={`${code} - ${name}`}></option>
							);
						})}
					</datalist>
				</fieldset>

				<fieldset className="buttons">
					<button
						type="button"
						onClick={exchangeCoins}>
						<FontAwesomeIcon icon={faArrowsRotate} /> Exchange
					</button>
					<button
						disabled={loading}
						type="submit">
						<FontAwesomeIcon icon={faMoneyBillTransfer} /> Convert{' '}
					</button>
					<button
						type="reset"
						onClick={clearForm}>
						<FontAwesomeIcon icon={faXmark} /> Clear
					</button>
				</fieldset>
			</form>
			<div className="error">
				{errorMessage ? <p>{errorMessage}</p> : error ? <p>{error}</p> : ''}
			</div>
			{loading ? <Loading /> : <DetailCurrencies currencies={result} />}
		</>
	);
};

export default CurrenciesForm;
