// src/controllers/swap.controller.js
import { SwapRequest } from '../models/swapRequest.model.js';
import { Item } from '../models/item.model.js';
import { Transaction } from '../models/transaction.model.js';
import { asyncHandler } from '../Utils/asyncHandler.js';
import { ApiError } from '../Utils/ApiError.js';
import { ApiResponse } from '../Utils/ApiResponse.js';
import mongoose from 'mongoose';

// User initiates a swap request
export const createSwapRequest = asyncHandler(async (req, res) => {
    const { receiverItemId, requesterItemId } = req.body;
    const requesterId = req.user._id;

    const [receiverItem, requesterItem] = await Promise.all([
        Item.findById(receiverItemId),
        Item.findById(requesterItemId)
    ]);

    if (!receiverItem || receiverItem.status !== 'approved' || receiverItem.listingType !== 'swap') {
        throw new ApiError(404, "The item you want to swap for is not available.");
    }
    if (!requesterItem || requesterItem.status !== 'approved' || String(requesterItem.uploader.userId) !== String(requesterId)) {
        throw new ApiError(403, "The item you are offering is not valid for this swap.");
    }
    if (String(receiverItem.uploader.userId) === String(requesterId)) {
        throw new ApiError(400, "You cannot swap an item with yourself.");
    }

    const swap = await SwapRequest.create({
        requester: { userId: requesterId, itemId: requesterItemId },
        receiver: { userId: receiverItem.uploader.userId, itemId: receiverItemId },
        status: 'pending'
    });

    // EMIT WEBSOCKET EVENT TO receiver.userId HERE
    // req.app.get('io').to(receiverItem.uploader.userId.toString()).emit('new_swap_request', swap);

    return res.status(201).json(new ApiResponse(201, swap, "Swap request sent!"));
});

// User responds to a swap request (accept or reject)
export const respondToSwapRequest = asyncHandler(async (req, res) => {
    const { swapRequestId } = req.params;
    const { response } = req.body; // 'accepted' or 'rejected'
    const receiverId = req.user._id;

    const swapRequest = await SwapRequest.findById(swapRequestId);

    if (!swapRequest || String(swapRequest.receiver.userId) !== String(receiverId) || swapRequest.status !== 'pending') {
        throw new ApiError(404, "Swap request not found or you are not authorized to respond.");
    }

    if (response === 'rejected') {
        swapRequest.status = 'rejected';
        await swapRequest.save();
        // EMIT WEBSOCKET EVENT TO requester.userId HERE
        return res.status(200).json(new ApiResponse(200, swapRequest, "Swap request rejected."));
    }

    if (response === 'accepted') {
        // Use a transaction for atomicity
        const session = await mongoose.startSession();
        session.startTransaction();
        try {
            // 1. Update the swap request status
            swapRequest.status = 'accepted';
            await swapRequest.save({ session });

            // 2. Update both items' statuses to 'swapped'
            await Item.updateMany(
                { _id: { $in: [swapRequest.requester.itemId, swapRequest.receiver.itemId] } },
                { $set: { status: 'swapped' } },
                { session }
            );

            // 3. Create transaction logs for both users
            const requesterItem = await Item.findById(swapRequest.requester.itemId).session(session);
            const receiverItem = await Item.findById(swapRequest.receiver.itemId).session(session);

            await Transaction.create([{
                user: swapRequest.requester.userId,
                type: 'swap_item',
                description: `Swapped your '${requesterItem.name}' for '${receiverItem.name}'.`,
                relatedItems: [requesterItem._id, receiverItem._id],
                relatedUsers: [swapRequest.receiver.userId]
            }, {
                user: swapRequest.receiver.userId,
                type: 'swap_item',
                description: `Swapped your '${receiverItem.name}' for '${requesterItem.name}'.`,
                relatedItems: [receiverItem._id, requesterItem._id],
                relatedUsers: [swapRequest.requester.userId]
            }], { session });

            await session.commitTransaction();

            // EMIT WEBSOCKET EVENT to requester about acceptance
            return res.status(200).json(new ApiResponse(200, swapRequest, "Swap accepted successfully!"));

        } catch (error) {
            await session.abortTransaction();
            throw new ApiError(500, "Failed to accept swap due to a server error.", error);
        } finally {
            session.endSession();
        }
    }
});