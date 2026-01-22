'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, Calendar } from 'lucide-react';
import {
  trackConversationStarted,
  trackMessageSent,
  trackMessageReceived,
  trackCTAShown,
  trackCTAClickedInChat,
} from '@/utils/analytics';
import {
  getSessionId,
  initializeSession,
  logMessage,
  markCTAShown,
  markCTAClicked,
} from '@/utils/conversationLogger';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface ChatInterfaceProps {
  suggestedQuestions?: string[];
}

export default function ChatInterface({
  suggestedQuestions = [
    "Show me examples of measurable impact Rithwik created as a PM?",
    "How does Rithwik approach building AI-powered products?",
    "Walk me through a product Rithwik built from 0 to 1?"
  ]
}: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showCalendlyCTA, setShowCalendlyCTA] = useState(false);
  const [sessionId] = useState(() => getSessionId());
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to latest message
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Initialize session on mount
  useEffect(() => {
    initializeSession(sessionId);
    trackConversationStarted(sessionId);
  }, [sessionId]);

  // Show Calendly CTA after 2 user messages
  useEffect(() => {
    const userMessageCount = messages.filter(m => m.role === 'user').length;
    if (userMessageCount >= 2 && !showCalendlyCTA) {
      setShowCalendlyCTA(true);
      markCTAShown(sessionId);
      trackCTAShown(sessionId);
    }
  }, [messages, showCalendlyCTA, sessionId]);

  const sendMessage = async (messageText: string) => {
    if (!messageText.trim() || isLoading) return;

    const userMessage: Message = {
      role: 'user',
      content: messageText.trim(),
      timestamp: new Date()
    };

    // Add user message immediately
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Track and log user message
    await logMessage(sessionId, 'user', messageText.trim());
    const userMessageCount = messages.filter(m => m.role === 'user').length + 1;
    trackMessageSent(sessionId, userMessageCount);
    const startTime = Date.now();

    try {
      // Call Google Gemini-powered API
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: messageText.trim(),
          conversationHistory: messages.slice(-6) // Last 3 turns (6 messages)
        }),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      // Handle streaming response
      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (!reader) {
        throw new Error('No reader available');
      }

      // Create assistant message placeholder
      let assistantMessage = '';
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: '',
        timestamp: new Date()
      }]);

      // Stream response chunks
      while (true) {
        const { done, value } = await reader.read();
        
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        assistantMessage += chunk;

        // Update the last message (assistant) with streaming content
        setMessages(prev => [
          ...prev.slice(0, -1),
          {
            role: 'assistant',
            content: assistantMessage,
            timestamp: new Date()
          }
        ]);
      }

      // Track and log assistant message
      const responseTime = Date.now() - startTime;
      await logMessage(sessionId, 'assistant', assistantMessage, {
        responseTime,
        modelUsed: 'gemini-2.0-flash-exp',
      });
      trackMessageReceived(sessionId, responseTime);

    } catch (error) {
      console.error('Chat error:', error);
      
      // Add error message
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: "I'm having trouble connecting right now. Please try again in a moment.",
        timestamp: new Date()
      }]);
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const handleSuggestedQuestion = (question: string) => {
    setInput(question);
    setTimeout(() => sendMessage(question), 100);
  };

  const handleCTAClick = () => {
    markCTAClicked(sessionId);
    trackCTAClickedInChat(sessionId);
  };

  return (
    <div className="w-full max-w-3xl mx-auto space-y-6">
      {/* Chat Messages */}
      {messages.length > 0 && (
        <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 scroll-smooth">
          {messages.slice(-4).map((message, index) => (
            <div
              key={index}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              style={{
                animation: 'fadeInUp 0.4s ease-out'
              }}
            >
              <div
                className={`max-w-[85%] px-6 py-4 rounded-3xl ${
                  message.role === 'user'
                    ? 'bg-gradient-to-r from-[#FF6B6B] to-[#4ECDC4] text-white'
                    : 'bg-white/[0.08] backdrop-blur-xl border border-white/10 text-white/90'
                }`}
                style={{
                  boxShadow: message.role === 'user' 
                    ? '0 8px 32px rgba(255,107,107,0.3)' 
                    : '0 8px 32px rgba(0,0,0,0.2)'
                }}
              >
                <p className="text-[17px] leading-[1.7] whitespace-pre-wrap">
                  {message.content}
                </p>
              </div>
            </div>
          ))}
          
          {/* Typing Indicator */}
          {isLoading && (
            <div className="flex justify-start">
              <div className="px-6 py-4 bg-white/[0.08] backdrop-blur-xl border border-white/10 rounded-3xl">
                <div className="flex gap-2">
                  {[0, 1, 2].map((i) => (
                    <div
                      key={i}
                      className="w-2 h-2 bg-white/60 rounded-full"
                      style={{
                        animation: `bounce 1.4s infinite ease-in-out`,
                        animationDelay: `${i * 0.16}s`
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      )}

      {/* Suggested Questions (only show if no messages yet) */}
      {messages.length === 0 && (
        <div className="space-y-3">
          {suggestedQuestions.map((question, index) => (
            <button
              key={index}
              onClick={() => handleSuggestedQuestion(question)}
              className="w-full px-6 py-4 bg-white/[0.04] backdrop-blur-xl border border-white/10 rounded-2xl text-left text-white/80 hover:bg-white/[0.08] hover:border-white/20 transition-all duration-300 hover:scale-[1.02]"
              style={{
                animation: `fadeInUp 0.5s ease-out ${index * 0.1}s backwards`
              }}
            >
              <div className="flex items-center gap-3">
                <Sparkles className="w-4 h-4 text-[#FF6B6B]" />
                <span className="text-[15px]">{question}</span>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Calendly CTA (appears after 2 messages) */}
      {showCalendlyCTA && (
        <div
          className="p-6 bg-gradient-to-r from-[#4ECDC4]/20 to-[#95E1D3]/20 backdrop-blur-xl border-2 border-[#4ECDC4]/30 rounded-3xl"
          style={{
            animation: 'scaleIn 0.5s ease-out'
          }}
        >
          <div className="flex items-start gap-4">
            <div className="p-3 bg-[#4ECDC4]/20 rounded-2xl">
              <Calendar className="w-6 h-6 text-[#4ECDC4]" />
            </div>
            <div className="flex-1">
              <h3 className="text-[20px] font-bold text-white mb-2">
                Want to dive deeper?
              </h3>
              <p className="text-white/70 mb-4 text-[15px] leading-relaxed">
                Let's discuss how I can help your team ship AI products fast.
              </p>
              <a
                href="https://calendly.com/rithwikmavuluri/30min"
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleCTAClick}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#4ECDC4] to-[#95E1D3] text-[#0a0a0a] font-bold rounded-2xl hover:scale-105 transition-transform duration-300"
                style={{
                  boxShadow: '0 8px 32px rgba(78,205,196,0.4)'
                }}
              >
                <Calendar className="w-5 h-5" />
                Book a call
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="relative">
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="What would you like to know?"
          disabled={isLoading}
          className="w-full px-7 py-5 pr-16 bg-white/[0.08] backdrop-blur-xl border-2 border-white/15 rounded-[28px] text-white text-[16px] placeholder-white/40 focus:outline-none focus:border-[#FF6B6B] focus:bg-white/[0.12] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          style={{
            boxShadow: '0 8px 32px rgba(0,0,0,0.2)'
          }}
        />
        <button
          type="submit"
          disabled={!input.trim() || isLoading}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-3 bg-gradient-to-r from-[#FF6B6B] to-[#4ECDC4] rounded-full hover:scale-110 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          style={{
            boxShadow: '0 4px 16px rgba(255,107,107,0.4)'
          }}
        >
          <Send className="w-5 h-5 text-white" />
        </button>
      </form>

      {/* Animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes bounce {
          0%, 80%, 100% {
            transform: translateY(0);
          }
          40% {
            transform: translateY(-10px);
          }
        }

        /* Custom scrollbar */
        .overflow-y-auto::-webkit-scrollbar {
          width: 8px;
        }

        .overflow-y-auto::-webkit-scrollbar-track {
          background: rgba(255,255,255,0.05);
          border-radius: 10px;
        }

        .overflow-y-auto::-webkit-scrollbar-thumb {
          background: rgba(255,107,107,0.5);
          border-radius: 10px;
        }

        .overflow-y-auto::-webkit-scrollbar-thumb:hover {
          background: rgba(255,107,107,0.7);
        }
      `}</style>
    </div>
  );
}
