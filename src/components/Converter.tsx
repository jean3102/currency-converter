import useCurrencies from '../hooks/useCurrenciesList';
import CurrentList from './CurrenciesForm';
import '../css/converter.css';

const Converter = () => {
	const { currencies, error } = useCurrencies();

	return (
		<main>
			<section className="container">
				<h1>Currency Converter</h1>
				<CurrentList currenciesList={currencies} errorMessage={error} />
			</section>
		</main>
	);
};

export default Converter;
