import {
    Box,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent
} from '@mui/material'
import React, {useContext, useEffect, useState} from 'react'
import {UserContext} from '../../../../pages/_app'
import AddTootPost from '../../AddTootPost/AddTootPost';
import {useSocket} from '../../../Hooks/useSocket';
import PostsSection from '../PostsSection/PostsSection';

const MainSection = () => {

    const {user, setUser} = useContext(UserContext);
    const [posts,
        setPosts] = useState < any > ([])
    const [isLoading,
        setLoading] = useState(false)
    const [sortMethod,
        setSortMethod] = useState('Most Recent');
    const [pendingPosts,setPeningPosts] = useState<any>([])
    const GetPosts = async(method : string) => {
        setLoading(true);
        const byToots = method === 'Most Tooted'
        
        const req = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/posts/get-posts?sortByToots=${byToots}`)
        const res = await req.json()
        if (res) {
            setPosts(res)
        }
        setLoading(false)

    }
    useEffect(()=>{
        if (pendingPosts.length > 0) {
            setPosts((oldArray : any) => [     
                ...pendingPosts, ...oldArray
            ]);
        }
    },[pendingPosts])

    useEffect(() => {
        if (!isLoading) {
            setLoading(true)
            GetPosts(sortMethod)
        }

        return () => {
            setLoading(false)
        }
    }, [sortMethod])

    const pusherInstance = useSocket();

    useEffect(() => {

        if (pusherInstance) {

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

            channel.bind('db change', (doc : any) => {

            
                console.log('doc: ', doc);
           
                    setPosts((oldArray : any) => [
                        
                        doc, ...oldArray
                    ]);
                    
                
             
                    
            });

            channel.bind('post toot change', (data : any) => {

                if (!data.updatedToots || !data.documentKey) {
                    return
                }

                setPosts((oldArray : any) => [...oldArray.map((post : any) => {
                        if (post._id === data.documentKey) {
                            return {
                                ...post,
                                toots: post.toots + data.updatedToots
                            };
                        }
                        return post;
                    })]);

            })

            channel.bind('user toot change', (data : any) => {

                const {toots, tootsGiven, _id} = data

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

    }, [pusherInstance])

    const handleChange = (event : SelectChangeEvent) => {
        const method = event.target.value as string

        setSortMethod(method);

    };

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
                margin: '1em auto 0',
                justifyContent: 'center'
            }}>
                <Box sx={{width:{xs:'97%',sm:'90%'},display:'flex',alignItems:'end',justifyContent:'end'}}>

                <FormControl  size="small" >
                    <InputLabel id="demo-simple-select-label">Sort By</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={sortMethod}
                        label="Sort By"
                        onChange={handleChange}>
                        <MenuItem value={'Most Recent'}>Most Recent</MenuItem>
                        <MenuItem value={'Most Tooted'}>Highest Toots</MenuItem>

                    </Select>
                </FormControl>
                </Box>

                <PostsSection isLoading={isLoading} user={user} posts={posts}/>

            </Box>

        </Box>
    )
}

export default MainSection