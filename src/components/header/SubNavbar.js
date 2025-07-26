import React, { useState } from 'react';
import './Navbar.css';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import subnav from './subnav.jpg';
import { NavLink, useNavigate } from 'react-router-dom';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const SubNavbar = () => {
    const navigate = useNavigate();

    const [drawerState, setDrawerState] = useState({
        left: false,
        right: false
    });

    const [loggedIn, setLoggedIn] = useState(false);
    const [loginMsg, setLoginMsg] = useState(loggedIn ? "User" : "Sign In");

    // State to manage the currently displayed drawer content
    const [currentDrawerScreen, setCurrentDrawerScreen] = useState('mainMenu');

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setDrawerState({ ...drawerState, [anchor]: open });
        // When closing the drawer, always reset to main menu for next open
        if (!open) {
            setCurrentDrawerScreen('mainMenu');
        }
    };

    // Function to navigate to a sub-menu screen
    const goToSubMenu = (menuName) => {
        setCurrentDrawerScreen(menuName);
    };

    // Function to go back to the main menu
    const goToMainMenu = () => {
        setCurrentDrawerScreen('mainMenu');
    };


    // --- Main Menu Content ---
    const mainMenuContent = (
        <Box role="presentation">
            <List>
                {/* Hello, Sign In / User */}
                <ListItem disablePadding className="drawer-item drawer-header">
                    <ListItemButton>
                        <NavLink to={loggedIn ? "/profile" : "/login"} className="drawer-link" onClick={toggleDrawer('left', false)}>
                            <ListItemText primary={`Hello, ${loginMsg}`} style={{ color: 'white' }} />
                            <PersonOutlineIcon className="drawer-header-icon" />
                        </NavLink>
                    </ListItemButton>
                </ListItem>

                {/* Trending section */}
                <ListItem disablePadding className="drawer-section-title">
                    <ListItemText primary="Trending" />
                </ListItem>
                <ListItem disablePadding className="drawer-item">
                    <ListItemButton 
                    onClick={toggleDrawer('left', false)}
                    href="https://www.amazon.in/gp/bestsellers/?ref_=nav_em_cs_bestsellers_0_1_1_2">
                        <ListItemText primary="Best Sellers" />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding className="drawer-item">
                    <ListItemButton 
                    onClick={toggleDrawer('left', false)}
                    href="https://www.amazon.in/gp/new-releases/?ref_=nav_em_cs_newreleases_0_1_1_3">
                        <ListItemText primary="New Releases" />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding className="drawer-item">
                    <ListItemButton 
                    onClick={toggleDrawer('left', false)}
                    href='https://www.amazon.in/gp/movers-and-shakers/?ref_=nav_em_ms_0_1_1_4'>
                        <ListItemText primary="Movers and Shakers" />
                    </ListItemButton>
                </ListItem>

                {/* Digital Content and Devices section */}
                <ListItem disablePadding className="drawer-section-title">
                    <ListItemText primary="Digital Content and Devices" />
                </ListItem>
                <ListItem disablePadding className="drawer-item drawer-with-chevron">
                    <ListItemButton onClick={() => goToSubMenu('echoAlexaMenu')}>
                        <ListItemText primary="Echo & Alexa" />
                        <KeyboardArrowRightIcon className="drawer-chevron" />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding className="drawer-item drawer-with-chevron">
                    <ListItemButton onClick={() => goToSubMenu('fireTvMenu')}> {/* Added for Fire TV */}
                        <ListItemText primary="Fire TV" />
                        <KeyboardArrowRightIcon className="drawer-chevron" />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding className="drawer-item drawer-with-chevron">
                    <ListItemButton onClick={() => goToSubMenu('kindleMenu')}> {/* Added for Kindle */}
                        <ListItemText primary="Kindle E-Readers & eBooks" />
                        <KeyboardArrowRightIcon className="drawer-chevron" />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding className="drawer-item drawer-with-chevron">
                    <ListItemButton onClick={() => goToSubMenu('audibleMenu')}> {/* Added for Audible */}
                        <ListItemText primary="Audible Audiobooks" />
                        <KeyboardArrowRightIcon className="drawer-chevron" />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding className="drawer-item drawer-with-chevron">
                    <ListItemButton onClick={() => goToSubMenu('primeVideoMenu')}> {/* Added for Prime Video */}
                        <ListItemText primary="Amazon Prime Video" />
                        <KeyboardArrowRightIcon className="drawer-chevron" />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding className="drawer-item drawer-with-chevron">
                    <ListItemButton onClick={() => goToSubMenu('primeMusicMenu')}> {/* Added for Prime Music */}
                        <ListItemText primary="Amazon Prime Music" />
                        <KeyboardArrowRightIcon className="drawer-chevron" />
                    </ListItemButton>
                </ListItem>

                {/* Shop by Category section */}
                <ListItem disablePadding className="drawer-section-title">
                    <ListItemText primary="Shop by Category" />
                </ListItem>
                <ListItem disablePadding className="drawer-item drawer-with-chevron">
                    <ListItemButton onClick={toggleDrawer('left', false)}>
                        <ListItemText primary="Mobiles, Computers" />
                        <KeyboardArrowRightIcon className="drawer-chevron" />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding className="drawer-item drawer-with-chevron">
                    <ListItemButton onClick={toggleDrawer('left', false)}>
                        <ListItemText primary="TV, Appliances, Electronics" />
                        <KeyboardArrowRightIcon className="drawer-chevron" />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding className="drawer-item drawer-with-chevron">
                    <ListItemButton onClick={toggleDrawer('left', false)}>
                        <ListItemText primary="Men's Fashion" />
                        <KeyboardArrowRightIcon className="drawer-chevron" />
                    </ListItemButton>
                </ListItem>

                {/* View All Products button at bottom */}
                <ListItem disablePadding className="drawer-item drawer-view-all">
                    <ListItemButton onClick={() => {
                        navigate('/products?category=electronics');
                        toggleDrawer('left', false)();
                    }}>
                        <ListItemText primary="View All Products" />
                    </ListItemButton>
                </ListItem>
            </List>
        </Box>
    );

    // --- Echo & Alexa Sub-Menu Content ---
    const echoAlexaMenuContent = (
        <Box role="presentation">
            <List>
                {/* Back to Main Menu */}
                <ListItem disablePadding className="drawer-item drawer-back-header">
                    <ListItemButton onClick={goToMainMenu}>
                        <ArrowBackIcon className="drawer-back-icon" />
                        <ListItemText primary="Main Menu" />
                    </ListItemButton>
                </ListItem>

                {/* Echo & Alexa Title */}
                <ListItem disablePadding className="drawer-section-title">
                    <ListItemText primary="Echo & Alexa" />
                </ListItem>

                <ListItem disablePadding className="drawer-item">
                    <ListItemButton
                        component="a"
                        href="https://www.amazon.in/gp/browse.html?node=14156834031&ref_=nav_em__shopall_catpage_0_2_2_2"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={toggleDrawer('left', false)}
                    >
                        <ListItemText primary="See all devices with Alexa" />
                    </ListItemButton>
                </ListItem>

                <ListItem disablePadding className="drawer-section-title">
                    <ListItemText primary="Content & Resources" />
                </ListItem>
                <ListItem disablePadding className="drawer-item">
                    <ListItemButton 
                    onClick={toggleDrawer('left', false)}
                    href='https://www.amazon.in/gp/browse.html?node=14172468031&ref_=nav_em__shopall_meetalexa_0_2_2_4'>
                        <ListItemText primary="Meet Alexa" />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding className="drawer-item">
                    <ListItemButton 
                    onClick={toggleDrawer('left', false)}
                    href='https://www.amazon.in/gp/browse.html?node=11928183031&ref_=nav_em__shopall_a2s_help_0_2_2_5'>
                        <ListItemText primary="Alexa Skills" />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding className="drawer-item">
                    <ListItemButton 
                    onClick={toggleDrawer('left', false)}
                    href='https://www.amazon.in/gp/help/customer/display.html?nodeId=201549920&ref_=nav_em__shopall_alexa_app_0_2_2_6'>
                        <ListItemText primary="Alexa App" />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding className="drawer-item">
                    <ListItemButton 
                    onClick={toggleDrawer('left', false)}
                    href='https://www.amazon.in/gp/browse.html?node=14095180031&ref_=nav_em__shopall_echo_smarthome_0_2_2_7'>
                        <ListItemText primary="Alexa Smart Home" />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding className="drawer-item">
                    <ListItemButton 
                    onClick={toggleDrawer('left', false)}
                    href='https://www.amazon.in/music/prime?ref_=nav_em_dmm_in_nav_pc_alexa_mlp_0_2_2_8'>
                        <ListItemText primary="Amazon Prime Music" />
                    </ListItemButton>
                </ListItem>
            </List>
        </Box>
    );

    // --- Fire TV Sub-Menu Content ---
    const fireTvMenuContent = (
        <Box role="presentation">
            <List>
                {/* Back to Main Menu */}
                <ListItem disablePadding className="drawer-item drawer-back-header">
                    <ListItemButton onClick={goToMainMenu}
                    href=''>
                        <ArrowBackIcon className="drawer-back-icon" />
                        <ListItemText primary="Main Menu" />
                    </ListItemButton>
                </ListItem>

                {/* Fire TV Title */}
                <ListItem disablePadding className="drawer-section-title">
                    <ListItemText primary="Fire TV" />
                </ListItem>

                <ListItem disablePadding className="drawer-item">
                    <ListItemButton onClick={toggleDrawer('left', false)}>
                        <ListItemText primary="Fire TV" /> {/* This seems redundant, maybe "Shop all Fire TV" */}
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding className="drawer-item">
                    <ListItemButton 
                    onClick={toggleDrawer('left', false)}
                     href='https://www.amazon.in/b?node=10882806031&ref_=nav_em__shopall_Primevideo_0_2_3_2'>
                        <ListItemText primary="Amazon Prime Video" />
                    </ListItemButton>
                </ListItem>
                 <ListItem disablePadding className="drawer-item">
                    <ListItemButton
                    onClick={toggleDrawer('left', false)}
                    href='https://www.amazon.in/b?node=1661666031&ref_=nav_em__shopall_tankapps_0_2_3_3'>
                        <ListItemText primary="Fire TV Apps & Games" />
                    </ListItemButton>
                </ListItem>
                 <ListItem disablePadding className="drawer-item">
                    <ListItemButton
                     onClick={toggleDrawer('left', false)}
                     href='https://www.amazon.in/gp/browse.html?node=12805339031&ref_=nav_em__shopall_catpage_0_2_3_4'>
                        <ListItemText primary="See all Fire TV devices" />
                    </ListItemButton>
                </ListItem>
            </List>
        </Box>
    );

    // --- Kindle E-Readers & eBooks Sub-Menu Content ---
    const kindleMenuContent = (
        <Box role="presentation">
            <List>
                {/* Back to Main Menu */}
                <ListItem disablePadding className="drawer-item drawer-back-header">
                    <ListItemButton onClick={goToMainMenu}>
                        <ArrowBackIcon className="drawer-back-icon" />
                        <ListItemText primary="Main Menu" />
                    </ListItemButton>
                </ListItem>

                {/* Kindle E-Readers & eBooks Title */}
                <ListItem disablePadding className="drawer-section-title">
                    <ListItemText primary="Kindle E-Readers & eBooks" />
                </ListItem>

                <ListItem disablePadding className="drawer-item">
                    <ListItemButton onClick={toggleDrawer('left', false)}>
                        <ListItemText primary="Kindle E-readers" />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding className="drawer-item">
                    <ListItemButton onClick={toggleDrawer('left', false)}>
                        <ListItemText primary="All-new Kindle" />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding className="drawer-item">
                    <ListItemButton onClick={toggleDrawer('left', false)}>
                        <ListItemText primary="All-new Kindle Paperwhite" />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding className="drawer-item">
                    <ListItemButton onClick={toggleDrawer('left', false)}>
                        <ListItemText primary="Kindle Paperwhite Starter package" />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding className="drawer-item">
                    <ListItemButton onClick={toggleDrawer('left', false)}>
                        <ListItemText primary="All-New Kindle Oasis" />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding className="drawer-item">
                    <ListItemButton onClick={toggleDrawer('left', false)}>
                        <ListItemText primary="Refurbished & Open Box" />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding className="drawer-item">
                    <ListItemButton onClick={toggleDrawer('left', false)}>
                        <ListItemText primary="Kindle E-Reader Accessories" />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding className="drawer-item">
                    <ListItemButton onClick={toggleDrawer('left', false)}>
                        <ListItemText primary="See all Kindle E-readers" />
                    </ListItemButton>
                </ListItem>
            </List>
        </Box>
    );

    // --- Audible Audiobooks Sub-Menu Content ---
    const audibleMenuContent = (
        <Box role="presentation">
            <List>
                {/* Back to Main Menu */}
                <ListItem disablePadding className="drawer-item drawer-back-header">
                    <ListItemButton onClick={goToMainMenu}>
                        <ArrowBackIcon className="drawer-back-icon" />
                        <ListItemText primary="Main Menu" />
                    </ListItemButton>
                </ListItem>

                {/* Audible Audiobooks Title */}
                <ListItem disablePadding className="drawer-section-title">
                    <ListItemText primary="Audible Audiobooks" />
                </ListItem>

                <ListItem disablePadding className="drawer-item">
                    <ListItemButton onClick={toggleDrawer('left', false)}>
                        <ListItemText primary="Audible Membership" />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding className="drawer-item">
                    <ListItemButton onClick={toggleDrawer('left', false)}>
                        <ListItemText primary="All Audiobooks" />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding className="drawer-item">
                    <ListItemButton onClick={toggleDrawer('left', false)}>
                        <ListItemText primary="Best Sellers" />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding className="drawer-item">
                    <ListItemButton onClick={toggleDrawer('left', false)}>
                        <ListItemText primary="New Releases" />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding className="drawer-item">
                    <ListItemButton onClick={toggleDrawer('left', false)}>
                        <ListItemText primary="Hindi Audiobooks" />
                    </ListItemButton>
                </ListItem>
            </List>
        </Box>
    );

    // --- Amazon Prime Video Sub-Menu Content ---
    const primeVideoMenuContent = (
        <Box role="presentation">
            <List>
                {/* Back to Main Menu */}
                <ListItem disablePadding className="drawer-item drawer-back-header">
                    <ListItemButton onClick={goToMainMenu}>
                        <ArrowBackIcon className="drawer-back-icon" />
                        <ListItemText primary="Main Menu" />
                    </ListItemButton>
                </ListItem>

                {/* Amazon Prime Video Title */}
                <ListItem disablePadding className="drawer-section-title">
                    <ListItemText primary="Amazon Prime Video" />
                </ListItem>

                <ListItem disablePadding className="drawer-item">
                    <ListItemButton onClick={toggleDrawer('left', false)}>
                        <ListItemText primary="All Videos" />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding className="drawer-item">
                    <ListItemButton onClick={toggleDrawer('left', false)}>
                        <ListItemText primary="Categories" />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding className="drawer-item">
                    <ListItemButton onClick={toggleDrawer('left', false)}>
                        <ListItemText primary="My Stuff" />
                    </ListItemButton>
                </ListItem>
            </List>
        </Box>
    );

    // --- Amazon Prime Music Sub-Menu Content ---
    const primeMusicMenuContent = (
        <Box role="presentation">
            <List>
                {/* Back to Main Menu */}
                <ListItem disablePadding className="drawer-item drawer-back-header">
                    <ListItemButton onClick={goToMainMenu}>
                        <ArrowBackIcon className="drawer-back-icon" />
                        <ListItemText primary="Main Menu" />
                    </ListItemButton>
                </ListItem>

                {/* Amazon Prime Music Title */}
                <ListItem disablePadding className="drawer-section-title">
                    <ListItemText primary="Amazon Prime Music" />
                </ListItem>

                <ListItem disablePadding className="drawer-item">
                    <ListItemButton onClick={toggleDrawer('left', false)}>
                        <ListItemText primary="Amazon Prime Music" /> {/* Appears twice, check actual Amazon behavior */}
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding className="drawer-item">
                    <ListItemButton onClick={toggleDrawer('left', false)}>
                        <ListItemText primary="Open web player" />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding className="drawer-item">
                    <ListItemButton onClick={toggleDrawer('left', false)}>
                        <ListItemText primary="Voice controlled with Alexa" />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding className="drawer-item">
                    <ListItemButton onClick={toggleDrawer('left', false)}>
                        <ListItemText primary="Amazon Prime Music Apps" />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding className="drawer-item">
                    <ListItemButton onClick={toggleDrawer('left', false)}>
                        <ListItemText primary="CDs and Vinyls" />
                    </ListItemButton>
                </ListItem>
            </List>
        </Box>
    );


    // Determine which content to display based on state
    const displayContent = (() => {
        switch (currentDrawerScreen) {
            case 'mainMenu':
                return mainMenuContent;
            case 'echoAlexaMenu':
                return echoAlexaMenuContent;
            case 'fireTvMenu':
                return fireTvMenuContent;
            case 'kindleMenu':
                return kindleMenuContent;
            case 'audibleMenu':
                return audibleMenuContent;
            case 'primeVideoMenu':
                return primeVideoMenuContent;
            case 'primeMusicMenu':
                return primeMusicMenuContent;
            default:
                return mainMenuContent; // Fallback
        }
    })();


    return (
        <div className="sub-nav">
            <div className="left">
                <NavLink to="#" className="left-item all" onClick={toggleDrawer('left', true)}>
                    <MenuOutlinedIcon id="hamburger" />
                    All
                </NavLink>

                <Drawer
                    anchor="left"
                    open={drawerState.left}
                    onClose={toggleDrawer('left', false)}
                >
                    {/* Render the dynamically chosen content */}
                    {displayContent}
                </Drawer>

                {/* ... (rest of your sub-navbar links - keeping them for context) ... */}
                <NavLink href="https://www.amazon.in/gp/bestsellers/?ref_=nav_em_cs_bestsellers_0_1_1_2" className="left-item">
                    Best Sellers
                </NavLink>

                <a href="https://www.amazon.in/mobile-phones/b/?ie=UTF8&node=1389401031&ref_=nav_cs_mobiles"
                    className="left-item"
                    target="_blank"
                    rel="noopener noreferrer">
                    Mobiles
                </a>

                <a href="https://www.amazon.in/gp/help/customer/display.html?nodeId=200507590&ref_=nav_cs_help"
                    className="left-item"
                    target="_blank"
                    rel="noopener noreferrer">
                    Customer Services
                </a>

                <a href="https://www.amazon.in/deals?ref_=nav_cs_gb"
                    className="left-item"
                    target="_blank"
                    rel="noopener noreferrer">
                    Today's Deals
                </a>

                <a href="https://www.amazon.in/gp/browse.html?node=6648217031&ref_=nav_cs_fashion"
                    className="left-item"
                    target="_blank"
                    rel="noopener noreferrer">
                    Fashion
                </a>

                <a href="https://www.amazon.in/electronics/b/?ie=UTF8&node=976419031&ref_=nav_cs_electronics"
                    className="left-item"
                    target="_blank"
                    rel="noopener noreferrer">
                    Electronics
                </a>

                <a href="https://www.amazon.in/Home-Kitchen/b/?ie=UTF8&node=976442031&ref_=nav_cs_home"
                    className="left-item"
                    target="_blank"
                    rel="noopener noreferrer">
                    Home & Kitchen
                </a>

                <a href="https://www.amazon.in/gp/new-releases/?ref_=nav_cs_newreleases"
                    className="left-item"
                    target="_blank"
                    rel="noopener noreferrer">
                    New Releases
                </a>

                <a href="https://www.amazon.in/beauty/b/?ie=UTF8&node=1355016031&ref_=nav_cs_beauty"
                    className="left-item"
                    target="_blank"
                    rel="noopener noreferrer">
                    Beauty & Personal Care
                </a>

            </div>

            <div className="right">
                <NavLink to="/#" className="download">
                    <img src={subnav} alt="Download Amazon App" loading="lazy" />
                </NavLink>
            </div>
        </div>
    );
};

export default SubNavbar;