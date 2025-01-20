import { Button } from "@/ui/components/button";
import { useLanguage } from "@/domains/language";
import { useKeyboardNavigation } from "./verses-selector.utilities";

import { useHymn, syncVerses, useHymnContext, useHymnQuery } from "@/domains/hymns";

function VersesSelector({ onVerseChange }: { onVerseChange: (idx: number) => void }) {
  const { hymnId } = useHymnContext();
  const { activeHymnId, activeVerse, shouldWrapVerses } = useHymn();
  const { languages, bilingual } = useLanguage();
  const isActive = hymnId === activeHymnId;

  const { data = [], isLoading } = useHymnQuery({ hymnId, languages });

  useKeyboardNavigation(hymnId, Math.max(...data.map(({ verses }) => verses.length)) - 1);

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
