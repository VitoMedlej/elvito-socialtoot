import { Box, Typography } from '@mui/material'
import Link from 'next/link'
import Layout from '../src/Layout/Layout'

const index = () => {
  return (
    <Layout title='404 social toot route not found' description='404 social toot route not found'>
        <Box sx={{textAlign:'center',mt:'1em'}}>

        <Typography  fontSize='3em' color='red'>
        404 PAGE NOT FOUND!
        </Typography>
        <Link href='/'>
        Go Home Bro
        </Link>
        </Box>
    </Layout>
  )
}

export default index