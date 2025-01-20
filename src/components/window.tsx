import { type PropsWithChildren, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

type WindowPortalProps = PropsWithChildren<{
  open: boolean;
  onClose: () => void;
  width?: number;
  height?: number;
}>;

function WindowPortal({ children, open, onClose, width, height }: WindowPortalProps) {
  const [container, setContainer] = useState<HTMLDivElement | null>(null);
  const externalWindow = useRef<Window | null>(null);

  useEffect(() => {
    if (container === null) {
      externalWindow.current?.close();
      externalWindow.current = null;
    } else if (open) {
      const hasActiveWindow = externalWindow.current !== null;
      if (hasActiveWindow) return;

      externalWindow.current = window.open("", "", `width=${width},height=${height}`);
      externalWindow.current!.addEventListener("beforeunload", onClose);
      const { styleSheets } = document;

      [...styleSheets].forEach((styleSheet) => {
        if (styleSheet.href) {
          const newLinkEl = externalWindow.current!.document.createElement("link");
          newLinkEl.rel = "stylesheet";
          newLinkEl.href = styleSheet.href;
          externalWindow.current!.document.head.appendChild(newLinkEl);
        } else if (styleSheet.cssRules) {
          const newStyleEl = externalWindow.current!.document.createElement("style");
          Array.from(styleSheet.cssRules).forEach(({ cssText }) => {
            newStyleEl.appendChild(externalWindow.current!.document.createTextNode(cssText));
          });
          externalWindow.current!.document.head.appendChild(newStyleEl);
        }
      });

      externalWindow.current!.document.body.appendChild(container);
    }
    return () => {
      externalWindow.current?.removeEventListener("beforeunload", onClose);
    };
  }, [container, onClose, open, width, height]);

  useEffect(() => {
    if (!open) setContainer(null);
    else setContainer(document.createElement("div"));
  }, [open]);

  return container !== null && createPortal(children, container);
}

export { WindowPortal };

// https://david-gilbertson.medium.com/using-a-react-16-portal-to-do-something-cool-2a2d627b0202
