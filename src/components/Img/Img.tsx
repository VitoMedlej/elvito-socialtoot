import {Box} from '@mui/material'
import React from 'react'
import Image from 'next/image';
import { IImg } from '../../Types';


const Img = ({
    onClick,
    width,
    maxHeight,
    rounded,
    className,
    borderRadius,
    height,
    src,
    sx
} : IImg) => {
    return (
        <Box
            onClick={()=> onClick ? onClick() : ''}
            className={className}
            sx={{
            maxHeight: maxHeight,
            width: width ,
            height: height,
            position: 'relative',
            borderRadius: borderRadius || 0,
            ...sx
        }}>

            <Image
                className={`cover ${rounded
                ? 'rounded'
                : ''}`}
                src={`${src}`}
                alt=''
                layout='fill'/>
        </Box>
    )
}

export default Img