export const isInputFilled = (str : string) : boolean => (str ? true : false);

export const checkingNullableField = (fieldValue : string) : string | null => (fieldValue === "" ? null : fieldValue);
