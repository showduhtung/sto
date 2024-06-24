import { Button } from "@/components/button";
import { cn } from "@/lib/tailwind";

function TimestampTools({ className }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
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
