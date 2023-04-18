import { ButtonUnstyled, ButtonUnstyledProps } from "@mui/base";
import React from "react";

function IconButton(props: ButtonUnstyledProps) {
  return (
    <ButtonUnstyled
      {...props}
      className={`p-2 rounded-3xl hover:bg-primary-color-darker transition-all duration-300 ${props.className}`}
    >
      {props.children}
    </ButtonUnstyled>
  );
}

export default IconButton;
