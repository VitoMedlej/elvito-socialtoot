import {Box} from "@mui/material"
import Head from "next/head"
import Navbar from "../components/Navbar/Navbar"
import {ILayout} from "../Types"

const Layout = ({children, title, description, Links, hideProfile} : ILayout) => {
    return (
        <Box>
            <Head>
                <title>{title || 'Socialtoot by elvito'}</title>
                <meta property="og:title" content="Social Media Application | SocialToot by Elvito Medlej" />
                <meta name="description" content="A Social media application where you can toot posts, recieve toots then spend them again to get featured on the platform!"/>
                <meta property="og:url" content="https://socialtoot.netlify.app/"/>
                <meta property="og:description" content="Socialtoot by ELvito allows you to give a toot about things you like!"/>
                <meta property="og:image" content="https://res.cloudinary.com/dwcu3wcol/image/upload/v1658929513/log-removebg-preview_fygpsd.png" />
                <link rel="shortcut icon" href="https://res.cloudinary.com/dwcu3wcol/image/upload/v1657099811/log_nkmcys.jpg"/>
                <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link href={`https://fonts.googleapis.com/css2?family=Montserrat:wght@100;300;400;700&display=swap`} rel="stylesheet" />
                
       
            </Head>
            <Navbar Links={Links && Links} hideProfile={hideProfile && hideProfile}/> {children}

        </Box>
    )
}

export default Layout