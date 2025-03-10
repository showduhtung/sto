import { type MutableRefObject } from "react";
import { type StateCreator } from "zustand";

type AudioActions = {
  update: <T extends keyof AudioState>(key: T, value: AudioState[T]) => void;
};

type AudioState = {
  activeTrackIdx: number;
  ref: MutableRefObject<HTMLAudioElement | null>;
  status: "loading" | "loaded"; // this state is used to determine whether the audio is ready for attached event listeners
  duration: number;
};

const audioControllerStore: StateCreator<AudioState & AudioActions> = (set) => ({
  activeTrackIdx: 0,
  ref: { current: null },
  status: "loading",
  duration: 0,

  update: (key, value) => set({ [key]: value }),
});

export type { AudioState, AudioActions };
export { audioControllerStore };
