import type { HymnId } from "~/models";

import { AudioContextProvider, AudioController, useAudiosStore } from "@/domains/music/audio";
import { MusicControllerProvider } from "@/domains/music/shared";
import { HymnController, HymnVerseSelector } from "@/domains/music/hymns/components";

function MusicCard({ hymnId }: { hymnId: HymnId }) {
  const { audios } = useAudiosStore();
  const { store } = audios.find(({ hymnId: id }) => id === hymnId)!;

  return (
    <AudioContextProvider value={{ store }}>
      <MusicControllerProvider value={{ hymnId }}>
        <div className="rounded-md border border-primary/10 bg-white shadow-sm">
          <HymnController>
            <HymnVerseSelector />
          </HymnController>
          <AudioController />
        </div>
      </MusicControllerProvider>
    </AudioContextProvider>
  );
}

export { MusicCard };
