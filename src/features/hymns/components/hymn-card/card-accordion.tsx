import { Accordion, AccordionContent, AccordionItem } from "@/components/accordion";
import { type PropsWithChildren } from "react";

type CardAccordionProps = PropsWithChildren<{ open: boolean }>;

function CardAccordion({ children, open }: CardAccordionProps) {
  return (
    <Accordion type="single" value={open ? "item-1" : ""}>
      <AccordionItem value="item-1" className="border-none">
        <AccordionContent>{children}</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

export { CardAccordion };
