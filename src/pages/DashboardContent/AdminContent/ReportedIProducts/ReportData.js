import React from 'react';
import { AiFillDelete } from "react-icons/ai";

const ReportData = ({ report, setDeletingProduct }) => {
    const { user, email, productName, productSellerMail, productId } = report;
    return (
        <tr className=" border-b dark:bg-gray-800 dark:border-gray-700">
            <th scope="row" className="flex items-center py-4 px-4 text-gray-900 whitespace-nowrap dark:text-white">
                <div className="pl-3">
                    <div className="text-base font-semibold">{user}</div>
                    <div className="font-normal text-gray-200">{email}</div>
                </div>
            </th>
            <td className="py-4 px-6">
                <div className="text-base font-semibold">{productName}</div>
            </td>
            <td className="py-4 px-6">
                <div className="text-base font-semibold">{productSellerMail}</div>
            </td>
            <td className="py-4 px-6">
                <div className='flex'>
                    <label onClick={() => setDeletingProduct(productId)} htmlFor="confirmation-modal" title='Delete Product' className="text-2xl text-red-500"><AiFillDelete className='mx-4' /></label>
                </div>
            </td>
        </tr>
    );
};

export default ReportData;