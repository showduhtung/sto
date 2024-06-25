import { type StateCreator, create } from "zustand";
import type { HymnId } from "~/models";
import { type RefObject } from "react";
import type { HymnDisplayType } from "../hymns";

type AudioActions = {
  add: (hymnId: HymnId) => void;
  remove: (hymnId: HymnId) => void;
  pauseAll: () => void;
  play: (hymnId: HymnId, isPlaying: boolean) => void;
  setActive: (hymnId: HymnId, activeTrackIdx: number) => void;
  reset: () => void;
  loaded: (hymnId: HymnId, activeTrackIdx: number) => void;
};

type AudioSetting = {
  hymnId: HymnId;
  activeTrackIdx: number;
  ref: RefObject<HTMLAudioElement>;
  status: "loading" | "loaded" | "error";
};

type AudioState = {
  audios: AudioSetting[];
};

const audioStore: StateCreator<AudioState & AudioActions> = (set, get) => ({
  audios: [],
  add: (hymnId: HymnId) =>
    set(({ audios }) => {
      // const ref = createRef<HTMLAudioElement>();
      const ref = { current: null } as RefObject<HTMLAudioElement>;

      if (ref.current) {
        ref.current.volume = 0.5;
        ref.current.playbackRate = 1.0;
      }
      const newAudio = { hymnId, activeTrackIdx: 0, ref, status: "loading" as const };
      return { audios: [...audios, newAudio] };
    }),

  loaded: (hymnId: HymnId, activeTrackIdx: number) =>
    set(({ audios }) => ({
      audios: audios.map((audio) =>
        audio.hymnId === hymnId ? { ...audio, activeTrackIdx, status: "loaded" } : audio,
      ),
    })),

  remove: (hymnId: HymnId) =>
    set(({ audios }) => ({
      audios: audios.filter((audio) => audio.hymnId !== hymnId),
    })),

  play: (id: HymnId, isPlaying: boolean) =>
    get().audios.forEach(({ ref, hymnId }) => {
      if (hymnId !== id) return;
      if (isPlaying) ref.current?.play();
      else ref.current?.pause();
    }),

  pauseAll: () =>
    get().audios.forEach(({ ref }) => {
      if (!ref.current) return;
      ref.current?.pause();
      ref.current.currentTime = 0;
    }),

  reset: () =>
    get().audios.forEach(({ ref }) => {
      if (!ref.current) return;

      ref.current.pause();
      ref.current.currentTime = 0;
      ref.current.volume = 0.5;
      ref.current.playbackRate = 1.0;
    }),

  setActive: (hymnId: HymnId, activeTrackIdx: number) =>
    set(({ audios }) => ({
      audios: audios.map((audio) =>
        audio.hymnId === hymnId ? { ...audio, activeTrackIdx } : audio,
      ),
    })),
});

const useSermonAudio = create(audioStore);
const useWorshipAudio = create(audioStore);

const useAudio = (type: HymnDisplayType) => {
  const sermonAudio = useSermonAudio();
  const worshipAudio = useWorshipAudio();

  return type === "SERMON_HYMNS" ? sermonAudio : worshipAudio;
};

export type { AudioSetting };
export { useAudio };
