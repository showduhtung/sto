import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/ui/components/card";
import { cn } from "@/lib/tailwind";

type SettingsCardContentProps = React.HTMLAttributes<HTMLDivElement> & {
  title: string;
  description?: string;
};

function SettingsCardContent({
  children,
  className,
  description = "",
  title,
  ...props
}: SettingsCardContentProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className={cn("flex flex-col gap-4 pb-8", className)} {...props}>
        {children}
      </CardContent>
    </Card>
  );
}

export { SettingsCardContent };
