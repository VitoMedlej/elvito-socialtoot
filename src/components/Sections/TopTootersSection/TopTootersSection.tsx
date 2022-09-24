import {Box, Divider, Button, Typography, IconButton} from '@mui/material'
import {useRouter} from 'next/router'
import {ITooter} from '../../../Types'
import RefreshIcon from '@mui/icons-material/Refresh';
import TopTooter from './TopTooter'

const TopTootersSection = ({isLoading,data,refresh} : {
    data: ITooter[];
    isLoading ?: boolean;
    refresh : ()=> void;
}) => {
    const router = useRouter();
    return (
        <Box
           
            sx={{
                
            boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
            background: 'white',
            display: {
                xs: 'none',
                lg: 'flex'
            },
            maxWidth: '400px',
            height: '100%',
            mt: '2em',
            padding: '1em',
            borderRadius: '6px',
            width: {
                xs: '0%',
                lg: "30%"
            },
            flexDirection: 'column'
        }}>
            <Box
                sx={{
                pb: '.5em',
                background:'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
            }}>

                <Typography>
                    Top Toots Givers
                </Typography>
                <IconButton
                disabled={isLoading}
                onClick={()=>refresh()} >
                    <RefreshIcon/>
                </IconButton>
            </Box>
            <Divider sx={{
                borderColor: '#8080802b'
            }}/>
            <Box sx={{
                pt: '.5em'
            }}>
                {data && data.map((tooter : ITooter, index : number) => {

                    return <TopTooter rank={index - 1} key={tooter._id} user={tooter}/>
                })
}
            </Box>
            <Button
                onClick={() => router.push('/top-tooters')}
                sx={{
                color: '#00951c',
                width: '100%'
            }}>View More</Button>
        </Box>
    )
}

export default TopTootersSection