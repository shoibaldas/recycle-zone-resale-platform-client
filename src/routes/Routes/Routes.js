import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Main from '../../layout/Main';
import AddProduct from '../../pages/AddProduct/AddProduct';
import Blog from '../../pages/Blog/Blog';
import Home from '../../pages/Home/Home/Home';
import Login from '../../pages/user/Login/Login';
import Signup from '../../pages/user/Signup/Signup';


const router = createBrowserRouter([
    {
        path: '/',
        element: <Main />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: '/blog',
                element: <Blog />
            },
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/signup',
                element: <Signup />
            },
            {
                path: '/addproduct',
                element: <AddProduct></AddProduct>
            }
        ]
    }
])

export default router;