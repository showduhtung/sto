import { useQuery } from "@tanstack/react-query";
import { useMusicContext } from "@/domains/music/shared";
import { fetchAudio } from "./audio.service";

function useAudioQuery() {
  const { hymnId } = useMusicContext();

  return useQuery({
    queryKey: ["audio", hymnId],
    queryFn: () => fetchAudio(hymnId),
  });
}

export { useAudioQuery };
