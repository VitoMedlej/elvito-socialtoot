import {Box} from '@mui/material'
import React, {useContext, useEffect, useState} from 'react'
import {UserContext} from '../../../../pages/_app'
import AddTootPost from '../../AddTootPost/AddTootPost'
import Pusher from 'pusher-js';
import {useSocket} from '../../../Hooks/useSocket'
import PostsSection from '../PostsSection/PostsSection'

const MainSection = () => {

    const {user, setUser} = useContext(UserContext);
    const [posts,
        setPosts] = useState < any > ([])
    const [isLoading,
        setLoading] = useState(false)

    const GetPosts = async() => {
        setLoading(true);
        const req = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/posts/get-posts`)
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
    const pusherInstance = useSocket(`${process.env.NEXT_PUBLIC_SITE_URL}/api/test`);
    



    useEffect( () => {


        if (pusherInstance){ 

          let channel = pusherInstance.subscribe('my-channel');
        

            channel.bind('user toot change', (data : any) => {

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


            channel.bind('db change', ({doc} : any) => {
                if (!doc) {
                    return
                }

                setPosts((oldArray : any) => [
                    doc, ...oldArray
                ]);
            });

            channel.bind('toot change', (data : any) => {

                if (!data.updatedToots || !data.documentKey) {
                    return
                }

                setPosts((oldArray : any) => [...oldArray.map((post : any) => {
                        if (post._id === data.documentKey) {
                            return {
                                ...post,
                                toots: data.updatedToots
                            };
                        }
                        return post;
                    })]);

            })
            channel.bind('user toot change', (data : any) => {

                const {toots,tootsGiven, _id} = data

                if (toots && tootsGiven && _id && _id === user
                    ?._id) {

                    const newUser = {
                        ...user,
                        toots,
                        tootsGiven
                    }
                    setUser(newUser)
                    localStorage.setItem('LocalUser', JSON.stringify(newUser))

                }

            });

        }

            return () => pusherInstance && pusherInstance.disconnect();
           
    },[pusherInstance])

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

                <PostsSection isLoading={isLoading} user={user} posts={posts}/>

            </Box>

        </Box>
    )
}

export default MainSection