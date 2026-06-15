'use client';

import { Lock, CheckCircle2, PlayCircle, Clock, BookOpen, Code2 } from 'lucide-react';
import Link from 'next/link';
import { tracks } from '@/lib/mock-data';

export default function TracksPage() {
  return (
    <div className="tracks-page">
      <header className="page-header animate-fade-in">
        <h1>🌌 Trilhas de Aprendizado</h1>
        <p>Sua jornada do zero ao Staff Engineer. Cada trilha é uma constelação de conhecimento.</p>
      </header>

      {/* Galaxy Map */}
      <div className="galaxy-map stagger-children">
        {tracks.map((track, index) => {
          const isLocked = track.status === 'locked';
          const isCompleted = track.status === 'completed';
          const isInProgress = track.status === 'in_progress';

          return (
            <div key={track.id} className="track-row">
              {/* Connection line */}
              {index > 0 && (
                <div className={`track-connector ${!isLocked ? 'active' : ''}`}>
                  <div className="connector-line" />
                  <div className="connector-dot" />
                </div>
              )}

              <Link
                href={isLocked ? '#' : `/tracks/${track.slug}`}
                className={`track-card card ${isLocked ? 'locked' : ''} ${isCompleted ? 'completed' : ''} ${isInProgress ? 'in-progress' : ''}`}
                style={{ '--track-color': track.color } as React.CSSProperties}
              >
                {/* Glow effect */}
                {isInProgress && <div className="track-glow" />}

                <div className="track-card-content">
                  <div className="track-left">
                    <div className="track-level-badge" style={{ borderColor: track.color }}>
                      <span>{track.level}</span>
                    </div>
                    <div className="track-icon-wrapper">
                      <span className="track-icon">{track.icon}</span>
                      {isCompleted && (
                        <div className="track-completed-check">
                          <CheckCircle2 size={16} />
                        </div>
                      )}
                      {isLocked && (
                        <div className="track-locked-icon">
                          <Lock size={16} />
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="track-center">
                    <h3>{track.name}</h3>
                    <p>{track.description}</p>
                    <div className="track-meta">
                      <span><BookOpen size={14} /> {track.totalLessons} aulas</span>
                      <span><Code2 size={14} /> {track.totalExercises} exercícios</span>
                      <span><Clock size={14} /> {track.estimatedHours}h</span>
                    </div>
                    {(isInProgress || isCompleted) && (
                      <div className="track-progress-bar">
                        <div className="progress-bar">
                          <div
                            className="progress-bar-fill"
                            style={{
                              width: `${track.progress}%`,
                              background: isCompleted
                                ? 'linear-gradient(135deg, #10b981, #06b6d4)'
                                : `linear-gradient(135deg, ${track.color}, ${track.color}88)`,
                            }}
                          />
                        </div>
                        <span className="progress-text">{track.progress}%</span>
                      </div>
                    )}
                  </div>

                  <div className="track-right">
                    {isCompleted && (
                      <span className="badge badge-green">✓ Completa</span>
                    )}
                    {isInProgress && (
                      <button className="btn btn-primary btn-sm">
                        <PlayCircle size={14} /> Continuar
                      </button>
                    )}
                    {isLocked && (
                      <span className="badge badge-purple">
                        <Lock size={10} /> Bloqueada
                      </span>
                    )}
                    {!isLocked && !isCompleted && !isInProgress && (
                      <button className="btn btn-secondary btn-sm">Iniciar</button>
                    )}
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
      </div>

      <style jsx>{`
        .tracks-page {
          max-width: 900px;
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
          font-size: 0.9375rem;
        }

        .galaxy-map {
          display: flex;
          flex-direction: column;
          gap: 0;
        }

        .track-row {
          position: relative;
        }

        .track-connector {
          display: flex;
          flex-direction: column;
          align-items: center;
          height: 32px;
          margin-left: 56px;
        }

        .connector-line {
          width: 2px;
          flex: 1;
          background: var(--bg-tertiary);
        }

        .track-connector.active .connector-line {
          background: var(--gradient-primary);
        }

        .connector-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--bg-tertiary);
        }

        .track-connector.active .connector-dot {
          background: var(--accent-purple);
          box-shadow: 0 0 8px rgba(139, 92, 246, 0.5);
        }

        .track-card {
          text-decoration: none;
          cursor: pointer;
          position: relative;
          overflow: hidden;
        }

        .track-card.locked {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .track-card.locked:hover {
          transform: none;
          box-shadow: none;
        }

        .track-card.in-progress {
          border-color: rgba(139, 92, 246, 0.3);
        }

        .track-card.completed {
          border-color: rgba(16, 185, 129, 0.3);
        }

        .track-glow {
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(
            circle at center,
            rgba(139, 92, 246, 0.05) 0%,
            transparent 70%
          );
          pointer-events: none;
        }

        .track-card-content {
          display: flex;
          align-items: center;
          gap: 1.25rem;
          position: relative;
          z-index: 1;
        }

        .track-left {
          display: flex;
          align-items: center;
          gap: 1rem;
          flex-shrink: 0;
        }

        .track-level-badge {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          border: 2px solid;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.8125rem;
          font-weight: 800;
          color: var(--text-primary);
          flex-shrink: 0;
        }

        .track-icon-wrapper {
          position: relative;
        }

        .track-icon {
          font-size: 2rem;
        }

        .track-completed-check {
          position: absolute;
          bottom: -4px;
          right: -4px;
          color: var(--accent-green);
          background: var(--bg-card);
          border-radius: 50%;
        }

        .track-locked-icon {
          position: absolute;
          bottom: -4px;
          right: -4px;
          color: var(--text-muted);
          background: var(--bg-card);
          border-radius: 50%;
        }

        .track-center {
          flex: 1;
          min-width: 0;
        }

        .track-center h3 {
          font-size: 1rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 0.25rem;
        }

        .track-center p {
          font-size: 0.8125rem;
          color: var(--text-secondary);
          margin-bottom: 0.5rem;
        }

        .track-meta {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .track-meta span {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          font-size: 0.75rem;
          color: var(--text-tertiary);
        }

        .track-progress-bar {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-top: 0.75rem;
        }

        .progress-text {
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--accent-purple-light);
          white-space: nowrap;
        }

        .track-right {
          flex-shrink: 0;
        }

        @media (max-width: 640px) {
          .track-card-content {
            flex-wrap: wrap;
          }

          .track-right {
            width: 100%;
            display: flex;
            justify-content: flex-end;
          }

          .track-connector {
            margin-left: 36px;
          }
        }
      `}</style>
    </div>
  );
}
