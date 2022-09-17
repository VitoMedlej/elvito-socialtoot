import {Box} from "@mui/material"
import {useContext, useEffect, useState} from "react"
import MainSection from "../src/components/Sections/MainSection/MainSection"
import ProfileSection from "../src/components/Sections/ProfileSection/ProfileSection"
import TopTootersSection from "../src/components/Sections/TopTootersSection/TopTootersSection"
import TopTootersSectionSkeleton from "../src/components/Sections/TopTootersSection/TopTootersSectionSkeleton"
import Layout from "../src/Layout/Layout"
import {UserContext} from "./_app"

const index = () => {
    const {user, setUser} = useContext(UserContext);

    const fn =async () => {
        await fetch('http://localhost:3000/api/socket/socket')
    
    }

    const CurrentUser = user && user
        ?.email
            ? user
            : {
                name: "Default User",
                toots: 0
            }

    return (
        <Layout title='' description=''>
            <Box
                className='bg'
                sx={{
                display: 'flex',
                margin: '0 auto',
                justifyContent: 'center'
            }}>
                <button onClick={() => fn()}></button>
                <ProfileSection user={CurrentUser}/>
                <MainSection/> {< TopTootersSection />}
                {/* {  <TopTootersSectionSkeleton user/> } */}

            </Box>

        </Layout>
    )
}

export default index