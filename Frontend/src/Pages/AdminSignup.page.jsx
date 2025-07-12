// src/Pages/AdminSignup.page.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { toast } from 'react-toastify';
import { Shield } from 'lucide-react';

const AdminSignupPage = () => {
    const [formData, setFormData] = useState({ username: '', email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleOnChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    const handleSignup = async (event) => {
        event.preventDefault();
        if (!formData.username || !formData.email || !formData.password) {
            toast.error("All fields are required.");
            return;
        }
        setLoading(true);
        try {
            const response = await api.post('/auth/admin/signup', formData);
            if (response.data.success) {
                toast.success("Registration successful! Your account is pending approval from an administrator.");
                navigate('/admin/login');
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Registration failed. Please try again.";
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-700 via-gray-900 to-black flex justify-center items-center p-4">
            <div className="bg-white p-8 shadow-2xl rounded-lg max-w-md w-full border border-gray-600">
                <div className="text-center mb-6">
                    <div className="w-20 h-20 mx-auto bg-gray-800 rounded-full flex items-center justify-center text-white mb-4">
                        <Shield size={40} />
                    </div>
                    <h2 className="text-2xl font-semibold text-gray-800 tracking-tight">Admin Registration</h2>
                    <p className="text-sm text-gray-500 mt-1">Request for privileged access</p>
                </div>

                <form onSubmit={handleSignup} className="space-y-4">
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                        <input id="username" name="username" type="text" onChange={handleOnChange} value={formData.username} required className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-500" />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Admin Email</label>
                        <input id="email" name="email" type="email" onChange={handleOnChange} value={formData.email} required className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-500" />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <input id="password" name="password" type="password" onChange={handleOnChange} value={formData.password} required className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-500" />
                    </div>
                    <button type="submit" disabled={loading} className="w-full flex justify-center items-center bg-gray-800 text-white p-2.5 rounded-md shadow-sm hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:bg-gray-400">
                        {loading ? 'Submitting...' : 'Request Access'}
                    </button>
                </form>

                <div className="text-center mt-6 text-sm text-gray-600">
                    <p>Already have an account?{' '}
                        <Link to="/admin/login" className="font-medium text-emerald-600 hover:underline">
                            Login Here
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AdminSignupPage;