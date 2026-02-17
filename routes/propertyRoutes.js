
import express from 'express';
import * as PropertyController from '../controllers/propertyController.js';
import { authenticate, authorize } from '../middleware/auth.js';

const router = express.Router();

router.get('/', PropertyController.getProperties);
router.get('/:id', PropertyController.getPropertyById);

// Protected routes
router.post('/', authenticate, authorize(['AGENTS', 'ADMIN']), PropertyController.createProperty);
router.delete('/:id', authenticate, authorize(['AGENTS', 'ADMIN']), PropertyController.deleteProperty);

export default router;
