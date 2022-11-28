import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import useTitle from '../../../../hook/useTitle';
import Loading from '../../../../Loading/Loading';
import DeleteConfirmationModal from '../../../shared/DeleteConfirmationModal/DeleteConfirmationModal';
import ReportData from './ReportData';

const ReportedProducts = () => {
    useTitle('Reports');
    const [deletingProduct, setDeletingProduct] = useState(null);

    const closeModal = () => {
        setDeletingProduct(null);
    }

    const { data: reports = [], refetch, isLoading } = useQuery({
        queryKey: ['report'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/reports');
            const data = await res.json();
            return data;
        }
    });

    const handleDeleteProduct = products => {
        console.log(products)
        fetch(`http://localhost:5000/products/${products.productId}`, {
            method: 'DELETE',
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount > 0) {
                    refetch();
                    toast.success(`${products.productName} deleted successfully`)
                }
            })

        fetch(`http://localhost:5000/reported-products/${products._id}`, {
            method: 'DELETE',
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount > 0) {
                    refetch();
                    toast.success(`${products.productName} deleted successfully`)
                }
            })
    };

    if (isLoading) {
        return <Loading></Loading>
    }

    return (
        <div className="md:max-w-screen-md mx-auto mt-10 overflow-x-auto shadow-md sm:rounded-md">
            <table className="w-full text-sm text-left text-gray-300">
                <thead className="text-xs text-gray-200 uppercase bg-black">
                    <tr>
                        <th scope="col" className="py-3 px-6">
                            Reporter
                        </th>
                        <th scope="col" className="py-3 px-16">
                            Product
                        </th>
                        <th scope="col" className="py-3 px-12">
                            Seller
                        </th>
                        <th scope="col" className="py-3 px-7">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        reports?.map(report => <ReportData
                            key={report._id}
                            report={report}

                            setDeletingProduct={setDeletingProduct}
                        ></ReportData>)
                    }
                </tbody>
            </table>
            {

                deletingProduct && <DeleteConfirmationModal
                    title={`Are you sure you want to delete?`}
                    message={`If you delete ${deletingProduct.productName}. It cannot be undone.`}
                    successAction={handleDeleteProduct}
                    successButtonName="Delete"
                    modalData={deletingProduct}
                    closeModal={closeModal}
                >
                </DeleteConfirmationModal>

            }
        </div>
    );
};

export default ReportedProducts;