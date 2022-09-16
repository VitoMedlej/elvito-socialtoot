import '../styles/styles.css'
import type {AppProps}
from 'next/app'
import {ThemeProvider} from '@emotion/react'
import {createTheme, CssBaseline} from '@mui/material';
import {createContext, useState} from 'react';
import {IMethod} from '../src/Types';

const theme = createTheme({
    typography: {
        fontFamily: 'Roboto, sans-serif '
    }

})
const defaultUser = {
    name: 'ane',
    email: '',
    toots: 0
}
export const UserContext = createContext < IMethod > ({user: defaultUser});
function MyApp({Component, pageProps} : AppProps) {
    const [user,
        setUser] = useState(defaultUser)
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
