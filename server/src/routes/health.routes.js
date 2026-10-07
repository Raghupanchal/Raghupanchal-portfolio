import { Router } from 'express';
import { config } from '../config/env.js';
import { vectorService } from '../services/vector.service.js';

const router = Router();

router.get('/', async (req, res) => {
  const docs = await vectorService.listDocuments();
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    engine: 'LLM + RAG System',
    llmProvider: config.llmProvider,
    vectorStoreType: config.vectorStoreType,
    indexedDocumentsCount: docs.length
  });
});

export default router;
