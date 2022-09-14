import {Box, Divider,Button, Typography} from '@mui/material'
import { useRouter } from 'next/router'

import TopTooter from './TopTooter'

const TopTootersSection = () => {
    const router = useRouter()
    return (
    <Box
        className='bg'
        sx={{
        background: 'white',
        display: {
            xs: 'none',
            lg: 'flex'
        },
        maxWidth: '400px',
        pt: '2em',
        width: {
            xs: '0%',
            lg: "30%"
        },
        flexDirection: 'column'
    }}>
        <Typography sx={{
            pb: '.5em'
        }}>
            Top Toots Givers
        </Typography>
        <Divider sx={{
            borderColor: '#8080802b'
        }}/>
        <Box sx={{
            pt: '.5em'
        }}>
            <TopTooter/>
            <TopTooter/>
            <TopTooter/>
        </Box>
        <Button
        onClick={()=>router.push('/top-tooters')}
                sx={{
                color: '#00951c',
                width: '100%'
            }}>View More</Button>
    </Box>
)
}

export default TopTootersSection