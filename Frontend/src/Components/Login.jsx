import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import api from '../api/axios';
import { toast } from 'react-toastify';

function Login() {
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleOnChange = (event) => {
        setCredentials({ ...credentials, [event.target.name]: event.target.value });
    };

    const handleLogin = async (event) => {
        event.preventDefault();
        if (!credentials.email || !credentials.password) {
            toast.error("Please enter both email and password.");
            return;
        }
        setLoading(true);
        try {
            const response = await api.post('/auth/user/login', credentials);
            if (response.data && response.data.token) {
                login(response.data.user, response.data.token);
                toast.success(response.data.message || "Login successful!");
                navigate('/user'); // Navigate to user dashboard on successful login
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Login failed. Please try again.";
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-teal-100 flex justify-center items-center p-4">
            <div className="bg-white p-8 shadow-xl rounded-lg max-w-md w-full border border-gray-200">
                <div className="text-center mb-6">
                    <Link to="/" className="inline-block mb-3">
                         <div className="w-20 h-20 mx-auto bg-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-2xl">RW</div>
                    </Link>
                    <h2 className="text-2xl font-semibold text-gray-800 tracking-tight">Welcome Back to ReWear!</h2>
                    <p className="text-sm text-gray-500 mt-1">Log in to your account</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                         <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            Email Address
                         </label>
                         <input
                            id="email"
                            name="email"
                            type="email"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-teal-500"
                            placeholder="Enter your email"
                            value={credentials.email}
                            onChange={handleOnChange}
                            required
                         />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                            Password
                         </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-teal-500"
                            placeholder="Enter your password"
                            value={credentials.password}
                            onChange={handleOnChange}
                            required
                        />
                    </div>
                    
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full flex justify-center items-center bg-emerald-600 text-white p-2.5 rounded-md shadow-sm hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition duration-150 ease-in-out disabled:bg-emerald-300"
                    >
                         {loading ? 'Logging in...' : 'Log In'}
                    </button>
                </form>

                <div className="text-center mt-6 text-sm text-gray-600">
                    <p>New Here?{' '}
                        <Link to="/signup" className="font-medium text-teal-600 hover:text-teal-800 hover:underline">
                             Create an Account
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Login;