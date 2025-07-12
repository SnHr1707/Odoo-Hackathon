import jwt from 'jsonwebtoken';
import { asyncHandler } from "../Utils/asyncHandler.js";
import { User } from '../models/user.model.js';
import { Admin } from '../models/admin.model.js';
import { BlacklistedToken } from '../models/blacklistedToken.model.js';

export const protectUser = asyncHandler(async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return res.status(401).json({ message: 'Not authorized, no token' });
    }

    const isBlacklisted = await BlacklistedToken.findOne({ token });
    if (isBlacklisted) {
        return res.status(401).json({ message: 'Token is invalid, please log in again.' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select('-passwordHash');
    if (!req.user) {
        return res.status(401).json({ message: 'User not found' });
    }
    req.token = token; // Pass token to logout handler
    next();
});

export const protectAdmin = asyncHandler(async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }
    if (!token) {
        return res.status(401).json({ message: 'Not authorized, no token' });
    }

    const isBlacklisted = await BlacklistedToken.findOne({ token });
    if (isBlacklisted) {
        return res.status(401).json({ message: 'Token is invalid, please log in again.' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const admin = await Admin.findById(decoded.id).select('-passwordHash');
    if (!admin) {
        return res.status(401).json({ message: 'Admin not found' });
    }

    if (!admin.approved) {
        return res.status(403).json({ message: 'Admin account not approved. Please wait for another admin to grant access.' });
    }
    
    req.admin = admin;
    req.token = token;
    next();
});