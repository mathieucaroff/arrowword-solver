import i18n from "i18next"
import { initReactI18next } from "react-i18next"
import { getConfig } from "./config"

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
  en: {
    translation: {},
  },
  fr: {
    translation: {
      "Arrowword": "Mots-fléchés",
      "Arrowwords": "Mots-fléchés",
      "Arrowword solver": "Résolveur de mots-fléchés",
      "Help solving arrowword puzzles.": "Aide à résoudre les mots-fléchés",
      "Word list": "Liste de mots",
      "other": "autre",
      "Select a file": "Selectionner un fichier",
      "Pattern": "Motif",
      "(Showing the {{count}} first results off of a total of {{total}})":
        "(Affiche les {{count}} premier résultats sur un total de {{total}})",
    },
  },
}

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: getConfig(location).language,
    interpolation: { escapeValue: false }, // react already protects from xss
  })

export { i18n }
