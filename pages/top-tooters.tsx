import {Box, Container, Divider, Typography} from '@mui/material'
import React from 'react'
import Img from '../src/components/Img/Img'
import Profile from '../src/components/Profile/Profile'
import TopTooter from '../src/components/Sections/TopTootersSection/TopTooter'
import TopTootersSection from '../src/components/Sections/TopTootersSection/TopTootersSection'
import Layout from '../src/Layout/Layout'

const Index = () => {
  const topTooter = {
    img : 'https://res.cloudinary.com/dwcu3wcol/image/upload/v1663150540/winner_u62hhe.png'
  }
    return (
        <Layout title='' description=''>

            <Container
                sx={{
                width: {
                    xs: '100%',
                    sm: '90%',
                    md:'80%'
                },
                minWidth: '300px'
            }}
                maxWidth='lg'>
                  <Profile User={topTooter}/>
                <Divider></Divider>
                <Box
                    sx={{
                    margin : '1em auto 0',
                    boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
                    border : '1px solid #00000014',
                    borderRadius: '6px',
                    padding : '1em',
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'space-between',
                    pt:'1em',
                    background: 'white',
                }}>
                    <TopTooter width={{xs:'100%',sm:'50%'}}/>
                    <TopTooter width={{xs:'100%',sm:'50%'}}/>
                    <TopTooter width={{xs:'100%',sm:'50%'}}/>
                </Box>
            </Container>
        </Layout>
    )
}

export default Index