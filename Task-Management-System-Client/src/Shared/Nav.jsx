import React, { useContext } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { AuthContext } from '../Providers/AuthProviders';
import { toast } from 'react-toastify';

const Nav = () => {
    const { user, logOut } = useContext(AuthContext);
    const handleLogOut = () => {
        logOut()
          .then(() => {
            Navigate('/')
            toast.warn('Successfully LogOut.', { position: "top-center" });
          })
          .catch((error) => console.log(error));
      };
    const links =<>
     <li><Link to={'/'}>Home</Link></li>
    {
        user ? (
            <>
            <li><Link to={'/task'}>Task</Link></li>
            <li><Link to={'/addTask'}>Add Task</Link></li>
            <li><Link to={'/myTask'}>My Task</Link></li>
            <li><button onClick={handleLogOut} className="btn btn-ghost p-2 font-bold">
                    LOGOUT
                </button>
            </li>
            </>
        ) :<>
        <li><Link to={'/login'}>LogIn</Link></li>
        <li><Link to={'/register'}>Register</Link></li>
        </>
    }
    </>
    return (
        <div className="navbar bg-black lg:px-20 md:px-8 ">
            <div className="navbar-start">
                <div className="dropdown">
                <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 6h16M4 12h8m-8 6h16" />
                    </svg>
                </div>
                <ul
                    tabIndex={0}
                    className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow text-white">
                     {links}
                </ul>
                </div>
                <a className="font-bold lg:text-2xl md:text-xl text-white text-md">TMS</a>
            </div>
            <div className="navbar-end hidden lg:flex">
                <ul className="menu menu-horizontal px-1 text-white lg:text-xl">
                 {links}
                </ul>
            </div>
    </div>
    );
};

export default Nav;