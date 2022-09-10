import {Box} from "@mui/material"
import Head from "next/head"
import Navbar from "../components/Navbar/Navbar"

const Layout = ({children} : any) => {
    return (
        <Box>
            <Head>
                <link rel="preconnect" href="https://fonts.googleapis.com"/>
                <link rel="preconnect" href="https://fonts.gstatic.com"/>
                <link
                    href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700&display=swap"
                    rel="stylesheet"/>
            </Head>
            <Navbar />
         

                {children}
           

        </Box>
    )
}

export default Layout