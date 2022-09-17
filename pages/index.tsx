import {Box} from "@mui/material"
import {useContext, useEffect, useState} from "react"
import MainSection from "../src/components/Sections/MainSection/MainSection"
import ProfileSection from "../src/components/Sections/ProfileSection/ProfileSection"
import TopTootersSection from "../src/components/Sections/TopTootersSection/TopTootersSection"
import TopTootersSectionSkeleton from "../src/components/Sections/TopTootersSection/TopTootersSectionSkeleton"
import Layout from "../src/Layout/Layout"
import {UserContext} from "./_app"
import io, { Socket } from 'socket.io-client';
import { useSocket } from "../src/Hooks/useSocket"




const index = () => {
    const {user, setUser} = useContext(UserContext);

    const socket = useSocket('/api/socket');
    const [message, setMessage] = useState('');
    const [newPosts,setNewPosts] = useState<any>(null)



    // useEffect(() => {
    //   if (socket) {
    //     socket.on('resele', (data: any) => {
    //       console.log('hello', `this is data : ${data}`);
    //       setMessage(JSON.stringify(data));
    //     });
    //     socket.on('db change', (data: any) => {
    //         console.log( `this is change : ${data}`);
    //         setNewPosts(data);
    //       });
    //     socket.on('a user connected', () => {
    //       console.log('connected a user')
    //     });
    //   }
    // }, [socket]);
 

   

    return (
        <Layout title='' description=''>
            <Box
                className='bg'
                sx={{
                display: 'flex',
                margin: '0 auto',
                justifyContent: 'center'
            }}>
                <ProfileSection user={user}/>
                {message}
                <MainSection/> {< TopTootersSection />}
                {/* {  <TopTootersSectionSkeleton user/> } */}

            </Box>

        </Layout>
    )
}

export default index