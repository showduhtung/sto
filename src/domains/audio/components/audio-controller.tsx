import { type PropsWithChildren } from "react";
import { cn } from "@/lib/tailwind";
import { Accordion, AccordionContent, AccordionItem } from "@/ui/components/accordion";
import { useHymnSettings } from "@/domains/hymns";
import { MediaControlButtons, TrackSettings, TimestampTools } from "./";

function AudioController({ active }: { active: boolean }) {
  const { audioPlayback, timestampTools } = useHymnSettings();

  return (
    <CardAccordionSection open={audioPlayback} className="flex flex-col bg-zinc-100 p-4">
      <div className="flex h-10 items-center">
        <TrackSettings />
      </div>

      <CardAccordionSection open={audioPlayback && active} className="flex h-10 items-center">
        <MediaControlButtons />
      </CardAccordionSection>

      <CardAccordionSection
        open={audioPlayback && active && timestampTools}
        className="mb-[-4px] flex h-10 items-center"
      >
        <TimestampTools />
      </CardAccordionSection>
    </CardAccordionSection>
  );
}

export { AudioController };

type CardAccordionSectionProps = PropsWithChildren<{ open: boolean; className?: string }>;

function CardAccordionSection({ children, open, className }: CardAccordionSectionProps) {
  return (
    <Accordion type="single" value={open ? "item-1" : ""}>
      <AccordionItem value="item-1" className="border-none">
        <AccordionContent className={cn("rounded-sm py-0", className)}>{children}</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
