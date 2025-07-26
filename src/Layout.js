import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './components/header/Navbar';
import SubNavbar from './components/header/SubNavbar';
import TopFooter from './components/footer/TopFooter';

function Layout() {
  return (
    <>
      <Navbar />
      <SubNavbar />
      <Outlet />
      <TopFooter />
    </>
  );
}

export default Layout;
