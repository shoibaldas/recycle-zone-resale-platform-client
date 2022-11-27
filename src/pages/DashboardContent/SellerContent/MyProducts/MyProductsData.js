import React from 'react';
import { AiFillDelete } from "react-icons/ai";

const MyProductsData = ({ product, setDeletingProduct, setAdvertisement }) => {
    const { image, productName, category, time } = product;

    return (
        <tr className=" border-b dark:bg-gray-800 dark:border-gray-700">
            <th scope="row" className="flex items-center py-4 px-4 pr-12 text-gray-900 whitespace-nowrap dark:text-white">
                <img className="w-10 h-10 rounded-full" src={image} alt="" />
                <div className="pl-3">
                    <div className="text-base font-semibold">{productName}</div>
                    <div className="font-normal text-gray-200">{category}</div>
                </div>
            </th>
            <td className="py-4 px-12">
                <div className="flex items-center">
                    <div className="h-2.5 w-2.5 rounded-full bg-green-400 mr-2"></div>
                    <div className='w-28'>{time}</div>
                </div>
            </td>
            <td className="py-4 px-10">
                <label onClick={() => setAdvertisement(product)} htmlFor="confirmation-modal" title='Make Advertisement' className="text-gray-800 text-sm font-medium bg-amber-600 px-2 py-1 rounded-lg hover:text-gray-400 hover:bg-amber-800">Make Ad</label>
            </td>
            <td className="py-4 px-6">
                <label onClick={() => setDeletingProduct(product)} htmlFor="confirmation-modal" title='Delete Product' className="text-2xl text-red-500"><AiFillDelete className='mx-4' /></label>
            </td>
        </tr>
    );
};

export default MyProductsData;