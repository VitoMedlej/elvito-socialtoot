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
                <link rel="shortcut icon" href="https://res.cloudinary.com/dwcu3wcol/image/upload/v1657099811/log_nkmcys.jpg"/>

                
                <link
                    rel="preconnect"
                    href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700&display=swap"/>
                <style
                    data-href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700&display=swap">
                    font-family: &apos;Roboto&apos;, sans-serif;
                </style>
       
{/* <script dangerouslySetInnerHTML={{ __html: `UPLOADCARE_PUBLIC_KEY =  ${process.env.NEXT_PUBLIC_API_KEY}` }} /> */}
            </Head>
            <Navbar Links={Links && Links} hideProfile={hideProfile && hideProfile}/> {children}

        </Box>
    )
}

export default Layout