import React, {  useContext, useState } from 'react';
import { Link, useLocation, useNavigate,  } from 'react-router';
import { FaEye } from "react-icons/fa";
import { FcGoogle } from 'react-icons/fc';
import { IoEyeOff } from 'react-icons/io5';
import { toast } from 'react-toastify';
import { AuthContext } from '../../Context/AuthProvider';

const Login = () => {
    const { signInUser, googleSignIn, setUser } = useContext(AuthContext)
    const [show, setShow] = useState(false)
    const [error, setError] = useState('')

    const location = useLocation()
    const navigate = useNavigate()

    const handleLogin = e => {
        e.preventDefault()
        setError('');
        const email = e.target.email.value
        const password = e.target.password.value

        if (!email) {
            return setError('Please enter your email address.')
        }
        if (!password) {
            return setError('Please enter your password.')
        }

        signInUser(email, password)
            .then(result => {
                setError('')
                toast.success('Logged in successfully!')
                navigate(location.state?.from || '/')
            })
            .catch(error => {
                if (error.code === 'auth/invalid-credential') {
                    setError('Email or password did not match! Please try again.')
                } 
                else if (error.code === 'auth/invalid-email') {
                    setError('Please enter a valid email address.')
                }
                else if (error.code === 'auth/user-not-found') {
                    setError('No account found with this email.')
                }
                else {
                    setError('Something went wrong. Please try again later.')
                }
            });
    }

    const handleGoogleSignIn = () => {
        googleSignIn()
            .then(result => {
                setUser(result.user)
                toast.success('Logged in with Google successfully!');
                navigate(location.state?.from || '/')
            })
            .catch(error => {
                toast.error(error.message);
            })
    }

    return (
        <div className="flex justify-center items-center min-h-screen  bg-gray-100">
            <div className="w-[88%] md:w-[40%] pb-3 rounded-[0.7rem] bg-white overflow-hidden shadow">
                <h2 className="text-3xl font-bold text-center pt-6"> Login to <span className="text-gradient">GreenNest</span></h2>
                <div className="card-body">
                    <form onSubmit={ handleLogin }>
                        <fieldset className="fieldset">
                            <label className="label">Email address</label>
                            <input name="email"  type="email" className="input w-full" placeholder="Enter your email address"  />

                            <div className="relative">
                                <label className="label mb-[0.38rem] mt-2">Password</label>
                                <input name="password" type={ show ? "text" : "password" } className="input w-full" placeholder="Enter your password" />
                                <span onClick={()=> setShow(!show) } className="absolute text-[1rem] right-4 top-[2.77rem] cursor-pointer z-50 " > { show ? <FaEye/> : <IoEyeOff/> }  </span>
                            </div>

                            { error && <p className='text-red-500 text-[0.8rem]'> {error} </p> }

                            <div className="flex justify-end text-sm">  <Link to="/auth/forgot-password" className="text-gradient hover:underline" > {" "} Forgot Password?</Link></div>

                            <button type="submit" className="btn btn-primary" >  Login </button>
                        </fieldset>
                    </form>
                    <p className="text-gray-500 text-center"> Don’t have an account?{" "} <Link to="/register" className="text-gradient font-medium  link link-hover " > Sign Up </Link></p>

                    <div className="flex items-center gap-3 ">
                        <hr className="flex-1 border-gray-200" />
                        <span className="text-gray-400 text-sm">or</span>
                        <hr className="flex-1 border-gray-200" />
                    </div>

                    <button onClick={handleGoogleSignIn} className="btn w-full hover:bg-green-50 bg-white text-black rounded-md border border-[#e5e5e5] flex items-center justify-center gap-2"> <FcGoogle size={18}/>Login with Google</button>
                </div>
            </div>
        </div>
    );
};

export default Login;

// text-green-700  font-medium hover:link