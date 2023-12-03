type inputValidation = {
	current: HTMLInputElement | null;
	validation: boolean;
}[];

export const inputValidation = (inputs: inputValidation): boolean => {
	let checkEmptyInput = 0;
	for (const value of inputs) {
		if (value.current) {
			if (!value.validation) {
				checkEmptyInput++;
				value.current.style.border = '1px solid red';
			}
		}
	}
	return checkEmptyInput === 0; //!return false if find input empty
};
