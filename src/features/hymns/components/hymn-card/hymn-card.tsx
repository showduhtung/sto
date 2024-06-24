import { ListMusicIcon } from "lucide-react";

import type { HymnId } from "~/models";
import { cn } from "@/lib/tailwind";

import { useProjector } from "@/features/projector";
import { languageMap, useLanguage } from "@/features/languages";
import { AudioButtons, TrackSettings, TimestampTools, useAudio } from "@/features/audio";

import { Button } from "@/components/button";
import { VersesSelector } from "./verses-selector";
import { CardAccordionSection } from "./card-accordion-section";
import { type HymnDisplayType, useHymn, useHymnSettings } from "../../store";
import { useHymnQuery } from "../../apis";
import { HymnContextProvider, useHymnContext } from "../../context";

function HymnCard({ id, type }: { id: HymnId; type: HymnDisplayType }) {
  const { activeHymnId, remove, setActive, audioPlayback } = useHymn(type);
  const { remove: removeAudio } = useAudio();
  const { toggle } = useProjector();
  const { panelLanguageId } = useLanguage();

  const { data, isLoading } = useHymnQuery({
    hymnId: id,
    languages: [languageMap[panelLanguageId]],
  });

  if (isLoading) return <div>Loading...</div>;
  if (!data) return <div>Not found</div>;

  const isActive = id === activeHymnId;
  const [{ num, title }] = data;

  function handleVerse(idx: number) {
    setActive(id, idx);
    toggle(type);
  }

  function handleRemove() {
    remove(id);
    removeAudio(id);
    setActive("", -1);
  }

  return (
    <HymnContextProvider value={{ id, type }}>
      <div className="rounded-md border border-primary/10 bg-white shadow-sm">
        <div className="flex flex-col gap-4 p-4">
          <div className="flex items-center justify-between">
            <Button
              variant="link"
              className="flex h-fit items-center gap-2 p-0 capitalize"
              onClick={() => handleVerse(-1)}
            >
              <p className={cn("text-sm font-semibold", isActive ? "text-primary" : "text-black")}>
                {`${num}. ${title}`}
              </p>
              {audioPlayback && <ListMusicIcon className="text-primary" height="18" width="18" />}
            </Button>

            <Button
              variant="text"
              size="xxs"
              color="danger"
              className="font-semibold"
              onClick={handleRemove}
            >
              Remove
            </Button>
          </div>

          <VersesSelector onVerseChange={handleVerse} />
        </div>
        <AudioSettings />
      </div>
    </HymnContextProvider>
  );
}

function AudioSettings() {
  const { id, type } = useHymnContext();
  const { activeHymnId } = useHymn(type);
  const { audioPlayback, timestampTools } = useHymnSettings();

  const isActive = id === activeHymnId;

  return (
    <CardAccordionSection open={audioPlayback} className="flex flex-col bg-zinc-100 p-4">
      <div className="flex h-10 items-center">
        <TrackSettings />
      </div>

      <CardAccordionSection open={audioPlayback && isActive} className="flex h-10 items-center">
        <AudioButtons />
      </CardAccordionSection>

      <CardAccordionSection
        open={audioPlayback && isActive && timestampTools}
        className="mb-[-4px] flex h-10 items-center"
      >
        <TimestampTools />
      </CardAccordionSection>
    </CardAccordionSection>
  );
}

export { HymnCard };
