import React from 'react';
import Nav from '../Shared/Nav';
import { Outlet } from 'react-router-dom';
import Footer from '../Shared/Footer';

const Main = () => {
    return (
        <div>
            <Nav></Nav>
             <div className='bg-white text-white min-h-screen lg:px-20 md:px-8'>
             <Outlet></Outlet>
             </div>
            <Footer></Footer>
        </div>
    );
};

export default Main;