import { useQuery } from "@tanstack/react-query";
import { fetchHymn } from "~/apis/hymns";

import { Button } from "@/components/button";
import { type HymnDisplayType, useHymns } from "../../store";
import { useLanguages } from "@/features/languages";
import { syncVerses } from "../../utilities";
import { useKeyboardNavigation } from "./verses-selector.utilities";

type VersesSelectorProps = {
  id: string;
  type: HymnDisplayType;
  onVerseChange: (idx: number) => void;
};

function VersesSelector({ id, type, onVerseChange }: VersesSelectorProps) {
  const { activeHymnId, activeVerse, shouldWrapVerses } = useHymns(type);
  const { languages, bilingual } = useLanguages();
  const isActive = id === activeHymnId;

  const { data = [], isLoading } = useQuery({
    queryKey: ["hymns", id, languages.join(",")],
    queryFn: () => fetchHymn(id, languages),
  });

  useKeyboardNavigation(id, type, Math.max(...data.map(({ verses }) => verses.length)) - 1);

  if (isLoading) return <div>Loading...</div>;
  if (data.length === 0) return <div>Not found</div>;

  const [primary, secondary] = data;
  const [activePrimaryVerseIdx, activeSecondaryVerseIdx] = bilingual
    ? syncVerses(shouldWrapVerses, activeVerse, [primary.verses.length, secondary.verses.length])
    : [activeVerse];

  const shouldShowSecondary = bilingual && secondary.verses.length !== primary.verses.length;

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-1">
        {shouldShowSecondary && <p className="mr-2 uppercase">{`${primary.lang}:`} </p>}
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
        {shouldShowSecondary && <p className="mr-2 uppercase">{`${secondary.lang}:`} </p>}
        {shouldShowSecondary &&
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
