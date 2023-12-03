import { GetConvert } from '../interfaces/Convert';
import '../css/detailCurrencies.css';
import { memo } from 'react';

type DetailCurrenciesProps = {
	currencies?: GetConvert | null;
};
const DetailCurrencies = memo(({ currencies }: DetailCurrenciesProps) => {
	const from = currencies?.query.from;
	const to = currencies?.query.to;
	const amount = currencies?.query.amount || 0;
	const result = currencies?.result || 0;

	return (
		<>
			{currencies ? (
				<section className="detailCurrencies">
					<ul>
						<li>
							<b>
								{amount} {from} = {result.toFixed(3)} {to}
							</b>
						</li>
						<li>
							<span>
								1 {from} = {(result / amount).toFixed(3)} {to}
							</span>
						</li>
						<li>
							<span>
								1 {to} = {(1 / (result / amount)).toFixed(3)} {to}
							</span>
						</li>
					</ul>
				</section>
			) : (
				''
			)}
		</>
	);
});

export default DetailCurrencies;
