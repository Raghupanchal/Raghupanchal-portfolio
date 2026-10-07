import { GoogleGenerativeAI } from '@google/generative-ai';
import OpenAI from 'openai';
import { config } from '../config/env.js';

export class LLMService {
  constructor() {
    this.gemini = null;
    this.openai = null;
    this.groq = null;

    if (config.geminiApiKey) {
      try {
        this.gemini = new GoogleGenerativeAI(config.geminiApiKey);
      } catch (err) {
        console.warn('[LLMService] Gemini init failed:', err.message);
      }
    }

    if (config.openaiApiKey) {
      try {
        this.openai = new OpenAI({ apiKey: config.openaiApiKey });
      } catch (err) {
        console.warn('[LLMService] OpenAI init failed:', err.message);
      }
    }

    if (config.groqApiKey) {
      try {
        this.groq = new OpenAI({
          apiKey: config.groqApiKey,
          baseURL: 'https://api.groq.com/openai/v1'
        });
      } catch (err) {
        console.warn('[LLMService] Groq init failed:', err.message);
      }
    }
  }

  /**
   * Stream LLM response chunk-by-chunk using the active provider
   * @param {object} params
   * @param {string} params.systemPrompt - Grounding system prompt
   * @param {string} params.userPrompt - User question with retrieved context
   * @param {Array} params.history - Multi-turn conversation messages
   * @param {function} onToken - Callback for streaming token strings
   * @returns {Promise<string>} Full assembled text
   */
  async streamResponse({ systemPrompt, userPrompt, history = [] }, onToken) {
    const provider = config.llmProvider.toLowerCase();

    // 1. Google Gemini Streaming
    if (provider === 'gemini' && this.gemini) {
      try {
        const model = this.gemini.getGenerativeModel({
          model: config.geminiModel,
          systemInstruction: systemPrompt
        });

        // Format history for Gemini chat
        const formattedHistory = history
          .filter((m) => m.role === 'user' || m.role === 'assistant')
          .map((m) => ({
            role: m.role === 'assistant' ? 'model' : 'user',
            parts: [{ text: m.content }]
          }));

        const chat = model.startChat({ history: formattedHistory });
        const resultStream = await chat.sendMessageStream(userPrompt);

        let fullText = '';
        for await (const chunk of resultStream.stream) {
          const textChunk = chunk.text();
          if (textChunk) {
            fullText += textChunk;
            if (onToken) onToken(textChunk);
          }
        }
        return fullText;
      } catch (err) {
        console.error('[LLMService] Gemini streaming error:', err);
        throw err;
      }
    }

    // 2. OpenAI GPT Streaming
    if ((provider === 'openai' || !this.gemini) && this.openai) {
      try {
        const messages = [
          { role: 'system', content: systemPrompt },
          ...history.map((m) => ({ role: m.role, content: m.content })),
          { role: 'user', content: userPrompt }
        ];

        const stream = await this.openai.chat.completions.create({
          model: config.openaiChatModel,
          messages,
          stream: true,
          temperature: 0.3
        });

        let fullText = '';
        for await (const chunk of stream) {
          const token = chunk.choices[0]?.delta?.content || '';
          if (token) {
            fullText += token;
            if (onToken) onToken(token);
          }
        }
        return fullText;
      } catch (err) {
        console.error('[LLMService] OpenAI streaming error:', err);
        throw err;
      }
    }

    // 3. Groq Streaming with resilient model fallback
    if (provider === 'groq' && this.groq) {
      const candidateModels = [
        config.groqModel || 'openai/gpt-oss-20b',
        'openai/gpt-oss-20b',
        'qwen/qwen3.8-27b',
        'allam-2-7b',
        'openai/gpt-oss-120b'
      ];
      // Deduplicate candidate models
      const modelsToTry = [...new Set(candidateModels)];

      let lastError = null;
      for (const modelToUse of modelsToTry) {
        try {
          const messages = [
            { role: 'system', content: systemPrompt },
            ...history.map((m) => ({ role: m.role, content: m.content })),
            { role: 'user', content: userPrompt }
          ];

          const stream = await this.groq.chat.completions.create({
            model: modelToUse,
            messages,
            stream: true,
            temperature: 0.3
          });

          let fullText = '';
          for await (const chunk of stream) {
            const token = chunk.choices[0]?.delta?.content || '';
            if (token) {
              fullText += token;
              if (onToken) onToken(token);
            }
          }
          return fullText;
        } catch (err) {
          lastError = err;
          console.warn(`[LLMService] Groq model ${modelToUse} failed, trying fallback:`, err.message);
        }
      }

      console.error('[LLMService] All Groq fallback models failed:', lastError);
      throw lastError;
    }

    // 4. Standalone Fallback Generator (if API keys have not yet been placed in .env)
    const fallbackMessage =
      "⚠️ **LLM API Key Notice**: Please configure your `GEMINI_API_KEY` or `OPENAI_API_KEY` in `server/.env` to enable live generative AI responses.\n\n" +
      "Raghu Panchal's verified records have been indexed into the vector knowledge base and are ready for retrieval!";
    for (const char of fallbackMessage) {
      if (onToken) onToken(char);
      await new Promise((r) => setTimeout(r, 10));
    }
    return fallbackMessage;
  }
}

export const llmService = new LLMService();
