// src/routes/swap.routes.js
import { Router } from 'express';
import { createSwapRequest, respondToSwapRequest } from '../Controllers/swap.controller.js';
import { protectUser } from '../middlewares/auth.middleware.js';

const router = Router();
router.use(protectUser); // All swap actions require a logged-in user

router.post('/request', createSwapRequest);
router.post('/respond/:swapRequestId', respondToSwapRequest);

export default router;