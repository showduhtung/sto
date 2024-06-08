import { Button } from "@/components/button";
import { useProjector } from "@/features/projector";

function BibleSelector() {
  const { toggle } = useProjector();
  return (
    <div>
      Bible
      <Button onClick={() => toggle("BIBLE")}>Open Bible</Button>
    </div>
  );
}

export { BibleSelector };
