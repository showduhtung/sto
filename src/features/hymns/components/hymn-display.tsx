import type { HymnId } from "~/models";
import { cn } from "@/lib/tailwind";
import { useLanguage } from "@/features/languages";
import { useHymnQuery } from "@/features/hymns";
import { useAudio, AudioSound } from "@/features/audio";
import { ProjectorContainer } from "@/ui/shared";
import { syncVerses } from "../utilities";
import { type HymnDisplayType, useHymn } from "../store";

function HymnDisplay({ type }: { type: HymnDisplayType }) {
  const { activeHymnId, activeVerse, shouldWrapVerses, hymnIds } = useHymn(type);
  const { languages, bilingual } = useLanguage();
  const { audios } = useAudio(type);

  const { data, isLoading } = useHymnQuery({
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

  if (isLoading) return <div>Loading...</div>;
  if (!data) return <div>Not found</div>;

  const [primary, secondary] = data;
  const [activePrimaryVerseIdx, activeSecondaryVerseIdx] = bilingual
    ? syncVerses(shouldWrapVerses, activeVerse, [primary.verses.length, secondary.verses.length])
    : [activeVerse];

  return (
    <ProjectorContainer>
      {audios.map((audio) => (
        <AudioSound key={audio.hymnId} {...audio} type={type} />
      ))}
      {JSON.stringify(languages)}

      <div className="flex h-full flex-col gap-8 rounded-md bg-slate-300 px-6 py-4">
        <div className="flex gap-2">
          {data.map(({ title }, idx) => (
            <h1 className="font-semibold" key={idx}>
              {title}
            </h1>
          ))}
        </div>

        <div className="flex gap-8">
          {data.map(({ verses }, idx) => {
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
