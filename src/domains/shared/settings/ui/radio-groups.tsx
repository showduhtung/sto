import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem, type RadioGroupProps } from "@/components/ui/radio-group";

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

export { SettingsRadioGroups };
