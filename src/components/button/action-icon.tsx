import { type ElementRef, forwardRef, type HTMLAttributes } from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/tailwind";

const ActionIcon = forwardRef<
  ElementRef<"button">,
  HTMLAttributes<HTMLButtonElement> & { asChild?: boolean }
>(({ className, asChild, ...props }, ref) => {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      ref={ref}
      className={cn(
        "button-press-effect h-fit w-fit p-0 data-[disabled=true]:pointer-events-none",
        className,
      )}
      {...props}
    />
  );
});

export { ActionIcon };
