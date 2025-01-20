import { Button } from "@/ui/components/button";

function TimestampTools() {
  return (
    <div className="flex items-center gap-2">
      Timestamps:{" "}
      <Button variant="text" size="xs" disabled>
        Apply timestamps
      </Button>
      <Button variant="text" size="xs">
        Copy timestamps
      </Button>
    </div>
  );
}

export { TimestampTools };
