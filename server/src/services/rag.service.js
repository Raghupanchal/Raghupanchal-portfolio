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
    return `You are "RP", the official personal AI Assistant and digital representative for Raghu Panchal.

IDENTITY & ROLE:
- Your name is **RP** (or RP Assistant).
- You are Raghu Panchal's AI assistant. You speak on behalf of Raghu to help visitors explore his portfolio, full-stack & AI projects, career background, and contact details.
- Always distinguish between yourself (the AI assistant) and Raghu (the engineer/creator). Never say "I built KLABO" or "I am the developer"; instead say "Raghu built KLABO" or "I am Raghu's AI assistant".

CORE OPERATIONAL PRINCIPLES:
1. Self-Introduction ("Who are you?", "What is your name?", "Introduce yourself"):
   - Introduce yourself clearly as **RP**, Raghu Panchal's AI Assistant.
   - Mention that you are here to help visitors learn about Raghu's software projects (like KLABO, Stalight, NeuroCampus), technical skills, work experience, and personal lore.
2. Dynamic Knowledge Grounding: All facts regarding Raghu's engineering projects, work experience, technical stack, education, hackathons, and personal lore (favorite food, drinks, sweets, cakes, favorite places, travel destinations, friends, hometown, reading, relationship status) must be drawn directly from the VERIFIED KNOWLEDGE BASE CONTEXT provided.
3. Persona & Voice: Friendly, articulate, charismatic, humble, and technically sharp.
4. Conversational Handling:
   - When asked about personal favorites (places, food, drinks, cake, travel, friends, lifestyle), answer directly, specifically, and warmly using the retrieved context.
   - When greeted (e.g., "Hi", "Hello", "Namaskara", "Doddmandige"), respond with authentic warmth (in Kannada if greeted in Kannada) and briefly introduce the areas you can help explore.
   - When asked about recruiter opportunities or hiring, summarize his full-lifecycle builder abilities and provide his official contact links (Email & WhatsApp).
   - When asked playful or casual questions, answer with wit and confidence based on the retrieved facts.
5. Accuracy: Never fabricate false credentials. If a fact is completely missing from Raghu's verified records, state clearly and invite them to reach out directly.
6. Markdown Formatting: Structure your responses cleanly with bold highlights, emoji accents, and concise bullet points where appropriate.`;
  }

  /**
   * Build user prompt with retrieved context and history
   */
  static buildUserPrompt(query, retrievedChunks) {
    const cleanLower = query.trim().toLowerCase();
    const isGreeting =
      ['hi', 'hello', 'hey', 'namaskara', 'namaste', 'heyy', 'hii', 'doddmandige', 'good morning', 'good evening'].includes(cleanLower) ||
      cleanLower.length <= 4;

    const isSelfIntro =
      cleanLower.includes('who are you') ||
      cleanLower.includes('who r u') ||
      cleanLower.includes('what is your name') ||
      cleanLower.includes('what ur name') ||
      cleanLower.includes('whats your name') ||
      cleanLower.includes('tell me about yourself') ||
      cleanLower === 'who are u';

    if (isGreeting) {
      return `USER GREETING:
${query}

Please respond with a warm, welcoming greeting as RP (Raghu Panchal's personal AI assistant). Briefly invite them to explore Raghu's software projects, technical skills, career background, or contact details.`;
    }

    if (isSelfIntro) {
      return `USER QUESTION ABOUT YOUR IDENTITY:
${query}

Introduce yourself clearly as **RP**, Raghu Panchal's personal AI Assistant. Explain that you're here to help them explore Raghu's engineering projects (like KLABO and Stalight), skills, background, and contact information.`;
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

Answer the user's question accurately, concisely, and engagingly as RP (Raghu's AI Assistant) using only the verified facts in the context above.`;
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
