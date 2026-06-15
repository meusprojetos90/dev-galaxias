'use client';

import { useState } from 'react';
import { Search, Filter, Code2, Clock, CheckCircle2, Circle, Lock } from 'lucide-react';
import { exercises } from '@/lib/mock-data';
import { getDifficultyColor, getDifficultyLabel } from '@/lib/utils';
import Link from 'next/link';

export default function ExercisesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDifficulty, setFilterDifficulty] = useState('all');

  const filteredExercises = exercises.filter(ex => {
    const matchesSearch = ex.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          ex.tags.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesDifficulty = filterDifficulty === 'all' || ex.difficulty === filterDifficulty;
    return matchesSearch && matchesDifficulty;
  });

  return (
    <div className="exercises-page">
      <header className="page-header animate-fade-in">
        <h1>🏋️ Central de Exercícios</h1>
        <p>Pratique seus conhecimentos com desafios do mundo real. Ganhe XP e suba no ranking.</p>
      </header>

      <div className="filters-section animate-slide-in">
        <div className="search-box">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            className="input search-input"
            placeholder="Buscar por título, tag..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="difficulty-filters">
          <Filter size={18} className="filter-icon" />
          <button 
            className={`filter-btn ${filterDifficulty === 'all' ? 'active' : ''}`}
            onClick={() => setFilterDifficulty('all')}
          >
            Todos
          </button>
          <button 
            className={`filter-btn filter-easy ${filterDifficulty === 'easy' ? 'active' : ''}`}
            onClick={() => setFilterDifficulty('easy')}
          >
            Fácil
          </button>
          <button 
            className={`filter-btn filter-medium ${filterDifficulty === 'medium' ? 'active' : ''}`}
            onClick={() => setFilterDifficulty('medium')}
          >
            Médio
          </button>
          <button 
            className={`filter-btn filter-hard ${filterDifficulty === 'hard' ? 'active' : ''}`}
            onClick={() => setFilterDifficulty('hard')}
          >
            Difícil
          </button>
        </div>
      </div>

      <div className="exercises-grid stagger-children">
        {filteredExercises.map(exercise => (
          <Link 
            href={exercise.difficulty === 'expert' ? '#' : `/exercises/${exercise.id}`} 
            key={exercise.id} 
            className={`exercise-card card ${exercise.difficulty === 'expert' ? 'locked' : ''}`}
          >
            <div className="exercise-header">
              <span className={`badge ${getDifficultyColor(exercise.difficulty)}`}>
                {getDifficultyLabel(exercise.difficulty)}
              </span>
              <span className="exercise-xp">+{exercise.xpReward} XP</span>
            </div>

            <h3 className="exercise-title">{exercise.title}</h3>
            
            <div className="exercise-tags">
              {exercise.tags.map(tag => (
                <span key={tag} className="tag">#{tag}</span>
              ))}
            </div>

            <div className="exercise-footer">
              <div className="exercise-meta">
                <span><Code2 size={14} /> {exercise.language.toUpperCase()}</span>
                <span><Clock size={14} /> {exercise.estimatedMinutes}m</span>
              </div>
              
              <div className="exercise-status">
                {exercise.difficulty === 'expert' ? (
                  <Lock size={18} className="status-locked" />
                ) : exercise.completedByUser ? (
                  <div className="score-badge">
                    <CheckCircle2 size={14} />
                    <span>Score: {exercise.userScore}</span>
                  </div>
                ) : (
                  <Circle size={18} className="status-pending" />
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>

      <style jsx>{`
        .exercises-page {
          max-width: 1000px;
          margin: 0 auto;
        }

        .page-header {
          margin-bottom: 2rem;
        }

        .page-header h1 {
          font-size: 1.75rem;
          font-weight: 800;
          margin-bottom: 0.5rem;
        }

        .page-header p {
          color: var(--text-secondary);
        }

        .filters-section {
          display: flex;
          gap: 1.5rem;
          margin-bottom: 2rem;
          flex-wrap: wrap;
        }

        .search-box {
          position: relative;
          flex: 1;
          min-width: 250px;
        }

        .search-icon {
          position: absolute;
          left: 1rem;
          top: 50%;
          transform: translateY(-50%);
          color: var(--text-tertiary);
        }

        .search-input {
          padding-left: 2.75rem;
          background: var(--bg-card);
        }

        .difficulty-filters {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: var(--bg-card);
          padding: 0.375rem;
          border-radius: var(--radius-md);
          border: 1px solid var(--border-default);
        }

        .filter-icon {
          color: var(--text-tertiary);
          margin: 0 0.5rem;
        }

        .filter-btn {
          padding: 0.375rem 0.75rem;
          border-radius: var(--radius-sm);
          font-size: 0.8125rem;
          font-weight: 600;
          color: var(--text-secondary);
          background: transparent;
          border: none;
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .filter-btn:hover {
          color: var(--text-primary);
          background: var(--bg-tertiary);
        }

        .filter-btn.active {
          background: var(--bg-elevated);
          color: var(--text-primary);
        }

        .filter-easy.active { color: var(--accent-green-light); }
        .filter-medium.active { color: var(--accent-yellow-light); }
        .filter-hard.active { color: var(--accent-red); }

        .exercises-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 1.25rem;
        }

        .exercise-card {
          display: flex;
          flex-direction: column;
          text-decoration: none;
          color: inherit;
        }

        .exercise-card.locked {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .exercise-card.locked:hover {
          transform: none;
          box-shadow: none;
          border-color: var(--border-default);
          background: var(--bg-card);
        }

        .exercise-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }

        .exercise-xp {
          font-size: 0.8125rem;
          font-weight: 700;
          color: var(--accent-yellow);
        }

        .exercise-title {
          font-size: 1.125rem;
          margin-bottom: 0.75rem;
          flex: 1;
        }

        .exercise-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-bottom: 1.5rem;
        }

        .tag {
          font-size: 0.7rem;
          color: var(--text-tertiary);
          background: var(--bg-primary);
          padding: 0.25rem 0.5rem;
          border-radius: var(--radius-sm);
          border: 1px solid var(--border-default);
        }

        .exercise-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: auto;
          padding-top: 1rem;
          border-top: 1px solid var(--border-default);
        }

        .exercise-meta {
          display: flex;
          gap: 1rem;
        }

        .exercise-meta span {
          display: flex;
          align-items: center;
          gap: 0.375rem;
          font-size: 0.75rem;
          color: var(--text-secondary);
        }

        .score-badge {
          display: flex;
          align-items: center;
          gap: 0.375rem;
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--accent-green);
          background: rgba(16, 185, 129, 0.1);
          padding: 0.25rem 0.5rem;
          border-radius: var(--radius-sm);
        }

        .status-pending { color: var(--text-muted); }
        .status-locked { color: var(--text-tertiary); }
      `}</style>
    </div>
  );
}
