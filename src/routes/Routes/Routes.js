import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Main from '../../layout/Main';
import Blog from '../../pages/Blog/Blog';
import Home from '../../pages/Home/Home/Home';
import Login from '../../pages/user/Login/Login';


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
            }
        ]
    }
])

export default router;