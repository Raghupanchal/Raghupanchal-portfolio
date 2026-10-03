import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import { getRPResponse, QUICK_PROMPTS } from '../utils/aiKnowledge';
import { trackChatMessage } from '../utils/chatTracker';
import rpBotIcon from '../assets/images/rp_bot_icon.png';

// Formatter for bold text, markdown lists, and links
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
        // Process bold text **text**
        const boldParts = part.split(/\*\*([^*]+)\*\*/g);
        return boldParts.map((subPart, subIdx) => {
          if (subIdx % 2 === 1) {
            return <strong key={subIdx} className="text-[#F3EEDF] font-bold">{subPart}</strong>;
          }
          return subPart;
        });
      }
      return part;
    });
  };

  const lines = text.split('\n');

  return (
    <div className="space-y-1.5 leading-relaxed text-xs sm:text-[13px] select-text">
      {lines.map((line, i) => {
        const trimmed = line.trim();
        if (trimmed.startsWith('- ') || trimmed.startsWith('• ')) {
          return (
            <div key={i} className="flex items-start gap-2 pl-0.5">
              <span className="text-amber-400 mt-0.5 font-bold text-xs">▹</span>
              <span className="flex-1">{renderFormattedText(trimmed.substring(2))}</span>
            </div>
          );
        }
        if (/^\d+\.\s/.test(trimmed)) {
          const num = trimmed.match(/^(\d+\.)\s/)[1];
          const rest = trimmed.replace(/^(\d+\.)\s/, '');
          return (
            <div key={i} className="flex items-start gap-2 pl-0.5">
              <span className="text-amber-400 font-mono text-xs font-bold">{num}</span>
              <span className="flex-1">{renderFormattedText(rest)}</span>
            </div>
          );
        }
        if (!trimmed) {
          return <div key={i} className="h-1" />;
        }
        return <p key={i}>{renderFormattedText(line)}</p>;
      })}
    </div>
  );
};

// Typewriter / Streaming Message Component
const TypewriterMessage = ({ text, isStreaming, onComplete, onTypingUpdate }) => {
  const [displayedLength, setDisplayedLength] = useState(isStreaming ? 0 : text.length);

  useEffect(() => {
    if (!isStreaming) {
      setDisplayedLength(text.length);
      return;
    }

    setDisplayedLength(0);
    let current = 0;
    // Dynamic typing speed: between 10ms and 25ms per step
    const stepSize = Math.max(1, Math.floor(text.length / 100));
    const speed = Math.max(10, Math.min(24, Math.floor(1200 / Math.max(text.length, 1))));

    const interval = setInterval(() => {
      current += stepSize;
      if (current >= text.length) {
        setDisplayedLength(text.length);
        clearInterval(interval);
        if (onComplete) onComplete();
      } else {
        setDisplayedLength(current);
        if (onTypingUpdate) onTypingUpdate();
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, isStreaming]);

  const displayedText = text.substring(0, displayedLength);

  return (
    <div className="relative">
      <FormattedMessage text={displayedText} />
      {isStreaming && displayedLength < text.length && (
        <span className="inline-block w-1.5 h-3 bg-amber-400 ml-1 animate-pulse align-middle" />
      )}
    </div>
  );
};

const RPAssistant = () => {
  const getInitialMessages = () => [
    {
      id: Date.now(),
      sender: 'bot',
      text: "🙏 **ನಮಸ್ಕಾರ್ರೀ ದೊಡ್ಡಮಂದಿಗೆ!** I'm **RP**, Raghu Panchal's personal AI representative. How can I help you today?",
      isStreaming: true
    }
  ];

  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState(getInitialMessages);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isTyping, isOpen]);

  const handleClose = () => {
    setIsOpen(false);
    setInput('');
    setIsTyping(false);
    // Reset conversation so next open starts completely anew
    setMessages(getInitialMessages());
  };

  const handleToggle = () => {
    if (isOpen) {
      handleClose();
    } else {
      setMessages(getInitialMessages());
      setInput('');
      setIsTyping(false);
      setIsOpen(true);
    }
  };

  const handleStreamingComplete = (msgId) => {
    setMessages((prev) =>
      prev.map((msg) => (msg.id === msgId ? { ...msg, isStreaming: false } : msg))
    );
  };

  const handleSend = (textToSend) => {
    const query = (textToSend || input).trim();
    if (!query) return;

    // Add user message
    const userMsgId = Date.now();
    const userMessage = { id: userMsgId, sender: 'user', text: query, isStreaming: false };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Natural typing indicator then streaming typewriter response
    setTimeout(() => {
      const botResponse = getRPResponse(query);
      const botMsgId = Date.now() + 1;
      setMessages((prev) => [
        ...prev,
        { id: botMsgId, sender: 'bot', text: botResponse, isStreaming: true }
      ]);
      setIsTyping(false);

      // Track visitor search query & send silent background email update
      trackChatMessage(query, botResponse);
    }, 400);
  };

  const handleReset = () => {
    setMessages(getInitialMessages());
  };

  return (
    <>
      {/* Floating RP Trigger Button (Bottom Right) */}
      <div className="fixed bottom-3.5 xs:bottom-4 sm:bottom-6 right-3.5 xs:right-4 sm:right-6 z-50">
        <motion.button
          type="button"
          onClick={handleToggle}
          animate={{ y: [0, -3, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label={isOpen ? "Close RP Assistant" : "Ask RP AI Assistant"}
          className={`flex items-center gap-2 xs:gap-2.5 px-3 xs:px-3.5 sm:px-4 py-1.5 xs:py-2 sm:py-2 rounded-full shadow-2xl transition-all duration-300 border ${
            isOpen
              ? 'bg-[#232018] border-amber-400 text-amber-300 shadow-amber-500/20'
              : 'bg-gradient-to-r from-[#1c1913] via-[#14120e] to-[#1c1913] border-[#464335]/90 hover:border-amber-400 text-[#F3EEDF] backdrop-blur-xl shadow-black/80 hover:shadow-amber-500/10'
          }`}
        >
          <div className="relative p-0.5 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 flex items-center justify-center flex-shrink-0">
            <img
              src={rpBotIcon}
              alt="RP AI"
              className="w-5 h-5 xs:w-6 xs:h-6 object-contain rounded-full"
            />
            <span className="absolute -top-0.5 -right-0.5 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
            </span>
          </div>

          <div className="flex items-center gap-1 xs:gap-1.5 text-xs font-mono font-bold tracking-wide">
            <span className="text-amber-300">RP</span>
            <span className="text-neutral-400">AI</span>
          </div>
        </motion.button>
      </div>

      {/* Expandable Chat Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-[60px] xs:bottom-[68px] sm:bottom-[78px] right-2 xs:right-3 sm:right-6 w-[calc(100vw-16px)] xs:w-[calc(100vw-24px)] sm:w-[410px] md:w-[430px] h-[min(520px,calc(100vh-80px))] bg-[#12100d]/95 backdrop-blur-2xl border border-amber-500/30 rounded-2xl sm:rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.9)] z-50 flex flex-col justify-between overflow-hidden font-sans"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-[#181611] border-b border-neutral-800/90 flex-shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="p-1 rounded-xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center">
                  <img
                    src={rpBotIcon}
                    alt="RP AI"
                    className="w-7 h-7 object-contain rounded-lg"
                  />
                </div>
                <div>
                  <div className="text-xs sm:text-sm font-bold text-[#F3EEDF] font-mono flex items-center gap-1.5 leading-tight">
                    <span>RP Assistant</span>
                    <span className="px-1.5 py-0.2 rounded bg-amber-400/10 text-amber-300 text-[10px] border border-amber-400/20">AI</span>
                  </div>
                  <div className="flex items-center gap-1 text-[10px] font-mono text-emerald-400 leading-none mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span>Ready · Raghu's Representative</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={handleReset}
                  className="p-1.5 rounded-lg text-neutral-400 hover:text-amber-300 hover:bg-[#221e16] transition-colors"
                  title="Clear Chat"
                >
                  <RestartAltIcon style={{ fontSize: 18 }} />
                </button>
                <button
                  type="button"
                  onClick={handleClose}
                  className="p-1.5 rounded-lg text-neutral-400 hover:text-rose-400 hover:bg-[#221e16] transition-colors"
                  title="Close Assistant"
                >
                  <CloseIcon style={{ fontSize: 18 }} />
                </button>
              </div>
            </div>

            {/* Chat Stream */}
            <div className="flex-1 p-3.5 sm:p-4 overflow-y-auto space-y-3 custom-scrollbar text-neutral-200 text-xs sm:text-sm">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start items-start'}`}
                >
                  {msg.sender === 'bot' && (
                    <div className="w-6 h-6 rounded-full bg-amber-400/10 border border-amber-400/30 flex items-center justify-center flex-shrink-0 mt-0.5 overflow-hidden">
                      <img src={rpBotIcon} alt="RP" className="w-5 h-5 object-contain" />
                    </div>
                  )}
                  <div
                    className={`max-w-[84%] rounded-2xl px-3.5 py-2.5 sm:py-3 shadow-md ${
                      msg.sender === 'user'
                        ? 'bg-gradient-to-r from-amber-500/25 to-amber-600/35 text-[#F3EEDF] border border-amber-400/40 rounded-br-none'
                        : 'bg-[#181611]/95 text-neutral-200 border border-[#464335]/70 rounded-tl-none'
                    }`}
                  >
                    {msg.sender === 'bot' ? (
                      <TypewriterMessage
                        text={msg.text}
                        isStreaming={msg.isStreaming}
                        onComplete={() => handleStreamingComplete(msg.id)}
                        onTypingUpdate={scrollToBottom}
                      />
                    ) : (
                      <FormattedMessage text={msg.text} />
                    )}
                  </div>
                </div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex items-start gap-2 justify-start">
                  <div className="w-6 h-6 rounded-full bg-amber-400/10 border border-amber-400/30 flex items-center justify-center flex-shrink-0 mt-0.5 overflow-hidden">
                    <img src={rpBotIcon} alt="RP" className="w-5 h-5 object-contain" />
                  </div>
                  <div className="bg-[#181611]/90 border border-[#464335]/60 rounded-2xl rounded-tl-none px-3.5 py-2.5 text-neutral-400 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-bounce"></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-bounce [animation-delay:0.2s]"></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-bounce [animation-delay:0.4s]"></span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Suggestions Chips (Scrollbar completely hidden) */}
            <div className="px-3 py-2 bg-[#15130f] border-t border-neutral-800/70 flex items-center gap-1.5 overflow-x-auto no-scrollbar flex-shrink-0">
              <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider mr-0.5 flex-shrink-0 flex items-center gap-1 select-none">
                <AutoAwesomeIcon style={{ fontSize: 11 }} /> Suggestions:
              </span>
              {QUICK_PROMPTS.map((prompt, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => handleSend(prompt)}
                  className="px-2.5 py-1 rounded-full bg-[#1f1c16] hover:bg-amber-400/20 text-neutral-300 hover:text-amber-200 text-[11px] font-mono border border-neutral-800 hover:border-amber-400/40 transition-colors flex-shrink-0 whitespace-nowrap select-none active:scale-95"
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
              className="flex items-center gap-2 p-2.5 sm:p-3 bg-[#181611] border-t border-neutral-800/90 flex-shrink-0"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask RP about Raghu..."
                className="flex-1 bg-[#0f0e0a] text-xs sm:text-sm text-neutral-200 placeholder-neutral-500 px-3.5 py-2.5 rounded-xl border border-neutral-800 focus:border-amber-400/60 focus:outline-none transition-colors"
              />
              <button
                type="submit"
                disabled={!input.trim()}
                className="p-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 disabled:opacity-30 disabled:hover:bg-amber-400 text-black font-bold transition-all shadow-md flex items-center justify-center flex-shrink-0"
                title="Send Message"
              >
                <SendIcon style={{ fontSize: 16 }} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default RPAssistant;
