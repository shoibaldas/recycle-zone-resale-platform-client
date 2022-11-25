import { useQuery } from '@tanstack/react-query';
import React from 'react';
import Loading from '../../../../Loading/Loading';
import AllBuyerData from './AllBuyerData';

const AllBuyer = () => {
    const { data: allbuyers = [], isLoading } = useQuery({
        queryKey: ['allbuyer'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/users/allbuyer');
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
                        allbuyers?.map(buyer => <AllBuyerData
                            key={buyer._id}
                            buyer={buyer}
                        ></AllBuyerData>)
                    }
                </tbody>
            </table>
        </div>

    );
};

export default AllBuyer;