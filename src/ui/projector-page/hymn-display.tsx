import { cn } from "@/lib/tailwind";
import { type HymnDisplayType, useHymns } from "../../features/hymns/store";
import { useUnmount } from "@/utilities";
import { useQuery } from "@tanstack/react-query";
import { useLanguages } from "@/features/languages";
import { fetchHymn } from "~/apis/hymns";

function HymnDisplay({ type }: { type: HymnDisplayType }) {
  const { hymnIds, activeHymnId, activeVerse, close } = useHymns(type);
  const { languages } = useLanguages();
  useUnmount(close);

  const { data, isLoading } = useQuery({
    queryKey: ["hymns", activeHymnId],
    queryFn: () => fetchHymn(activeHymnId, languages),
  });

  if (isLoading) return <div>Loading...</div>;
  if (!data) return <div>Not found</div>;

  return hymnIds.map((id) => (
    <p
      key={id}
      className={cn("px-6 py-4", id === activeHymnId && "text-[30px] font-bold text-primary")}
    >
      {id}
      {` - ${activeVerse}`}
    </p>
  ));
}

export { HymnDisplay };
