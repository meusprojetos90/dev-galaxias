'use client';

import { 
  User, Mail, Calendar, Target, Trophy, Star, 
  Settings, ExternalLink, Flame, CheckCircle2 
} from 'lucide-react';
import { currentUser, userStats, userSkills, allAchievements } from '@/lib/mock-data';
import { formatXP, getRarityColor } from '@/lib/utils';
// Note: We'd use Recharts for the radar chart in a real implementation
// For the MVP, we'll build a custom CSS radar or simple skill bars

export default function ProfilePage() {
  const maxSkillXp = Math.max(...userSkills.map(s => s.xp));
  
  const unlockedAchievements = allAchievements.filter(a => a.unlocked);
  const inProgressAchievements = allAchievements.filter(a => !a.unlocked && a.progress && a.target);

  return (
    <div className="profile-page">
      <div className="profile-grid">
        
        {/* Left Column - User Info */}
        <div className="profile-sidebar stagger-children">
          
          <div className="card user-main-card text-center">
            <div className="user-avatar-large">
              {currentUser.displayName[0]}
            </div>
            <h1 className="user-name">{currentUser.displayName}</h1>
            <p className="user-title text-gradient">{currentUser.title}</p>
            
            <div className="user-level-badge">
              <Star size={16} />
              Nível {currentUser.level}
            </div>

            <div className="user-details">
              <div className="detail-row">
                <Mail size={16} />
                <span>{currentUser.email}</span>
              </div>
              <div className="detail-row">
                <Calendar size={16} />
                <span>Membro desde {new Date(currentUser.joinedAt).toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}</span>
              </div>
            </div>

            <button className="btn btn-secondary w-full mt-4">
              <Settings size={16} /> Editar Perfil
            </button>
          </div>

          <div className="card stats-summary">
            <h3><Target size={18} /> Resumo</h3>
            <div className="stats-list">
              <div className="stat-row">
                <span className="stat-label">Trilhas Completas</span>
                <span className="stat-value">{userStats.tracksCompleted}</span>
              </div>
              <div className="stat-row">
                <span className="stat-label">Exercícios Resolvidos</span>
                <span className="stat-value">{userStats.exercisesCompleted}</span>
              </div>
              <div className="stat-row">
                <span className="stat-label">Projetos Entregues</span>
                <span className="stat-value">{userStats.projectsCompleted}</span>
              </div>
              <div className="stat-row">
                <span className="stat-label">Horas de Estudo</span>
                <span className="stat-value">{userStats.totalHoursStudied}h</span>
              </div>
              <div className="stat-row highlight">
                <span className="stat-label"><Flame size={14} /> Maior Streak</span>
                <span className="stat-value">{currentUser.longestStreak} dias</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Skills & Achievements */}
        <div className="profile-content stagger-children">
          
          {/* Skills Area */}
          <div className="card skills-card">
            <div className="card-header">
              <h2><Star size={20} /> Árvore de Habilidades</h2>
              <span className="badge badge-purple">{userSkills.length} Skills Descobertas</span>
            </div>
            
            <div className="skills-list">
              {userSkills.sort((a, b) => b.level - a.level).map(skill => (
                <div key={skill.name} className="skill-item">
                  <div className="skill-info">
                    <span className="skill-name">{skill.name}</span>
                    <span className="skill-level">Lvl {skill.level}</span>
                  </div>
                  <div className="skill-bar-bg">
                    <div 
                      className="skill-bar-fill"
                      style={{ 
                        width: ((skill.xp / maxSkillXp) * 100) + '%',
                        background: skill.category === 'language' ? 'var(--gradient-primary)' :
                                   skill.category === 'database' ? 'var(--gradient-secondary)' :
                                   skill.category === 'infrastructure' ? 'var(--gradient-success)' :
                                   'var(--gradient-accent)'
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Achievements Area */}
          <div className="card achievements-card">
            <div className="card-header">
              <h2><Trophy size={20} /> Conquistas</h2>
              <span className="text-muted">{unlockedAchievements.length} de {allAchievements.length}</span>
            </div>

            <div className="achievements-showcase">
              {unlockedAchievements.map(achievement => (
                <div 
                  key={achievement.id} 
                  className="achievement-box unlocked"
                  title={achievement.description}
                  style={{ '--rarity-color': getRarityColor(achievement.rarity) } as React.CSSProperties}
                >
                  <div className="achievement-icon-large">{achievement.icon}</div>
                  <span className="achievement-name-small">{achievement.name}</span>
                </div>
              ))}
            </div>

            {inProgressAchievements.length > 0 && (
              <>
                <h3 className="section-subtitle mt-6 mb-4">Em Progresso</h3>
                <div className="achievements-progress-list">
                  {inProgressAchievements.map(achievement => (
                    <div key={achievement.id} className="achievement-progress-item">
                      <div className="achievement-icon opacity-50">{achievement.icon}</div>
                      <div className="achievement-progress-info">
                        <div className="flex-between">
                          <span className="font-medium text-sm">{achievement.name}</span>
                          <span className="text-xs text-muted">
                            {achievement.progress} / {achievement.target}
                          </span>
                        </div>
                        <div className="progress-bar mt-1 h-1.5">
                          <div 
                            className="progress-bar-fill" 
                            style={{ 
                              width: (((achievement.progress || 0) / (achievement.target || 1)) * 100) + '%',
                              background: getRarityColor(achievement.rarity)
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
          
        </div>
      </div>

      <style jsx>{`
        .profile-page {
          max-width: 1100px;
          margin: 0 auto;
        }

        .profile-grid {
          display: grid;
          grid-template-columns: 320px 1fr;
          gap: 1.5rem;
        }

        @media (max-width: 900px) {
          .profile-grid {
            grid-template-columns: 1fr;
          }
        }

        .user-main-card {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .user-avatar-large {
          width: 96px;
          height: 96px;
          border-radius: var(--radius-full);
          background: var(--gradient-accent);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2.5rem;
          font-weight: 800;
          color: white;
          margin-bottom: 1rem;
          border: 4px solid var(--bg-card);
          box-shadow: 0 0 0 2px var(--border-default), var(--shadow-glow-purple);
        }

        .user-name {
          font-size: 1.5rem;
          margin-bottom: 0.25rem;
        }

        .user-title {
          font-size: 0.9375rem;
          font-weight: 600;
          margin-bottom: 1rem;
        }

        .user-level-badge {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          background: var(--bg-tertiary);
          border: 1px solid var(--border-default);
          border-radius: var(--radius-full);
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 1.5rem;
        }

        .user-details {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          text-align: left;
          padding-top: 1.5rem;
          border-top: 1px solid var(--border-default);
        }

        .detail-row {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          color: var(--text-secondary);
          font-size: 0.875rem;
        }

        .w-full { width: 100%; }
        .mt-4 { margin-top: 1rem; }
        .mt-6 { margin-top: 1.5rem; }
        .mb-4 { margin-bottom: 1rem; }
        .text-center { text-align: center; }

        .stats-summary h3 {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 1rem;
          margin-bottom: 1rem;
          color: var(--text-primary);
        }

        .stats-list {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .stat-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-bottom: 0.75rem;
          border-bottom: 1px dashed var(--border-default);
        }

        .stat-row:last-child {
          border-bottom: none;
          padding-bottom: 0;
        }

        .stat-label {
          color: var(--text-secondary);
          font-size: 0.875rem;
          display: flex;
          align-items: center;
          gap: 0.375rem;
        }

        .stat-value {
          font-weight: 700;
          color: var(--text-primary);
        }

        .stat-row.highlight .stat-value {
          color: var(--accent-orange);
        }

        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
        }

        .card-header h2 {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 1.25rem;
        }

        .skills-list {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.5rem;
        }

        @media (max-width: 640px) {
          .skills-list {
            grid-template-columns: 1fr;
          }
        }

        .skill-item {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .skill-info {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
        }

        .skill-name {
          font-weight: 600;
          font-size: 0.9375rem;
          color: var(--text-primary);
        }

        .skill-level {
          font-size: 0.75rem;
          color: var(--text-tertiary);
          font-weight: 700;
        }

        .skill-bar-bg {
          height: 6px;
          background: var(--bg-tertiary);
          border-radius: var(--radius-full);
          overflow: hidden;
        }

        .skill-bar-fill {
          height: 100%;
          border-radius: var(--radius-full);
          transition: width var(--transition-slow);
        }

        .achievements-showcase {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
          gap: 1rem;
        }

        .achievement-box {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          padding: 1rem 0.5rem;
          background: var(--bg-tertiary);
          border: 1px solid var(--border-default);
          border-radius: var(--radius-md);
          transition: transform var(--transition-fast);
          cursor: pointer;
        }

        .achievement-box:hover {
          transform: translateY(-2px);
          border-color: var(--rarity-color);
          box-shadow: 0 4px 12px rgba(0,0,0,0.2), inset 0 0 0 1px var(--rarity-color);
        }

        .achievement-icon-large {
          font-size: 2rem;
          filter: drop-shadow(0 2px 4px rgba(0,0,0,0.5));
        }

        .achievement-name-small {
          font-size: 0.65rem;
          font-weight: 600;
          text-align: center;
          color: var(--text-secondary);
          line-height: 1.2;
        }

        .section-subtitle {
          font-size: 1rem;
          color: var(--text-primary);
          border-bottom: 1px solid var(--border-default);
          padding-bottom: 0.5rem;
        }

        .achievements-progress-list {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1rem;
        }

        @media (max-width: 640px) {
          .achievements-progress-list {
            grid-template-columns: 1fr;
          }
        }

        .achievement-progress-item {
          display: flex;
          gap: 0.75rem;
          align-items: center;
          padding: 0.75rem;
          background: var(--bg-tertiary);
          border-radius: var(--radius-md);
        }

        .achievement-progress-info {
          flex: 1;
        }

        .flex-between {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .font-medium { font-weight: 500; }
        .text-sm { font-size: 0.875rem; }
        .text-xs { font-size: 0.75rem; }
        .text-muted { color: var(--text-muted); }
        .opacity-50 { opacity: 0.5; }
        .h-1\.5 { height: 6px; }
      `}</style>
    </div>
  );
}
