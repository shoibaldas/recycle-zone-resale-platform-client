import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FcGoogle } from "react-icons/fc";
import toast from 'react-hot-toast';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthProvider';
import useToken from '../../../hook/useToken';

const Signup = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [createdUserEmail, setCreatedUserEmail] = useState('');
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [signupError, setSignupError] = useState('');
    const { createUser, updateUser, signInWithGoogle, setSignIn } = useContext(AuthContext);

    const location = useLocation();
    const from = location.state?.from?.pathname || '/';

    const [token] = useToken(createdUserEmail);
    const navigate = useNavigate();
    if (token) {
        navigate('/');
    }

    const handleGoogleSignin = () => {
        signInWithGoogle().then(result => {
            console.log(result.user)
            toast.success('Logged in Successfully.')
            navigate(from, { replace: true })
        })
    }

    const imageHostKey = process.env.REACT_APP_imgbb_key;

    const handleSignup = (data) => {
        setSignupError('');

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
                    createUser(data.email, data.password)
                        .then(result => {
                            const user = result.user;
                            console.log(user);

                            const userInfo = {
                                displayName: data.name,
                                photoURL: imageData.data.url,
                            }
                            console.log(userInfo)
                            updateUser(userInfo)
                                .then(() => {
                                    setSignIn(userInfo)
                                    toast.success('Registration Successfully.')
                                    saveUser(user?.displayName, user?.email, data.role);
                                })
                                .catch(error => console.log(error));
                        })
                        .catch(error => {
                            console.log(error)
                            setSignupError(error.message)
                        });
                }
            })
    };

    const saveUser = (displayName, email, role) => {
        const user = { displayName, email, role };
        fetch('http://localhost:5000/users', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(() => {
                setCreatedUserEmail(email);
            })
    }

    const handleToggleShowPassword = () => setShowPassword(!showPassword);



    return (
        <div className='h-[600px] flex justify-center items-center'>
            <div className='max-w-lg p-7'>
                <h2 className='text-center text-2xl mb-0 md:mb-4 font-semibold'>Sign Up</h2>
                <form className='' onSubmit={handleSubmit(handleSignup)}>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
                        <div className='form-control w-full max-w-xs'>
                            <label className='label'><span className='label-text font-semibold'>Username <span className='text-red-500'>*</span></span></label>
                            <input type="text" {...register("name", { required: "Email is required" })} placeholder='Your Full Name' className='rounded-md py-1 px-2 border border-gray-500' />
                            {errors.name && <p className='text-red-600'>{errors.name?.message}</p>}
                        </div>
                        <div className='form-control w-full max-w-xs'>
                            <label className='label'><span className='label-text font-semibold'>Email <span className='text-red-500'>*</span></span></label>
                            <input type="email" {...register("email", { required: "Email is required" })} placeholder='Your Email' className='rounded-md py-1 px-2 border border-gray-500' />
                            {errors.email && <p className='text-red-600'>{errors.email?.message}</p>}
                        </div>
                        <div className="form-control w-full max-w-xs">
                            <label className='label'><span className='label-text font-semibold'>Your Avatar <span className='text-red-500'>*</span></span></label>
                            <input type="file" {...register("image", {
                                required: "Photo is Required"
                            })} className="bg-teal-600 text-white rounded-md border-2 w-full max-w-xs" />
                            {errors.img && <p className='text-red-500'>{errors.img.message}</p>}
                        </div>
                        <div className='relative form-control w-full max-w-xs'>
                            <label className='label'><span className='label-text font-semibold'>Password <span className='text-red-500'>*</span></span></label>
                            <input type={showPassword ? "text" : "password"} {...register("password", { required: "Password is required", minLength: { value: 6, message: 'Password must be minimum 6 characters' } })} placeholder='Password' className='rounded-md py-1 px-2 border border-gray-500' />

                            <button className='absolute bottom-[6.5px] right-1 text-[11px] font-semibold bg-gray-200 px-2 rounded-md border-2 border-teal-600' type="button" onClick={handleToggleShowPassword}>
                                {showPassword ? "Hide" : "Show"}
                            </button>
                        </div>
                    </div>
                    <div className='text-center mt-4'>
                        <div className='flex items-center space-x-3'>
                            <div className="flex-1 h-px sm:w-16 dark:bg-teal-800"></div>
                            <h4 className='label-text-alt font-semibold text-gray-500'>Sign up as a</h4>
                            <div className="flex-1 h-px sm:w-16 dark:bg-teal-800"></div>
                        </div>
                        <div className='my-2'>
                            <select className='select input input-bordered' {...register("role", { required: "Role is required" })}>
                                <option value="buyer">Buyer</option>
                                <option value="seller">Seller</option>
                            </select>
                        </div>
                    </div>
                    {errors.password && <p className='text-red-600'>{errors.password?.message}</p>}
                    {signupError && <p className='text-red-600'>{signupError}</p>}
                    <input type="submit" value='Sign up' className='mt-2 cursor-pointer font-semibold text-white w-full bg-teal-600 hover:bg-teal-700 p-2 rounded-md' />

                    <div className='text-center'>
                        <label className='label-text'>Already have an account? <Link to='/login' className='cursor-pointer font-semibold text-teal-900'>Sign in here</Link></label>
                    </div>
                    <div className='text-center mt-4'>
                        <div className='flex items-center space-x-3'>
                            <div className="flex-1 h-px sm:w-16 dark:bg-teal-800"></div>
                            <h4 className='label-text-alt font-semibold text-gray-500'>or Sign in with</h4>
                            <div className="flex-1 h-px sm:w-16 dark:bg-teal-800"></div>
                        </div>
                        <div className='mt-2 flex justify-center'>
                            <FcGoogle onClick={handleGoogleSignin} className='w-8 h-8 text-gray-700 cursor-pointer bg-gray-300 p-1 rounded-full'></FcGoogle>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Signup;