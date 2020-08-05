import React, { useState, useEffect } from "react";
import "./Input.scss";
import { isInputFilled } from "../../services/utils/inputsUtils";

const Input = ({ type, name, initValue, onChange, specialClasses, isMidWidth, placeHolder }) => {
	const [value, setValue] = useState(initValue);

	useEffect(() => {
		onChange(value);
	}, [value]);

	return (
		<div
			className={
				"inputLabel" +
				(isMidWidth ? " midWidthInput" : "") +
				(specialClasses !== undefined
					? " specialDisplay"
					: isInputFilled(initValue)
					? " filled"
					: "")
			}
		>
			<input
				type={type}
				name={name}
				value={value}
				onChange={({ target: { value } }) => setValue(value)}
				className="formInput usualText"
			/>
			<span className="smallText inputPlaceholder">{placeHolder}</span>
		</div>
	);
};

export default Input;
