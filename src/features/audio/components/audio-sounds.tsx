import { type ElementRef, forwardRef, useEffect, useRef } from "react";
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

  function combineRefs(node: HTMLAudioElement | null) {
    internalRef.current = node;
    if (typeof ref === "function") ref(node);
    else if (ref) ref.current = node;
  }

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
  return <audio ref={combineRefs} src={url} {...props} />;
});

export { AudioSound };

// https://stackoverflow.com/a/62238917/12154807
