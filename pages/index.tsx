import {Box} from "@mui/material"
import {useContext, useEffect, useState} from "react"
import MainSection from "../src/components/Sections/MainSection/MainSection"
import ProfileSection from "../src/components/Sections/ProfileSection/ProfileSection"
import TopTootersSection from "../src/components/Sections/TopTootersSection/TopTootersSection"
import TopTootersSectionSkeleton from "../src/components/Sections/TopTootersSection/TopTootersSectionSkeleton"
import Layout from "../src/Layout/Layout"

import Popup from "../src/components/Popup/Popup"
import fetchTopTooters from "../src/Functions/fetchTopTooters"
import { ITooter } from "../src/Types"




const index = () => {
    // const socket = useSocket('/api/socket');
    const [data,setData] = useState<ITooter[] | null>(null)

    useEffect( () => {
        const getData = async ()=>{
            
            const req = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/users/get-users`)
            const data = await req.json()
            if (data) {
                setData(data)
                
            }
        }
    
        getData()
        
    },[])
    
    return (
        <Layout title='' description=''>
            <Popup/>
            <Box
                className='bg'
                sx={{
                display: 'flex',
                margin: '0 auto',
                justifyContent: 'center'
            }}>
                <ProfileSection />
              
                <MainSection/>
                 {data && data?.length > 0  && < TopTootersSection data={data} />}
                { !data &&  <TopTootersSectionSkeleton /> }

            </Box>

        </Layout>
    )
}

export default index