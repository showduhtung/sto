import type { HymnId } from "~/models";
import { cn } from "@/lib/tailwind";
import { useLanguageStore } from "@/domains/language";
import {
  useHymnQuery,
  useHymnsStore,
  syncVerses,
  useHymnSettingsStore,
} from "@/domains/music/hymns";
import { useAudiosStore, AudioSound, AudioContextProvider } from "@/domains/music/audio";
import { MusicContextProvider } from "@/domains/music/shared";
import { ProjectorContainer } from "@/components/projector-container";

function HymnDisplay() {
  const { languages, bilingual } = useLanguageStore();
  const { activeHymnId, activeVerse, hymnIds } = useHymnsStore();
  const { shouldWrapVerses } = useHymnSettingsStore();
  const { audios } = useAudiosStore();

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
        <MusicContextProvider key={hymnId} value={{ hymnId }}>
          <AudioContextProvider value={{ store }}>
            <AudioSound />
          </AudioContextProvider>
        </MusicContextProvider>
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
