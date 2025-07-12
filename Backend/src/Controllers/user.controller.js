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
    ] = await Promise.all([
        User.findById(userId).select('-passwordHash'),
        Item.find({ 'uploader.userId': userId }).sort({ createdAt: -1 }),
        SwapRequest.find({
            $or: [{ 'requester.userId': userId }, { 'receiver.userId': userId }],
            status: 'pending'
        }).populate('requester.itemId receiver.itemId'),
        Transaction.find({ user: userId })
            .populate('relatedItems') // <-- POPULATE RELATED ITEMS
            .sort({ createdAt: -1 })
            .limit(20),
    ]);

    // Process data for the dashboard view
    const itemsOverview = {
        totalListed: userItems.length,
        active: userItems.filter(i => i.status === 'approved').length,
        pending: userItems.filter(i => i.status === 'pending').length,
        swapped: userItems.filter(i => i.status === 'swapped').length,
        redeemedByOthers: userItems.filter(i => i.status === 'redeemed').length,
    };

    const dashboardData = {
        profile: userProfile,
        itemsOverview,
        userItems, 
        ongoingSwaps,
        completedTransactions,
    };

    return res.status(200).json(new ApiResponse(200, dashboardData, "User dashboard data fetched successfully."));
});