
import express from 'express';
import * as UserController from '../controllers/userController.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

router.use(authenticate);

router.get('/profile', UserController.getProfile);
router.put('/profile', UserController.updateProfile);

router.get('/wishlist', UserController.getWishlist);
router.post('/wishlist', UserController.addToWishlist);
router.delete('/wishlist/:propertyId', UserController.removeFromWishlist);

export default router;
