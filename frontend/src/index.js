import "./index.scss";
import "./reset.scss";

import * as serviceWorker from "./serviceWorker";

import App from "./Containers/App/App";
import { IntlProvider } from "react-intl";
import React from "react";
import ReactDOM from "react-dom";
import messages_en from "./translations/en.json";
import messages_fr from "./translations/fr.json";

const language = navigator.language.split(/[-_]/)[0] || navigator.userLanguage || "en";

//const language = "hi";

const messages = {
	en: messages_en,
	fr: messages_fr,
};

console.log(language);

const message =
	language === "en" ? messages_en : Object.assign({}, messages_en, messages[language]);

ReactDOM.render(
	<IntlProvider locale={language} defaultLocale="en" messages={message}>
		<React.StrictMode>
			<App />
		</React.StrictMode>
	</IntlProvider>,
	document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
