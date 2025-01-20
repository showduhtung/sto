import { useProjectorStore } from "@/domains/projector";
import { useClose } from "@/domains/shared/hooks";

import { Panels } from "./panels/panels";
import { Settings } from "@/domains/shared/settings";
import { Button } from "@/ui/components/button";

function Controller() {
  const { display } = useProjectorStore();
  const { close } = useClose();
  return (
    <div className="flex h-screen flex-col gap-2 px-6 py-4">
      <div className="flex items-center justify-between">
        <img src="./logo.png" className="h-9" alt="true jesus church" />
        <div className="flex items-center gap-2">
          <Button variant="text" size="sm">
            Select a tutorial
          </Button>
          <Settings />
        </div>
      </div>

      <Panels />

      <div className="flex h-9 items-center gap-4">
        <Button variant="outline" size="sm" disabled={!display} onClick={close}>
          Turn off
        </Button>
        {display}
      </div>
    </div>
  );
}

export { Controller };
