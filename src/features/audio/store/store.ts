import { createRef, type MutableRefObject } from "react";
import { type StateCreator, create } from "zustand";
import type { HymnId } from "~/models";

type AudioActions = {
  add: (payload: HymnId | HymnId[]) => void;
  remove: (hymnId: HymnId) => void;
  pauseAll: () => void;
  play: (hymnId: HymnId, isPlaying: boolean) => void;
  setActive: (hymnId: HymnId, activeTrackIdx: number) => void;
  load: (hymnid: HymnId) => void;
  unload: (hymnId: HymnId) => void;
};

type AudioSetting = {
  hymnId: HymnId;
  activeTrackIdx: number;
  ref: MutableRefObject<HTMLAudioElement | null>;
  status: "loading" | "loaded"; // this state is used to determine whether the audio is ready for attached event listeners
};

type AudioState = {
  audios: AudioSetting[];
};

const audioStore: StateCreator<AudioState & AudioActions> = (set, get) => ({
  audios: [],
  add: (payload: HymnId | HymnId[]) => {
    set(({ audios }) => {
      function addAudio(hymnId: HymnId) {
        const ref = createRef<HTMLAudioElement>();

        if (ref.current) {
          ref.current.volume = 0.5;
          ref.current.playbackRate = 1.0;
        }

        return { hymnId, activeTrackIdx: 0, ref, status: "loading" as const };
      }

      if (Array.isArray(payload)) return { audios: payload.map(addAudio) };
      return { audios: [...audios, addAudio(payload)] };
    });
  },
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

  setActive: (hymnId: HymnId, activeTrackIdx: number) =>
    set(({ audios }) => ({
      audios: audios.map((audio) => {
        if (audio.hymnId !== hymnId) return audio;

        const ref = createRef<HTMLAudioElement>();
        const { current } = audio.ref;

        if (current && ref.current) {
          ref.current.volume = current.volume;
          ref.current.playbackRate = current.playbackRate;
        }

        return { ...audio, activeTrackIdx, ref };
      }),
    })),
  load: (hymnId: HymnId) =>
    set(({ audios }) => ({
      audios: audios.map((audio) => {
        if (audio.hymnId !== hymnId) return audio;
        return { ...audio, status: "loaded" as const };
      }),
    })),
  unload: (hymnId: HymnId) =>
    set(({ audios }) => ({
      audios: audios.map((audio) => {
        if (audio.hymnId !== hymnId) return audio;
        return { ...audio, status: "loading" as const };
      }),
    })),
});

const useSermonAudio = create(audioStore);
const useWorshipAudio = create(audioStore);

export type { AudioSetting };
export { useSermonAudio, useWorshipAudio };
