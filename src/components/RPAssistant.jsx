import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import DescriptionIcon from '@mui/icons-material/Description';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import RefreshIcon from '@mui/icons-material/Refresh';
import { QUICK_PROMPTS } from '../utils/aiKnowledge';
import { trackChatMessage } from '../utils/chatTracker';
import {
  streamRAGResponse,
  getOrCreateChatSession,
  resetChatSession,
  clearServerSession
} from '../utils/ragClient';
import rpBotIcon from '../assets/images/rp_bot_icon.png';

// Formatter for bold text, markdown lists, headers, code blocks, and links
const FormattedMessage = ({ text }) => {
  const renderFormattedText = (content) => {
    // Process markdown links [text](url)
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = linkRegex.exec(content)) !== null) {
      if (match.index > lastIndex) {
        parts.push(content.substring(lastIndex, match.index));
      }
      parts.push(
        <a
          key={match.index}
          href={match[2]}
          target="_blank"
          rel="noopener noreferrer"
          className="text-amber-300 underline font-semibold hover:text-amber-200 transition-colors"
        >
          {match[1]}
        </a>
      );
      lastIndex = match.index + match[0].length;
    }
    if (lastIndex < content.length) {
      parts.push(content.substring(lastIndex));
    }

    return parts.map((part, idx) => {
      if (typeof part === 'string') {
        // Process inline code `code`
        const codeParts = part.split(/`([^`]+)`/g);
        return codeParts.map((subCode, cIdx) => {
          if (cIdx % 2 === 1) {
            return (
              <code
                key={cIdx}
                className="bg-[#0b0a08] text-amber-300 px-1 py-0.5 rounded font-mono text-[10.5px] border border-neutral-800"
              >
                {subCode}
              </code>
            );
          }
          // Process bold text **text**
          const boldParts = subCode.split(/\*\*([^*]+)\*\*/g);
          return boldParts.map((subPart, subIdx) => {
            if (subIdx % 2 === 1) {
              return (
                <strong key={subIdx} className="text-[#F3EEDF] font-bold">
                  {subPart}
                </strong>
              );
            }
            return subPart;
          });
        });
      }
      return part;
    });
  };

  const lines = text.split('\n');

  return (
    <div className="space-y-1 leading-relaxed text-[11.5px] sm:text-[12.5px] select-text">
      {lines.map((line, i) => {
        const trimmed = line.trim();

        // Code block lines
        if (trimmed.startsWith('```')) {
          return null;
        }

        // Markdown header
        if (trimmed.startsWith('### ')) {
          return (
            <h4 key={i} className="text-amber-300 font-bold font-mono text-[12px] pt-1">
              {renderFormattedText(trimmed.replace(/^###\s*/, ''))}
            </h4>
          );
        }
        if (trimmed.startsWith('## ')) {
          return (
            <h3 key={i} className="text-amber-300 font-bold font-mono text-[12.5px] pt-1.5 border-b border-amber-500/20 pb-0.5">
              {renderFormattedText(trimmed.replace(/^##\s*/, ''))}
            </h3>
          );
        }

        // Unordered list
        if (trimmed.startsWith('- ') || trimmed.startsWith('• ') || trimmed.startsWith('* ')) {
          return (
            <div key={i} className="flex items-start gap-1.5 pl-0.5">
              <span className="text-amber-400 mt-0.5 font-bold text-[10px]">▹</span>
              <span className="flex-1">{renderFormattedText(trimmed.replace(/^[-•*]\s*/, ''))}</span>
            </div>
          );
        }

        // Numbered list
        if (/^\d+\.\s/.test(trimmed)) {
          const num = trimmed.match(/^(\d+\.)\s/)[1];
          const rest = trimmed.replace(/^(\d+\.)\s/, '');
          return (
            <div key={i} className="flex items-start gap-1.5 pl-0.5">
              <span className="text-amber-400 font-mono text-[10px] font-bold">{num}</span>
              <span className="flex-1">{renderFormattedText(rest)}</span>
            </div>
          );
        }

        if (!trimmed) {
          return <div key={i} className="h-0.5" />;
        }
        return <p key={i}>{renderFormattedText(line)}</p>;
      })}
    </div>
  );
};

// Source Citations Collapsible Accordion Pill
const SourceCitations = ({ sources }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!sources || sources.length === 0) return null;

  // Filter unique sources
  const uniqueSources = Array.from(
    new Map(sources.map((s) => [`${s.documentName}-${s.section}`, s])).values()
  );

  return (
    <div className="mt-2 pt-1.5 border-t border-neutral-800/80">
      <button
        type="button"
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center gap-1 text-[10px] font-mono text-neutral-400 hover:text-amber-300 transition-colors"
      >
        <DescriptionIcon style={{ fontSize: 11 }} className="text-amber-400/80" />
        <span className="font-semibold">{uniqueSources.length} Verified Sources</span>
        {isExpanded ? (
          <KeyboardArrowUpIcon style={{ fontSize: 13 }} />
        ) : (
          <KeyboardArrowDownIcon style={{ fontSize: 13 }} />
        )}
      </button>

      {isExpanded && (
        <div className="mt-1.5 space-y-1">
          {uniqueSources.map((source, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between text-[9.5px] font-mono bg-[#100e0a] px-2 py-1 rounded border border-neutral-800 text-neutral-300"
            >
              <div className="truncate max-w-[210px] flex items-center gap-1">
                <span className="text-amber-400">📄</span>
                <span className="truncate">{source.documentName}</span>
                {source.section && (
                  <span className="text-neutral-500 truncate">({source.section})</span>
                )}
              </div>
              <span className="text-emerald-400 font-bold ml-1 flex-shrink-0">
                {Math.round((source.similarity || 0.88) * 100)}% Match
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const RPAssistant = () => {
  const getInitialMessages = () => [
    {
      id: Date.now(),
      sender: 'bot',
      text: "🙏 **ನಮಸ್ಕಾರ್ರೀ ದೊಡ್ಡಮಂದಿಗೆ!** I'm **RP**, Raghu Panchal's personal AI representative powered by live RAG retrieval. How can I help you today?",
      isStreaming: false,
      sources: []
    }
  ];

  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [sessionId, setSessionId] = useState(getOrCreateChatSession);
  const [messages, setMessages] = useState(getInitialMessages);
  const [hasError, setHasError] = useState(false);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isTyping, isOpen, statusMessage]);

  const handleClose = () => {
    setIsOpen(false);
    setInput('');
    setIsTyping(false);
    setStatusMessage('');
  };

  const handleToggle = () => {
    if (isOpen) {
      handleClose();
    } else {
      setIsOpen(true);
      setTimeout(scrollToBottom, 100);
    }
  };

  const handleReset = async () => {
    const newSessId = resetChatSession();
    setSessionId(newSessId);
    setMessages(getInitialMessages());
    setInput('');
    setIsTyping(false);
    setStatusMessage('');
    setHasError(false);
    await clearServerSession(sessionId);
  };

  const handleSend = async (textToSend) => {
    const query = (textToSend || input).trim();
    if (!query || isTyping) return;

    setHasError(false);
    const userMsgId = Date.now();
    const userMessage = { id: userMsgId, sender: 'user', text: query, isStreaming: false };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);
    setStatusMessage('Searching verified knowledge...');

    const botMsgId = Date.now() + 1;
    let accumulatedBotText = '';
    let retrievedSources = [];

    // Append initial empty bot message for real-time streaming
    setMessages((prev) => [
      ...prev,
      {
        id: botMsgId,
        sender: 'bot',
        text: '',
        isStreaming: true,
        sources: []
      }
    ]);

    await streamRAGResponse({
      message: query,
      sessionId,
      onToken: (token) => {
        setStatusMessage('');
        accumulatedBotText += token;
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === botMsgId ? { ...msg, text: accumulatedBotText } : msg
          )
        );
        scrollToBottom();
      },
      onSources: (sources) => {
        retrievedSources = sources || [];
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === botMsgId ? { ...msg, sources: retrievedSources } : msg
          )
        );
      },
      onStatus: (status) => {
        if (status?.message) {
          setStatusMessage(status.message);
        }
      },
      onError: (err) => {
        console.error('[RP Assistant] Chat error:', err);
        setIsTyping(false);
        setStatusMessage('');
        setHasError(true);
        const fallbackNotice =
          "⚠️ Unable to reach the AI engine right now. Please ensure the backend server is running on port 5000.\n\n" +
          "You can reach Raghu directly at [raghupanchal21@gmail.com](mailto:raghupanchal21@gmail.com) or WhatsApp at [+91 9380937502](https://wa.me/919380937502).";

        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === botMsgId
              ? {
                  ...msg,
                  text: accumulatedBotText || fallbackNotice,
                  isStreaming: false
                }
              : msg
          )
        );
      },
      onDone: () => {
        setIsTyping(false);
        setStatusMessage('');
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === botMsgId
              ? { ...msg, text: accumulatedBotText, isStreaming: false, sources: retrievedSources }
              : msg
          )
        );
        scrollToBottom();

        // Send audit telemetry log
        trackChatMessage(query, accumulatedBotText);
      }
    });
  };

  return (
    <>
      {/* Floating RP Trigger Button (Bottom Right) */}
      <div className="fixed bottom-3 sm:bottom-5 right-3 sm:right-6 z-50">
        <motion.button
          type="button"
          onClick={handleToggle}
          animate={{ y: [0, -2.5, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label={isOpen ? 'Close RP Assistant' : 'Ask RP AI Assistant'}
          className={`flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 rounded-full shadow-xl transition-all duration-300 border ${
            isOpen
              ? 'bg-[#1f1c16] border-amber-400 text-amber-300 shadow-amber-500/20'
              : 'bg-gradient-to-r from-[#171510] via-[#11100d] to-[#171510] border-[#3e3a2e] hover:border-amber-400/80 text-[#F3EEDF] backdrop-blur-xl shadow-black/80 hover:shadow-amber-500/10'
          }`}
        >
          <div className="relative w-6 h-6 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 flex items-center justify-center flex-shrink-0 overflow-hidden">
            <img
              src={rpBotIcon}
              alt="RP AI"
              className="w-5 h-5 object-contain rounded-full"
              style={{ width: '20px', height: '20px', maxWidth: '20px', maxHeight: '20px' }}
            />
            <span className="absolute -top-0.5 -right-0.5 flex h-1.5 w-1.5 sm:h-2 sm:w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 sm:h-2 sm:w-2 bg-emerald-400"></span>
            </span>
          </div>

          <div className="flex items-center gap-1 text-[11px] sm:text-xs font-mono font-bold tracking-wide">
            <span className="text-amber-300">RP</span>
            <span className="text-neutral-400">AI</span>
          </div>
        </motion.button>
      </div>

      {/* Expandable Chat Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.96 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-x-3 bottom-[54px] sm:inset-x-auto sm:left-auto sm:right-6 sm:bottom-[68px] w-auto sm:w-[365px] md:w-[385px] max-w-[420px] mx-auto sm:mx-0 h-[min(520px,calc(100dvh-70px))] sm:h-[495px] bg-[#12100d]/95 backdrop-blur-2xl border border-amber-500/30 rounded-2xl shadow-[0_16px_50px_rgba(0,0,0,0.85)] z-50 flex flex-col justify-between overflow-hidden font-sans"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-3.5 py-2.5 bg-[#171510] border-b border-neutral-800/80 flex-shrink-0">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-amber-400/10 border border-amber-400/30 flex items-center justify-center flex-shrink-0 overflow-hidden">
                  <img
                    src={rpBotIcon}
                    alt="RP AI"
                    className="w-5 h-5 sm:w-6 sm:h-6 object-contain rounded-md"
                    style={{ width: '20px', height: '20px', maxWidth: '24px', maxHeight: '24px' }}
                  />
                </div>
                <div>
                  <div className="text-[12px] sm:text-[12.5px] font-bold text-[#F3EEDF] font-mono flex items-center gap-1.5 leading-tight">
                    <span>RP Assistant</span>
                    <span className="px-1 py-0.2 rounded bg-amber-400/10 text-amber-300 text-[9px] font-mono border border-amber-400/20">
                      RAG · LLM
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-[9.5px] font-mono text-emerald-400 leading-none mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span>Active · Grounded AI Pipeline</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-0.5">
                <button
                  type="button"
                  onClick={handleReset}
                  className="w-6 h-6 flex items-center justify-center rounded-md text-neutral-400 hover:text-amber-300 hover:bg-neutral-800/60 transition-colors"
                  title="Clear Chat & Reset Session"
                >
                  <RestartAltIcon style={{ fontSize: 16 }} />
                </button>
                <button
                  type="button"
                  onClick={handleClose}
                  className="w-6 h-6 flex items-center justify-center rounded-md text-neutral-400 hover:text-rose-400 hover:bg-neutral-800/60 transition-colors"
                  title="Close Assistant"
                >
                  <CloseIcon style={{ fontSize: 16 }} />
                </button>
              </div>
            </div>

            {/* Chat Messages Stream */}
            <div className="flex-1 p-3 overflow-y-auto space-y-2.5 custom-scrollbar text-neutral-200 text-xs">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-1.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start items-start'}`}
                >
                  {msg.sender === 'bot' && (
                    <div className="w-5 h-5 rounded-full bg-amber-400/10 border border-amber-400/30 flex items-center justify-center flex-shrink-0 mt-0.5 overflow-hidden">
                      <img
                        src={rpBotIcon}
                        alt="RP"
                        className="w-4 h-4 object-contain"
                        style={{ width: '16px', height: '16px', maxWidth: '16px', maxHeight: '16px' }}
                      />
                    </div>
                  )}
                  <div
                    className={`max-w-[88%] rounded-2xl px-3.5 py-2.5 shadow-sm ${
                      msg.sender === 'user'
                        ? 'bg-gradient-to-r from-amber-600/30 to-amber-500/20 text-[#F3EEDF] border border-amber-400/35 rounded-br-xs'
                        : 'bg-[#181510] text-neutral-200 border border-[#3e3a2e]/70 rounded-tl-xs'
                    }`}
                  >
                    {msg.text ? (
                      <div>
                        <FormattedMessage text={msg.text} />
                        {msg.isStreaming && (
                          <span className="inline-block w-1.5 h-3 bg-amber-400 ml-1 animate-pulse align-middle" />
                        )}
                        {msg.sources && msg.sources.length > 0 && (
                          <SourceCitations sources={msg.sources} />
                        )}
                      </div>
                    ) : (
                      <div className="flex items-center gap-1.5 text-neutral-400 py-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-bounce"></span>
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-bounce [animation-delay:0.2s]"></span>
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-bounce [animation-delay:0.4s]"></span>
                        <span className="text-[10px] font-mono ml-1 text-amber-300/80">
                          {statusMessage || 'Thinking...'}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {/* Status or Typing Indicator */}
              {isTyping && statusMessage && (
                <div className="flex items-center gap-1.5 text-[10px] font-mono text-amber-300/70 pl-7">
                  <RefreshIcon className="animate-spin" style={{ fontSize: 12 }} />
                  <span>{statusMessage}</span>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Suggestions Chips */}
            <div className="px-3 py-1.5 bg-[#14120e] border-t border-neutral-800/70 flex items-center gap-1.5 overflow-x-auto no-scrollbar flex-shrink-0">
              <span className="text-[9px] font-mono text-neutral-500 uppercase tracking-wider mr-0.5 flex-shrink-0 flex items-center gap-0.5 select-none">
                <AutoAwesomeIcon style={{ fontSize: 10 }} />
                <span>Ask:</span>
              </span>
              {QUICK_PROMPTS.map((prompt, i) => (
                <button
                  key={i}
                  type="button"
                  disabled={isTyping}
                  onClick={() => handleSend(prompt)}
                  className="px-2.5 py-1 rounded-full bg-[#1c1912] hover:bg-amber-400/20 text-neutral-300 hover:text-amber-200 text-[10.5px] font-mono border border-neutral-800 hover:border-amber-400/40 transition-colors flex-shrink-0 whitespace-nowrap select-none active:scale-95 disabled:opacity-40"
                >
                  {prompt}
                </button>
              ))}
            </div>

            {/* Input Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-1.5 p-2.5 bg-[#171510] border-t border-neutral-800/80 flex-shrink-0"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask RP about Raghu..."
                disabled={isTyping}
                className="flex-1 bg-[#0c0b08] text-[12px] sm:text-[12.5px] text-neutral-200 placeholder-neutral-500 px-3 py-2 rounded-xl border border-neutral-800/90 focus:border-amber-400/60 focus:outline-none transition-colors disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={!input.trim() || isTyping}
                className="w-8 h-8 rounded-lg bg-amber-400 hover:bg-amber-300 disabled:opacity-25 disabled:hover:bg-amber-400 text-black font-bold transition-all shadow-md flex items-center justify-center flex-shrink-0 active:scale-95"
                title="Send Message"
              >
                <SendIcon style={{ fontSize: 14 }} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default RPAssistant;
