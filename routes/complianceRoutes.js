
import express from 'express';
import * as ComplianceController from '../controllers/complianceController.js';
import { authorize } from '../middleware/auth.js';

const router = express.Router();

// Any authenticated user can submit for verification
router.post('/submit', ComplianceController.submitDocument);

// Only Admins can verify documents
router.put('/verify/:id', authorize(['ADMIN']), ComplianceController.verifyDocument);

export default router;
