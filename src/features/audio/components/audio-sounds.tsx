import { type ElementRef, useRef } from "react";

import type { HymnId } from "~/models";
import { useHymn, type HymnDisplayType } from "@/features/hymns";
import { useAudioQuery } from "../apis";

function AudioSounds({ id, type }: { id: HymnId; type: HymnDisplayType }) {
  const trackRef = useRef<ElementRef<"audio">>(null);
  const { data, isLoading } = useAudioQuery(id);
  const { activeHymnId: _activeHymnId } = useHymn(type);

  if (isLoading) return <div>Loading...</div>;
  if (!data) return <div>Not found</div>;
  // if (isLoading || !data) return <></>;

  console.log(data);
  return <></>;

  // return <audio ref={trackRef} src={data.url} preload="auto" />;
}

export { AudioSounds };
