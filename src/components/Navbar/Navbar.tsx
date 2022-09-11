import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import {useState} from 'react';
import AccountCircleSharpIcon from '@mui/icons-material/AccountCircleSharp';
import Img from '../Img/Img';

const pages = [{title:'profile',href:`profile/id241f`}, {title:'About',href:'/about'}, {title:'Login',href:'/account/login'}];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const Navbar = () => {
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

    return (
        <AppBar
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
                        {/* <AdbIcon
                            sx={{
                            display: {
                                xs: 'none',
                                md: 'flex'
                            },
                            mr: 1
                        }}/> */}
                        <Typography
                        component="a"
                        href='/'
                            sx={{
                                textDecorations:'none',
                            display: {
                                xs: 'none',
                                md: 'flex'
                            },
                            fontWeight: 700,
                            fontSize: '1.3em',
                            color: '#00951c',
                            pb: '.25em',
                            mr:1
                        }}>
                            Facetoot
                        </Typography>

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
                                }
                            }}>
                                {pages && pages.map((page) => (
                                    <MenuItem key={page.title} onClick={handleCloseNavMenu}>
                                        <Typography color='#000000ab' textAlign="center">{page.title}</Typography>
                                    </MenuItem>
                                ))}
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
                        <Typography
                            variant="h5"
                            noWrap
                            component="a"
                            href="/"
                            sx={{
                            display: {
                                xs: 'flex',
                                md: 'none'
                            },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            color: '#00951c',
                            textDecoration: 'none'
                        }}>
                            FaceToot
                        </Typography>
                        <Box
                            sx={{
                            flexGrow: 1,
                            display: {
                                xs: 'none',
                                md: 'flex'
                            }
                        }}>
                            {pages && pages.map((page) => (
                                <Button
                                    key={page.title}
                                    onClick={handleCloseNavMenu}
                                    sx={{
                                    my: 2,
                                    color: '#000000ab',
                                    display: 'block'
                                }}>
                                    {page.title}
                                </Button>
                            ))}
                        </Box>

                        <Box sx={{
                            flexGrow: 0
                        }}>
                            <Box
                                sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '.25em',
                                
                            }}>
                                <Typography color='#00951c' fontWeight='400'>
                                    20 toots
                                </Typography>
                                <Tooltip title="Open settings">
                                    <IconButton
                                        onClick={handleOpenUserMenu}
                                        sx={{
                                        p: 0
                                    }}>
                                        <Img
                                            width='40px'
                                            height='40px'
                                            rounded={true}
                                            borderRadius='50%'
                                            src='https://res.cloudinary.com/dwcu3wcol/image/upload/v1659775761/297320475_725718358722605_8872437478418476290_n_luki7p.jpg'/>
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
                                {settings.map((setting) => (
                                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                        <Typography textAlign="center">{setting}</Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                    </Toolbar>
                </Container>
            </Box>

        </AppBar>
    );
};
export default Navbar