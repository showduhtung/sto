import type { PropsWithChildren } from "react";
import type { HymnId } from "~/models";
import { createSafeContext } from "@/utilities";
import { useProjectorStore } from "@/domains/projector";

import { type HymnDisplayType, useHymnsStore, useHymnTypeContext } from "@/domains/music/hymns";
import { useAudiosStore } from "@/domains/music/audio";

type MusicContext = {
  hymnId: HymnId;
  type: HymnDisplayType;
  onVerseChange: (verseIdx: number) => void;
  activeVerse: number;
  isActive: boolean;
  onDelete: () => void;
};

const [BaseMusicContextProvider, useMusicContext] = createSafeContext<MusicContext>(
  "useMusicContext should be wrapped in a MusicContextProvider",
);

type MusicProviderProps = PropsWithChildren<{ value: { hymnId: HymnId } }>;
function MusicContextProvider({ value: { hymnId }, children }: MusicProviderProps) {
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

export { MusicContextProvider, useMusicContext };
