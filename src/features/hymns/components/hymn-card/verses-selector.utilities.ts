import { useCallback, useEffect } from "react";
import type { HymnId } from "~/models";
import { useHymn } from "../../store";

function useKeyboardNavigation(id: HymnId, max: number) {
  const { activeHymnId, activeVerse, sing, hymnIds } = useHymn();

  const navigate = useCallback(
    (direction: number) => {
      if (activeHymnId === "") return;

      const currIdx = hymnIds.indexOf(activeHymnId);
      const nextHymnId = hymnIds[currIdx + direction];
      const edge = direction === -1 ? 0 : max;

      return () => {
        if (id !== activeHymnId) return;

        if (activeVerse === -1) sing(activeHymnId, direction === -1 ? max : 0);
        else if (activeVerse !== edge) sing(activeHymnId, activeVerse + direction);
        else if (nextHymnId) sing(nextHymnId || "", -1);
      };
    },
    [activeHymnId, activeVerse, hymnIds, id, max, sing],
  );

  useEffect(() => {
    function keydown(event: KeyboardEvent) {
      if (shouldIgnoreKey(event)) return;
      const keydowns: Record<string, (() => void) | undefined> = {
        ArrowLeft: navigate(-1),
        ArrowUp: navigate(-1),
        ArrowRight: navigate(1),
        ArrowDown: navigate(1),
      };
      keydowns[event.key]?.();
    }

    document.addEventListener("keydown", keydown);
    return () => {
      document.removeEventListener("keydown", keydown);
    };
  }, [navigate]);
}

// criteria for ignoring a keydown event
// - event is triggered by a repeat (i.e. key is being held down)
// - event is part of a composing operation during IME input
// - event.target is a writeable DOM node like input, textarea, select

function shouldIgnoreKey(event: KeyboardEvent) {
  const isComposing = event.isComposing || event.keyCode === 229;
  const target = event.target as HTMLElement;

  return (
    isComposing || event.repeat || ["INPUT", "TEXTAREA", "SELECT"].indexOf(target.tagName) > -1
  );
}

export { useKeyboardNavigation };
