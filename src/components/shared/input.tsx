import { InputUnstyled, InputUnstyledProps } from "@mui/base";
import { styled } from "@mui/system";
import React from "react";
type IInput = {} & InputUnstyledProps;
export const InputAdornment = styled("div")`
  margin: 8px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  right: 0;
`;
const Input = (props: IInput) => {
  return (
    <InputUnstyled
      slotProps={{
        root: { className: "flex-center justify-center" },
        input: {
          className: `${props.className}`,
        },
      }}
      {...props}
    />
  );
};
export default Input;
