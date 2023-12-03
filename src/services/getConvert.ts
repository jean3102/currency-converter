import { GetConvert } from '../interfaces/Convert';
export const getConvert = async ({
	from,
	to,
	amount,
}: GetConvert['query']): Promise<GetConvert> => {
	const apiKey = import.meta.env.VITE_API_KEY;
	const apiUrl = `https://api.apilayer.com/fixer/convert?to=${to}&from=${from}&amount=${amount}`;

	const response = await fetch(apiUrl, {
		headers: { apiKey: apiKey },
	});

	const data = await response.json();
	return {
		success: data.success,
		query: data.query,
		result: data.result,
	};
};
