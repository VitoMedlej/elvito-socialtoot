import {Box} from "@mui/material"
import Head from "next/head"
import Navbar from "../components/Navbar/Navbar"
import {ILayout} from "../Types"

const Layout = ({children, title, description, Links, hideProfile} : ILayout) => {
    return (
        <Box>
            <Head>
                <link rel="preconnect" href="https://fonts.googleapis.com"/>
                <link rel="preconnect" href="https://fonts.gstatic.com"/>
                <link
                    rel="preconnect"
                    href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700&display=swap"/>
                <style
                    data-href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700&display=swap">
                    font-family: 'Roboto', sans-serif;
                </style>
            </Head>
            <Navbar Links={Links && Links} hideProfile={hideProfile && hideProfile}/> {children}

        </Box>
    )
}

export default Layout