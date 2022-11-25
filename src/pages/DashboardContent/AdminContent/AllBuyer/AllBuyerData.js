import React from 'react';
import { BsFillCheckCircleFill } from "react-icons/bs";
import { AiFillDelete } from "react-icons/ai";

const AllBuyerData = ({ buyer }) => {
    const { displayName, email } = buyer;
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
                    <div className="h-2.5 w-2.5 rounded-full bg-green-400 mr-2"></div> Online
                </div>
            </td>
            <td className="py-4 px-6">
                <div className='flex'>
                    <div title='verify' className=' cursor-pointer text-xl mr-4 text-blue-600'><BsFillCheckCircleFill /></div>
                    <div title='delete' className='cursor-pointer text-xl text-red-600'><AiFillDelete /></div>
                </div>
            </td>
        </tr>
    );
};

export default AllBuyerData;