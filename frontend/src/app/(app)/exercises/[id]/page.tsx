'use client';

import { useState } from 'react';
import { Play, CheckCircle2, ChevronLeft, Lightbulb, AlertCircle } from 'lucide-react';
import Link from 'next/link';

export default function ExerciseEditorPage() {
  const [code, setCode] = useState('// Escreva sua solução aqui...\nfunction somaArray(numeros) {\n  \n}');
  const [isRunning, setIsRunning] = useState(false);
  const [results, setResults] = useState<{ status: 'idle' | 'success' | 'error'; message: string }>({ status: 'idle', message: '' });

  const handleRunCode = () => {
    setIsRunning(true);
    setResults({ status: 'idle', message: '' });
    
    // Simulate code execution
    setTimeout(() => {
      setIsRunning(false);
      setResults({
        status: 'success',
        message: 'Todos os 5 testes passaram! 🎉'
      });
    }, 1500);
  };

  return (
    <div className="editor-layout">
      <div className="editor-header glass-card">
        <Link href="/exercises" className="back-btn">
          <ChevronLeft size={18} /> Voltar para lista
        </Link>
        <div className="exercise-title">
          <span className="badge badge-blue">Fácil</span>
          <h2>Soma de Array</h2>
        </div>
        <div className="header-actions">
          <button className="btn btn-primary" onClick={handleRunCode} disabled={isRunning}>
            {isRunning ? 'Executando...' : <><Play size={16} /> Executar Código</>}
          </button>
        </div>
      </div>

      <div className="editor-workspace">
        {/* Left Panel: Problem description */}
        <div className="problem-panel glass-card">
          <div className="panel-content">
            <h3>Descrição</h3>
            <p>Escreva uma função que receba um array de números inteiros e retorne a soma de todos os elementos.</p>
            
            <h4>Exemplos</h4>
            <pre className="code-block">
              somaArray([1, 2, 3]) // Retorna 6{'\n'}
              somaArray([10, -5, 5]) // Retorna 10
            </pre>
            
            <div className="alert info mt-6">
              <Lightbulb size={16} />
              <span><strong>Dica:</strong> Você pode usar um laço de repetição ou métodos de array como reduce().</span>
            </div>
          </div>
        </div>

        {/* Right Panel: Code Editor */}
        <div className="code-panel glass-card">
          <div className="code-header">
            <span className="lang-tab active">JavaScript</span>
            <span className="lang-tab">Python</span>
            <span className="lang-tab">Go</span>
          </div>
          
          <div className="editor-area">
            {/* Simple mock editor using textarea */}
            <textarea 
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="mock-editor"
              spellCheck="false"
            />
          </div>

          <div className={`console-area ${results.status}`}>
            <div className="console-header">Console Output</div>
            <div className="console-body">
              {results.status === 'idle' && <span className="text-muted">Aguardando execução...</span>}
              {results.status === 'success' && <span className="text-accent-green flex items-center gap-2"><CheckCircle2 size={16} /> {results.message}</span>}
              {results.status === 'error' && <span className="text-accent-red flex items-center gap-2"><AlertCircle size={16} /> {results.message}</span>}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .editor-layout {
          display: flex;
          flex-direction: column;
          height: calc(100vh - var(--header-height) - 4rem);
          gap: 1.5rem;
        }

        .editor-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1rem 1.5rem;
        }

        .back-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--text-secondary);
          text-decoration: none;
          font-weight: 500;
          font-size: 0.875rem;
        }

        .back-btn:hover {
          color: var(--text-primary);
        }

        .exercise-title {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .exercise-title h2 {
          margin: 0;
          font-size: 1.25rem;
        }

        .editor-workspace {
          display: flex;
          flex: 1;
          gap: 1.5rem;
          min-height: 0;
        }

        .problem-panel, .code-panel {
          flex: 1;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        .panel-content {
          padding: 1.5rem;
          overflow-y: auto;
          flex: 1;
        }

        .panel-content h3 {
          font-size: 1.125rem;
          margin-bottom: 1rem;
          color: var(--text-primary);
        }

        .panel-content h4 {
          font-size: 1rem;
          margin: 1.5rem 0 0.75rem;
        }

        .panel-content p {
          color: var(--text-secondary);
          line-height: 1.6;
        }

        .code-block {
          background: rgba(0, 0, 0, 0.3);
          padding: 1rem;
          border-radius: var(--radius-md);
          border: 1px solid var(--glass-border);
          font-family: var(--font-mono);
          font-size: 0.875rem;
          color: var(--text-secondary);
        }

        .alert {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          padding: 1rem;
          border-radius: var(--radius-md);
          font-size: 0.875rem;
          line-height: 1.5;
        }

        .alert.info {
          background: rgba(59, 130, 246, 0.1);
          border: 1px solid rgba(59, 130, 246, 0.2);
          color: var(--accent-blue-light);
        }

        .code-header {
          display: flex;
          border-bottom: 1px solid var(--glass-border);
          background: rgba(0, 0, 0, 0.2);
        }

        .lang-tab {
          padding: 0.75rem 1.5rem;
          font-size: 0.875rem;
          font-weight: 500;
          color: var(--text-secondary);
          cursor: pointer;
          border-right: 1px solid var(--glass-border);
          border-bottom: 2px solid transparent;
        }

        .lang-tab:hover {
          background: rgba(255, 255, 255, 0.05);
        }

        .lang-tab.active {
          color: var(--text-primary);
          border-bottom-color: var(--accent-indigo);
          background: rgba(255, 255, 255, 0.02);
        }

        .editor-area {
          flex: 1;
          display: flex;
          flex-direction: column;
          background: rgba(0, 0, 0, 0.4);
        }

        .mock-editor {
          flex: 1;
          background: transparent;
          border: none;
          color: var(--text-primary);
          font-family: var(--font-mono);
          font-size: 0.875rem;
          padding: 1.5rem;
          resize: none;
          outline: none;
          line-height: 1.6;
        }

        .console-area {
          height: 150px;
          border-top: 1px solid var(--glass-border);
          display: flex;
          flex-direction: column;
          background: rgba(0, 0, 0, 0.5);
        }

        .console-header {
          padding: 0.5rem 1rem;
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--text-tertiary);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          border-bottom: 1px solid var(--glass-border);
        }

        .console-body {
          flex: 1;
          padding: 1rem;
          font-family: var(--font-mono);
          font-size: 0.875rem;
          overflow-y: auto;
        }

        .mt-6 { margin-top: 1.5rem; }
        .text-accent-green { color: var(--accent-green); }
        .text-accent-red { color: var(--accent-red); }
        .text-muted { color: var(--text-muted); }
        .flex { display: flex; }
        .items-center { align-items: center; }
        .gap-2 { gap: 0.5rem; }
      `}</style>
    </div>
  );
}
