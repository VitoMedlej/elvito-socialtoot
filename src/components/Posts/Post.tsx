import {Box, Typography, Button, Divider, Tooltip} from '@mui/material'
import { useRouter } from 'next/router';
import { IPost } from '../../Types';
import Img from '../Img/Img'


const Post = ({
    text,
    postId,
    toots,
    postImg,
    onClick,
    currentUserId,
    userId,
    userImg,
    userName
} : IPost) => {
    const router = useRouter()
    const isPostOwner = currentUserId === userId
    const navigate = () => {
        router.push(`/profile/${userId}/${userName}`)
    }
    return (

        <Box
            id={userId}
            sx={{
            flexDirection: 'column',
            display: 'flex',
            margin: '0 auto',
            width: {
                xs: '97%',
                sm: '90%'
            },
            my: '1em',
            background: 'white',
            borderRadius: "6px",
            boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
            justifyContent: 'center'
        }}>
            <Box
                sx={{
                display: 'flex',
                px: '1em',
                pt: '1em',
                gap: '.65em',
                alignItems: 'center'
            }}>
                <Img
                onClick={navigate}
                    className='cursor'
                    rounded={true}
                    borderRadius={'50%'}
                    src={`${userImg || 'https://res.cloudinary.com/dwcu3wcol/image/upload/v1661603093/cld-sample-3.jpg'}`}
                    width='40px'
                    height='40px'/>
                <Box sx={{
                    width: '100%'
                }}>

                    <Typography
                onClick={navigate}

                        sx={{
                        fontSize: '.86em',
                        cursor: 'pointer',
                        fontWeight: '600',
                        pt: '.25em',
                        color: 'black'
                    }}>
                        {userName}
                    </Typography>

                    <Typography
                        sx={{
                        fontSize: '.79em',
                        fontWeight: '300',
                        color: 'gray',
                        pb: '.15em'
                    }}>
                        2022/18/fo
                    </Typography>
                </Box>
            </Box>
            <Box>
                <Typography
                    sx={{
                    fontSize: '.9em',
                    color: '#272727',
                    py: "1.5em",
                    px: '.85em'
                }}>
                    {text}
                </Typography>
            </Box>

            {postImg && <img className='img' src={`${postImg}`}/>}
            <Box
                sx={{
                background: 'white',
                position: 'relative'
            }}>
                <Typography
                    sx={{
                    fontSize: '.75em',
                    fontWeight: '300',
                    color: '#555555',
                    py: ".75em",
                    px: '.85em'
                }}>
                    {toots}
                    {' '}
                    Toots
                </Typography>
                <Box
                    sx={{
                    borderTop: '1px solid #8080802b',
                    display: 'flex'
                }}>
                    <Tooltip title={isPostOwner ? `Can't toot your own post!` : 'Toot this post! (-1 toots)'}>
                    <span className='tt'>
                    <Button
                        disabled={isPostOwner || !onClick}
                        onClick={() => onClick ? onClick(postId, 1) : null}
                        sx={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '.5em'
                    }}>
                        <Typography color='black'>
                            Toot
                        </Typography>
                        <Img
                            className='cursor'
                            src={'https://www.svgrepo.com/show/22959/air-horn.svg'}
                            width={{
                            xs: '20px',
                            sm: '30px'
                        }}
                            height={{
                            xs: '20px',
                            sm: '30px'
                        }}/>

                    </Button>
                    </span>

                    </Tooltip>

                    <Divider
                        sx={{
                        height: '40px'
                    }}
                        orientation={'vertical'}/>
                    <Tooltip title={isPostOwner ? `Can't toot your own post!` : 'Toot this post! (-5 toots)'}>
                    <span className='tt'>
                    <Button
                         disabled={isPostOwner || !onClick}
                         onClick={() => onClick ? onClick(postId, 1) : null}
                        sx={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '.5em'
                    }}>
                        <Typography color='black'>
                            5 TOOTS
                        </Typography>
                        <Img
                            className='cursor'
                            src={'https://www.svgrepo.com/show/166910/french-horn.svg'}
                            width={{
                            xs: '20px',
                            sm: '30px'
                        }}
                            height={{
                            xs: '20px',
                            sm: '30px'
                        }}/>

                    </Button>
                    </span>

                    </Tooltip>

                </Box>
            </Box>

        </Box>
    )
}

export default Post