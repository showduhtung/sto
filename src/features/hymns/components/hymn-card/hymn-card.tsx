import { Button } from "@/components/button";
import { cn } from "@/lib/tailwind";
import { ListMusicIcon } from "lucide-react";

import { useProjector } from "@/features/projector";
import { languageMap, useLanguages } from "@/features/languages";

import { VersesSelector } from "./verses-selector";
import { AudioTrack } from "./audio-track";
import { CardAccordion } from "./card-accordion";

import { type HymnDisplayType, useHymns } from "../../store";
import { useHymnQuery } from "../../apis";
import { TimestampTools } from "./timestamp-tools";

type HymnCardProps = { id: string; type: HymnDisplayType };

function HymnCard({ id, type }: HymnCardProps) {
  const { activeHymnId, remove, setActive, audioPlayback, timestampTools } = useHymns(type);
  const { toggle } = useProjector();
  const { panelLanguageId } = useLanguages();
  const { data, isLoading } = useHymnQuery(id, [languageMap[panelLanguageId]]);

  if (isLoading) return <div>Loading...</div>;
  if (!data) return <div>Not found</div>;

  const isActive = id === activeHymnId;
  const showAudio = audioPlayback && isActive;
  const [{ num, title }] = data;

  function handleVerse(idx: number) {
    setActive(id, idx);
    toggle(type);
  }

  return (
    <div className="flex flex-col gap-4 rounded-md border border-primary/10 bg-white pt-4 shadow-sm">
      <div className="flex items-center justify-between px-4">
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
          onClick={() => {
            remove(id);
            setActive("", -1);
          }}
        >
          Remove
        </Button>
      </div>

      <div className="px-4">
        <VersesSelector id={id} type={type} onVerseChange={handleVerse} />
      </div>
      <div>
        <CardAccordion open={showAudio}>
          <AudioTrack className="px-4 pb-2 pt-4" type={type} />
        </CardAccordion>
        <CardAccordion open={showAudio && timestampTools}>
          <TimestampTools className="px-4 pb-4 pt-2" />
        </CardAccordion>
      </div>
    </div>
  );
}

export { HymnCard };
