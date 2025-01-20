import { ListMusicIcon } from "lucide-react";
import { Button } from "@/ui/components/button";

function MusicCardControllerSkeleton({ children }: { children?: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex items-center justify-between">
        <Button variant="link" className="flex h-fit items-center gap-2 p-0 capitalize">
          {/* <p className={cn("text-sm font-semibold", active ? "text-primary" : "text-black")}>
            {`${num}. ${title}`}
          </p> */}
          <ListMusicIcon className="text-primary" height="18" width="18" />
        </Button>

        <Button variant="text" size="xxs" color="danger" className="font-semibold">
          Remove
        </Button>
      </div>
      {children}
    </div>
  );
}

export { MusicCardControllerSkeleton };
