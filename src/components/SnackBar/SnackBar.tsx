import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import {useState, SyntheticEvent, Dispatch, SetStateAction} from 'react';
import {Alert, AlertColor} from '@mui/material';

export default function SnackBar({title, setOpen,severity,open} : {
    title: string,
    open : boolean,
    setOpen :  Dispatch<SetStateAction<boolean>>,
    severity: AlertColor
}) {


    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event : SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    return (
        <Snackbar
            sx={{
            boxShadow: 'rgb(99 99 99 / 20%) 0px 2px 8px 0px'
        }}
            open={open}
            autoHideDuration={6000}
            onClose={handleClose}>
            <Alert
                onClose={handleClose}
                severity={severity || "info"}
                sx={{
                width: '100%'
            }}>
                {title}
            </Alert>
        </Snackbar>
    );
}