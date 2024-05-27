import { cn } from "@/lib/tailwind";
import { HTMLAttributes } from "react";

function PanelContainer({ children, className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("p-2", className)} {...props}>
      {children}
    </div>
  );
}

export { PanelContainer };
