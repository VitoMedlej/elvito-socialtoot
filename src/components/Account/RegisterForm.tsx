import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Link from 'next/link'
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {
    Grid,
    Typography,
    Container,
    CssBaseline,
    Box,
    Avatar,
    TextField,
    Button
} from '@mui/material';
import {Copyright} from './LoginForm';
import {ChangeEvent, FormEvent, useState} from 'react';
import { IMethod } from '../../Types';
import Validate from '../../Functions/Validate';
import { handleSubmit } from '../../Functions/handleSubmit';

const theme = createTheme();



const RegisterFrom = ({setUser}:IMethod) => {
  
    const [userData,
        setUserData] = useState({name: '', email: '', password: ''})
    const handleChange = (e : ChangeEvent < HTMLInputElement | HTMLTextAreaElement >) => {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value
        })
    }
    const resetForm = () => {
        setUserData({name: '', email: '', password: ''})
    }
    const Submit = async (e:FormEvent < HTMLFormElement >) =>{
        e.preventDefault();
     const loggedUser = await  handleSubmit(e, 'http://localhost:3000/api/auth/register', {
            name: userData.name,
            email: userData.email,
            password: userData.password
        });
        
        
        if (loggedUser && loggedUser?.email && loggedUser._id && setUser ) {
            localStorage.setItem('LocalUser',JSON.stringify(loggedUser))

            await setUser(loggedUser)
            resetForm()

        }
        resetForm()
       
    }
    return (
        <ThemeProvider theme={theme}>
            <Container
                sx={{
                borderRadius: '6px'
            }}
                component="main">
                <CssBaseline/>
                <Box
                    sx={{
                    borderRadius: '6px',
                    boxShadow: 'rgb(0 0 0 / 15%) 0px 8px 24px',
                    p: {
                        xs: ' 2em 1em',
                        md: '2em 3em '
                    },
                    background: 'white',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}>
                    <Avatar
                        sx={{
                        m: {
                            sm: 1
                        },
                        bgcolor: '#00951c'
                    }}>
                        <LockOutlinedIcon/>
                    </Avatar>
                    <Typography
                        data-cy='form-info'
                        sx={{
                        fontSize: "1em",
                        textAlign: 'center',
                        color: 'gray'
                    }}
                        component="h1">
                        Welcome To Social Toot
                    </Typography>
                    <Box
                        component="form"
                        onSubmit={(e:any) => Submit(e) }
                        sx={{
                        mt: 3
                    }}>
                        <Grid container spacing={2}>

                            <Grid item xs={12}>
                                <TextField
                                    value={userData.name}
                                    onChange={(e) => handleChange(e)}
                                    error={Validate(userData.name)}
                                    helperText="Name should be appropriate and over 4 letters"
                                    required
                                    fullWidth
                                    id="username"
                                    data-cy='create-name'
                                    autoFocus
                                    type='text'
                                    label="Your Name"
                                    name="name"
                                    autoComplete="name"/>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    value={userData.email}
                                    onChange={(e) => handleChange(e)}
                                    error={Validate(userData.email)}
                                    helperText="Anything that looks like an email"
                                    data-cy='create-email'
                                    required
                                    fullWidth
                                    type='email'
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"/>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    value={userData.password}
                                    onChange={(e) => handleChange(e)}
                                    error={Validate(userData.password)}
                                    helperText="Absolutely not your wifi password"
                                    data-cy='create-password'
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"/>
                            </Grid>

                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            data-cy='submit-btn'
                            variant='contained'
                            sx={{
                            backgroundColor: "#00951c",
                            mt: 3,
                            mb: 2,
                            ":hover": {
                                background: '#00951c'
                            }
                        }}>
                            Sign Up
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item className='link'>
                                <Link href="/account/login">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{
                    mt: 5
                }}/>
            </Container>
        </ThemeProvider>
    );
}
export default RegisterFrom