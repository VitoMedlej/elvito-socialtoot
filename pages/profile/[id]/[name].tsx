import {Box, Button, Container, Divider, Typography} from '@mui/material'
import React, {useContext} from 'react'
import Post from '../../../src/components/Posts/Post'
import Profile from '../../../src/components/Profile/Profile'
import Layout from '../../../src/Layout/Layout'
import {UserContext} from '../../_app'

const userDetails = {
    img: 'https://res.cloudinary.com/dwcu3wcol/image/upload/v1660988199/pexels-photo-48639' +
            '68_pjkfbj.jpg'
}
const index = ({currentUser}:any) => {

    const {user, setUser} = useContext(UserContext);
    const isSameUser = currentUser?.id === user?._id
  
    return (
        <Layout title='' description=''>
            <Container>

                <Profile setUser={setUser} user={user}/>
             {isSameUser &&   <Button
                    sx={{
                    color: '#00951c',
                    width: '100%'
                }}>Edit Profile</Button>}
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

export const getServerSideProps = async({query} : any) => {
    try {
        const {id} = query
        if (!id)   throw 'Invalid Id'
        const {MongoClient ,ObjectId} = require('mongodb')
        const _id = new ObjectId(id)
        const url = process.env.URI;

        const client = new MongoClient(url);

        const user = await client
        .db("SocialToot")
        .collection("Users")
        .findOne({_id});
        if (!user) {
            throw 'Invalid Id'
        }
        const {name,email,bio,toots} = user;
        return {
            props: {
                currentUser : {name,email,id,bio,toots} 
            }
        }
    } catch (err) {
        console.log(err)
        return {
            redirect: {
                permanent: false,
                destination: `/`
            }
        };
    }
}