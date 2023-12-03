import { useState } from 'react';
import { Convert, GetConvert } from '../interfaces/Convert';
import { getConvert } from '../services/getConvert';

const useConvert = () => {
	const [result, setResult] = useState<GetConvert | null>();
	const [error, setError] = useState<null | string>(null);
	const [loading, setLoading] = useState(false);

	const callConvert = async (values: Convert) => {
		setLoading(true);
		setError(null);
		setResult(null);

		try {
			const res = await getConvert(values);
			if (!res.success) {
				return setError('Error sending data.');
			} else {
				setResult(res);
			}
		} catch (error) {
			setError('An error occurred with the API.');
		} finally {
			setLoading(false);
			setTimeout(() => {
				setError(null);
			}, 3000);
		}
	};

	return { callConvert, error, loading, result };
};

export default useConvert;
