import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../../context/AuthProvider';
import useTitle from '../../../../hook/useTitle';
import Loading from '../../../../Loading/Loading';

const AddProduct = () => {
    useTitle('Add Product');
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { user } = useContext(AuthContext);
    const imageHostKey = process.env.REACT_APP_imgbb_key;

    const navigate = useNavigate();

    const { data: categories, isLoading } = useQuery({
        queryKey: ['category'],
        queryFn: async () => {
            const res = await fetch('https://recycle-zone-server.vercel.app/categories');
            const data = await res.json();
            return data;
        }
    })

    const handleAddProduct = (data) => {

        const date = new Date().toLocaleDateString();
        const time = new Date().toLocaleTimeString();
        const newDateTime = `${date} ${time}`
        const sellerName = user?.displayName;

        const image = data.image[0];
        const formData = new FormData();
        formData.append('image', image);
        const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`
        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imageData => {
                if (imageData.success) {

                    const productInfo = {
                        productName: data.productName,
                        image: imageData.data.url,
                        description: data.description,
                        sellerName: sellerName,
                        sellerMail: user?.email,
                        phone: data.phone,
                        address: data.address,
                        oldPrice: data.oldPrice,
                        newPrice: data.newPrice,
                        condition: data.condition,
                        category: data.category,
                        time: newDateTime
                    }
                    console.log(productInfo)
                    fetch(`https://recycle-zone-server.vercel.app/products`, {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json',
                            authorization: `bearer ${localStorage.getItem('accessToken')}`
                        },
                        body: JSON.stringify(productInfo)
                    })
                        .then(res => res.json())
                        .then(result => {
                            console.log(result);
                            toast.success(`${data.productName} is added successfully`);
                        })
                }
            })
    };

    if (isLoading) {
        <Loading></Loading>
    }

    return (
        <div className='h-[600px] my-40 md:my-0 flex justify-center items-center'>
            <div className='max-w-lg p-7'>
                <h2 className='text-center text-2xl mb-0 md:mb-4 font-semibold'>Add Product</h2>
                <form onSubmit={handleSubmit(handleAddProduct)}>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
                        <div className='form-control w-full max-w-xs'>
                            <label className='label'><span className='label-text font-semibold'>Product Name <span className='text-red-500'>*</span></span></label>
                            <input type="text" {...register("productName", { required: "Email is required" })} placeholder='Product Name' className='rounded-md py-1 px-2 border border-gray-500' />
                            {errors.productName && <p className='text-red-600'>{errors.productName?.message}</p>}
                        </div>
                        <div className='form-control w-full max-w-xs'>
                            <label className='label'><span className='label-text font-semibold'>Category Name <span className='text-red-500'>*</span></span></label>
                            <select className='py-1 px-2 rounded-md border border-gray-500' {...register("category", { required: "Role is required" })}>
                                {
                                    categories?.map(category => <option
                                        key={category._id}
                                        value={category.categoryName}
                                    >{category.categoryName}</option>)
                                }
                            </select>
                        </div>
                        <div className='form-control w-full max-w-xs'>
                            <label className='label'><span className='label-text font-semibold'>Orginal Price <span className='text-red-500'>*</span></span></label>
                            <input type="text" {...register("oldPrice", { required: "input old price" })} placeholder='Old Price' className='rounded-md py-1 px-2 border border-gray-500' />
                            {errors.oldPrice && <p className='text-red-600'>{errors.oldPrice?.message}</p>}
                        </div>
                        <div className='form-control w-full max-w-xs'>
                            <label className='label'><span className='label-text font-semibold'>New Price <span className='text-red-500'>*</span></span></label>
                            <input type="text" {...register("newPrice", { required: "input asking price" })} placeholder='Asking Price' className='rounded-md py-1 px-2 border border-gray-500' />
                            {errors.newPrice && <p className='text-red-600'>{errors.newPrice?.message}</p>}
                        </div>

                        <div className="form-control w-full max-w-xs">
                            <label className='label'><span className='label-text font-semibold'>Product Image <span className='text-red-500'>*</span></span></label>
                            <input type="file" {...register("image", {
                                required: "Photo is Required"
                            })} className="bg-teal-600 text-white rounded-md border-2 w-full max-w-xs" />
                            {errors.image && <p className='text-red-500'>{errors.image.message}</p>}
                        </div>
                        <div className='form-control w-full max-w-xs'>
                            <label className='label'><span className='label-text font-semibold'>Condition <span className='text-red-500'>*</span></span></label>
                            <select className='py-1 px-2 rounded-md border border-gray-500' {...register("condition", { required: "Role is required" })}>
                                <option value="Old">Old</option>
                                <option value="Allmost Old">Allmost Old</option>
                                <option value="AllMost New">Allmost New</option>
                                <option value="New">New</option>
                            </select>
                        </div>
                        <div className='form-control w-full max-w-xs'>
                            <label className='label'><span className='label-text font-semibold'>Contact No <span className='text-red-500'>*</span></span></label>
                            <input type="text" {...register("phone", { required: "Contact is required" })} placeholder='Your Phone' className='rounded-md py-1 px-2 border border-gray-500' />
                            {errors.phone && <p className='text-red-600'>{errors.phone?.message}</p>}
                        </div>
                        <div className='form-control w-full max-w-xs'>
                            <label className='label'><span className='label-text font-semibold'>Address <span className='text-red-500'>*</span></span></label>
                            <input type="text" {...register("address", { required: "Adress is required" })} placeholder='Your Address' className='rounded-md py-1 px-2 border border-gray-500' />
                            {errors.address && <p className='text-red-600'>{errors.address?.message}</p>}
                        </div>
                    </div>
                    <div className='form-control w-full mb-4'>
                        <label className='label'><span className='label-text font-semibold'>Description <span className='text-red-500'>*</span></span></label>
                        <textarea type="text" {...register("description", { required: "Description is required" })} placeholder='Description' className='rounded-md py-2 px-2 border border-gray-500' />
                        {errors.description && <p className='text-red-600'>{errors.description?.message}</p>}
                    </div>
                    <input type="submit" value='Add' className='mt-2 cursor-pointer font-semibold text-white w-full bg-teal-600 hover:bg-teal-700 p-2 rounded-md' />
                </form>
            </div>
        </div>
    );
};

export default AddProduct;