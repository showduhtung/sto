import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";

import { cn } from "@/lib/tailwind";

type SliderProps = React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> & {
  size?: "sm" | "md" | "lg";
};

const trackSizes = { sm: "h-1", md: "h-2", lg: "h-3" };
const thumbSizes = { sm: "h-4 w-4", md: "h-5 w-5", lg: "h-6 w-6" };

const Slider = React.forwardRef<React.ElementRef<typeof SliderPrimitive.Root>, SliderProps>(
  ({ className, size = "md", ...props }, ref) => (
    <SliderPrimitive.Root
      ref={ref}
      className={cn("relative flex w-full touch-none select-none items-center", className)}
      {...props}
    >
      <SliderPrimitive.Track
        className={cn(
          "relative w-full grow cursor-pointer overflow-hidden rounded-full bg-primary/20",
          trackSizes[size],
        )}
      >
        <SliderPrimitive.Range className="absolute h-full bg-primary" />
      </SliderPrimitive.Track>
      <SliderPrimitive.Thumb
        className={cn(
          "block rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
          thumbSizes[size],
        )}
        role="button"
      />
    </SliderPrimitive.Root>
  ),
);
Slider.displayName = SliderPrimitive.Root.displayName;

export type { SliderProps };
export { Slider };
