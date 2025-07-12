import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { toast } from 'react-toastify';
import useAuth from '../hooks/useAuth';
import { Shield } from 'lucide-react';

const AdminLoginPage = () => {
    const [credentials, setCredentials] = React.useState({ email: '', password: '' });
    const [loading, setLoading] = React.useState(false);
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
            const response = await api.post('/auth/admin/login', credentials);
            if (response.data.success) {
                // The login function in AuthContext will handle setting state
                login(response.data.data.user);
                toast.success(response.data.message || "Admin login successful!");
                navigate('/admin'); // Navigate to admin dashboard
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Login failed. Please try again.";
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-700 via-gray-900 to-black flex justify-center items-center p-4">
            <div className="bg-white p-8 shadow-2xl rounded-lg max-w-md w-full border border-gray-600">
                <div className="text-center mb-6">
                    <Link to="/" className="inline-block mb-4">
                        <div className="w-20 h-20 mx-auto bg-gray-800 rounded-full flex items-center justify-center text-white">
                           <Shield size={40} />
                        </div>
                    </Link>
                    <h2 className="text-2xl font-semibold text-gray-800 tracking-tight">Admin Control Panel</h2>
                    <p className="text-sm text-gray-500 mt-1">Authorized access only</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                         <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            Admin Email
                         </label>
                         <input
                            id="email"
                            name="email"
                            type="email"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-500"
                            placeholder="Enter your admin email"
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
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-500"
                            placeholder="Enter your password"
                            value={credentials.password}
                            onChange={handleOnChange}
                            required
                        />
                    </div>
                    
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full flex justify-center items-center bg-gray-800 text-white p-2.5 rounded-md shadow-sm hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:bg-gray-400"
                    >
                         {loading ? 'Authenticating...' : 'Secure Login'}
                    </button>
                </form>

                <div className="text-center mt-6 text-sm text-gray-600">
                    <p>This is a restricted area. Return to{' '}
                        <Link to="/" className="font-medium text-emerald-600 hover:underline">
                             Homepage
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AdminLoginPage;