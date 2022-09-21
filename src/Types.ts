import {Theme} from "@emotion/react";
import {SvgIconTypeMap, SxProps} from "@mui/material";
import {OverridableComponent} from "@mui/material/OverridableComponent";
import {Dispatch, SetStateAction} from "react";

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
    title : string;
    onClick ?: any;
    href : string;
    Icon?: OverridableComponent < SvgIconTypeMap < {},
    "svg" >> & {
        muiName: string;
    }
}
export type User = {
    name: string,
    email?: string,
    toots: number,
    bio?: string;
    tootsGiven:number;
    img?:string;
    _id: string

};
export interface IMethod {
    user ?: User | null;
    topTooter?:boolean;
    setUser ?: Dispatch < SetStateAction < User | null >> | null
}
export interface INavbar {
    Links?: IMenuLinks[];

    hideProfile?: boolean
}
export interface ITooter {
    name: string,
    _id: string,
    toots: number,
    img: string,
    bio?: string
}
export interface ITopTooter {
width?: string | {
    xs: string,
    sm?: string
};
user : ITooter
}

export interface ILayout extends INavbar {
    children : any
    title : string;
    description : string;

}