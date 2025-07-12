import jwt from 'jsonwebtoken';
import { asyncHandler } from "../Utils/asyncHandler.js";
import { User } from '../models/user.model.js';
import { Admin } from '../models/admin.model.js';
import { BlacklistedToken } from '../models/blacklistedToken.model.js';
import { ApiError } from '../Utils/ApiError.js';

const protect = (model, role = 'user') => asyncHandler(async (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        throw new ApiError(401, `Not authorized, no token`);
    }

    const isBlacklisted = await BlacklistedToken.findOne({ token });
    if (isBlacklisted) {
        throw new ApiError(401, 'Token is invalid, please log in again.');
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        const currentUser = await model.findById(decoded.id).select('-passwordHash');

        if (!currentUser) {
            throw new ApiError(401, `${role.charAt(0).toUpperCase() + role.slice(1)} not found`);
        }
        
        if (role === 'admin' && !currentUser.approved) {
             throw new ApiError(403, 'Admin account not approved.');
        }

        req.user = currentUser;
        req.token = token;
        next();
    } catch (error) {
        throw new ApiError(401, 'Not authorized, token failed');
    }
});

export const protectUser = protect(User, 'user');
export const protectAdmin = protect(Admin, 'admin');