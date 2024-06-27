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
  const { audios, setDuration } = useAudio(type);

  const { ref, duration } = audios.find(({ hymnId: id }) => id === hymnId)!;

  useEffect(() => {
    if (!ref.current) return;

    function handleLoadedMetadata() {
      setDuration(hymnId, ref.current?.duration || 0);
    }

    ref.current.addEventListener("loadedmetadata", handleLoadedMetadata);

    return () => {
      const { current } = ref;
      if (!current) return;
      current.removeEventListener("loadedmetadata", handleLoadedMetadata);
    };
  }, [ref, setDuration, hymnId]);

  if (isLoading) return <div>Loading...</div>;
  if (!tracks) return <div>Not found</div>;

  const { url } = tracks[activeTrackIdx];
  return (
    <>
      {duration}
      <audio key={url} ref={ref} src={url} preload="auto" />
    </>
  );
}

export { AudioSound };
