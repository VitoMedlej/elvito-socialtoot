import {Box, TextField, Typography, Tooltip, AlertColor} from "@mui/material"
import Img from "../Img/Img";
import {useContext, useEffect, useRef, useState} from "react";
import {handleSubmit} from "../../Functions/handleSubmit";
import {UserContext} from "../../../pages/_app";
import SnackBar from "../SnackBar/SnackBar";
import { FileInfo, Widget } from "@uploadcare/react-widget";
import { handleImgChange } from "../../Functions/handleImgChange";



type Snack = {
    severity:AlertColor,
    title:string
}

const AddTootPost = () => {
   
    const {user, setUser} = useContext(UserContext);
   
    const [snack,
        setSnack] = useState<Snack>({severity:'warning',title:'Hi there, im just a useless warning!'});
    const [isOpen,setOpen] = useState(false)
    const [isLoading,setLoading] = useState(false)

    const [post,
        setPost] = useState({
            text: '',
            userName : '',
            userId: '',
            userImg:'',
            toots: 0,
            postImg : '',
        
    })

    const onSubmit = async() => {
        if (!user || !user._id) {
            setOpen(true)
            setSnack({severity:'error',title:'You must be logged to do that! '})
            return
        }
        if (post.text.length < 2) {
            setOpen(true)
            setSnack({severity:'error',title:'Add some text bruh! '})
            return
        }
        if (post
            ?.userId && !isLoading) 
            setLoading(true)
           { await handleSubmit(null, 'http://localhost:3000/api/posts/send-post', {
                ...post
            })
            const newUser = {
                ...user,
                toots : user.toots + 1,
               
            }
            setUser(newUser)
            localStorage.setItem('LocalUser', JSON.stringify(newUser))
            setPost({...post,text:'',postImg:''})
            setOpen(true)
            setLoading(false)

        setSnack({severity:'success',title:'Post Added! +1 Toot points '})
        return

    } 

    }
    useEffect(() => {
        setPost({...post, userName : user?.name,
            userId: user
                ?._id,

                userImg:user?.img,
            })
    }, [user])
    
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
                open={isOpen}
                severity={snack.severity}
                title={snack.title}/>
            <Img
                className='cursor'
                rounded={true}
                borderRadius={'50%'}
                src={`${user?.img || 'https://www.svgrepo.com/show/7892/user.svg'}`}
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
            }}>
            {user &&    <Tooltip title='Add Image'>
                 {/* <AddImage/> */}
                    <>
                    <Widget 
                    onChange={(fileInfo)=>handleImgChange(fileInfo,post,setPost)} 
                    publicKey={`${process.env.NEXT_PUBLIC_API_KEY}`} />
                    
                    </> 

                </Tooltip>}
                <Tooltip title='Toot this mf (Post)'>
                    <Box
                        onClick={() => {
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