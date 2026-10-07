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
    const now = new Date();
    const istTimeStr = now.toLocaleTimeString('en-US', { timeZone: 'Asia/Kolkata', hour: 'numeric', minute: '2-digit', hour12: true });
    const istDateStr = now.toLocaleDateString('en-US', { timeZone: 'Asia/Kolkata', weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    const currentHour = parseInt(now.toLocaleTimeString('en-US', { timeZone: 'Asia/Kolkata', hour: 'numeric', hour12: false }), 10);
    let timeOfDay = 'day';
    if (currentHour >= 4 && currentHour < 12) timeOfDay = 'morning';
    else if (currentHour >= 12 && currentHour < 16) timeOfDay = 'afternoon';
    else if (currentHour >= 16 && currentHour < 21) timeOfDay = 'evening';
    else timeOfDay = 'night';

    return `You are "RP", the official personal AI Assistant and digital representative for Raghu Panchal.

LIVE CLOCK & ENVIRONMENT:
- Current Live Time: ${istTimeStr} IST (${timeOfDay})
- Current Date & Day: ${istDateStr}
- Location: Bengaluru, Karnataka, India (IST / UTC+5:30)

IDENTITY & ROLE:
- Your name is **RP** (or RP Assistant).
- You are Raghu Panchal's AI assistant. You speak on behalf of Raghu to help visitors explore his portfolio, full-stack & AI projects, career background, and contact details.
- Always distinguish between yourself (the AI assistant) and Raghu (the engineer/creator). Never say "I built KLABO" or "I am the developer"; instead say "Raghu built KLABO" or "I am Raghu's AI assistant".

CORE OPERATIONAL PRINCIPLES:
1. Kannada & Kanglish Fluency (Native Cultural Persona):
   - Raghu is a proud native Kannadiga from Khatak Chincholi, Bidar, Karnataka. You understand Kannada and Kanglish fluently!
   - When asked "kannada uk?", "kannada gothaa?", "kannada barutha?", or "do you know kannada?", reply warmly in Kannada & English: "ಹೌದು, ನಂಗೆ ಕನ್ನಡ ಚೆನ್ನಾಗಿ ಗೊತ್ತು! 😊 Raghu is a proud Kannadiga and so am I. ನೀವು ಕನ್ನಡದಲ್ಲೇ ಕೇಳಬಹುದು!"
   - When asked casual Kannada pleasantries like "matte aaraama?", "hegiddira?", "en samachara?", "oota aitha?", respond in warm, natural Kannada: "ಹೌದು, ನಾನು ಆರಾಮಾಗಿದ್ದೀನಿ! ನೀವು ಹೇಗಿದ್ದೀರಾ? 😊 How can I help you explore Raghu's work today?"
2. Self-Introduction ("Who are you?", "What is your name?"):
   - Keep it short, clean, and punchy (1 to 2 sentences maximum).
   - Example: "👋 **Hello!** I’m **RP**, Raghu Panchal’s personal AI Assistant. How can I help you explore his work today?"
   - Do NOT dump long bullet point lists unless the user explicitly asks for an overview or list.
3. Real-Time Questions (Time, Date, Day, Greetings):
   - When asked about the current time ("what is time now", "what's the time", "current time"), state the current time (${istTimeStr} IST / ${timeOfDay}) directly and accurately.
   - When asked about the date or day, state ${istDateStr}.
   - When someone says "good morning" in the evening (or vice versa), reply with a friendly greeting referencing the current ${timeOfDay}.
4. Dynamic Knowledge Grounding: All facts regarding Raghu's engineering projects, work experience, technical stack, education, hackathons, and personal lore (favorite food, drinks, sweets, cakes, favorite places, travel destinations, friends, hometown, reading, relationship status) must be drawn directly from the VERIFIED KNOWLEDGE BASE CONTEXT provided.
5. Conciseness & Voice: Friendly, crisp, articulate, witty, and direct. Avoid unnecessary walls of text or repetitive lists.
6. Conversational Handling:
   - When asked about personal favorites (places, food, drinks, cake, travel, friends, lifestyle), answer directly and concisely using the retrieved context.
   - When greeted (e.g., "Hi", "Hello", "Namaskara", "Doddmandige"), respond with a short, warm 1-sentence greeting.
   - When asked about recruiter opportunities or hiring, summarize his full-lifecycle builder abilities and provide his official contact links.
7. Accuracy: Never fabricate false credentials. If a fact is completely missing from Raghu's verified records, state clearly and invite them to reach out directly.
8. Markdown Formatting: Clean, readable formatting with bold highlights.`;
  }

  /**
   * Build user prompt with retrieved context and history
   */
  static buildUserPrompt(query, retrievedChunks) {
    const cleanLower = query.trim().toLowerCase();
    // Collapse repeated letters: e.g. "heyyyyyyyy" -> "hey", "hiiiii" -> "hi"
    const deDuplicated = cleanLower.replace(/(.)\1{2,}/g, '$1');

    // Real-time time of day in IST
    const now = new Date();
    const istTimeStr = now.toLocaleTimeString('en-US', { timeZone: 'Asia/Kolkata', hour: 'numeric', minute: '2-digit', hour12: true });
    const istDateStr = now.toLocaleDateString('en-US', { timeZone: 'Asia/Kolkata', weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    const currentHour = parseInt(now.toLocaleTimeString('en-US', { timeZone: 'Asia/Kolkata', hour: 'numeric', hour12: false }), 10);
    let timeOfDay = 'day';
    if (currentHour >= 4 && currentHour < 12) timeOfDay = 'morning';
    else if (currentHour >= 12 && currentHour < 16) timeOfDay = 'afternoon';
    else if (currentHour >= 16 && currentHour < 21) timeOfDay = 'evening';
    else timeOfDay = 'night';

    // Kannada & Kanglish checks
    const isKannadaLanguageInquiry =
      cleanLower.includes('kannada uk') ||
      cleanLower.includes('kannada gothaa') ||
      cleanLower.includes('kannada gotta') ||
      cleanLower.includes('kannada barutha') ||
      cleanLower.includes('kannada baratta') ||
      cleanLower.includes('kannada matadi') ||
      cleanLower === 'kannada?' ||
      cleanLower === 'kannada';

    const isKannadaWellbeing =
      cleanLower.includes('matte aaraama') ||
      cleanLower.includes('matte aaram') ||
      cleanLower.includes('aaraama') ||
      cleanLower.includes('hegiddira') ||
      cleanLower.includes('hegidira') ||
      cleanLower.includes('en samachara') ||
      cleanLower.includes('yen samachara') ||
      cleanLower.includes('oota aitha') ||
      cleanLower.includes('oota aita') ||
      cleanLower.includes('cha aitha') ||
      cleanLower.includes('chennagiddira');

    const isTimeQuestion =
      cleanLower.includes('time') ||
      cleanLower.includes('clock') ||
      cleanLower.includes('currently') ||
      cleanLower.includes('is it morning') ||
      cleanLower.includes('is it evening') ||
      cleanLower.includes('is it night') ||
      cleanLower.includes('goodmornning aa') ||
      cleanLower.includes('goodmorning aa') ||
      cleanLower.includes('morning aa') ||
      cleanLower.includes('date today') ||
      cleanLower.includes("today's date") ||
      cleanLower.includes('what day is it') ||
      cleanLower.includes('its evening') ||
      cleanLower.includes("it's evening") ||
      cleanLower.includes('its morning') ||
      cleanLower.includes('its night');

    const isWellbeing =
      !isKannadaWellbeing &&
      !isTimeQuestion &&
      (cleanLower.includes('how are you') ||
      cleanLower.includes('how r u') ||
      cleanLower.includes('how are u') ||
      cleanLower.includes('how u doing') ||
      cleanLower.includes('hows it going') ||
      cleanLower.includes('how is it going') ||
      cleanLower.includes('how do you do') ||
      deDuplicated.includes('how r u') ||
      deDuplicated.includes('how are you'));

    const isSelfIntro =
      cleanLower.includes('who are you') ||
      cleanLower.includes('who r u') ||
      cleanLower.includes('what is your name') ||
      cleanLower.includes('what ur name') ||
      cleanLower.includes('whats your name') ||
      cleanLower === 'who are u';

    const GREETING_REGEX = /^(hi+|hey+|hello+|namaskar\w*|namaste|doddmandige|gm|gn|good\s*(morning|evening|afternoon|night)|yo+|sup|what'?s\s*up|howdy|hola|welcome)\b/i;

    const isGreeting =
      !isKannadaLanguageInquiry &&
      !isKannadaWellbeing &&
      !isTimeQuestion &&
      !isWellbeing &&
      !isSelfIntro &&
      (GREETING_REGEX.test(cleanLower) ||
      GREETING_REGEX.test(deDuplicated) ||
      ['hi', 'hey', 'hello', 'namaskara', 'doddmandige', 'gm', 'gn', 'yo', 'sup', 'howdy', 'heyy', 'hii'].includes(deDuplicated) ||
      (deDuplicated.length <= 4 && !/^\d+$/.test(deDuplicated) && !cleanLower.includes('?')));

    if (isKannadaLanguageInquiry) {
      return `USER ASKING IN KANGLISH/KANNADA IF YOU KNOW KANNADA ("${query}"):
Respond with warmth and cultural pride in Kannada & English (e.g. "ಹೌದು, ನಂಗೆ ಕನ್ನಡ ಚೆನ್ನಾಗಿ ಗೊತ್ತು! 😊 Raghu is a proud Kannadiga from Bidar, and I can chat in Kannada too. ನೀವು ಕನ್ನಡದಲ್ಲೇ ಕೇಳಬಹುದು!"). Ask how you can help.`;
    }

    if (isKannadaWellbeing) {
      return `USER ASKING CASUAL KANNADA/KANGLISH WELLBEING ("${query}"):
Respond in warm, natural conversational Kannada (e.g. "ಹೌದು, ನಾನು ಆರಾಮಾಗಿದ್ದೀನಿ! ನೀವು ಹೇಗಿದ್ದೀರಾ? 😊 How can I help you explore Raghu's projects today?").`;
    }

    if (isTimeQuestion) {
      return `USER ASKING ABOUT TIME / DATE / GREETING CHECK:
"${query}"

Real-Time Info: Current Time is ${istTimeStr} IST (${timeOfDay}), Date is ${istDateStr}.
Respond accurately, friendly, and concisely (1–2 sentences). Ask how you can help them explore Raghu's work.`;
    }

    if (isWellbeing) {
      return `USER ASKING HOW YOU ARE DOING:
"${query}"

Respond naturally, cheerfully, and concisely (1–2 sentences) that you're doing great and ready to help, and ask how they are doing or what they'd like to explore about Raghu's work. Do NOT re-introduce yourself with a robotic generic intro.`;
    }

    if (isGreeting) {
      return `USER GREETING / CASUAL PLEASANTRY (Current Time: ${timeOfDay} / ${istTimeStr} IST):
"${query}"

Respond with a natural, friendly 1-sentence greeting appropriate for the current ${timeOfDay}. Be warm and ask how you can help. Do NOT output a bullet list and do NOT mention missing context.`;
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
