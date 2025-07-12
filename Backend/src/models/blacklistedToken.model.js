import mongoose from 'mongoose';

const blacklistedTokenSchema = new mongoose.Schema({
  token: { type: String, required: true, unique: true },
  expiresAt: { type: Date, required: true, index: { expires: '1s' } }, // TTL index to auto-delete expired tokens
});

export const BlacklistedToken = mongoose.model('BlacklistedToken', blacklistedTokenSchema);