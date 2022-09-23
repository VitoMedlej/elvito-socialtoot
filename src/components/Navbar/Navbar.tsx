import {
    Box,
    Container,
    Tooltip,
    Button,
    ListItemText,
    Menu,
    AppBar,
    MenuItem,
    ListItemIcon,
    MenuList,
    IconButton
} from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import MenuIcon from '@mui/icons-material/Menu';
import {useContext, useState} from 'react';
import Img from '../Img/Img';
import {IMenuLinks, INavbar} from '../../Types';
import {useRouter} from 'next/router';
import Typography from '@mui/material/Typography';
import InfoIcon from '@mui/icons-material/Info';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import SettingsIcon from '@mui/icons-material/Settings';
import { UserContext } from '../../../pages/_app';
import logout from '../../Functions/logout';

let pages : IMenuLinks[] = [
   {
        title: 'About',
        href: '/about',
        Icon:InfoIcon
    }, {
        title: 'Top Tooters',
        href: '/top-tooters/',
        Icon : EmojiEventsIcon
    }
];


const Navbar = ({Links, hideProfile} : INavbar) => {
    const router = useRouter()
    const [anchorElNav,
        setAnchorElNav] = useState < null | HTMLElement > (null);
  

    const handleOpenNavMenu = (event : React.MouseEvent < HTMLElement >) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = () => {
        if (user) router.push(`/profile/${user._id}/${user.name}`)
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);

    };

   
    const {user,setUser} = useContext(UserContext);
    
   




    return (
        <AppBar
        elevation={0} 
            sx={{
            background: "white",
            py: '.1em'
        }}
            position="static">
            <Box
                sx={{
                width: '100%',
                boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px'
            }}>

                <Container sx={{}} maxWidth="xl">
                    <Toolbar disableGutters>
                        <Box sx={{
                               display: {
                                xs: 'none',
                                md: 'flex'
                            }
                        }}>
<Box onClick={()=>router.push('/')}>

                    <Img
                     sx={{cursor:'pointer'}} src='https://res.cloudinary.com/dwcu3wcol/image/upload/v1663270414/logo_t6gtw8.jpg' width='200px' height='45px'/>
                     </Box>
                        </Box>
              

                        <Box
                            sx={{
                            flexGrow: 1,
                            display: {
                                xs: 'flex',
                                md: 'none'
                            }
                        }}>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}>
                                <MenuIcon/>
                               
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorElNav}
                                anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left'
                            }}
                                keepMounted
                                transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left'
                            }}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                                sx={{

                                display: {
                                    xs: 'block',
                                    md: 'none'
                                },
                             
                            }}>
                               <MenuItem sx={{minWidth:'220px'}} onClick={()=> router.push(`/profile/${user._id}/${user.name}`)} >
                                    <ListItemIcon>
                                         <SettingsIcon fontSize='small'/>
                                    </ListItemIcon>
                                    <ListItemText>Profile</ListItemText>
                                  
                                </MenuItem>
                          
                                { pages.map(({Icon,href,title}) => {
                                    
                                    
                                    return <MenuItem sx={{minWidth:'220px'}} onClick={()=>  router.push(href || '/')} key={title}>
                                    <ListItemIcon>
                                        {Icon ? <Icon fontSize="small"/> : <SettingsIcon fontSize='small'/>} 
                                    </ListItemIcon>
                                    <ListItemText>{title}</ListItemText>
                                  
                                </MenuItem>
                              
                            })}
                                  <MenuItem sx={{minWidth:'220px'}} onClick={()=> user?.email ? logout(setUser) : router.push('/account/login')} >
                                    <ListItemIcon>
                                         <SettingsIcon fontSize='small'/>
                                    </ListItemIcon>
                                    <ListItemText>{user?.email ? 'Login' : ' Logout'}</ListItemText>
                                  
                                </MenuItem>
                           

                            </Menu>
                        </Box>
                      
                          <Box sx={{
                               flexGrow: 1,
                               display: {
                                xs: 'flex',
                                md: 'none'
                            }
                        }}>
                            <Box onClick={()=>router.push('/')}>

                    <Img sx={{cursor:'pointer'}} src={ 'https://res.cloudinary.com/dwcu3wcol/image/upload/v1663270414/logo_t6gtw8.jpg'} width='200px' height='45px'/>
</Box>
                        </Box>
                        <Box
                            sx={{
                            flexGrow: 1,
                            display: {
                                xs: 'none',
                                md: 'flex'
                            },
                            flexDirection:'row',
                            ml:'1em',
                        }}>
                            <MenuList sx={{display:'flex',py:0}}>

                     
                                {pages && pages.map((page) => (

                                    <Button
                                        key={page.title}
                                        onClick={() => {
                                        handleCloseNavMenu();
                                        router.push(page.href || '/')
                                    }}
                                        sx={{
                                        my: 2,
                                        color: '#000000ab',
                                        display: 'block'
                                    }}>
                                        {page.title}
                                    </Button>
                                ))}
                                      {user && user.email &&      <Button
                                        
                                        onClick={() => {
                                        handleCloseNavMenu();
                                       router.push(`/profile/${user._id}/${user.name}`)
                                    }}
                                        sx={{
                                        my: 2,
                                        color: '#000000ab',
                                        display: 'block'
                                    }}>
                                      Profile
                                    </Button>}
                                       <Button
                                        
                                        onClick={() => {
                                        handleCloseNavMenu();
                                        user ? logout(setUser) : router.push('/account/login')
                                    }}
                                        sx={{
                                        my: 2,
                                        color: '#000000ab',
                                        display: 'block'
                                    }}>
                                       {user ? 'Logout' : 'Login'}
                                    </Button>
                        

                            </MenuList>

                        </Box>

                        {!hideProfile && <Box sx={{
                            flexGrow: 0
                        }}>

                            <Box
                                sx={{
                                display: hideProfile
                                    ? 'none'
                                    : 'flex',
                                alignItems: 'center',
                                gap: '.25em'
                            }}>
                                <Typography color='#00951c' fontWeight='400'>
                                    {user?.toots || 0} toots
                                </Typography>
                                <Tooltip title="Open Profile">
                                    <IconButton
                                        onClick={handleOpenUserMenu}
                                        sx={{
                                        p: 0
                                    }}>
                                        <Img
                                            sx={{
                                            border: '1px solid #d5d5d5'
                                        }}
                                            width='40px'
                                            height='40px'
                                            rounded={true}
                                            borderRadius='50%'
                                            src={user?.img || 'https://www.svgrepo.com/show/7892/user.svg'}/>
                                    </IconButton>
                                </Tooltip>

                            </Box>

                         

                        </Box>}
                    </Toolbar>
                </Container>
            </Box>

        </AppBar>
    )
}
export default Navbar