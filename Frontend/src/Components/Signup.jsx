import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { toast } from 'react-toastify';
import useAuth from '../hooks/useAuth';

function Signup() {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmpassword: "",
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleOnChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    const handleSignup = async (event) => {
        event.preventDefault();
        const { username, email, password, confirmpassword } = formData;
        
        if (!username || !email || !password || !confirmpassword) {
            toast.error('All fields are required.');
            return;
        }
        if (password !== confirmpassword) {
            toast.error('Passwords do not match.');
            return;
        }
        if (password.length < 6) {
             toast.error('Password must be at least 6 characters long.');
             return;
        }
        
        setLoading(true);
        try {
            const response = await api.post('/auth/user/signup', { username, email, password });
            if (response.data && response.data.token) {
                login(response.data.user, response.data.token);
                toast.success(response.data.message || "Signup successful!");
                navigate('/user'); // Navigate to dashboard on success
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Signup failed. Please try again.";
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-teal-100 flex justify-center items-center p-4">
            <div className="bg-white p-8 shadow-xl rounded-lg max-w-lg w-full border border-gray-200">
                <div className="text-center mb-6">
                     <Link to="/" className="inline-block mb-3">
                         <div className="w-20 h-20 mx-auto bg-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-2xl">RW</div>
                    </Link>
                    <h2 className="text-2xl font-semibold text-gray-800 tracking-tight">Join ReWear Today!</h2>
                    <p className="text-sm text-gray-500 mt-1">Create your account to start exchanging clothes</p>
                </div>

                <form onSubmit={handleSignup} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                         <div>
                            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                            <input id="username" name="username" type="text" required
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-teal-500"
                                placeholder="Choose a username" value={formData.username} onChange={handleOnChange} />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                            <input id="email" name="email" type="email" required
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-teal-500"
                                placeholder="you@example.com" value={formData.email} onChange={handleOnChange} />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                            <input id="password" name="password" type="password" required
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-teal-500"
                                placeholder="Create a password (min 6 chars)" value={formData.password} onChange={handleOnChange} />
                        </div>
                        <div>
                            <label htmlFor="confirmpassword" className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                            <input id="confirmpassword" name="confirmpassword" type="password" required
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-teal-500"
                                placeholder="Confirm your password" value={formData.confirmpassword} onChange={handleOnChange} />
                        </div>
                    </div>

                    <button type="submit"
                        disabled={loading}
                        className="w-full flex justify-center items-center bg-emerald-600 text-white p-2.5 rounded-md shadow-sm hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:bg-emerald-300">
                        {loading ? 'Signing up...' : 'Sign Up'}
                    </button>
                </form>

                <div className="text-center mt-6 text-sm text-gray-600">
                    <p>Already have an account?{' '}
                        <Link to="/login" className="font-medium text-teal-600 hover:text-teal-800 hover:underline">
                            Log In
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Signup;