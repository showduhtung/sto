import { useToggle } from "react-use";
import { Button } from "@/components/button";
import { WindowPortal } from "@/components/portal";

function ProjectorButton({ children }: { children: React.ReactNode }) {
  const [open, toggle] = useToggle(false);

  return (
    <>
      <Button variant="text" size="sm" onClick={() => toggle()}>
        Open Projector
      </Button>
      {JSON.stringify(open)}

      <WindowPortal open={open} onClose={() => toggle(false)}>
        {children}
      </WindowPortal>
    </>
  );
}

export { ProjectorButton };
