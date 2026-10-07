import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { config } from '../config/env.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const SESSIONS_FILE = path.resolve(__dirname, '../../data/chat_sessions.json');

export class MemoryService {
  constructor() {
    this.sessions = new Map();
    this.loadFromDisk();
  }

  loadFromDisk() {
    if (fs.existsSync(SESSIONS_FILE)) {
      try {
        const raw = fs.readFileSync(SESSIONS_FILE, 'utf-8');
        const data = JSON.parse(raw);
        for (const [k, v] of Object.entries(data)) {
          this.sessions.set(k, v);
        }
      } catch (e) {
        this.sessions = new Map();
      }
    }
  }

  saveToDisk() {
    try {
      const obj = Object.fromEntries(this.sessions);
      fs.writeFileSync(SESSIONS_FILE, JSON.stringify(obj, null, 2), 'utf-8');
    } catch (e) {
      console.error('[MemoryService] Failed to save sessions:', e);
    }
  }

  /**
   * Get or create a session
   */
  getOrCreateSession(sessionId, metadata = {}) {
    if (!this.sessions.has(sessionId)) {
      this.sessions.set(sessionId, {
        sessionId,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        metadata,
        messages: []
      });
      this.saveToDisk();
    }
    return this.sessions.get(sessionId);
  }

  /**
   * Append a message to the session
   */
  appendMessage(sessionId, { role, content, sources = [] }) {
    const session = this.getOrCreateSession(sessionId);
    const msg = {
      id: 'msg_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
      role,
      content,
      sources,
      timestamp: new Date().toISOString()
    };
    session.messages.push(msg);
    session.updatedAt = new Date().toISOString();
    this.saveToDisk();
    return msg;
  }

  /**
   * Get recent conversation history for RAG context
   */
  getRecentHistory(sessionId, maxTurns = config.ragMaxHistoryTurns) {
    const session = this.sessions.get(sessionId);
    if (!session || !session.messages) return [];
    return session.messages.slice(-maxTurns * 2);
  }

  /**
   * Clear session history
   */
  clearSession(sessionId) {
    if (this.sessions.has(sessionId)) {
      const session = this.sessions.get(sessionId);
      session.messages = [];
      session.updatedAt = new Date().toISOString();
      this.saveToDisk();
      return true;
    }
    return false;
  }
}

export const memoryService = new MemoryService();
