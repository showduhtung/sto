import { Button } from "@/components/ui/button";
import { useLanguageStore } from "@/domains/language";
import { syncVerses, useHymnQuery, useHymnSettingsStore } from "@/domains/music/hymns";
import { useMusicController } from "@/domains/music/shared";
import { useKeyboardNavigationForVerses } from "./use-keyboard-navigation-for-verses";

function HymnVerseSelector() {
  const { languages, bilingual } = useLanguageStore();
  const { hymnId, isActive, onVerseChange, activeVerse } = useMusicController();
  const { shouldWrapVerses } = useHymnSettingsStore();
  const { data = [], isLoading } = useHymnQuery({ hymnId, languages });

  useKeyboardNavigationForVerses(hymnId, Math.max(...data.map(({ verses }) => verses.length)) - 1);

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

export { HymnVerseSelector };
