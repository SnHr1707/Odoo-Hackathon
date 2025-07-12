// src/routes/item.routes.js
import { Router } from 'express';
import { protectUser } from '../middlewares/auth.middleware.js';
// import { upload } from '../Middlewares/multer.middleware.js'; // Multer is no longer needed
import { createItemListing, getAllApprovedItems, getItemById, redeemItem } from '../Controllers/item.controller.js';

const router = Router();

// A user must be logged in to list an item
// The 'upload' middleware is removed as we are now handling Base64 strings in the request body.
router.post(
    '/list', 
    protectUser, 
    createItemListing
);

// A user must be logged in to redeem an item
router.post('/redeem/:itemId', protectUser, redeemItem);

// Public route to view all approved items
router.get('/', getAllApprovedItems);

// Public route to view a single item by its ID
router.get('/:itemId', getItemById);

export default router;