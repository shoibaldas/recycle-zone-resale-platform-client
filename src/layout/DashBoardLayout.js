import React, { useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider';
import Navbar from '../pages/shared/Navbar/Navbar';
import useAdmin from '../useUser/useAdmin/useAdmin';
import useBuyer from '../useUser/useBuyer/useBuyer';
import useSeller from '../useUser/useSeller/useSeller';

const DashBoardLayout = () => {
    const { user } = useContext(AuthContext);
    const [isAdmin] = useAdmin(user?.email);
    const [isBuyer] = useBuyer(user?.email);
    const [isSeller] = useSeller(user?.email);
    return (
        <div>
            <Navbar></Navbar>
            <div className="drawer drawer-mobile">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    <Outlet></Outlet>
                </div>

                <div className="drawer-side">
                    <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 bg-base-100 text-base-content">
                        {
                            isAdmin && <>
                                <li><Link to="/dashboard/allbuyers">My Buyer</Link></li>
                                <li><Link to="/dashboard/sellers">My Seller</Link></li>
                            </>
                        }
                        {
                            isBuyer && <>
                                <li><Link to="/dashboard/allusers">My Orders</Link></li>
                            </>
                        }
                        {
                            isSeller && <>
                                <li><Link to="/dashboard/allusers">Add Products</Link></li>
                                <li><Link to="/dashboard/allusers">My Products</Link></li>
                            </>
                        }
                    </ul>

                </div>
            </div>
        </div>
    );
};

export default DashBoardLayout;