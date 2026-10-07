import { GoogleGenerativeAI } from '@google/generative-ai';
import OpenAI from 'openai';
import { config } from '../config/env.js';

let geminiClient = null;
let openaiClient = null;

if (config.geminiApiKey) {
  try {
    geminiClient = new GoogleGenerativeAI(config.geminiApiKey);
  } catch (err) {
    console.warn('[EmbeddingService] Failed to initialize Gemini client:', err.message);
  }
}

if (config.openaiApiKey) {
  try {
    openaiClient = new OpenAI({ apiKey: config.openaiApiKey });
  } catch (err) {
    console.warn('[EmbeddingService] Failed to initialize OpenAI client:', err.message);
  }
}

/**
 * Deterministic local semantic embedding fallback for offline / test environments
 */
function generateLocalSemanticVector(text, dimensions = 1536) {
  const vector = new Array(dimensions).fill(0);
  const normalized = text.toLowerCase().trim();
  const words = normalized.split(/\s+/).filter(Boolean);

  if (words.length === 0) return vector;

  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    let hash = 0;
    for (let j = 0; j < word.length; j++) {
      hash = (hash << 5) - hash + word.charCodeAt(j);
      hash |= 0;
    }
    const idx1 = Math.abs(hash) % dimensions;
    const idx2 = Math.abs(hash * 31 + i) % dimensions;
    const idx3 = Math.abs((hash ^ 0x5f3759df) + word.length) % dimensions;

    vector[idx1] += 1.0;
    vector[idx2] += 0.5;
    vector[idx3] += 0.25;
  }

  // L2 Normalization
  let norm = 0;
  for (let i = 0; i < dimensions; i++) {
    norm += vector[i] * vector[i];
  }
  norm = Math.sqrt(norm);
  if (norm > 0) {
    for (let i = 0; i < dimensions; i++) {
      vector[i] /= norm;
    }
  }

  return vector;
}

/**
 * Generate embedding vector for a given text using configured provider
 * @param {string} text - The input text to embed
 * @returns {Promise<number[]>} Array of floating point vector numbers
 */
export async function generateEmbedding(text) {
  const sanitizedText = (text || '').replace(/\n+/g, ' ').trim();
  if (!sanitizedText) {
    return new Array(1536).fill(0);
  }

  // 1. Google Gemini Embeddings
  if (config.geminiApiKey && geminiClient) {
    try {
      const model = geminiClient.getGenerativeModel({ model: 'text-embedding-004' });
      const result = await model.embedContent(sanitizedText);
      if (result && result.embedding && result.embedding.values) {
        return result.embedding.values;
      }
    } catch (err) {
      console.warn('[EmbeddingService] Gemini embedding error, falling back:', err.message);
    }
  }

  // 2. OpenAI Embeddings
  if (config.openaiApiKey && openaiClient) {
    try {
      const response = await openaiClient.embeddings.create({
        model: config.openaiEmbeddingModel,
        input: sanitizedText
      });
      if (response && response.data && response.data[0]) {
        return response.data[0].embedding;
      }
    } catch (err) {
      console.warn('[EmbeddingService] OpenAI embedding error, falling back:', err.message);
    }
  }

  // 3. Fallback High-Density Local Vectorizer
  return generateLocalSemanticVector(sanitizedText, 1536);
}

/**
 * Generate embeddings for multiple text chunks in parallel batches
 * @param {string[]} texts - Array of chunk strings
 * @param {number} batchSize - Batch size
 * @returns {Promise<number[][]>}
 */
export async function generateEmbeddingsBatch(texts, batchSize = 10) {
  const embeddings = [];
  for (let i = 0; i < texts.length; i += batchSize) {
    const batch = texts.slice(i, i + batchSize);
    const batchPromises = batch.map((t) => generateEmbedding(t));
    const batchResults = await Promise.all(batchPromises);
    embeddings.push(...batchResults);
  }
  return embeddings;
}
