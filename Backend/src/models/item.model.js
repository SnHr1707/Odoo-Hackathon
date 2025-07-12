import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  brand: { type: String, required: true },
  category: {
    main: { type: String, required: true },
    sub: { type: String, required: true },
    nested: { type: String },
  },
  tags: [{ type: String, lowercase: true, trim: true }],
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

export const Item = mongoose.model('Item', itemSchema);