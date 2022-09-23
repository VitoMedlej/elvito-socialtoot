import {Box, Button} from "@mui/material"
import { useEffect, useState} from "react"
import MainSection from "../src/components/Sections/MainSection/MainSection"
import ProfileSection from "../src/components/Sections/ProfileSection/ProfileSection"
import TopTootersSection from "../src/components/Sections/TopTootersSection/TopTootersSection"
import TopTootersSectionSkeleton from "../src/components/Sections/TopTootersSection/TopTootersSectionSkeleton"
import Layout from "../src/Layout/Layout"
import Popup from "../src/components/Popup/Popup"
import { ITooter } from "../src/Types"



const Index = () => {
    const [data,setData] = useState<ITooter[] | null>(null)
    const [isLoading,setLoading] = useState(false)

    const getData = async ()=>{
        try {

        setLoading(true)
        const req = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/users/get-users`)
        const data = await req.json()
        if (data) {
            setData(data)
        }
        setLoading(false)
    }
    catch(er){
        console.log('er: ', er);
        setLoading(false)

    }
    }
   
    
    const send = async () => {
           await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/test`)
        }
    return (
        <Layout title='SocialToot by elvito | Earn and give toots!' description='Socialtoot is a social media app where you share your toots with the world while scrolling your feed and view other tooters'>
            <Popup/>
            <Button onClick={send}>send</Button>
            <Box
                className='bg'
                sx={{
                display: 'flex',
                margin: '0 auto',
                justifyContent: 'center'
            }}>
                <ProfileSection />
              
                <MainSection/>
                 {data && data?.length > 0  && < TopTootersSection isLoading={isLoading} refresh={getData} data={data} />}
                { !data &&  <TopTootersSectionSkeleton /> }

            </Box>

        </Layout>
    )
}

export default Index