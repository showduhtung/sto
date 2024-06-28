import { useStore } from "zustand";
import { createSafeContext } from "@/utilities";
import type { AudioStore } from "./store";

type AudioContext = {
  store: AudioStore;
};

const [AudioContextProvider, useAudioContext] = createSafeContext<AudioContext>("Error message");

function useAudio() {
  const { store } = useAudioContext();
  return useStore(store, (state) => state);
}

export { AudioContextProvider, useAudioContext, useAudio };
