import { type PropsWithChildren, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

type WindowPortalProps = PropsWithChildren<{
  open: boolean;
  onClose: () => void;
  width?: number;
  height?: number;
}>;

function WindowPortal({ children, open, onClose, width, height }: WindowPortalProps) {
  const container = useRef(document.createElement("div"));

  useEffect(() => {
    if (!open) return;
    const newWindow = window.open("", "", `width=${width},height=${height}`);
    if (!newWindow) return;

    newWindow.document.body.appendChild(container.current);
    newWindow.addEventListener("beforeunload", onClose);

    [...document.styleSheets].forEach((styleSheet) => {
      if (styleSheet.href) {
        const newLinkEl = newWindow.document.createElement("link");
        newLinkEl.rel = "stylesheet";
        newLinkEl.href = styleSheet.href;
        newWindow.document.head.appendChild(newLinkEl);
      } else if (styleSheet.cssRules) {
        const newStyleEl = newWindow.document.createElement("style");
        Array.from(styleSheet.cssRules).forEach(({ cssText }) => {
          newStyleEl.appendChild(newWindow.document.createTextNode(cssText));
        });
        newWindow.document.head.appendChild(newStyleEl);
      }
    });

    return () => {
      newWindow.removeEventListener("beforeunload", onClose);
      newWindow.close();
      onClose();
    };
  }, [onClose, open, width, height]);

  return createPortal(children, container.current);
}

export { WindowPortal };

// https://david-gilbertson.medium.com/using-a-react-16-portal-to-do-something-cool-2a2d627b0202
