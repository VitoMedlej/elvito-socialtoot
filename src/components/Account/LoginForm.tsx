import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {
    Typography,
    Grid,
    Container,
    CssBaseline,
    Box,
    Avatar,
    TextField,
    FormControlLabel,
    Checkbox,
    Button,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    FormControl
} from '@mui/material';
import Link from 'next/link'
import {ChangeEvent, FormEvent, useState} from 'react';
import {VisibilityOff, Visibility} from '@mui/icons-material';

import { IMethod } from '../../Types';
import Validate from '../../Functions/Validate';
import { handleSubmit } from '../../Functions/handleSubmit';

export function Copyright(props : any) {
    return (
        <Typography
            className='link'
            variant="body2"
            color="text.primary"
            align="center"
            {...props}>
            {'Copyright © '}
            <a target="_black" rel=" noreferrer" href="https://vitomedlej.netlify.app/">
                Vito Medlej
            </a>{' '} {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const theme = createTheme();

const LoginForm = ({setUser}:IMethod) => {
    const [showPassword,
        setShowPassword] = useState(false)
    const [userData,
        setUserData] = useState({email: '', password: ''})


    const handleClickShowPassword = () => {
        setShowPassword(!showPassword)
    };

    const handleMouseDownPassword = (event : React.MouseEvent < HTMLButtonElement >) => {
        event.preventDefault();
    };
    const resetForm = () => {
        setUserData({email: '', password: ''})
    }
    const Submit = async(e : FormEvent < HTMLFormElement >) => {
        e.preventDefault()
      
        if (userData.email && userData.password) {
            const loggedUser = await handleSubmit(e, `${process.env.NEXT_PUBLIC_SITE_URL}/api/auth/login`, {
                email: userData.email,
                password: userData.password
            })
            
            if (loggedUser && loggedUser
                ?.email && setUser) {
                resetForm()
                 localStorage.setItem('LocalUser',JSON.stringify(loggedUser))
                await setUser(loggedUser) 
            }
        }

    }
 

    const handleChange = (e : ChangeEvent < HTMLInputElement | HTMLTextAreaElement >) => {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value
        })
    }
    return (
        <ThemeProvider theme={theme}>
            <Container
                component="main"
                sx={{
                width: '100%',
                borderRadius: '6px'
            }}>
                <CssBaseline/>
                <Box
                    sx={{
                    background: 'white',
                    borderRadius: '6px',
                    boxShadow: 'rgb(0 0 0 / 15%) 0px 8px 24px',
                    p: {
                        xs: ' 2em 1em',
                        md: '2em 3em '
                    },
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}>
                    <Avatar
                        sx={{
                        m: 1,
                        bgcolor: '#00951c'
                    }}>
                        <LockOutlinedIcon/>
                    </Avatar>
                    <Typography
                        sx={{
                        fontSize: "1em",
                        textAlign: 'center',
                        color: 'gray'
                    }}
                        component="h1">
                        Welcome Back To Social Toot

                    </Typography>
                    <Box
                        component="form"
                        onSubmit={(e:any) => Submit(e)}
                        sx={{
                        mt: 1
                    }}>
                        <TextField
                            value={userData.email}
                            onChange={(e) => handleChange(e)}
                            error={Validate(userData.email)}
                            margin="normal"
                            required
                            fullWidth
                            data-cy='create-email'
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus/>

                        <FormControl
                            sx={{
                            mt: 1,
                            width: '100%'
                        }}
                            variant="outlined">

                            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                            <OutlinedInput
                                value={userData.password}
                                onChange={(e) => handleChange(e)}
                                error={Validate(userData.password)}
                                sx={{
                                width: '100%'
                            }}
                                name="password"
                                id="outlined-adornment-password"
                                type={showPassword
                                ? 'text'
                                : 'password'}
                                endAdornment={
                                <InputAdornment position = "end" > <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end">
                                {showPassword
                                    ? <VisibilityOff/>
                                    : <Visibility/>}
                            </IconButton> 
                            </InputAdornment>}
                                label="Password"/>
                        </FormControl>

                        <FormControlLabel
                            control={< Checkbox value = "remember" color = "primary" />}
                            label="Remember me"/>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{
                            backgroundColor: "#00951c",
                            mt: 3,
                            mb: 2,
                            ":hover": {
                                background: '#00951c'
                            }
                        }}>
                            Sign In
                        </Button>

                        <Grid container>

                            <Grid className='link' item>
                                <Link href="/account/register">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{
                    my: 4
                }}/>
            </Container>
        </ThemeProvider>
    );
}
export default LoginForm