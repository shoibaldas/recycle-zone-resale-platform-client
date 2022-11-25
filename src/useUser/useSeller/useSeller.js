import { useEffect, useState } from 'react';

const useSeller = email => {
    const [isSeller, setSeller] = useState(false);
    const [isSellerLoading, setSellerLoading] = useState(true);
    useEffect(() => {
        if (email) {
            fetch(`http://localhost:5000/users/buyer/${email}`)
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    setSeller(data.isSeller);
                    setSellerLoading(false);
                })
        }
    }, [email])
    return [isSeller, isSellerLoading]
};

export default useSeller;