import {Box, Typography, Button} from '@mui/material'
import Link from 'next/link'
import React from 'react'
import { User } from '../../../Types'
import Img from '../../Img/Img'



const ProfileSection = ({user}:{user:User}) => {
    console.log('user: ', user);
  return  (<Box
        className='bg'
        sx={{
        display: {
            xs: 'none',
            md: 'flex'
        },
        width: {
            xs: '0%',
            md: "30%"
        },
        maxWidth: '350px',
        justifyContent: 'center'
    }}>
        <Box
            sx={{
            margin: '0 auto',
            mt: '2em',
            boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
            background: 'white',
            width: {
                xs: "97%",
                sm: '90%'
            },
            height: '400px',
            borderRadius: '6px',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <Img
               
                borderRadius='6px'
                className='br6'
                width='100%'
                height='120px'
                src={ 'https://res.cloudinary.com/dwcu3wcol/image/upload/v1660988199/pexels-photo-4863968_pjkfbj.jpg'}/>

            <Img
                borderRadius='50%'
                sx={{
                margin: '0 auto',
                transform: 'translateY(-50%)',
                border: '4px solid white',
                background:'white'
            }}
                width='120px'
                height='120px'
                rounded={true}
                src={user.img || 'https://www.svgrepo.com/show/7892/user.svg' }/>
            <Box
                sx={{
                transform: 'translateY(-50%)',
                textAlign: 'center',
                px: '.5em'
            }}>
                <Typography fontSize='1.4em' fontWeight='400'>
                  {user?.name}
                </Typography>
                <Typography fontSize='1em' fontWeight='300'>
                {user?.toots} toots
                </Typography>
                <Typography
                    sx={{
                    padding: '.5em'
                }}
                    color='#707070'
                    fontSize='.8em'
                    fontWeight='300'>
                   {user?.bio || <>Login to earn toots and share them with the world! {' '} <Link href='/account/login'>Login</Link></>}
                </Typography>
            </Box>
            <Button
            disabled={!user || !user?.email}
                sx={{
                color: '#00951c',
                width: '100%'
            }}>Edit Profile</Button>
        </Box>
    </Box>)
}

export default ProfileSection