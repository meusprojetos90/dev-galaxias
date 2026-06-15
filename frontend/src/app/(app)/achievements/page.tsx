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


    </div>
  );
}
