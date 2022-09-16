import {Box, Button, Divider, Typography} from '@mui/material'
import React from 'react'
import AddTootPost from '../../AddTootPost/AddTootPost'
import Post from '../../Posts/Post'
import PostSkeleton from '../../Posts/PostSkeleton'

const MainSection = () => {
    return (
        <Box
            className='bg'
            sx={{
            width: {
                xs: "100%",
                md: '75%'
            },
            maxWidth: '1200px',
     
        }}>
            <AddTootPost/>
            <Box
                sx={{
                flexDirection: 'column',
                display: 'flex',
                margin: '0 auto',
                justifyContent: 'center'
            }}>
              {/* <Post/>
              <Post img={true}/>
              <Post img={true}/>
              <Post/>
            <Post/> */}
            <PostSkeleton/>
            <Post/>
            </Box>

        </Box>
    )
}

export default MainSection