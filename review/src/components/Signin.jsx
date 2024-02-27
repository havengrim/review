import React, { useState } from 'react';
import { hero } from "../assets";
import { Button } from './ui/button';
import { Link, useNavigate } from 'react-router-dom'; 
import { Input } from './ui/input';

const Signin = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const login = () => {
        if(username == 'admin@admin.com' && password == 'password321') {
            navigate('/dashboard', { state : {
                isloggedIn : true
            }});
        } else {
            alert('Invalid Credentials! Please try again');
        }
    }

    return (
        <section className="bg-gray-100 dark:bg-gray-900">
            <div className="container flex items-center justify-center min-h-screen px-6 mx-auto">
                <form className="w-full max-w-md">
                    <div className='flex justify-center flex-col items-center w-full'>
                        <img className="w-[80px] h-16" src={hero} alt="" />

                        <h1 className="mt-3 text-2xl font-semibold text-gray-800 capitalize sm:text-3xl dark:text-white">Sign In</h1>
                    </div>

                    <div className="relative flex items-center mt-8">
                        <span className="absolute">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                        </span>

                        <Input type="name" 
                                className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" 
                                placeholder="Userame"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}  
                        />
                    </div>

                    <div className="relative flex items-center mt-4">
                        <span className="absolute">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                        </span>

                        <Input type="password"  
                                className="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" 
                                placeholder="Password" 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}  
                                />
                    </div>

                    <div className="mt-6">
                        {/* <Link to='/dashboard'> */}
                            <Button onClick={login} className=' bg-blue-500 w-full'>Sign in</Button>
                        {/* </Link> */}
                    </div>
                </form>
            </div>
        </section>
    );
}

export default Signin;
