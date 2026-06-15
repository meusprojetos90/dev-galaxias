'use client';

import { Trophy, Star, Shield, Medal, Target } from 'lucide-react';
import { weeklyRanking } from '@/lib/mock-data';
import { formatXP } from '@/lib/utils';

export default function RankingPage() {
  return (
    <div className="ranking-page">
      <header className="page-header animate-fade-in text-center">
        <div className="header-icon mx-auto">
          <Trophy size={32} />
        </div>
        <h1>Ranking Global</h1>
        <p>Os melhores desenvolvedores da galáxia. Ganhe XP para subir no ranking.</p>
      </header>

      {/* Top 3 Podium */}
      <div className="podium-section animate-scale-in">
        {[1, 0, 2].map(podiumIndex => {
          const player = weeklyRanking[podiumIndex];
          if (!player) return null;
          
          const isFirst = podiumIndex === 0;
          const position = podiumIndex + 1;
          
          return (
            <div key={player.name} className={`podium-spot spot-${position}`}>
              <div className="podium-avatar-wrapper">
                <div className="podium-crown">
                  {isFirst ? '👑' : position === 2 ? '🥈' : '🥉'}
                </div>
                <div className="podium-avatar">
                  {player.name[0]}
                </div>
              </div>
              <div className="podium-info">
                <span className="podium-name">{player.name}</span>
                <span className="podium-level">Lvl {player.level}</span>
                <span className="podium-xp">{formatXP(player.xp)} XP</span>
              </div>
              <div className="podium-base">
                <span>{position}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* List remaining ranking */}
      <div className="ranking-list-card card animate-slide-in">
        <div className="ranking-list-header">
          <div className="col-rank">Posição</div>
          <div className="col-user">Desenvolvedor</div>
          <div className="col-level">Nível</div>
          <div className="col-xp">XP na Semana</div>
        </div>
        
        <div className="ranking-list">
          {weeklyRanking.slice(3).map(player => (
            <div 
              key={player.name} 
              className={`ranking-row ${player.isCurrentUser ? 'current-user-row' : ''}`}
            >
              <div className="col-rank">
                <span className="rank-number">#{player.rank}</span>
              </div>
              <div className="col-user">
                <div className="list-avatar">{player.name[0]}</div>
                <span className="list-name">{player.name}</span>
                {player.isCurrentUser && <span className="badge badge-purple ml-2">Você</span>}
              </div>
              <div className="col-level">
                <Star size={14} className="text-muted mr-1" />
                <span>{player.level}</span>
              </div>
              <div className="col-xp">
                <span className="list-xp">{formatXP(player.xp)} XP</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .ranking-page {
          max-width: 800px;
          margin: 0 auto;
          padding-bottom: 2rem;
        }

        .text-center { text-align: center; }
        .mx-auto { margin-left: auto; margin-right: auto; }
        .ml-2 { margin-left: 0.5rem; }
        .mr-1 { margin-right: 0.25rem; }

        .page-header {
          margin-bottom: 3rem;
        }

        .header-icon {
          width: 64px;
          height: 64px;
          background: var(--gradient-primary);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          margin-bottom: 1rem;
          box-shadow: var(--shadow-glow-purple);
        }

        .page-header h1 {
          font-size: 2rem;
          margin-bottom: 0.5rem;
        }

        .page-header p {
          color: var(--text-secondary);
        }

        /* Podium */
        .podium-section {
          display: flex;
          justify-content: center;
          align-items: flex-end;
          gap: 1rem;
          margin-bottom: 4rem;
          height: 250px;
        }

        .podium-spot {
          display: flex;
          flex-direction: column;
          align-items: center;
          flex: 1;
          max-width: 150px;
        }

        .spot-1 { z-index: 3; }
        .spot-2 { z-index: 2; }
        .spot-3 { z-index: 1; }

        .podium-avatar-wrapper {
          position: relative;
          margin-bottom: 1rem;
        }

        .podium-crown {
          position: absolute;
          top: -20px;
          left: 50%;
          transform: translateX(-50%);
          font-size: 1.5rem;
          filter: drop-shadow(0 2px 4px rgba(0,0,0,0.5));
        }

        .podium-avatar {
          width: 64px;
          height: 64px;
          border-radius: var(--radius-full);
          background: var(--bg-tertiary);
          border: 2px solid var(--border-default);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .spot-1 .podium-avatar {
          width: 80px;
          height: 80px;
          border: 3px solid #fbbf24;
          background: rgba(251, 191, 36, 0.1);
          color: #fbbf24;
          box-shadow: 0 0 20px rgba(251, 191, 36, 0.3);
        }

        .spot-2 .podium-avatar {
          border-color: #94a3b8;
          color: #94a3b8;
        }

        .spot-3 .podium-avatar {
          border-color: #b45309;
          color: #b45309;
        }

        .podium-info {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-bottom: 1rem;
          text-align: center;
        }

        .podium-name {
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 0.25rem;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 100%;
        }

        .spot-1 .podium-name {
          font-size: 1.125rem;
          color: #fbbf24;
        }

        .podium-level {
          font-size: 0.75rem;
          color: var(--text-secondary);
        }

        .podium-xp {
          font-size: 0.8125rem;
          font-weight: 700;
          color: var(--accent-yellow);
          margin-top: 0.25rem;
        }

        .podium-base {
          width: 100%;
          background: var(--bg-tertiary);
          border: 1px solid var(--border-default);
          border-bottom: none;
          border-radius: 8px 8px 0 0;
          display: flex;
          justify-content: center;
          padding-top: 0.5rem;
          color: var(--text-tertiary);
          font-weight: 800;
          font-size: 1.5rem;
        }

        .spot-1 .podium-base { height: 60px; background: rgba(251, 191, 36, 0.1); border-color: rgba(251, 191, 36, 0.3); color: rgba(251, 191, 36, 0.5); }
        .spot-2 .podium-base { height: 40px; }
        .spot-3 .podium-base { height: 20px; }

        /* List */
        .ranking-list-card {
          padding: 0;
          overflow: hidden;
        }

        .ranking-list-header {
          display: flex;
          padding: 1rem 1.5rem;
          background: var(--bg-tertiary);
          border-bottom: 1px solid var(--border-default);
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--text-tertiary);
          font-weight: 600;
        }

        .ranking-row {
          display: flex;
          padding: 1rem 1.5rem;
          border-bottom: 1px solid var(--border-default);
          align-items: center;
          transition: background var(--transition-fast);
        }

        .ranking-row:hover {
          background: var(--bg-tertiary);
        }

        .ranking-row:last-child {
          border-bottom: none;
        }

        .current-user-row {
          background: rgba(139, 92, 246, 0.1);
        }

        .current-user-row:hover {
          background: rgba(139, 92, 246, 0.15);
        }

        .col-rank {
          width: 80px;
          flex-shrink: 0;
        }

        .col-user {
          flex: 1;
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .col-level {
          width: 100px;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          color: var(--text-secondary);
        }

        .col-xp {
          width: 120px;
          flex-shrink: 0;
          text-align: right;
        }

        .rank-number {
          font-weight: 700;
          color: var(--text-secondary);
        }

        .list-avatar {
          width: 32px;
          height: 32px;
          border-radius: var(--radius-full);
          background: var(--bg-elevated);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.8125rem;
          font-weight: 700;
        }

        .list-name {
          font-weight: 600;
          color: var(--text-primary);
        }

        .list-xp {
          font-weight: 600;
          color: var(--accent-yellow);
        }

        @media (max-width: 640px) {
          .col-level { display: none; }
          .podium-section { gap: 0.5rem; }
          .ranking-list-header { padding: 1rem; }
          .ranking-row { padding: 1rem; }
        }
      `}</style>
    </div>
  );
}
