import {Box, Container, Typography} from '@mui/material'
import Link from 'next/link'
import Layout from '../src/Layout/Layout'

const Index = () => {
    return (
        <Layout title='' description=''>
            <Container
                sx={{
                textAlign: 'center',
                maxWidth: '750px',
                margin: '4em auto'
            }}>
                <Typography
                    sx={{
                    fontSize: {
                        xs: '1.5em',
                        sm: '2em',
                        md: '2.5em'
                    }
                }}
                    fontWeight='600'>
                    Social-Toot By Elvito
                </Typography>
                <Typography
                    sx={{
                    fontSize: {
                        xs: '1.2em'
                    },
                    maxWidth: '700px',
                    py: '.5em',
                    'a': {
                      
                        color: '#575757'
                    },
                    margin: '0 auto'

                }}
                    color='#464545'
                    fontWeight='400'>

                    <a target='_black' href='https://elvito.netlify.app/'>Vito Medlej</a>{' '}
                    builds all kinds of projects under the Elvito name, This is not a real social
                    media application but rather it is a personal project
                </Typography>
                <Typography
                    sx={{
                    maxWidth: '600px',
                    margin: '0 auto'
                }}
                    fontSize='.9em'
                    color='#575757'>
                    Please do not use and real, or personal information as I take no responsibility
                    for anything that happenes within the application since it is not monitored nor
                    maintained.
                </Typography>
            </Container>
        </Layout>
    )
}

export default Index