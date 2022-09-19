import {Box, Button, Divider, Typography} from '@mui/material'
import React, {useContext, useEffect, useState} from 'react'
import {UserContext} from '../../../../pages/_app'
import AddTootPost from '../../AddTootPost/AddTootPost'
import Post from '../../Posts/Post'
import PostSkeleton from '../../Posts/PostSkeleton'
import {useSocket} from '../../../Hooks/useSocket'

const MainSection = () => {

    const {user, setUser} = useContext(UserContext);
    const [posts,
        setPosts] = useState < any > ([])
    const [isLoading,
        setLoading] = useState(false)
    const TootPost = async (postId:string,nb:number) => {
        if (user?.toots < nb) {
            alert('You dont have enough toots!')
            return
        } 
        if (!user || !user?._id) return;
        await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/posts/like-post?nb=${nb}&userId=${user._id}&postId=${postId} ` )
    }
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
                console.log('b: ', b);
                let newUniqueArray = []
                newUniqueArray.push(b) 
                newUniqueArray =  [...new Map(posts.map((item:any) =>
                [item['_id'], item])).values()];
                console.log('newUniqueArray: ', newUniqueArray);

                if (newUniqueArray && b) 
                    setPosts(newUniqueArray);

                }
            );
            socket.on('toot change', (data : any) => {

                const {toots, _id} = JSON.parse(JSON.stringify(data))
                if (toots && _id && _id === user?._id) {
                 
                        const newUser = {...user,toots}
                        setUser(newUser)
                        localStorage.setItem('LocalUser',JSON.stringify(newUser))
                   
                }

            });

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

                <>
                    {isLoading && posts.length === 0 && [1,2,3,4].map(nb=>{ return <PostSkeleton key={nb}/> }) }
                    {!isLoading && posts?.length > 0 &&
                     posts.filter((post:any)=>post.text) 
                     .map((post : any,i:number)=>{ 
                        return <Post 
                        postId={post._id}
                        currentUserId={user?._id}
                         userId={post.userId} 
                         onClick={TootPost}
                         userName={post.userName} 
                         userImg={post.userImg} 
                         postImg={post.postImg} 
                         toots={post.toots} text={post?.text} key={i}/> }) }
                    </>

            </Box>

        </Box>
    )
}

export default MainSection