import { create, createStore, type StoreApi, type StateCreator } from "zustand";
import type { HymnId } from "~/models";
import { type AudioActions, type AudioState, audioControllerStore } from "./audio.store";

type AudioStore = StoreApi<AudioState & AudioActions>;

type AudiosState = {
  audios: {
    hymnId: HymnId;
    store: AudioStore;
  }[];
};

type AudiosActions = {
  add: (hymnId: HymnId) => void;
  remove: (hymnId: HymnId) => void;
  pause: () => void;
  initialize: (hymnIds: HymnId[]) => void;
};

const audiosStore: StateCreator<AudiosState & AudiosActions> = (set, get) => ({
  audios: [],
  initialize: (hymnIds: HymnId[]) => {
    const audios = hymnIds.map((hymnId) => ({ hymnId, store: createStore(audioControllerStore) }));
    return set({ audios });
  },
  add: (hymnId: HymnId) =>
    set(({ audios }) => {
      const store = createStore(audioControllerStore);
      return { audios: [...audios, { hymnId, store }] };
    }),
  remove: (hymnId: HymnId) =>
    set(({ audios }) => ({ audios: audios.filter(({ hymnId: id }) => id !== hymnId) })),
  pause: () =>
    get().audios.forEach(({ store }) => {
      const { ref } = store.getState();
      if (!ref.current) return;
      ref.current.pause();
      ref.current.currentTime = 0;
    }),
});

const useAudiosStore = create(audiosStore);

export type { AudioStore };
export { useAudiosStore };
