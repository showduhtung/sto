import { type ElementRef, forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import type { HymnId } from "~/models";
import { type HymnDisplayType } from "@/features/hymns";
import { useAudioQuery } from "../apis";
import { useAudio } from "../store";

const AudioSound = forwardRef<
  ElementRef<"audio">,
  { hymnId: HymnId; activeTrackIdx: number; type: HymnDisplayType }
>(({ type, hymnId, activeTrackIdx, ...props }, ref) => {
  const { data: tracks, isLoading } = useAudioQuery(hymnId);
  const { loaded } = useAudio(type);
  const internalRef = useRef<HTMLAudioElement | null>(null);

  useImperativeHandle(ref, () => internalRef.current as HTMLAudioElement); // useImerativeHandle is a hook that defines the value of the forwarded ref as the current value of the ref

  useEffect(() => {
    if (!internalRef.current) return;

    function handleLoadedMetadata() {
      loaded(hymnId, activeTrackIdx);
    }
    internalRef.current.addEventListener("loadedmetadata", handleLoadedMetadata);

    return () => {
      if (!internalRef.current) return;
      internalRef.current.removeEventListener("loadedmetadata", handleLoadedMetadata);
    };
  }, [internalRef, loaded, hymnId, activeTrackIdx]);

  if (isLoading) return <div>Loading...</div>;
  if (!tracks) return <div>Not found</div>;

  const { url } = tracks[activeTrackIdx];
  return <audio ref={internalRef} src={url} {...props} />;
});

export { AudioSound };

// https://stackoverflow.com/a/62238917/12154807
