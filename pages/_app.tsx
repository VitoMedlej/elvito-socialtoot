import '../styles/styles.css'
import type {AppProps}
from 'next/app'
import {ThemeProvider} from '@emotion/react'
import {createTheme, CssBaseline} from '@mui/material';

const theme = createTheme({
    typography: {
        fontFamily: 'Roboto, sans-serif '
    }

})

function MyApp({Component, pageProps} : AppProps) {
    return <ThemeProvider theme={theme}>
        <CssBaseline/>
        <Component {...pageProps}/>
    </ThemeProvider>
}

export default MyApp
