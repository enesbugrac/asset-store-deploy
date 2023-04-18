import * as React from "react";
import SelectUnstyled, {
  selectUnstyledClasses,
  SelectUnstyledOwnProps,
  SelectUnstyledProps,
} from "@mui/base/SelectUnstyled";
import OptionUnstyled, {
  optionUnstyledClasses,
} from "@mui/base/OptionUnstyled";
import PopperUnstyled from "@mui/base/PopperUnstyled";
import { styled } from "@mui/system";
import { ChevronUpDownIcon } from "@heroicons/react/24/outline";
import { ButtonUnstyled } from "@mui/base";
import Label from "../../shared/label";

const Button = React.forwardRef(function Button<TValue extends {}>(
  props: any,
  ref: React.ForwardedRef<HTMLButtonElement>
) {
  const { ownerState, ...other } = props;
  return (
    <ButtonUnstyled type="button" {...other} ref={ref}>
      {other.children}
      <ChevronUpDownIcon className="h-8 w-8" />
    </ButtonUnstyled>
  );
});

export const StyledButton = styled(Button, { shouldForwardProp: () => true })(
  ({ theme }) => `
  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.875rem;
  box-sizing: border-box;
  min-height: calc(1.5em + 22px);
  min-width: 320px;
  padding: 12px;
  border-radius: 12px;
  text-align: left;
  line-height: 1.5;
  background: #fff;
  border: 1px solid grey;
   color: black;
  position: relative;

  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 120ms;

  &:hover {
    background: #f1f8ff;
    border-color: rgba(0, 0, 0, 0.3);
  }

  &.${selectUnstyledClasses.focusVisible} {
    border-color: #f1f8ff;
    outline: 3px solid #f1f8ff;
  }

  & > svg {
    font-size: 1rem;
    position: absolute;
    height: 100%;
    top: 0;
    right: 10px;
  }
  `
);

export const StyledListbox = styled("ul")(
  ({ theme }) => `
  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.875rem;
  box-sizing: border-box;
  padding: 6px;
  margin: 12px 0;
  min-width: 320px;
  border-radius: 12px;
  overflow: auto;
  outline: 0px;
  background: #fff;
  border: 1px solid rgba(0, 0, 0, 0.3);
  color: black;
  box-shadow: 0px 4px 30px #f1f8ff;
  `
);

export const StyledOption = styled(OptionUnstyled)(
  ({ theme }) => `
  list-style: none;
  padding: 8px;
  border-radius: 8px;
  cursor: default;

  &:last-of-type {
    border-bottom: none;
  }

  &.${optionUnstyledClasses.selected} {
    background-color: #f1f8ff;
    color: black;
  }

  &.${optionUnstyledClasses.highlighted} {
    background-color: rgba(0, 0, 0, 0.3);
    color: black;
  }

  &.${optionUnstyledClasses.highlighted}.${optionUnstyledClasses.selected} {
    background-color: #f1f8ff;
    color: black;

  }

  &.${optionUnstyledClasses.disabled} {
    color: black;

  }

  &:hover:not(.${optionUnstyledClasses.disabled}) {
    background-color: rgba(0, 0, 0, 0.3);
    color: black;

  }
  `
);

export const StyledPopper = styled(PopperUnstyled)`
  transform: none !important;
  position: inherit !important;
  width: 100%;
  z-index: 1;
`;

export const CustomSelect = React.forwardRef(function CustomSelect<
  TValue extends {}
>(
  props: SelectUnstyledProps<any, any, any>,
  ref: React.ForwardedRef<HTMLButtonElement>
) {
  const slots = {
    root: StyledButton,
    listbox: StyledListbox,
    popper: StyledPopper,
    ...props.slots,
  };

  return (
    <>
      <Label>{props.label}</Label>
      <SelectUnstyled {...props} ref={ref} slots={slots}>
        {props.children}
      </SelectUnstyled>
    </>
  );
});
