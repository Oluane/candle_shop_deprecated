import React, { createContext, useEffect, useState } from "react";

import { IntlProvider } from "react-intl";
import messages_en from "../../translations/en.json";
import messages_fr from "../../translations/fr.json";

export const IntlContext = createContext({});

const messages = {
	en: messages_en,
	fr: messages_fr,
};

const selectedLanguage = sessionStorage.getItem("selectedLanguage");

// const language =
// 	selectedLanguage || navigator.language.split(/[-_]/)[0] || navigator.userLanguage || "en";

// const message =
// 	language === "en" ? messages_en : Object.assign({}, messages_en, messages[language]);

export const IntlProviderWrapper = ({ children }) => {
	const [currentLocale, setCurrentLocale] = useState(
		selectedLanguage || navigator.language.split(/[-_]/)[0] || navigator.userLanguage || "en"
	);

	useEffect(() => {}, []);

	return (
		<IntlContext.Provider value={{ currentLocale, setCurrentLocale }}>
			<IntlProvider
				key={currentLocale}
				locale={currentLocale}
				messages={messages[currentLocale]}
				defaultLocale="en"
			>
				{children}
			</IntlProvider>
		</IntlContext.Provider>
	);
};
