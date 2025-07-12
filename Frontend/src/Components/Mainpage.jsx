import { Link } from 'react-router-dom';
import React from "react";
// Assuming 'page1' is an image file you have imported
// import page1 from './path/to/your/image.jpg'; // <-- You need to uncomment and set the correct path for your image

function Mainpage() {
    // Placeholder for page1 import if not defined elsewhere
    // Consider replacing this with an image relevant to clothing exchange
    const page1 = 'https://via.placeholder.com/1024x768'; // Replace with a placeholder or your actual image import

    return (
        <div className="h-full flex flex-col">
            {/* <Navbar /> {/* Navbar is included in App.jsx layout */}
            <div className="flex-1 flex md:flex-row flex-col items-center md:items-stretch"> {/* Responsive flex direction and alignment */}
                {/* Left Section (Image) - Now placed first in code for visual order */}
                <div className="flex-[2] relative"> {/* Image section takes 2/3 space on larger screens */}
                    {/* Added checks for mobile/desktop images based on your original logic */}
                    <img
                        src={page1} // Replace with your image URL
                        alt="People exchanging clothes" // Updated alt text
                        className="h-full w-full object-cover md:block hidden" // Hidden on mobile, block on desktop
                    />
                    <img
                        src={page1} // Replace with your image URL
                        alt="Clothing community" // Updated alt text
                        className="w-full h-fit object-cover block md:hidden" // Block on mobile, hidden on desktop
                    />
                </div>

                {/* Right Section (Login/Signup Form) - Now placed second in code for visual order */}
                <div className="flex-[1] flex flex-col justify-center items-start md:items-start px-6 md:px-20 py-10 md:py-0 text-center md:text-left"> {/* Text section takes 1/3 space on larger screens */}
                    {/* Welcome Text - Updated */}
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 text-center">
                        Exchange Clothes, Connect Sustainably
                    </h1>

                    {/* Login Button - Color updated */}
                    <Link to="/login" className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded-full w-full mb-3 shadow-sm text-center">
                        Login
                    </Link>

                    {/* Sign up Button - Color updated */}
                    <Link to="/signup" className="bg-white hover:bg-gray-100 border border-gray-300 rounded-full py-2 px-4 w-full mb-4 flex items-center justify-center shadow-sm text-center">
                        Sign up with Email
                    </Link>

                    {/* Agreement Text - Branding updated, color updated */}
                    <p className="text-xs text-gray-600 text-left">
                        By clicking Continue to join or sign in, you agree to ReWear's{" "}
                        <a href="#" className="text-teal-600 hover:underline">User Agreement</a>,{" "}
                        <a href="#" className="text-teal-600 hover:underline">Privacy Policy</a>, and{" "}
                        <a href="#" className="text-teal-600 hover:underline">Cookie Policy</a>.
                    </p>

                    {/* New to ReWear? Join now Link - Branding updated, color updated */}
                    <p className="mt-4 text-left">
                        New to ReWear?{" "}
                        <Link to="/signup" className="text-teal-600 font-medium">Join now</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Mainpage;