import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../../../../context/AuthProvider';
import useTitle from '../../../../hook/useTitle';
import Loading from '../../../../Loading/Loading';
import DeleteConfirmationModal from '../../../shared/DeleteConfirmationModal/DeleteConfirmationModal';
import MyOrdersData from './MyOrdersData';

const MyOrders = () => {
    useTitle('My Orders');
    const { user } = useContext(AuthContext);
    const [deletingOrder, setDeletingOrder] = useState(null);

    const closeModal = () => {
        setDeletingOrder(null);
    }

    const { data: myorders = [], refetch, isLoading } = useQuery({
        queryKey: ['myorders'],
        queryFn: async () => {
            try {
                const res = await fetch(`http://localhost:5000/orders/${user?.email}`, {
                    headers: {
                        authorization: `bearer ${localStorage.getItem('accessToken')}`
                    }
                });
                const data = await res.json();
                return data;
            }
            catch (error) {

            }
        }
    });

    const handleDeleteOrder = order => {
        fetch(`http://localhost:5000/orders/${order._id}`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json',
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount > 0) {
                    refetch();
                    toast.success(`${order.productName} deleted successfully`)
                }
            })
    }

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
                            Payment
                        </th>
                        <th scope="col" className="py-3 px-6">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        myorders?.map(order => <MyOrdersData key={order._id}
                            order={order} setDeletingOrder={setDeletingOrder}></MyOrdersData>
                        )
                    }
                </tbody>
            </table>
            {
                deletingOrder && <DeleteConfirmationModal
                    title={`Are you sure you want to delete?`}
                    message={`If you delete ${deletingOrder.productName}. It cannot be undone.`}
                    successAction={handleDeleteOrder}
                    successButtonName="Delete"
                    modalData={deletingOrder}
                    closeModal={closeModal}
                >
                </DeleteConfirmationModal>
            }
        </div>

    );
};

export default MyOrders;