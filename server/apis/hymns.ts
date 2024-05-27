import { HymnTitleModel } from "~/models";
import { LanguageType } from "~/models/language";

async function fetchHymnTitles(language: LanguageType = "en") {
  const response = await fetch(`server/data/hymns/titles/${language}.json`);
  const parsed = await response.json();

  const hymns = Object.entries(parsed)
    .map(([id, title]) => HymnTitleModel({ id, title }))
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

export { fetchHymnTitles };
