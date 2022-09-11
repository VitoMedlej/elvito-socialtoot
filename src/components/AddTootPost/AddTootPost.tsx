import {Box, TextField, Typography, Tooltip} from "@mui/material"
import AddPhotoAlternateSharpIcon from '@mui/icons-material/AddPhotoAlternateSharp';
import Img from "../Img/Img";

const AddTootPost = () => {
    return (
        <Box
            sx={{
            background: 'white',
            boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
            borderRadius: '6px',
            py: '1.5em',
            flexWrap: 'wrap',
            margin: '2em auto 0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-evenly',
            gap: '.5em',
            width: {
                xs: '97%',
                sm: '90%'
            },
            
          
        }}>
            <Img
                className='cursor'
                rounded={true}
                borderRadius={'50%'}
                src={'https://res.cloudinary.com/dwcu3wcol/image/upload/v1661603093/cld-sample-3.jpg'}
                width='45px'
                height='45px'/>
            <TextField
                sx={{
                flex: .9
            }}
                label="Share Your Toots "
                id="fullWidth"/>
            <Box
                sx={{
                display: 'flex',
                alignItems: 'center',
                gap: {
                    xs: '.1em',
                    sm: '.5em',
                    md: '1em'
                },
                cursor: 'pointer'
            }}>
                <Tooltip title='Add Image'>
                    <Box>

                        <Img
                            className='cursor'
                            src={'https://www.svgrepo.com/show/293440/add-image-frame.svg'}
                            width={{
                            xs: '25px',
                            md: '40px'
                        }}
                            height={{
                            xs: '25px',
                            md: '40px'
                        }}/>
                    </Box>
                </Tooltip>
                <Tooltip title='Toot this mf (Post)'>
                    <Box>

                        <Img
                            className='cursor'
                            src={'https://www.svgrepo.com/show/42563/horn.svg'}
                            width={{
                            xs: '25px',
                            md: '45px'
                        }}
                            height={{
                            xs: '25px',
                            md: '45px'
                        }}/>
                    </Box>

                </Tooltip>
            </Box>
        </Box>
    )
}

export default AddTootPost