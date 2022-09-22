import {Box, Button, Divider, Typography} from '@mui/material'
import React, {useCallback, useContext, useEffect, useState} from 'react'
import {UserContext} from '../../../../pages/_app'
import AddTootPost from '../../AddTootPost/AddTootPost'

import {useSocket} from '../../../Hooks/useSocket'
import PostsSection from '../PostsSection/PostsSection'

const MainSection = () => {

    const {user, setUser} = useContext(UserContext);
    const [posts,
        setPosts] = useState < any > ([])
    const [isLoading,
        setLoading] = useState(false)
    const TootPost = async(postId : string, nb : number) => {
        try {

            if (user
                ?.toots == 0 || user
                    ?.toots < nb) {
                alert('You dont have enough toots!')
                return
            }
            if (!user || !user
                ?._id) {
                return;
            }
            await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/posts/like-post?nb=${nb}&userId=${user._id}&postId=${postId} `)

            const newUser = {
                ...user,
                toots: user.toots - nb,
                tootsGiven: user.tootsGiven + nb
            }
            setUser(newUser)
            localStorage.setItem('LocalUser', JSON.stringify(newUser))
        } catch (e) {
            console.log('e: ', e);

        }
    }
    const GetPosts = async() => {
        setLoading(true);
        const req = await fetch('http://localhost:3000/api/posts/get-posts')
        const res = await req.json()
        if (res) {
            setPosts(res)
        }
        setLoading(false)

    }
  
    useEffect(() => {
        if (!isLoading) {

            setLoading(true)
            GetPosts()
        }

        return () => {
            setLoading(false)
        }
    }, [])
    const socket = useSocket('/api/socket');
 
    useEffect(() => {
        if (socket) {
 
            socket.on('db change', (data : any) => {
                if (!data) 
                    {return}
                    console.log('posts: ', posts);
                    
                setPosts((oldArray : any) => [
                    data, ...oldArray
                ]);
            });
         
            socket.on('toot change', (data : any) => {

                if (!data.updatedToots || !data.documentKey ) {
                    console.log('return because of posts  ');
                    return
                }
              
                      setPosts((oldArray : any) => [
                         ...oldArray.map((post:any)=>{
                            if (post._id === data.documentKey) {
                                return {...post, toots: data.updatedToots};
                              }
                              return post;
                        })
                ]);
                  
               

            })
            socket.on('user toot change', (data : any) => {

                const {toots, _id} = data

                if (toots && _id && _id === user
                    ?._id) {

                    const newUser = {
                        ...user,
                        toots
                    }
                    setUser(newUser)
                    localStorage.setItem('LocalUser', JSON.stringify(newUser))

                }

            });

        }
         return () => {
            if (socket) socket.disconnect();
         }
    }, [socket]);

  

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

                <PostsSection
                    isLoading={isLoading}
                    TootPost={TootPost}
                    user={user}
                    posts={posts}/>

            </Box>

        </Box>
    )
}

export default MainSection