import {Box, Button, Container, Divider, Typography} from '@mui/material'
import React from 'react'
import Post from '../../../src/components/Posts/Post'
import Profile from '../../../src/components/Profile/Profile'
import Layout from '../../../src/Layout/Layout'

const userDetails = {
    img: 'https://res.cloudinary.com/dwcu3wcol/image/upload/v1660988199/pexels-photo-48639' +
            '68_pjkfbj.jpg'
}
const index = () => {
    return (
        <Layout title='' description=''>
            <Container>

                <Profile User={userDetails}/>
                <Button
                    sx={{
                    color: '#00951c',
                    width: '100%'
                }}>Edit Profile</Button>
                <Divider/>
                <Box
                    sx={{
                    pt: '1em',
                    px: '1em'
                }}>
                    <Typography fontSize='1.2em'>
                        Your Posts
                    </Typography>
                <Box>
                    <Post/>
                    <Post/>
                    <Post/>
                </Box>
                </Box>
            </Container>
        </Layout>
    )
}

export default index