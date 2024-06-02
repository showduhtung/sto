import { Button } from "@/components/button";
import { useQuery } from "@tanstack/react-query";
import { ListMusicIcon } from "lucide-react";

import { fetchHymn } from "~/apis/hymns";

function HymnCard({ id }: { id: string }) {
  const { data, isLoading } = useQuery({
    queryKey: ["hymns", id],
    queryFn: () => fetchHymn(id, "en"),
  });
  if (isLoading) return <div>Loading...</div>;
  if (!data) return <div>Not found</div>;

  const { num, title, verses } = data;

  return (
    <div
      key={num}
      className="flex flex-col gap-4 rounded-md border border-primary/10 bg-white p-4 shadow-sm"
    >
      <div className="flex items-center justify-between">
        <Button variant="link" className="flex h-fit items-center gap-2 p-0 capitalize">
          <p className="text-sm font-semibold text-primary">
            {num}. {title}
          </p>
          <ListMusicIcon className="text-primary" height="18" width="18" />
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
            color={idx === 0 ? "primary" : "secondary"}
          >
            {label}
          </Button>
        ))}
      </div>
    </div>
  );
}

export { HymnCard };
