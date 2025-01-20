import { ListMusicIcon } from "lucide-react";
import { cn } from "@/lib/tailwind";
import { languageMap, useLanguageStore } from "@/domains/language";

import { Button } from "@/ui/components/button";
import { useHymnSettingsStore, useHymnQuery } from "@/domains/music/hymns";
import { useMusicContext } from "@/domains/music/shared";
import { HymnControllerSkeleton } from "./hymn-card-controller.skeleton";

function HymnCardController({ children }: { children?: React.ReactNode }) {
  const { panelLanguageId } = useLanguageStore();
  const { audioPlayback } = useHymnSettingsStore();
  const { hymnId, onDelete, onVerseChange, isActive } = useMusicContext();

  const { data, isLoading } = useHymnQuery({
    hymnId,
    languages: [languageMap[panelLanguageId]],
  });

  if (isLoading) return <HymnControllerSkeleton>{children}</HymnControllerSkeleton>;
  if (!data) return <div>Not found</div>;

  const [{ num, title }] = data;

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex items-center justify-between">
        <Button
          variant="link"
          className="flex h-fit items-center gap-2 p-0 capitalize"
          onClick={() => onVerseChange(-1)}
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
          onClick={onDelete}
        >
          Remove
        </Button>
      </div>

      {children}
    </div>
  );
}

export { HymnCardController };
