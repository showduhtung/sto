import { ReferenceSelectorButton } from "@/domains/bible";
import { useProjector } from "@/domains/projector";

function BiblePanel() {
  const { toggle: _toggle } = useProjector();
  return (
    <div>
      <ReferenceSelectorButton />
      {/* Bible
      <Button onClick={() => toggle("BIBLE")}>Open Bible</Button> */}
    </div>
  );
}

export { BiblePanel };
