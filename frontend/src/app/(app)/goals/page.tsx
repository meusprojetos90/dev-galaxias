'use client';

import { Target, Calendar, CheckCircle2, Circle, Activity } from 'lucide-react';

const mockGoals = [
  { id: 1, title: 'Completar o Módulo de Arrays em Go', status: 'completed', type: 'weekly' },
  { id: 2, title: 'Resolver 5 exercícios difíceis', status: 'in_progress', progress: 3, target: 5, type: 'weekly' },
  { id: 3, title: 'Fazer uma entrevista simulada', status: 'pending', type: 'weekly' },
  { id: 4, title: 'Terminar o MVP do E-commerce', status: 'in_progress', progress: 45, target: 100, type: 'monthly' }
];

// Mock activity data for the heat map
const getMockActivity = () => {
  const days = [];
  for (let i = 0; i < 90; i++) {
    // Generate random activity level (0 to 4)
    const level = Math.random() > 0.3 ? Math.floor(Math.random() * 5) : 0;
    days.push(level);
  }
  return days;
};

export default function GoalsPage() {
  const activityMap = getMockActivity();
  const weeklyGoals = mockGoals.filter(g => g.type === 'weekly');
  const monthlyGoals = mockGoals.filter(g => g.type === 'monthly');

  return (
    <div className="goals-page">
      <header className="page-header animate-fade-in">
        <div className="header-icon mx-auto">
          <Target size={32} />
        </div>
        <h1>Metas e Hábitos</h1>
        <p>Mantenha a consistência. A jornada importa tanto quanto o destino.</p>
      </header>

      <div className="goals-content stagger-children">
        {/* Heatmap Area */}
        <div className="card heatmap-card">
          <div className="card-header flex-between mb-4">
            <h2 className="flex items-center gap-2"><Activity size={20} /> Mapa de Atividade</h2>
            <span className="text-sm text-secondary">Últimos 90 dias</span>
          </div>
          
          <div className="heatmap-grid">
            {activityMap.map((level, i) => (
              <div 
                key={i} 
                className="heatmap-cell" 
                data-level={level}
                title={`Nível de atividade: ${level}`}
              />
            ))}
          </div>
          <div className="heatmap-legend mt-4">
            <span>Menos</span>
            <div className="heatmap-cell" data-level="0" />
            <div className="heatmap-cell" data-level="1" />
            <div className="heatmap-cell" data-level="2" />
            <div className="heatmap-cell" data-level="3" />
            <div className="heatmap-cell" data-level="4" />
            <span>Mais</span>
          </div>
        </div>

        <div className="goals-lists">
          {/* Weekly Goals */}
          <div className="card goals-card">
            <div className="card-header mb-6">
              <h2 className="flex items-center gap-2"><Calendar size={20} /> Metas da Semana</h2>
            </div>
            
            <div className="goals-list">
              {weeklyGoals.map(goal => (
                <div key={goal.id} className={`goal-item ${goal.status}`}>
                  <div className="goal-icon">
                    {goal.status === 'completed' ? <CheckCircle2 className="text-accent-green" /> : <Circle />}
                  </div>
                  <div className="goal-info">
                    <h3>{goal.title}</h3>
                    {goal.target && (
                      <div className="goal-progress-bar">
                        <div 
                          className="goal-progress-fill" 
                          style={{ width: `${(goal.progress! / goal.target) * 100}%` }}
                        />
                      </div>
                    )}
                  </div>
                  {goal.target && (
                    <span className="goal-stats text-sm">
                      {goal.progress} / {goal.target}
                    </span>
                  )}
                </div>
              ))}
            </div>
            
            <button className="btn btn-secondary w-full mt-6">Adicionar Meta</button>
          </div>

          {/* Monthly Goals */}
          <div className="card goals-card">
            <div className="card-header mb-6">
              <h2 className="flex items-center gap-2"><Target size={20} /> Metas do Mês</h2>
            </div>
            
            <div className="goals-list">
              {monthlyGoals.map(goal => (
                <div key={goal.id} className={`goal-item ${goal.status}`}>
                  <div className="goal-icon">
                    {goal.status === 'completed' ? <CheckCircle2 className="text-accent-green" /> : <Circle />}
                  </div>
                  <div className="goal-info">
                    <h3>{goal.title}</h3>
                    {goal.target && (
                      <div className="goal-progress-bar">
                        <div 
                          className="goal-progress-fill" 
                          style={{ width: `${(goal.progress! / goal.target) * 100}%` }}
                        />
                      </div>
                    )}
                  </div>
                  {goal.target && (
                    <span className="goal-stats text-sm">
                      {goal.progress}%
                    </span>
                  )}
                </div>
              ))}
            </div>

            <button className="btn btn-secondary w-full mt-6">Adicionar Meta</button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .goals-page {
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
          color: var(--accent-pink);
          margin: 0 auto 1rem;
        }

        .page-header h1 {
          font-size: 2rem;
          margin-bottom: 0.5rem;
        }

        .page-header p {
          color: var(--text-secondary);
        }

        .goals-content {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .heatmap-grid {
          display: grid;
          grid-template-rows: repeat(7, 1fr);
          grid-auto-flow: column;
          gap: 4px;
          overflow-x: auto;
          padding-bottom: 0.5rem;
        }

        .heatmap-cell {
          width: 14px;
          height: 14px;
          border-radius: 3px;
          background: rgba(255, 255, 255, 0.05); /* Level 0 */
          transition: transform 0.1s;
        }

        .heatmap-cell:hover {
          transform: scale(1.2);
          z-index: 10;
        }

        .heatmap-cell[data-level="1"] { background: rgba(16, 185, 129, 0.2); }
        .heatmap-cell[data-level="2"] { background: rgba(16, 185, 129, 0.4); }
        .heatmap-cell[data-level="3"] { background: rgba(16, 185, 129, 0.7); }
        .heatmap-cell[data-level="4"] { background: var(--accent-green); box-shadow: 0 0 10px rgba(16, 185, 129, 0.5); }

        .heatmap-legend {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 0.5rem;
          font-size: 0.75rem;
          color: var(--text-tertiary);
        }

        .goals-lists {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
        }

        @media (max-width: 768px) {
          .goals-lists {
            grid-template-columns: 1fr;
          }
        }

        .goals-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .goal-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: var(--radius-md);
          transition: background var(--transition-fast);
        }

        .goal-item:hover {
          background: rgba(255, 255, 255, 0.05);
        }

        .goal-item.completed {
          opacity: 0.7;
        }

        .goal-item.completed h3 {
          text-decoration: line-through;
          color: var(--text-secondary);
        }

        .goal-icon {
          color: var(--text-tertiary);
          display: flex;
        }

        .goal-info {
          flex: 1;
        }

        .goal-info h3 {
          font-size: 0.9375rem;
          font-weight: 500;
          margin: 0;
        }

        .goal-progress-bar {
          height: 4px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: var(--radius-full);
          margin-top: 0.5rem;
          overflow: hidden;
        }

        .goal-progress-fill {
          height: 100%;
          background: var(--accent-indigo);
          border-radius: var(--radius-full);
        }

        .mb-4 { margin-bottom: 1rem; }
        .mb-6 { margin-bottom: 1.5rem; }
        .mt-4 { margin-top: 1rem; }
        .mt-6 { margin-top: 1.5rem; }
        .text-sm { font-size: 0.875rem; }
        .text-secondary { color: var(--text-secondary); }
        .text-accent-green { color: var(--accent-green); }
        .flex { display: flex; }
        .items-center { align-items: center; }
        .flex-between { display: flex; justify-content: space-between; align-items: center; }
        .gap-2 { gap: 0.5rem; }
        .w-full { width: 100%; }
      `}</style>
    </div>
  );
}
