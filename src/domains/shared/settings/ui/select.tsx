import { Label } from "@/components/ui/label";
import {
  type SelectProps,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type SettingsSelectProps<T extends string> = Omit<SelectProps, "onValueChange" | "value"> & {
  label: string;
  options: { value: T; label: string; disabled?: boolean }[];
  placeholder?: string;
  onValueChange?: (value: T) => void;
  value?: T;
};

function SettingsSelect<T extends string>({
  label,
  options,
  placeholder,
  ...props
}: SettingsSelectProps<T>) {
  return (
    <div className="flex items-center justify-between">
      <Label htmlFor={label + "-select"}>{label}</Label>
      <Select {...props}>
        <SelectTrigger className="w-80" id={label + "-select"}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map(({ value, label: oLabel, ...rest }) => (
            <SelectItem value={value} key={oLabel + value} {...rest}>
              {oLabel} {rest.disabled}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

export { SettingsSelect };
