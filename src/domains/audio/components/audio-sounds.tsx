import { useAudio, useAudioQuery } from "@/domains/audio";

function AudioSound() {
  const { data: tracks, isLoading } = useAudioQuery();
  const { ref, activeTrackIdx, update } = useAudio();

  if (isLoading) return <div>Loading...</div>;
  if (!tracks) return <div>Not found</div>;

  const { url } = tracks[activeTrackIdx];

  return (
    <audio
      key={url}
      ref={(node) => {
        ref.current = node;

        if (!ref.current) return;
        ref.current.volume = 0.5;
      }}
      src={url}
      preload="auto"
      onLoadedMetadata={() => {
        update("status", "loaded");
        update("duration", ref.current?.duration || 0);
      }}
    />
  );
}

export { AudioSound };
