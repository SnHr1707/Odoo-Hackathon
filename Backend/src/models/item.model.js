// src/models/item.model.js
import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  brand: { type: String, required: true },
  category: {
    main: { type: String, required: true },
    sub: { type: String, required: true },
  },
  tags: {
    type: [{
        type: String,
        enum: ['men', 'women', 'unisex', 'kids', 'oversized', 'vintage', 'watches', 'tapered', 'formal', 'casual', 'sports']
    }],
    default: []
  },
  // This field will store an array of Base64 encoded image strings.
  images: [{ type: String, required: true }],
  uploader: {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    username: { type: String, required: true },
  },
  listingType: { type: String, enum: ['swap', 'redeem'], required: true },
  pointsValue: { type: Number, required: function () { return this.listingType === 'redeem'; } },
  status: { type: String, enum: ['pending', 'approved', 'rejected', 'swapped', 'redeemed'], default: 'pending', index: true },
  approvedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin' },
  rejectionReason: { type: String },
}, { timestamps: true });

// Add a text index for searching
itemSchema.index({ name: 'text', description: 'text', brand: 'text', tags: 'text' });


export const Item = mongoose.model('Item', itemSchema);