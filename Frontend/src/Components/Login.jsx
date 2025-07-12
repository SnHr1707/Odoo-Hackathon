import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
    // State for form data
    const [credentials, setCredentials] = useState({ emailorusername: "", password: "" });
    const navigate = useNavigate();

    // Handle input changes
    const handleOnChange = (event) => {
        setCredentials({ ...credentials, [event.target.name]: event.target.value });
    };

    // Handle form submission (frontend only - logs to console)
    const handleLogin = (event) => {
        event.preventDefault();
        console.log("Frontend Login Submit Attempt:", credentials);
        // Simulate navigation after successful login (remove in real app with backend)
        // navigate('/profile/placeholderUser');
    };

    // Render login form
    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-teal-100 flex justify-center items-center p-4"> {/* Updated gradient */}
            <div className="bg-white p-8 shadow-xl rounded-lg max-w-md w-full border border-gray-200">
                <div className="text-center mb-6">
                    <Link to="/" className="inline-block mb-3">
                        {/* Assuming 'logo' is imported or defined elsewhere. Uncomment the line below if logo is imported */}
                        {/* <img src={logo} alt='ReWear Logo' className="w-20 h-20 mx-auto transition-transform duration-300 hover:scale-110" /> */}
                        {/* Placeholder for logo - Updated text */}
                        <div className="w-20 h-20 mx-auto bg-gray-300 rounded-full flex items-center justify-center text-gray-600">ReWear Logo</div>
                    </Link>
                    {/* Heading updated */}
                    <h2 className="text-2xl font-semibold text-gray-800 tracking-tight">Welcome Back to ReWear!</h2>
                    {/* Paragraph updated */}
                    <p className="text-sm text-gray-500 mt-1">Log in to your account</p>
                </div>

                {/* Message Display Placeholder */}
                {/* {message.text && (...) } */}

                <form onSubmit={handleLogin} className="space-y-4">
                    {/* Email or Username Input - Focus color updated */}
                    <div>
                         <label htmlFor="emailorusername" className="block text-sm font-medium text-gray-700 mb-1">
                            Email or Username
                         </label>
                         <input
                            id="emailorusername"
                            name="emailorusername"
                            type="text"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-teal-500 focus:border-teal-500 transition duration-150" // Updated focus color
                            placeholder="Enter Email or Username"
                            value={credentials.emailorusername}
                            onChange={handleOnChange}
                            required
                            aria-label="Email or Username"
                         />
                    </div>

                    {/* Password Input - Focus color updated */}
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                            Password
                         </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-teal-500 focus:border-teal-500 transition duration-150" // Updated focus color
                            placeholder="Enter your password"
                            value={credentials.password}
                            onChange={handleOnChange}
                            required
                            aria-label="Password"
                        />
                    </div>

                    {/* Remember Me & Forgot Password - Link color updated */}
                    <div className="flex justify-between items-center text-sm">
                        <label className="flex items-center text-gray-600 cursor-pointer">
                            {/* Checkbox focus color updated */}
                            <input type="checkbox" className="mr-2 h-4 w-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500" /> {/* Updated color and focus ring */}
                            Remember me
                        </label>
                        <Link to="/forgot-password" className="font-medium text-teal-600 hover:text-teal-800 hover:underline"> {/* Updated color */}
                            Forgot password?
                        </Link>
                    </div>

                    {/* Login Button - Color and focus ring updated */}
                    <button
                        type="submit"
                        className="w-full flex justify-center items-center bg-emerald-600 text-white p-2.5 rounded-md shadow-sm hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition duration-150 ease-in-out"
                    >
                         Log In
                    </button>
                </form>

                {/* Sign Up Link - Branding updated, color updated */}
                <div className="text-center mt-6 text-sm text-gray-600">
                    <p>New Here?{' '}
                        <Link to="/signup" className="font-medium text-teal-600 hover:text-teal-800 hover:underline"> {/* Updated color */}
                             Create an Account
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Login;