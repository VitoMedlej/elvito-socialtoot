import {Box, Divider, Typography} from '@mui/material'
import Img from '../../Img/Img'
import TopTooter from './TopTooter'

const TopTootersSection = () => (
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
    </Box>
)

export default TopTootersSection