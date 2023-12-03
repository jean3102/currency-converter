import { useEffect, useState } from 'react';
import { getCurrencies } from '../services/getCurrencies ';
import { CurrenciesList } from '../interfaces/Currencies';

const useCurrenciesList = () => {
	const [currencies, setCurrencies] = useState<CurrenciesList>({});
	const [error, setError] = useState<null | string>(null);

	useEffect(() => {
		getCurrencies()
			.then((res) => {
				if (res.success) return setCurrencies(res.symbols);
				setError(res.message);
			})
			.catch((error) => {
				setError(error);
			});
	}, []);

	return { currencies, error };
};

export default useCurrenciesList;
