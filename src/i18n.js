import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import en from "./locales/en.json";
import pt from "./locales/pt.json";

// As traduções vão no bundle: são pequenas e evitam uma requisição
// extra (e o Suspense) antes do primeiro render.
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      pt: { translation: pt },
      en: { translation: en },
    },
    supportedLngs: ["pt", "en"],
    nonExplicitSupportedLngs: true,
    load: "languageOnly",
    fallbackLng: "pt",
    interpolation: { escapeValue: false },
  });

const syncDocumentLanguage = (language) => {
  document.documentElement.lang = language.startsWith("pt") ? "pt-BR" : "en";
};

syncDocumentLanguage(i18n.resolvedLanguage ?? "pt");
i18n.on("languageChanged", syncDocumentLanguage);

export default i18n;
