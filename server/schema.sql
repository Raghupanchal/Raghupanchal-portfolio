-- =============================================================================
-- RAG AI Chatbot - PostgreSQL + pgvector Database Schema & Migrations
-- Designed for Raghu Panchal's RP Assistant Knowledge & Conversational Engine
-- =============================================================================

-- 1. Enable Required Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS vector;

-- 2. Knowledge Base Collections Table
CREATE TABLE IF NOT EXISTS knowledge_collections (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert Default Collection
INSERT INTO knowledge_collections (name, description)
VALUES ('raghu_profile', 'Verified portfolio, career, education, and project knowledge for Raghu Panchal')
ON CONFLICT (name) DO NOTHING;

-- 3. Documents Master Table
CREATE TABLE IF NOT EXISTS documents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    collection_id UUID REFERENCES knowledge_collections(id) ON DELETE SET NULL,
    file_name VARCHAR(255) NOT NULL,
    file_type VARCHAR(50) NOT NULL, -- 'pdf', 'docx', 'txt', 'md'
    file_size_bytes BIGINT DEFAULT 0,
    file_hash VARCHAR(64) NOT NULL UNIQUE, -- SHA-256 hash to prevent duplicate ingestion
    total_chunks INT DEFAULT 0,
    metadata JSONB DEFAULT '{}'::jsonb,
    status VARCHAR(50) DEFAULT 'processed', -- 'pending', 'processing', 'processed', 'failed'
    error_message TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Document Chunks Table with Vector Embeddings & Full-Text Search
CREATE TABLE IF NOT EXISTS document_chunks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    document_id UUID NOT NULL REFERENCES documents(id) ON DELETE CASCADE,
    collection_name VARCHAR(100) DEFAULT 'raghu_profile',
    chunk_index INT NOT NULL,
    content TEXT NOT NULL,
    content_tsv TSVECTOR GENERATED ALWAYS AS (to_tsvector('english', content)) STORED,
    embedding VECTOR(1536) NOT NULL, -- Standard 1536 dimensions (or 768 for Gemini text-embedding-004)
    metadata JSONB NOT NULL DEFAULT '{}'::jsonb, -- { source_file, page_number, section_header, chunk_size }
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Indexes for High-Performance Search
-- Fast Approximate Nearest Neighbor (HNSW) Cosine Distance Search Index
CREATE INDEX IF NOT EXISTS idx_document_chunks_embedding_hnsw 
ON document_chunks USING hnsw (embedding vector_cosine_ops)
WITH (m = 16, ef_construction = 64);

-- Full-Text Search GIN Index
CREATE INDEX IF NOT EXISTS idx_document_chunks_tsv 
ON document_chunks USING gin(content_tsv);

-- Metadata & Foreign Key Indexes
CREATE INDEX IF NOT EXISTS idx_document_chunks_doc_id 
ON document_chunks (document_id);

CREATE INDEX IF NOT EXISTS idx_document_chunks_metadata 
ON document_chunks USING gin(metadata);

-- 6. Chat Sessions Table (User/Session Isolation)
CREATE TABLE IF NOT EXISTS chat_sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    session_id VARCHAR(128) NOT NULL UNIQUE,
    visitor_id VARCHAR(128),
    visitor_meta JSONB DEFAULT '{}'::jsonb,
    title VARCHAR(255) DEFAULT 'New Conversation',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_chat_sessions_session_id ON chat_sessions (session_id);

-- 7. Chat Messages Table with Source Citations Tracking
CREATE TABLE IF NOT EXISTS chat_messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    session_id VARCHAR(128) NOT NULL REFERENCES chat_sessions(session_id) ON DELETE CASCADE,
    role VARCHAR(20) NOT NULL CHECK (role IN ('user', 'assistant', 'system')),
    content TEXT NOT NULL,
    sources JSONB DEFAULT '[]'::jsonb, -- [{ document_name, chunk_id, page_number, similarity, section }]
    tokens_used INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_chat_messages_session_id ON chat_messages (session_id);
CREATE INDEX IF NOT EXISTS idx_chat_messages_created_at ON chat_messages (created_at ASC);

-- =============================================================================
-- 8. Hybrid Search Stored Procedure (Cosine Vector Similarity + Full-Text Search)
-- =============================================================================
CREATE OR REPLACE FUNCTION match_documents_hybrid(
    query_text TEXT,
    query_embedding VECTOR(1536),
    match_count INT DEFAULT 5,
    similarity_threshold FLOAT DEFAULT 0.60,
    vector_weight FLOAT DEFAULT 0.70,
    keyword_weight FLOAT DEFAULT 0.30
)
RETURNS TABLE (
    chunk_id UUID,
    document_id UUID,
    content TEXT,
    metadata JSONB,
    similarity FLOAT,
    file_name VARCHAR
)
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN QUERY
    WITH vector_matches AS (
        SELECT 
            dc.id,
            1 - (dc.embedding <=> query_embedding) AS vec_score
        FROM document_chunks dc
        WHERE 1 - (dc.embedding <=> query_embedding) >= similarity_threshold
        ORDER BY dc.embedding <=> query_embedding ASC
        LIMIT match_count * 2
    ),
    text_matches AS (
        SELECT 
            dc.id,
            ts_rank_cd(dc.content_tsv, plainto_tsquery('english', query_text)) AS text_score
        FROM document_chunks dc
        WHERE dc.content_tsv @@ plainto_tsquery('english', query_text)
        ORDER BY text_score DESC
        LIMIT match_count * 2
    ),
    combined AS (
        SELECT 
            COALESCE(v.id, t.id) AS id,
            (COALESCE(v.vec_score, 0) * vector_weight + 
             COALESCE(t.text_score / (t.text_score + 1.0), 0) * keyword_weight) AS final_score,
            COALESCE(v.vec_score, 0) AS raw_similarity
        FROM vector_matches v
        FULL OUTER JOIN text_matches t ON v.id = t.id
    )
    SELECT 
        dc.id AS chunk_id,
        dc.document_id,
        dc.content,
        dc.metadata,
        c.raw_similarity AS similarity,
        d.file_name
    FROM combined c
    JOIN document_chunks dc ON dc.id = c.id
    JOIN documents d ON d.id = dc.document_id
    ORDER BY c.final_score DESC
    LIMIT match_count;
END;
$$;
