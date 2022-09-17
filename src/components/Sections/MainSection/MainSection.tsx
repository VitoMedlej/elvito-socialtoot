import {Box, Button, Divider, Typography} from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../../../pages/_app'
import AddTootPost from '../../AddTootPost/AddTootPost'
import Post from '../../Posts/Post'
import PostSkeleton from '../../Posts/PostSkeleton'
import {MongoClient }  from 'mongodb'
const MainSection = () => {

    const {user,setUser} = useContext(UserContext);
    const [posts,setPosts] = useState([])
    const [isLoading,setLoading] = useState(false)
    
    console.log('posts: ', posts);
    const GetPosts =async () => {
        setLoading(true)
        console.log('true: ', true);
        const req = await fetch('http://localhost:3000/api/posts/get-posts')
        const res = await req.json()
        if (res) setPosts(res)
        setLoading(false)

      
    }
    useEffect(() => {
        if (!isLoading) {GetPosts()}
    
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
            <Post/> */}
        <>
            {isLoading && !posts && [1,2,3,4].map(nb=>{

               return <PostSkeleton key={nb}/>
            })
        }
            
          {!isLoading && posts?.length > 0 && posts.filter((post:any)=>post?.text).map((post : any,i:number)=>{
         
              return <Post text={post?.text || 'FOOOOOOO'} key={i}/>
          })
            }
        </>

            </Box>

        </Box>
    )
}

export default MainSection