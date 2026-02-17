
import express from 'express';
import * as LeadController from '../controllers/leadController.js';
import { authorize } from '../middleware/auth.js';

const router = express.Router();

// Only Agents can access Lead management
router.use(authorize(['AGENTS']));

router.get('/my', LeadController.getMyLeads);
router.put('/:id/status', LeadController.updateLeadStatus);
router.post('/:id/notes', LeadController.addLeadNote);

export default router;
