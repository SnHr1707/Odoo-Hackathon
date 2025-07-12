// src/routes/user.routes.js
import { Router } from 'express';
import { getUserDashboard } from '../Controllers/user.controller.js';
import { protectUser } from '../middlewares/auth.middleware.js';

const router = Router();

// All user-specific routes are protected
router.use(protectUser);

router.get('/dashboard', getUserDashboard);

export default router;