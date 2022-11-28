import React, { useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider';
import useTitle from '../../hook/useTitle';
import Loading from '../../Loading/Loading';
import BookingModal from '../DashboardContent/BuyerContent/BookingModal/BookingModal';
import ReportConfirmationModal from '../ReportProducts/ReportConfirmationModal/ReportConfirmationModal';

import ProductData from './ProductData';

const Products = () => {
    useTitle('Products');
    const { user, loading } = useContext(AuthContext);
    const [booking, setBooking] = useState(null);
    const { categoryName } = useParams();
    const [products, setProducts] = useState([]);
    const [productEmail, setProductEmail] = useState('');
    const [veryfied, setVeryfied] = useState({});
    const [reportProduct, setReportProduct] = useState(null);

    const closeModal = () => {
        setReportProduct(null);
    }

    useEffect(() => {
        fetch(`https://recycle-zone-server.vercel.app/category/${categoryName}`)
            .then(res => res.json())
            .then(data => {
                setProducts(data)
                if (data) {
                    fetch(`https://recycle-zone-server.vercel.app/veryfied/seller/${productEmail}`)
                        .then(res => res.json())
                        .then(data => {
                            console.log(data)
                            setVeryfied(data)
                        })
                }
            })
    }, [categoryName, productEmail])

    const handleReport = product => {
        const order = {
            user: user?.displayName,
            email: user?.email,
            productId: product._id,
            productName: product.productName,
            productSellerMail: product.sellerMail
        }

        fetch(`https://recycle-zone-server.vercel.app/report-items`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify(order)
        })
            .then(res => res.json())
            .then(data => {
                toast.success('You  successfully.')
                console.log(data);
                setBooking(null);
            })
    }

    if (loading) {
        return <Loading></Loading>
    }

    return (
        <section className="dark:text-gray-100">
            <div className="container max-w-6xl p-6 mx-auto space-y-6 sm:space-y-12">
                {
                    products?.map(product => <ProductData
                        key={product._id}
                        product={product}
                        setBooking={setBooking}
                        veryfied={veryfied}
                        setReportProduct={setReportProduct}
                        setProductEmail={setProductEmail}
                    ></ProductData>)
                }
                {
                    booking &&
                    <BookingModal
                        booking={booking}
                        setBooking={setBooking}
                    ></BookingModal>
                }
                {
                    reportProduct && <ReportConfirmationModal
                        title={`Are you sure you want to procced?`}
                        message={`Do want to report ${reportProduct.productName}?`}
                        successAction={handleReport}
                        successButtonName="Confirm"
                        modalData={reportProduct}
                        closeModal={closeModal}
                    >
                    </ReportConfirmationModal>
                }
            </div>

        </section>

    );
};

export default Products;