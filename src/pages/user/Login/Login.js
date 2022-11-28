import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FcGoogle } from "react-icons/fc";
import { AuthContext } from '../../../context/AuthProvider';
import useToken from '../../../hook/useToken';
import toast from 'react-hot-toast';
import useTitle from '../../../hook/useTitle';

const Login = () => {
    useTitle('Login');
    const [showPassword, setShowPassword] = useState(false)
    const handleToggleShowPassword = () => setShowPassword(!showPassword)
    const [loginUserEmail, setLoginUserEmail] = useState('')
    const [loginError, setLoginError] = useState('')
    const { signInUser, signInWithGoogle, setSignIn } = useContext(AuthContext);

    const [token] = useToken(loginUserEmail);
    const location = useLocation();
    const navigate = useNavigate();

    const from = location.state?.from?.pathname || '/';
    if (token) {
        navigate(from, { replace: true });
    }

    const handleGoogleSignin = () => {
        signInWithGoogle().then(result => {
            const user = result.user;
            const speciality = {
                role: 'buyer'
            }
            toast.success('Logged in Successfully.');
            saveUser(user?.displayName, user?.email, speciality.role);
            navigate(from, { replace: true })
        })
    }

    const handleLogin = async (data) => {
        console.log(data);
        setLoginError('');
        signInUser(data.email, data.password)
            .then(result => {
                const user = result.user;
                toast.success('Logged in successfully.');
                setSignIn(user);
                setLoginUserEmail(data.email);
            })
            .catch(error => {
                console.log(error.message)
                setLoginError(error.message);
            });
    };

    const saveUser = (displayName, email, role) => {
        const user = { displayName, email, role };
        fetch('https://recycle-zone-server.vercel.app/users', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(() => {
                setLoginUserEmail(email);
            })
    }

    const { register, formState: { errors }, handleSubmit } = useForm();
    return (
        <div className='h-[600px] flex justify-center items-center'>
            <div className='w-80 p-7'>
                <h2 className='text-center text-2xl font-semibold'>Login</h2>
                <form onSubmit={handleSubmit(handleLogin)}>
                    <div className='form-control w-full max-w-xs'>
                        <label className='label'><span className='label-text font-semibold'>Email <span className='text-red-500'>*</span></span></label>
                        <input type="email" {...register("email", { required: "Email is required" })} placeholder='Your email' className='rounded-md py-1 px-2 border border-gray-500' />
                        {errors.email && <p className='text-red-600'>{errors.email?.message}</p>}
                    </div>
                    <div className='relative form-control w-full max-w-xs'>
                        <label className='label'><span className='label-text font-semibold'>Password <span className='text-red-500'>*</span></span></label>
                        <input type={showPassword ? "text" : "password"} {...register("password", { required: "Password is required", minLength: { value: 6, message: 'Password must be minimum 6 characters' } })} placeholder='Password' className='rounded-md py-1 px-2 border border-gray-500' />

                        <button className='absolute bottom-[6.5px] right-1 text-[11px] font-semibold bg-gray-200 px-2 rounded-md border-2 border-teal-600' type="button" onClick={handleToggleShowPassword}>
                            {showPassword ? "Hide" : "Show"}
                        </button>

                    </div>
                    <label className='label-text cursor-pointer underline underline-offset-1'>Forget Password?</label>
                    {errors.password && <p className='text-red-600'>{errors.password?.message}</p>}
                    <input type="submit" value='Login' className='mt-6 cursor-pointer font-semibold text-white w-full max-w-xs bg-teal-600 hover:bg-teal-700 p-2 rounded-md' />
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
                            <FcGoogle onClick={handleGoogleSignin} className='w-8 h-8 text-gray-700 cursor-pointer bg-gray-300 p-1 rounded-full'></FcGoogle>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;