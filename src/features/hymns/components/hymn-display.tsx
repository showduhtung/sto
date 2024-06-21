import { type HymnDisplayType, useHymns } from "../store";
import { useLanguages } from "@/features/languages";
import { useHymnQuery } from "@/features/hymns/apis";
import { cn } from "@/lib/tailwind";
import { ProjectorContainer } from "@/ui/shared";
import { syncVerses } from "../utilities";

function HymnDisplay({ type }: { type: HymnDisplayType }) {
  const { activeHymnId, activeVerse, hymnIds, shouldWrapVerses } = useHymns(type);
  const { languages, bilingual } = useLanguages();
  const { data, isLoading } = useHymnQuery(activeHymnId, languages);

  if (activeVerse === -1)
    return (
      <ProjectorContainer>
        <div className="flex h-full flex-col gap-8 rounded-md bg-slate-300 px-6 py-4">
          No active hymn
          {hymnIds.map((id) => (
            <h1
              className={cn("font-semibold", activeHymnId === id && "text-primary underline")}
              key={id}
            >
              {id}
            </h1>
          ))}
        </div>
      </ProjectorContainer>
    );

  if (isLoading) return <div>Loading...</div>;
  if (!data) return <div>Not found</div>;

  const titles = data.map((hymn) => hymn.title);
  const verses = data.map((hymn) => hymn.verses);

  const [primary, secondary] = data;
  const [activePrimaryVerseIdx, activeSecondaryVerseIdx] = bilingual
    ? syncVerses(shouldWrapVerses, activeVerse, [primary.verses.length, secondary.verses.length])
    : [activeVerse];

  return (
    <ProjectorContainer>
      {JSON.stringify(languages)}
      <div className="flex h-full flex-col gap-8 rounded-md bg-slate-300 px-6 py-4">
        <div className="flex gap-2">
          {titles.map((title, idx) => (
            <h1 className="font-semibold" key={idx}>
              {title}
            </h1>
          ))}
        </div>

        <div className="flex gap-8">
          {verses.map((verses, idx) => {
            const verse = verses[idx === 0 ? activePrimaryVerseIdx : activeSecondaryVerseIdx];
            return (
              <div key={idx}>
                <div dangerouslySetInnerHTML={{ __html: verse.html }} />
              </div>
            );
          })}
        </div>
      </div>
    </ProjectorContainer>
  );
}

export { HymnDisplay };
