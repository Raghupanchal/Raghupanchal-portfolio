import fs from 'fs';
import path from 'path';
import { DocumentService } from '../services/document.service.js';
import { ChunkingService } from '../services/chunking.service.js';
import { generateEmbeddingsBatch } from '../services/embedding.service.js';
import { vectorService } from '../services/vector.service.js';

export class DocumentController {
  /**
   * Upload and ingest single document (PDF, DOCX, TXT, MD)
   * POST /api/documents/upload
   */
  static async uploadDocument(req, res) {
    if (!req.file) {
      return res.status(400).json({ error: 'No document file uploaded.' });
    }

    const filePath = req.file.path;
    const originalName = req.file.originalname;

    try {
      // 1. Extract text and metadata
      const { text, fileType, fileSize, fileHash } = await DocumentService.extractTextFromFile(
        filePath,
        originalName
      );

      if (!text || text.length < 10) {
        fs.unlinkSync(filePath);
        return res.status(400).json({ error: 'Uploaded document contained no extractable text.' });
      }

      // 2. Structural chunking
      const chunks = ChunkingService.splitText(text, {
        sourceFileName: originalName,
        collectionName: req.body.collection || 'raghu_profile'
      });

      // 3. Generate embeddings
      const chunkTexts = chunks.map((c) => c.content);
      const embeddings = await generateEmbeddingsBatch(chunkTexts);

      const enrichedChunks = chunks.map((c, i) => ({
        ...c,
        embedding: embeddings[i]
      }));

      // 4. Save to Vector Store
      const result = await vectorService.saveDocumentWithChunks({
        document: {
          fileName: originalName,
          fileType,
          fileSize,
          fileHash,
          metadata: {
            uploadedAt: new Date().toISOString(),
            collection: req.body.collection || 'raghu_profile'
          }
        },
        chunks: enrichedChunks
      });

      // Clean up uploaded temp file
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }

      return res.status(201).json({
        success: true,
        message: `Successfully indexed ${originalName}`,
        documentId: result.documentId,
        totalChunks: result.chunkCount
      });
    } catch (err) {
      console.error('[DocumentController] Upload error:', err);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
      return res.status(500).json({ error: `Failed to process document: ${err.message}` });
    }
  }

  /**
   * List all documents in the knowledge base
   * GET /api/documents
   */
  static async listDocuments(req, res) {
    try {
      const docs = await vectorService.listDocuments();
      return res.json({ success: true, count: docs.length, documents: docs });
    } catch (err) {
      return res.status(500).json({ error: 'Failed to retrieve documents.' });
    }
  }
}
