import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';

// TODO: profile, cart bg, last priority: login pages

import './customer.css';

import cart from '../../assets/cart.png';

const pages = ['Histogram', 'ABC', 'XYZ'];
const settings = ['Profile', 'Dashboard', 'Logout'];

const Navbar = () => {
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handlePageLink = (page) => {
        setAnchorElNav(null);
        if (page === 'Histogram') navigate('/customer/stats');
        else if (page === 'Logout') navigate('/');
        else navigate('/customer/' + page.toLowerCase());
    };

    const navigate = useNavigate();
    const auth = getAuth();
    const [display, setDisplay] = useState(false);

    const handleCloseUserMenu = (setting) => {
        if (setting === 'Logout') {
            signOut(auth)
                .then(() => {
                    navigate('/');
                })
                .catch((error) => {
                    alert(error);
                });
        }
        setAnchorElUser(null);
    };

    onAuthStateChanged(auth, (user) => {
        if (!user) navigate('/customer-login');
        else setDisplay(true);
    });

    if (!display) return <></>;

    return (
        <AppBar
            position="static"
            className="navbar"
            elevation={0}
            sx={{ color: 'black' }}
        >
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        onClick={() => {
                            navigate('/customer');
                        }}
                        style={{ cursor: 'pointer' }}
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            color: 'black',
                        }}
                    >
                        LOGO
                    </Typography>

                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: 'flex', md: 'none' },
                        }}
                    >
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        ></IconButton>
                        <MenuIcon className="burger-img"></MenuIcon>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {pages.map((page) => (
                                <MenuItem
                                    key={page}
                                    onClick={() => {
                                        handlePageLink(page);
                                    }}
                                >
                                    <Typography textAlign="center">
                                        {page}
                                    </Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        onClick={() => {
                            navigate('/customer');
                        }}
                        sx={{
                            flexGrow: 1,
                            display: { xs: 'flex', md: 'none' },
                        }}
                    >
                        LOGO
                    </Typography>
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: 'none', md: 'flex' },
                        }}
                    >
                        {pages.map((page) => (
                            <Button
                                className="button-text"
                                key={page}
                                onClick={() => {
                                    handlePageLink(page);
                                }}
                                sx={{ my: 2, color: 'black', display: 'block' }}
                            >
                                {page}
                            </Button>
                        ))}
                    </Box>

                    <Box
                        className="cart-container"
                        sx={{
                            flexGrow: 0,
                            height: 40,
                            width: 40,
                            paddingRight: 1,
                        }}
                        style={{ cursor: 'pointer' }}
                        component="img"
                        src={cart}
                        alt="Cart"
                        onClick={() => {
                            navigate('/customer/cart');
                        }}
                    />

                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton
                                onClick={handleOpenUserMenu}
                                sx={{ p: 0 }}
                            >
                                <Avatar
                                    alt="DP"
                                    src={localStorage.getItem('profilePicture')}
                                />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {settings.map((setting) => (
                                <MenuItem
                                    key={setting}
                                    onClick={() => {
                                        handleCloseUserMenu(setting);
                                        handlePageLink(setting);
                                    }}
                                >
                                    <Typography textAlign="center">
                                        {setting}
                                    </Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};
export default Navbar;
