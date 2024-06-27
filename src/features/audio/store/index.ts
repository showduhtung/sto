import { useHymnCardContext, type HymnDisplayType } from "@/features/hymns";
// import { type HymnId } from "~/models";
import { useSermonAudio, useWorshipAudio } from "./store";
import type { AudioSetting } from "./store";

function useBaseAudio(
  type: HymnDisplayType,
  // hymnId?: HymnId
) {
  const sermonAudio = useSermonAudio();
  const worshipAudio = useWorshipAudio();

  return type === "SERMON_HYMNS" ? sermonAudio : worshipAudio;
}

function useAudio() {
  const { type, hymnId: _hymnId } = useHymnCardContext();
  return useBaseAudio(
    type,
    // hymnId
  );
}

export type { AudioSetting };
export { useBaseAudio, useAudio };
