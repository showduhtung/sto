import { useQuery } from "@tanstack/react-query";
import { fetchAudio } from "~/apis/audio";
import type { HymnId } from "~/models";

function useAudioQuery(hymnId: HymnId) {
  return useQuery({
    queryKey: ["audio", hymnId],
    queryFn: () => fetchAudio(hymnId),
  });
}

export { useAudioQuery };
