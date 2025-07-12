import { Router } from 'express';
import { protectUser, protectAdmin } from '../middlewares/auth.middleware.js';
import { 
    signupUser, 
    loginUser, 
    logoutUser, 
    signupAdmin, 
    loginAdmin, 
    getCurrentUserProfile 
} from '../Controllers/auth.controller.js';

const router = Router();

// User Routes
router.post('/user/signup', signupUser);
router.post('/user/login', loginUser);
router.post('/user/logout', protectUser, logoutUser);
router.get('/user/profile', protectUser, getCurrentUserProfile); // New route

// Admin Routes
router.post('/admin/signup', protectAdmin, signupAdmin); // Only an existing admin can create a new one
router.post('/admin/login', loginAdmin);

export default router;