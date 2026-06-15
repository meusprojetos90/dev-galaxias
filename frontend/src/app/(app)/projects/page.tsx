'use client';

import { FolderKanban, Code2, ExternalLink, Calendar, CheckCircle2, Clock } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const projects = [
  {
    id: 1,
    title: 'API Gateway em Go',
    description: 'Um API Gateway de alta performance construído com Go, suportando rate limiting, autenticação via JWT e roteamento dinâmico.',
    techs: ['Go', 'Redis', 'Docker'],
    status: 'completed',
    date: 'Dez 2025',
    repoUrl: '#',
    liveUrl: '#',
  },
  {
    id: 2,
    title: 'Microsserviço de Pagamentos',
    description: 'Processamento assíncrono de pagamentos utilizando mensageria para garantir consistência eventual e resiliência.',
    techs: ['Go', 'PostgreSQL', 'Kafka'],
    status: 'in_progress',
    date: 'Em andamento',
    repoUrl: '#',
  },
  {
    id: 3,
    title: 'Plataforma E-learning',
    description: 'Frontend completo para uma plataforma de cursos com player de vídeo customizado e acompanhamento de progresso em tempo real.',
    techs: ['Next.js', 'TypeScript', 'Tailwind'],
    status: 'planned',
    date: 'Previsto: Mar 2026',
  }
];

export default function ProjectsPage() {
  const router = useRouter();

  const handleProjectClick = (id: number) => {
    router.push(`/projects/${id}`);
  };

  return (
    <div className="projects-page">
      <header className="page-header animate-fade-in">
        <div className="header-icon mx-auto">
          <FolderKanban size={32} />
        </div>
        <h1>Portfólio de Projetos</h1>
        <p>Aplicações reais construídas durante a sua jornada estelar.</p>
      </header>

      <div className="projects-grid stagger-children">
        {projects.map((project) => (
          <div 
            key={project.id} 
            className="project-card card hover:border-[var(--glass-border-hover)] transition-all cursor-pointer"
            onClick={() => handleProjectClick(project.id)}
          >
            <div className="project-header">
              <div className={`status-badge ${project.status}`}>
                {project.status === 'completed' && <><CheckCircle2 size={14} /> Concluído</>}
                {project.status === 'in_progress' && <><Clock size={14} /> Em Andamento</>}
                {project.status === 'planned' && <><Calendar size={14} /> Planejado</>}
              </div>
              <span className="project-date">{project.date}</span>
            </div>
            
            <h3 className="project-title">{project.title}</h3>
            <p className="project-description">{project.description}</p>
            
            <div className="project-techs">
              {project.techs.map(tech => (
                <span key={tech} className="tech-tag">{tech}</span>
              ))}
            </div>

            <div className="project-actions">
              <button className="btn btn-primary btn-sm w-full" onClick={(e) => { e.stopPropagation(); handleProjectClick(project.id); }}>
                Abrir Workspace
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
