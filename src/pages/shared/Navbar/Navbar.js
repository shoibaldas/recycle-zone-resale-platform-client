import React, { useContext, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthProvider';
import { MdClose } from "react-icons/md";
import { BiMenu } from "react-icons/bi";


const Navbar = () => {
    const [open, setOpen] = useState(false);
    const { user } = useContext(AuthContext);


    const navLinkStyles = ({ isActive }) => {
        return {
            fontWeight: isActive ? '600' : '600',
            color: isActive ? '#0D50B1' : '#616161',
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
                    <li className='my-6 md:my-0'>
                        <NavLink style={navLinkStyles}>Signout</NavLink>
                    </li>
                </>
                :
                <li className='my-6 md:my-0'>
                    <NavLink to='/login' className='hover:bg-blue-900 rounded-md font-semibold outline outline-1 text-blue-900 hover:text-white px-4 py-2'>Login</NavLink>
                </li>
        }

    </>

    return (
        <nav className='p-5 md:flex md:justify-between md:items-center'>
            <div className='flex items-center justify-between'>
                {/* <span className='text-2xl font-bold text-gray-700'>Recycle Zone</span> */}
                <Link className='font-bold text-2xl cursor-pointer flex items-center
      text-gray-800'>
                    <span className='text-4xl font-semibold text-indigo-600 mr-1 pt-2'>
                        <ion-icon name="logo-electron"></ion-icon>
                    </span>
                    Recycle <span className='text-lg font-semibold text-blue-900'>Zone</span>
                </Link>
                <span onClick={() => setOpen(!open)} className='md:hidden cursor-pointer'>
                    {
                        open ? <MdClose className='text-gray-700 text-2xl' /> : <BiMenu className='text-gray-700 text-2xl' />
                    }
                </span>
            </div>
            <ul className={`gap-5 md:flex md:items-center z-[-1] md:z-auto md:static absolute bg-white w-full left-0 md:w-auto md:py-0 pl-6 md:pl-0 opacity-0 md:opacity-100 top-[-96] transition-all ease-in duration-500 ${open ? 'top-16' : 'top-0'} ${open ? 'opacity-100' : 'opacity-0'}`}>
                {menuItems}
            </ul>
        </nav>
    );

};

export default Navbar;