import { Button } from "@/components/button";
import { cn } from "@/lib/tailwind";
import { useQuery } from "@tanstack/react-query";
import { ListMusicIcon } from "lucide-react";

import { fetchHymn } from "~/apis/hymns";
import { type HymnDisplayType, useHymns } from "../store";
import { useProjector } from "@/features/projector";

type HymnCardProps = { id: string; type: HymnDisplayType };

function HymnCard({ id, type }: HymnCardProps) {
  const { activeHymnId, activeVerse, remove, setVerse } = useHymns(type);

  const { data, isLoading } = useQuery({
    queryKey: ["hymns", id],
    queryFn: () => fetchHymn(id, "en"),
  });
  const { toggle } = useProjector();

  if (isLoading) return <div>Loading...</div>;
  if (!data) return <div>Not found</div>;

  const isActive = id === activeHymnId;
  const { num, title, verses } = data;

  function handleVerse(idx: number) {
    setVerse(id, idx);
    toggle(type);
  }

  return (
    <div className="flex flex-col gap-4 rounded-md border border-primary/10 bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <Button
          variant="link"
          className="flex h-fit items-center gap-2 p-0 capitalize"
          onClick={() => handleVerse(-1)}
        >
          <p className={cn("text-sm font-semibold", isActive ? "text-primary" : "text-black")}>
            {num}. {title}
          </p>
          {isActive && <ListMusicIcon className="text-primary" height="18" width="18" />}
        </Button>

        <Button
          variant="text"
          size="xxs"
          color="danger"
          className="font-semibold"
          onClick={() => remove(id)}
        >
          Remove
        </Button>
      </div>
      <div className="flex gap-1">
        {verses.map(({ label }, idx) => (
          <Button
            key={label}
            size="xxs"
            className="w-8"
            variant="solid"
            color={isActive && activeVerse === idx ? "primary" : "secondary"}
            onClick={() => handleVerse(idx)}
          >
            {label}
          </Button>
        ))}
      </div>
    </div>
  );
}

export { HymnCard };
