import { Button } from "@/components/button";
import { cn } from "@/lib/tailwind";
import { useQuery } from "@tanstack/react-query";
import { ListMusicIcon } from "lucide-react";

import { fetchHymn } from "~/apis/hymns";

type HymnCardProps = {
  id: string;
  active: boolean;
  onVerse: (id: string, idx: number) => void;
  activeVerse: number;
};

function HymnCard({ id, active, onVerse, activeVerse }: HymnCardProps) {
  const { data, isLoading } = useQuery({
    queryKey: ["hymns", id],
    queryFn: () => fetchHymn(id, "en"),
  });
  if (isLoading) return <div>Loading...</div>;
  if (!data) return <div>Not found</div>;

  const { num, title, verses } = data;

  function handleVerse(idx: number) {
    onVerse(id, idx);
  }

  return (
    <div className="flex flex-col gap-4 rounded-md border border-primary/10 bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <Button
          variant="link"
          className="flex h-fit items-center gap-2 p-0 capitalize"
          onClick={() => !active && handleVerse(0)}
        >
          <p className={cn("text-sm font-semibold", active ? "text-primary" : "text-black")}>
            {num}. {title}
          </p>
          {active && <ListMusicIcon className="text-primary" height="18" width="18" />}
        </Button>

        <Button variant="text" size="xxs" color="danger" className="font-semibold">
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
            color={active && activeVerse === idx ? "primary" : "secondary"}
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
