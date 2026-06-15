'use client';

import { Play, PlayCircle, Code2, CheckCircle2, Lock, ChevronLeft, Download, MessageSquare, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useState, use } from 'react';

// Mock data for the current lesson
const currentLesson = {
  id: 'l1',
  title: 'O que é um algoritmo?',
  description: 'Nesta aula fundacional, você entenderá o conceito por trás da palavra algoritmo. Descubra como usamos algoritmos todos os dias na vida real e como traduzir esse pensamento para a lógica computacional de forma clara e estruturada.',
  duration: '15m',
  type: 'video',
  videoUrl: '#',
};

// Mock data for the sidebar module
const currentModule = {
  id: 'm1',
  title: 'Decolagem: Lógica de Programação',
  lessons: [
    { id: 'l1', title: 'O que é um algoritmo?', type: 'video', duration: '15m', status: 'completed' },
    { id: 'l2', title: 'Variáveis e Tipos de Dados', type: 'video', duration: '22m', status: 'completed' },
    { id: 'l3', title: 'Estruturas Condicionais', type: 'video', duration: '18m', status: 'in_progress' },
    { id: 'l4', title: 'Desafio Prático: Calculadora', type: 'exercise', duration: '30m', status: 'locked' },
  ]
};

export default function LessonPlayerPage({ params }: { params: Promise<{ slug: string, lessonId: string }> }) {
  const { slug, lessonId } = use(params);
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="lesson-player-page">
      <div className="breadcrumb">
        <Link href="/tracks">Trilhas</Link> <ChevronRight size={14} /> 
        <Link href={`/tracks/${slug}`}>Fundamentos</Link> <ChevronRight size={14} /> 
        <span>{currentLesson.title}</span>
      </div>

      <div className="lesson-player-layout">
        {/* Main Content (Video & Tabs) */}
        <div className="lesson-main-content">
          <div className="video-container">
            <div className="video-mock">
              <button className="play-button-mock">
                <Play size={32} fill="currentColor" className="ml-1" />
              </button>
              <span className="text-[var(--text-secondary)] font-medium mt-2">Clique para iniciar a aula</span>
            </div>
          </div>

          <div className="lesson-tabs">
            <div className="lesson-tabs-header">
              <button 
                className={`lesson-tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
                onClick={() => setActiveTab('overview')}
              >
                Visão Geral
              </button>
              <button 
                className={`lesson-tab-btn ${activeTab === 'material' ? 'active' : ''}`}
                onClick={() => setActiveTab('material')}
              >
                Material Complementar
              </button>
              <button 
                className={`lesson-tab-btn ${activeTab === 'qa' ? 'active' : ''}`}
                onClick={() => setActiveTab('qa')}
              >
                Fórum de Dúvidas
              </button>
            </div>

            <div className="lesson-tab-content">
              {activeTab === 'overview' && (
                <div className="animate-fade-in">
                  <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">{currentLesson.title}</h2>
                  <p className="text-[var(--text-secondary)] leading-relaxed">{currentLesson.description}</p>
                </div>
              )}
              {activeTab === 'material' && (
                <div className="animate-fade-in flex flex-col gap-3">
                  <div className="card flex-between !p-4">
                    <div className="flex items-center gap-3">
                      <Download size={20} className="text-[var(--accent-indigo)]" />
                      <span className="font-medium">Slides da Aula (PDF)</span>
                    </div>
                    <button className="btn btn-secondary btn-sm">Baixar</button>
                  </div>
                  <div className="card flex-between !p-4">
                    <div className="flex items-center gap-3">
                      <Code2 size={20} className="text-[var(--accent-indigo)]" />
                      <span className="font-medium">Repositório de Exemplos (GitHub)</span>
                    </div>
                    <button className="btn btn-secondary btn-sm">Acessar</button>
                  </div>
                </div>
              )}
              {activeTab === 'qa' && (
                <div className="animate-fade-in flex flex-col items-center justify-center p-8 text-center border border-dashed border-[var(--glass-border)] rounded-xl">
                  <MessageSquare size={48} className="text-[var(--text-tertiary)] mb-4" />
                  <h3 className="text-lg font-bold mb-2">Nenhuma dúvida ainda!</h3>
                  <p className="text-[var(--text-secondary)] mb-4">Seja o primeiro a perguntar algo sobre esta aula.</p>
                  <button className="btn btn-primary">Nova Pergunta</button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar (Lesson List) */}
        <aside className="lesson-sidebar">
          <div className="card lesson-sidebar-card">
            <div className="lesson-sidebar-header">
              <span className="lesson-sidebar-label">Módulo Atual</span>
              <h3 className="lesson-sidebar-title">{currentModule.title}</h3>
            </div>
            
            <div className="lesson-sidebar-list">
              {currentModule.lessons.map((lesson) => {
                const isActive = lesson.id === currentLesson.id;
                const isLocked = lesson.status === 'locked';
                
                return (
                  <div 
                    key={lesson.id} 
                    className={`lesson-sidebar-item ${isActive ? 'active' : ''} ${isLocked ? 'locked' : ''}`}
                  >
                    <div className="lesson-sidebar-item-icon">
                      {lesson.status === 'completed' && <CheckCircle2 size={16} className="text-[var(--accent-green)]" />}
                      {lesson.status === 'in_progress' && (lesson.type === 'video' ? <PlayCircle size={16} className={isActive ? 'text-[var(--accent-indigo)]' : ''} /> : <Code2 size={16} />)}
                      {lesson.status === 'locked' && <Lock size={16} />}
                    </div>
                    <div className="lesson-sidebar-item-content">
                      <span className="lesson-sidebar-item-title">
                        {lesson.title}
                      </span>
                      <span className="lesson-sidebar-item-duration">{lesson.duration}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
