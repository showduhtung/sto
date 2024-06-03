import { type PropsWithChildren, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

type WindowPortalProps = PropsWithChildren<{ open: boolean; onClose: () => void }>;

function WindowPortal({ children, open, onClose }: WindowPortalProps) {
  const [container, setContainer] = useState<HTMLDivElement | null>(null);
  const externalWindow = useRef<Window | null>(null);

  useEffect(() => {
    console.log({ container });
    if (container === null) {
      externalWindow.current?.close();
      externalWindow.current = null;
    } else if (open) {
      externalWindow.current = window.open("", "", "width=600,height=400");
      externalWindow.current!.addEventListener("beforeunload", onClose);

      [...document.styleSheets].forEach((styleSheet) => {
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
  }, [container, onClose, open]);

  useEffect(() => {
    if (!open) setContainer(null);
    else setContainer(document.createElement("div"));
  }, [open]);

  return container !== null && createPortal(children, container);
}

export { WindowPortal };
