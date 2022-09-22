import {Box, Button, Container, Divider, Typography} from '@mui/material'
import React, {useContext} from 'react'
import Post from '../../../src/components/Posts/Post'
import Profile from '../../../src/components/Profile/Profile'
import Layout from '../../../src/Layout/Layout'
import { IPost, User } from '../../../src/Types'
import {UserContext} from '../../_app'

const userDetails = {
    img: 'https://res.cloudinary.com/dwcu3wcol/image/upload/v1660988199/pexels-photo-48639' +
            '68_pjkfbj.jpg'
}
const index = ({viewedUser ,userPosts}:any) => {
    const posts : IPost[] | null = userPosts ? JSON.parse(userPosts) : null
    const currentUser = viewedUser && JSON.parse(viewedUser) 
    const {user, setUser} = useContext(UserContext);
    console.log('user: ', user);
    console.log('currentUser: ', currentUser);
    const isSameUser = currentUser?._id === user?._id
    console.log('isSameUser: ', isSameUser);
  
    return (
        <Layout title='' description=''>
            <Container>

                <Profile setUser={setUser} isSameUser={isSameUser} user={currentUser}/>
             {isSameUser &&   <Button

                    sx={{
                    color: '#00951c',
                    width: '100%'
                }}>Edit Profile</Button>}
                <Divider/>
                <Box
                    sx={{
                    pt: '2em',
                    px: '.5em'
                }}>
                    <Typography fontSize='1.2em'>
                        {`${currentUser.name }'s Posts `}
                    </Typography>
                    <Box sx={{maxWidth:'md',margin:'0 auto'}}>

                    {posts && posts.map((post :IPost)=>{
                        return    <Post 
                        key={post._id}
                                    currentUserId={currentUser?._id}
                                    postId={post._id || ''}
                                    userImg={currentUser?.img}

                                    postImg={post.postImg}
                                    toots={post.toots}
                                    text={post.text}

                                    userName={currentUser.name}
                                    userId={post.userId}

                     />
                    })}
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
        const user_id = new ObjectId(id)
        const url = process.env.URI;

        const client = new MongoClient(url);

        const user = await client
        .db("SocialToot")
        .collection("Users")
        .findOne({_id:user_id});
        if (!user) {
            throw 'Invalid Id'
        }
        const userPosts = await client.db('SocialToot').collection('Posts')
        .find({'userId':`${user_id}`}).limit(20).sort({$natural:-1}).toArray()
        
        
        const {name,bio,_id,img,toots,tootsGiven} = user;
        console.log(' user: ',  user);
        return {
            props: {
                viewedUser : JSON.stringify({name,_id,bio,img,toots,tootsGiven}),
                userPosts : JSON.stringify(userPosts) 
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