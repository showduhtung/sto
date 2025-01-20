import type { HymnId } from "~/models";

import { AudioContextProvider, AudioController, useAudiosStore } from "@/domains/audio";
import { useHymn, HymnContextProvider } from "@/domains/hymns";
import { HymnController } from "./hymn-controller";

function HymnCard({ hymnId }: { hymnId: HymnId }) {
  const { activeHymnId } = useHymn();
  const { audios } = useAudiosStore();

  const { store } = audios.find(({ hymnId: id }) => id === hymnId)!;

  return (
    <HymnContextProvider value={{ hymnId }}>
      <AudioContextProvider value={{ store }}>
        <div className="rounded-md border border-primary/10 bg-white shadow-sm">
          <HymnController active={hymnId === activeHymnId} />
          <AudioController active={hymnId === activeHymnId} />
        </div>
      </AudioContextProvider>
    </HymnContextProvider>
  );
}

export { HymnCard };
