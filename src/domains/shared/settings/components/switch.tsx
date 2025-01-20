import { Label } from "@/ui/components/label";
import { Switch, type SwitchProps } from "@/ui/components/switch";

type SettingsSwitchProps = SwitchProps & { label: string };

function SettingsSwitch({ label, ...props }: SettingsSwitchProps) {
  return (
    <div className="flex items-center justify-between">
      <Label htmlFor={label + "-switch"}>{label}</Label>
      <div className="h-9">
        <Switch id={label + "-switch"} {...props} />
      </div>
    </div>
  );
}

export { SettingsSwitch };
