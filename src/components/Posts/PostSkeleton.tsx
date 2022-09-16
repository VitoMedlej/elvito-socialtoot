import {Box} from '@mui/material'
import React from 'react'

const PostSkeleton = () => {
    return (
        <Box
        className='sk'
            sx={{
            borderRadius: '6px',
           
            height: '200px',
            width: {
                xs: '97%',
                sm: '90%'
            },
            transform: 'translateY(15px)',
            margin: '0 auto',
            display: 'flex',
            minWidth: '220px'
        }}>
            <Box
                sx={{
                borderRadius: '50%',
                my: '2em',
                mx: '1em',
                background: '#c7c7c7',
                width: '50px',
                height: '50px'
            }}/>
            <Box sx={{}}>

                <Box
                    sx={{
                    mt: '2.5em',
                    mr: '1em',
                    background: '#c7c7c7',
                    width: '90px',
                    height: '15px'
                }}/>

                <Box
                    sx={{
                    mt: '.5em',
                    mr: '1em',
                    background: '#c7c7c7',
                    width: '80px',
                    height: '15px'
                }}/>
                <Box
                    sx={{
                    mt: '2.25em',
                    mr: '1em',
                    background: '#c7c7c7',
                    width: '250px',
                    height: '15px'
                }}/>
                <Box
                    sx={{
                    mt: '.25em',
                    mr: '1em',
                    background: '#c7c7c7',
                    width: '300px',
                    height: '15px'
                }}/>
            </Box>

        </Box>
    )
}
export default PostSkeleton
