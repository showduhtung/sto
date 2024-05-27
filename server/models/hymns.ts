type LanguageType = "en";

function HymnModel(data: Record<string, any>) {
  return {
    lang: "en" as LanguageType,
    num: String(data.num),
    title: String(data.title),
    verses: data.verses.map((verse: Record<string, any>) => ({
      verse: String(verse.verse),
      lyrics: String(verse.lyrics),
    })),
  };
}

function HymnTitleModel(data: Record<string, any>) {
  return {
    id: String(data.id),
    title: String(data.title),
  };
}

export { HymnModel, HymnTitleModel };
