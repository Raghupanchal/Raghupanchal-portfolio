import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createClient } from '@supabase/supabase-js';
import pg from 'pg';
import { config } from '../config/env.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.resolve(__dirname, '../../data');
const LOCAL_STORE_FILE = path.join(DATA_DIR, 'vector_store.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

/**
 * Cosine similarity between two numerical vectors
 */
function cosineSimilarity(vecA, vecB) {
  if (!vecA || !vecB || vecA.length === 0 || vecB.length === 0) return 0;
  let dotProduct = 0;
  let normA = 0;
  let normB = 0;
  const len = Math.min(vecA.length, vecB.length);

  for (let i = 0; i < len; i++) {
    dotProduct += vecA[i] * vecB[i];
    normA += vecA[i] * vecA[i];
    normB += vecB[i] * vecB[i];
  }

  const denominator = Math.sqrt(normA) * Math.sqrt(normB);
  return denominator === 0 ? 0 : dotProduct / denominator;
}

const STOP_WORDS = new Set([
  'what', 'is', 'are', 'was', 'were', 'his', 'her', 'the', 'a', 'an', 'and', 'or', 'in', 'on', 'at',
  'to', 'for', 'of', 'with', 'by', 'from', 'about', 'as', 'into', 'like', 'through', 'after',
  'over', 'between', 'out', 'up', 'down', 'then', 'so', 'can', 'could', 'will', 'would', 'shall',
  'should', 'may', 'might', 'must', 'please', 'tell', 'me', 'us', 'him', 'them', 'my', 'your',
  'their', 'which', 'who', 'whom', 'this', 'that', 'these', 'those', 'been', 'being', 'have', 'has',
  'had', 'do', 'does', 'did', 'doing', 'does'
]);

/**
 * Enhanced BM25 / Keyword relevance score calculator with stop-word filtering
 */
function keywordRelevance(query, content) {
  const allTokens = (query || '').toLowerCase().split(/\W+/).filter((t) => t.length >= 2);
  const meaningfulTokens = allTokens.filter((t) => !STOP_WORDS.has(t));
  const queryTokens = meaningfulTokens.length > 0 ? meaningfulTokens : allTokens;
  const contentLower = (content || '').toLowerCase();
  if (queryTokens.length === 0) return 0;

  let matchedTokens = 0;
  let frequencyScore = 0;

  for (const token of queryTokens) {
    if (contentLower.includes(token)) {
      matchedTokens += 1;
      const occurrences = (contentLower.split(token).length - 1);
      frequencyScore += Math.min(occurrences, 5) * 0.20;
    }
  }

  const coverage = matchedTokens / queryTokens.length;
  if (coverage === 0) return 0;
  return Math.min(1.0, coverage * 0.75 + frequencyScore);
}

export class VectorService {
  constructor() {
    this.storeType = config.vectorStoreType;
    this.localStore = { documents: [], chunks: [] };
    this.supabase = null;
    this.pgPool = null;

    this.init();
  }

  init() {
    // 1. Supabase Initialization
    if (this.storeType === 'supabase' && config.supabaseUrl && config.supabaseKey) {
      try {
        this.supabase = createClient(config.supabaseUrl, config.supabaseKey);
        console.log('[VectorService] Connected to Supabase Vector Store');
      } catch (err) {
        console.warn('[VectorService] Supabase init failed, falling back to local store:', err.message);
        this.storeType = 'memory';
      }
    }

    // 2. Direct PostgreSQL Initialization
    if (this.storeType === 'postgres' && config.databaseUrl) {
      try {
        this.pgPool = new pg.Pool({ connectionString: config.databaseUrl });
        console.log('[VectorService] Connected to PostgreSQL + pgvector');
      } catch (err) {
        console.warn('[VectorService] Postgres init failed, falling back to local store:', err.message);
        this.storeType = 'memory';
      }
    }

    // 3. Load Local Persistent Store
    if (fs.existsSync(LOCAL_STORE_FILE)) {
      try {
        const raw = fs.readFileSync(LOCAL_STORE_FILE, 'utf-8');
        this.localStore = JSON.parse(raw);
      } catch (e) {
        this.localStore = { documents: [], chunks: [] };
      }
    }
  }

  saveLocalStore() {
    try {
      fs.writeFileSync(LOCAL_STORE_FILE, JSON.stringify(this.localStore, null, 2), 'utf-8');
    } catch (err) {
      console.error('[VectorService] Failed to persist local vector store:', err);
    }
  }

  /**
   * Save a document and its embedded chunks
   */
  async saveDocumentWithChunks({ document, chunks }) {
    if (this.storeType === 'supabase' && this.supabase) {
      const { data: docData, error: docErr } = await this.supabase
        .from('documents')
        .upsert({
          file_name: document.fileName,
          file_type: document.fileType,
          file_size_bytes: document.fileSize,
          file_hash: document.fileHash,
          total_chunks: chunks.length,
          metadata: document.metadata || {},
          status: 'processed'
        })
        .select()
        .single();

      if (docErr) throw docErr;

      const chunkRows = chunks.map((c) => ({
        document_id: docData.id,
        chunk_index: c.chunkIndex,
        content: c.content,
        embedding: c.embedding,
        metadata: c.metadata
      }));

      const { error: chunkErr } = await this.supabase.from('document_chunks').insert(chunkRows);
      if (chunkErr) throw chunkErr;

      return { documentId: docData.id, chunkCount: chunks.length };
    }

    if (this.storeType === 'postgres' && this.pgPool) {
      const client = await this.pgPool.connect();
      try {
        await client.query('BEGIN');
        const docRes = await client.query(
          `INSERT INTO documents (file_name, file_type, file_size_bytes, file_hash, total_chunks, metadata)
           VALUES ($1, $2, $3, $4, $5, $6)
           ON CONFLICT (file_hash) DO UPDATE SET total_chunks = EXCLUDED.total_chunks, updated_at = NOW()
           RETURNING id`,
          [document.fileName, document.fileType, document.fileSize, document.fileHash, chunks.length, document.metadata || {}]
        );
        const docId = docRes.rows[0].id;

        await client.query('DELETE FROM document_chunks WHERE document_id = $1', [docId]);

        for (const c of chunks) {
          await client.query(
            `INSERT INTO document_chunks (document_id, chunk_index, content, embedding, metadata)
             VALUES ($1, $2, $3, $4, $5)`,
            [docId, c.chunkIndex, c.content, `[${c.embedding.join(',')}]`, c.metadata]
          );
        }
        await client.query('COMMIT');
        return { documentId: docId, chunkCount: chunks.length };
      } catch (err) {
        await client.query('ROLLBACK');
        throw err;
      } finally {
        client.release();
      }
    }

    // Memory / Local Store Execution
    const existingDocIdx = this.localStore.documents.findIndex((d) => d.fileHash === document.fileHash);
    const docId = existingDocIdx >= 0 ? this.localStore.documents[existingDocIdx].id : 'doc_' + Date.now();

    const docRecord = {
      id: docId,
      fileName: document.fileName,
      fileType: document.fileType,
      fileSize: document.fileSize,
      fileHash: document.fileHash,
      totalChunks: chunks.length,
      metadata: document.metadata || {},
      updatedAt: new Date().toISOString()
    };

    if (existingDocIdx >= 0) {
      this.localStore.documents[existingDocIdx] = docRecord;
      this.localStore.chunks = this.localStore.chunks.filter((c) => c.documentId !== docId);
    } else {
      this.localStore.documents.push(docRecord);
    }

    for (const c of chunks) {
      this.localStore.chunks.push({
        id: 'chk_' + Math.random().toString(36).substring(2, 9),
        documentId: docId,
        fileName: document.fileName,
        chunkIndex: c.chunkIndex,
        content: c.content,
        embedding: c.embedding,
        metadata: c.metadata
      });
    }

    this.saveLocalStore();
    return { documentId: docId, chunkCount: chunks.length };
  }

  /**
   * Perform hybrid vector and keyword search to retrieve top-K most relevant chunks
   */
  async hybridSearch({ queryText, queryEmbedding, topK = 5, threshold = 0.50 }) {
    // 1. Supabase Hybrid RPC
    if (this.storeType === 'supabase' && this.supabase) {
      try {
        const { data, error } = await this.supabase.rpc('match_documents_hybrid', {
          query_text: queryText,
          query_embedding: queryEmbedding,
          match_count: topK,
          similarity_threshold: threshold,
          vector_weight: config.ragHybridVectorWeight,
          keyword_weight: config.ragHybridKeywordWeight
        });
        if (!error && data && data.length > 0) {
          return data.map((d) => ({
            chunkId: d.chunk_id,
            documentId: d.document_id,
            fileName: d.file_name,
            content: d.content,
            metadata: d.metadata,
            similarity: d.similarity
          }));
        }
      } catch (err) {
        console.warn('[VectorService] Supabase search failed, falling back to local:', err.message);
      }
    }

    // 2. Direct PostgreSQL Search
    if (this.storeType === 'postgres' && this.pgPool) {
      try {
        const res = await this.pgPool.query(
          `SELECT * FROM match_documents_hybrid($1, $2, $3, $4, $5, $6)`,
          [
            queryText,
            `[${queryEmbedding.join(',')}]`,
            topK,
            threshold,
            config.ragHybridVectorWeight,
            config.ragHybridKeywordWeight
          ]
        );
        if (res.rows && res.rows.length > 0) {
          return res.rows.map((r) => ({
            chunkId: r.chunk_id,
            documentId: r.document_id,
            fileName: r.file_name,
            content: r.content,
            metadata: r.metadata,
            similarity: parseFloat(r.similarity)
          }));
        }
      } catch (err) {
        console.warn('[VectorService] Postgres search failed, falling back to local:', err.message);
      }
    }

    // 3. High-Precision Local In-Memory Hybrid Search
    const scoredChunks = [];
    const vectorWeight = config.ragHybridVectorWeight;
    const keywordWeight = config.ragHybridKeywordWeight;

    for (const chunk of this.localStore.chunks) {
      const vecSim = cosineSimilarity(queryEmbedding, chunk.embedding);
      const kwScore = keywordRelevance(queryText, chunk.content);
      const combinedScore = vecSim * vectorWeight + kwScore * keywordWeight;

      if (vecSim >= threshold || combinedScore >= threshold) {
        scoredChunks.push({
          chunkId: chunk.id,
          documentId: chunk.documentId,
          fileName: chunk.fileName,
          content: chunk.content,
          metadata: chunk.metadata,
          similarity: Number(vecSim.toFixed(4)),
          finalScore: Number(combinedScore.toFixed(4))
        });
      }
    }

    scoredChunks.sort((a, b) => b.finalScore - a.finalScore);
    return scoredChunks.slice(0, topK);
  }

  /**
   * List all stored documents
   */
  async listDocuments() {
    if (this.storeType === 'supabase' && this.supabase) {
      const { data } = await this.supabase.from('documents').select('*').order('created_at', { ascending: false });
      return data || [];
    }
    return this.localStore.documents;
  }
}

export const vectorService = new VectorService();
