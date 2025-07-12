// src/models/transaction.model.js
import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    type: {
        type: String,
        enum: ['redeem_item', 'swap_item', 'daily_login_points', 'listing_bonus'],
        required: true
    },
    description: { type: String, required: true },
    pointsChange: { type: Number, default: 0 }, // e.g., -100 for redeem, +1 for login
    relatedItems: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Item' }], // Can include one or two items
    relatedUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] // For swaps
}, { timestamps: true });

export const Transaction = mongoose.model('Transaction', transactionSchema);