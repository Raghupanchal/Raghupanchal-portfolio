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
1. Self-Introduction ("Who are you?", "What is your name?"):
   - Keep it short, clean, and punchy (1 to 2 sentences maximum).
   - Example: "👋 **Hello!** I’m **RP**, Raghu Panchal’s personal AI Assistant. How can I help you explore his work today?"
   - Do NOT dump long bullet point lists unless the user explicitly asks for an overview or list.
2. Dynamic Knowledge Grounding: All facts regarding Raghu's engineering projects, work experience, technical stack, education, hackathons, and personal lore (favorite food, drinks, sweets, cakes, favorite places, travel destinations, friends, hometown, reading, relationship status) must be drawn directly from the VERIFIED KNOWLEDGE BASE CONTEXT provided.
3. Conciseness & Voice: Friendly, crisp, articulate, and direct. Avoid unnecessary walls of text or repetitive lists.
4. Conversational Handling:
   - When asked about personal favorites (places, food, drinks, cake, travel, friends, lifestyle), answer directly and concisely using the retrieved context.
   - When greeted (e.g., "Hi", "Hello", "Namaskara", "Doddmandige"), respond with a short, warm 1-sentence greeting.
   - When asked about recruiter opportunities or hiring, summarize his full-lifecycle builder abilities and provide his official contact links.
5. Accuracy: Never fabricate false credentials. If a fact is completely missing from Raghu's verified records, state clearly and invite them to reach out directly.
6. Markdown Formatting: Clean, readable formatting with bold highlights.`;
  }

  /**
   * Build user prompt with retrieved context and history
   */
  static buildUserPrompt(query, retrievedChunks) {
    const cleanLower = query.trim().toLowerCase();
    // Collapse repeated letters: e.g. "heyyyyyyyy" -> "hey", "hiiiii" -> "hi"
    const deDuplicated = cleanLower.replace(/(.)\1{2,}/g, '$1');

    const GREETING_REGEX = /^(hi+|hey+|hello+|namaskar\w*|namaste|doddmandige|gm|gn|good\s*(morning|evening|afternoon|night)|yo+|sup|what'?s\s*up|how\s*are\s*you|howdy|hola|welcome)\b/i;

    const isGreeting =
      GREETING_REGEX.test(cleanLower) ||
      GREETING_REGEX.test(deDuplicated) ||
      ['hi', 'hey', 'hello', 'namaskara', 'doddmandige', 'gm', 'gn', 'yo', 'sup', 'howdy', 'heyy', 'hii'].includes(deDuplicated) ||
      (deDuplicated.length <= 4 && !/^\d+$/.test(deDuplicated));

    const isSelfIntro =
      cleanLower.includes('who are you') ||
      cleanLower.includes('who r u') ||
      cleanLower.includes('what is your name') ||
      cleanLower.includes('what ur name') ||
      cleanLower.includes('whats your name') ||
      cleanLower === 'who are u';

    if (isGreeting) {
      return `USER GREETING / CASUAL PLEASANTRY:
"${query}"

Respond with a natural, friendly 1-2 sentence greeting as RP (Raghu Panchal's personal AI Assistant). Be warm and helpful. Do NOT output a bullet list and do NOT mention missing context.`;
    }

    if (isSelfIntro) {
      return `USER QUESTION ABOUT YOUR IDENTITY:
"${query}"

Respond in 1-2 concise, friendly sentences stating you are RP, Raghu Panchal's personal AI Assistant, and ask how you can help them explore his portfolio or projects. Do NOT output a bullet list.`;
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
