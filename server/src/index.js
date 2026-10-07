import express from 'express';
import cors from 'cors';
import { config } from './config/env.js';
import chatRoutes from './routes/chat.routes.js';
import docRoutes from './routes/doc.routes.js';
import healthRoutes from './routes/health.routes.js';

const app = express();

// Middleware
app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'x-api-key']
  })
);

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Route Registration
app.use('/api/chat', chatRoutes);
app.use('/api/documents', docRoutes);
app.use('/api/health', healthRoutes);

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('[Server Error]', err);
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error',
    timestamp: new Date().toISOString()
  });
});

// Start Server
app.listen(config.port, () => {
  console.log('=============================================================');
  console.log(`🤖 RP Assistant RAG Backend running on http://localhost:${config.port}`);
  console.log(`📡 LLM Provider: ${config.llmProvider} | Vector Store: ${config.vectorStoreType}`);
  console.log(`⚡ SSE Chat Stream: http://localhost:${config.port}/api/chat/stream`);
  console.log('=============================================================');
});
