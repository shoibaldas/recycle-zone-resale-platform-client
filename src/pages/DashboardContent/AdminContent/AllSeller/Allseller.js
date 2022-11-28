import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import useTitle from '../../../../hook/useTitle';
import Loading from '../../../../Loading/Loading';
import DeleteConfirmationModal from '../../../shared/DeleteConfirmationModal/DeleteConfirmationModal';
import AllSellerData from './AllSellerData';
import VerificationModal from './VerificationModal/VerificationModal';

const Allseller = () => {
    useTitle('All Sellers');
    const [deletingSeller, setDeletingSeller] = useState(null);
    const [verifySeller, setVerifySeller] = useState(null);

    const closeModal = () => {
        setDeletingSeller(null);
    }

    const closeVerifyModal = () => {
        setVerifySeller(null);
    }

    const { data: allsellers = [], refetch, isLoading } = useQuery({
        queryKey: ['allseller'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/users/allseller');
            const data = await res.json();
            return data;
        }
    });

    const handleDeleteSeller = seller => {
        fetch(`http://localhost:5000/users/${seller._id}`, {
            method: 'DELETE',
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount > 0) {
                    refetch();
                    toast.success(`${seller.displayName} deleted successfully`)
                }
            })
    };

    const handleVerifySeller = seller => {
        fetch(`http://localhost:5000/users/seller/${seller._id}`, {
            method: 'PUT',
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data) {
                    toast.success(`${seller.displayName} veryfied successfully`);
                    refetch();
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
                        <th scope="col" className="py-3 px-10">
                            Status
                        </th>
                        <th scope="col" className="py-3 px-4">
                            Verify?
                        </th>
                        <th scope="col" className="py-3 px-7">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        allsellers?.map(seller => <AllSellerData
                            key={seller._id}
                            seller={seller}
                            setDeletingSeller={setDeletingSeller}
                            setVerifySeller={setVerifySeller}
                        ></AllSellerData>)
                    }
                </tbody>
            </table>
            {
                deletingSeller && <DeleteConfirmationModal
                    title={`Are you sure you want to delete?`}
                    message={`If you delete ${deletingSeller.displayName}. It cannot be undone.`}
                    successAction={handleDeleteSeller}
                    successButtonName="Delete"
                    modalData={deletingSeller}
                    closeModal={closeModal}
                >
                </DeleteConfirmationModal>
            }
            {
                verifySeller && <VerificationModal
                    title={`Do you want to procced?`}
                    message={`${verifySeller.displayName} will be a verified seller.`}
                    successAction={handleVerifySeller}
                    successButtonName="Verify"
                    modalData={verifySeller}
                    closeModal={closeVerifyModal}
                >
                </VerificationModal>
            }
        </div>

    );
};

export default Allseller;