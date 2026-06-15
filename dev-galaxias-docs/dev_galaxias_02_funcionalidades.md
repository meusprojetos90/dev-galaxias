# 🌌 DEV GALÁXIAS — Documentação Oficial do Produto

## Parte 2: Funcionalidades Detalhadas

> **Versão:** 1.0.0  
> **Data:** 15 de Junho de 2026

---

# 5. Funcionalidades

## 5.1 Dashboard Principal

### 5.1.1 Visão Geral do Dashboard

O dashboard é o centro nervoso da experiência do aluno. Ele apresenta uma visão consolidada de todo o progresso, atividades pendentes e recomendações da IA.

**Componentes do Dashboard:**

| Componente | Descrição | Atualização |
|------------|-----------|-------------|
| **Streak Counter** | Dias consecutivos de estudo | Real-time |
| **XP & Level** | Barra de progresso com XP atual/próximo nível | Real-time |
| **Daily Mission** | 3 tarefas personalizadas para o dia | Diário às 00:00 |
| **Trilha Ativa** | Progresso na trilha atual com próxima aula | Real-time |
| **Projeto Ativo** | Status do projeto em andamento | Real-time |
| **Metas da Semana** | Checklist de metas semanais | Semanal |
| **Ranking** | Posição no ranking global e por turma | Real-time |
| **Calendário** | Heatmap de atividade (estilo GitHub) | Diário |
| **Recomendações IA** | Sugestões personalizadas do mentor | Real-time |
| **Notificações** | Conquistas, reviews, feedbacks | Real-time |

### 5.1.2 Daily Missions

A IA gera 3 missões diárias personalizadas baseadas em:

- Nível atual do aluno
- Pontos fracos identificados
- Trilha em andamento
- Metas configuradas
- Histórico recente

**Exemplos de Missões Diárias:**

```
🎯 Missão 1: Complete a aula "Goroutines e Channels" (20 XP)
🏋️ Missão 2: Resolva 2 exercícios de concorrência em Go (30 XP cada)
🚀 Missão 3: Implemente o endpoint POST /users no projeto API (50 XP)
```

**Bônus:**
- Completar todas as 3 missões: +30 XP bônus
- Completar missões por 7 dias seguidos: +100 XP bônus + badge

---

## 5.2 Sistema de Aprendizado

### 5.2.1 Tipos de Conteúdo

| Tipo | Formato | Duração Média | Interatividade |
|------|---------|---------------|----------------|
| **Aula Teórica** | Texto interativo + código | 15-20 min | Snippets executáveis |
| **Vídeo-Aula** | Vídeo com transcrição | 10-15 min | Timestamps clicáveis |
| **Live Coding** | Vídeo de codificação | 20-30 min | Código para acompanhar |
| **Sandbox** | Ambiente de código online | Variável | Editor integrado |
| **Quiz** | Perguntas múltipla escolha/código | 5-10 min | Feedback instantâneo |
| **Flashcard** | Conceitos para memorização | 5 min | Spaced repetition |
| **Artigo** | Texto longo aprofundado | 15-25 min | Links e referências |
| **Diagrama Interativo** | Visualização de conceitos | 5-10 min | Hover e zoom |

### 5.2.2 Estrutura de uma Aula

```
📚 Aula: Goroutines e Channels em Go
├── 📖 Introdução (2 min)
│   └── Contexto: Por que concorrência importa
├── 🎯 Objetivos (1 min)
│   ├── Entender goroutines
│   ├── Usar channels para comunicação
│   └── Evitar race conditions
├── 📝 Conteúdo Principal (15 min)
│   ├── Seção 1: O que são Goroutines
│   │   ├── Texto explicativo
│   │   ├── Código de exemplo (executável)
│   │   └── Mini-exercício inline
│   ├── Seção 2: Channels
│   │   ├── Texto explicativo
│   │   ├── Diagrama interativo
│   │   ├── Código de exemplo (executável)
│   │   └── Mini-exercício inline
│   └── Seção 3: Patterns Comuns
│       ├── Fan-out / Fan-in
│       ├── Pipeline
│       └── Worker Pool
├── ✅ Quiz de Verificação (5 min)
│   ├── 5 perguntas de múltipla escolha
│   └── 2 perguntas de código
├── 🏋️ Exercício Prático (20 min)
│   ├── Enunciado
│   ├── Testes automáticos
│   └── Critérios de avaliação
├── 🔗 Recursos Adicionais
│   ├── Documentação oficial
│   ├── Artigos recomendados
│   └── Vídeos complementares
└── ➡️ Próxima Aula: Select e Context
```

### 5.2.3 Editor de Código Integrado

**Features do Editor:**
- Syntax highlighting para Go, TypeScript, SQL, YAML, Dockerfile
- Autocompletion básico
- Terminal integrado
- Execução de código em sandbox isolado
- Testes automáticos integrados
- Diff view para comparar com solução
- Integração com Git (para projetos)

**Ambientes Sandbox:**
```
┌─────────────────────────────────────────┐
│  Sandbox Environments                    │
├─────────────────────────────────────────┤
│  🐹 Go Playground       │ Go 1.23+     │
│  📘 TypeScript Sandbox   │ Node 22+     │
│  🐘 PostgreSQL Console   │ PG 17        │
│  🐳 Docker Lab          │ Docker 27+    │
│  ☸️ K8s Playground       │ Kind/Minikube│
│  🤖 AI Notebook         │ Python 3.12+ │
└─────────────────────────────────────────┘
```

### 5.2.4 Spaced Repetition System (SRS)

Conceitos importantes são automaticamente adicionados ao sistema de repetição espaçada:

```
Novo conceito aprendido → Review em 1 dia
Lembrou → Review em 3 dias
Lembrou → Review em 7 dias
Lembrou → Review em 14 dias
Lembrou → Review em 30 dias
Lembrou → Review em 90 dias
Esqueceu → Reset para 1 dia
```

---

## 5.3 Sistema de Code Review IA

### 5.3.1 Pipeline de Análise

```
Código Submetido
    │
    ├─── [1] Compilação/Syntax Check
    │         └── Erros de compilação → Feedback imediato
    │
    ├─── [2] Análise Estática (golangci-lint, eslint)
    │         ├── Lint errors
    │         ├── Code smells
    │         └── Security issues
    │
    ├─── [3] Execução de Testes
    │         ├── Testes do aluno
    │         ├── Testes ocultos da plataforma
    │         └── Coverage report
    │
    ├─── [4] Análise de IA (LLM)
    │         ├── Clean Code analysis
    │         ├── Pattern recognition
    │         ├── Architecture review
    │         ├── Performance suggestions
    │         └── Best practices check
    │
    └─── [5] Score Composto
              ├── Score numérico (0-100)
              ├── Breakdown por dimensão
              ├── Comentários inline
              └── Sugestões de melhoria
```

### 5.3.2 Relatório de Code Review

```markdown
═══════════════════════════════════════════
 CODE REVIEW REPORT — Exercício #4521
═══════════════════════════════════════════

 📊 Score Total: 78/100

 ┌──────────────┬───────┬──────────────┐
 │ Dimensão     │ Score │ Status       │
 ├──────────────┼───────┼──────────────┤
 │ Clean Code   │ 85/100│ ✅ Bom       │
 │ Performance  │ 70/100│ ⚠️ Regular   │
 │ Segurança    │ 90/100│ ✅ Excelente │
 │ Testes       │ 60/100│ ❌ Precisa   │
 │ Arquitetura  │ 80/100│ ✅ Bom       │
 │ Complexidade │ 75/100│ ⚠️ Regular   │
 └──────────────┴───────┴──────────────┘

 📝 Comentários:

 [Linha 23] ⚠️ Variável 'x' — use nome descritivo
 Sugestão: Renomeie para 'userCount' ou similar
 Conceito: Clean Code > Naming Conventions

 [Linha 45] ❌ SQL concatenado — risco de injection
 Sugestão: Use prepared statements
 Conceito: Security > SQL Injection Prevention

 [Linha 67] ⚠️ Faltam testes para edge cases
 Sugestão: Adicione testes para input vazio e nil
 Conceito: Testing > Edge Cases

 🎯 Próximos Passos:
 1. Melhorar cobertura de testes (meta: 80%)
 2. Revisar naming conventions
 3. Estudar: Aula "SQL Injection em Go"
═══════════════════════════════════════════
```

### 5.3.3 Evolução do Code Review

O sistema rastreia a evolução do aluno ao longo do tempo:

```
Score médio por mês:
Jan: ████████░░ 45/100
Fev: █████████░ 52/100  (+7)
Mar: ██████████ 61/100  (+9)
Abr: ██████████ 68/100  (+7)
Mai: ██████████ 74/100  (+6)
Jun: ██████████ 81/100  (+7) 🏆
```

---

## 5.4 Mentor IA

### 5.4.1 Capabilities do Mentor

| Capability | Descrição | Exemplo de Interação |
|------------|-----------|---------------------|
| **Tutoria** | Explica conceitos com analogias | "Pense em channels como um tubo de comunicação..." |
| **Diagnóstico** | Identifica gaps de conhecimento | "Percebi que você erra 60% das questões de ponteiros" |
| **Planejamento** | Cria planos de estudo personalizados | "Esta semana foque em: goroutines (2h) + testes (1h)" |
| **Debugging** | Ajuda a debugar sem dar resposta | "O erro está na linha 23. O que essa função retorna?" |
| **Motivação** | Mantém aluno engajado | "Você já completou 70% da trilha! Continue assim!" |
| **Desafio** | Propõe desafios calibrados | "Tente resolver isso sem usar for loops" |
| **Reflexão** | Promove metacognição | "Por que você escolheu um slice ao invés de um map?" |

### 5.4.2 Contexto do Mentor

O Mentor IA mantém contexto completo do aluno:

```json
{
  "student_profile": {
    "current_level": "intermediário",
    "tracks_completed": ["nivel_0", "nivel_1"],
    "tracks_in_progress": ["nivel_2"],
    "total_xp": 4520,
    "streak_days": 15,
    "avg_code_review_score": 72,
    "weak_areas": ["testing", "error_handling"],
    "strong_areas": ["clean_code", "algorithms"],
    "learning_style": "prático",
    "preferred_time": "noite",
    "goals": {
      "short_term": "Completar trilha de APIs REST",
      "long_term": "Conseguir emprego como dev Pleno"
    },
    "recent_submissions": [...],
    "recent_struggles": [...],
    "personality_notes": "Prefere exemplos práticos, desanima com teoria longa"
  }
}
```

### 5.4.3 Modos de Interação

1. **Chat Livre**: Conversa aberta sobre qualquer tema técnico
2. **Help Mode**: Ajuda contextual durante exercício (dicas progressivas)
3. **Review Mode**: Revisão semanal de progresso
4. **Planning Mode**: Planejamento de metas e agenda
5. **Interview Mode**: Preparação para entrevistas
6. **Architecture Mode**: Discussão de decisões arquiteturais
7. **Career Mode**: Orientação de carreira

---

## 5.5 Entrevistador IA

### 5.5.1 Estrutura da Entrevista por Nível

#### Nível Júnior (45 min)

| Fase | Duração | Conteúdo |
|------|---------|----------|
| Apresentação | 5 min | Background, motivação |
| Conceitos | 10 min | Estruturas de dados, HTTP, SQL básico |
| Coding | 20 min | 2 problemas fáceis/médios |
| Behavioral | 5 min | Trabalho em equipe, aprendizado |
| Perguntas | 5 min | Perguntas do candidato |

#### Nível Pleno (60 min)

| Fase | Duração | Conteúdo |
|------|---------|----------|
| Apresentação | 5 min | Experiência, projetos |
| Conceitos | 10 min | Concorrência, patterns, caching |
| Coding | 25 min | 2 problemas médios/difíceis |
| System Design | 15 min | Design de sistema simples |
| Behavioral | 5 min | Resolução de conflitos, mentoria |

#### Nível Sênior (75 min)

| Fase | Duração | Conteúdo |
|------|---------|----------|
| Apresentação | 5 min | Impacto, decisões técnicas |
| Deep Dive | 15 min | Sistemas distribuídos, trade-offs |
| Coding | 25 min | 2 problemas difíceis |
| System Design | 25 min | Design de sistema complexo (alta escala) |
| Behavioral | 5 min | Liderança técnica, influência |

#### Nível Staff (90 min)

| Fase | Duração | Conteúdo |
|------|---------|----------|
| Apresentação | 5 min | Visão estratégica, impacto organizacional |
| Architecture | 25 min | Design de plataforma, migração, evolução |
| Coding | 20 min | Problema complexo com trade-offs |
| System Design | 30 min | Sistema distribuído multi-região |
| Leadership | 10 min | Influência cross-team, RFC, decisões |

#### Nível Principal (90 min)

| Fase | Duração | Conteúdo |
|------|---------|----------|
| Vision | 10 min | Visão técnica de longo prazo |
| Architecture | 30 min | Design de sistema novel, pesquisa |
| Deep Dive | 20 min | Expertise profunda em domínio |
| System Design | 20 min | Problema nunca resolvido antes |
| Leadership | 10 min | Impacto na indústria, mentoria de Staff |

### 5.5.2 Relatório de Entrevista

```
═══════════════════════════════════════════
 RELATÓRIO DE ENTREVISTA TÉCNICA
═══════════════════════════════════════════

 Candidato: Carlos Silva
 Nível: Pleno
 Data: 15/06/2026
 Duração: 58 minutos

 ┌──────────────────┬───────┬────────────┐
 │ Competência       │ Nota  │ Status     │
 ├──────────────────┼───────┼────────────┤
 │ Comunicação      │ 4/5   │ ✅ Forte   │
 │ Problem Solving  │ 3/5   │ ⚠️ Bom    │
 │ Coding Skills    │ 3/5   │ ⚠️ Bom    │
 │ System Design    │ 2/5   │ ❌ Fraco   │
 │ Conhecimento     │ 4/5   │ ✅ Forte   │
 │ Behavioral       │ 4/5   │ ✅ Forte   │
 └──────────────────┴───────┴────────────┘

 Score Total: 67/100 — ⚠️ NÃO APROVADO (mínimo: 70)

 📋 Feedback Detalhado:

 ✅ Pontos Fortes:
 - Excelente comunicação do raciocínio
 - Bom conhecimento de Go e PostgreSQL
 - Demonstrou maturidade em respostas behavioral

 ❌ Áreas de Melhoria:
 - System Design precisa de prática significativa
   → Estudar: CAP theorem, scaling patterns, caching
 - Coding: Atenção com edge cases
   → Praticar: Exercícios difíceis de algoritmos
 - Faltou mencionar observabilidade no design

 🎯 Plano de Ação:
 1. Completar módulo "System Design Fundamentals" (2 semanas)
 2. Fazer 10 exercícios de design problems
 3. Re-agendar entrevista em 30 dias

═══════════════════════════════════════════
```

---

## 5.6 Sistema de Metas

### 5.6.1 Hierarquia de Metas

```
🎯 Meta Anual (definida no onboarding / revisão anual)
│   "Atingir nível Pleno e conseguir emprego"
│
├── 📅 Meta Trimestral Q1
│   "Completar trilhas Go Básico + API REST"
│   │
│   ├── 📆 Meta Mensal - Janeiro
│   │   "Completar módulos 1-4 de Go Básico"
│   │   │
│   │   ├── 📋 Meta Semanal - Semana 1
│   │   │   "Completar módulo 1: Variáveis e Tipos"
│   │   │   │
│   │   │   ├── ✅ Meta Diária - Segunda
│   │   │   │   "Aula 1.1 + 2 exercícios fáceis"
│   │   │   ├── ✅ Meta Diária - Terça
│   │   │   │   "Aula 1.2 + 1 exercício médio"
│   │   │   ├── ✅ Meta Diária - Quarta
│   │   │   │   "Aula 1.3 + exercício prático"
│   │   │   ├── ⬜ Meta Diária - Quinta
│   │   │   │   "Revisão + quiz do módulo"
│   │   │   └── ⬜ Meta Diária - Sexta
│   │   │       "Exercício integrador + flashcards"
```

### 5.6.2 Ajuste Automático de Metas

A IA ajusta metas automaticamente baseada em:

| Indicador | Ação da IA |
|-----------|-----------|
| Aluno completou meta 20%+ mais rápido | Acelera próximas metas, propõe desafios extras |
| Aluno completou meta no prazo | Mantém ritmo atual |
| Aluno atrasou 1-2 dias | Alerta suave, redistribui tarefas na semana |
| Aluno atrasou 3-5 dias | Reduz escopo semanal, foca no essencial |
| Aluno atrasou 1+ semana | Reunião com mentor IA para replanejar |
| Aluno parou 2+ semanas | Notificação de reengajamento, simplifica retorno |

### 5.6.3 Dashboard de Metas

```
📊 Progresso Semanal (Semana 23/2026)

✅ Completar Aula 3.4 — Middleware em Go        [DONE]
✅ Exercício: Implementar auth JWT               [DONE]
🔄 Projeto: Endpoint POST /login                [70%]
⬜ Quiz do Módulo 3                              [PENDENTE]
⬜ 2 exercícios de revisão                       [PENDENTE]

Progresso: ████████░░ 60% (3/5 tarefas)
Previsão: 🟢 No prazo (2 dias restantes)
```

---

## 5.7 Gamificação

### 5.7.1 Sistema de XP

| Atividade | XP Base | Bônus |
|-----------|---------|-------|
| Completar aula | 10 XP | +5 se < 2 erros no quiz |
| Exercício fácil | 10 XP | +5 primeira tentativa |
| Exercício médio | 30 XP | +15 primeira tentativa |
| Exercício difícil | 100 XP | +50 primeira tentativa |
| Exercício especialista | 300 XP | +150 primeira tentativa |
| Projeto milestone | 200 XP | +100 se code review > 80 |
| Projeto completo | 1000 XP | +500 se nota final > 85 |
| Quiz perfeito | 50 XP | — |
| Daily mission completa | 20 XP | +30 se todas as 3 |
| Streak 7 dias | 100 XP | — |
| Streak 30 dias | 500 XP | — |
| Streak 100 dias | 2000 XP | + badge épica |
| Streak 365 dias | 10000 XP | + badge lendária |
| Entrevista aprovada | 500 XP | — |
| Code review score 90+ | 50 XP | — |
| Ajudar outro aluno | 25 XP | — |

### 5.7.2 Sistema de Níveis

```
Nível  1: Cadet               0 XP
Nível  2: Explorer            100 XP
Nível  3: Pioneer             300 XP
Nível  4: Navigator           600 XP
Nível  5: Astronaut           1.000 XP
Nível 10: Commander           3.000 XP
Nível 15: Captain             6.000 XP
Nível 20: Admiral             10.000 XP
Nível 25: Star Commander      15.000 XP
Nível 30: Galaxy Defender     22.000 XP
Nível 35: Nebula Master       30.000 XP
Nível 40: Constellation Lord  40.000 XP
Nível 45: Supernova           55.000 XP
Nível 50: Cosmic Architect    75.000 XP
Nível 60: Galaxy Emperor      100.000 XP
Nível 70: Universe Creator    150.000 XP
Nível 80: Multiverse God      200.000 XP
Nível 90: Infinity Walker     300.000 XP
Nível 99: The Singularity     500.000 XP
Nível 100: ∞ Transcendence    1.000.000 XP
```

### 5.7.3 Conquistas (Achievements)

#### Categoria: Aprendizado
| Badge | Nome | Condição | Raridade |
|-------|------|----------|----------|
| 🌱 | First Step | Completar primeira aula | Comum |
| 📚 | Bookworm | Completar 50 aulas | Raro |
| 🎓 | Scholar | Completar uma trilha inteira | Épico |
| 🏫 | Academy Graduate | Completar 5 trilhas | Lendário |
| 🌌 | Galaxy Brain | Completar todas as trilhas | Mítico |

#### Categoria: Código
| Badge | Nome | Condição | Raridade |
|-------|------|----------|----------|
| ⌨️ | First Commit | Primeiro exercício entregue | Comum |
| 💎 | Clean Coder | 10 exercícios com score 90+ | Raro |
| 🏆 | Perfect Score | Code review com score 100 | Épico |
| 🔥 | Code Machine | 100 exercícios completados | Épico |
| ⚡ | Speed Demon | Exercício difícil em < 10 min | Lendário |
| 🧙 | Code Wizard | 50 exercícios com score 95+ | Lendário |

#### Categoria: Projetos
| Badge | Nome | Condição | Raridade |
|-------|------|----------|----------|
| 🔨 | Builder | Primeiro projeto completo | Comum |
| 🏗️ | Architect | Projeto com score arquitetura 90+ | Raro |
| 🚀 | Deployer | Primeiro deploy bem-sucedido | Raro |
| 🌐 | Full Stack | Projeto com frontend + backend + mobile | Épico |
| 👑 | Staff Project | Projeto nível Staff completo | Lendário |

#### Categoria: Consistência
| Badge | Nome | Condição | Raridade |
|-------|------|----------|----------|
| 📅 | Week Warrior | Streak de 7 dias | Comum |
| 🗓️ | Month Master | Streak de 30 dias | Raro |
| 📆 | Quarter Hero | Streak de 90 dias | Épico |
| 🎖️ | Year Legend | Streak de 365 dias | Lendário |

#### Categoria: Entrevistas
| Badge | Nome | Condição | Raridade |
|-------|------|----------|----------|
| 🎤 | First Interview | Primeira entrevista simulada | Comum |
| ✅ | Interview Pass | Aprovado em entrevista Júnior | Raro |
| 🎯 | Senior Ready | Aprovado em entrevista Sênior | Épico |
| 👔 | Staff Ready | Aprovado em entrevista Staff | Lendário |
| 🌟 | Principal Ready | Aprovado em entrevista Principal | Mítico |

### 5.7.4 Rankings

| Ranking | Escopo | Reset | Prêmio |
|---------|--------|-------|--------|
| **Diário** | XP ganho no dia | Diário | Badge top 10 |
| **Semanal** | XP ganho na semana | Semanal | Badge top 10 + XP bônus |
| **Mensal** | XP ganho no mês | Mensal | Badge top 10 + título |
| **All-time** | XP total | Nunca | Título permanente |
| **Por Trilha** | XP na trilha específica | Nunca | Badge de trilha |
| **Por Turma** | XP entre colegas de turma | Variável | Badge de turma |

### 5.7.5 Missões Especiais

| Tipo | Frequência | Exemplo | Recompensa |
|------|------------|---------|------------|
| **Daily Quest** | Diária | "Resolva 3 exercícios hoje" | 50 XP |
| **Weekly Challenge** | Semanal | "Score médio > 80 esta semana" | 200 XP + badge |
| **Monthly Mission** | Mensal | "Complete módulo + projeto" | 500 XP + badge |
| **Seasonal Event** | Trimestral | "Hackathon: Crie um CLI tool" | 2000 XP + badge épica |
| **Boss Battle** | Sob demanda | "Exercício nível Expert em < 30min" | 1000 XP + badge lendária |

---

## 5.8 Sistema de Projetos

### 5.8.1 Catálogo de Projetos por Nível

#### 🟢 Nível Iniciante (0-500 XP)

**Projeto 1: Calculadora CLI**
```
Escopo: CLI em Go que realiza operações matemáticas
Duração: 1 semana
Skills: Go basics, I/O, error handling
Sprints: 2
Critérios:
  - 4 operações básicas
  - Validação de input
  - Testes unitários (≥ 70% coverage)
  - README.md completo
```

**Projeto 2: ToDo CLI**
```
Escopo: Gerenciador de tarefas via terminal
Duração: 2 semanas
Skills: Go, file I/O, JSON, structs
Sprints: 3
Critérios:
  - CRUD de tarefas
  - Persistência em arquivo JSON
  - Filtros (status, prioridade)
  - Testes unitários (≥ 75% coverage)
```

#### 🔵 Nível Júnior (500-3000 XP)

**Projeto 3: API REST - Book Store**
```
Escopo: API REST completa para gerenciar uma livraria
Duração: 3 semanas
Skills: Go, HTTP, PostgreSQL, Docker, REST
Sprints: 4
Critérios:
  - CRUD de livros e autores
  - Autenticação JWT
  - PostgreSQL com migrations
  - Docker Compose
  - Testes (≥ 80% coverage)
  - Documentação Swagger
  - Rate limiting
```

**Projeto 4: URL Shortener**
```
Escopo: Serviço de encurtamento de URLs com analytics
Duração: 2 semanas
Skills: Go, Redis, PostgreSQL, Docker
Sprints: 3
Critérios:
  - Encurtar e redirecionar URLs
  - Analytics de cliques
  - Cache com Redis
  - Rate limiting por IP
  - Deploy com Docker
```

#### 🟡 Nível Pleno (3000-10000 XP)

**Projeto 5: CRM System**
```
Escopo: Sistema completo de gerenciamento de clientes
Duração: 6 semanas
Skills: Go, PostgreSQL, Redis, Docker, Clean Arch, DDD
Sprints: 6
Critérios:
  - Gestão de contatos, empresas, deals
  - Pipeline de vendas
  - Dashboard com métricas
  - Notificações via NATS
  - RBAC (Role-Based Access Control)
  - API documentada
  - Testes integração + e2e
  - CI/CD pipeline
  - Deploy em cloud
```

**Projeto 6: Chat Real-time**
```
Escopo: Sistema de chat com WebSocket e mensageria
Duração: 4 semanas
Skills: Go, WebSocket, NATS, Redis, PostgreSQL
Sprints: 5
Critérios:
  - Chat 1-to-1 e grupos
  - Presença online/offline
  - Histórico de mensagens
  - Notificações push
  - Arquitetura event-driven
```

#### 🟠 Nível Sênior (10000-30000 XP)

**Projeto 7: ERP Modular**
```
Escopo: Sistema ERP com módulos independentes
Duração: 10 semanas
Skills: Go, microservices, CQRS, Event Sourcing, K8s
Sprints: 10
Módulos:
  - Financeiro (contas a pagar/receber)
  - Estoque
  - Vendas
  - RH
Critérios:
  - Arquitetura de microserviços
  - CQRS + Event Sourcing
  - Comunicação via NATS/Kafka
  - API Gateway
  - Observabilidade (OpenTelemetry)
  - Deploy em Kubernetes
  - Documentação arquitetural (ADRs)
  - Performance testing
  - Chaos engineering básico
```

#### 🔴 Nível Staff (30000-75000 XP)

**Projeto 8: Plataforma SaaS Multi-Tenant**
```
Escopo: Plataforma SaaS com isolamento multi-tenant
Duração: 14 semanas
Skills: Todas do nível Sênior + multi-tenancy, billing, compliance
Sprints: 14
Critérios:
  - Multi-tenancy (schema-based isolation)
  - Billing e subscription (Stripe)
  - Admin dashboard
  - Custom domains por tenant
  - Rate limiting por tenant
  - Compliance (LGPD/GDPR)
  - Blue-green deployments
  - Multi-region deployment
  - SLA dashboard
  - RFC/Design Document
  - Runbooks operacionais
  - Load testing (10K req/s)
```

#### ⚫ Nível Principal (75000+ XP)

**Projeto 9: Plataforma de IA Multiagente**
```
Escopo: Plataforma que orquestra múltiplos agentes de IA
Duração: 16 semanas
Skills: Todas as anteriores + IA, RAG, MCP, agentes
Sprints: 16
Critérios:
  - Orquestrador de agentes
  - RAG com embeddings
  - MCP (Model Context Protocol)
  - Tool calling / function calling
  - Memória de longo prazo
  - Avaliação de qualidade (LLM-as-judge)
  - Pipeline de treinamento/fine-tuning
  - Guardrails de segurança
  - Escalabilidade horizontal
  - Documentação de pesquisa
  - Paper/Tech Report
```

### 5.8.2 Estrutura de um Projeto

Cada projeto gerado pela IA segue esta estrutura:

```markdown
# Projeto: [Nome]

## 1. Visão Geral
Descrição do projeto e seu propósito no mundo real.

## 2. Requisitos Funcionais
- RF01: O sistema deve...
- RF02: O sistema deve...

## 3. Requisitos Não-Funcionais
- RNF01: Latência p99 < 200ms
- RNF02: Disponibilidade 99.9%

## 4. Arquitetura
- Diagrama de componentes
- Decisões arquiteturais (ADRs)
- Stack tecnológica

## 5. Modelo de Dados
- ERD (Entity Relationship Diagram)
- Schemas de banco de dados
- Migrations

## 6. API Design
- OpenAPI spec
- Endpoints
- Autenticação

## 7. Sprints
Sprint 1: [Escopo]
Sprint 2: [Escopo]
...

## 8. Critérios de Aceitação
- [ ] Feature X funciona
- [ ] Testes com coverage > X%
- [ ] Deploy funcionando

## 9. Deploy
- Dockerfile
- docker-compose.yml
- Kubernetes manifests (se aplicável)
- CI/CD pipeline

## 10. Avaliação
- Code review por sprint
- Score final do projeto
- Feedback arquitetural
```

---

## 5.9 Funcionalidades Adicionais

### 5.9.1 Portfolio Automático

A plataforma gera automaticamente um portfolio profissional com:

- Projetos completados (com links para repositórios)
- Skills validadas (com scores)
- Certificados de trilha
- Estatísticas de contribuição
- Score de code review médio
- Entrevistas aprovadas
- Link público para compartilhar

### 5.9.2 Sistema de Certificados

Ao completar uma trilha, o aluno recebe um certificado digital com:
- Nome completo
- Trilha completada
- Carga horária
- Score médio
- Projetos entregues
- QR code para verificação
- Blockchain timestamp (prova de autenticidade)

### 5.9.3 Comunidade

| Feature | Descrição |
|---------|-----------|
| Fórum por trilha | Discussões organizadas por tema |
| Code Pairing | Match com outro aluno para pair programming |
| Study Groups | Grupos de estudo com até 5 pessoas |
| Mentoria P2P | Alunos avançados mentoram iniciantes (+XP) |
| Showcase | Compartilhar projetos finalizados |
| Challenges | Competições semanais entre alunos |

### 5.9.4 Notificações Inteligentes

| Trigger | Notificação | Canal |
|---------|-------------|-------|
| Streak em risco | "Faltam 2h para perder seu streak de 15 dias!" | Push + Email |
| Meta atrasada | "Sua meta semanal está 40% atrasada" | Push |
| Novo exercício disponível | "Exercício novo na sua trilha!" | In-app |
| Code review pronto | "Seu código foi revisado: 82/100" | Push + In-app |
| Conquista desbloqueada | "🏆 Nova conquista: Clean Coder!" | Push + In-app |
| Ranking atualizado | "Você subiu para #3 no ranking semanal!" | In-app |
| Mentor IA | "Hora da revisão semanal com seu mentor" | Push |
