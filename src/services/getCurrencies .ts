export const getCurrencies = async () => {
	const apiKey = import.meta.env.VITE_API_KEY;
	const apiUrl = `https://api.apilayer.com/fixer/symbols`;

	const response = await fetch(apiUrl, {
		headers: { apiKey: apiKey },
	});
	return await response.json();
};
