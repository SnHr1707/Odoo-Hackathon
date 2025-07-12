// src/models/admin.model.js
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const adminSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true, lowercase: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
    role: { type: String, default: 'admin' },
    approved: { type: Boolean, default: false }, // New field: Admins are not approved by default
    approvedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin' } // New field: Tracks who approved this admin
}, { timestamps: true });

adminSchema.pre('save', async function (next) {
    if (!this.isModified('passwordHash')) return next();
    this.passwordHash = await bcrypt.hash(this.passwordHash, 10);
    next();
});

adminSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.passwordHash);
};

export const Admin = mongoose.model('Admin', adminSchema);