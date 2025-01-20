import type { HymnId } from "~/models";

import { AudioContextProvider, AudioController, useAudiosStore } from "@/domains/music/audio";
import { MusicContextProvider } from "@/domains/music/shared";
import { HymnCardController } from "./hymn-card-controller";
import { HymnVerseSelector } from "./hymn-verse-selector/hymn-verse-selector";

function HymnCard({ hymnId }: { hymnId: HymnId }) {
  const { audios } = useAudiosStore();
  const { store } = audios.find(({ hymnId: id }) => id === hymnId)!;

  return (
    <AudioContextProvider value={{ store }}>
      <MusicContextProvider value={{ hymnId }}>
        <div className="rounded-md border border-primary/10 bg-white shadow-sm">
          <HymnCardController>
            <HymnVerseSelector />
          </HymnCardController>
          <AudioController />
        </div>
      </MusicContextProvider>
    </AudioContextProvider>
  );
}

export { HymnCard };
