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


    </div>
  );
}
