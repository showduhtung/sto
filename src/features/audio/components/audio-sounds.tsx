import { useEffect } from "react";
import type { HymnId } from "~/models";
import { type HymnDisplayType } from "@/features/hymns";
import { useAudioQuery } from "../apis";
import { useAudio } from "../store";

type AudioSoundProps = {
  hymnId: HymnId;
  activeTrackIdx: number;
  type: HymnDisplayType;
};

function AudioSound({ type, hymnId, activeTrackIdx }: AudioSoundProps) {
  const { data: tracks, isLoading } = useAudioQuery(hymnId);
  const { audios, load } = useAudio(type);
  const { ref } = audios.find(({ hymnId: id }) => id === hymnId)!;

  useEffect(() => {
    if (!ref.current) return;

    function handleLoadedMetadata() {
      load(hymnId);
    }

    ref.current.addEventListener("loadedmetadata", handleLoadedMetadata);

    return () => {
      const { current } = ref;
      if (!current) return;
      current.removeEventListener("loadedmetadata", handleLoadedMetadata);
    };
  }, [ref, load, hymnId]);

  if (isLoading) return <div>Loading...</div>;
  if (!tracks) return <div>Not found</div>;

  const { url } = tracks[activeTrackIdx];
  return <audio key={url} ref={ref} src={url} preload="auto" />;
}

export { AudioSound };
