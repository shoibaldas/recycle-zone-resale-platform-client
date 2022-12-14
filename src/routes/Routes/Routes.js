import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import DashBoardLayout from '../../layout/DashBoardLayout';
import Main from '../../layout/Main';
import Blog from '../../pages/Blog/Blog';
import AllBuyer from '../../pages/DashboardContent/AdminContent/AllBuyer/AllBuyer';
import Allseller from '../../pages/DashboardContent/AdminContent/AllSeller/Allseller';
import ReportedProducts from '../../pages/DashboardContent/AdminContent/ReportedIProducts/ReportedProducts';
import MyOrders from '../../pages/DashboardContent/BuyerContent/MyOrders/MyOrders';
import Payment from '../../pages/DashboardContent/BuyerContent/Payment/Payment';
import AddProduct from '../../pages/DashboardContent/SellerContent/AddProduct/AddProduct';
import MyProducts from '../../pages/DashboardContent/SellerContent/MyProducts/MyProducts';
import Home from '../../pages/Home/Home/Home';
import Products from '../../pages/Products/Products';
import ErrorPage from '../../pages/shared/ErrorPage/ErrorPage';
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
        errorElement: <ErrorPage></ErrorPage>,
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
                path: '/category/:categoryName',
                element: <PrivateRoutes><Products></Products></PrivateRoutes>
            }
        ]
    },
    {
        path: '/dashboard',
        element: <PrivateRoutes><DashBoardLayout></DashBoardLayout></PrivateRoutes>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: '/dashboard/myorders',
                element: <BuyerRoute><MyOrders></MyOrders></BuyerRoute>
            },
            {
                path: '/dashboard/allseller',
                element: <AdminRoute><Allseller></Allseller></AdminRoute>
            },
            {
                path: '/dashboard/allbuyer',
                element: <AdminRoute><AllBuyer></AllBuyer></AdminRoute>
            },
            {
                path: '/dashboard/reports',
                element: <AdminRoute><ReportedProducts></ReportedProducts></AdminRoute>
            },
            {
                path: '/dashboard/addproduct',
                element: <SellerRoute><AddProduct></AddProduct></SellerRoute>
            },
            {
                path: '/dashboard/myproducts',
                element: <SellerRoute><MyProducts></MyProducts></SellerRoute>
            },
            {
                path: '/dashboard/myorders/payment/:id',
                element: <Payment></Payment>

            }
        ]
    }
])

export default router;