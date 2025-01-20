import { ProjectorContainer } from "@/components/projector-container";
import { cn } from "@/lib/tailwind";

type InactiveHymnDisplayProps = { ids: string[]; activeId: string };
function InactiveHymnDisplay({ ids, activeId }: InactiveHymnDisplayProps) {
  return (
    <ProjectorContainer>
      <div className="flex h-full flex-col gap-8 rounded-md bg-slate-300 px-6 py-4">
        No active hymn
        {ids.map((id) => (
          <h1 className={cn("font-semibold", activeId === id && "text-primary underline")} key={id}>
            {id}
          </h1>
        ))}
      </div>
    </ProjectorContainer>
  );
}

export { InactiveHymnDisplay };
