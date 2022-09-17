import { Box, Typography } from '@mui/material'
import Link from 'next/link'
import { IMethod } from '../../Types'
import Img from '../Img/Img'

const Profile = ({user,setUser} :  IMethod) => {
  return (
    <>
       <Img
                    borderRadius='6px'
                    className='br6'
                    width='100%'
                    height='350px'
                    src={ 'https://res.cloudinary.com/dwcu3wcol/image/upload/v1660988199/pexels-photo-4863968_pjkfbj.jpg'}/>
                <Box sx={{
                    display: 'flex',
                    flexWrap:'wrap',
                     ml: {sm:'1em',md:'2em'},

                }}>

                    <Img
                        borderRadius='50%'
                        sx={{
                       
                        margin : {xs:'0 auto',sm:'0'},
                        transform: 'translateY(-35%)',
                        border: '4px solid white',
                        background: '#6553b2'
                    }}
                        width='150px'
                        height='150px'
                        rounded={true}
                        src={user?.img || 'https://www.svgrepo.com/show/7892/user.svg'}/>
                    
                        <Box
                            sx={{
                              textAlign: {xs:'center',sm:'left'},
                          transform: {xs:'translateY(-30%)',sm:'translateY(0%)'},
                            display: 'flex',
                            flexDirection: 'column',
                            pt: '.75em',
                            pl: '1em',
                            pb: '.5em'
                        }}>

                            <Typography fontSize='1.5em' fontWeight='600'>
                               {user?.name || 'Default User'}
                            </Typography>
                            {user?.toots && <Typography fontSize='1.1em'>
                                200 Toots Given!
                            </Typography>}
                      
                            <Typography sx={{pt:'.25em'}} color='#555555'>
                            {!user &&  <>Login to earn toots and share them with the world! {' '} <Link href='/account/login'>Login</Link></>}
                            {user && !user?.bio && `This is my boring bio, Im new and have'nt edited my profile yet!`}
                            </Typography>
                        </Box>
                </Box>
    </>
  )
}

export default Profile


