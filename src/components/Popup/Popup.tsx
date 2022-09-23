import {forwardRef, ReactElement, Ref, useEffect,useState} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import React from 'react';

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: ReactElement<any, any>;
  },
  ref: Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Popup= ()=> {
  const [open, setOpen] = useState(false);

    useEffect(() => {
        const wasAlerted = localStorage.getItem('wasAlerted')
        if (!wasAlerted) {setOpen(true); return}
        
    },[])

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    localStorage.setItem('wasAlerted','true')
  };

  return (
    <div>
    
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Welcome to SocailToot by Elvito!"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
          Your goal on this app is to earn &quot;toot&quot; points and donate them. People with
          most toot donations are featured on the app. First you need an account to do that, so make sure you&quot;re logged in.
          So what are you waiting for? Give a toot already!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Let&quot;s Toot</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
export default Popup