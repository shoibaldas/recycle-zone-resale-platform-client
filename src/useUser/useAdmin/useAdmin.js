import { useEffect, useState } from 'react';

const useAdmin = email => {
    const [isAdmin, setAdmin] = useState(false);
    const [isAdminLoading, setAdminLoading] = useState(true);
    useEffect(() => {
        if (email) {
            fetch(`https://recycle-zone-server.vercel.app/users/admin/${email}`)
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    setAdmin(data.isAdmin);
                    setAdminLoading(false);
                })
        }
    }, [email])
    return [isAdmin, isAdminLoading];
};

export default useAdmin;