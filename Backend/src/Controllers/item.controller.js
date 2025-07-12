import { Item } from '../models/item.model.js';
import { User } from '../models/user.model.js';
import { Transaction } from '../models/transaction.model.js';
import { asyncHandler } from '../Utils/asyncHandler.js';
import { ApiError } from '../Utils/ApiError.js';
import { ApiResponse } from '../Utils/ApiResponse.js';
import mongoose from 'mongoose';

// User lists a new item
export const createItemListing = asyncHandler(async (req, res) => {
    const { name, description, brand, category, tags, listingType, pointsValue } = req.body;

    if (!req.files || req.files.length === 0) {
        throw new ApiError(400, "At least one image is required.");
    }
    // Map files to their server paths
    const images = req.files.map(file => `/uploads/${file.filename}`);

    if (!name || !description || !brand || !category || !listingType) {
        throw new ApiError(400, "Missing required fields for item listing.");
    }
    
    const parsedCategory = JSON.parse(category);

    if (listingType === 'redeem' && (!pointsValue || pointsValue <= 0)) {
        throw new ApiError(400, "Items listed for redemption must have a valid point value.");
    }

    const item = await Item.create({
        name,
        description,
        brand,
        category: parsedCategory,
        tags: tags ? tags.split(',').map(tag => tag.trim()) : [],
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

// Get all approved items
export const getAllApprovedItems = asyncHandler(async (req, res) => {
    const items = await Item.find({ status: 'approved' })
                             .populate('uploader.userId', 'username profilePictureUrl')
                             .sort({ createdAt: -1 });
    return res.status(200).json(new ApiResponse(200, items, "Approved items fetched successfully."));
});

// Get a single item by ID
export const getItemById = asyncHandler(async (req, res) => {
    const { itemId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(itemId)) {
        throw new ApiError(400, "Invalid item ID.");
    }
    const item = await Item.findById(itemId).populate('uploader.userId', 'username email profilePictureUrl');
    if (!item) {
        throw new ApiError(404, "Item not found.");
    }
    return res.status(200).json(new ApiResponse(200, item, "Item fetched successfully."));
});


// User redeems an item using points
export const redeemItem = asyncHandler(async (req, res) => {
    const { itemId } = req.params;
    const user = req.user;

    const itemToRedeem = await Item.findById(itemId);

    if (!itemToRedeem || itemToRedeem.status !== 'approved' || itemToRedeem.listingType !== 'redeem') {
        throw new ApiError(404, "Item is not available for redemption.");
    }

    if (String(itemToRedeem.uploader.userId) === String(user._id)) {
        throw new ApiError(400, "You cannot redeem your own item.");
    }

    if (user.points < itemToRedeem.pointsValue) {
        throw new ApiError(403, "Not enough points to redeem this item.");
    }
    
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        // 1. Debit points from the redeeming user
        await User.findByIdAndUpdate(user._id, { $inc: { points: -itemToRedeem.pointsValue } }, { session, new: true });

        // 2. Credit points to the item's uploader
        await User.findByIdAndUpdate(itemToRedeem.uploader.userId, { $inc: { points: itemToRedeem.pointsValue } }, { session, new: true });

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
            type: 'listing_bonus',
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