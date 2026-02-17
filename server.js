
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import propertyRoutes from './routes/propertyRoutes.js';
import notificationRoutes from './routes/notificationRoutes.js';
import aiRoutes from './routes/aiRoutes.js';
import leadRoutes from './routes/leadRoutes.js';
import complianceRoutes from './routes/complianceRoutes.js';
import userRoutes from './routes/userRoutes.js';
import chatRoutes from './routes/chatRoutes.js';
import { authenticate } from './middleware/auth.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Global Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Health Check
app.get('/health', (req, res) => res.json({ status: 'OK' }));

// API Routes (V1)
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/properties', propertyRoutes);
app.use('/api/v1/notifications', authenticate, notificationRoutes);
app.use('/api/v1/leads', authenticate, leadRoutes);
app.use('/api/v1/compliance', authenticate, complianceRoutes);
app.use('/api/v1/chats', authenticate, chatRoutes);
app.use('/api/v1/ai', aiRoutes);

// Error Handling
app.use((err, req, res, next) => {
  console.error('SERVER_ERROR:', err);
  res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(PORT, () => {
  console.log(`🚀 Masara Backend running on http://localhost:${PORT}`);
});
