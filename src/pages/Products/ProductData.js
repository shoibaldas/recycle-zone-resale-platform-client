import React from 'react';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';
import { TbCurrencyTaka } from "react-icons/tb";
import { BsFillCheckCircleFill } from "react-icons/bs";

const ProductData = ({ product, setBooking, veryfied, setReportProduct, setProductEmail }) => {
    const { image, productName, description, category, sellerName, oldPrice, newPrice, condition, phone, address, time, sellerMail, quantity } = product;
    setProductEmail(sellerMail)
    return (
        <div className="block max-w-sm gap-3 mx-auto sm:max-w-full group hover:no-underline focus:no-underline lg:grid lg:grid-cols-12 dark:bg-gray-900">
            <PhotoProvider>
                <PhotoView src={image}>
                    <img src={image} alt="" className="object-fit md:object-cover w-full lg:col-span-7" />
                </PhotoView>
            </PhotoProvider>
            <div className="bg-teal-900 p-6 lg:col-span-5">
                <div className='flex items-center justify-between'>
                    <h3 className="text-2xl font-semibold sm:text-2xl">{productName} <span className='text-sm text-amber-400'>{
                        quantity === 0 ? 'Sold Out' : 'In Stock'
                    }</span></h3>
                    <div>
                        <label onClick={() => setReportProduct(product)} htmlFor="confirmation-modal" title='Make Advertisement' className="text-gray-800 text-sm font-medium bg-amber-600 px-2 py-1 rounded-lg hover:text-gray-400 hover:bg-amber-800">Report</label>
                    </div>
                </div>
                <div className='flex items-center'>
                    <div className='text-lg mr-1 flex items-center justify-start'><ion-icon name="time-outline"></ion-icon></div>
                    <div>
                        <p className='text-sm'>{time}</p>
                    </div>
                </div>
                <p className='text-md font-semibold'>Category: <span className='font-normal'>{category}</span></p>
                <div className='font-semibold flex items-center '>
                    <p className='font-normal'>Seller Name: {sellerName}</p>
                    <div className='ml-2'>
                        {veryfied?.status === 'Veryfied' ? <BsFillCheckCircleFill className='text-xl text-sky-600 bg-sky-800 rounded-lg'></BsFillCheckCircleFill> : ''}
                    </div>
                </div>
                <p className='font-semibold'>Contact: <span className='font-normal'>{phone}, {address}</span></p>
                <br />
                <div className='bg-black px-2 my-2 rounded-md w-44'>
                    <p className=' text-md font-semibold'>Condition: <span className='font-normal'>{condition}</span></p>
                </div>
                <div className='flex justify-between mr-2 md:mr-28'>
                    <div className='bg-black px-2 rounded-md flex items-center'>
                        <p className='font-semibold'>Price: <span className='font-normal'>{newPrice}</span></p>
                        <TbCurrencyTaka className='text-xl' />
                    </div>
                    <div className='bg-black px-2 rounded-md flex items-center'>
                        <p className='font-semibold'>Old Price: <span className='font-normal'>{oldPrice}</span></p>
                        <TbCurrencyTaka className='text-xl' />
                    </div>
                </div>


                <div className='my-6'>
                    <p className='font-semibold text-lg'>Comment: <span className='text-base font-normal'>{description}</span></p>
                </div>
                <label htmlFor="my-modal-3"
                    onClick={() => setBooking(product)}
                    className="text-gray-800 font-semibold bg-amber-500 px-4 py-2 rounded-md">Book Now</label>
            </div>
        </div >
    );
};

export default ProductData;