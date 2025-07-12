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
router.use(protectAdmin); // ALL admin routes are protected

// Admin Management
router.get('/pending-admins', getPendingAdmins);
router.patch('/approve-admin/:adminIdToApprove', approveAdmin);

// Item Management
router.get('/items/pending', getPendingItems);
router.patch('/items/moderate/:itemId', moderateItem);

export default router;