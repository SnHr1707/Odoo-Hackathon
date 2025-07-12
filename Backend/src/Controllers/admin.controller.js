// src/controllers/admin.controller.js
import { Admin } from '../models/admin.model.js';
import { Item } from '../models/item.model.js';
import { asyncHandler } from '../Utils/asyncHandler.js';
import { ApiError } from '../Utils/ApiError.js';
import { ApiResponse } from '../Utils/ApiResponse.js';

// An approved admin approves a new admin
export const approveAdmin = asyncHandler(async (req, res) => {
    const { adminIdToApprove } = req.params;
    const approverId = req.user._id; // The logged-in admin performing the action

    if (adminIdToApprove === String(approverId)) {
        throw new ApiError(400, "Admins cannot approve themselves.");
    }

    const adminToApprove = await Admin.findById(adminIdToApprove);
    if (!adminToApprove) {
        throw new ApiError(404, "Admin account to approve not found.");
    }
    if (adminToApprove.approved) {
        throw new ApiError(400, "This admin account has already been approved.");
    }

    adminToApprove.approved = true;
    adminToApprove.approvedBy = approverId;
    await adminToApprove.save({ validateBeforeSave: false });

    return res.status(200).json(new ApiResponse(200, adminToApprove, "Admin has been approved successfully."));
});

// Get all admins pending approval
export const getPendingAdmins = asyncHandler(async (req, res) => {
    const pendingAdmins = await Admin.find({ approved: false }).select('-passwordHash -approvedBy');
    return res.status(200).json(new ApiResponse(200, pendingAdmins, "Pending admins fetched successfully."));
});

// Get all items pending approval
export const getPendingItems = asyncHandler(async (req, res) => {
    // Populate with more user details for the admin panel
    const pendingItems = await Item.find({ status: 'pending' }).populate('uploader.userId', 'username email');
    return res.status(200).json(new ApiResponse(200, pendingItems, "Pending items fetched successfully."));
});

// Approve or reject a pending item
export const moderateItem = asyncHandler(async (req, res) => {
    const { itemId } = req.params;
    const { action, rejectionReason } = req.body; // action: 'approve' or 'reject'
    const adminId = req.user._id;

    const item = await Item.findById(itemId);
    if (!item || item.status !== 'pending') {
        throw new ApiError(404, "Item not found or has already been moderated.");
    }

    if (action === 'approve') {
        item.status = 'approved';
        item.approvedBy = adminId;
        item.rejectionReason = undefined; // Clear any previous rejection reason
        await item.save();
        return res.status(200).json(new ApiResponse(200, item, "Item approved."));
    } else if (action === 'reject') {
        item.status = 'rejected';
        item.rejectionReason = rejectionReason || "No reason provided."; // Provide a default reason
        item.approvedBy = undefined;
        await item.save();
        return res.status(200).json(new ApiResponse(200, item, "Item rejected."));
    } else {
        throw new ApiError(400, "Invalid moderation action. Must be 'approve' or 'reject'.");
    }
});