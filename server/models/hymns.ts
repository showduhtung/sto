import type { LanguageType } from "./language";

type VerseAttribute = { label: string; num: number; html: string };
type HymnAttribute = {
  lang: string;
  num: string;
  title: string;
  verses: VerseAttribute[];
};

type HymnTitleAttribute = {
  id: string;
  title: string;
};

type HymnType = ReturnType<typeof HymnModel>;

function HymnModel(data: HymnAttribute) {
  return {
    lang: data.lang as LanguageType,
    num: String(data.num),
    title: String(data.title),
    verses: data.verses.map((verse) => ({
      label: String(verse.label),
      num: Number(verse.num),
      html: String(verse.html),
    })),
  };
}

function HymnTitleModel(data: HymnTitleAttribute) {
  return {
    id: String(data.id),
    title: String(data.title),
  };
}

export type { HymnType };
export { HymnModel, HymnTitleModel };
