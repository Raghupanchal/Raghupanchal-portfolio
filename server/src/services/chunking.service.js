/**
 * Intelligent Structural & Semantic Chunker
 * Designed for Markdown, PDF, DOCX, and text documents.
 * Preserves section headers, paragraph boundaries, and builds sliding window overlaps.
 */

export class ChunkingService {
  /**
   * Split document content into semantically rich chunks with metadata
   * @param {string} content - Raw document text or markdown
   * @param {object} options - Chunking configuration options
   * @returns {Array<{ chunkIndex: number, content: string, metadata: object }>}
   */
  static splitText(content, options = {}) {
    const {
      chunkSize = 650, // Approx 500-650 characters / 120-160 words
      chunkOverlap = 120,
      sourceFileName = 'unknown.md',
      collectionName = 'raghu_profile'
    } = options;

    if (!content || !content.trim()) {
      return [];
    }

    const sections = this.extractSections(content);
    const chunks = [];
    let globalIndex = 0;

    for (const section of sections) {
      const sectionHeader = section.header || 'General Overview';
      const sectionText = section.content.trim();

      if (!sectionText) continue;

      if (sectionText.length <= chunkSize) {
        // Fits comfortably within one chunk
        const enrichedContent = `[Source: ${sourceFileName} | Section: ${sectionHeader}]\n${sectionText}`;
        chunks.push({
          chunkIndex: globalIndex++,
          content: enrichedContent,
          metadata: {
            sourceFile: sourceFileName,
            sectionHeader,
            collectionName,
            chunkSize: enrichedContent.length,
            pageNumber: section.pageNumber || 1
          }
        });
      } else {
        // Split section with sliding window overlap
        const subChunks = this.splitParagraphs(sectionText, chunkSize, chunkOverlap);
        for (const sub of subChunks) {
          const enrichedContent = `[Source: ${sourceFileName} | Section: ${sectionHeader}]\n${sub}`;
          chunks.push({
            chunkIndex: globalIndex++,
            content: enrichedContent,
            metadata: {
              sourceFile: sourceFileName,
              sectionHeader,
              collectionName,
              chunkSize: enrichedContent.length,
              pageNumber: section.pageNumber || 1
            }
          });
        }
      }
    }

    return chunks;
  }

  /**
   * Split markdown text into structural sections based on markdown headers (# or ##)
   */
  static extractSections(markdownText) {
    const lines = markdownText.split(/\r?\n/);
    const sections = [];
    let currentHeader = 'Document Overview';
    let currentLines = [];

    for (const line of lines) {
      const trimmed = line.trim();
      if (trimmed.startsWith('# ') || trimmed.startsWith('## ') || trimmed.startsWith('### ')) {
        if (currentLines.length > 0) {
          sections.push({
            header: currentHeader,
            content: currentLines.join('\n').trim()
          });
          currentLines = [];
        }
        currentHeader = trimmed.replace(/^#+\s*/, '');
      } else {
        currentLines.push(line);
      }
    }

    if (currentLines.length > 0) {
      sections.push({
        header: currentHeader,
        content: currentLines.join('\n').trim()
      });
    }

    return sections;
  }

  /**
   * Split text into overlapping chunks along paragraph and sentence boundaries
   */
  static splitParagraphs(text, maxChars, overlapChars) {
    const paragraphs = text.split(/\n\s*\n/);
    const result = [];
    let currentChunk = '';

    for (const paragraph of paragraphs) {
      const p = paragraph.trim();
      if (!p) continue;

      if ((currentChunk + '\n\n' + p).length <= maxChars) {
        currentChunk = currentChunk ? currentChunk + '\n\n' + p : p;
      } else {
        if (currentChunk) {
          result.push(currentChunk.trim());
          // Create overlap from the end of currentChunk
          const words = currentChunk.split(/\s+/);
          const overlapWordCount = Math.min(words.length, Math.floor(overlapChars / 6));
          const overlap = words.slice(-overlapWordCount).join(' ');
          currentChunk = overlap + '\n\n' + p;
        } else {
          // Paragraph itself is larger than maxChars, split by sentences
          const sentences = p.match(/[^.!?]+[.!?]+(\s|$)/g) || [p];
          let sentenceChunk = '';
          for (const sentence of sentences) {
            if ((sentenceChunk + sentence).length <= maxChars) {
              sentenceChunk += sentence;
            } else {
              if (sentenceChunk) result.push(sentenceChunk.trim());
              sentenceChunk = sentence;
            }
          }
          if (sentenceChunk) currentChunk = sentenceChunk;
        }
      }
    }

    if (currentChunk && currentChunk.trim()) {
      result.push(currentChunk.trim());
    }

    return result;
  }
}
