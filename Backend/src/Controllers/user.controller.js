// src/controllers/user.controller.js
import { User } from '../models/user.model.js';
import { Item } from '../models/item.model.js';
import { SwapRequest } from '../models/swapRequest.model.js';
import { Transaction } from '../models/transaction.model.js';
import { asyncHandler } from '../Utils/asyncHandler.js';
import { ApiResponse } from "../Utils/ApiResponse.js";

export const getUserDashboard = asyncHandler(async (req, res) => {
    const userId = req.user._id;

    // Fetch all data in parallel for efficiency
    const [
        userProfile,
        userItems,
        ongoingSwaps,
        completedTransactions,
        loginHistory // You would get this from transactions or a dedicated login collection
    ] = await Promise.all([
        User.findById(userId).select('-passwordHash'),
        Item.find({ 'uploader.userId': userId }).sort({ createdAt: -1 }),
        SwapRequest.find({
            $or: [{ 'requester.userId': userId }, { 'receiver.userId': userId }],
            status: 'pending'
        }).populate('requester.itemId receiver.itemId'),
        Transaction.find({ user: userId }).sort({ createdAt: -1 }).limit(20),
        Transaction.find({ user: userId, type: 'daily_login_points' }).select('createdAt')
    ]);

    // Process data for the dashboard view
    const itemsOverview = {
        listed: userItems.filter(i => i.status === 'approved' || i.status === 'pending').length,
        swapped: userItems.filter(i => i.status === 'swapped').length,
        redeemed: userItems.filter(i => i.status === 'redeemed').length,
        rejected: userItems.filter(i => i.status === 'rejected').length,
    };

    // Format login history for a mini-calendar (e.g., an array of dates)
    const loginStreakData = loginHistory.map(t => t.createdAt.toISOString().split('T')[0]);

    const dashboardData = {
        profile: userProfile,
        itemsOverview,
        userItems, // The full list of items
        ongoingSwaps,
        completedTransactions,
        loginStreakData
    };

    return res.status(200).json(new ApiResponse(200, dashboardData, "User dashboard data fetched successfully."));
});