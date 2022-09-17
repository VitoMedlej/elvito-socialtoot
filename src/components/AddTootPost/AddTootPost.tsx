import {Box, TextField, Typography, Tooltip} from "@mui/material"
import Img from "../Img/Img";
import { useContext, useState } from "react";
import { handleSubmit } from "../../Functions/handleSubmit";
import { UserContext } from "../../../pages/_app";

const AddTootPost = () => {
    const {user} = useContext(UserContext);

    const [post,setPost] = useState({text:'',userId:user?._id,toots:0})
    const onSubmit = async () => {
  
        if (post.text.length > 1 && user?._id)
         await handleSubmit(null,'http://localhost:3000/api/posts/send-post',{...post})
        
        } 
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
                value={post.text}
                onChange={(e) => setPost({...post,text:e.target.value})}
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
                    <Box onClick={()=>{console.log('sub');onSubmit()}}>

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