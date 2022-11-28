import React, { useContext } from 'react';
import { AuthContext } from '../../../../context/AuthProvider';
import { TbCurrencyTaka } from "react-icons/tb";
import { FaUserCircle } from "react-icons/fa";
import { AiFillMail } from "react-icons/ai";
import toast from 'react-hot-toast';

const BookingModal = ({ booking, setBooking }) => {
    const { user } = useContext(AuthContext);
    const { productName, image, newPrice, _id } = booking;
    const hadleBookNow = (event) => {
        event.preventDefault();
        const form = event.target;
        const phoneNo = form.phone.value;
        const meetLocation = form.location.value;

        const order = {
            nameBuyer: user?.displayName,
            email: user?.email,
            productName,
            price: newPrice,
            image,
            meetLocation,
            phone: phoneNo,
            bookingId: _id
        }

        fetch(`https://recycle-zone-server.vercel.app/orders`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify(order)
        })
            .then(res => res.json())
            .then(data => {
                toast.success('You booked the item successfully.')
                console.log(data);
                setBooking(null);
            })
    }

    return (
        <div>
            <input type="checkbox" id="my-modal-3" className="modal-toggle" />
            <div className="modal">
                <form onSubmit={hadleBookNow} className="modal-box bg-teal-800 relative">
                    <label htmlFor="my-modal-3" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="text-lg font-bold">Confirm Booking</h3>
                    <div className='flex justify-between items-center mt-6'>
                        <div className='flex items-center'>
                            <img src={image} className="md:w-5/12 md:h-16 w-4/12 h-10 border border-1 rounded-lg" alt="" />
                            <div className=''>
                                <h5 className='mx-4 font-semibold text-gray-200'>{productName}</h5>
                                <div className='mx-4 flex items-center'>
                                    <h6 className='text-amber-400 text-lg font-semibold'>{newPrice}</h6>
                                    <TbCurrencyTaka className='text-red-500 text-xl'></TbCurrencyTaka>
                                </div>
                            </div>
                        </div>
                        <div className=''>
                            <div className='mx-4 flex items-center'>
                                <FaUserCircle className='text-xl'></FaUserCircle>
                                <h5 className='ml-1 font-semibold'>{user?.displayName}</h5>
                            </div>
                            <div className='mx-4 flex items-center'>
                                <AiFillMail className='text-xl text-amber-400'></AiFillMail>
                                <h6 className='ml-1 font-normal'>{user?.email}</h6>
                            </div>

                        </div>

                    </div>
                    <div className='mt-4 grid grid-cols-1 gap-2 place-items-center'>
                        <div className='form-control w-full max-w-xs'>
                            <input type="text" placeholder="phone" name='phone' required className='text-gray-800 rounded-md py-1 px-2 border border-gray-500' />
                        </div>
                        <div className='form-control w-full max-w-xs'>
                            <input type="text" placeholder="meeting location" name='location' required className='text-gray-800 rounded-md py-1 px-2 border border-gray-500' />
                        </div>
                        <button type='submit' className='bg-amber-500 p-2 w-full max-w-xs rounded-md' >Submit</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default BookingModal;