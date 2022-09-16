import '../styles/styles.css'
import type {AppProps}
from 'next/app'
import {ThemeProvider} from '@emotion/react'
import {createTheme, CssBaseline} from '@mui/material';
import {createContext,useEffect, useState} from 'react';
import { User} from '../src/Types';
import SyncUser from '../src/Functions/SyncUser';

const theme = createTheme({
    typography: {
        fontFamily: 'Roboto, sans-serif '
    }

})

export const UserContext = createContext <any> (null);
function MyApp({Component, pageProps} : AppProps) {
    const [user,
        setUser] = useState<User | null>(null)

    useEffect(() => {
        SyncUser({setUser,user})
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
