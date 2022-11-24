import React, { useContext, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthProvider';
import { MdClose } from "react-icons/md";
import { BiMenu } from "react-icons/bi";
import { FaUserAlt } from "react-icons/fa";

const Navbar = () => {
    const [open, setOpen] = useState(false);
    const { user, logOut } = useContext(AuthContext);

    const handleLogOut = () => {
        logOut()
            .then(() => { })
            .catch(error => console.error(error))
    }

    const navLinkStyles = ({ isActive }) => {
        return {
            fontWeight: isActive ? '600' : '600',
            color: isActive ? '#1DDABA' : '#FFFFFF',
        }
    }

    const menuItems = <>
        <li className='my-6 md:my-0'>
            <NavLink to='/' style={navLinkStyles}>Home</NavLink>
        </li>
        <li className='my-6 md:my-0'>
            <NavLink to='/blog' style={navLinkStyles}>Blog</NavLink>
        </li>
        {
            user?.uid ?
                <>
                    <div className="dropdown dropdown-end mr-6">
                        <label tabIndex={0} className="btn btn-ghost btn-circle avatar tooltip tooltip-bottom" data-tip={user?.displayName}>
                            {
                                user?.uid ?
                                    <>
                                        <img className='w-10 rounded-full' src={user?.photoURL} alt='' />
                                        <i className="fa-solid w-8 h-4 text-white font-bold fa-angle-down"></i>
                                    </>
                                    :
                                    <FaUserAlt className='bg-gray-500'></FaUserAlt>
                            }
                        </label>
                        <ul tabIndex={0} className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
                            <li><Link to='/myreviews'>My orders</Link></li>
                            <li><Link onClick={handleLogOut}>Logout</Link></li>
                        </ul>
                    </div>
                </>
                :
                <li className='my-6 md:my-0'>
                    <NavLink to='/login' className='hover:bg-teal-600 rounded-md font-semibold outline outline-1 hover:outline-none transition ease-in duration-500 text-white px-4 py-2'>Login</NavLink>
                </li>
        }
    </>

    return (
        <nav className='bg-black p-2 md:flex md:justify-between md:items-center'>
            <div className='flex items-center justify-between'>
                <Link className='font-bold text-2xl cursor-pointer flex items-center text-gray-50'>
                    <span className='text-4xl font-semibold text-indigo-600 mr-1 pt-2'>
                        <ion-icon name="logo-electron"></ion-icon>
                    </span>
                    Recycle <span className='text-lg font-semibold text-teal-600'>Zone</span>
                </Link>
                <span onClick={() => setOpen(!open)} className='md:hidden cursor-pointer'>
                    {
                        open ? <MdClose className='text-gray-700 text-2xl' /> : <BiMenu className='text-gray-700 text-2xl' />
                    }
                </span>
            </div>
            <ul className={`gap-5 md:flex md:items-center z-[-1] md:z-auto md:static absolute w-full left-0 md:w-auto md:py-0 pl-6 md:pl-0 opacity-0 md:opacity-100 top-[-96] transition-all ease-in duration-500 ${open ? 'top-16' : 'top-0'} ${open ? 'opacity-100' : 'opacity-0'}`}>
                {menuItems}
            </ul>
        </nav>
    );

};

export default Navbar;