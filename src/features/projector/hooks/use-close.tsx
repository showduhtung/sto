import { useAudio } from "@/features/audio";
import { useHymn } from "@/features/hymns";
import { useProjector } from "@/features/projector";
import { useCallback } from "react";

function useClose() {
  const { toggle } = useProjector();
  const { clear: clearSermonHymns } = useHymn("SERMON_HYMNS");
  const { clear: clearWorshipHymns } = useHymn("HYMNAL_WORSHIP");
  const { reset: resetSermonAudioRefs } = useAudio("SERMON_HYMNS");
  const { reset: resetWorshipAudioRefs } = useAudio("HYMNAL_WORSHIP");

  const reset = useCallback(() => {
    clearSermonHymns();
    clearWorshipHymns();
    resetSermonAudioRefs();
    resetWorshipAudioRefs();
  }, [clearSermonHymns, clearWorshipHymns, resetSermonAudioRefs, resetWorshipAudioRefs]);

  const close = useCallback(() => {
    toggle();
    reset();
  }, [toggle, reset]);

  return { close };
}

export { useClose };
