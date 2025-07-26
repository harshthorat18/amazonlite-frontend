import React, { useEffect, useState } from 'react';
import './Navbar.css';
import axios from 'axios';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import PersonIcon from '@mui/icons-material/Person';
import Badge from '@mui/material/Badge';
import SubNavbar from './SubNavbar';
import { NavLink, useNavigate } from 'react-router-dom';
import logo from './logo.png';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer'; // Material-UI Drawer for sidebars
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined'; // Import the hamburger icon
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton'; // For clickable list items
import ListItemText from '@mui/material/ListItemText'; // For text in list items

const Navbar = () => {
    const [loginMsg, setLoginMsg] = useState("Sign in");
    const [cartValue, setCartValue] = useState('0');
    const [profilePhoto, setProfilePhoto] = useState(<NavLink to="/login" className='profile'><PersonIcon id="profile-icon" /></NavLink>);
    const [loggedIn, setLoggedIn] = useState(false);
    const [products, setProducts] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [listHidden, setListHidden] = useState(true);
    const [searchFocused, setSearchFocused] = useState(false);
    // State to manage the open/close status of both left and right drawers
    const [drawerState, setDrawerState] = useState({
        left: false, // For the "All" sidebar
        right: false // For the profile drawer
    });
    const navigate = useNavigate();

    // Base URL for your backend API (ensure this matches your .env)
    const BASE_BACKEND_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

    // Function to toggle any drawer (left or right)
    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setDrawerState({ ...drawerState, [anchor]: open });
    };

    // Content for the Profile (right) Drawer
    const profileDrawerContent = (
        <Box
            sx={{ width: 250 }}
            role="presentation"
            onClick={toggleDrawer('right', false)}
            onKeyDown={toggleDrawer('right', false)}
        >
            <div className='profile-options'>
                <h5>Hello, {loginMsg}</h5>
                <NavLink to='/profile' className='profile-option'>
                    <PersonOutlineOutlinedIcon className='profile-icon' /> Your Account
                </NavLink>
                <NavLink to='/orders' className='profile-option'>
                    <ShoppingCartOutlinedIcon className='profile-icon' /> Your Orders
                </NavLink>
                <div className='profile-option' onClick={logout}>
                    <LogoutOutlinedIcon className='profile-icon' /> Sign Out
                </div>
            </div>
        </Box>
    );

    // Content for the "All" (left) Drawer (this is your new sidebar)
    const allDrawerContent = (
        <Box
            sx={{ width: 250 }} // Adjust width as needed
            role="presentation"
            onClick={toggleDrawer('left', false)} // Close when clicking inside
            onKeyDown={toggleDrawer('left', false)} // Close on keydown
        >
            <List>
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemText primary="Hello, User" /> {/* Or dynamically fetch user */}
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemText primary="Shop by Category" />
                    </ListItemButton>
                </ListItem>
                {/* Add more list items for your sidebar categories */}
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemText primary="Electronics" />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemText primary="Books" />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemText primary="Fashion" />
                    </ListItemButton>
                </ListItem>
                {/* Example: Link to a specific category page */}
                <ListItem disablePadding>
                    <ListItemButton onClick={() => navigate('/products?category=electronics')}>
                        <ListItemText primary="View All Products" />
                    </ListItemButton>
                </ListItem>
            </List>
        </Box>
    );


    function searchChange(e) {
        setSearchText(e.target.value);
        setListHidden(!e.target.value.trim());
    }

    async function logout() {
        try {
            await axios.get(`${BASE_BACKEND_URL}/api/logout`, { withCredentials: true });
            navigate("/login");
            setLoginMsg("Sign in");
            setCartValue("0");
            setLoggedIn(false);
            setProfilePhoto(<NavLink to="/login" className='profile'><PersonIcon id="profile-icon" /></NavLink>);
        } catch (error) {
            console.error("Logout error:", error);
        }
    }

    useEffect(() => {
        const handleScroll = () => {
            const nav = document.querySelector('nav');
            const subNav = document.querySelector('.sub-nav');

            if (nav && subNav) { // Add null checks for safety
                if (window.scrollY > 60) {
                    nav.style.position = 'fixed';
                    nav.style.top = '0';
                    nav.style.width = '100%';
                    nav.style.zIndex = '1000'; // Ensure it stays on top
                    subNav.style.marginTop = '60px';
                } else {
                    nav.style.position = 'relative';
                    nav.style.top = 'auto';
                    nav.style.width = 'auto';
                    nav.style.zIndex = 'auto';
                    subNav.style.marginTop = '0px';
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        async function fetchUser() {
            try {
                const res = await axios.get(`${BASE_BACKEND_URL}/api/getAuthUser`, { withCredentials: true });
                const name = res.data.name;
                const fname = name.split(' ')[0];
                const fletter = name[0];
                const totalQty = res.data.cart.reduce((acc, item) => acc + item.qty, 0);
                setLoginMsg(fname);
                setCartValue(totalQty);
                setLoggedIn(true);
                setProfilePhoto(<div onClick={toggleDrawer('right', true)} className="profile"><div id='profile-letter'>{fletter}</div></div>);
            } catch (error) {
                if (error.response?.data?.message !== "No token provided") {
                    console.error("User fetch error:", error);
                }
            }
        }

        async function fetchProducts() {
            try {
                const res = await axios.get(`${BASE_BACKEND_URL}/api/products`);
                setProducts(res.data);
            } catch (error) {
                console.error("Product fetch error:", error);
            }
        }

        fetchUser();
        fetchProducts();
    }, []);


    return (
        <header>
            {searchFocused && <div className="black-overlay"></div>}
            <nav>
                <div className="logo">
                    <NavLink to="/">
                        <img src={logo} alt="AmazonLite logo" />
                    </NavLink>
                </div>

                {/* The "All" button to open the left sidebar */}
                {/* Changed from NavLink to a div with onClick */}
                <div className="left-item all" onClick={toggleDrawer('left', true)}>
                    <MenuOutlinedIcon id="hamburger" /> All
                </div>

                <div className="search">
                    <input
                        type="text"
                        name="search"
                        className="searchbar"
                        onChange={searchChange}
                        value={searchText}
                        placeholder="Search Amazon.in"
                        onFocus={() => setSearchFocused(true)}
                        onBlur={() => setSearchFocused(false)}
                    />
                    <button className="search-icon">
                        <SearchIcon />
                    </button>
                </div>

                <List className='search-list' hidden={listHidden}>
                    {products.filter(p => p.name.toLowerCase().includes(searchText.toLowerCase()))
                        .slice(0, 5)
                        .map((product, index) => (
                            <ListItem key={index} className='list-item'>
                                <NavLink to={`/product/${product._id}`} onClick={() => setSearchText("")}> {/* Clear search on click */}
                                    {product.name}
                                </NavLink>
                            </ListItem>
                        ))}
                </List>

                <div className="buttons">
                    <NavLink to={loggedIn ? "/profile" : "/login"} className="login">
                        <div className="button-text">Hello, {loginMsg}</div>
                    </NavLink>
                    <NavLink to="/cart" className="cart">
                        <Badge badgeContent={cartValue} color="primary">
                            <ShoppingCartOutlinedIcon id="cart-icon" />
                        </Badge>
                        <div className="button-text">Cart</div>
                    </NavLink>
                    {profilePhoto}
                </div>
            </nav>

            <SubNavbar />

            {/* Drawer for the Profile (right side) */}
            <Drawer anchor="right" open={drawerState.right} onClose={toggleDrawer('right', false)}>
                {profileDrawerContent}
            </Drawer>

            {/* New Drawer for the "All" menu (left side) */}
            <Drawer anchor="left" open={drawerState.left} onClose={toggleDrawer('left', false)}>
                {allDrawerContent}
            </Drawer>
        </header>
    );
};

export default Navbar;


