import type { HymnId } from "~/models";

import { AudioContextProvider, AudioController, useAudios } from "@/features/audio";
import { useHymn } from "../../store";
import { HymnContextProvider } from "../../context";
import { HymnController } from "./hymn-controller";

function HymnCard({ hymnId }: { hymnId: HymnId }) {
  const { activeHymnId } = useHymn();
  const { audios } = useAudios();

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
