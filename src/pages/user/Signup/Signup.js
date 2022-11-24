import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FcGoogle } from "react-icons/fc";
import { Link } from 'react-router-dom';

const Signup = () => {
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false)
    const handleToggleShowPassword = () => setShowPassword(!showPassword)
    const [signupError, setSignupError] = useState('')
    const handleSignup = async (data) => {
        setLoading(true);
        setTimeout(() => {
            alert(JSON.stringify(data));
            setLoading(false);
        }, 500);
    };
    const { register, formState: { errors }, handleSubmit } = useForm();
    return (
        <div className='h-[600px] flex justify-center items-center'>
            <div className='w-80 p-7'>
                <h2 className='text-center text-2xl font-semibold'>Sign Up</h2>
                <form onSubmit={handleSubmit(handleSignup)}>
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
                    {errors.password && <p className='text-red-600'>{errors.password?.message}</p>}
                    <input loading={loading} type="submit" value='Sign up' className='mt-6 cursor-pointer font-semibold text-white w-full max-w-xs bg-teal-600 hover:bg-teal-700 p-2 rounded-md' />
                    {signupError && <p className='text-red-600'>{signupError}</p>}
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
                            <FcGoogle className='w-8 h-8 text-gray-700 cursor-pointer bg-gray-300 p-1 rounded-full'></FcGoogle>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Signup;