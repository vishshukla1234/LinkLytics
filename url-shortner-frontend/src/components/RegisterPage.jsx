import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import TextField from './TextField';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/api';
import toast from 'react-hot-toast';

const RegisterPage = () => {
    const navigate = useNavigate();

    const [loader, setLoader] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm({
        defaultValues: {
            username: "",
            email: "",
            password: "",
        },
        mode: "onTouched",
    });

    const registerHandler = async (data) => {
        setLoader(true);

        try {
            const {data: response } = await api.post(
                "/api/auth/public/register",
                data
            );
            reset();
            navigate("/login");
            toast.success("Registration Successfull!")
        } catch (error) {
            console.log(error);
            toast.error("Registration Failed!")
        } finally {
            setLoader(false);
        }
    }

    return (
        <div className='min-h-[calc(100vh-64px)] bg-slate-50 flex flex-col justify-center gap-5 items-center py-10 px-4 font-roboto'>
            {/* Netlify/Render cold start note */}
            <div className='w-full sm:w-[450px] bg-orange-50 border border-orange-100 text-orange-800 text-xs sm:text-sm rounded-xl px-5 py-3 text-center leading-relaxed shadow-sm'>
                <strong>Note:</strong> Since this project is hosted on free tier plans (Netlify & Render), it may take a few seconds for the backend services to spin up on your first request. Thank you for your patience!
            </div>
            
            <form
                onSubmit={handleSubmit(registerHandler)}
                className='w-full sm:w-[450px] bg-white border border-slate-100 shadow-xl py-10 sm:px-10 px-6 rounded-2xl'
            >
                <h1 className='text-center font-montserrat font-black text-primary-navy lg:text-3xl text-2xl tracking-tight'>
                    Create Account
                </h1>

                <hr className='mt-3 mb-6 text-slate-100'/>

                <div className='flex flex-col gap-4'>
                    <TextField
                        label="Username"
                        required
                        id="username"
                        type="text"
                        message="Username is required"
                        placeholder="Enter your username"
                        register={register}
                        errors={errors}
                    />
                    <TextField
                        label="Email"
                        required
                        id="email"
                        type="email"
                        message="Email is required"
                        placeholder="Enter your email"
                        register={register}
                        errors={errors}
                    />
                    <TextField
                        label="Password"
                        required
                        id="password"
                        type="password"
                        message="Password is required"
                        placeholder="Enter your password"
                        register={register}
                        errors={errors}
                        min={6}
                    />
                </div>

                <button 
                    disabled={loader}
                    type='submit'
                    className='custom-btn w-full font-bold text-white bg-accent-orange hover:bg-accent-orange-hover py-3 rounded-xl transition duration-200 mt-6 shadow-md shadow-orange-100'
                >
                    {loader ? "Creating account..." : "Sign Up"}
                </button>

                <p className='text-center text-sm text-slate-600 mt-6'>
                    Already have an account?{" "}
                    <Link className='font-bold hover:underline' to="/login">
                        <span className='text-accent-orange'>Log In</span>
                    </Link>
                </p>
            </form>
        </div>
    )
}

export default RegisterPage