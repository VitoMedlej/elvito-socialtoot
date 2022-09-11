
import {Grid, Box} from "@mui/material"
import { useRouter } from "next/router"

import { useContext, useEffect } from 'react';
import LoginForm from "../../src/components/Account/LoginForm";
import RegisterForm from "../../src/components/Account/RegisterForm";
import Layout from "../../src/Layout/Layout";


const Index = () => {
  const router = useRouter()
  const {method} = router.query
 
  



    
        return (
            <Layout title='' description=''>
            {true && <Box 
            className='bg' maxWidth='lg' sx={{
                    m: '0 auto'
                }}>
                    <Grid
                        container
                        sx={{
                        mx: {
                            sm: '3vw',
                            lg: 'auto'
                        },
                        my: '5em',
                        justifyContent: 'center'
                    }}>
    
                        <Grid item xs={12} sm={8} md={6} lg={5.5}>
                            
                            {method === 'register' ? <RegisterForm/> : <LoginForm/>}
                            
                        </Grid>
                    </Grid>
                </Box>}
            </Layout>
        )
    }
    
    



export default Index