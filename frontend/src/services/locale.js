import messages_en from "../translations/en.json";
import messages_fr from "../translations/fr.json";

const messages = {
	en: messages_en,
	fr: messages_fr,
};

const savedLanguage = localStorage.getItem("savedLanguage");

export const language =
	savedLanguage || navigator.language.split(/[-_]/)[0] || navigator.userLanguage || "en";

export const message =
	language === "en" ? messages_en : Object.assign({}, messages_en, messages[language]);
