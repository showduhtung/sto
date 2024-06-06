import { useQuery } from "@tanstack/react-query";
import { fetchHymn } from "~/apis/hymns";

import { Button } from "@/components/button";
import { type HymnDisplayType, useHymns } from "../../store";
import { languageMap, useLanguages } from "@/features/languages";
import { syncVerses } from "../../utilities";

type VersesSelectorProps = {
  id: string;
  type: HymnDisplayType;
  onVerseChange: (idx: number) => void;
};

function VersesSelector({ id, type, onVerseChange }: VersesSelectorProps) {
  const { activeHymnId, activeVerse, shouldWrapVerses } = useHymns(type);
  const { primaryLanguageId, secondaryLanguageId, bilingual } = useLanguages();
  const isActive = id === activeHymnId;

  const languages = bilingual
    ? [languageMap[primaryLanguageId], languageMap[secondaryLanguageId]]
    : [languageMap[primaryLanguageId]];

  const { data, isLoading } = useQuery({
    queryKey: ["hymns", id, languages.join(",")],
    queryFn: () => fetchHymn(id, languages),
  });

  if (isLoading) return <div>Loading...</div>;
  if (!data) return <div>Not found</div>;

  const [primary, secondary] = data;
  const [activePrimaryVerseIdx, activeSecondaryVerseIdx] = bilingual
    ? syncVerses(shouldWrapVerses, activeVerse, [primary.verses.length, secondary.verses.length])
    : [activeVerse];

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-1">
        {bilingual && <p className="mr-2 uppercase">{`${primary.lang}:`} </p>}
        {primary.verses.map(({ label }, idx) => (
          <Button
            key={label}
            size="xxs"
            className="w-8"
            variant="solid"
            color={isActive && activePrimaryVerseIdx === idx ? "primary" : "secondary"}
            onClick={() => onVerseChange(idx)}
          >
            {label}
          </Button>
        ))}
      </div>
      <div className="flex gap-1">
        {bilingual && <p className="mr-2 uppercase">{`${secondary.lang}:`} </p>}
        {bilingual &&
          secondary.verses.map(({ label }, idx) => (
            <Button
              key={label}
              size="xxs"
              className="w-8"
              variant="solid"
              color={isActive && activeSecondaryVerseIdx === idx ? "primary" : "secondary"}
              onClick={() => onVerseChange(idx)}
            >
              {label}
            </Button>
          ))}
      </div>
    </div>
  );
}

export { VersesSelector };
