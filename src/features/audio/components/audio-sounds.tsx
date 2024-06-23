import { type ElementRef, useRef } from "react";
import { useAudioQuery } from "../apis";
import { useAudio } from "../store";
import { type HymnDisplayType, useHymns } from "@/features/hymns";

function AudioSounds({ hymnId, type }: { hymnId: string; type: HymnDisplayType }) {
  const trackRef = useRef<ElementRef<"audio">>(null);
  const { data, isLoading } = useAudioQuery(hymnId);
  const { isPlaying } = useAudio();
  const { activeHymnId } = useHymns(type);

  if (isLoading) return <div>Loading...</div>;
  if (!data) return <div>Not found</div>;
  // if (isLoading || !data) return <></>;

  console.log(data);
  return <></>;

  // return <audio ref={trackRef} src={data.url} preload="auto" />;
}

export { AudioSounds };
