import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {TextField} from '@mui/material';
import useProfileSubmit from '../../../Hooks/useProfileSubmit';
import {Widget} from '@uploadcare/react-widget';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '100%',
    maxWidth: '500px',
    bgcolor: 'white',
    boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
    p: 4
};

export default function ProfileEditModal() {
    const [open,
        setOpen] = React.useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const {handleProfileSubmit, warning, value, handleChange, handleImage} = useProfileSubmit()

    return (
        <Box sx={{
            margin: '0 auto'
        }}>
            <Button
                onClick={handleOpen}
                sx={{
                color: '#00951c',
                width: '100%',
                maxWidth: '400px'
            }}>Edit Profile</Button>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                timeout: 500
            }}>
                <Fade in={open}>
                    <Box sx={style}>
                        <Typography id="transition-modal-title" variant="h6" component="h2">
                            Edit Profile
                        </Typography>
                        {warning && <Typography
                            id="transition-modal-title"
                            sx={{
                            padding: '.25em',
                            fontSize: '.75em',
                            color: 'red',
                            background: 'pink'
                        }}>
                            {warning}
                        </Typography>}

                        <Box
                            onSubmit={handleProfileSubmit}
                            component='form'
                            sx={{
                            mt: '1em'
                        }}>
                            <TextField
                                value={value.name}
                                onChange={handleChange}
                                fullWidth
                                id="outlined-basic"
                                inputProps={{
                                maxLength: 18
                            }}
                                name='name'
                                label="Name"
                                variant="outlined"/>
                            <TextField
                                multiline
                                rows={3}
                                helperText='Max 110 letters, this aint your life story'
                                inputProps={{
                                maxLength: 110
                            }}
                                value={value.bio}
                                onChange={handleChange}
                                fullWidth
                                sx={{
                                mt: '.5em'
                            }}
                                id="outlined-bio"
                                name='bio'
                                label="Bio"
                                variant="outlined"/>
                                <Box sx={{mt:'.25em',mb:'.5em'}}>

                            <Widget
                                onChange={(fileInfo) => handleImage(fileInfo)}
                                publicKey={`${process.env.NEXT_PUBLIC_API_KEY}`}/>
                                </Box>
                            <Button type='submit'>Update</Button>
                            <Button
                                onClick={handleClose}
                                sx={{
                                color: 'red'
                            }}>Cancel</Button>
                        </Box>
                    </Box>
                </Fade>
            </Modal>
        </Box>
    );
}