import { useQuery } from "@tanstack/react-query";
import { fetchAudio } from "~/apis/audio";
import { useHymnContext } from "../hymns";

function useAudioQuery() {
  const { hymnId } = useHymnContext();

  return useQuery({
    queryKey: ["audio", hymnId],
    queryFn: () => fetchAudio(hymnId),
  });
}

export { useAudioQuery };
