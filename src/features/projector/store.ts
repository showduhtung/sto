import { createSelectors } from "@/lib/zustand";
import { create } from "zustand";

type ProjectorActions = {
  toggle: (display?: Displays) => void;
};

type Displays = "SERMON_HYMNS" | "HYMNAL_WORSHIP" | "BIBLE";

type ProjectorState = {
  display: Displays | undefined;
  dimensions: { width: number; height: number };
};

const useProjector = createSelectors(
  create<ProjectorState & ProjectorActions>((set) => ({
    display: undefined,
    dimensions: { width: 600, height: 400 },
    toggle: (display) => {
      console.log(display);
      set(() => ({ display }));
    },
  })),
);

export type { Displays };
export { useProjector };
