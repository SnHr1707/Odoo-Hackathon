// src/controllers/admin.controller.js
import { Admin } from '../models/admin.model.js';
import { Item } from '../models/item.model.js';
import { asyncHandler } from '../Utils/asyncHandler.js';
import { ApiError } from '../Utils/ApiError.js';
import { ApiResponse } from '../Utils/ApiResponse.js';

// An approved admin approves a new admin
export const approveAdmin = asyncHandler(async (req, res) => {
    const { adminIdToApprove } = req.params;
    const approverId = req.user._id; // Changed from req.admin to req.user for consistency

    const adminToApprove = await Admin.findById(adminIdToApprove);
    if (!adminToApprove || adminToApprove.approved) {
        throw new ApiError(404, "Admin not found or already approved.");
    }

    adminToApprove.approved = true;
    adminToApprove.approvedBy = approverId;
    await adminToApprove.save({ validateBeforeSave: false });

    return res.status(200).json(new ApiResponse(200, adminToApprove, "Admin has been approved successfully."));
});

// Get all admins pending approval
export const getPendingAdmins = asyncHandler(async (req, res) => {
    const pendingAdmins = await Admin.find({ approved: false }).select('-passwordHash');
    return res.status(200).json(new ApiResponse(200, pendingAdmins, "Pending admins fetched successfully."));
});

// Get all items pending approval
export const getPendingItems = asyncHandler(async (req, res) => {
    const pendingItems = await Item.find({ status: 'pending' }).populate('uploader.userId', 'username email');
    return res.status(200).json(new ApiResponse(200, pendingItems, "Pending items fetched successfully."));
});

// Approve or reject a pending item
export const moderateItem = asyncHandler(async (req, res) => {
    const { itemId } = req.params;
    const { action, rejectionReason } = req.body; // action: 'approve' or 'reject'
    const adminId = req.user._id; // Changed from req.admin to req.user

    const item = await Item.findById(itemId);
    if (!item || item.status !== 'pending') {
        throw new ApiError(404, "Item not found or has already been moderated.");
    }

    if (action === 'approve') {
        item.status = 'approved';
        item.approvedBy = adminId;
        await item.save();
        return res.status(200).json(new ApiResponse(200, item, "Item approved."));
    } else if (action === 'reject') {
        if (!rejectionReason) {
            throw new ApiError(400, "A reason is required for rejecting an item.");
        }
        item.status = 'rejected';
        item.rejectionReason = rejectionReason;
        await item.save();
        return res.status(200).json(new ApiResponse(200, item, "Item rejected."));
    } else {
        throw new ApiError(400, "Invalid moderation action.");
    }
});