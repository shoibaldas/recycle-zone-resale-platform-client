import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../context/AuthProvider';
import Loading from '../../../Loading/Loading';
import ProductItems from '../ProductItems/ProductItems';

const ProductCategory = () => {
    const { loading, setLoading } = useContext(AuthContext);
    const [categories, setCategories] = useState([]);
    // const { data: categories = [], isLoading } = useQuery({
    //     queryKey: ['category'],
    //     queryFn: async () => {
    //         const res = await fetch('https://recycle-zone-server.vercel.app/categories');
    //         const data = await res.json();
    //         return data;
    //     }
    // });
    useEffect(() => {
        axios
            .get('https://recycle-zone-server.vercel.app/categories')
            .then(function (response) {
                setCategories(response.data);
                setLoading(false)
            });
    }, [])

    if (loading) {
        return <Loading></Loading>
    }

    return (
        <div>
            <div className='flex flex-col items-center'>
                <h2 className='text-3xl text-teal-600 font-bold'>Our Product Categories</h2>
                <p className='w-3/5 text-center text-gray-600'>Choose your budget product from these category and ride your bike like you've never before.</p>
            </div>
            <div className='grid place-items-center md:max-w-screen-lg md:mx-auto py-6'>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-6 gap-6'>
                    {
                        categories?.map(category => <ProductItems key={category._id}
                            category={category}
                        ></ProductItems>)
                    }
                </div>
            </div>
        </div>
    );
};

export default ProductCategory;