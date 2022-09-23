import {Box, Divider,Button, Typography} from '@mui/material'
import { useRouter } from 'next/router'
import { ITooter } from '../../../Types'

import TopTooter from './TopTooter'

const TopTootersSection = ({data} : {data:ITooter[]}) => {
    const router = useRouter();
    return (
    <Box
        className='bg'
        sx={{
            boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',

            background: 'white',
        display: {
            xs: 'none',
            lg: 'flex'
        },
        maxWidth: '400px',
        height: '100%',
        mt: '2em',
        padding : '1em',
        borderRadius: '6px',
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
          {data && data.map((tooter : ITooter)=>{

return   <TopTooter key={tooter._id} user={tooter}/>
            })
              }
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