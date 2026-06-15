'use client';

import { Mic, Video, Settings, Play, MessageSquare, VideoOff, MicOff, StopCircle } from 'lucide-react';
import { useState } from 'react';

export default function InterviewsPage() {
  const [isRecording, setIsRecording] = useState(false);

  return (
    <div className="interviews-page">
      <header className="page-header animate-fade-in">
        <div className="header-icon mx-auto">
          <Mic size={32} />
        </div>
        <h1>Entrevistas com IA</h1>
        <p>Pratique para entrevistas técnicas com nosso recrutador virtual.</p>
      </header>

      <div className="interview-workspace">
        {/* Left: Video Area */}
        <div className="video-area">
          <div className="video-container main-video glass-card">
            {/* Mock Interviewer Video */}
            <div className="interviewer-mock">
              <div className="ai-avatar">
                <div className="ai-rings" />
                <img src="https://api.dicebear.com/7.x/bottts/svg?seed=Recruiter" alt="AI Recruiter" />
              </div>
              <span className="name-tag">IA Recruiter (Senior Eng)</span>
            </div>
          </div>
          
          <div className="video-controls glass-card">
            <div className="control-group">
              <button className="icon-btn active"><Mic size={20} /></button>
              <button className="icon-btn"><VideoOff size={20} /></button>
              <button className="icon-btn"><Settings size={20} /></button>
            </div>
            <div className="control-group">
              {!isRecording ? (
                <button className="btn btn-primary" onClick={() => setIsRecording(true)}>
                  <Play size={16} /> Iniciar Entrevista
                </button>
              ) : (
                <button className="btn btn-danger" onClick={() => setIsRecording(false)}>
                  <StopCircle size={16} /> Encerrar
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Right: Chat / Feedback Area */}
        <div className="chat-area glass-card">
          <div className="chat-header">
            <MessageSquare size={18} /> Transcrição & Dicas
          </div>
          
          <div className="chat-messages">
            {isRecording ? (
              <>
                <div className="message ai-message">
                  <strong>IA:</strong> Olá! Vamos começar a entrevista. Fale-me sobre sua experiência com Arquitetura de Microsserviços.
                </div>
                <div className="message user-message">
                  <strong>Você:</strong> (Sua transcrição aparecerá aqui...)
                </div>
                <div className="typing-indicator">
                  <span></span><span></span><span></span>
                </div>
              </>
            ) : (
              <div className="empty-state">
                <p>Clique em "Iniciar Entrevista" para começar.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        .interviews-page {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          height: calc(100vh - var(--header-height) - 4rem);
        }

        .page-header {
          text-align: center;
          margin-bottom: 2rem;
        }

        .header-icon {
          width: 64px;
          height: 64px;
          background: var(--glass-bg);
          border: 1px solid var(--glass-border);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--accent-indigo);
          margin: 0 auto 1rem;
        }

        .page-header h1 {
          font-size: 2rem;
          margin-bottom: 0.5rem;
        }

        .page-header p {
          color: var(--text-secondary);
        }

        .interview-workspace {
          display: flex;
          gap: 1.5rem;
          flex: 1;
          min-height: 0;
        }

        .video-area {
          flex: 2;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .video-container {
          flex: 1;
          position: relative;
          background: rgba(0, 0, 0, 0.4);
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .interviewer-mock {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .ai-avatar {
          width: 120px;
          height: 120px;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(79, 70, 229, 0.1);
          border-radius: 50%;
        }

        .ai-avatar img {
          width: 80px;
          height: 80px;
          z-index: 2;
        }

        .ai-rings {
          position: absolute;
          inset: -20px;
          border: 1px solid rgba(79, 70, 229, 0.3);
          border-radius: 50%;
          animation: pulse 2s infinite cubic-bezier(0.4, 0, 0.6, 1);
        }

        @keyframes pulse {
          0% { transform: scale(0.8); opacity: 1; }
          100% { transform: scale(1.5); opacity: 0; }
        }

        .name-tag {
          position: absolute;
          bottom: 1rem;
          left: 1rem;
          background: rgba(0, 0, 0, 0.6);
          backdrop-filter: blur(4px);
          padding: 0.25rem 0.75rem;
          border-radius: var(--radius-sm);
          font-size: 0.75rem;
          font-weight: 500;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .video-controls {
          padding: 1rem 1.5rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .control-group {
          display: flex;
          gap: 1rem;
          align-items: center;
        }

        .icon-btn {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: 1px solid var(--glass-border);
          background: rgba(255, 255, 255, 0.05);
          color: var(--text-secondary);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s;
        }

        .icon-btn:hover {
          background: rgba(255, 255, 255, 0.1);
          color: var(--text-primary);
        }

        .icon-btn.active {
          background: rgba(16, 185, 129, 0.2);
          color: var(--accent-green);
          border-color: rgba(16, 185, 129, 0.4);
        }

        .btn-danger {
          background: rgba(239, 68, 68, 0.2);
          color: #fca5a5;
          border: 1px solid rgba(239, 68, 68, 0.4);
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.625rem 1.25rem;
          border-radius: var(--radius-md);
          font-weight: 600;
          font-size: 0.875rem;
          cursor: pointer;
          transition: all 0.2s;
        }

        .btn-danger:hover {
          background: rgba(239, 68, 68, 0.3);
        }

        .chat-area {
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .chat-header {
          padding: 1rem 1.5rem;
          border-bottom: 1px solid var(--glass-border);
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-weight: 600;
        }

        .chat-messages {
          flex: 1;
          padding: 1.5rem;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .empty-state {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-tertiary);
          text-align: center;
        }

        .message {
          padding: 1rem;
          border-radius: var(--radius-md);
          font-size: 0.875rem;
          line-height: 1.5;
        }

        .ai-message {
          background: rgba(79, 70, 229, 0.1);
          border-left: 3px solid var(--accent-indigo);
          color: var(--text-primary);
        }

        .user-message {
          background: rgba(255, 255, 255, 0.03);
          border-right: 3px solid var(--text-secondary);
          color: var(--text-secondary);
          align-self: flex-end;
          max-width: 80%;
        }

        .typing-indicator {
          display: flex;
          gap: 4px;
          padding: 1rem;
        }

        .typing-indicator span {
          width: 8px;
          height: 8px;
          background: var(--text-tertiary);
          border-radius: 50%;
          animation: bounce 1.4s infinite ease-in-out both;
        }

        .typing-indicator span:nth-child(1) { animation-delay: -0.32s; }
        .typing-indicator span:nth-child(2) { animation-delay: -0.16s; }

        @keyframes bounce {
          0%, 80%, 100% { transform: scale(0); }
          40% { transform: scale(1); }
        }
      `}</style>
    </div>
  );
}
