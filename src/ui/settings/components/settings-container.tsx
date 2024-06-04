import { cn } from "@/lib/tailwind";

function SettingsContainer({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("grid gap-6 py-6", className)} {...props}>
      {children}
    </div>
  );
}

export { SettingsContainer };
