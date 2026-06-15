'use client';

import {
  Flame, Zap, BookOpen, Code2, FolderKanban, Trophy,
  TrendingUp, ChevronRight, CheckCircle2, Circle,
  Star, Clock, Target, Sparkles,
} from 'lucide-react';
import Link from 'next/link';
import {
  currentUser, dailyMissions, tracks, weeklyRanking,
  recentAchievements, xpHistory, weeklyGoals, userStats,
} from '@/lib/mock-data';
import { getXPProgress, formatXP } from '@/lib/utils';

export default function DashboardPage() {
  const xpProgress = getXPProgress(
    currentUser.totalXp,
    currentUser.currentLevelXp,
    currentUser.nextLevelXp
  );

  const activeTrack = tracks.find(t => t.status === 'in_progress');

  return (
    <div className="dashboard">
      {/* Welcome Header */}
      <header className="dashboard-header animate-fade-in">
        <div>
          <h1 className="dashboard-greeting">
            Bom dia, <span className="text-gradient">{currentUser.displayName}</span> 👋
          </h1>
          <p className="dashboard-subtitle">
            Continue sua jornada galáctica. Você está no <strong>Nível {currentUser.level}</strong> — {currentUser.title}
          </p>
        </div>
        <div className="dashboard-quick-stats">
          <div className="quick-stat">
            <Flame size={20} className="stat-icon-fire" />
            <div>
              <span className="quick-stat-value">{currentUser.streak}</span>
              <span className="quick-stat-label">dias streak</span>
            </div>
          </div>
          <div className="quick-stat">
            <Zap size={20} className="stat-icon-xp" />
            <div>
              <span className="quick-stat-value">{formatXP(currentUser.totalXp)}</span>
              <span className="quick-stat-label">XP total</span>
            </div>
          </div>
        </div>
      </header>

      {/* XP Progress Bar */}
      <div className="xp-card card animate-fade-in" style={{ animationDelay: '0.1s' }}>
        <div className="xp-card-header">
          <div className="xp-level-badge">
            <Star size={16} />
            <span>Nível {currentUser.level}</span>
          </div>
          <span className="xp-numbers">
            {formatXP(currentUser.totalXp)} / {formatXP(currentUser.nextLevelXp)} XP
          </span>
        </div>
        <div className="progress-bar" style={{ height: '12px' }}>
          <div className="progress-bar-fill" style={{ width: `${xpProgress}%` }} />
        </div>
        <div className="xp-card-footer">
          <span>{Math.round(xpProgress)}% para o próximo nível</span>
          <span>{formatXP(currentUser.nextLevelXp - currentUser.totalXp)} XP restantes</span>
        </div>
      </div>

      <div className="dashboard-grid stagger-children">
        {/* Daily Missions */}
        <div className="card dashboard-missions">
          <div className="card-header">
            <h3><Sparkles size={18} /> Missões do Dia</h3>
            <span className="missions-count">
              {dailyMissions.filter(m => m.completed).length}/{dailyMissions.length}
            </span>
          </div>
          <div className="missions-list">
            {dailyMissions.map(mission => (
              <div key={mission.id} className={`mission-item ${mission.completed ? 'completed' : ''}`}>
                <div className="mission-check">
                  {mission.completed ? (
                    <CheckCircle2 size={20} className="check-done" />
                  ) : (
                    <Circle size={20} className="check-pending" />
                  )}
                </div>
                <div className="mission-content">
                  <span className="mission-icon">{mission.icon}</span>
                  <span className="mission-text">{mission.description}</span>
                </div>
                <span className="mission-xp">+{mission.xpReward} XP</span>
              </div>
            ))}
          </div>
          <div className="missions-bonus">
            🎁 Complete todas para ganhar <strong>+30 XP bônus!</strong>
          </div>
        </div>

        {/* Active Track */}
        {activeTrack && (
          <Link href={`/tracks/${activeTrack.slug}`} className="card dashboard-track">
            <div className="card-header">
              <h3><BookOpen size={18} /> Trilha Ativa</h3>
              <ChevronRight size={18} />
            </div>
            <div className="track-info">
              <span className="track-icon" style={{ fontSize: '2.5rem' }}>{activeTrack.icon}</span>
              <div className="track-details">
                <h4>Nível {activeTrack.level}: {activeTrack.name}</h4>
                <p>{activeTrack.description}</p>
                <div className="track-progress-section">
                  <div className="progress-bar">
                    <div
                      className="progress-bar-fill"
                      style={{ width: `${activeTrack.progress}%` }}
                    />
                  </div>
                  <span className="track-progress-text">{activeTrack.progress}%</span>
                </div>
              </div>
            </div>
            <button className="btn btn-primary btn-sm" style={{ marginTop: '12px', width: '100%' }}>
              Continuar Estudando →
            </button>
          </Link>
        )}

        {/* Stats Grid */}
        <div className="card dashboard-stats-grid">
          <div className="card-header">
            <h3><TrendingUp size={18} /> Estatísticas</h3>
          </div>
          <div className="stats-items">
            <div className="stat-item">
              <BookOpen size={18} className="stat-item-icon" />
              <span className="stat-item-value">{userStats.lessonsCompleted}</span>
              <span className="stat-item-label">Aulas</span>
            </div>
            <div className="stat-item">
              <Code2 size={18} className="stat-item-icon" />
              <span className="stat-item-value">{userStats.exercisesCompleted}</span>
              <span className="stat-item-label">Exercícios</span>
            </div>
            <div className="stat-item">
              <FolderKanban size={18} className="stat-item-icon" />
              <span className="stat-item-value">{userStats.projectsCompleted}</span>
              <span className="stat-item-label">Projetos</span>
            </div>
            <div className="stat-item">
              <Trophy size={18} className="stat-item-icon" />
              <span className="stat-item-value">{userStats.achievementsUnlocked}</span>
              <span className="stat-item-label">Conquistas</span>
            </div>
            <div className="stat-item">
              <Target size={18} className="stat-item-icon" />
              <span className="stat-item-value">{userStats.avgCodeReviewScore}</span>
              <span className="stat-item-label">Score Médio</span>
            </div>
            <div className="stat-item">
              <Clock size={18} className="stat-item-icon" />
              <span className="stat-item-value">{userStats.totalHoursStudied}h</span>
              <span className="stat-item-label">Horas</span>
            </div>
          </div>
        </div>

        {/* Weekly Goals */}
        <div className="card dashboard-goals">
          <div className="card-header">
            <h3><Target size={18} /> Metas da Semana</h3>
            <span className="goals-count">
              {weeklyGoals.filter(g => g.completed).length}/{weeklyGoals.length}
            </span>
          </div>
          <div className="goals-list">
            {weeklyGoals.map(goal => (
              <div key={goal.id} className={`goal-item ${goal.completed ? 'completed' : ''}`}>
                {goal.completed ? (
                  <CheckCircle2 size={16} className="check-done" />
                ) : (
                  <Circle size={16} className="check-pending" />
                )}
                <span className="goal-text">{goal.title}</span>
                {goal.progress !== undefined && !goal.completed && (
                  <span className="goal-progress">{goal.progress}%</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* XP Chart */}
        <div className="card dashboard-chart">
          <div className="card-header">
            <h3><Zap size={18} /> XP da Semana</h3>
            <span className="chart-total">
              {xpHistory.reduce((sum, d) => sum + d.xp, 0)} XP
            </span>
          </div>
          <div className="xp-chart">
            {xpHistory.map((day, i) => (
              <div key={i} className="chart-bar-container">
                <div className="chart-bar-wrapper">
                  <div
                    className="chart-bar"
                    style={{
                      height: `${(day.xp / Math.max(...xpHistory.map(d => d.xp))) * 100}%`,
                    }}
                  >
                    <span className="chart-bar-value">{day.xp}</span>
                  </div>
                </div>
                <span className="chart-bar-label">{day.date}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Ranking */}
        <div className="card dashboard-ranking">
          <div className="card-header">
            <h3><Star size={18} /> Ranking Semanal</h3>
            <Link href="/ranking" className="card-link">Ver tudo →</Link>
          </div>
          <div className="ranking-list">
            {weeklyRanking.slice(0, 5).map(player => (
              <div
                key={player.rank}
                className={`ranking-item ${player.isCurrentUser ? 'current-user' : ''}`}
              >
                <span className={`ranking-position rank-${player.rank}`}>
                  {player.rank <= 3 ? ['🥇', '🥈', '🥉'][player.rank - 1] : `#${player.rank}`}
                </span>
                <div className="ranking-avatar">
                  {player.name[0]}
                </div>
                <div className="ranking-info">
                  <span className="ranking-name">{player.name}</span>
                  <span className="ranking-level">Nível {player.level}</span>
                </div>
                <span className="ranking-xp">{formatXP(player.xp)} XP</span>
              </div>
            ))}
          </div>
          {weeklyRanking.find(p => p.isCurrentUser) && (
            <div className="ranking-user-position">
              Sua posição: <strong>#{weeklyRanking.find(p => p.isCurrentUser)?.rank}</strong>
            </div>
          )}
        </div>

        {/* Recent Achievements */}
        <div className="card dashboard-achievements">
          <div className="card-header">
            <h3><Trophy size={18} /> Conquistas Recentes</h3>
            <Link href="/achievements" className="card-link">Ver todas →</Link>
          </div>
          <div className="achievements-list">
            {recentAchievements.map(achievement => (
              <div key={achievement.id} className="achievement-item">
                <span className="achievement-icon">{achievement.icon}</span>
                <div className="achievement-info">
                  <span className="achievement-name">{achievement.name}</span>
                  <span className="achievement-desc">{achievement.description}</span>
                </div>
                <span className={`badge badge-${achievement.rarity === 'common' ? 'blue' : achievement.rarity === 'rare' ? 'cyan' : 'purple'}`}>
                  {achievement.rarity}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .dashboard {
          max-width: 1200px;
          margin: 0 auto;
        }

        .dashboard-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 1.5rem;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .dashboard-greeting {
          font-size: 1.75rem;
          font-weight: 800;
          margin-bottom: 0.25rem;
        }

        .dashboard-subtitle {
          font-size: 0.9rem;
          color: var(--text-secondary);
        }

        .dashboard-quick-stats {
          display: flex;
          gap: 1.5rem;
        }

        .quick-stat {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1rem;
          background: var(--bg-card);
          border: 1px solid var(--border-default);
          border-radius: var(--radius-lg);
        }

        .quick-stat div {
          display: flex;
          flex-direction: column;
        }

        .quick-stat-value {
          font-size: 1.125rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .quick-stat-label {
          font-size: 0.7rem;
          color: var(--text-tertiary);
        }

        :global(.stat-icon-fire) { color: var(--accent-orange); }
        :global(.stat-icon-xp) { color: var(--accent-yellow); }

        /* XP Card */
        .xp-card {
          margin-bottom: 1.5rem;
        }

        .xp-card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.75rem;
        }

        .xp-level-badge {
          display: flex;
          align-items: center;
          gap: 0.375rem;
          padding: 0.25rem 0.75rem;
          background: rgba(139, 92, 246, 0.15);
          border: 1px solid rgba(139, 92, 246, 0.3);
          border-radius: var(--radius-full);
          color: var(--accent-purple-light);
          font-size: 0.8125rem;
          font-weight: 600;
        }

        .xp-numbers {
          font-size: 0.875rem;
          color: var(--text-secondary);
          font-weight: 500;
        }

        .xp-card-footer {
          display: flex;
          justify-content: space-between;
          margin-top: 0.5rem;
          font-size: 0.75rem;
          color: var(--text-tertiary);
        }

        /* Dashboard Grid */
        .dashboard-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.25rem;
        }

        @media (max-width: 1024px) {
          .dashboard-grid {
            grid-template-columns: 1fr;
          }
        }

        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }

        .card-header h3 {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.9375rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .card-link {
          font-size: 0.8125rem;
          color: var(--accent-purple-light);
          font-weight: 500;
        }

        .card-link:hover {
          color: var(--accent-cyan-light);
        }

        /* Missions */
        .missions-count, .goals-count {
          font-size: 0.8125rem;
          font-weight: 600;
          color: var(--accent-green);
        }

        .missions-list {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .mission-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem;
          border-radius: var(--radius-md);
          background: var(--bg-tertiary);
          transition: all var(--transition-fast);
        }

        .mission-item.completed {
          opacity: 0.6;
        }

        .mission-item.completed .mission-text {
          text-decoration: line-through;
        }

        .mission-content {
          flex: 1;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .mission-text {
          font-size: 0.8125rem;
          color: var(--text-primary);
        }

        .mission-xp {
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--accent-yellow);
          white-space: nowrap;
        }

        :global(.check-done) { color: var(--accent-green); }
        :global(.check-pending) { color: var(--text-muted); }

        .missions-bonus {
          margin-top: 0.75rem;
          padding: 0.5rem 0.75rem;
          border-radius: var(--radius-md);
          background: rgba(245, 158, 11, 0.08);
          border: 1px solid rgba(245, 158, 11, 0.2);
          font-size: 0.75rem;
          color: var(--accent-yellow-light);
          text-align: center;
        }

        /* Track */
        .dashboard-track {
          text-decoration: none;
          cursor: pointer;
        }

        .track-info {
          display: flex;
          gap: 1rem;
          align-items: flex-start;
        }

        .track-details {
          flex: 1;
        }

        .track-details h4 {
          font-size: 1rem;
          color: var(--text-primary);
          margin-bottom: 0.25rem;
        }

        .track-details p {
          font-size: 0.8125rem;
          color: var(--text-secondary);
          margin-bottom: 0.75rem;
        }

        .track-progress-section {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .track-progress-text {
          font-size: 0.8125rem;
          font-weight: 600;
          color: var(--accent-purple-light);
          white-space: nowrap;
        }

        /* Stats */
        .stats-items {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0.75rem;
        }

        .stat-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.25rem;
          padding: 0.75rem;
          background: var(--bg-tertiary);
          border-radius: var(--radius-md);
        }

        :global(.stat-item-icon) {
          color: var(--accent-purple-light);
        }

        .stat-item-value {
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .stat-item-label {
          font-size: 0.7rem;
          color: var(--text-tertiary);
        }

        /* Goals */
        .goals-list {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .goal-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.8125rem;
          color: var(--text-primary);
        }

        .goal-item.completed .goal-text {
          text-decoration: line-through;
          color: var(--text-tertiary);
        }

        .goal-progress {
          margin-left: auto;
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--accent-yellow);
        }

        /* XP Chart */
        .chart-total {
          font-size: 0.8125rem;
          font-weight: 600;
          color: var(--accent-yellow);
        }

        .xp-chart {
          display: flex;
          align-items: flex-end;
          gap: 0.5rem;
          height: 160px;
          padding-top: 1rem;
        }

        .chart-bar-container {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          height: 100%;
        }

        .chart-bar-wrapper {
          flex: 1;
          width: 100%;
          display: flex;
          align-items: flex-end;
          justify-content: center;
        }

        .chart-bar {
          width: 70%;
          max-width: 40px;
          background: var(--gradient-primary);
          border-radius: var(--radius-sm) var(--radius-sm) 0 0;
          position: relative;
          min-height: 8px;
          transition: height var(--transition-slow);
        }

        .chart-bar-value {
          position: absolute;
          top: -20px;
          left: 50%;
          transform: translateX(-50%);
          font-size: 0.65rem;
          font-weight: 600;
          color: var(--text-secondary);
          white-space: nowrap;
        }

        .chart-bar-label {
          font-size: 0.7rem;
          color: var(--text-tertiary);
        }

        /* Ranking */
        .ranking-list {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .ranking-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.5rem 0.75rem;
          border-radius: var(--radius-md);
          transition: background var(--transition-fast);
        }

        .ranking-item.current-user {
          background: rgba(139, 92, 246, 0.1);
          border: 1px solid rgba(139, 92, 246, 0.2);
        }

        .ranking-position {
          font-size: 0.875rem;
          font-weight: 700;
          min-width: 28px;
          text-align: center;
          color: var(--text-tertiary);
        }

        .ranking-avatar {
          width: 32px;
          height: 32px;
          border-radius: var(--radius-full);
          background: var(--bg-elevated);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--text-secondary);
        }

        .ranking-info {
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .ranking-name {
          font-size: 0.8125rem;
          font-weight: 600;
          color: var(--text-primary);
        }

        .ranking-level {
          font-size: 0.7rem;
          color: var(--text-tertiary);
        }

        .ranking-xp {
          font-size: 0.8125rem;
          font-weight: 600;
          color: var(--accent-yellow);
        }

        .ranking-user-position {
          margin-top: 0.75rem;
          padding: 0.5rem;
          text-align: center;
          font-size: 0.8125rem;
          color: var(--text-secondary);
          border-top: 1px solid var(--border-default);
        }

        /* Achievements */
        .achievements-list {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .achievement-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .achievement-icon {
          font-size: 1.5rem;
        }

        .achievement-info {
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .achievement-name {
          font-size: 0.8125rem;
          font-weight: 600;
          color: var(--text-primary);
        }

        .achievement-desc {
          font-size: 0.7rem;
          color: var(--text-tertiary);
        }
      `}</style>
    </div>
  );
}
