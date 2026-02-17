
import express from 'express';
import * as ChatController from '../controllers/chatController.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

router.use(authenticate);

// Messaging
router.get('/', ChatController.getMyChats);
router.get('/:chatId/messages', ChatController.getMessages);
router.post('/messages', ChatController.sendMessage);

// Appointments
router.get('/appointments', ChatController.getAppointments);
router.post('/appointments', ChatController.createAppointment);

export default router;
