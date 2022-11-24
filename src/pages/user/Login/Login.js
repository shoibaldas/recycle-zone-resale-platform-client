import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { FcGoogle } from "react-icons/fc";

const Login = () => {
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false)
    const handleToggleShowPassword = () => setShowPassword(!showPassword)
    const [loginError, setLoginError] = useState('')
    const handleLogin = async (data) => {
        setLoading(true);
        setTimeout(() => {
            alert(JSON.stringify(data));
            setLoading(false);
        }, 500);
    };

    const { register, formState: { errors }, handleSubmit } = useForm();
    return (
        // <div className="w-full max-w-xs p-8 space-x-4">
        //     <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        //         <div className='form-control' invalid={Boolean(errors.username)}>
        //             <label className='label'>
        //                 Username
        //             </label>
        //             <input {...register("username", { required: true })} placeholder="Enter your username." />
        //             {errors.username && errors.username.type === "required" && <p className='text-red-600'>Username is required</p>}
        //         </div>

        //         <div className='form-control' invalid={Boolean(errors.password)}>
        //             <label className='label'>
        //                 Password
        //             </label>
        //             <div>
        //                 <input
        //                     className="pr-16"
        //                     type={showPassword ? "text" : "password"}
        //                     placeholder="Enter password"
        //                     {...register("password", { required: true })}
        //                 />
        //                 <input className="w-16">
        //                     <button type="button" size="xs" variant="solid" onClick={handleToggleShowPassword}>
        //                         {showPassword ? "Hide" : "Show"}
        //                     </button>
        //                 </input>
        //             </div>
        //             {errors.password && errors.password.type === "required" && <p className='text-red-600'>Password is required</p>}
        //         </div>


        //         <button type="submit" variant="solid" color="primary" loading={loading}>Submit</button>
        //     </form>
        // </div>
        <div className='h-[600px] flex justify-center items-center'>
            <div className='w-80 p-7'>
                <h2 className='text-center text-2xl font-semibold'>Login</h2>
                <form onSubmit={handleSubmit(handleLogin)}>
                    <div className='form-control w-full max-w-xs'>
                        <label className='label'><span className='label-text font-semibold'>Username <span className='text-red-500'>*</span></span></label>
                        <input type="email" {...register("email", { required: "Email is required" })} className='rounded-md py-1 px-2 border border-gray-500' />
                        {errors.email && <p className='text-red-600'>{errors.email?.message}</p>}
                    </div>
                    <div className='relative form-control w-full max-w-xs'>
                        <label className='label'><span className='label-text font-semibold'>Password <span className='text-red-500'>*</span></span></label>
                        <input type={showPassword ? "text" : "password"} {...register("password", { required: "Password is required", minLength: { value: 6, message: 'Password must be minimum 6 characters' } })} className='rounded-md py-1 px-2 border border-gray-500' />

                        <button className='absolute bottom-1 right-1 text-sm font-semibold bg-gray-200 px-2 rounded-md border-2 border-teal-600' type="button" onClick={handleToggleShowPassword}>
                            {showPassword ? "Hide" : "Show"}
                        </button>

                    </div>
                    <label className='label-text cursor-pointer underline underline-offset-1'>Forget Password?</label>
                    {errors.password && <p className='text-red-600'>{errors.password?.message}</p>}
                    <input loading={loading} type="submit" value='Login' className='mt-6 cursor-pointer font-semibold text-white w-full max-w-xs bg-teal-600 hover:bg-teal-700 p-2 rounded-md' />
                    {loginError && <p className='text-red-600'>{loginError}</p>}
                    <div className='text-center'>
                        <label className='label-text'>Don't have an account? <Link to='/signup' className='cursor-pointer font-semibold text-teal-900'>Create Account</Link></label>
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

export default Login;