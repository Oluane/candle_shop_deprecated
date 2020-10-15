export const convertCamelToSnake = (str: string): string | undefined => {
	const regex = /[\w][A-Z]/g;
	return str
		.replace(regex, ($1: string) => {
			return $1[0] + "_" + $1[1];
		})
		.toLowerCase();
};

export const convertSnakeToCamel = (str: string): string | undefined => {
	const regex = /[_][a-z0-9]/g;
	
		return str.replace(regex, (match: string) => {
			return match[1].toUpperCase();
		});
	
};

