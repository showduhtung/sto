import { ListMusicIcon } from "lucide-react";

import { cn } from "@/lib/tailwind";

import { useProjector } from "@/features/projector";
import { languageMap, useLanguage } from "@/features/languages";
import { useAudio } from "@/features/audio";

import { Button } from "@/components/button";
import { VersesSelector } from "./verses-selector";
import { useHymnQuery } from "../../apis";
import { useHymn } from "../../store";
import { useHymnContext } from "../../context";

function HymnController({ active }: { active: boolean }) {
  const { hymnId, type } = useHymnContext();
  const { remove, setActive, audioPlayback } = useHymn(type);
  const { remove: removeAudio, pauseAll: pauseAudios } = useAudio(type);
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
    setActive(hymnId, idx);
    toggle(type);
    pauseAudios();
  }

  function handleRemove() {
    remove(hymnId);
    removeAudio(hymnId);
    setActive("", -1);
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
