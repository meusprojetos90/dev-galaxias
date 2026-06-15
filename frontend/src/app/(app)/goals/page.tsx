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


    </div>
  );
}
