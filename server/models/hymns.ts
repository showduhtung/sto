import type { LanguageType } from "./language";

type HymnAttribute = {
  lang: string;
  num: string;
  title: string;
  verses: {
    label: string;
    num: number;
    html: string;
  }[];
};

type HymnTitleAttribute = {
  id: string;
  title: string;
};

function HymnModel(data: HymnAttribute) {
  return {
    lang: "en" as LanguageType,
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

export { HymnModel, HymnTitleModel };
