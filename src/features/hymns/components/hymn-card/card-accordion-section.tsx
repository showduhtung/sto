import { Accordion, AccordionContent, AccordionItem } from "@/components/accordion";
import { cn } from "@/lib/tailwind";
import { type PropsWithChildren } from "react";

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

export { CardAccordionSection };
