import { useQuery } from '@tanstack/react-query';
import React from 'react';
import Loading from '../../../../Loading/Loading';
import AllSellerData from './AllSellerData';

const Allseller = () => {
    const { data: allsellers = [], isLoading } = useQuery({
        queryKey: ['allseller'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/users/allseller');
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
                        allsellers?.map(seller => <AllSellerData
                            key={seller._id}
                            seller={seller}
                        ></AllSellerData>)
                    }
                </tbody>
            </table>
        </div>

    );
};

export default Allseller;