'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, Bot, Sparkles, User as UserIcon } from 'lucide-react';
import { mentorMessages, currentUser } from '@/lib/mock-data';

export default function MentorPage() {
  const [messages, setMessages] = useState(mentorMessages);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim()) return;

    const newMessage = {
      id: Date.now().toString(),
      role: 'user' as const,
      content: input,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setInput('');
    setIsTyping(true);

    // Mock AI response
    setTimeout(() => {
      const aiResponse = {
        id: (Date.now() + 1).toString(),
        role: 'assistant' as const,
        content: 'Entendi! Para testarmos isso na prática, que tal tentarmos criar um pequeno código usando channels e goroutines juntos? Posso te passar um desafio rápido se quiser.',
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, aiResponse]);
      setIsTyping(false);
    }, 2000);
  };

  // Helper function to render basic markdown-like content
  const renderMessageContent = (content: string) => {
    // Basic formatting for the mock data
    const formatted = content
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>');
    
    return <div dangerouslySetInnerHTML={{ __html: formatted }} />;
  };

  return (
    <div className="mentor-page">
      <header className="page-header animate-fade-in">
        <div className="header-title">
          <div className="mentor-avatar">
            <Bot size={24} />
          </div>
          <div>
            <h1>Mentor IA <span className="badge badge-purple">Atlas</span></h1>
            <p>Seu guia pessoal para evolução técnica. Tire dúvidas, peça code reviews ou dicas de carreira.</p>
          </div>
        </div>
      </header>

      <div className="chat-container card animate-scale-in">
        <div className="chat-messages">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`message-wrapper ${message.role === 'user' ? 'message-user' : 'message-ai'}`}
            >
              <div className="message-avatar">
                {message.role === 'user' ? (
                  currentUser.displayName[0]
                ) : (
                  <Sparkles size={16} />
                )}
              </div>
              <div className="message-content">
                <div className="message-bubble">
                  {renderMessageContent(message.content)}
                </div>
                <span className="message-time">
                  {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="message-wrapper message-ai">
              <div className="message-avatar">
                <Sparkles size={16} />
              </div>
              <div className="message-content">
                <div className="message-bubble typing-indicator">
                  <span>.</span><span>.</span><span>.</span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <form className="chat-input-area" onSubmit={handleSend}>
          <input
            type="text"
            className="input chat-input"
            placeholder="Pergunte ao Atlas..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            type="submit"
            className="btn btn-primary send-btn"
            disabled={!input.trim() || isTyping}
          >
            <Send size={18} />
          </button>
        </form>
      </div>

      <style jsx>{`
        .mentor-page {
          max-width: 900px;
          margin: 0 auto;
          height: calc(100vh - 120px);
          display: flex;
          flex-direction: column;
        }

        .page-header {
          margin-bottom: 1.5rem;
          flex-shrink: 0;
        }

        .header-title {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .mentor-avatar {
          width: 48px;
          height: 48px;
          border-radius: var(--radius-lg);
          background: var(--gradient-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          box-shadow: var(--shadow-glow-purple);
        }

        .page-header h1 {
          font-size: 1.5rem;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 0.25rem;
        }

        .page-header p {
          font-size: 0.875rem;
          color: var(--text-secondary);
        }

        .chat-container {
          flex: 1;
          display: flex;
          flex-direction: column;
          padding: 0;
          overflow: hidden;
        }

        .chat-messages {
          flex: 1;
          overflow-y: auto;
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .message-wrapper {
          display: flex;
          gap: 1rem;
          max-width: 85%;
        }

        .message-user {
          align-self: flex-end;
          flex-direction: row-reverse;
        }

        .message-avatar {
          width: 32px;
          height: 32px;
          border-radius: var(--radius-full);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.75rem;
          font-weight: 700;
          flex-shrink: 0;
        }

        .message-user .message-avatar {
          background: var(--bg-tertiary);
          color: var(--text-primary);
          border: 1px solid var(--border-default);
        }

        .message-ai .message-avatar {
          background: var(--gradient-primary);
          color: white;
        }

        .message-content {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .message-user .message-content {
          align-items: flex-end;
        }

        .message-bubble {
          padding: 1rem 1.25rem;
          border-radius: var(--radius-lg);
          font-size: 0.9375rem;
          line-height: 1.5;
        }

        .message-bubble :global(strong) {
          color: var(--accent-purple-light);
        }

        .message-bubble :global(pre) {
          background: var(--bg-primary);
          padding: 1rem;
          border-radius: var(--radius-md);
          margin-top: 0.75rem;
          overflow-x: auto;
          border: 1px solid var(--border-default);
        }

        .message-bubble :global(code) {
          font-family: var(--font-mono);
          font-size: 0.875rem;
          color: var(--accent-cyan-light);
        }

        .message-ai .message-bubble {
          background: var(--bg-tertiary);
          border: 1px solid var(--border-default);
          border-top-left-radius: 4px;
        }

        .message-user .message-bubble {
          background: var(--gradient-primary);
          color: white;
          border-top-right-radius: 4px;
        }

        .message-time {
          font-size: 0.7rem;
          color: var(--text-tertiary);
          margin: 0 0.25rem;
        }

        .chat-input-area {
          padding: 1rem 1.5rem;
          border-top: 1px solid var(--border-default);
          display: flex;
          gap: 0.75rem;
          background: var(--bg-card);
        }

        .chat-input {
          flex: 1;
          background: var(--bg-tertiary);
        }

        .send-btn {
          padding: 0 1.25rem;
        }

        .send-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .typing-indicator span {
          animation: blink 1.4s infinite both;
          font-size: 1.5rem;
          line-height: 1;
        }

        .typing-indicator span:nth-child(2) { animation-delay: 0.2s; }
        .typing-indicator span:nth-child(3) { animation-delay: 0.4s; }

        @keyframes blink {
          0% { opacity: 0.2; }
          20% { opacity: 1; }
          100% { opacity: 0.2; }
        }
      `}</style>
    </div>
  );
}
