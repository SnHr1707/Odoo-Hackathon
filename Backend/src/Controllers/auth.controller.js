import { User } from '../models/user.model.js';
import { Admin } from '../models/admin.model.js';
import { BlacklistedToken } from '../models/blacklistedToken.model.js';
import { asyncHandler } from '../Utils/asyncHandler.js';
import jwt from 'jsonwebtoken';

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '24h' });
};

// USER AUTH
export const signupUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }
    const userExists = await User.findOne({ $or: [{ email }, { username }] });
    if (userExists) {
        return res.status(400).json({ message: "User with this email or username already exists" });
    }
    const user = await User.create({ username, email, passwordHash: password });
    const token = generateToken(user._id);
    res.status(201).json({ token, userId: user._id, username: user.username });
});

export const loginUser = asyncHandler(async (req, res) => {
    // ... login logic, check password, generate token
    // ... on successful login, check if it's a new day to award login points
});

export const logoutUser = asyncHandler(async (req, res) => {
    const token = req.token;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    await BlacklistedToken.create({ token, expiresAt: new Date(decoded.exp * 1000) });
    res.status(200).json({ message: 'Successfully logged out' });
});

// ADMIN AUTH
export const signupAdmin = asyncHandler(async (req, res) => {
    // Logic to create an admin, approved: false
});

export const loginAdmin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });
    if (admin && (await admin.isPasswordCorrect(password))) {
        if (!admin.approved) {
            return res.status(403).json({ message: "Account is pending approval from an existing administrator." });
        }
        const token = generateToken(admin._id);
        res.status(200).json({ token, adminId: admin._id });
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
});