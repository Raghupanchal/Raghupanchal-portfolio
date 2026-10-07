import { RAGService } from '../services/rag.service.js';
import { memoryService } from '../services/memory.service.js';

export class ChatController {
  /**
   * SSE Streaming Chat Endpoint
   * POST /api/chat/stream
   */
  static async streamChat(req, res) {
    const { message, sessionId = 'sess_default' } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({ error: 'Message text is required.' });
    }

    // Set Server-Sent Events (SSE) headers
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache, no-transform');
    res.setHeader('Connection', 'keep-alive');
    res.setHeader('X-Accel-Buffering', 'no'); // Disable proxy buffering
    res.flushHeaders();

    const sendSSE = (event, data) => {
      res.write(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`);
    };

    try {
      sendSSE('status', { state: 'retrieving', message: 'Searching knowledge base...' });

      const { fullResponse, sources } = await RAGService.processAndStream(
        { sessionId, query: message.trim() },
        (token) => {
          sendSSE('token', { token });
        }
      );

      // Send citations & completion
      sendSSE('sources', { sources });
      sendSSE('done', { sessionId, length: fullResponse.length });
      res.end();
    } catch (err) {
      console.error('[ChatController] Stream error:', err);
      sendSSE('error', {
        message: 'An error occurred while generating the response. Please try again.'
      });
      res.end();
    }
  }

  /**
   * Get session message history
   * GET /api/chat/history?sessionId=xyz
   */
  static async getHistory(req, res) {
    const { sessionId = 'sess_default' } = req.query;
    const session = memoryService.getOrCreateSession(sessionId);
    return res.json({
      sessionId,
      messages: session.messages || []
    });
  }

  /**
   * Clear session history
   * POST /api/chat/clear
   */
  static async clearHistory(req, res) {
    const { sessionId = 'sess_default' } = req.body;
    memoryService.clearSession(sessionId);
    return res.json({ success: true, message: 'Session history reset successfully.' });
  }
}
