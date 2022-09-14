import { Box, Typography } from "@mui/material"
import Img from "../../Img/Img"

const TopTooter = ({width}:{width?:string | {xs:string,sm?:string }}) => {
    return (
        <Box
            sx={{
            display: 'flex',
            gap: '1em',
            alignItems: 'center',
            my: '1em',
            width : width || 'auto',
            cursor: 'pointer'
        }}>
            <Img
                className='br'
                borderRadius='6px'
                src='https://res.cloudinary.com/dwcu3wcol/image/upload/v1661603093/cld-sample.jpg'
                width= '50px'
                height='50px'/>
            <Box>
                
            <Typography color='#424242' fontWeight='300'>
                THE POTATO
            </Typography>
            <Typography color='#808080ab' fontSize='.9em' fontWeight='300'>
                120 toots
            </Typography>
            </Box>
        </Box>
    )
}

export default TopTooter