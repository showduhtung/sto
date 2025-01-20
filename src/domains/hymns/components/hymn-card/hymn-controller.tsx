import { ListMusicIcon } from "lucide-react";
import { cn } from "@/lib/tailwind";
import { useProjector } from "@/domains/projector";
import { languageMap, useLanguage } from "@/domains/language";
import { useAudios } from "@/domains/audio";

import { Button } from "@/ui/components/button";
import { VersesSelector } from "./verses-selector";
import { useHymn, useHymnContext, useHymnTypeContext, useHymnQuery } from "@/domains/hymns";

function HymnController({ active }: { active: boolean }) {
  const { hymnId } = useHymnContext();
  const { type } = useHymnTypeContext();

  const { remove, sing, audioPlayback, activeHymnId } = useHymn();
  const { remove: removeAudio, pause: pauseLocalAudios } = useAudios();

  const { panelLanguageId } = useLanguage();
  const { toggle } = useProjector();

  const { data, isLoading } = useHymnQuery({
    hymnId,
    languages: [languageMap[panelLanguageId]],
  });

  if (isLoading) return <div>Loading...</div>;
  if (!data) return <div>Not found</div>;

  const [{ num, title }] = data;

  function handleVerse(idx: number) {
    sing(hymnId, idx);
    toggle(type);
    if (activeHymnId !== hymnId) pauseLocalAudios();
  }

  function handleRemove() {
    remove(hymnId);
    removeAudio(hymnId);
  }

  if (isLoading) return <div>Loading...</div>;
  if (!data) return <div>Not found</div>;

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex items-center justify-between">
        <Button
          variant="link"
          className="flex h-fit items-center gap-2 p-0 capitalize"
          onClick={() => handleVerse(-1)}
        >
          <p className={cn("text-sm font-semibold", active ? "text-primary" : "text-black")}>
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
  );
}

export { HymnController };
