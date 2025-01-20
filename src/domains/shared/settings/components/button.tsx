import { Button, type ButtonProps } from "@/ui/components/button";
import { Label } from "@/ui/components/label";

type SettingsButtonProps = ButtonProps & { label: string };

function SettingsButton({ label, children, ...props }: SettingsButtonProps) {
  return (
    <div className="flex items-center justify-between">
      <Label htmlFor={"label" + "-button"}>{label}</Label>
      <Button
        variant="outline"
        size="xs"
        className="flex w-24 justify-start gap-2"
        id={"label" + "-button"}
        {...props}
      >
        {children}
      </Button>
    </div>
  );
}
export { SettingsButton };
