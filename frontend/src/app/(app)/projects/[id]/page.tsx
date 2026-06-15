'use client';

import { Terminal, Code2, Play, Sparkles, Send, ChevronRight, FileCode2, LayoutTemplate } from 'lucide-react';
import Link from 'next/link';
import { useState, use } from 'react';

// Mock data for the current project
const projectDetail = {
  id: 1,
  title: 'API Gateway em Go',
  status: 'in_progress',
  files: ['main.go', 'router.go', 'middleware.go', 'config.json'],
  activeFile: 'main.go',
};

const mockCode = `package main

import (
\t"fmt"
\t"log"
\t"net/http"
\t"time"

\t"github.com/devgalaxias/api-gateway/router"
\t"github.com/devgalaxias/api-gateway/middleware"
)

func main() {
\tfmt.Println("🚀 Iniciando API Gateway...")
\t
\tr := router.New()
\t
\t// Aplicando rate limiting global
\tr.Use(middleware.RateLimit(100, time.Minute))
\t
\t// Autenticação JWT
\tr.Use(middleware.RequireAuth())
\t
\tlog.Fatal(http.ListenAndServe(":8080", r))
}`;

const mockTerminal = `dev@galaxias:~/workspace/api-gateway$ go run main.go
🚀 Iniciando API Gateway...
[INFO] Servidor rodando na porta :8080
[INFO] Rate limiter configurado: 100 req/min
[INFO] Conexão com Redis estabelecida.

> GET /api/v1/users (200 OK) - 12ms
> POST /api/v1/auth/login (200 OK) - 45ms
> GET /api/v1/products (429 Too Many Requests) - 2ms
`;

export default function ProjectWorkspacePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [activeTab, setActiveTab] = useState('main.go');
  const [isRunning, setIsRunning] = useState(false);

  const handleRun = () => {
    setIsRunning(true);
    setTimeout(() => setIsRunning(false), 2000);
  };

  return (
    <div className="project-workspace-page">
      <div className="breadcrumb">
        <Link href="/projects">Projetos</Link> <ChevronRight size={14} /> 
        <span>{projectDetail.title}</span>
      </div>

      <div className="workspace-header">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">{projectDetail.title}</h1>
          <p className="text-[var(--text-secondary)] text-sm mt-1">Ambiente de Desenvolvimento Isolado</p>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="btn btn-secondary flex items-center gap-2">
            <Sparkles size={16} className="text-[var(--accent-purple-light)]" />
            Dicas do Mentor IA
          </button>
          <button className="btn btn-primary flex items-center gap-2">
            <Send size={16} />
            Submeter Projeto
          </button>
        </div>
      </div>

      <div className="workspace-split">
        {/* Editor Pane */}
        <div className="workspace-pane card !p-0 overflow-hidden border border-[var(--glass-border)]">
          <div className="editor-header justify-between">
            <div className="flex items-center gap-2 text-[var(--text-secondary)] text-sm font-medium">
              <Code2 size={16} className="text-[var(--accent-indigo)]" />
              Editor de Código
            </div>
            <button 
              className="btn btn-primary btn-sm flex items-center gap-2 !py-1 !px-3"
              onClick={handleRun}
              disabled={isRunning}
            >
              <Play size={14} fill={isRunning ? "transparent" : "currentColor"} />
              {isRunning ? 'Executando...' : 'Executar (Run)'}
            </button>
          </div>
          
          <div className="editor-tabs">
            {projectDetail.files.map(file => (
              <div 
                key={file} 
                className={`editor-tab ${activeTab === file ? 'active' : ''}`}
                onClick={() => setActiveTab(file)}
              >
                <FileCode2 size={14} />
                {file}
              </div>
            ))}
          </div>
          
          <div className="editor-content whitespace-pre">
            {activeTab === 'main.go' ? mockCode : `// Conteúdo do arquivo ${activeTab}\n// ...`}
          </div>
        </div>

        {/* Preview / Terminal Pane */}
        <div className="workspace-pane card !p-0 overflow-hidden border border-[var(--glass-border)]">
          <div className="preview-header">
            <div className="flex items-center gap-2 text-[var(--text-secondary)] text-sm font-medium">
              <Terminal size={16} className="text-[var(--accent-green)]" />
              Terminal / Preview
            </div>
          </div>
          
          <div className="preview-content whitespace-pre">
            {isRunning ? 'Compilando...' : mockTerminal}
          </div>
        </div>
      </div>
    </div>
  );
}
