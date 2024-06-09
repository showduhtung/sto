type LanguageType = "en" | "zh" | "id";
type DialectType = "en" | "zh" | "zh-simple" | "id";

type LanguageKey =
  | "sermon.title"
  | "sermon.title_translation"
  | "sermon.subtitle"
  | "sermon.subtitle_translation"
  | "sermon.footer";

function LanguageModel(data: Record<LanguageKey, string>) {
  return data;
}

export type { LanguageType, DialectType, LanguageKey };
export { LanguageModel };
