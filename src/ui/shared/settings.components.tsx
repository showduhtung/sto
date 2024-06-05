import { Button, ButtonProps } from "@/components/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/card";
import { Label } from "@/components/label";
import { RadioGroup, RadioGroupItem, type RadioGroupProps } from "@/components/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/select";
import { Slider, type SliderProps } from "@/components/slider";
import { Switch, type SwitchProps } from "@/components/switch";
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

type SettingsSliderProps = SliderProps & { label: string; isAutofit?: boolean };

function SettingsFontSlider({ label, isAutofit, ...props }: SettingsSliderProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <Label htmlFor={label + "slider"}>{label}</Label>
        <div className="flex items-center gap-3">
          <Label htmlFor={label + "autofit-switch-slider"}>Auto-fit Text</Label>
          <Switch id={label + "autofit-switch-slider"} checked={isAutofit} />
        </div>
      </div>
      <div className="flex items-center gap-4 px-1">
        <p className="whitespace-nowrap text-sm">
          Scale: <b>{props.value}</b>
        </p>
        <Slider disabled={isAutofit} max={100} step={1} {...props} id={label + "slider"} />
      </div>
    </div>
  );
}

type SettingsRadioGroupProps<T extends string> = RadioGroupProps & {
  label: string;
  options: { value: T; label: string }[];
};

function SettingsRadioGroups<T extends string>({
  label,
  options,
  ...props
}: SettingsRadioGroupProps<T>) {
  return (
    <div className="flex items-center justify-between">
      <Label htmlFor={label + "-radio"}>{label}</Label>
      <RadioGroup className="flex gap-8" {...props} id={label + "-radio"}>
        {options.map(({ value, label: oLabel }) => (
          <div key={value} className="flex flex-col items-center space-y-2">
            <Label htmlFor={label + value + "-radio"}>{oLabel}</Label>
            <RadioGroupItem value={value} id={label + value + "-radio"} />
          </div>
        ))}
      </RadioGroup>
    </div>
  );
}

type SettingsSelectProps<T extends string> = {
  label: string;
  options: { value: T; label: string }[];
  placeholder?: string;
};

function SettingsSelect<T extends string>({ label, options, placeholder }: SettingsSelectProps<T>) {
  return (
    <div className="flex items-center justify-between">
      <Label htmlFor={label + "-select"}>{label}</Label>
      <Select>
        <SelectTrigger className="w-80" id={label + "-select"}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map(({ value, label: oLabel }) => (
            <SelectItem value={value} key={oLabel + value}>
              {oLabel}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

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

export {
  SettingsCardContent,
  SettingsButton,
  SettingsFontSlider,
  SettingsRadioGroups,
  SettingsSelect,
  SettingsSwitch,
};
