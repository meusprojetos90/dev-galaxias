'use client';

import { Trophy, Star, Shield, Lock, Medal } from 'lucide-react';
import { allAchievements } from '@/lib/mock-data';
import { getRarityColor } from '@/lib/utils';

export default function AchievementsPage() {
  const unlocked = allAchievements.filter(a => a.id === 'a1' || a.id === 'a2');
  const locked = allAchievements.filter(a => a.id !== 'a1' && a.id !== 'a2');

  return (
    <div className="achievements-page">
      <header className="page-header animate-fade-in">
        <div className="header-icon mx-auto">
          <Trophy size={32} />
        </div>
        <h1>Salão de Conquistas</h1>
        <p>Sua estante de troféus e medalhas obtidas na jornada.</p>
        
        <div className="stats-row mt-6">
          <div className="stat-pill">
            <span className="stat-value">{unlocked.length}</span>
            <span className="stat-label">Desbloqueadas</span>
          </div>
          <div className="stat-pill">
            <span className="stat-value text-accent-indigo">{allAchievements.length}</span>
            <span className="stat-label">Total</span>
          </div>
        </div>
      </header>

      <section className="achievements-section stagger-children">
        <h2 className="section-title">Desbloqueadas Recentes</h2>
        <div className="achievements-grid">
          {unlocked.map(achievement => (
            <div 
              key={achievement.id} 
              className="achievement-card card unlocked"
              style={{ '--rarity-color': getRarityColor(achievement.rarity) } as React.CSSProperties}
            >
              <div className="achievement-icon-wrapper">
                <div className="glow-effect" />
                {achievement.icon}
              </div>
              <div className="achievement-info">
                <h3>{achievement.name}</h3>
                <p>{achievement.description}</p>
                <div className="achievement-meta">
                  <span className="rarity-badge">{achievement.rarity}</span>
                  <span className="date-badge">Ontem</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="achievements-section mt-12 stagger-children">
        <h2 className="section-title flex items-center gap-2">
          <Lock size={20} className="text-text-muted" /> Ainda a Descobrir
        </h2>
        <div className="achievements-grid">
          {locked.map(achievement => (
            <div key={achievement.id} className="achievement-card card locked">
              <div className="achievement-icon-wrapper">
                <Lock size={32} />
              </div>
              <div className="achievement-info">
                <h3>Mistério Estelar</h3>
                <p>Complete missões específicas para revelar esta conquista.</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <style jsx>{`
        .achievements-page {
          max-width: 1000px;
          margin: 0 auto;
        }

        .page-header {
          text-align: center;
          margin-bottom: 3rem;
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
          color: var(--accent-yellow);
          margin: 0 auto 1rem;
        }

        .page-header h1 {
          font-size: 2rem;
          margin-bottom: 0.5rem;
        }

        .page-header p {
          color: var(--text-secondary);
        }

        .stats-row {
          display: flex;
          justify-content: center;
          gap: 1rem;
        }

        .stat-pill {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: var(--radius-full);
          padding: 0.5rem 1.25rem;
          display: flex;
          align-items: baseline;
          gap: 0.5rem;
        }

        .stat-value {
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .stat-label {
          font-size: 0.875rem;
          color: var(--text-secondary);
        }

        .section-title {
          font-size: 1.25rem;
          margin-bottom: 1.5rem;
          color: var(--text-primary);
          display: flex;
          align-items: center;
        }

        .achievements-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 1.5rem;
        }

        .achievement-card {
          display: flex;
          gap: 1.25rem;
          padding: 1.5rem;
        }

        .achievement-card.locked {
          opacity: 0.5;
          filter: grayscale(100%);
        }

        .achievement-icon-wrapper {
          position: relative;
          width: 64px;
          height: 64px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          background: rgba(0, 0, 0, 0.3);
          border: 2px solid var(--rarity-color, var(--glass-border));
          color: var(--rarity-color, var(--text-secondary));
          font-size: 2rem;
        }

        .glow-effect {
          position: absolute;
          inset: -10px;
          background: var(--rarity-color);
          filter: blur(15px);
          opacity: 0.2;
          border-radius: 50%;
          z-index: 0;
        }

        .achievement-icon-wrapper :global(svg) {
          position: relative;
          z-index: 1;
          width: 32px;
          height: 32px;
        }

        .achievement-info {
          display: flex;
          flex-direction: column;
        }

        .achievement-info h3 {
          font-size: 1.125rem;
          margin-bottom: 0.25rem;
        }

        .achievement-info p {
          font-size: 0.875rem;
          color: var(--text-secondary);
          line-height: 1.4;
          margin-bottom: 0.75rem;
        }

        .achievement-meta {
          margin-top: auto;
          display: flex;
          gap: 0.5rem;
        }

        .rarity-badge, .date-badge {
          font-size: 0.7rem;
          padding: 0.125rem 0.5rem;
          border-radius: var(--radius-full);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          font-weight: 700;
        }

        .rarity-badge {
          background: var(--rarity-color);
          color: #0B0F19; /* High contrast text */
        }

        .date-badge {
          background: rgba(255, 255, 255, 0.1);
          color: var(--text-secondary);
        }

        .mt-6 { margin-top: 1.5rem; }
        .mt-12 { margin-top: 3rem; }
        .text-accent-indigo { color: var(--accent-indigo); }
        .text-text-muted { color: var(--text-muted); }
        .flex { display: flex; }
        .items-center { align-items: center; }
        .gap-2 { gap: 0.5rem; }
      `}</style>
    </div>
  );
}
