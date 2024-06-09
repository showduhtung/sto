import { cn } from "@/lib/tailwind";

function ProjectorContainer({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("h-full px-4 py-4", className)} {...props}>
      {children}
    </div>
  );
}

export { ProjectorContainer };
