import {Box} from "@mui/material"
import {useContext, useEffect, useState} from "react"
import MainSection from "../src/components/Sections/MainSection/MainSection"
import ProfileSection from "../src/components/Sections/ProfileSection/ProfileSection"
import TopTootersSection from "../src/components/Sections/TopTootersSection/TopTootersSection"
import TopTootersSectionSkeleton from "../src/components/Sections/TopTootersSection/TopTootersSectionSkeleton"
import Layout from "../src/Layout/Layout"
import {UserContext} from "./_app"
import io, { Socket } from 'socket.io-client';


function useSocket(url: string) {
    const [socket, setSocket] = useState<any>(null);
    useEffect(() => {
      fetch(url).finally(() => {
        const socketio = io();
        socketio.on('connect', () => {
      
          socketio.emit('hello','I AM CONNECTED');
        });
        socketio.on('disconnect', () => {
          console.log('disconnected');
      socket.emit('resele',prompt('res'));
  
        });
        setSocket(socketio);
      });
      function cleanup() {
        socket&&socket.disconnect();
      }
      return cleanup;
    }, []);
    return socket;
  }

const index = () => {
    const {user, setUser} = useContext(UserContext);

    const socket = useSocket('/api/socket');
    const [message, setMessage] = useState('');
    const [newPosts,setNewPosts] = useState<any>(null)
    console.log('newPosts: ', newPosts);
    useEffect(() => {
      if (socket) {
        socket.on('resele', (data: any) => {
          console.log('hello', `this is data : ${data}`);
          setMessage(JSON.stringify(data));
        });
        socket.on('db change', (data: any) => {
            console.log( `this is change : ${data}`);
            setNewPosts(JSON.stringify(data));
          });
        socket.on('a user connected', () => {
          console.log('connected a user')
        });
      }
    }, [socket]);
 

   

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