import fs from 'fs';
import crypto from 'crypto';
import path from 'path';
import pdfParse from 'pdf-parse';
import mammoth from 'mammoth';

export class DocumentService {
  /**
   * Calculate SHA-256 hash of a buffer or string
   */
  static calculateHash(data) {
    return crypto.createHash('sha256').update(data).digest('hex');
  }

  /**
   * Extract text from various file types (PDF, DOCX, TXT, MD)
   * @param {string} filePath - Absolute or relative path to file
   * @param {string} originalName - Original filename
   * @returns {Promise<{ text: string, fileType: string, fileSize: number, fileHash: string }>}
   */
  static async extractTextFromFile(filePath, originalName) {
    const ext = path.extname(originalName || filePath).toLowerCase();
    const buffer = fs.readFileSync(filePath);
    const fileHash = this.calculateHash(buffer);
    const fileSize = buffer.length;

    let text = '';
    let fileType = ext.replace('.', '');

    switch (ext) {
      case '.pdf': {
        const pdfData = await pdfParse(buffer);
        text = pdfData.text;
        fileType = 'pdf';
        break;
      }

      case '.docx': {
        const docxResult = await mammoth.extractRawText({ buffer });
        text = docxResult.value;
        fileType = 'docx';
        break;
      }

      case '.md':
      case '.markdown': {
        text = buffer.toString('utf-8');
        fileType = 'md';
        break;
      }

      case '.txt':
      default: {
        text = buffer.toString('utf-8');
        fileType = 'txt';
        break;
      }
    }

    return {
      text: text.trim(),
      fileType,
      fileSize,
      fileHash
    };
  }
}
