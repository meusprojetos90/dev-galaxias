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


    </div>
  );
}
