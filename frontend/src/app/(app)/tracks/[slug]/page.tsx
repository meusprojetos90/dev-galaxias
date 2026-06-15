'use client';

import { PlayCircle, Lock, CheckCircle2, ChevronRight, BookOpen, Code2 } from 'lucide-react';
import Link from 'next/link';

import { use } from 'react';

// Mock data
const trackDetail = {
  id: 'fundamentos',
  title: 'Fundamentos da Galáxia',
  description: 'A base de tudo. Domine a lógica de programação, estruturas de dados e os princípios do desenvolvimento de software.',
  progress: 45,
  modules: [
    {
      id: 'm1',
      title: 'Decolagem: Lógica de Programação',
      status: 'completed',
      lessons: [
        { id: 'l1', title: 'O que é um algoritmo?', type: 'video', duration: '15m', status: 'completed' },
        { id: 'l2', title: 'Variáveis e Tipos de Dados', type: 'video', duration: '22m', status: 'completed' },
        { id: 'l3', title: 'Estruturas Condicionais', type: 'video', duration: '18m', status: 'completed' },
        { id: 'l4', title: 'Desafio Prático: Calculadora', type: 'exercise', duration: '30m', status: 'completed' },
      ]
    },
    {
      id: 'm2',
      title: 'Órbita: Estruturas de Repetição',
      status: 'in_progress',
      lessons: [
        { id: 'l5', title: 'Loops While e For', type: 'video', duration: '25m', status: 'completed' },
        { id: 'l6', title: 'Arrays e Listas', type: 'video', duration: '20m', status: 'in_progress' },
        { id: 'l7', title: 'Percorrendo Arrays', type: 'video', duration: '15m', status: 'locked' },
        { id: 'l8', title: 'Desafio Prático: Inventário', type: 'exercise', duration: '45m', status: 'locked' },
      ]
    },
    {
      id: 'm3',
      title: 'Gravidade: Funções',
      status: 'locked',
      lessons: [
        { id: 'l9', title: 'Criando sua primeira função', type: 'video', duration: '18m', status: 'locked' },
        { id: 'l10', title: 'Escopo e Retorno', type: 'video', duration: '24m', status: 'locked' },
      ]
    }
  ]
};

export default function TrackDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);

  return (
    <div className="track-detail-page">
      <div className="breadcrumb">
        <Link href="/tracks">Trilhas</Link> <ChevronRight size={14} /> <span>{trackDetail.title}</span>
      </div>

      <header className="track-header card animate-fade-in">
        <div className="track-header-content">
          <h1>{trackDetail.title}</h1>
          <p>{trackDetail.description}</p>
          
          <div className="track-overall-progress mt-6">
            <div className="flex-between mb-2">
              <span className="text-sm font-medium">Progresso da Trilha</span>
              <span className="text-sm font-bold text-accent-indigo">{trackDetail.progress}%</span>
            </div>
            <div className="progress-bar">
              <div className="progress-bar-fill" style={{ width: trackDetail.progress + '%' }} />
            </div>
          </div>
        </div>
      </header>

      <div className="modules-list stagger-children mt-8">
        {trackDetail.modules.map((mod, index) => (
          <div key={mod.id} className={`module-card card ${mod.status}`}>
            <div className="module-header">
              <div className="module-info">
                <span className="module-number">Módulo {index + 1}</span>
                <h2>{mod.title}</h2>
              </div>
              <div className="module-status-icon">
                {mod.status === 'completed' && <CheckCircle2 className="text-accent-green" />}
                {mod.status === 'locked' && <Lock className="text-text-muted" />}
              </div>
            </div>

            <div className="lessons-list">
              {mod.lessons.map(lesson => {
                const isLocked = lesson.status === 'locked';
                const Wrapper = isLocked ? 'div' : Link;
                const wrapperProps = isLocked ? {} : { href: `/tracks/${slug}/lessons/${lesson.id}` };

                return (
                  <Wrapper key={lesson.id} className={`lesson-item ${lesson.status}`} {...wrapperProps}>
                    <div className="lesson-icon">
                      {lesson.type === 'video' ? <PlayCircle size={18} /> : <Code2 size={18} />}
                    </div>
                    <div className="lesson-details">
                      <span className="lesson-title">{lesson.title}</span>
                      <span className="lesson-meta">{lesson.duration} • {lesson.type === 'video' ? 'Aula' : 'Exercício'}</span>
                    </div>
                    <div className="lesson-action">
                      {lesson.status === 'completed' && <CheckCircle2 size={18} className="text-accent-green" />}
                      {lesson.status === 'in_progress' && <button className="btn btn-primary btn-sm">Continuar</button>}
                      {lesson.status === 'locked' && <Lock size={16} className="text-text-muted" />}
                    </div>
                  </Wrapper>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
