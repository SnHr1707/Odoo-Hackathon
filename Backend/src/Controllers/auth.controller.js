import { User } from '../models/user.model.js';
import { Admin } from '../models/admin.model.js';
import { BlacklistedToken } from '../models/blacklistedToken.model.js';
import { Transaction } from '../models/transaction.model.js';
import { asyncHandler } from '../Utils/asyncHandler.js';
import { ApiError } from '../Utils/ApiError.js';
import jwt from 'jsonwebtoken';

const generateToken = (id, role = 'user') => {
    return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: '24h' });
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
    if ([username, email, password].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "All fields are required");
    }

    const userExists = await User.findOne({ $or: [{ email }, { username }] });
    if (userExists) {
        throw new ApiError(409, "User with this email or username already exists");
    }

    const user = await User.create({ username, email, passwordHash: password });
    const token = generateToken(user._id, 'user');
    
    const loggedInUser = await User.findById(user._id).select("-passwordHash");

    res.status(201).json({ 
        message: "User created successfully!",
        token, 
        user: loggedInUser
    });
});

export const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        throw new ApiError(400, "Email and password are required");
    }

    const user = await User.findOne({ email });
    if (!user || !(await user.isPasswordCorrect(password))) {
        throw new ApiError(401, "Invalid credentials");
    }

    // Daily login points
    if (isNewDay(user.lastLogin)) {
        user.points += 1; // Award 1 point
        await Transaction.create({
            user: user._id,
            type: 'daily_login_points',
            description: 'Daily login bonus',
            pointsChange: 1
        });
    }
    user.lastLogin = new Date();
    await user.save();

    const token = generateToken(user._id, 'user');
    const loggedInUser = await User.findById(user._id).select("-passwordHash");
    
    res.status(200).json({
        message: "Login successful!",
        token,
        user: loggedInUser
    });
});

export const logoutUser = asyncHandler(async (req, res) => {
    const token = req.token;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    await BlacklistedToken.create({ token, expiresAt: new Date(decoded.exp * 1000) });
    res.status(200).json({ message: 'Successfully logged out' });
});

// ADMIN AUTH
export const signupAdmin = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    if ([username, email, password].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "All fields are required");
    }
    const adminExists = await Admin.findOne({ $or: [{ email }, { username }] });
    if (adminExists) {
        throw new ApiError(409, "Admin with this email or username already exists");
    }

    // The first admin is approved by default, others need approval
    const isFirstAdmin = (await Admin.countDocuments()) === 0;
    const admin = await Admin.create({ 
        username, 
        email, 
        passwordHash: password,
        approved: isFirstAdmin
    });
    
    res.status(201).json({ message: "Admin account created. Awaiting approval from an existing admin." });
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

    const token = generateToken(admin._id, 'admin');
    const loggedInAdmin = await Admin.findById(admin._id).select("-passwordHash");

    res.status(200).json({
        message: "Admin login successful!",
        token,
        user: loggedInAdmin
    });
});