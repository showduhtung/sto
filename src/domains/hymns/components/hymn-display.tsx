import type { HymnId } from "~/models";
import { cn } from "@/lib/tailwind";
import { useLanguage } from "@/domains/language";
import { HymnContextProvider, useHymnQuery } from "@/domains/hymns";
import { useAudios, AudioSound, AudioContextProvider } from "@/domains/audio";
import { ProjectorContainer } from "@/ui/shared";
import { syncVerses } from "../utilities";
import { useHymn } from "../store";

function HymnDisplay() {
  const { languages, bilingual } = useLanguage();
  const { activeHymnId, activeVerse, shouldWrapVerses, hymnIds } = useHymn();
  const { audios } = useAudios();

  const { data } = useHymnQuery({
    hymnId: activeHymnId as HymnId,
    languages,
    enabled: Boolean(activeHymnId),
  });

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

  if (!data) return <div>Not found</div>;

  const [primary, secondary] = data;
  const [activePrimaryVerseIdx, activeSecondaryVerseIdx] = bilingual
    ? syncVerses(shouldWrapVerses, activeVerse, [primary.verses.length, secondary.verses.length])
    : [activeVerse];

  return (
    <ProjectorContainer>
      {audios.map(({ hymnId, store }) => (
        <HymnContextProvider key={hymnId} value={{ hymnId }}>
          <AudioContextProvider value={{ store }}>
            <AudioSound />
          </AudioContextProvider>
        </HymnContextProvider>
      ))}

      <div className="flex h-full flex-col gap-8 rounded-md bg-slate-300 px-6 py-4">
        <div className="flex items-center gap-2">
          {data.map(({ title }) => (
            <h1 className="font-semibold" key={title}>
              {title}
            </h1>
          ))}
        </div>

        <div className="flex gap-8">
          {data.map(({ verses, num }, idx) => {
            const verse = verses[idx === 0 ? activePrimaryVerseIdx : activeSecondaryVerseIdx];
            return (
              <div key={num}>
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
