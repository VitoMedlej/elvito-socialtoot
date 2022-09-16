import {Grid, Box} from "@mui/material"
import {useRouter} from "next/router"

import {useContext, useEffect} from 'react';
import LoginForm from "../../src/components/Account/LoginForm";
import RegisterForm from "../../src/components/Account/RegisterForm";
import Image from "next/image";
import Layout from "../../src/Layout/Layout";
import { UserContext } from "../_app";

const Links = [{
    title : 'About',href:'/about'
},{
    title : 'Login', href:'/account/login'
}]
const Index = () => {
    const router = useRouter()
    const {method} = router.query;
    const {user,setUser} = useContext(UserContext);
    console.log('user: ', user);
    useEffect(() => {
        if (user && user
            ?.email) {
            router.push('/')
        }
    }, [user])
    const isLogged = user && user?.email
    return (
        <Layout hideProfile={!isLogged} Links={!isLogged ? Links : undefined} title='' description=''>
            {true && <Box className='bg' sx={{
                position: 'relative'
            }}>
                <Box
                    sx={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    width: '100vw',
                    height: '100vh'
                }}
                    className="bg2"></Box>
                <Image
                    alt=''
                    layout='fill'
                    src='https://res.cloudinary.com/dwcu3wcol/image/upload/v1663061509/img-01_clfwlc.png'/>
                <Grid
                    maxWidth='lg'
                    container
                    sx={{
                    m: '0 auto',
                    justifyContent: 'center'
                }}>

                    <Grid
                        sx={{
                        my: '5em',
                zIndex:'111',

                    }}
                        item
                        xs={12}
                        sm={8}
                        md={6}
                        lg={5}>

                        {method === 'register'
                            ? <RegisterForm setUser={setUser && setUser}/>
                            : <LoginForm setUser={setUser && setUser}/>}

                    </Grid>
                </Grid>
            </Box>}
        </Layout>
    )
}

export default Index