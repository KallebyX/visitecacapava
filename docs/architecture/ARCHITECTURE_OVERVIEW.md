---
title: Visão Geral da Arquitetura
version: 1.0.0
last_updated: 2025-11-26
author: Oryum Tech
classification: CONFIDENCIAL - USO INTERNO
---

# Visão Geral da Arquitetura

## 📋 Índice

1. [Introdução](#introdução)
2. [Arquitetura de Alto Nível](#arquitetura-de-alto-nível)
3. [Padrões Arquiteturais](#padrões-arquiteturais)
4. [Componentes do Sistema](#componentes-do-sistema)
5. [Modelo de Dados](#modelo-de-dados)
6. [Integrações](#integrações)
7. [Decisões Arquiteturais](#decisões-arquiteturais)
8. [Escalabilidade](#escalabilidade)

---

## Introdução

### Propósito

Este documento descreve a arquitetura de software do **Visite Caçapava**, uma plataforma de turismo gamificada. O objetivo é fornecer uma visão abrangente do sistema para stakeholders técnicos e de negócio.

### Escopo

O documento cobre:
- Estrutura geral do sistema
- Componentes e suas interações
- Padrões de design utilizados
- Decisões arquiteturais e justificativas

### Definições

| Termo | Definição |
|-------|-----------|
| SPA | Single Page Application |
| POI | Point of Interest (Ponto de Interesse) |
| RBAC | Role-Based Access Control |
| Mock | Simulação de dados/serviços |

---

## Arquitetura de Alto Nível

### Diagrama C4 - Nível Contexto

```mermaid
flowchart TB
    subgraph Sistema["Sistema Visite Caçapava"]
        APP[Aplicação Web<br/>React SPA]
    end

    TURISTA[👤 Turista]
    HOTEL[🏨 Hotel]
    REST[🍽️ Restaurante]
    ADMIN[👔 Secretaria]

    GEMINI[Google Gemini<br/>API de IA]
    OPENAI[OpenAI<br/>API Fallback]
    MAPS[Leaflet/OSM<br/>Mapas]

    TURISTA --> APP
    HOTEL --> APP
    REST --> APP
    ADMIN --> APP

    APP --> GEMINI
    APP --> OPENAI
    APP --> MAPS
```

### Diagrama C4 - Nível Container

```mermaid
flowchart TB
    subgraph Browser["Navegador Web"]
        SPA[React SPA<br/>TypeScript]

        subgraph StateManagement["Gerenciamento de Estado"]
            AUTH[AuthContext]
            GAME[GamificationContext]
        end

        subgraph Storage["Armazenamento"]
            SESSION[(Session Storage)]
        end
    end

    subgraph External["Serviços Externos"]
        GEMINI[Google Gemini API]
        OPENAI[OpenAI API]
        LEAFLET[Leaflet/OpenStreetMap]
    end

    SPA --> AUTH
    SPA --> GAME
    AUTH --> SESSION
    GAME --> SESSION

    SPA --> GEMINI
    SPA --> OPENAI
    SPA --> LEAFLET
```

### Tipo de Arquitetura

O Visite Caçapava utiliza uma arquitetura **Client-Side SPA (Single Page Application)** com:

- **Frontend**: React 18 com TypeScript
- **Backend**: Mock service (simulação local)
- **Persistência**: Session Storage do navegador
- **Deploy**: Vercel (serverless edge)

---

## Padrões Arquiteturais

### 1. Single Page Application (SPA)

```
Características:
├── Carregamento único da aplicação
├── Navegação client-side (React Router)
├── Atualizações parciais do DOM
└── Estado mantido em memória
```

**Benefícios:**
- Experiência de usuário fluida
- Menor carga no servidor
- Capacidade offline parcial

### 2. Component-Based Architecture

```
Hierarquia de Componentes:
App.tsx
├── Layouts/
│   ├── TouristLayout
│   ├── AdminLayout
│   ├── HotelLayout
│   └── RestaurantLayout
├── Pages/
│   └── [Páginas específicas por role]
└── Components/
    └── [Componentes reutilizáveis]
```

### 3. Context API Pattern

```typescript
// Estado global via Context
AuthContext
├── user: User | null
├── isAuthenticated: boolean
├── login(): Promise<Result>
└── logout(): void

GamificationContext
├── currentUser: User | null
├── checkIn(): Promise<Result>
└── getVisitedIds(): Set<string>
```

### 4. Service Layer Pattern

```
Camada de Serviços:
services/
├── backendService.ts    # Mock CRUD operations
├── geminiService.ts     # Primary AI
├── openaiService.ts     # Fallback AI
└── googleMapsService.ts # Map integration
```

### 5. Protected Routes Pattern

```typescript
// Controle de acesso por papel
<ProtectedRoute allowedRoles={['tourist']}>
  <TouristLayout>
    <Outlet />
  </TouristLayout>
</ProtectedRoute>
```

---

## Componentes do Sistema

### Diagrama de Componentes

```mermaid
flowchart TB
    subgraph Presentation["Camada de Apresentação"]
        PAGES[Pages]
        COMPS[Components]
        LAYOUTS[Layouts]
    end

    subgraph Business["Camada de Negócio"]
        CONTEXTS[Contexts]
        SERVICES[Services]
        UTILS[Utilities]
    end

    subgraph Data["Camada de Dados"]
        TYPES[Types]
        CONSTANTS[Constants]
        STORAGE[Session Storage]
    end

    PAGES --> COMPS
    PAGES --> LAYOUTS
    COMPS --> CONTEXTS
    LAYOUTS --> CONTEXTS
    CONTEXTS --> SERVICES
    SERVICES --> UTILS
    SERVICES --> STORAGE
    CONTEXTS --> TYPES
    SERVICES --> CONSTANTS
```

### Componentes Principais

| Componente | Responsabilidade | Localização |
|------------|------------------|-------------|
| App.tsx | Roteamento e layout principal | /App.tsx |
| AuthContext | Autenticação e sessão | /context/AuthContext.tsx |
| GamificationContext | Lógica de gamificação | /context/GamificationContext.tsx |
| backendService | Operações CRUD mock | /services/backendService.ts |
| ProtectedRoute | Controle de acesso | /components/ProtectedRoute.tsx |

### Layouts por Papel

```mermaid
flowchart LR
    subgraph Tourist["TouristLayout"]
        T1[Header com perfil]
        T2[Navegação inferior]
        T3[Chat IA flutuante]
        T4[Conteúdo principal]
    end

    subgraph Admin["AdminLayout"]
        A1[Header administrativo]
        A2[Sidebar de navegação]
        A3[Dashboard central]
    end

    subgraph Hotel["HotelLayout"]
        H1[Header do hotel]
        H2[Menu de gestão]
        H3[Área de check-in]
    end

    subgraph Restaurant["RestaurantLayout"]
        R1[Header restaurante]
        R2[Menu de feedback]
        R3[Área de reviews]
    end
```

---

## Modelo de Dados

### Entidades Principais

```mermaid
erDiagram
    USER ||--o{ VISIT : makes
    USER ||--o{ BADGE : earns
    USER ||--o{ PHOTO : uploads
    USER ||--o{ REVIEW : writes
    USER ||--o{ FAVORITE : saves
    POI ||--o{ VISIT : receives
    POI ||--o{ REVIEW : has
    ROUTE ||--|{ POI : contains

    USER {
        string id PK
        string name
        string email
        string role
        number points
        string[] badges
    }

    POI {
        string id PK
        string name
        string description
        number lat
        number lng
        number points
    }

    ROUTE {
        string id PK
        string name
        string[] pointsOfInterest
        string difficulty
    }

    VISIT {
        string pointId FK
        string date
    }

    BADGE {
        string id PK
        string name
        function criteria
    }
```

### Fluxo de Dados

```mermaid
sequenceDiagram
    participant U as Usuário
    participant C as Componente
    participant CTX as Context
    participant SVC as Service
    participant SS as SessionStorage

    U->>C: Ação (ex: check-in)
    C->>CTX: Chama método do contexto
    CTX->>SVC: Executa operação
    SVC->>SS: Lê/Escreve dados
    SS-->>SVC: Retorna dados
    SVC-->>CTX: Retorna resultado
    CTX-->>C: Atualiza estado
    C-->>U: Re-renderiza UI
```

---

## Integrações

### Serviços Externos

```mermaid
flowchart LR
    subgraph App["Visite Caçapava"]
        AI[AI Service]
        MAP[Map Service]
    end

    subgraph GoogleCloud["Google Cloud"]
        GEMINI[Gemini API]
    end

    subgraph OpenAI["OpenAI"]
        GPT[GPT-3.5 API]
    end

    subgraph Maps["OpenStreetMap"]
        OSM[Tiles Server]
        LEAFLET[Leaflet.js]
    end

    AI -->|Primary| GEMINI
    AI -->|Fallback| GPT
    MAP --> LEAFLET
    LEAFLET --> OSM
```

### Fluxo de IA

```mermaid
sequenceDiagram
    participant U as Usuário
    participant APP as Aplicação
    participant GS as GeminiService
    participant OS as OpenAIService

    U->>APP: Envia pergunta
    APP->>GS: Tenta Gemini API

    alt Gemini disponível
        GS-->>APP: Resposta Gemini
    else Gemini falha
        APP->>OS: Fallback para OpenAI
        OS-->>APP: Resposta OpenAI
    end

    APP-->>U: Exibe resposta
```

---

## Decisões Arquiteturais

### ADR-001: Frontend SPA sem Backend Real

**Contexto**: Projeto MVP para demonstração

**Decisão**: Utilizar apenas frontend com mock service

**Justificativa**:
- Redução de complexidade para MVP
- Deploy simplificado na Vercel
- Foco em UX e gamificação

**Consequências**:
- ✅ Desenvolvimento rápido
- ✅ Zero custos de infraestrutura backend
- ❌ Dados não persistem entre sessões
- ❌ Sem escalabilidade multiusuário real

### ADR-002: Context API vs Redux

**Contexto**: Necessidade de estado global

**Decisão**: Usar Context API nativo do React

**Justificativa**:
- Complexidade adequada para o projeto
- Sem dependências adicionais
- Integração natural com React

### ADR-003: Session Storage vs LocalStorage

**Contexto**: Persistência de dados mock

**Decisão**: Session Storage

**Justificativa**:
- Reset automático ao fechar navegador
- Comportamento esperado para demo
- Evita dados obsoletos acumulados

### ADR-004: Leaflet vs Google Maps

**Contexto**: Necessidade de mapas interativos

**Decisão**: Leaflet como primário, Google Maps para features específicas

**Justificativa**:
- Leaflet: Open source, sem custos
- Google Maps: Recursos avançados quando necessário
- Híbrido oferece melhor custo-benefício

---

## Escalabilidade

### Arquitetura Atual (MVP)

```
┌─────────────────────────────────────┐
│           Vercel Edge               │
│  ┌───────────────────────────────┐  │
│  │       React SPA Bundle        │  │
│  │  ┌─────────────────────────┐  │  │
│  │  │    Session Storage      │  │  │
│  │  │    (Browser Local)      │  │  │
│  │  └─────────────────────────┘  │  │
│  └───────────────────────────────┘  │
└─────────────────────────────────────┘
```

### Arquitetura Futura (Produção)

```mermaid
flowchart TB
    subgraph Client["Cliente"]
        WEB[Web App]
        MOBILE[Mobile App]
    end

    subgraph CDN["Vercel Edge"]
        STATIC[Static Assets]
    end

    subgraph Backend["Backend Services"]
        API[API Gateway]
        AUTH[Auth Service]
        GAME[Gamification Service]
        NOTIFY[Notification Service]
    end

    subgraph Data["Data Layer"]
        PG[(PostgreSQL)]
        REDIS[(Redis Cache)]
        S3[(Object Storage)]
    end

    WEB --> CDN
    MOBILE --> API
    CDN --> API

    API --> AUTH
    API --> GAME
    API --> NOTIFY

    AUTH --> PG
    GAME --> PG
    GAME --> REDIS
    NOTIFY --> REDIS
```

### Roadmap de Escalabilidade

| Fase | Componente | Tecnologia |
|------|------------|------------|
| 1 | Backend API | Node.js + Express |
| 2 | Banco de Dados | PostgreSQL |
| 3 | Cache | Redis |
| 4 | Auth | JWT + Refresh Tokens |
| 5 | Mobile | React Native |
| 6 | Push Notifications | Firebase |
| 7 | Analytics | Google Analytics / Mixpanel |

---

## Referências

- [React Architecture Best Practices](https://react.dev/learn/thinking-in-react)
- [C4 Model](https://c4model.com/)
- [IEEE 1016-2009 Software Design Descriptions](https://standards.ieee.org/standard/1016-2009.html)

---

```
© 2025 Oryum Tech. Todos os direitos reservados.
Este documento é propriedade exclusiva da Oryum Tech.
Proibida a reprodução, distribuição ou uso sem autorização expressa.
```
