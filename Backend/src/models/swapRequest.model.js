// src/models/swapRequest.model.js
import mongoose from 'mongoose';

const swapRequestSchema = new mongoose.Schema({
    requester: {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        itemId: { type: mongoose.Schema.Types.ObjectId, ref: 'Item', required: true }
    },
    receiver: {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        itemId: { type: mongoose.Schema.Types.ObjectId, ref: 'Item', required: true }
    },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'rejected', 'cancelled'],
        default: 'pending',
        index: true
    },
}, { timestamps: true });

export const SwapRequest = mongoose.model('SwapRequest', swapRequestSchema);