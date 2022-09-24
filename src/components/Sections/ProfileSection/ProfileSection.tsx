import {Box, Typography, Button} from '@mui/material'
import Link from 'next/link'
import { useRouter } from 'next/router'
import  { useContext } from 'react'
import { UserContext } from '../../../../pages/_app'
import { refreshUser } from '../../../Functions/refreshUser'
import Img from '../../Img/Img'



const ProfileSection = () => {
    const {user,setUser} = useContext(UserContext);
    const router = useRouter()
    const navigate = () => {
        if (user && user._id) {
            router.push(`/profile/${user._id}/${user.name}`)
        }
    }
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
            height:'fit-content',
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
                src={user?.img || 'https://www.svgrepo.com/show/7892/user.svg' }/>
            <Box
                sx={{
                transform: 'translateY(-45%)',
                textAlign: 'center',
                px: '.5em'
            }}>
                <Typography sx={{cursor:'pointer'}} onClick={()=>navigate()} fontSize='1.5em' fontWeight='400'>
                  {user?.name || 'Default User'}
                </Typography>
                <Typography fontSize='1em' fontWeight='300'>
                {user?.toots || 0} toots owned 
                </Typography>
                <Typography fontSize='1em' fontWeight='300'>
                {user?.tootsGiven || 0} toots given
                </Typography>
                <Typography
                    sx={{
                    padding: '.5em',
                    pt:'.7em',
                }}
                    color='#707070'
                    fontSize='.8em'
                    fontWeight='300'>
                   {!user &&  !user?.bio && <>Login to earn toots and share them with the world! {' '} <Link href='/account/login'>Login</Link></>}
                    {user && !user?.bio ? `This is my boring bio, Im new and have'nt edited my profile yet!` : user?.bio}
                </Typography>
            </Box>
            <Button 
            onClick={async ()=> await refreshUser(user,setUser)}
            sx={{width:'100%',fontSize:".65em",cursor:'pointer',color:'blue'}}>refresh</Button>

            <Button
            onClick={()=>navigate()}
            disabled={!user || !user?._id}
                sx={{
                color: '#00951c',
                width: '100%'
            }}>Edit Profile</Button>
        </Box>
    </Box>)
}

export default ProfileSection