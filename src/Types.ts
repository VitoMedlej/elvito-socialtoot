import { Theme } from "@emotion/react";
import { SxProps } from "@mui/material";

export interface IImg {
    sx ?:SxProps<Theme> | undefined;
    width ?: {
        xs?: string,
        sm?: string,
        md?: string
    } | string,
    className?: string,
    rounded?: boolean,
    height?: {
        xs?: string,
        sm?: string,
        md?: string
    } | string,
    maxHeight?: string,
    src : string,
    borderRadius?: string | number
}