import { signOut } from 'firebase/auth';
import React from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';

const Navbar = () => {
    const [user] = useAuthState(auth)
    const navigate = useNavigate()
    const handleSignout = () => {
        localStorage.removeItem('token')
        signOut(auth)
        navigate('/login')
    }
    return (
        <div>
            <div className="navbar bg-cyan-700 top-10">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabindex="0" className="btn btn-ghost lg:hidden z-50">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabindex="0" className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 ">
                            <li><Link to={'/'}>Home</Link></li>
                            {
                                user ? <li><Link to={'/dashboard/myorder'}>Dashboard</Link></li> : <li><Link to={'/login'}>Login</Link></li>
                            }

                        </ul>
                    </div>
                    <Link to={'/'}>Micro Parts</Link>
                </div>
                <div className="navbar-center hidden lg:flex ">
                    <ul className="menu menu-horizontal p-0">
                        <li><Link to={'/'}>Home</Link></li>
                        {
                            user ? <li><Link to={'/dashboard/myorder'}>Dashboard</Link></li> : <li><Link to={'/login'}>Login</Link></li>
                        }
                    </ul>
                </div>
                <div className="navbar-end">
                    {
                        user ? <div onClick={handleSignout} title='logout'><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-red-600 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg></div> : null
                    }
                </div>
            </div>
        </div>
    );
};

export default Navbar;