# 🌌 DEV GALÁXIAS — Documentação Oficial do Produto

## Parte 4: APIs

> **Versão:** 1.0.0  
> **Data:** 15 de Junho de 2026

---

# 7. APIs

## 7.1 Visão Geral da API

### Convenções Gerais

| Aspecto | Padrão |
|---------|--------|
| **Protocolo** | HTTPS |
| **Formato** | JSON |
| **Autenticação** | Bearer Token (JWT) |
| **Versionamento** | URL prefix (`/api/v1/`) |
| **Paginação** | Cursor-based (`cursor`, `limit`) |
| **Rate Limiting** | 100 req/min (free), 1000 req/min (pro) |
| **Erros** | RFC 7807 (Problem Details) |
| **CORS** | Configurável por domínio |
| **Compressão** | gzip/brotli |

### Formato de Erro Padrão

```json
{
  "type": "https://devgalaxias.com/errors/validation",
  "title": "Validation Error",
  "status": 422,
  "detail": "O campo 'email' é obrigatório",
  "instance": "/api/v1/auth/register",
  "errors": [
    {
      "field": "email",
      "code": "required",
      "message": "O campo email é obrigatório"
    }
  ],
  "trace_id": "abc123def456"
}
```

### Formato de Paginação

```json
{
  "data": [...],
  "pagination": {
    "cursor": "eyJpZCI6IjEyMyJ9",
    "has_more": true,
    "total_count": 150,
    "limit": 20
  }
}
```

### Headers Customizados

```
X-Request-ID: uuid          # ID único da requisição
X-RateLimit-Limit: 100      # Limite de requisições
X-RateLimit-Remaining: 95   # Requisições restantes
X-RateLimit-Reset: 1623456  # Timestamp do reset
```

---

## 7.2 Autenticação (`/api/v1/auth`)

### `POST /api/v1/auth/register`
Cadastro de novo usuário.

**Request:**
```json
{
  "email": "ana@email.com",
  "password": "S3cur3P@ss!",
  "full_name": "Ana Silva",
  "timezone": "America/Sao_Paulo"
}
```

**Response (201):**
```json
{
  "data": {
    "user": {
      "id": "uuid",
      "email": "ana@email.com",
      "full_name": "Ana Silva",
      "created_at": "2026-06-15T12:00:00Z"
    },
    "tokens": {
      "access_token": "eyJhbG...",
      "refresh_token": "eyJhbG...",
      "expires_in": 3600
    }
  }
}
```

---

### `POST /api/v1/auth/login`
Login com email/senha.

**Request:**
```json
{
  "email": "ana@email.com",
  "password": "S3cur3P@ss!"
}
```

**Response (200):**
```json
{
  "data": {
    "user": {
      "id": "uuid",
      "email": "ana@email.com",
      "full_name": "Ana Silva",
      "current_level": 5,
      "total_xp": 2340
    },
    "tokens": {
      "access_token": "eyJhbG...",
      "refresh_token": "eyJhbG...",
      "expires_in": 3600
    }
  }
}
```

---

### `POST /api/v1/auth/oauth/{provider}`
Login via OAuth (Google, GitHub).

**Request:**
```json
{
  "code": "oauth_authorization_code",
  "redirect_uri": "https://devgalaxias.com/callback"
}
```

---

### `POST /api/v1/auth/refresh`
Renovar access token.

**Request:**
```json
{
  "refresh_token": "eyJhbG..."
}
```

---

### `POST /api/v1/auth/forgot-password`
Solicitar reset de senha.

### `POST /api/v1/auth/reset-password`
Resetar senha com token.

### `POST /api/v1/auth/verify-email`
Verificar email com código.

---

## 7.3 Usuários (`/api/v1/users`)

### `GET /api/v1/users/me`
Retorna perfil do usuário autenticado.

**Response (200):**
```json
{
  "data": {
    "id": "uuid",
    "email": "ana@email.com",
    "full_name": "Ana Silva",
    "display_name": "Ana",
    "avatar_url": "https://...",
    "bio": "Transição de carreira para dev",
    "current_level": 5,
    "total_xp": 2340,
    "experience_level": "beginner",
    "primary_goal": "career_transition",
    "daily_hours": 3.0,
    "learning_style": "practical",
    "streak": {
      "current": 15,
      "longest": 22,
      "freeze_available": true
    },
    "stats": {
      "tracks_completed": 1,
      "tracks_in_progress": 1,
      "exercises_completed": 45,
      "projects_completed": 2,
      "achievements_unlocked": 12,
      "avg_code_review_score": 72
    },
    "created_at": "2026-01-15T10:00:00Z",
    "last_login_at": "2026-06-15T08:30:00Z"
  }
}
```

---

### `PATCH /api/v1/users/me`
Atualizar perfil do usuário.

**Request:**
```json
{
  "display_name": "Ana Dev",
  "bio": "Desenvolvedora Go em formação",
  "daily_hours": 2.5,
  "timezone": "America/Sao_Paulo"
}
```

---

### `GET /api/v1/users/me/skills`
Retorna skills do usuário com níveis.

**Response (200):**
```json
{
  "data": [
    {
      "skill": {
        "id": "uuid",
        "name": "Go",
        "category": "language",
        "icon_url": "https://..."
      },
      "current_level": 4,
      "xp_in_skill": 1200,
      "last_assessed_at": "2026-06-10T14:00:00Z",
      "last_assessed_score": 78.5
    },
    {
      "skill": {
        "id": "uuid",
        "name": "PostgreSQL",
        "category": "database"
      },
      "current_level": 3,
      "xp_in_skill": 800
    }
  ]
}
```

---

### `GET /api/v1/users/me/dashboard`
Retorna dados consolidados do dashboard.

**Response (200):**
```json
{
  "data": {
    "level": 5,
    "xp": {
      "current": 2340,
      "next_level": 3000,
      "progress_pct": 78.0
    },
    "streak": {
      "current": 15,
      "longest": 22
    },
    "daily_missions": {
      "total": 3,
      "completed": 1,
      "missions": [
        {
          "id": "uuid",
          "type": "lesson",
          "description": "Complete a aula 'Goroutines e Channels'",
          "xp_reward": 20,
          "completed": true
        },
        {
          "id": "uuid",
          "type": "exercise",
          "description": "Resolva 2 exercícios de concorrência",
          "xp_reward": 30,
          "completed": false
        },
        {
          "id": "uuid",
          "type": "project",
          "description": "Implemente endpoint POST /users",
          "xp_reward": 50,
          "completed": false
        }
      ]
    },
    "active_track": {
      "id": "uuid",
      "name": "Go Básico",
      "progress_pct": 65.0,
      "next_lesson": {
        "id": "uuid",
        "title": "Goroutines e Channels"
      }
    },
    "active_project": {
      "id": "uuid",
      "name": "API REST - Book Store",
      "current_sprint": 2,
      "total_sprints": 4
    },
    "weekly_goals": {
      "completed": 3,
      "total": 5
    },
    "ranking": {
      "weekly_position": 23,
      "weekly_xp": 450
    },
    "recent_achievements": [
      {
        "name": "Week Warrior",
        "icon_url": "https://...",
        "unlocked_at": "2026-06-14T20:00:00Z"
      }
    ]
  }
}
```

---

### `GET /api/v1/users/me/xp-history`
Histórico de XP com filtros.

**Query Params:** `period=week|month|year`, `cursor`, `limit`

---

### `GET /api/v1/users/me/activity-heatmap`
Heatmap de atividade (estilo GitHub).

**Query Params:** `year=2026`

**Response (200):**
```json
{
  "data": {
    "year": 2026,
    "contributions": {
      "2026-01-01": 3,
      "2026-01-02": 5,
      "2026-01-03": 0,
      "...": "..."
    },
    "total_active_days": 120,
    "total_contributions": 456
  }
}
```

---

## 7.4 Trilhas (`/api/v1/tracks`)

### `GET /api/v1/tracks`
Lista todas as trilhas disponíveis.

**Query Params:** `level`, `difficulty`, `status=published`

**Response (200):**
```json
{
  "data": [
    {
      "id": "uuid",
      "name": "Fundamentos",
      "slug": "fundamentos",
      "description": "Lógica, Algoritmos, Git e Linux",
      "level": 0,
      "difficulty": "beginner",
      "estimated_hours": 80,
      "total_modules": 5,
      "total_lessons": 40,
      "total_exercises": 60,
      "icon_url": "https://...",
      "cover_url": "https://...",
      "color": "#4F46E5",
      "enrollment": {
        "enrolled": true,
        "progress_pct": 35.0,
        "status": "in_progress"
      },
      "prerequisites": [
        {
          "track_id": "uuid",
          "name": "Nenhum",
          "met": true
        }
      ]
    }
  ]
}
```

---

### `GET /api/v1/tracks/{trackId}`
Detalhes de uma trilha com módulos.

### `POST /api/v1/tracks/{trackId}/enroll`
Matricular-se em uma trilha.

### `GET /api/v1/tracks/{trackId}/modules`
Lista módulos da trilha.

### `GET /api/v1/tracks/{trackId}/modules/{moduleId}`
Detalhes do módulo com aulas.

### `GET /api/v1/tracks/{trackId}/modules/{moduleId}/lessons`
Lista aulas do módulo.

### `GET /api/v1/tracks/{trackId}/modules/{moduleId}/lessons/{lessonId}`
Conteúdo completo da aula.

### `POST /api/v1/tracks/{trackId}/modules/{moduleId}/lessons/{lessonId}/complete`
Marcar aula como completa.

---

## 7.5 Exercícios (`/api/v1/exercises`)

### `GET /api/v1/exercises`
Lista exercícios com filtros.

**Query Params:** `difficulty`, `language`, `module_id`, `tags`, `cursor`, `limit`

---

### `GET /api/v1/exercises/{exerciseId}`
Detalhes do exercício.

**Response (200):**
```json
{
  "data": {
    "id": "uuid",
    "title": "Implementar função de busca binária",
    "difficulty": "medium",
    "language": "go",
    "problem_statement": "Implemente uma função que realiza busca binária em um slice ordenado de inteiros...",
    "starter_code": "package main\n\nfunc binarySearch(arr []int, target int) int {\n\t// Seu código aqui\n}",
    "hints_available": 3,
    "estimated_minutes": 20,
    "xp_reward": 30,
    "evaluation_criteria": [...],
    "tags": ["algorithms", "binary_search", "go"],
    "user_status": {
      "attempts": 1,
      "best_score": null,
      "completed": false
    }
  }
}
```

---

### `POST /api/v1/exercises/{exerciseId}/hints`
Solicitar próxima dica.

**Response (200):**
```json
{
  "data": {
    "hint_level": 2,
    "hint_text": "Um map[string]int poderia ajudar a contar frequências",
    "xp_penalty": 2,
    "hints_remaining": 1
  }
}
```

---

### `GET /api/v1/exercises/daily`
Exercício do dia personalizado pela IA.

### `POST /api/v1/exercises/generate`
IA gera exercício personalizado.

**Request:**
```json
{
  "difficulty": "medium",
  "language": "go",
  "topics": ["concurrency", "channels"],
  "avoid_topics": ["file_io"]
}
```

---

## 7.6 Submissões (`/api/v1/submissions`)

### `POST /api/v1/exercises/{exerciseId}/submit`
Submeter solução para exercício.

**Request:**
```json
{
  "code": "package main\n\nfunc binarySearch(arr []int, target int) int {\n\tlow, high := 0, len(arr)-1\n\tfor low <= high {\n\t\tmid := low + (high-low)/2\n\t\tif arr[mid] == target {\n\t\t\treturn mid\n\t\t} else if arr[mid] < target {\n\t\t\tlow = mid + 1\n\t\t} else {\n\t\t\thigh = mid - 1\n\t\t}\n\t}\n\treturn -1\n}",
  "language": "go"
}
```

**Response (202 — Accepted para processamento assíncrono):**
```json
{
  "data": {
    "submission_id": "uuid",
    "status": "pending",
    "message": "Sua submissão está sendo avaliada..."
  }
}
```

---

### `GET /api/v1/submissions/{submissionId}`
Resultado da submissão.

**Response (200 — quando processado):**
```json
{
  "data": {
    "id": "uuid",
    "status": "passed",
    "total_score": 85,
    "scores": {
      "correctness": 95,
      "clean_code": 80,
      "performance": 90,
      "testing": 70
    },
    "tests": {
      "passed": 8,
      "total": 8,
      "details": [
        {"name": "Test_BasicSearch", "passed": true, "time_ms": 2},
        {"name": "Test_NotFound", "passed": true, "time_ms": 1}
      ]
    },
    "ai_feedback": "Boa solução! Implementação correta de busca binária...",
    "ai_suggestions": [
      {
        "line": 5,
        "suggestion": "Considere adicionar um comentário explicando o cálculo de mid",
        "category": "clean_code"
      }
    ],
    "xp_earned": 30,
    "attempt_number": 1,
    "execution_time_ms": 15,
    "memory_used_kb": 256
  }
}
```

---

### `GET /api/v1/submissions`
Lista submissões do usuário.

**Query Params:** `exercise_id`, `status`, `cursor`, `limit`

---

## 7.7 Projetos (`/api/v1/projects`)

### `GET /api/v1/projects`
Lista projetos disponíveis.

**Query Params:** `difficulty_level`, `category`, `cursor`, `limit`

---

### `GET /api/v1/projects/{projectId}`
Detalhes do projeto.

### `POST /api/v1/projects/{projectId}/start`
Iniciar projeto.

**Request:**
```json
{
  "repo_url": "https://github.com/ana/bookstore-api"
}
```

---

### `GET /api/v1/projects/me/active`
Projeto ativo do usuário.

### `POST /api/v1/projects/me/active/sprints/{sprintNumber}/complete`
Marcar sprint como completo (trigger code review).

### `POST /api/v1/projects/me/active/submit`
Submeter projeto finalizado para avaliação.

### `POST /api/v1/projects/generate`
IA gera projeto personalizado.

**Request:**
```json
{
  "difficulty_level": "mid",
  "technologies": ["go", "postgresql", "docker"],
  "interests": ["e-commerce", "fintech"],
  "estimated_weeks": 4
}
```

---

## 7.8 IA — Mentor (`/api/v1/ai/mentor`)

### `POST /api/v1/ai/mentor/chat`
Enviar mensagem ao mentor IA.

**Request:**
```json
{
  "message": "Não estou entendendo como usar channels em Go. Pode me ajudar?",
  "mode": "help",
  "context": {
    "type": "exercise",
    "id": "uuid"
  },
  "conversation_id": "uuid"
}
```

**Response (200 — streaming via SSE):**
```json
{
  "data": {
    "conversation_id": "uuid",
    "response": "Claro! Antes de eu te explicar, me conta: o que você já tentou? Qual parte está confusa — a criação do channel ou o envio/recebimento de dados?",
    "suggestions": [
      "Mostrar exemplo de channel básico",
      "Explicar diferença entre buffered e unbuffered",
      "Ir para exercício prático"
    ],
    "related_lessons": [
      {
        "id": "uuid",
        "title": "Channels em Go",
        "relevance": 0.95
      }
    ]
  }
}
```

---

### `GET /api/v1/ai/mentor/conversations`
Lista conversas com o mentor.

### `GET /api/v1/ai/mentor/conversations/{conversationId}`
Histórico de conversa.

### `GET /api/v1/ai/mentor/weekly-review`
Revisão semanal personalizada.

**Response (200):**
```json
{
  "data": {
    "week": "2026-W24",
    "summary": "Boa semana, Ana! Você completou 4 aulas e 6 exercícios...",
    "stats": {
      "lessons_completed": 4,
      "exercises_completed": 6,
      "xp_earned": 340,
      "avg_score": 76,
      "streak_maintained": true
    },
    "strengths": [
      "Excelente consistência (15 dias de streak!)",
      "Melhoria em clean code (de 65 para 78)"
    ],
    "areas_to_improve": [
      "Testing: score médio 62 — precisa subir para 70+",
      "Error handling: 3 exercícios com erros não tratados"
    ],
    "next_week_plan": {
      "focus": "Testing em Go",
      "goals": [
        "Completar módulo de testes",
        "2 exercícios com score de testes > 80",
        "Adicionar testes ao projeto Book Store"
      ],
      "estimated_hours": 8
    }
  }
}
```

---

## 7.9 IA — Code Review (`/api/v1/ai/code-review`)

### `POST /api/v1/ai/code-review`
Solicitar code review de código livre.

**Request:**
```json
{
  "code": "...",
  "language": "go",
  "context": "API REST handler para criar usuário",
  "focus_areas": ["security", "clean_code"]
}
```

**Response (200):**
```json
{
  "data": {
    "review_id": "uuid",
    "total_score": 78,
    "scores": {
      "clean_code": 85,
      "performance": 70,
      "security": 90,
      "testing": 60,
      "architecture": 80,
      "complexity": 75
    },
    "summary": "Código bem estruturado com boa separação de responsabilidades...",
    "inline_comments": [
      {
        "line": 23,
        "severity": "warning",
        "category": "clean_code",
        "message": "Variável 'x' — use nome descritivo",
        "suggestion": "Renomeie para 'userCount'"
      }
    ],
    "suggestions": [
      "Adicionar validação de email com regex",
      "Usar prepared statements para queries SQL",
      "Adicionar testes para o handler"
    ]
  }
}
```

---

## 7.10 IA — Entrevistas (`/api/v1/ai/interviews`)

### `POST /api/v1/ai/interviews`
Criar nova entrevista simulada.

**Request:**
```json
{
  "target_level": "mid",
  "focus_areas": ["go", "system_design", "databases"]
}
```

---

### `POST /api/v1/ai/interviews/{interviewId}/respond`
Responder à pergunta do entrevistador.

**Request:**
```json
{
  "response": "Para lidar com alta concorrência, eu usaria goroutines com um worker pool pattern...",
  "code": "// código opcional se for coding challenge"
}
```

---

### `GET /api/v1/ai/interviews/{interviewId}/report`
Relatório completo da entrevista.

---

## 7.11 Gamificação (`/api/v1/gamification`)

### `GET /api/v1/gamification/achievements`
Lista conquistas (desbloqueadas e bloqueadas).

### `GET /api/v1/gamification/rankings`
Rankings por período.

**Query Params:** `type=daily|weekly|monthly|all_time`, `limit`

**Response (200):**
```json
{
  "data": {
    "type": "weekly",
    "period": "2026-W24",
    "user_position": 23,
    "user_xp": 450,
    "rankings": [
      {"rank": 1, "user": {"display_name": "CodeMaster", "avatar_url": "..."}, "xp": 1200},
      {"rank": 2, "user": {"display_name": "GoNinja", "avatar_url": "..."}, "xp": 980},
      {"rank": 3, "user": {"display_name": "DevHero", "avatar_url": "..."}, "xp": 870}
    ]
  }
}
```

---

### `GET /api/v1/gamification/missions/daily`
Missões diárias.

### `POST /api/v1/gamification/missions/{missionId}/complete`
Marcar missão como completa.

---

## 7.12 Metas (`/api/v1/goals`)

### `GET /api/v1/goals`
Lista metas do usuário.

**Query Params:** `type=annual|quarterly|monthly|weekly|daily`, `status`

---

### `POST /api/v1/goals`
Criar meta manual.

**Request:**
```json
{
  "title": "Completar trilha de Go Básico",
  "goal_type": "monthly",
  "target_type": "lessons",
  "target_value": 20,
  "period_start": "2026-07-01",
  "period_end": "2026-07-31"
}
```

---

### `POST /api/v1/goals/generate`
IA gera metas personalizadas.

**Request:**
```json
{
  "goal_type": "weekly",
  "focus_areas": ["go", "testing"]
}
```

---

### `PATCH /api/v1/goals/{goalId}`
Atualizar meta.

### `DELETE /api/v1/goals/{goalId}`
Cancelar meta.

---

## 7.13 Avaliações (`/api/v1/assessments`)

### `GET /api/v1/assessments/placement`
Obter assessment de nivelamento.

### `POST /api/v1/assessments/{assessmentId}/start`
Iniciar avaliação.

### `POST /api/v1/assessments/{assessmentId}/answer`
Enviar resposta (para adaptive testing, uma por vez).

### `POST /api/v1/assessments/{assessmentId}/submit`
Finalizar avaliação.

### `GET /api/v1/assessments/{assessmentId}/results`
Resultados da avaliação.

---

## 7.14 Roadmap (`/api/v1/roadmap`)

### `GET /api/v1/roadmap/me`
Roadmap personalizado do usuário.

**Response (200):**
```json
{
  "data": {
    "current_phase": "junior_to_mid",
    "progress_pct": 35.0,
    "estimated_months_remaining": 10,
    "phases": [
      {
        "name": "Zero → Júnior",
        "status": "completed",
        "tracks": ["fundamentos", "go-basico"],
        "completed_at": "2026-04-15"
      },
      {
        "name": "Júnior → Pleno",
        "status": "in_progress",
        "tracks": ["apis-rest", "docker", "redis", "arquitetura"],
        "progress_pct": 35.0,
        "estimated_completion": "2027-04-15"
      },
      {
        "name": "Pleno → Sênior",
        "status": "locked",
        "tracks": ["ddd-clean-arch", "kubernetes", "observabilidade"]
      }
    ]
  }
}
```

### `POST /api/v1/roadmap/generate`
IA gera/regenera roadmap personalizado.

---

## 7.15 WebSocket — Eventos em Tempo Real

### Conexão: `wss://api.devgalaxias.com/ws`

**Eventos que o servidor envia:**

```json
// Submissão avaliada
{"type": "submission.evaluated", "data": {"submission_id": "uuid", "score": 85, "status": "passed"}}

// XP ganho
{"type": "xp.earned", "data": {"amount": 30, "total": 2370, "source": "exercise"}}

// Level up
{"type": "level.up", "data": {"new_level": 6, "xp_required_next": 3000}}

// Achievement desbloqueado
{"type": "achievement.unlocked", "data": {"name": "Clean Coder", "icon_url": "..."}}

// Streak atualizado
{"type": "streak.updated", "data": {"current": 16, "longest": 22}}

// Ranking atualizado
{"type": "ranking.updated", "data": {"type": "weekly", "position": 22, "change": 1}}

// Mentor IA streaming
{"type": "mentor.response.chunk", "data": {"text": "Boa pergunta! ", "done": false}}
{"type": "mentor.response.chunk", "data": {"text": "Channels são...", "done": true}}

// Code review pronto
{"type": "code_review.completed", "data": {"review_id": "uuid", "score": 78}}

// Notificação geral
{"type": "notification", "data": {"title": "Streak em risco!", "body": "Faltam 2h..."}}
```

---

## 7.16 API — Resumo de Endpoints

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| **Auth** | | |
| POST | `/auth/register` | Cadastro |
| POST | `/auth/login` | Login |
| POST | `/auth/oauth/{provider}` | OAuth login |
| POST | `/auth/refresh` | Refresh token |
| POST | `/auth/forgot-password` | Forgot password |
| POST | `/auth/reset-password` | Reset password |
| POST | `/auth/verify-email` | Verify email |
| **Users** | | |
| GET | `/users/me` | Meu perfil |
| PATCH | `/users/me` | Atualizar perfil |
| GET | `/users/me/skills` | Minhas skills |
| GET | `/users/me/dashboard` | Dashboard |
| GET | `/users/me/xp-history` | Histórico XP |
| GET | `/users/me/activity-heatmap` | Heatmap atividade |
| **Tracks** | | |
| GET | `/tracks` | Listar trilhas |
| GET | `/tracks/{id}` | Detalhes trilha |
| POST | `/tracks/{id}/enroll` | Matricular |
| GET | `/tracks/{id}/modules` | Módulos |
| GET | `/tracks/{id}/modules/{id}/lessons` | Aulas |
| GET | `/tracks/{id}/modules/{id}/lessons/{id}` | Conteúdo aula |
| POST | `/tracks/{id}/modules/{id}/lessons/{id}/complete` | Completar aula |
| **Exercises** | | |
| GET | `/exercises` | Listar exercícios |
| GET | `/exercises/{id}` | Detalhes exercício |
| POST | `/exercises/{id}/submit` | Submeter solução |
| POST | `/exercises/{id}/hints` | Pedir dica |
| GET | `/exercises/daily` | Exercício do dia |
| POST | `/exercises/generate` | Gerar exercício IA |
| **Submissions** | | |
| GET | `/submissions` | Minhas submissões |
| GET | `/submissions/{id}` | Detalhes submissão |
| **Projects** | | |
| GET | `/projects` | Listar projetos |
| GET | `/projects/{id}` | Detalhes projeto |
| POST | `/projects/{id}/start` | Iniciar projeto |
| GET | `/projects/me/active` | Projeto ativo |
| POST | `/projects/me/active/submit` | Submeter projeto |
| POST | `/projects/generate` | Gerar projeto IA |
| **AI** | | |
| POST | `/ai/mentor/chat` | Chat com mentor |
| GET | `/ai/mentor/conversations` | Histórico conversas |
| GET | `/ai/mentor/weekly-review` | Revisão semanal |
| POST | `/ai/code-review` | Code review |
| POST | `/ai/interviews` | Nova entrevista |
| POST | `/ai/interviews/{id}/respond` | Responder entrevista |
| GET | `/ai/interviews/{id}/report` | Relatório entrevista |
| **Gamification** | | |
| GET | `/gamification/achievements` | Conquistas |
| GET | `/gamification/rankings` | Rankings |
| GET | `/gamification/missions/daily` | Missões diárias |
| **Goals** | | |
| GET | `/goals` | Minhas metas |
| POST | `/goals` | Criar meta |
| POST | `/goals/generate` | Gerar metas IA |
| PATCH | `/goals/{id}` | Atualizar meta |
| **Assessments** | | |
| GET | `/assessments/placement` | Assessment inicial |
| POST | `/assessments/{id}/start` | Iniciar avaliação |
| POST | `/assessments/{id}/submit` | Submeter avaliação |
| GET | `/assessments/{id}/results` | Resultados |
| **Roadmap** | | |
| GET | `/roadmap/me` | Meu roadmap |
| POST | `/roadmap/generate` | Gerar roadmap IA |
