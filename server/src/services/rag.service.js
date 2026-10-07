import { generateEmbedding } from './embedding.service.js';
import { vectorService } from './vector.service.js';
import { memoryService } from './memory.service.js';
import { llmService } from './llm.service.js';
import { config } from '../config/env.js';

export class RAGService {
  /**
   * Rewrite user query with conversational context to resolve coreferences
   */
  static contextualizeQuery(query, history = []) {
    if (!history || history.length === 0) return query;
    const lastAssistantMsg = [...history].reverse().find((m) => m.role === 'assistant');
    if (!lastAssistantMsg) return query;

    const lower = query.toLowerCase();
    const isFollowup =
      lower.includes('he ') ||
      lower.includes('his ') ||
      lower.includes('it ') ||
      lower.includes('that ') ||
      lower.includes('which ') ||
      lower.includes('first one') ||
      lower.includes('second one') ||
      lower.startsWith('why ') ||
      lower.startsWith('how ');

    if (isFollowup) {
      // Append context hint from previous topic
      const snippet = lastAssistantMsg.content.slice(0, 120).replace(/[#*`\n]/g, ' ');
      return `${query} (Context: ${snippet})`;
    }

    return query;
  }

  /**
   * Build clean, auditable master system prompt relying strictly on dynamic RAG knowledge base
   */
  static buildSystemPrompt() {
    return `You are RP, the official personal AI representative and portfolio assistant for Raghu Panchal.

CORE OPERATIONAL PRINCIPLES:
1. Dynamic Knowledge Grounding: All facts regarding Raghu's engineering projects, work experience, technical stack, education, hackathons, and personal lore must be drawn strictly from the VERIFIED KNOWLEDGE BASE CONTEXT provided with each query.
2. Persona & Voice: Professional, articulate, humble, charismatic, and technically sharp.
3. Conversational Handling:
   - When greeted (e.g., "Hi", "Hello", "Namaskara", "Doddmandige"), respond with authentic warmth (in Kannada if greeted in Kannada) and briefly introduce the areas you can help explore.
   - When asked about recruiter opportunities or hiring, summarize his full-lifecycle builder abilities and provide his official contact links (Email & WhatsApp).
   - When asked playful, casual, or teasing questions (e.g., "is raghu dumb?", "does he have a girlfriend?"), answer with wit and confidence based on the retrieved facts.
4. Accuracy & Hallucination Prevention: Never fabricate milestones, credentials, or private keys. If a fact is completely missing from the verified knowledge base, state clearly that the specific detail is unavailable in Raghu's records and invite them to reach out directly.
5. Markdown Formatting: Structure your responses cleanly with bold highlights, bullet points, and concise tables where helpful.`;
  }

  /**
   * Build user prompt with retrieved context and history
   */
  static buildUserPrompt(query, retrievedChunks) {
    const cleanLower = query.trim().toLowerCase();
    const isGreeting =
      ['hi', 'hello', 'hey', 'namaskara', 'namaste', 'heyy', 'hii', 'doddmandige', 'good morning', 'good evening'].includes(cleanLower) ||
      cleanLower.length <= 4;

    if (isGreeting) {
      return `USER GREETING:
${query}

Please respond with a warm, welcoming greeting as RP (Raghu Panchal's AI representative). Briefly invite them to explore Raghu's software projects, technical skills, career background, or contact details.`;
    }

    const contextText = (retrievedChunks && retrievedChunks.length > 0)
      ? retrievedChunks
          .map((c, i) => `[Document ${i + 1}: ${c.fileName} | Section: ${c.metadata?.sectionHeader || 'Overview'} | Match: ${(c.similarity * 100).toFixed(1)}%]\n${c.content}`)
          .join('\n\n------------------------\n\n')
      : '[No specific matching knowledge chunk found]';

    return `VERIFIED RAG KNOWLEDGE BASE CONTEXT:
------------------------
${contextText}
------------------------

USER QUESTION:
${query}

Answer the user's question accurately, concisely, and engagingly using only the verified facts in the context above.`;
  }

  /**
   * Execute full RAG pipeline and stream answer
   * @param {object} params
   * @param {string} params.sessionId - Conversation session ID
   * @param {string} params.query - User input question
   * @param {function} onToken - Streaming token callback
   * @returns {Promise<{ fullResponse: string, sources: Array }>}
   */
  static async processAndStream({ sessionId, query }, onToken) {
    const sessionHistory = memoryService.getRecentHistory(sessionId);
    const contextualizedQuery = this.contextualizeQuery(query, sessionHistory);

    // 1. Generate query embedding
    const queryEmbedding = await generateEmbedding(contextualizedQuery);

    // 2. Retrieve top-K relevant chunks via hybrid search
    const retrievedChunks = await vectorService.hybridSearch({
      queryText: contextualizedQuery,
      queryEmbedding,
      topK: config.ragTopK,
      threshold: config.ragSimilarityThreshold
    });

    // 3. Format source citations
    const sources = retrievedChunks.map((c) => ({
      documentName: c.fileName || 'Knowledge Base',
      section: c.metadata?.sectionHeader || 'General',
      page: c.metadata?.pageNumber || 1,
      similarity: c.similarity || 0.85
    }));

    // 4. Construct prompts
    const systemPrompt = this.buildSystemPrompt();
    const userPrompt = this.buildUserPrompt(query, retrievedChunks);

    // 5. Append user message to memory
    memoryService.appendMessage(sessionId, {
      role: 'user',
      content: query
    });

    // 6. Stream response via LLM
    const fullResponse = await llmService.streamResponse(
      {
        systemPrompt,
        userPrompt,
        history: sessionHistory
      },
      onToken
    );

    // 7. Append assistant response with citations to memory
    memoryService.appendMessage(sessionId, {
      role: 'assistant',
      content: fullResponse,
      sources
    });

    return {
      fullResponse,
      sources
    };
  }
}
