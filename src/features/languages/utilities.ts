const languages: { id: LanguageId; text: string; display: string }[] = [
  { id: "en", text: "English", display: "EN" },
  { id: "zh", text: "简体中文", display: "ZH" },
  { id: "zh-simple", text: "繁體中文", display: "ZH" },
  { id: "id", text: "Bahasa Indonesia", display: "ID" },
];

type LanguageId = "en" | "zh" | "zh-simple" | "id";
// type LanguageType = "en" | "zh" | "id";

export type { LanguageId };
export { languages };
