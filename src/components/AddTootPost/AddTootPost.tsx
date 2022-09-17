import {Box, TextField, Typography, Tooltip} from "@mui/material"
import Img from "../Img/Img";
import {useContext, useRef, useState} from "react";
import {handleSubmit} from "../../Functions/handleSubmit";
import {UserContext} from "../../../pages/_app";
import SnackBar from "../SnackBar/SnackBar";
import { Widget } from "@uploadcare/react-widget";
import AddImage from "../Widget/AddImage";


const AddTootPost = () => {
   
    const {user} = useContext(UserContext);
    const [open,
        setOpen] = useState(false);
    const [post,
        setPost] = useState({
        text: '',
        userId: user
            ?._id,
        toots: 0,
        userImg:'',
        postImg : '',

    })


    const onSubmit = async() => {
        setPost({...post,userImg : user?.img,postImg:''})
        if (post.text.length > 1 && user
            ?._id) 
           { await handleSubmit(null, 'http://localhost:3000/api/posts/send-post', {
                ...post
            })
        setOpen(true)
        setPost({...post,text:''})}
    }
    console.log('process.env.PUBLIC_KEY: ', process.env.PUBLIC_KEY);
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
            <SnackBar
                setOpen={setOpen}
                open={open}
                severity="success"
                title='Post Tooted!'/>
            <Img
                className='cursor'
                rounded={true}
                borderRadius={'50%'}
                src={'https://res.cloudinary.com/dwcu3wcol/image/upload/v1661603093/cld-sample-3.jpg'}
                width='45px'
                height='45px'/>
            <TextField
                size='small'
                value={post.text}
                onChange={(e) => setPost({
                ...post,
                text: e.target.value
            })}
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
                justifyContent: 'center',
                width:'100%',
                cursor: 'pointer'
            }}>
                <Tooltip title='Add Image'>
                 {/* <AddImage/> */}
                    <>
                    <Widget   publicKey={`${process.env.PUBLIC_KEY}`} />
                    
                    </> 

                </Tooltip>
                <Tooltip title='Toot this mf (Post)'>
                    <Box
                        onClick={() => {
                        console.log('sub');
                        onSubmit()
                    }}>

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