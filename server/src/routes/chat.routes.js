import { Router } from 'express';
import { ChatController } from '../controllers/chat.controller.js';
import { chatRateLimiter } from '../middleware/rateLimiter.js';

const router = Router();

router.post('/stream', chatRateLimiter, ChatController.streamChat);
router.get('/history', ChatController.getHistory);
router.post('/clear', ChatController.clearHistory);

export default router;
