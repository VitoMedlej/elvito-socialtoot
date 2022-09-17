import {Box, Button, Divider, Typography} from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../../../pages/_app'
import AddTootPost from '../../AddTootPost/AddTootPost'
import Post from '../../Posts/Post'
import PostSkeleton from '../../Posts/PostSkeleton'
import {MongoClient }  from 'mongodb'
const MainSection = () => {
    const url = process.env.URI;

    const {user,setUser} = useContext(UserContext);
    const [posts,setPosts] = useState([])
    const [isLoading,setLoading] = useState(true)
    const GetPosts =async () => {
        if (!url) return
        setLoading(true)
        const req = await fetch('http://localhost:3000/api/posts/get-posts')
        // const client = new MongoClient(url);
        const posts = await req.json()
        //  const user = await client
        // .db("SocialToot")
        // .collection("Users")
        // .findOne({email:'fooer@gmail.com'});
        // setLoading(false)

        // consoleer)
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
              <Post/>
            <Post/> */}
        <>
            {isLoading && !posts && [1,2,3,4].map(nb=>{

                <PostSkeleton key={nb}/>
            })
        }
          {!isLoading && posts?.length > 0 && posts.map((post,i:number)=>{

              <Post key={i}/>
          })
            }
        </>

            </Box>

        </Box>
    )
}

export default MainSection