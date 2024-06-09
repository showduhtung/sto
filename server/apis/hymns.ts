import { type LanguageType, HymnTitleModel, HymnModel, type HymnType } from "~/models";

async function fetchHymnById(id: string, languages: LanguageType[] = ["en"]) {
  const hashed = languages.reduce(
    (acc, lang) => ({ ...acc, [lang]: false }),
    {} as Record<LanguageType, boolean>,
  );

  const responses = {} as Record<LanguageType, HymnType>;

  for (const language of Object.keys(hashed)) {
    const response = await fetch(`server/data/hymns/${language}/${id}.json`);
    const parsed = await response.json();
    responses[language as LanguageType] = HymnModel(parsed);
  }

  return languages.map((language) => responses[language]);
}

async function fetchHymns(ids: string[], language: LanguageType = "en") {
  const responses = await Promise.all(
    ids.map((id) => fetch(`server/data/hymns/${language}/${id}.json`)),
  );
  const parsed = await Promise.all(responses.map((response) => response.json()));
  return parsed.map(HymnModel);
}

async function fetchHymnTitles(language: LanguageType = "en") {
  const response = await fetch(`server/data/hymns/titles/${language}.json`);
  const parsed = await response.json();

  const hymns = Object.entries(parsed)
    .map(([id, title]) => HymnTitleModel({ id, title: title as string }))
    .sort((a, b) => {
      // Compare by number first
      const aNum = parseInt(a.id, 10);
      const bNum = parseInt(b.id, 10);

      if (aNum !== bNum) return aNum - bNum;

      // If the number is the same, sort by suffix
      const aSuffix = a.id.replace(String(aNum), "");
      const bSuffix = b.id.replace(String(bNum), "");

      if (aSuffix === bSuffix) return 0;
      return aSuffix < bSuffix ? -1 : 1;
    });

  return hymns;
}

export { fetchHymnTitles, fetchHymns, fetchHymnById };
