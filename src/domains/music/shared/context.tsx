import type { PropsWithChildren } from "react";
import type { HymnId } from "~/models";
import { createSafeContext } from "@/utilities";
import { useProjectorStore } from "@/domains/projector";

import { type HymnDisplayType, useHymnsStore, useHymnTypeContext } from "@/domains/music/hymns";
import { useAudiosStore } from "@/domains/music/audio";

type MusicContext = {
  hymnId: HymnId;
  type: HymnDisplayType;
  activeVerse: number;
  isActive: boolean;
  onDelete: () => void;
  onVerseChange: (verseIdx: number) => void;
};

const [BaseMusicContextProvider, useMusicController] = createSafeContext<MusicContext>(
  "useMusicController should be wrapped in a MusicControllerProvider",
);

type MusicControllerProviderProps = PropsWithChildren<{ value: { hymnId: HymnId } }>;
function MusicControllerProvider({ value: { hymnId }, children }: MusicControllerProviderProps) {
  const { type } = useHymnTypeContext();
  const { toggle } = useProjectorStore();
  const { remove: removeHymn, activeHymnId, activeVerse, sing } = useHymnsStore();
  const { pauseAll, remove: removeAudio } = useAudiosStore();

  function onVerseChange(verseIdx: number) {
    sing(hymnId, verseIdx);
    toggle(type);
    if (activeHymnId !== hymnId) pauseAll();
  }

  function onDelete() {
    removeHymn(hymnId);
    removeAudio(hymnId);
  }

  return (
    <BaseMusicContextProvider
      value={{
        hymnId,
        type,
        activeVerse,
        isActive: hymnId === activeHymnId,
        onVerseChange,
        onDelete,
      }}
    >
      {children}
    </BaseMusicContextProvider>
  );
}

export { MusicControllerProvider, useMusicController };
