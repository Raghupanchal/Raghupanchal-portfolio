import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { DocumentService } from '../services/document.service.js';
import { ChunkingService } from '../services/chunking.service.js';
import { generateEmbeddingsBatch } from '../services/embedding.service.js';
import { vectorService } from '../services/vector.service.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Primary knowledge base directory: portfolio-knowledge
const ROOT_KNOWLEDGE_DIR = path.resolve(__dirname, '../../../portfolio-knowledge');
const SERVER_KNOWLEDGE_DIR = path.resolve(__dirname, '../../knowledge_base');

const TARGET_DIR = fs.existsSync(ROOT_KNOWLEDGE_DIR) ? ROOT_KNOWLEDGE_DIR : SERVER_KNOWLEDGE_DIR;

/**
 * Recursively find all supported documents in a directory
 */
function getAllFilesRecursively(dirPath, arrayOfFiles = []) {
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      getAllFilesRecursively(fullPath, arrayOfFiles);
    } else {
      const ext = path.extname(entry.name).toLowerCase();
      if (['.md', '.txt', '.pdf', '.docx'].includes(ext)) {
        arrayOfFiles.push(fullPath);
      }
    }
  }

  return arrayOfFiles;
}

async function runIngestion() {
  console.log('=============================================================');
  console.log('🚀 Starting Knowledge Base Ingestion Pipeline');
  console.log(`📁 Scanning directory: ${TARGET_DIR}`);
  console.log('=============================================================\n');

  if (!fs.existsSync(TARGET_DIR)) {
    console.error(`❌ Knowledge directory not found at: ${TARGET_DIR}`);
    process.exit(1);
  }

  const allFilePaths = getAllFilesRecursively(TARGET_DIR);

  if (allFilePaths.length === 0) {
    console.warn('⚠️ No supported documents (.md, .txt, .pdf, .docx) found to ingest.');
    return;
  }

  let totalChunksIngested = 0;

  for (const filePath of allFilePaths) {
    const relativePath = path.relative(TARGET_DIR, filePath).replace(/\\/g, '/');
    console.log(`📄 Processing: ${relativePath}...`);

    try {
      const { text, fileType, fileSize, fileHash } = await DocumentService.extractTextFromFile(
        filePath,
        path.basename(filePath)
      );

      const chunks = ChunkingService.splitText(text, {
        sourceFileName: relativePath,
        collectionName: 'portfolio_knowledge'
      });

      console.log(`   ✂️  Created ${chunks.length} semantic chunks. Generating embeddings...`);

      const chunkTexts = chunks.map((c) => c.content);
      const embeddings = await generateEmbeddingsBatch(chunkTexts);

      const enrichedChunks = chunks.map((c, i) => ({
        ...c,
        embedding: embeddings[i]
      }));

      const res = await vectorService.saveDocumentWithChunks({
        document: {
          fileName: relativePath,
          fileType,
          fileSize,
          fileHash,
          metadata: {
            ingestedAt: new Date().toISOString(),
            collection: 'portfolio_knowledge',
            relativePath
          }
        },
        chunks: enrichedChunks
      });

      console.log(`   ✅ Ingested ${res.chunkCount} chunks into vector store.`);
      totalChunksIngested += res.chunkCount;
    } catch (err) {
      console.error(`   ❌ Failed to ingest ${relativePath}:`, err.message);
    }
  }

  console.log('\n=============================================================');
  console.log(`🎉 Ingestion Complete! Total documents: ${allFilePaths.length} | Chunks: ${totalChunksIngested}`);
  console.log('=============================================================');
}

runIngestion()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error('Fatal ingestion error:', err);
    process.exit(1);
  });
