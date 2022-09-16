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
import {useContext, useEffect, useState} from 'react';
import Img from '../Img/Img';
import {IMenuLinks, INavbar} from '../../Types';
import {useRouter} from 'next/router';

import Typography from '@mui/material/Typography';

import AccountBoxIcon from '@mui/icons-material/AccountBox';
import InfoIcon from '@mui/icons-material/Info';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import SettingsIcon from '@mui/icons-material/Settings';
import { UserContext } from '../../../pages/_app';

let pages : IMenuLinks[] = [
    {
        title: 'Profile',
        href: `/profile/id241f`,
        Icon : AccountBoxIcon
    }, {
        title: 'About',
        href: '/about',
        Icon:InfoIcon
    }, {
        title: 'Top Tooters',
        href: '/top-tooters/',
        Icon : EmojiEventsIcon
    }, {
        title: 'Login',
        href: '/account/login',
        Icon : VpnKeyIcon
    }
];
let settings = [
    {
        title: 'Profile',
        href: '/profile/id'
    }, {
        title: 'logout',
        href: '/logout'
    }
]

const Navbar = ({Links, hideProfile} : INavbar) => {
    const router = useRouter()
    const [anchorElNav,
        setAnchorElNav] = useState < null | HTMLElement > (null);
    const [anchorElUser,
        setAnchorElUser] = useState < null | HTMLElement > (null);

    const handleOpenNavMenu = (event : React.MouseEvent < HTMLElement >) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event : React.MouseEvent < HTMLElement >) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);

    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    const {user} = useContext(UserContext);


    // useEffect(() => {

    //     if (Links && Links?.length > 0) {
    //         pages = Links
    //     }

    // }, [Links])

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

                    <Img sx={{cursor:'pointer'}} src='https://res.cloudinary.com/dwcu3wcol/image/upload/v1663270414/logo_t6gtw8.jpg' width='200px' height='45px'/>
                        </Box>
                        {/* <Typography
                            className='logo'
                            component="a"
                            href='/'
                            sx={{
                            textDecorations: 'none',
                            display: {
                                xs: 'none',
                                md: 'flex'
                            },
                            mr: '.25em',
                            fontWeight: 700,
                            fontSize: '1.3em',
                            pb: '.25em'
                        }}>
                            SocialToot
                        </Typography> */}

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
                                { pages.map(({Icon,href,title}) => {
                                    
                                    if (user && user.email && title){
                                        title = 'Logout';
                                        href= '/api/auth/account/logout'
                                    }
                                    return <MenuItem sx={{minWidth:'220px'}} onClick={()=>router.push(href || '/')} key={title}>
                                    <ListItemIcon>
                                        {Icon ? <Icon fontSize="small"/> : <SettingsIcon fontSize='small'/>} 
                                    </ListItemIcon>
                                    <ListItemText>{title}</ListItemText>
                                  
                                </MenuItem>
                              
                            })}
                            </Menu>
                        </Box>
                        {/* <AdbIcon
                            sx={{
                            display: {
                                xs: 'flex',
                                md: 'none'
                            },
                            mr: 1
                        }}/> */}
                        {/* <Typography
                            className='logo'
                            variant="h5"
                            noWrap
                            component="a"
                            href="/"
                            sx={{
                            textDecorations: 'none',
                            display: {
                                xs: 'flex',
                                md: 'none'
                            },
                            flexGrow: 1,
                            fontWeight: 700
                        }}>
                           SocialToot
                        </Typography> */}
                          <Box sx={{
                               flexGrow: 1,
                               display: {
                                xs: 'flex',
                                md: 'none'
                            }
                        }}>

                    <Img sx={{cursor:'pointer'}} src='https://res.cloudinary.com/dwcu3wcol/image/upload/v1663270414/logo_t6gtw8.jpg' width='200px' height='45px'/>
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
                                    0 toots
                                </Typography>
                                <Tooltip title="Open settings">
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
                                            src={'https://www.svgrepo.com/show/7892/user.svg'}/>
                                    </IconButton>
                                </Tooltip>

                            </Box>

                            <Menu
                                sx={{
                                mt: '45px'
                            }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right'
                            }}
                                keepMounted
                                transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right'
                            }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}>
                                {settings && settings.map((setting) => (
                                    <MenuItem
                                        key={setting.title}
                                        onClick={() => {
                                        router.push(setting.href);
                                        handleCloseUserMenu
                                    }}>
                                        <Typography textAlign="center">{setting.title}</Typography>
                                    </MenuItem>
                                    
                                ))}
                            </Menu>

                        </Box>}
                    </Toolbar>
                </Container>
            </Box>

        </AppBar>
    )
}
export default Navbar