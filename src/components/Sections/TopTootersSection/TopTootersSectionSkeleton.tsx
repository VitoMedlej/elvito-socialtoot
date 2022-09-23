import {Box} from '@mui/material'
import React from 'react'

const TopTootersSectionSkeleton = () => {
    return (
        <Box
            className='sk'
            sx={{
            height: '100%',
            maxWidth: '400px',
            borderRadius: '6px',
            mt: '2em',
            display : {xs:'none',lg:'block'},
            padding: '1em',
            width: {
                xs: '0%',
                lg: "30%"
            }
        }}>
            <Box
                sx={{
                width: '70px',
                height: '10px',
                background: '#c7c7c7'
            }}/>

            <Box
                sx={{
                width: '220px',
                mt: "2.5em",
                mb: '1em',
                height: '35px',
                background: '#c7c7c7'
            }}/>
            <Box
                sx={{
                width: '220px',
                my: "1em",
                height: '35px',
                background: '#c7c7c7'
            }}/>    <Box
            sx={{
            width: '220px',
            my: "1em",
            height: '35px',
            background: '#c7c7c7'
        }}/>
            <Box
                sx={{
                width: '220px',
                my: "1em",
                height: '35px',
                background: '#c7c7c7'
            }}/>
              <Box
                sx={{
                width: '220px',
                my: "1em",
                height: '35px',
                background: '#c7c7c7'
            }}/>
        </Box>
    )
}

export default TopTootersSectionSkeleton