import {Theme} from "@emotion/react";
import {SvgIconTypeMap, SxProps} from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";

export interface IImg {
    sx?: SxProps < Theme > | undefined;
    width?: {
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
export interface IMenuLinks {
    title: string;
    href: string;
      Icon ?: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
        muiName: string;
    }
}

export interface INavbar {
    Links?: IMenuLinks[];
    
    hideProfile?: boolean
}

export interface ILayout extends INavbar {
    children : any
    title : string;
    description : string;
    
}