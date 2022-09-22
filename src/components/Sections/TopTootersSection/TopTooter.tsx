import {Box, Typography} from "@mui/material"
import { ITopTooter } from "../../../Types"
import Img from "../../Img/Img"


const TopTooter = ({
    width,
    user,
    rank,
} : ITopTooter) => {
    return (
        
        <Box
        className='rounded'
        id={user?._id}
            sx={{
            display: 'flex',
            gap: '1em',
            alignItems: 'center',
            my: '1em',
            width: width || 'auto',
            cursor: 'pointer',
            borderRadius:'50%',
        }}>
            <Img
                rounded={true}
                className='rounded '
                borderRadius='50%'
                src={user?.img || 'https://res.cloudinary.com/dwcu3wcol/image/upload/v1661603093/cld-sample.jpg'}
                width='50px'
                height='50px'/>
            <Box>

                <Typography color='#424242' fontWeight='400'>
                   {user?.name} {`#${rank + 2}`}
                </Typography>
                <Typography color='#424242' fontWeight='300'>
                   {user?.bio}
                </Typography>
                <Typography color='#808080ab' fontSize='.9em' fontWeight='300'>
                    {user?.tootsGiven} toots donated
                </Typography>
            </Box>
        </Box>
    )
}

export default TopTooter