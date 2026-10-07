/**
 * Production Client for RP AI Assistant RAG Pipeline
 * Handles Server-Sent Events (SSE) streaming, session memory, and error recovery
 */

// Persistent Session ID generator
export function getOrCreateChatSession() {
  try {
    let sessId = sessionStorage.getItem('rp_rag_session_id');
    if (!sessId) {
      sessId = 'sess_' + Date.now() + '_' + Math.random().toString(36).substring(2, 9);
      sessionStorage.setItem('rp_rag_session_id', sessId);
    }
    return sessId;
  } catch (e) {
    return 'sess_fallback_' + Date.now();
  }
}

export function resetChatSession() {
  try {
    const newSessId = 'sess_' + Date.now() + '_' + Math.random().toString(36).substring(2, 9);
    sessionStorage.setItem('rp_rag_session_id', newSessId);
    return newSessId;
  } catch (e) {
    return 'sess_fallback_' + Date.now();
  }
}

/**
 * Send query to RAG streaming endpoint and invoke callbacks
 * @param {object} params
 * @param {string} params.message - User message
 * @param {string} params.sessionId - Session ID
 * @param {function} params.onToken - Token callback (chunk)
 * @param {function} params.onSources - Sources array callback
 * @param {function} params.onStatus - Status update callback
 * @param {function} params.onError - Error callback
 * @param {function} params.onDone - Completion callback
 */
export async function streamRAGResponse({
  message,
  sessionId,
  onToken,
  onSources,
  onStatus,
  onError,
  onDone
}) {
  try {
    const response = await fetch('/api/chat/stream', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ message, sessionId })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `Server responded with HTTP ${response.status}`);
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder('utf-8');
    let buffer = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n\n');
      buffer = lines.pop() || '';

      for (const block of lines) {
        if (!block.trim()) continue;

        let eventType = 'message';
        let eventData = null;

        const eventMatch = block.match(/^event:\s*(.+)$/m);
        const dataMatch = block.match(/^data:\s*(.+)$/m);

        if (eventMatch) eventType = eventMatch[1].trim();
        if (dataMatch) {
          try {
            eventData = JSON.parse(dataMatch[1].trim());
          } catch (e) {
            eventData = { raw: dataMatch[1] };
          }
        }

        if (eventType === 'token' && eventData?.token) {
          if (onToken) onToken(eventData.token);
        } else if (eventType === 'sources' && eventData?.sources) {
          if (onSources) onSources(eventData.sources);
        } else if (eventType === 'status' && eventData) {
          if (onStatus) onStatus(eventData);
        } else if (eventType === 'done') {
          if (onDone) onDone(eventData);
        } else if (eventType === 'error') {
          if (onError) onError(new Error(eventData?.message || 'Generation error'));
        }
      }
    }

    if (onDone) onDone();
  } catch (err) {
    console.error('[RAGClient] Streaming error:', err);
    if (onError) onError(err);
  }
}

/**
 * Clear conversation memory on backend
 */
export async function clearServerSession(sessionId) {
  try {
    await fetch('/api/chat/clear', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sessionId })
    });
  } catch (err) {
    console.warn('[RAGClient] Failed to clear server session:', err);
  }
}
