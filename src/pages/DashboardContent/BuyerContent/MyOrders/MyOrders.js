import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { AuthContext } from '../../../../context/AuthProvider';
import Loading from '../../../../Loading/Loading';
import MyOrdersData from './MyOrdersData';

const MyOrders = () => {
    const { user } = useContext(AuthContext);

    const { data: myorders = [], isLoading } = useQuery({
        queryKey: ['myorder'],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/orders/${user?.email}`);
            const data = await res.json();
            return data;
        }
    });

    if (isLoading) {
        return <Loading></Loading>
    }

    return (

        <div className="md:max-w-screen-md mx-auto mt-10 overflow-x-auto shadow-md sm:rounded-md">
            <table className="w-full text-sm text-left text-gray-300">
                <thead className="text-xs text-gray-200 uppercase bg-black">
                    <tr>
                        <th scope="col" className="py-3 px-6">
                            Product Details
                        </th>
                        <th scope="col" className="py-3 px-6">
                            User Details
                        </th>
                        <th scope="col" className="py-3 px-6">
                            Contact Info
                        </th>
                        <th scope="col" className="py-3 px-6">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        myorders?.map(order => <MyOrdersData key={order._id}
                            order={order}></MyOrdersData>
                        )
                    }
                </tbody>
            </table>
        </div>

    );
};

export default MyOrders;