import { Button } from "@/components/button";
import { cn } from "@/lib/tailwind";
import { ListMusicIcon } from "lucide-react";

import { useProjector } from "@/features/projector";
import { languageMap, useLanguages } from "@/features/languages";

import { type HymnDisplayType, useHymns } from "../../store";
import { VersesSelector } from "./verses-selector";
import { AudioControls } from "./audio-controls";
import { CardAccordion } from "./card-accordion";
import { useHymnQuery } from "../../apis";

type HymnCardProps = { id: string; type: HymnDisplayType };

function HymnCard({ id, type }: HymnCardProps) {
  const { activeHymnId, remove, setActive, audioPlayback } = useHymns(type);
  const { toggle } = useProjector();
  const { panelLanguageId } = useLanguages();
  const { data, isLoading } = useHymnQuery(id, [languageMap[panelLanguageId]]);

  if (isLoading) return <div>Loading...</div>;
  if (!data) return <div>Not found</div>;

  const isActive = id === activeHymnId;
  const [{ num, title }] = data;

  function handleVerse(idx: number) {
    setActive(id, idx);
    toggle(type);
  }

  return (
    <div className="flex flex-col rounded-md border border-primary/10 bg-white p-4 shadow-sm">
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
          onClick={() => {
            remove(id);
            setActive("", -1);
          }}
        >
          Remove
        </Button>
      </div>

      <div className="h-4" />
      <VersesSelector id={id} type={type} onVerseChange={handleVerse} />
      <CardAccordion open={audioPlayback}>
        <div className="mt-4">
          <AudioControls />
        </div>
      </CardAccordion>
    </div>
  );
}

export { HymnCard };
