export interface Convert {
	from: string;
	to: string;
	amount: number;
}

export interface GetConvert {
	success?: boolean;
	query: Convert;
	result: number;
}
