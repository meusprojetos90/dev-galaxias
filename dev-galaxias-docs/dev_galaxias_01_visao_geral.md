# 🌌 DEV GALÁXIAS — Documentação Oficial do Produto

## Parte 1: Visão Geral, Objetivos, Personas e Fluxos

> **Versão:** 1.0.0  
> **Data:** 15 de Junho de 2026  
> **Classificação:** Documentação Oficial de Produto  
> **Status:** Draft para Revisão

---

# 1. Visão Geral

## 1.1 O que é o DEV GALÁXIAS?

**DEV GALÁXIAS** é uma plataforma de aprendizado de engenharia de software de próxima geração, alimentada por inteligência artificial, que transforma qualquer pessoa — do absoluto zero até o nível Staff/Principal Engineer — através de uma jornada estruturada, prática, gamificada e personalizada.

A plataforma funciona simultaneamente como:

| Papel | Descrição |
|-------|-----------|
| 🏫 **Escola** | Trilhas curriculares completas com progressão pedagógica |
| 🧑‍🏫 **Professor** | Aulas interativas com explicações adaptativas por IA |
| 🧭 **Mentor** | Acompanhamento individualizado de longo prazo (anos) |
| 🏗️ **Arquiteto** | Revisão e orientação em decisões arquiteturais |
| 🔍 **Code Reviewer** | Análise automática de código com scoring multidimensional |
| 🎤 **Entrevistador** | Simulação de entrevistas técnicas reais por nível |
| 🎯 **Coach de Carreira** | Definição e ajuste de metas profissionais |
| 📋 **Gerente de Projetos** | Criação e acompanhamento de projetos progressivos |

## 1.2 Proposta de Valor

```
"De zero a Staff Engineer. Uma galáxia de conhecimento. Um mentor de IA que nunca desiste de você."
```

### Diferenciais Competitivos

1. **Jornada Completa de Carreira**: Não é um curso isolado — é um sistema que acompanha o dev por 5-10 anos
2. **IA como Coluna Vertebral**: Cada interação é personalizada, desde exercícios até entrevistas
3. **Prática > Teoria**: 70% do tempo em código real, projetos e desafios
4. **Stack Moderna e Relevante**: Go, Kubernetes, IA — tecnologias que o mercado demanda
5. **Gamificação Profunda**: XP, rankings, conquistas — motivação contínua
6. **Projetos Reais Progressivos**: De calculadora a plataforma SaaS multi-tenant
7. **Preparação para Entrevistas**: Simulações reais com IA avaliadora
8. **Code Review Automatizado**: Feedback instantâneo com scoring de 0-100

## 1.3 Stack Tecnológica

```mermaid
graph TB
    subgraph "Frontend"
        NX[Next.js 15+]
        FL[Flutter 3+]
    end
    
    subgraph "Backend"
        GO[Go 1.23+]
        API[API Gateway]
        AUTH[Auth Service]
        LEARN[Learning Service]
        AI_SVC[AI Service]
        GAMIF[Gamification Service]
        PROJECT[Project Service]
        ASSESS[Assessment Service]
    end
    
    subgraph "Data Layer"
        PG[(PostgreSQL 17)]
        RD[(Redis/Valkey)]
        S3[(Object Storage)]
    end
    
    subgraph "Messaging"
        NATS[NATS JetStream]
        KAFKA[Kafka]
    end
    
    subgraph "AI Providers"
        OAI[OpenAI]
        ANT[Anthropic]
        GEM[Gemini]
        OSS[Modelos Open Source]
    end
    
    subgraph "Infra"
        DOCKER[Docker]
        K8S[Kubernetes]
        OTEL[OpenTelemetry]
    end
    
    NX --> API
    FL --> API
    API --> GO
    GO --> PG
    GO --> RD
    GO --> NATS
    GO --> KAFKA
    AI_SVC --> OAI
    AI_SVC --> ANT
    AI_SVC --> GEM
    AI_SVC --> OSS
```

---

# 2. Objetivos

## 2.1 Objetivos de Negócio

| # | Objetivo | Métrica de Sucesso | Prazo |
|---|----------|-------------------|-------|
| O1 | Lançar MVP com trilhas 0-2 completas | 100% das aulas e exercícios funcionando | Q1 2027 |
| O2 | Atingir 1.000 usuários ativos | DAU ≥ 1.000 | Q2 2027 |
| O3 | Atingir 10.000 usuários ativos | DAU ≥ 10.000 | Q4 2027 |
| O4 | Taxa de conclusão de trilha > 40% | Completion Rate ≥ 40% | Q2 2027 |
| O5 | NPS > 70 | Pesquisa trimestral | Contínuo |
| O6 | Receita recorrente mensal (MRR) | MRR ≥ R$ 500K | Q4 2027 |

## 2.2 Objetivos de Produto

| # | Objetivo | Critério |
|---|----------|----------|
| P1 | Personalização total da jornada | IA adapta conteúdo, ritmo e dificuldade individualmente |
| P2 | Feedback instantâneo em código | < 30s para code review automatizado |
| P3 | Projetos com deploy real | Aluno faz deploy em ambiente cloud real |
| P4 | Preparação para mercado | Alunos aprovados em entrevistas técnicas reais |
| P5 | Retenção de longo prazo | Usuário ativo por ≥ 12 meses |
| P6 | Acessibilidade | Funcionar em conexões de 1Mbps+ |

## 2.3 Objetivos Educacionais

| # | Objetivo | Medição |
|---|----------|---------|
| E1 | Formar desenvolvedores Júnior em 6-12 meses | Assessment + Projeto final |
| E2 | Desenvolvedores Júnior → Pleno em 12-18 meses | Avaliação de competências + Portfolio |
| E3 | Desenvolvedores Pleno → Sênior em 18-24 meses | Projetos complexos + Entrevistas |
| E4 | Desenvolvedores Sênior → Staff em 24-36 meses | Liderança técnica + Arquitetura |
| E5 | Garantir proficiência em Go, Cloud e IA | Testes práticos com nota ≥ 80 |
| E6 | Construir portfolio com ≥ 10 projetos reais | Projetos deployados e funcionais |

## 2.4 Objetivos Técnicos

| # | Objetivo | SLA |
|---|----------|-----|
| T1 | Disponibilidade | 99.9% uptime |
| T2 | Latência de API | p99 < 200ms |
| T3 | Latência de IA | p99 < 10s para respostas completas |
| T4 | Escalabilidade | Suportar 100K usuários concorrentes |
| T5 | Segurança | SOC2 Type II compliance |
| T6 | Observabilidade | 100% de traces distribuídos |

---

# 3. Personas

## 3.1 Persona Primária: Ana "Zero Code"

```
┌─────────────────────────────────────────────┐
│  👩 Ana, 24 anos — São Paulo, SP            │
│  Formação: Administração                     │
│  Experiência em dev: Nenhuma                 │
│  Renda: R$ 3.000/mês                        │
│  Objetivo: Transição de carreira para dev    │
│  Motivação: Salário, flexibilidade, futuro   │
│  Frustração: Cursos superficiais, sem rumo   │
│  Disponibilidade: 3h/dia                     │
│  Dispositivo: Notebook básico + Celular      │
└─────────────────────────────────────────────┘
```

**Jornada Esperada:**
- Nível 0 → Nível 2 em 8 meses
- Primeiro emprego como Júnior em 10-12 meses
- Precisa de: Guia passo-a-passo, exercícios graduais, motivação constante

**Dores:**
- "Não sei por onde começar"
- "Tentei vários cursos e desisti"
- "Não entendo o que estudar primeiro"
- "Não tenho ninguém para tirar dúvidas"

**Necessidades da Plataforma:**
- Onboarding extremamente guiado
- Exercícios com dificuldade progressiva muito suave
- Mentor IA que nunca dá resposta pronta, mas guia
- Gamificação forte para manter engajamento
- Projetos simples que geram sensação de conquista

---

## 3.2 Persona Secundária: Carlos "Júnior Frustrado"

```
┌─────────────────────────────────────────────┐
│  👨 Carlos, 27 anos — Belo Horizonte, MG    │
│  Formação: Ciência da Computação             │
│  Experiência: 1.5 anos como dev Júnior       │
│  Stack atual: JavaScript/Node.js             │
│  Renda: R$ 4.500/mês                        │
│  Objetivo: Virar Pleno e aprender Go         │
│  Motivação: Crescimento técnico e salarial   │
│  Frustração: Estagnado no mesmo nível        │
│  Disponibilidade: 2h/dia                     │
│  Dispositivo: MacBook + iPhone               │
└─────────────────────────────────────────────┘
```

**Jornada Esperada:**
- Pular Nível 0, iniciar no Nível 1 (Go) após assessment
- Nível 1 → Nível 4 em 12 meses
- Promoção para Pleno em 12-18 meses

**Dores:**
- "Sei programar mas não sei arquitetura"
- "Meu código funciona mas não sei se é bom"
- "Não sei o que estudar para virar Pleno"
- "Quero aprender Go mas não sei como migrar"

**Necessidades da Plataforma:**
- Assessment inicial para calibrar nível
- Code review automático nos projetos atuais
- Trilha focada em arquitetura e boas práticas
- Simulações de entrevista para Pleno
- Projetos mais complexos (API REST → CRM)

---

## 3.3 Persona Terciária: Marina "Sênior Ambiciosa"

```
┌─────────────────────────────────────────────┐
│  👩‍💻 Marina, 32 anos — Remote (Portugal)    │
│  Formação: Engenharia de Software            │
│  Experiência: 7 anos, Sênior em Java         │
│  Stack atual: Java/Spring Boot/AWS           │
│  Renda: €5.000/mês                          │
│  Objetivo: Virar Staff Engineer              │
│  Motivação: Impacto técnico, liderança       │
│  Frustração: Não sabe o gap para Staff       │
│  Disponibilidade: 1.5h/dia                   │
│  Dispositivo: MacBook Pro + iPad             │
└─────────────────────────────────────────────┘
```

**Jornada Esperada:**
- Ingressar nos Níveis 4-5 (Arquitetura + Cloud)
- Complementar com Nível 8 (IA) e Nível 9 (Staff)
- Transição para Staff em 18-24 meses

**Dores:**
- "O que diferencia Sênior de Staff?"
- "Preciso melhorar em sistemas distribuídos"
- "Quero aprender Go e Kubernetes de verdade"
- "Preciso de alguém que avalie minha arquitetura"

**Necessidades da Plataforma:**
- Desafios de arquitetura de sistemas distribuídos
- Mentoria IA focada em decisões de design
- Projetos nível Staff (SaaS multi-tenant, plataformas de IA)
- Entrevistas simuladas para Staff/Principal
- Conteúdo sobre liderança técnica e RFCs

---

## 3.4 Persona Quaternária: Diego "Tech Lead em Transição"

```
┌─────────────────────────────────────────────┐
│  👨‍💼 Diego, 35 anos — São Paulo, SP         │
│  Formação: Sistemas de Informação            │
│  Experiência: 10 anos, Tech Lead             │
│  Stack atual: Python/Django/AWS              │
│  Renda: R$ 25.000/mês                       │
│  Objetivo: Principal Engineer + IA           │
│  Motivação: Manter relevância, IA é futuro   │
│  Frustração: IA está mudando tudo, preciso   │
│              me adaptar                       │
│  Disponibilidade: 1h/dia                     │
│  Dispositivo: Setup completo                 │
└─────────────────────────────────────────────┘
```

**Jornada Esperada:**
- Focar nos Níveis 8-9 (IA + Staff/Principal)
- Complementar com Go e Kubernetes
- Evolução para Principal Engineer em 24-36 meses

**Necessidades da Plataforma:**
- Conteúdo avançado de IA (RAG, Agentes, MCP)
- Projetos de plataforma de IA multiagente
- Avaliação de liderança técnica e tomada de decisão
- Mentoria IA para decisões estratégicas de arquitetura

---

# 4. Fluxos do Usuário

## 4.1 Fluxo de Onboarding

```mermaid
flowchart TD
    A[Usuário acessa plataforma] --> B[Página de Landing]
    B --> C[Cadastro / Login]
    C --> D{Primeiro acesso?}
    D -->|Sim| E[Assessment Inicial]
    D -->|Não| F[Dashboard]
    
    E --> E1[Questionário de Background]
    E1 --> E2[Questionário de Objetivos]
    E2 --> E3[Teste Técnico Adaptativo]
    E3 --> E4[IA analisa resultados]
    E4 --> E5[Geração do Plano Personalizado]
    E5 --> E6[Apresentação da Trilha Recomendada]
    E6 --> E7[Definição de Metas Iniciais]
    E7 --> E8[Tour Guiado da Plataforma]
    E8 --> F
    
    F --> G[Iniciar primeira aula]
```

### 4.1.1 Detalhamento do Assessment Inicial

**Questionário de Background (5 min):**
```
1. Qual sua experiência com programação?
   [ ] Nunca programei
   [ ] Conheço lógica básica
   [ ] Programo há menos de 1 ano
   [ ] Programo há 1-3 anos
   [ ] Programo há 3-5 anos
   [ ] Programo há 5+ anos

2. Quais linguagens você já usou?
   [ ] Nenhuma  [ ] Python  [ ] JavaScript  [ ] Java
   [ ] Go       [ ] C/C++   [ ] TypeScript  [ ] Outras

3. Qual seu objetivo principal?
   [ ] Transição de carreira
   [ ] Conseguir primeiro emprego
   [ ] Crescer de Júnior para Pleno
   [ ] Crescer de Pleno para Sênior
   [ ] Atingir Staff/Principal Engineer
   [ ] Aprender tecnologias específicas

4. Quantas horas por dia pode dedicar?
   [ ] 1h  [ ] 2h  [ ] 3h  [ ] 4h+

5. Em quanto tempo quer atingir seu objetivo?
   [ ] 6 meses  [ ] 12 meses  [ ] 18 meses  [ ] 24+ meses
```

**Teste Técnico Adaptativo (15-30 min):**
- Começa com questões de lógica básica
- Adapta dificuldade baseado nas respostas
- Cobre: lógica, algoritmos, SQL, API, arquitetura (conforme nível)
- Máximo de 30 questões (para de adaptar quando calibra o nível)

---

## 4.2 Fluxo de Aprendizado Diário

```mermaid
flowchart TD
    A[Login] --> B[Dashboard]
    B --> C{O que fazer hoje?}
    
    C --> D[📚 Continuar Trilha]
    C --> E[🏋️ Exercício do Dia]
    C --> F[🚀 Projeto Ativo]
    C --> G[📊 Revisar Metas]
    C --> H[🎤 Simulação Entrevista]
    
    D --> D1[Aula em Vídeo/Texto]
    D1 --> D2[Mini-Quiz]
    D2 --> D3{Aprovado?}
    D3 -->|Sim| D4[Exercício Prático]
    D3 -->|Não| D5[Revisão com IA]
    D5 --> D2
    D4 --> D6[Submissão de Código]
    D6 --> D7[Code Review IA]
    D7 --> D8{Nota ≥ 70?}
    D8 -->|Sim| D9[✅ XP + Conquista]
    D8 -->|Não| D10[Feedback + Retry]
    D10 --> D6
    D9 --> B
    
    E --> E1[IA gera exercício personalizado]
    E1 --> E2[Aluno resolve]
    E2 --> E3[Avaliação automática]
    E3 --> E4[Feedback detalhado]
    E4 --> B
    
    F --> F1[Ver requisitos do sprint atual]
    F1 --> F2[Codificar feature]
    F2 --> F3[Push para repositório]
    F3 --> F4[CI/CD + Code Review IA]
    F4 --> F5[Feedback + Score]
    F5 --> B
```

---

## 4.3 Fluxo de Code Review

```mermaid
flowchart TD
    A[Aluno submete código] --> B[Parser analisa o código]
    B --> C[Análise Estática]
    C --> D[Análise de IA]
    
    D --> D1[Clean Code Score]
    D --> D2[Performance Score]
    D --> D3[Security Score]
    D --> D4[Testing Score]
    D --> D5[Architecture Score]
    D --> D6[Complexity Score]
    
    D1 & D2 & D3 & D4 & D5 & D6 --> E[Score Composto 0-100]
    
    E --> F{Score ≥ 70?}
    F -->|Sim| G[✅ Aprovado]
    F -->|Não| H[❌ Feedback Detalhado]
    
    G --> I[XP + Badge + Progresso]
    H --> J[Sugestões Específicas]
    J --> K[Links para Conceitos]
    K --> L[Aluno refatora]
    L --> A
```

### 4.3.1 Dimensões de Avaliação

| Dimensão | Peso | O que avalia |
|----------|------|-------------|
| Clean Code | 25% | Nomenclatura, funções curtas, SRP, legibilidade |
| Performance | 15% | Complexidade algorítmica, uso de memória, otimizações |
| Segurança | 15% | SQL injection, XSS, secrets expostos, validação de input |
| Testes | 20% | Cobertura, qualidade dos testes, edge cases |
| Arquitetura | 15% | Separação de camadas, DI, patterns corretos |
| Complexidade | 10% | Complexidade ciclomática, acoplamento, coesão |

---

## 4.4 Fluxo de Entrevista Técnica

```mermaid
flowchart TD
    A[Aluno solicita entrevista] --> B[Seleciona nível]
    B --> C[IA prepara entrevista]
    
    C --> D[Fase 1: Apresentação - 5min]
    D --> E[Fase 2: Conceitos Técnicos - 15min]
    E --> F[Fase 3: Coding Challenge - 25min]
    F --> G[Fase 4: System Design - 20min]
    G --> H[Fase 5: Behavioral - 10min]
    H --> I[Fase 6: Perguntas do Candidato - 5min]
    
    I --> J[IA gera relatório]
    J --> K[Score por competência]
    K --> L[Feedback detalhado]
    L --> M[Plano de melhoria]
    
    M --> N{Aprovado?}
    N -->|Sim| O[🏆 Badge de Nível]
    N -->|Não| P[📋 Áreas para melhorar]
    P --> Q[IA ajusta trilha]
```

---

## 4.5 Fluxo de Mentoria IA

```mermaid
flowchart TD
    A[Interação com Mentor IA] --> B{Tipo de interação}
    
    B --> C[💬 Chat Livre]
    B --> D[🎯 Revisão de Progresso]
    B --> E[🧩 Ajuda em Exercício]
    B --> F[🏗️ Revisão de Arquitetura]
    B --> G[📅 Planejamento Semanal]
    
    C --> C1[IA responde com contexto do aluno]
    C1 --> C2[Sugere próximos passos]
    
    D --> D1[Analisa métricas da semana]
    D1 --> D2[Identifica pontos fortes/fracos]
    D2 --> D3[Ajusta metas se necessário]
    
    E --> E1{Aluno já tentou?}
    E1 -->|Não| E2[IA pede tentativa primeiro]
    E1 -->|Sim| E3[IA dá dica progressiva]
    E3 --> E4{Entendeu?}
    E4 -->|Não| E5[Dica mais detalhada]
    E4 -->|Sim| E6[Aluno tenta novamente]
    
    F --> F1[Aluno compartilha diagrama/código]
    F1 --> F2[IA analisa trade-offs]
    F2 --> F3[Sugere melhorias]
    F3 --> F4[Compara com patterns do mercado]
    
    G --> G1[IA analisa disponibilidade]
    G1 --> G2[Propõe agenda semanal]
    G2 --> G3[Define prioridades]
    G3 --> G4[Aluno confirma]
```

### 4.5.1 Regras do Mentor IA

> [!IMPORTANT]
> O Mentor IA **NUNCA** entrega respostas prontas. Ele sempre guia o aluno através de:

1. **Método Socrático**: Faz perguntas que levam o aluno à resposta
2. **Dicas Progressivas**: Começa com dica vaga, vai detalhando conforme necessário
3. **Contextualização**: Sempre relaciona com conceitos já aprendidos pelo aluno
4. **Encorajamento**: Celebra progresso, normaliza erros, mantém motivação
5. **Desafio Calibrado**: Empurra o aluno para fora da zona de conforto, mas não tanto que desmotive

**Níveis de Dica:**
```
Nível 1: "Pense em como você resolveria isso com um loop..."
Nível 2: "Que tipo de estrutura de dados permite busca O(1)?"
Nível 3: "Um HashMap seria útil aqui. Como você usaria?"
Nível 4: "Crie um map[string]int e itere sobre o slice..."
Nível 5: [Mostra pseudocódigo, nunca código completo pronto]
```

---

## 4.6 Fluxo de Metas e Progresso

```mermaid
flowchart TD
    A[Sistema de Metas] --> B[Meta Anual]
    B --> C[Metas Trimestrais]
    C --> D[Metas Mensais]
    D --> E[Metas Semanais]
    E --> F[Metas Diárias]
    
    F --> G[Aluno realiza atividades]
    G --> H[Sistema registra progresso]
    H --> I[IA analisa performance]
    
    I --> J{Performance vs. Meta}
    J -->|Acima| K[IA acelera metas]
    J -->|No alvo| L[Mantém ritmo]
    J -->|Abaixo| M[IA ajusta para baixo]
    
    K --> N[Sugere conteúdo avançado]
    L --> O[Mantém trilha atual]
    M --> P[Reforço + revisão]
    
    N & O & P --> Q[Atualiza dashboard]
```

---

## 4.7 Fluxo de Projeto

```mermaid
flowchart TD
    A[IA sugere projeto] --> B[Aluno aceita]
    B --> C[IA gera escopo completo]
    
    C --> D[Sprint 1: Setup + Arquitetura]
    D --> E[Sprint 2: Core Features]
    E --> F[Sprint 3: Integrações]
    F --> G[Sprint 4: Testes + Polish]
    G --> H[Sprint 5: Deploy]
    
    D --> D1[Code Review Sprint 1]
    E --> E1[Code Review Sprint 2]
    F --> F1[Code Review Sprint 3]
    G --> G1[Code Review Sprint 4]
    H --> H1[Deploy Review]
    
    D1 & E1 & F1 & G1 & H1 --> I[Score Final do Projeto]
    I --> J[Feedback Arquitetural]
    J --> K[Portfolio Updated]
    K --> L[XP + Achievement]
```

---

## 4.8 Mapa Completo de Fluxos

```mermaid
graph LR
    subgraph "Entrada"
        A[Landing Page]
        B[Cadastro]
        C[Assessment]
    end
    
    subgraph "Core Loop"
        D[Dashboard]
        E[Trilha/Aula]
        F[Exercícios]
        G[Projetos]
        H[Code Review]
    end
    
    subgraph "IA Features"
        I[Mentor IA]
        J[Entrevistador IA]
        K[Coach de Carreira]
    end
    
    subgraph "Progresso"
        L[Metas]
        M[Gamificação]
        N[Portfolio]
        O[Certificados]
    end
    
    A --> B --> C --> D
    D --> E --> F --> H
    D --> G --> H
    D --> I
    D --> J
    D --> K
    D --> L
    F & G --> M
    G --> N
    E --> O
```
