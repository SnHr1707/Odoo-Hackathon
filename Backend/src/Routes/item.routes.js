import { Router } from 'express';
import { protectUser } from '../middlewares/auth.middleware.js';
// import item controllers

const router = Router();

// A user must be logged in to list an item
router.post('/list', protectUser, /* listItemController */);

// Public route to view all approved items
router.get('/', /* getAllItemsController */);

export default router;