import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../../../../context/AuthProvider';
import useTitle from '../../../../hook/useTitle';
import Loading from '../../../../Loading/Loading';
import DeleteConfirmationModal from '../../../shared/DeleteConfirmationModal/DeleteConfirmationModal';
import MyProductsData from './MyProductsData';

const MyProducts = () => {
    useTitle('My Products');
    const { user } = useContext(AuthContext);
    const [deletingProduct, setDeletingProduct] = useState(null);
    const [makeAdvertisement, setAdvertisement] = useState(null);

    const closeModal = () => {
        setDeletingProduct(null);
    }
    const closeAdModal = () => {
        setAdvertisement(null);
    }

    const { data: myproducts = [], refetch, isLoading } = useQuery({
        queryKey: ['myproduct'],
        queryFn: async () => {
            try {
                const res = await fetch(`https://recycle-zone-server.vercel.app/products/${user?.email}`, {
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

    const handleAdvertisement = product => {
        const adInfo = {
            productId: product._id,
            productName: product.productName,
            image: product.image,
            newPrice: product.newPrice,
            condition: product.condition,
            category: product.category
        }

        fetch(`https://recycle-zone-server.vercel.app/advertisements`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify(adInfo)
        })
            .then(res => res.json())
            .then(res => {
                if (res) {
                    toast.success(`${product.productName} published successfully`);
                }
            })
    }

    const handleDeleteProduct = product => {
        fetch(`https://recycle-zone-server.vercel.app/products/${product._id}`, {
            method: 'DELETE',
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount > 0) {
                    refetch();
                    toast.success(`${product.productName} deleted successfully`)
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
                        <th scope="col" className="py-3 px-20">
                            Added
                        </th>
                        <th scope="col" className="py-3 px-8">
                            Advirtisement
                        </th>
                        <th scope="col" className="py-3 px-6">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        myproducts?.map(product => <MyProductsData key={product._id}
                            product={product}
                            setDeletingProduct={setDeletingProduct}
                            setAdvertisement={setAdvertisement}
                        ></MyProductsData>
                        )
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
            {
                makeAdvertisement && <DeleteConfirmationModal
                    title={`Are you sure you want to procced?`}
                    message={`Do want to add ${makeAdvertisement.productName} as ad?`}
                    successAction={handleAdvertisement}
                    successButtonName="Confirm"
                    modalData={makeAdvertisement}
                    closeModal={closeAdModal}
                >
                </DeleteConfirmationModal>
            }
        </div>

    );
};

export default MyProducts;