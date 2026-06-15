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


    </div>
  );
}
