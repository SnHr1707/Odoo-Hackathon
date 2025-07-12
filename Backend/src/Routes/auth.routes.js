import { Router } from 'express';
import { protectUser, protectAdmin } from '../middlewares/auth.middleware.js';
import { signupUser, loginUser, logoutUser, signupAdmin, loginAdmin } from '../Controllers/auth.controller.js';

const router = Router();

// User Routes
router.post('/user/signup', signupUser);
router.post('/user/login', loginUser);
router.post('/user/logout', protectUser, logoutUser);

// Admin Routes
router.post('/admin/signup', signupAdmin); // This could be protected by another admin
router.post('/admin/login', loginAdmin);

export default router;