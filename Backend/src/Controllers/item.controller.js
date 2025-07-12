// src/controllers/item.controller.js
import { Item } from '../models/item.model.js';
import { User } from '../models/user.model.js';
import { Transaction } from '../models/transaction.model.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import mongoose from 'mongoose';

// User lists a new item
export const createItemListing = asyncHandler(async (req, res) => {
    const { name, description, brand, category, tags, listingType, pointsValue } = req.body;
    // Assume images are uploaded via middleware like multer and URLs are in req.files
    const images = req.files.map(file => file.path); // Placeholder for image URLs

    if (!name || !description || !brand || !category || !listingType || images.length === 0) {
        throw new ApiError(400, "Missing required fields for item listing.");
    }

    if (listingType === 'redeem' && (!pointsValue || pointsValue <= 0)) {
        throw new ApiError(400, "Items listed for redemption must have a valid point value.");
    }

    const item = await Item.create({
        name,
        description,
        brand,
        category,
        tags: tags || [],
        images,
        uploader: {
            userId: req.user._id,
            username: req.user.username
        },
        listingType,
        pointsValue: listingType === 'redeem' ? pointsValue : null,
        status: 'pending' // All new items need admin approval
    });

    return res.status(201).json(new ApiResponse(201, item, "Item listed successfully. Awaiting admin approval."));
});

// User redeems an item using points
export const redeemItem = asyncHandler(async (req, res) => {
    const { itemId } = req.params;
    const user = req.user;

    const itemToRedeem = await Item.findById(itemId);

    if (!itemToRedeem || itemToRedeem.status !== 'approved' || itemToRedeem.listingType !== 'redeem') {
        throw new ApiError(404, "Item is not available for redemption.");
    }

    if (user.points < itemToRedeem.pointsValue) {
        throw new ApiError(403, "Not enough points to redeem this item.");
    }
    
    // Use a MongoDB session for an atomic transaction
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        // 1. Debit points from the redeeming user
        await User.findByIdAndUpdate(user._id, { $inc: { points: -itemToRedeem.pointsValue } }, { session });

        // 2. Credit points to the item's uploader
        await User.findByIdAndUpdate(itemToRedeem.uploader.userId, { $inc: { points: itemToRedeem.pointsValue } }, { session });

        // 3. Update the item's status to 'redeemed'
        itemToRedeem.status = 'redeemed';
        await itemToRedeem.save({ session });

        // 4. Log the transaction for the redeemer
        await Transaction.create([{
            user: user._id,
            type: 'redeem_item',
            description: `Redeemed item: '${itemToRedeem.name}'`,
            pointsChange: -itemToRedeem.pointsValue,
            relatedItems: [itemToRedeem._id],
            relatedUsers: [itemToRedeem.uploader.userId]
        }], { session });

        // 5. Log the transaction for the uploader
        await Transaction.create([{
            user: itemToRedeem.uploader.userId,
            type: 'listing_bonus', // or a more descriptive type
            description: `Your item '${itemToRedeem.name}' was redeemed by ${user.username}.`,
            pointsChange: itemToRedeem.pointsValue,
            relatedItems: [itemToRedeem._id],
            relatedUsers: [user._id]
        }], { session });
        
        await session.commitTransaction();

        return res.status(200).json(new ApiResponse(200, {}, "Item redeemed successfully!"));

    } catch (error) {
        await session.abortTransaction();
        throw new ApiError(500, "Redemption failed due to a server error.", error);
    } finally {
        session.endSession();
    }
});