import { Label } from "@/components/ui/label";
import { Slider, type SliderProps } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";

type SettingsFontSliderProps = SliderProps & { label: string; isAutofit?: boolean };

function SettingsFontSlider({ label, isAutofit, ...props }: SettingsFontSliderProps) {
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
export { SettingsFontSlider };
