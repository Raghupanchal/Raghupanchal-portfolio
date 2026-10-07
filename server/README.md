# 🤖 RP AI Assistant - LLM + RAG Production Engine

This is the production backend for **RP Assistant**, Raghu Panchal's personal AI representative, built with **LLM + RAG (Retrieval-Augmented Generation)**, PostgreSQL/pgvector/Supabase integration, multi-format document ingestion, and real-time Server-Sent Events (SSE) token streaming.

---

## 🏛️ Architecture Overview

- **Document Ingestion (`/server/src/services/document.service.js`)**:
  - Multi-format text extraction supporting **PDF**, **DOCX**, **TXT**, and **Markdown (`.md`)**.
  - Deduplication using SHA-256 file hashing.
- **Intelligent Chunking (`/server/src/services/chunking.service.js`)**:
  - Hierarchical semantic chunking preserving markdown headers and section boundaries.
  - Sliding window token overlap with rich metadata tags (`sourceFile`, `sectionHeader`, `pageNumber`).
- **Embeddings Pipeline (`/server/src/services/embedding.service.js`)**:
  - Multi-provider vector generator supporting Google Gemini `text-embedding-004`, OpenAI `text-embedding-3-small`, and local deterministic semantic vectorizer fallback.
- **Vector Database & Hybrid Search (`/server/src/services/vector.service.js`)**:
  - Supabase Vector RPC / PostgreSQL `pgvector` HNSW index + Full-Text Search (BM25) hybrid ranking.
  - High-precision local vector store with file persistence in `server/data/vector_store.json`.
- **RAG & Query Orchestration (`/server/src/services/rag.service.js`)**:
  - Conversational query rewriting and coreference resolution.
  - Strict grounding system persona (prevents hallucinations).
  - Source citations tracking (document name, page, similarity score).
- **LLM Streaming (`/server/src/services/llm.service.js`)**:
  - Server-Sent Events (SSE) streaming token-by-token supporting Google Gemini, OpenAI GPT-4o, and Groq Llama-3.3.
- **Conversational Memory (`/server/src/services/memory.service.js`)**:
  - Session and user isolation with turn-limiting.

---

## 🚀 Quick Start Guide

### 1. Configure Environment Variables
Copy `.env.example` to `.env` inside the `server/` directory:
```bash
cp server/.env.example server/.env
```
Fill in your chosen LLM provider key (`GEMINI_API_KEY`, `OPENAI_API_KEY`, or `GROQ_API_KEY`) and optional Supabase / PostgreSQL credentials.

### 2. Ingest Knowledge Documents
To index all markdown files, PDFs, or docs in `server/knowledge_base/`:
```bash
npm run server:ingest
```

### 3. Start Development Server
```bash
# Start backend on http://localhost:5000
npm run server:dev

# Start frontend in separate terminal
npm run dev
```

---

## 📡 API Endpoints

| Endpoint | Method | Description |
| :--- | :--- | :--- |
| `/api/chat/stream` | `POST` | Real-time SSE streaming answer generation with sources |
| `/api/chat/history` | `GET` | Get recent message history for a session |
| `/api/chat/clear` | `POST` | Reset conversation memory for a session |
| `/api/documents` | `GET` | List all indexed documents in knowledge base |
| `/api/documents/upload` | `POST` | Upload and dynamically chunk/embed new PDF/DOCX/MD document |
| `/api/health` | `GET` | System health and vector store stats |

---

## 🛡️ Security & Guardrails
- Strict Grounding Rules: Chatbot states when knowledge is unavailable instead of hallucinating.
- Server-side Secrets: API keys never exposed to the client.
- Rate Limiting: IP-based sliding window protection on chat stream and document upload endpoints.
- Admin Protection: Document ingestion API protected by `x-api-key` header.
