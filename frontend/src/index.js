import "./index.scss";
import "./reset.scss";

import * as serviceWorker from "./serviceWorker";

import { language, message } from "./services/locale";

import App from "./Containers/App/App";
import { IntlProvider } from "react-intl";
import React from "react";
import ReactDOM from "react-dom";

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
