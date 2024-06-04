import { cn } from "@/lib/tailwind";

function PanelContainer({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("p-2", className)} {...props}>
      {children}
    </div>
  );
}

export { PanelContainer };
