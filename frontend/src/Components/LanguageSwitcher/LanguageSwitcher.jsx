import "./LanguageSwitcher.scss";

import React, { useState } from "react";

import IconSvg from "../IconSvg/IconSvg";
import { IntlContext } from "../IntlContext/IntlContext";
import { useContext } from "react";

let getHumanizedLanguage = (language) => {
	switch (language) {
		case "en":
			return "English";
		case "fr":
			return "Français";
		default:
			return "English";
	}
};
const LanguageSwitcher = () => {
	const [showDropdown, setShowDropdown] = useState(false);

	const actualLang = useContext(IntlContext);

	const changeLanguage = (langId) => {
		sessionStorage.setItem("selectedLanguage", langId);
		actualLang.setCurrentLocale(langId);
	};

	return (
		<div className="languageSwitcher mediumText">
			<p className="selectorLabel">Select a language :</p>
			<div
				className={"selectorCustom " + (showDropdown ? "visible" : "")}
				onClick={() => setShowDropdown(!showDropdown)}
			>
				<span className="selectorCustomValue">
					{getHumanizedLanguage(actualLang.currentLocale)}
				</span>
				<div className={"selectorArrow " + (showDropdown ? "flip" : "")}>
					<IconSvg iconName="rightArrow" />
				</div>
			</div>
			<div className={"selectorDropdown " + (showDropdown ? "visible" : "")}>
				<p
					id="en"
					className="selectorValues"
					onClick={(e) => {
						changeLanguage(e.target.id);
					}}
				>
					English
				</p>
				<p
					id="fr"
					className="selectorValues"
					onClick={(e) => {
						changeLanguage(e.target.id);
					}}
				>
					Français
				</p>
			</div>
		</div>
	);
};

export default LanguageSwitcher;
