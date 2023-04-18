import { SliderUnstyled, SliderUnstyledProps } from "@mui/base";
import React from "react";
type ISlider = {} & SliderUnstyledProps;

type ISliderValueLabel = { children: React.ReactElement };

function SliderValueLabel({ children }: ISliderValueLabel) {
  return (
    <span className="text-sm relative -top-4 text-center self-center">
      {children}
    </span>
  );
}
const Slider = (props: ISlider) => {
  return (
    <SliderUnstyled
      slots={{ valueLabel: SliderValueLabel }}
      slotProps={{
        root: { className: "w-full relative inline-block h-1 cursor-pointer" },
        thumb: {
          className:
            "primary-color dark:primary-color ring-2 w-2.5 h-2.5 -mt-1 -ml-1 flex items-center justify-center bg-white rounded-full shadow absolute",
        },
        rail: {
          className:
            "bg-slate-100 dark:bg-slate-700 h-1 w-full rounded-full block absolute",
        },
        track: {
          className:
            "bg-primary-color dark:bg-primary-color h-1 absolute rounded-full",
        },
      }}
      {...props}
    />
  );
};
export default Slider;
