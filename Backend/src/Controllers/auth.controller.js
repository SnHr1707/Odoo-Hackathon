import { User } from '../models/user.model.js';
import { Admin } from '../models/admin.model.js';
import { BlacklistedToken } from '../models/blacklistedToken.model.js';
import { Transaction } from '../models/transaction.model.js';
import { asyncHandler } from '../Utils/asyncHandler.js';
import { ApiError } from '../Utils/ApiError.js';
import { ApiResponse } from '../Utils/ApiResponse.js';
import jwt from 'jsonwebtoken';

const generateTokenAndSetCookie = (res, userId, role) => {
    const token = jwt.sign({ id: userId, role }, process.env.JWT_SECRET, { expiresIn: '24h' });

    res.cookie('token', token, {
        httpOnly: true, // Prevents client-side JS from accessing the cookie
        secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
        sameSite: 'strict', // Mitigates CSRF attacks
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
    });

    return token;
};

const isNewDay = (lastLogin) => {
    if (!lastLogin) return true;
    const lastLoginDate = new Date(lastLogin);
    const currentDate = new Date();
    return lastLoginDate.setHours(0, 0, 0, 0) < currentDate.setHours(0, 0, 0, 0);
};

// USER AUTH
export const signupUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    if ([username, email, password].some((field) => !field || field.trim() === "")) {
        throw new ApiError(400, "All fields are required");
    }

    const userExists = await User.findOne({ $or: [{ email }, { username }] });
    if (userExists) {
        throw new ApiError(409, "User with this email or username already exists");
    }

    const user = await User.create({ username, email, passwordHash: password });
    
    generateTokenAndSetCookie(res, user._id, 'user');
    
    const loggedInUser = await User.findById(user._id).select("-passwordHash");

    return res.status(201).json(new ApiResponse(201, { user: loggedInUser }, "User registered successfully!"));
});

export const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) throw new ApiError(400, "Email and password are required");

    const user = await User.findOne({ email });
    if (!user || !(await user.isPasswordCorrect(password))) {
        throw new ApiError(401, "Invalid credentials");
    }

    if (isNewDay(user.lastLogin)) {
        user.points += 1;
        await Transaction.create({ user: user._id, type: 'daily_login_points', description: 'Daily login bonus', pointsChange: 1 });
    }
    user.lastLogin = new Date();
    await user.save({ validateBeforeSave: false });

    generateTokenAndSetCookie(res, user._id, 'user');
    
    const loggedInUser = await User.findById(user._id).select("-passwordHash");

    return res.status(200).json(new ApiResponse(200, { user: loggedInUser }, "Login successful!"));
});

export const logoutUser = asyncHandler(async (req, res) => {
    const token = req.cookies.token;
    if (token) {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        await BlacklistedToken.create({ token, expiresAt: new Date(decoded.exp * 1000) });
    }
    
    res.cookie('token', '', {
        httpOnly: true,
        expires: new Date(0),
    });

    return res.status(200).json(new ApiResponse(200, {}, "Successfully logged out"));
});

export const getCurrentUserProfile = asyncHandler(async (req, res) => {
    // protectUser middleware already attaches the user object to the request
    return res.status(200).json(new ApiResponse(200, { user: req.user }, "User profile fetched successfully."));
});


// ADMIN AUTH
export const signupAdmin = asyncHandler(async (req, res) => {
    // This is now protected by protectAdmin, so req.user is an admin
    const { username, email, password } = req.body;
    if ([username, email, password].some((field) => !field || field.trim() === "")) {
        throw new ApiError(400, "All fields are required");
    }

    const adminExists = await Admin.findOne({ $or: [{ email }, { username }] });
    if (adminExists) throw new ApiError(409, "Admin with this email or username already exists");

    await Admin.create({ username, email, passwordHash: password, approved: false }); // New admins always start as unapproved
    
    return res.status(201).json(new ApiResponse(201, {}, "Admin account created and is pending approval."));
});

export const loginAdmin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });
    if (!admin || !(await admin.isPasswordCorrect(password))) {
        throw new ApiError(401, 'Invalid credentials');
    }
    if (!admin.approved) {
        throw new ApiError(403, "Account is pending approval from an existing administrator.");
    }

    generateTokenAndSetCookie(res, admin._id, 'admin');
    
    const loggedInAdmin = await Admin.findById(admin._id).select("-passwordHash");
    
    return res.status(200).json(new ApiResponse(200, { user: loggedInAdmin }, "Admin login successful!"));
});