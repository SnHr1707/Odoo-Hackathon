import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Signup() {
    // State for form data
    const [formData, setFormData] = useState({
        fullname: "",
        username: "",
        email: "",
        password: "",
        confirmpassword: "",
        verificationCode: "",
    });

    const navigate = useNavigate();

    // --- Handlers (Frontend Only) ---

    // Update form data state on input change
    const handleOnChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevData => ({ ...prevData, [name]: value }));
    };

    // Handle sending the verification code (frontend only - logs to console)
    const handleSendCode = () => {
        console.log("Frontend Send Code Attempt for email:", formData.email);
        // This would typically trigger an API call to send an email
    };

    // Handle the main signup submission (frontend only - logs to console)
    const handleSignup = (event) => {
        event.preventDefault();

        // --- Frontend Validation ---
        const { fullname, username, email, password, confirmpassword, verificationCode } = formData;
        if (!fullname || !username || !email || !password || !confirmpassword || !verificationCode) {
            console.log('Signup Error: All fields are required.');
            // Display error message here
            return;
        }
        if (password !== confirmpassword) {
            console.log('Signup Error: Passwords do not match.');
            // Display error message here
            return;
        }
        const usernameRegex = /^[a-zA-Z0-9_]{3,}$/;
        if (!usernameRegex.test(username)) {
            console.log('Signup Error: Username must be at least 3 characters and contain only letters, numbers, or underscore (_).');
            // Display error message here
            return;
        }
         const emailRegex = /\S+@\S+\.\S+/;
         if (!emailRegex.test(email)) {
             console.log('Signup Error: Please enter a valid email address.');
             // Display error message here
             return;
         }
        if (password.length < 6) {
             console.log('Signup Error: Password must be at least 6 characters long.');
             // Display error message here
             return;
        }
        if (verificationCode.length !== 6) {
             console.log('Signup Error: Verification code must be 6 characters.');
             // Display error message here
             return;
        }

        // If frontend validation passes, log data (in a real app, make API call)
        console.log("Frontend Signup Submit Attempt:", formData);
        // On successful API response, you would navigate, e.g.:
        // navigate('/profile/newUser');
    };

    // --- Render ---
    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-teal-100 flex justify-center items-center p-4"> {/* Updated gradient */}
            <div className="bg-white p-8 shadow-xl rounded-lg max-w-lg w-full border border-gray-200"> {/* Increased max-width */}
                <div className="text-center mb-6">
                    <Link to="/" className="inline-block mb-3">
                         {/* Assuming 'logo' is imported or defined elsewhere. Uncomment the line below if logo is imported */}
                         {/* <img src={logo} alt='ReWear Logo' className="w-20 h-20 mx-auto transition-transform duration-300 hover:scale-110" /> */}
                         {/* Placeholder for logo - Updated text */}
                         <div className="w-20 h-20 mx-auto bg-gray-300 rounded-full flex items-center justify-center text-gray-600">ReWear Logo</div>
                    </Link>
                    {/* Heading updated */}
                    <h2 className="text-2xl font-semibold text-gray-800 tracking-tight">Join ReWear Today!</h2>
                    {/* Paragraph updated */}
                    <p className="text-sm text-gray-500 mt-1">Create your account to start exchanging clothes</p>
                </div>

                {/* Message Display Placeholder (Remove comments and implement state if needed for frontend validation messages) */}
                {/* {message.text && (...) } */}

                <form onSubmit={handleSignup} className="space-y-4">
                    {/* Input Row 1: Full Name & Username */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="fullname" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                            <input id="fullname" name="fullname" type="text" required
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-teal-500 focus:border-teal-500 transition duration-150" // Updated focus color
                                placeholder="Your full name" value={formData.fullname} onChange={handleOnChange} />
                        </div>
                        <div>
                            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                            <input id="username" name="username" type="text" required pattern="^[a-zA-Z0-9_]{3,}$"
                                title="Min 3 chars, letters, numbers, underscore only"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-teal-500 focus:border-teal-500 transition duration-150" // Updated focus color
                                placeholder="Choose a username" value={formData.username} onChange={handleOnChange} />
                             <p className="mt-1 text-xs text-gray-500">Letters, numbers, underscore only (min 3).</p>
                        </div>
                    </div>

                    {/* Input Row 2: Email & Send Code */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                        <div className="flex items-stretch space-x-2">
                            <input id="email" name="email" type="email" required
                                className="flex-grow w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-teal-500 focus:border-teal-500 transition duration-150" // Updated focus color
                                placeholder="you@example.com" value={formData.email} onChange={handleOnChange} />
                            {/* Button color updated */}
                            <button type="button" onClick={handleSendCode}
                                className={`flex-shrink-0 inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-teal-600 hover:bg-teal-700 focus:ring-teal-500 focus:outline-none focus:ring-2 focus:ring-offset-2 transition duration-150 ease-in-out`}> {/* Updated color and focus ring */}
                                Send Code
                            </button>
                        </div>
                    </div>

                    {/* Input Row 3: Verification Code */}
                    <div>
                        <label htmlFor="verificationCode" className="block text-sm font-medium text-gray-700 mb-1">Verification Code</label>
                        <input id="verificationCode" name="verificationCode" type="text" required maxLength={6}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-teal-500 focus:border-teal-500 transition duration-150" // Updated focus color
                            placeholder="Enter 6-digit code" value={formData.verificationCode} onChange={handleOnChange} />
                         <p className="mt-1 text-xs text-gray-500">Enter the 6-digit code sent to your email.</p>
                    </div>


                    {/* Input Row 4: Password & Confirm Password */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                            <input id="password" name="password" type="password" required minLength={6}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-teal-500 focus:border-teal-500 transition duration-150" // Updated focus color
                                placeholder="Create a password" value={formData.password} onChange={handleOnChange} />
                                <p className="mt-1 text-xs text-gray-500">Min 6 characters.</p>
                        </div>
                        <div>
                            <label htmlFor="confirmpassword" className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                            <input id="confirmpassword" name="confirmpassword" type="password" required
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-teal-500 focus:border-teal-500 transition duration-150" // Updated focus color
                                placeholder="Confirm your password" value={formData.confirmpassword} onChange={handleOnChange} />
                        </div>
                    </div>

                    {/* Signup Button - Color and focus ring updated */}
                    <button type="submit"
                        className="w-full flex justify-center items-center bg-emerald-600 text-white p-2.5 rounded-md shadow-sm hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition duration-150 ease-in-out"> {/* Updated color and focus ring */}
                        Sign Up
                    </button>
                </form>

                {/* Login Link - Branding updated, color updated */}
                <div className="text-center mt-6 text-sm text-gray-600">
                    <p>Already have an account?{' '}
                        <Link to="/login" className="font-medium text-teal-600 hover:text-teal-800 hover:underline"> {/* Updated color */}
                            Log In
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Signup;