import {Box, Button, Divider, Typography} from '@mui/material'
import React, {useContext, useEffect, useState} from 'react'
import {UserContext} from '../../../../pages/_app'
import AddTootPost from '../../AddTootPost/AddTootPost'
import Post from '../../Posts/Post'
import PostSkeleton from '../../Posts/PostSkeleton'
import {useSocket} from '../../../Hooks/useSocket'

// export const filterById = (arr : any[], key : string) => {     return [...new
// Map(arr.map((item, key) => [item[key], item])).values()] }
const MainSection = () => {

    const {user} = useContext(UserContext);
    const [posts,
        setPosts] = useState < any > ([])
    const [isLoading,
        setLoading] = useState(false)

    const GetPosts = async() => {
        setLoading(true);
        const req = await fetch('http://localhost:3000/api/posts/get-posts')
        const res = await req.json()
        if (res) 
            setPosts(res)
        setLoading(false)

    }

    const socket = useSocket('/api/socket');

    useEffect(() => {
        if (socket) {

            socket.on('db change', (data : any) => {
                const b = JSON.parse(JSON.stringify(data))
                if (data) 
                    setPosts((oldArray : any) => [
                        b, ...oldArray
                    ]);

                }
            );

        }
    }, [socket]);

    useEffect(() => {
        if (!isLoading) {

            setLoading(true)
            GetPosts()
        }

        return () => {
            setLoading(false)
        }
    }, [])
    return (
        <Box
            className='bg'
            sx={{
            width: {
                xs: "100%",
                md: '75%'
            },
            maxWidth: '1200px'
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
            <Post/> */}
                <>
                    {isLoading && posts.length === 0 && [1,2,3,4].map(nb=>{ return <PostSkeleton key={nb}/> }) }
                    {!isLoading &&
                     posts?.length > 0 &&
                     posts.filter((post:any)=>post.text)
                     .map((post : any,i:number)=>{ return <Post  
                        userId={post.userId}
                        userName={post.userName}
                        userImg={post.userImg} 
                        postImg={post.postImg} 
                        toots={post.toots} 
                        text={post?.text} 
                        key={i}/> }) }
                    </>

            </Box>

        </Box>
    )
}

export default MainSection