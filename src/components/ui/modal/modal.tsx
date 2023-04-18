import * as React from "react";
import clsx from "clsx";
import { styled } from "@mui/system";
import ModalUnstyled from "@mui/base/ModalUnstyled";

// eslint-disable-next-line react/display-name
export const BackdropUnstyled = React.forwardRef<
  HTMLDivElement,
  { open?: boolean; className: string }
>((props, ref) => {
  const { open, className } = props;
  return (
    <div className={clsx({ "MuiBackdrop-open": open }, className)} ref={ref} />
  );
});

export const Modal = styled(ModalUnstyled)`
  position: fixed;
  z-index: 1300;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Backdrop = styled(BackdropUnstyled)`
  z-index: -1;
  position: fixed;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  -webkit-tap-highlight-color: transparent;
`;
