import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import useTitle from '../../../../hook/useTitle';
import Loading from '../../../../Loading/Loading';
import DeleteConfirmationModal from '../../../shared/DeleteConfirmationModal/DeleteConfirmationModal';
import AllBuyerData from './AllBuyerData';

const AllBuyer = () => {
    useTitle('All Buyers');
    const [deletingBuyer, setDeletingBuyer] = useState(null);

    const closeModal = () => {
        setDeletingBuyer(null);
    }

    const { data: allbuyers = [], refetch, isLoading } = useQuery({
        queryKey: ['allbuyer'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/users/allbuyer');
            const data = await res.json();
            return data;
        }
    });

    const handleDeleteBuyer = buyer => {
        fetch(`http://localhost:5000/users/${buyer._id}`, {
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
                    toast.success(`${buyer.displayName} deleted successfully`)
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
                            Name
                        </th>
                        <th scope="col" className="py-3 px-8">
                            Status
                        </th>
                        <th scope="col" className="py-3 px-7">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        allbuyers?.map(buyer => <AllBuyerData
                            key={buyer._id}
                            buyer={buyer}
                            setDeletingBuyer={setDeletingBuyer}
                        ></AllBuyerData>)
                    }
                </tbody>
            </table>
            {
                deletingBuyer && <DeleteConfirmationModal
                    title={`Are you sure you want to delete?`}
                    message={`If you delete ${deletingBuyer.displayName}. It cannot be undone.`}
                    successAction={handleDeleteBuyer}
                    successButtonName="Delete"
                    modalData={deletingBuyer}
                    closeModal={closeModal}
                >
                </DeleteConfirmationModal>
            }
        </div>

    );
};

export default AllBuyer;