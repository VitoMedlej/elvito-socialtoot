import { Box, Typography } from '@mui/material'
import Link from 'next/link'
import React from 'react'
import Layout from '../src/Layout/Layout'

const index = () => {
  return (
    <Layout>
        <Box sx={{textAlign:'center',mt:'1em'}}>

        <Typography  fontSize='3em' color='red'>
OMG        404 PAGE NOT FOUND!
        </Typography>
        <Link href='/'>
        Go Home Bro
        </Link>
        </Box>
    </Layout>
  )
}

export default index