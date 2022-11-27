import React from 'react';
import { BsFillCheckCircleFill } from "react-icons/bs";
import { AiFillDelete } from "react-icons/ai";

const AllSellerData = ({ seller, setDeletingSeller, setVerifySeller }) => {
    const { displayName, email } = seller;
    return (
        <tr className=" border-b dark:bg-gray-800 dark:border-gray-700">
            <th scope="row" className="flex items-center py-4 px-4 text-gray-900 whitespace-nowrap dark:text-white">
                <div className="pl-3">
                    <div className="text-base font-semibold">{displayName}</div>
                    <div className="font-normal text-gray-200">{email}</div>
                </div>
            </th>
            <td className="py-4 px-6">
                <div className="flex items-center">

                    <label className={seller?.status === 'Veryfied' ? 'text-green-500' : 'text-red-500'}>
                        {
                            seller?.status === 'Veryfied' ? 'Veryfied' : 'Not Veryfied'
                        }
                    </label>
                </div>
            </td>
            <td className="py-4 px-6">
                <div className='flex'>
                    <label onClick={() => setVerifySeller(seller)} htmlFor="confirmation-modal" title='Verify Seller' className="text-2xl text-green-500"><BsFillCheckCircleFill /></label>

                </div>
            </td>
            <td className="py-4 px-6">
                <div className='flex'>
                    <label onClick={() => setDeletingSeller(seller)} htmlFor="confirmation-modal" title='Delete Seller' className="text-2xl text-red-500"><AiFillDelete className='mx-4' /></label>
                </div>
            </td>
        </tr>
    );
};

export default AllSellerData;