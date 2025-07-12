// src/routes/admin.routes.js
import { Router } from 'express';
import { 
    approveAdmin, 
    getPendingItems, 
    moderateItem, 
    getPendingAdmins 
} from '../Controllers/admin.controller.js';
import { protectAdmin } from '../middlewares/auth.middleware.js';

const router = Router();

// ALL admin routes are protected and can only be accessed by an approved, logged-in admin.
router.use(protectAdmin); 

// --- Admin Management ---
router.get('/pending-admins', getPendingAdmins); // Gets list of admins awaiting approval
router.patch('/approve-admin/:adminIdToApprove', approveAdmin); // Approves a pending admin

// --- Item Management ---
router.get('/items/pending', getPendingItems);
router.patch('/items/moderate/:itemId', moderateItem);

export default router;