import { FileInfo } from "@uploadcare/react-widget";
import { Dispatch, SetStateAction } from "react";

export const handleImgChange = (fileInfo:FileInfo ,post:any,setPost :  Dispatch<SetStateAction<{
    text: string;
    userName: string;
    userId: string;
    userImg: string;
    toots: number;
    postImg: string;
}>>) => {
    if (fileInfo && fileInfo.isImage && fileInfo.cdnUrl) {
        setPost({...post,postImg:fileInfo.cdnUrl})
    }
}