import {Box, Container, Divider, Typography} from '@mui/material'
import Profile from '../src/components/Profile/Profile'
import TopTooter from '../src/components/Sections/TopTootersSection/TopTooter'
import fetchTopTooters from '../src/Functions/fetchTopTooters'
import Layout from '../src/Layout/Layout'
import {ITooter} from '../src/Types'

const Index = ({users} : any) => {

    let data = users && JSON.parse(users)

    return (
        <Layout title={`Top 10 Tooters on SocialToot | Most Toot Givers `} description='A top 10 list of most toot givers on socialtoot by elvito | Use your toots for a chance to be featured on the application'>

            <Container
                sx={{
                width: {
                    xs: '100%',
                    sm: '90%',
                    md: '80%'
                },
                minWidth: '300px'
            }}
                maxWidth='lg'>
                <Profile rank={1} topTooter={true} user={data[0]}/>
                <Divider></Divider>

                <Box
                    sx={{
                    margin: '1em auto 0',
                    boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
                    border: '1px solid #00000014',
                    borderRadius: '6px',
                   mt:'2em',
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'space-between',
                   px:'1.2em',
                    background: 'white',
                    flexDirection: 'column'
                }}>
                    <Box sx={{py:'1em', fontWeight:100}}>
                        <Typography fontSize='1.2em'>
                            More Amazing Tooters
                        </Typography>
                    </Box>
                    <Box sx={{  display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'space-between',}}>

                        {data && data
                            .slice(1)
                            .map((tooter : ITooter,index:number) => {

                                return <TopTooter
                                rank={index}
                                key={tooter?._id || index}
                                    user={tooter}
                                    width={{
                                    xs: '100%',
                                    sm: '50%'
                                }}/>
                            })}

                    </Box>
                </Box>
            </Container>
        </Layout>
    )
}

export default Index

export const getServerSideProps = async({query} : any) => {
    try {
        
        const data = await fetchTopTooters(10)

        if (!data) {
            throw 'No tooters found'
        }
        return {
            props: {
                users: JSON.stringify(data)
            }
        }
    } catch (err) {
        console.log(err)
        return {
            redirect: {
                permanent: false,
                destination: `/`
            }
        };
    }
}