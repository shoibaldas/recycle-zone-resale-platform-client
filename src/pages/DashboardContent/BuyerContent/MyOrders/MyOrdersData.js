import React from 'react';
import { FaShopify, FaLocationArrow, FaPhoneAlt } from "react-icons/fa";
import { TbCurrencyTaka } from "react-icons/tb";
import { AiFillMail } from "react-icons/ai";

const MyOrdersData = ({ order }) => {
    const { email, nameBuyer, image, productName, price, phone, meetLocation } = order;
    return (
        <tr className=" border-b dark:bg-gray-800 dark:border-gray-700">
            <th scope="row" className="flex items-center py-4 px-4 text-gray-900 whitespace-nowrap dark:text-white">
                <img className="w-10 h-10 rounded-full" src={image} alt="" />
                <div className="pl-3">
                    <div className="text-base font-semibold">{productName}</div>
                    <div className='flex bg-gray-200 p-1 rounded-md '>
                        <div className="font-semibold text-gray-900">price: {price}</div>
                        <TbCurrencyTaka className='text-xl text-gray-900' />
                    </div>
                </div>
            </th>
            <td className="py-4 px-6">
                <div className="">
                    <div className="text-base font-semibold">{nameBuyer}</div>
                    <div className='flex items-center'>
                        <AiFillMail className='text-amber-400'></AiFillMail>
                        <div className="font-normal ml-1 text-gray-200">{email}</div>
                    </div>
                </div>
            </td>
            <td className="py-4 px-6">
                <div className="">
                    <div className='flex items-center'>
                        <FaLocationArrow className='text-blue-700'></FaLocationArrow>
                        <div className="text-base ml-1 font-semibold">{meetLocation}</div>
                    </div>
                    <div className='flex items-center'>
                        <FaPhoneAlt className='text-red-500'></FaPhoneAlt>
                        <div className="font-normal ml-1 text-gray-200">{phone}</div>
                    </div>
                </div>
            </td>
            <td className="py-4 px-6">
                <div className='flex'>
                    <div title='Pay Now' className='ml-4 cursor-pointer text-xl text-sky-600'><FaShopify /></div>
                </div>
            </td>
        </tr>
    );
};

export default MyOrdersData;