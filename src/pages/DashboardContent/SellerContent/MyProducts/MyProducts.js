import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { AuthContext } from '../../../../context/AuthProvider';
import Loading from '../../../../Loading/Loading';
import MyProductsData from './MyProductsData';

const MyProducts = () => {
    const { user } = useContext(AuthContext);

    const { data: myproducts = [], isLoading } = useQuery({
        queryKey: ['myproduct'],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/products/${user?.email}`);
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
                            Name
                        </th>
                        <th scope="col" className="py-3 px-24">
                            Added
                        </th>
                        <th scope="col" className="py-3 px-6">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        myproducts?.map(product => <MyProductsData key={product._id}
                            product={product}></MyProductsData>
                        )
                    }
                </tbody>
            </table>
        </div>

    );
};

export default MyProducts;