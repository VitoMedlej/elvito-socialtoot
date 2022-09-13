import {Box} from "@mui/material"
import MainSection from "../src/components/Sections/MainSection/MainSection"
import ProfileSection from "../src/components/Sections/ProfileSection/ProfileSection"
import TopTootersSection from "../src/components/Sections/TopTootersSection/TopTootersSection"
import Layout from "../src/Layout/Layout"

const index = () => {
    return (
        <Layout title='' description=''>
            <Box
            className='bg'
            sx={{
                display: 'flex',
                margin:'0 auto',
                justifyContent:'center',
            }}>

                <ProfileSection/>
                <MainSection/>
                <TopTootersSection/>
            </Box>

        </Layout>
    )
}

export default index