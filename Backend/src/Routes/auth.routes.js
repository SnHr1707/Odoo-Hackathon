// src/routes/auth.routes.js
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

// --- User Auth Routes ---
router.post('/user/signup', signupUser);
router.post('/user/login', loginUser);
router.post('/user/logout', protectUser, logoutUser);
router.get('/user/profile', protectUser, getCurrentUserProfile);

// --- Admin Auth Routes ---
router.post('/admin/signup', signupAdmin); // This is now a public route for admins to register
router.post('/admin/login', loginAdmin);
// Note: An admin logout would need its own controller/route or logic in the user logout to handle the role.
// For simplicity, we can use the same logout logic. The auth context on frontend will handle role-based logout.

export default router;