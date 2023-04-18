import React from "react";
import { MenuItemUnstyled, PopperUnstyled } from "@mui/base";
import { styled } from "@mui/system";

export const StyledListbox = styled("ul")(
  ({ theme }: any) => `
    font-family: IBM Plex Sans, sans-serif;
    font-size: 0.875rem;
    box-sizing: border-box;
    margin: 12px 0;
    min-width: 200px;
    border-radius: 12px;
    overflow: auto;
    outline: 0px;
    background: #fff;
    border: 1px solid grey;
    color:  grey;
    box-shadow: 0px 4px 30px grey;
    `
);
export const Popper = styled(PopperUnstyled)`
  z-index: 1;
`;
export const StyledMenuItem = styled(MenuItemUnstyled)(
  ({ theme }: any) => `
    list-style: none;
    padding: 0 16px;
    font-weight: 500;
    border-radius: 8px;
    font-size: 1.25rem
    cursor: pointer;
    line-height:48px;
    user-select: none;
    &:last-of-type {
      border-bottom: none;
    }
    `
);
