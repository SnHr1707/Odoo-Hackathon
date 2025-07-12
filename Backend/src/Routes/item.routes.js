import { Router } from 'express';
import { protectUser } from '../middlewares/auth.middleware.js';
import { upload } from '../Middlewares/multer.middleware.js';
import { createItemListing, getAllApprovedItems, getItemById } from '../Controllers/item.controller.js';

const router = Router();

// A user must be logged in to list an item
router.post(
    '/list', 
    protectUser, 
    upload.array('images', 5), // 'images' is the field name, max 5 files
    createItemListing
);

// Public route to view all approved items
router.get('/', getAllApprovedItems);

// Public route to view a single item by its ID
router.get('/:itemId', getItemById);

export default router;