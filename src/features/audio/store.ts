import { type StateCreator, create } from "zustand";
import type { HymnId } from "~/models";
import { persist } from "zustand/middleware";

type AudioActions = {
  add: (hymnId: HymnId) => void;
  remove: (hymnId: HymnId) => void;

  update: <T extends keyof AudioSetting>({
    key,
    value,
    hymnId,
  }: {
    key: T;
    value: AudioSetting[T];
    hymnId: HymnId;
  }) => void;
};

type AudioSetting = {
  isPlaying: boolean;
  playbackRate: number;
  status: "loading" | "success" | "error";
  activeTrackIdx: number;
  hymnId: HymnId;
};

type AudioState = {
  audios: AudioSetting[];
};

const audioStore: StateCreator<AudioState & AudioActions> = (set) => ({
  audios: [],
  add: (hymnId: HymnId) =>
    set(({ audios }) => {
      const newAudio = {
        hymnId,
        isPlaying: false,
        playbackRate: 1.0,
        status: "loading" as const,
        activeTrackIdx: 0,
      };

      return { audios: [...audios, newAudio] };
    }),

  remove: (hymnId: HymnId) =>
    set(({ audios }) => ({ audios: audios.filter((audio) => audio.hymnId !== hymnId) })),

  update: ({ key, value, hymnId }) =>
    set(({ audios }) => {
      const newAudios = audios.map((audio) => {
        return audio.hymnId === hymnId ? { ...audio, [key]: value } : audio;
      });
      return { audios: newAudios };
    }),
});

const useAudio = create(persist(audioStore, { name: "sto-audios" }));

export { useAudio };

// src: track.url,
// timestamps: track.timestamps,
// isPlaying: false,
// currentTime: 0,
// duration: 0,
// canPlay: false,
// playbackRate: 1.0,
// error: null,

// {
// 	"4": {
// 			"src": "https://d9qryu57vn5tu.cloudfront.net/en-us/best-2023/4 - I Love Thy Kingsom, Lord (Piano 5v).m4a",
// 			"timestamps": [
// 					8.9,
// 					28.2,
// 					47.5,
// 					66.8,
// 					86
// 			],
// 			"isPlaying": false,
// 			"currentTime": 0,
// 			"duration": 109.226667,
// 			"canPlay": true,
// 			"playbackRate": 1,
// 			"error": null
// 	},
// 	"5": {
// 			"src": "https://d9qryu57vn5tu.cloudfront.net/en-us/best-2023/5 - This Is My Father_s World (Piano).m4a",
// 			"timestamps": [
// 					10.5,
// 					33,
// 					56,
// 					79.4,
// 					102.1,
// 					125.3
// 			],
// 			"isPlaying": false,
// 			"currentTime": 0,
// 			"duration": 151.594667,
// 			"canPlay": true,
// 			"playbackRate": 1,
// 			"error": null
// 	},
// 	"6": {
// 			"src": "https://d9qryu57vn5tu.cloudfront.net/en-us/best-2023/6 - The Spacious Firmament on High (Piano).m4a",
// 			"timestamps": [
// 					6.32,
// 					33.24,
// 					59.82,
// 					86.39,
// 					113.22,
// 					140.1
// 			],
// 			"isPlaying": false,
// 			"currentTime": 0,
// 			"duration": 0,
// 			"canPlay": false,
// 			"playbackRate": 1,
// 			"error": null
// 	}
// }
