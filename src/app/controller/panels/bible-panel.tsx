import { ReferenceSelectorButton } from "@/domains/bible";
import { useProjectorStore } from "@/domains/projector";

function BiblePanel() {
  const { toggle: _toggle } = useProjectorStore();
  return (
    <div>
      <ReferenceSelectorButton />
      {/* Bible
      <Button onClick={() => toggle("BIBLE")}>Open Bible</Button> */}
    </div>
  );
}

export { BiblePanel };
