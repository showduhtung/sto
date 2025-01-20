import { type DialectType, LanguageModel } from "~/models";

async function fetchLanguage(language: DialectType = "en") {
  const response = await fetch(`server/data/intl/${language}.json`);
  const parsed = await response.json();

  return LanguageModel(parsed);
}

export { fetchLanguage };
