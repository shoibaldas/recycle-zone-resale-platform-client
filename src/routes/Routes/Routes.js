import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import AllBuyer from '../../DashboardContent/AdminContent/AllBuyer/AllBuyer';
import Allseller from '../../DashboardContent/AdminContent/AllSeller/Allseller';
import DashBoardLayout from '../../layout/DashBoardLayout';
import Main from '../../layout/Main';
import AddProduct from '../../pages/AddProduct/AddProduct';
import Blog from '../../pages/Blog/Blog';
import Home from '../../pages/Home/Home/Home';
import MyOrders from '../../pages/MyOrders/MyOrders';
import Login from '../../pages/user/Login/Login';
import Signup from '../../pages/user/Signup/Signup';
import PrivateRoutes from '../PrivateRoutes/PrivateRoutes';
import AdminRoute from '../userRoutes/AdminRoute/AdminRoute';
import BuyerRoute from '../userRoutes/BuyerRoute/BuyerRoute';
import SellerRoute from '../userRoutes/SellerRoute/SellerRoute';


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
        ]
    },
    {
        path: '/dashboard',
        element: <PrivateRoutes><DashBoardLayout></DashBoardLayout></PrivateRoutes>,
        children: [
            {
                path: '/dashboard/allseller',
                element: <AdminRoute><Allseller></Allseller></AdminRoute>
            },
            {
                path: '/dashboard/allbuyer',
                element: <AdminRoute><AllBuyer></AllBuyer></AdminRoute>
            },
            {
                path: '/dashboard/addproduct',
                element: <SellerRoute><AddProduct></AddProduct></SellerRoute>
            },
            {
                path: '/dashboard/myorders',
                element: <BuyerRoute><MyOrders></MyOrders></BuyerRoute>
            },
        ]
    }
])

export default router;