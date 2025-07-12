
// src/routes/admin.routes.js
import { Router } from 'express';
import { approveAdmin, getPendingItems, moderateItem } from '../Controllers/admin.controller.js';
import { protectAdmin } from '../middlewares/auth.middleware.js';

const router = Router();
router.use(protectAdmin); // ALL admin routes are protected

router.patch('/approve-admin/:adminIdToApprove', approveAdmin);
router.get('/items/pending', getPendingItems);
router.patch('/items/moderate/:itemId', moderateItem);

export default router;