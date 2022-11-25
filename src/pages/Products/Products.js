import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider';
import Loading from '../../Loading/Loading';

import ProductData from './ProductData';

const Products = () => {
    const { loading } = useContext(AuthContext);
    const { categoryName } = useParams();
    const [products, setProducts] = useState([]);
    useEffect(() => {
        fetch(`http://localhost:5000/category/${categoryName}`)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setProducts(data)
            })
    }, [categoryName])

    console.log(products)

    if (loading) {
        return <Loading></Loading>
    }

    return (
        <section className="dark:text-gray-100">
            <div className="container max-w-6xl p-6 mx-auto space-y-6 sm:space-y-12">
                {
                    products?.map(product => <ProductData key={product._id} product={product}></ProductData>)
                }
            </div>
            
        </section>

    );
};

export default Products;