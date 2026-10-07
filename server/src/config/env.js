import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env from server root directory
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

export const config = {
  port: parseInt(process.env.PORT || '5000', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
  clientUrl: process.env.CLIENT_URL || 'http://localhost:5173',
  adminApiKey: process.env.ADMIN_API_KEY || 'raghu_admin_secret_key_2026',

  // LLM Provider Settings
  llmProvider: process.env.LLM_PROVIDER || 'gemini', // 'gemini' | 'openai' | 'groq'
  geminiApiKey: process.env.GEMINI_API_KEY || '',
  geminiModel: process.env.GEMINI_MODEL || 'gemini-1.5-flash',

  openaiApiKey: process.env.OPENAI_API_KEY || '',
  openaiChatModel: process.env.OPENAI_CHAT_MODEL || 'gpt-4o-mini',
  openaiEmbeddingModel: process.env.OPENAI_EMBEDDING_MODEL || 'text-embedding-3-small',

  groqApiKey: process.env.GROQ_API_KEY || '',
  groqModel: process.env.GROQ_MODEL || 'llama-3.3-70b-versatile',

  // Vector DB & Storage
  vectorStoreType: process.env.VECTOR_STORE_TYPE || 'memory', // 'supabase' | 'postgres' | 'memory'
  supabaseUrl: process.env.SUPABASE_URL || '',
  supabaseKey: process.env.SUPABASE_SERVICE_ROLE_KEY || '',
  databaseUrl: process.env.DATABASE_URL || '',

  // RAG Configuration
  ragTopK: parseInt(process.env.RAG_TOP_K || '5', 10),
  ragSimilarityThreshold: parseFloat(process.env.RAG_SIMILARITY_THRESHOLD || '0.52'),
  ragHybridVectorWeight: parseFloat(process.env.RAG_HYBRID_VECTOR_WEIGHT || '0.70'),
  ragHybridKeywordWeight: parseFloat(process.env.RAG_HYBRID_KEYWORD_WEIGHT || '0.30'),
  ragMaxHistoryTurns: parseInt(process.env.RAG_MAX_HISTORY_TURNS || '6', 10)
};
