import type { DialectType, LanguageType } from "~/models";

type Options<T> = { value: T; label: string; shortened?: string; disabled?: boolean };

const languages: Options<DialectType>[] = [
  { value: "en", label: "English", shortened: "EN" },
  { value: "zh", label: "简体中文", shortened: "ZH" },
  { value: "zh-simple", label: "繁體中文", shortened: "ZH", disabled: true },
  { value: "id", label: "Bahasa Indonesia", shortened: "ID", disabled: true },
];

const languageMap: Record<DialectType, LanguageType> = {
  en: "en",
  zh: "zh",
  "zh-simple": "zh",
  id: "id",
};

export { languages, languageMap };
