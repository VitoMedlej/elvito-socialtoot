import '../styles/styles.css'
import type {AppProps}
from 'next/app'
import {ThemeProvider} from '@emotion/react'
import {createTheme, CssBaseline} from '@mui/material';
import {createContext,useEffect, useState} from 'react';
import {IMethod, User} from '../src/Types';

const theme = createTheme({
    typography: {
        fontFamily: 'Roboto, sans-serif '
    }

})
const defaultUser = {
    name: '',
    email: '',
    toots: 0
}
export const UserContext = createContext < any> ({user:null,setUser:null});
function MyApp({Component, pageProps} : AppProps) {
    const [user,
        setUser] = useState<User | null>(defaultUser)

    useEffect(() => {
        let LocalUser = localStorage.getItem('LocalUser')
        if (LocalUser && !user ) {
            let parsedUser : User | null = JSON.parse(LocalUser);
            console.log('parsedUser: ', parsedUser);
            setUser(parsedUser)
        }
        if (!LocalUser && user ) {
            let stringifyUser  = JSON.stringify(user);
            console.log('stringifyUser: ', stringifyUser);
            
            localStorage.setItem('LocalUser', stringifyUser);
        }
    },[user])

    return <UserContext.Provider value={{
        user,
        setUser
    }}>

        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <Component {...pageProps}/>
        </ThemeProvider>
    </UserContext.Provider>
}

export default MyApp
