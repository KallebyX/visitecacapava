---
title: Fluxo de Dados
version: 1.0.0
last_updated: 2025-11-26
author: Oryum Tech
classification: CONFIDENCIAL - USO INTERNO
---

# Fluxo de Dados

## 📋 Índice

1. [Visão Geral](#visão-geral)
2. [Fluxo de Autenticação](#fluxo-de-autenticação)
3. [Fluxo de Gamificação](#fluxo-de-gamificação)
4. [Fluxo de Check-in](#fluxo-de-check-in)
5. [Fluxo de IA](#fluxo-de-ia)
6. [Fluxo de Dados por Papel](#fluxo-de-dados-por-papel)
7. [Persistência de Dados](#persistência-de-dados)

---

## Visão Geral

### Arquitetura de Dados

```mermaid
flowchart TB
    subgraph UI["Interface do Usuário"]
        PAGES[Páginas]
        COMPS[Componentes]
    end

    subgraph State["Gerenciamento de Estado"]
        AUTH[AuthContext]
        GAME[GamificationContext]
    end

    subgraph Services["Camada de Serviços"]
        BACKEND[backendService]
        AI[AI Services]
    end

    subgraph Storage["Armazenamento"]
        SESSION[(Session Storage)]
    end

    subgraph External["APIs Externas"]
        GEMINI[Google Gemini]
        OPENAI[OpenAI]
    end

    PAGES --> COMPS
    COMPS --> AUTH
    COMPS --> GAME
    AUTH --> BACKEND
    GAME --> BACKEND
    BACKEND --> SESSION
    AI --> GEMINI
    AI --> OPENAI
```

### Princípios de Fluxo de Dados

1. **Unidirecional**: Dados fluem de cima para baixo
2. **Imutabilidade**: Estado nunca é mutado diretamente
3. **Centralizado**: Context API como single source of truth
4. **Reativo**: UI atualiza automaticamente com mudanças de estado

---

## Fluxo de Autenticação

### Diagrama de Sequência - Login

```mermaid
sequenceDiagram
    participant U as Usuário
    participant LP as LoginPage
    participant AC as AuthContext
    participant BS as backendService
    participant SS as SessionStorage

    U->>LP: Insere credenciais
    LP->>AC: login(email, password)
    AC->>BS: login(email, password)
    BS->>SS: getItem('db_users')
    SS-->>BS: users[]

    alt Usuário encontrado
        BS->>BS: Valida senha
        alt Senha correta
            BS-->>AC: { success: true, user, role }
            AC->>SS: setItem('user', user)
            AC-->>LP: Login bem-sucedido
            LP->>LP: navigate(dashboardByRole)
        else Senha incorreta
            BS-->>AC: { success: false }
            AC-->>LP: Erro de credenciais
        end
    else Usuário não encontrado
        BS-->>AC: { success: false }
        AC-->>LP: Usuário não existe
    end
```

### Estado de Autenticação

```typescript
interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

interface AuthActions {
  login: (email: string, password: string) => Promise<LoginResult>;
  logout: () => void;
}
```

### Fluxo de Logout

```mermaid
sequenceDiagram
    participant U as Usuário
    participant APP as Aplicação
    participant AC as AuthContext
    participant SS as SessionStorage

    U->>APP: Clica em Logout
    APP->>AC: logout()
    AC->>SS: removeItem('user')
    AC->>AC: setUser(null)
    AC-->>APP: Estado atualizado
    APP->>APP: navigate('/login')
```

---

## Fluxo de Gamificação

### Diagrama de Estado - Gamificação

```mermaid
stateDiagram-v2
    [*] --> Idle: Usuário logado

    Idle --> CheckingIn: Escaneia QR
    CheckingIn --> ValidatingLocation: QR válido
    ValidatingLocation --> ProcessingCheckIn: Localização válida
    ProcessingCheckIn --> CalculatingPoints: Check-in registrado
    CalculatingPoints --> EvaluatingBadges: Pontos adicionados
    EvaluatingBadges --> Idle: Badges avaliados

    CheckingIn --> Idle: QR inválido
    ValidatingLocation --> Idle: Fora do raio
```

### Fluxo de Pontuação

```mermaid
sequenceDiagram
    participant U as Usuário
    participant GC as GamificationContext
    participant BS as backendService
    participant SS as SessionStorage

    U->>GC: checkIn(poiId)
    GC->>BS: checkIn(userId, poiId)

    BS->>SS: getItem('db_users')
    SS-->>BS: users[]
    BS->>BS: Encontra usuário

    BS->>SS: getItem('db_pois')
    SS-->>BS: pois[]
    BS->>BS: Encontra POI

    BS->>BS: Adiciona pontos
    BS->>BS: Registra visita
    BS->>BS: Avalia badges

    BS->>SS: setItem('db_users', updatedUsers)
    BS-->>GC: { success, newBadges }
    GC->>GC: Atualiza currentUser
    GC-->>U: UI atualizada
```

### Avaliação de Badges

```mermaid
flowchart TD
    START[Check-in realizado] --> GET_VISITED[Obtém POIs visitados]
    GET_VISITED --> LOOP{Para cada badge}

    LOOP --> CHECK[Verifica critério]
    CHECK --> HAS{Usuário já tem?}

    HAS -->|Sim| LOOP
    HAS -->|Não| CRITERIA{Critério atendido?}

    CRITERIA -->|Sim| ADD[Adiciona badge]
    CRITERIA -->|Não| LOOP

    ADD --> LOOP
    LOOP -->|Fim| RETURN[Retorna novos badges]
```

### Critérios de Badges

```typescript
const BADGES = [
  {
    id: 'explorador_natureza',
    criteria: (visitedIds: Set<string>) => {
      const naturePois = ['pedra-segredo', 'guaritas', 'cascata'];
      return naturePois.every(id => visitedIds.has(id));
    }
  },
  {
    id: 'pioneiro',
    criteria: (visitedIds: Set<string>) => visitedIds.size >= 1
  },
  // ...
];
```

---

## Fluxo de Check-in

### Diagrama Completo - Check-in com QR Code

```mermaid
sequenceDiagram
    participant U as Usuário
    participant QRS as QRScanner
    participant QRV as QRValidator
    participant GEO as Geolocation
    participant GC as GamificationContext
    participant BS as backendService

    U->>QRS: Abre scanner
    QRS->>U: Mostra câmera

    U->>QRS: Escaneia QR do POI
    QRS->>QRV: validateQRCode(qrString)

    QRV->>QRV: Extrai payload
    QRV->>QRV: Verifica HMAC-SHA256

    alt Assinatura inválida
        QRV-->>QRS: QR inválido
        QRS-->>U: Erro: QR code inválido
    else Assinatura válida
        QRV->>QRV: Verifica timestamp
        alt Expirado (> 24h)
            QRV-->>QRS: QR expirado
            QRS-->>U: Erro: QR code expirado
        else Válido
            QRV->>GEO: getCurrentPosition()
            GEO-->>QRV: { lat, lng }

            QRV->>QRV: calculateDistance(userPos, poiPos)

            alt Distância > 75m
                QRV-->>QRS: Fora do raio
                QRS-->>U: Erro: Aproxime-se do local
            else Distância <= 75m
                QRV-->>QRS: Validação OK
                QRS->>GC: checkIn(poiId)
                GC->>BS: processCheckIn()
                BS-->>GC: { success, points, newBadges }
                GC-->>QRS: Check-in completo
                QRS-->>U: Sucesso! +X pontos
            end
        end
    end
```

### Estrutura do QR Code

```typescript
interface QRPayload {
  poiId: string;      // ID do ponto de interesse
  lat: number;        // Latitude do POI
  lng: number;        // Longitude do POI
  timestamp: number;  // Unix timestamp de geração
  nonce: string;      // Valor aleatório único
  signature: string;  // HMAC-SHA256 do payload
}

// Exemplo de QR code gerado
const qrData = {
  poiId: 'forte-dom-pedro',
  lat: -30.5144,
  lng: -53.4883,
  timestamp: 1732636800000,
  nonce: 'a1b2c3d4e5',
  signature: 'hmac_sha256_hash_here'
};
```

### Validação Geográfica

```typescript
// Constantes de validação
const CHECKIN_RADIUS = 75;  // metros
const DISCOVERY_RADIUS = 60; // metros

// Fórmula de Haversine para cálculo de distância
function calculateDistance(
  lat1: number, lng1: number,
  lat2: number, lng2: number
): number {
  const R = 6371e3; // Raio da Terra em metros
  const φ1 = lat1 * Math.PI / 180;
  const φ2 = lat2 * Math.PI / 180;
  const Δφ = (lat2 - lat1) * Math.PI / 180;
  const Δλ = (lng2 - lng1) * Math.PI / 180;

  const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ/2) * Math.sin(Δλ/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

  return R * c;
}
```

---

## Fluxo de IA

### Diagrama - Chat com IA

```mermaid
sequenceDiagram
    participant U as Usuário
    participant CHAT as AIChat
    participant GS as geminiService
    participant OS as openaiService
    participant GEMINI as Google Gemini API
    participant OPENAI as OpenAI API

    U->>CHAT: Envia mensagem
    CHAT->>CHAT: Adiciona contexto (POI atual, histórico)
    CHAT->>GS: getAIChatResponse(messages)

    GS->>GEMINI: POST /generateContent

    alt Gemini responde
        GEMINI-->>GS: Resposta
        GS-->>CHAT: Texto da resposta
    else Gemini falha
        GEMINI--xGS: Erro/Timeout
        GS->>OS: Fallback request
        OS->>OPENAI: POST /chat/completions
        OPENAI-->>OS: Resposta
        OS-->>GS: Texto da resposta
        GS-->>CHAT: Texto da resposta
    end

    CHAT-->>U: Exibe resposta
```

### Estrutura de Mensagens

```typescript
interface AIMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

interface AIContext {
  currentPOI?: PointOfInterest;
  userLocation?: Coordinates;
  visitedPOIs: string[];
  userPreferences?: UserPreferences;
}

// Prompt do sistema
const systemPrompt = `
Você é um guia turístico virtual especializado em Caçapava do Sul, RS.
Forneça informações precisas sobre pontos turísticos, história local,
gastronomia e dicas de viagem. Seja amigável e entusiasmado.
Contexto atual: ${JSON.stringify(context)}
`;
```

### Fluxo de Fallback

```mermaid
flowchart TD
    START[Requisição IA] --> TRY_GEMINI[Tenta Google Gemini]
    TRY_GEMINI --> GEMINI_OK{Sucesso?}

    GEMINI_OK -->|Sim| RETURN_GEMINI[Retorna resposta Gemini]
    GEMINI_OK -->|Não| CHECK_ERROR{Tipo de erro?}

    CHECK_ERROR -->|Rate limit| WAIT[Aguarda 1s]
    CHECK_ERROR -->|API Error| TRY_OPENAI[Tenta OpenAI]
    CHECK_ERROR -->|Network| RETRY[Retry Gemini]

    WAIT --> TRY_OPENAI
    RETRY --> RETRY_OK{Sucesso?}
    RETRY_OK -->|Sim| RETURN_GEMINI
    RETRY_OK -->|Não| TRY_OPENAI

    TRY_OPENAI --> OPENAI_OK{Sucesso?}
    OPENAI_OK -->|Sim| RETURN_OPENAI[Retorna resposta OpenAI]
    OPENAI_OK -->|Não| DEMO_MODE[Modo Demo]

    DEMO_MODE --> RETURN_DEMO[Resposta padrão]
```

---

## Fluxo de Dados por Papel

### Turista

```mermaid
flowchart LR
    subgraph Input["Entrada"]
        LOGIN[Login]
        SCAN[Scan QR]
        CHAT[Chat IA]
        NAV[Navegação]
    end

    subgraph Process["Processamento"]
        AUTH[Autenticação]
        CHECKIN[Check-in]
        AI[Processamento IA]
        ROUTING[Roteamento]
    end

    subgraph Output["Saída"]
        PROFILE[Perfil]
        POINTS[Pontos]
        BADGES[Badges]
        RANK[Ranking]
    end

    LOGIN --> AUTH --> PROFILE
    SCAN --> CHECKIN --> POINTS
    CHECKIN --> BADGES
    CHAT --> AI --> PROFILE
    NAV --> ROUTING --> RANK
```

### Administrador (Secretaria)

```mermaid
flowchart LR
    subgraph Input["Entrada"]
        CRUD_POI[CRUD POIs]
        CRUD_ROUTE[CRUD Rotas]
        VIEW_STATS[Ver Stats]
    end

    subgraph Process["Processamento"]
        POI_SVC[POI Service]
        ROUTE_SVC[Route Service]
        ANALYTICS[Analytics]
    end

    subgraph Output["Saída"]
        POI_LIST[Lista POIs]
        ROUTE_LIST[Lista Rotas]
        DASHBOARD[Dashboard]
    end

    CRUD_POI --> POI_SVC --> POI_LIST
    CRUD_ROUTE --> ROUTE_SVC --> ROUTE_LIST
    VIEW_STATS --> ANALYTICS --> DASHBOARD
```

### Hotel

```mermaid
flowchart LR
    subgraph Input["Entrada"]
        GUEST_DATA[Dados Hóspede]
        SURVEY[Pesquisa]
    end

    subgraph Process["Processamento"]
        CHECKIN_SVC[Check-in Service]
        VALIDATE[Validação]
    end

    subgraph Output["Saída"]
        GUEST_LIST[Lista Hóspedes]
        STATS[Estatísticas]
    end

    GUEST_DATA --> VALIDATE --> CHECKIN_SVC
    SURVEY --> CHECKIN_SVC
    CHECKIN_SVC --> GUEST_LIST
    CHECKIN_SVC --> STATS
```

---

## Persistência de Dados

### Estrutura do Session Storage

```typescript
// Chaves de armazenamento
const STORAGE_KEYS = {
  USERS: 'db_users',
  POIS: 'db_pois',
  ROUTES: 'db_routes',
  BADGES: 'db_badges',
  PHOTOS: 'db_photos',
  REVIEWS: 'db_reviews',
  FAVORITES: 'db_favorites',
  CHECKINS: 'db_checkins',
  CURRENT_USER: 'user'
};

// Estrutura de dados
interface StorageSchema {
  db_users: User[];
  db_pois: PointOfInterest[];
  db_routes: Route[];
  db_badges: Badge[];
  db_photos: Photo[];
  db_reviews: Review[];
  db_favorites: Favorite[];
  db_checkins: HotelCheckIn[];
  user: User | null;
}
```

### Fluxo de Inicialização

```mermaid
sequenceDiagram
    participant APP as Aplicação
    participant BS as backendService
    participant SS as SessionStorage
    participant CONST as constants.ts

    APP->>BS: Inicializa
    BS->>SS: getItem('db_users')

    alt Dados existem
        SS-->>BS: users[]
        BS->>BS: Usa dados existentes
    else Dados não existem
        SS-->>BS: null
        BS->>CONST: Obtém dados iniciais
        CONST-->>BS: MOCK_USERS, POIS, etc.
        BS->>SS: setItem('db_users', mockUsers)
        BS->>SS: setItem('db_pois', pois)
        BS->>SS: setItem('db_routes', routes)
    end

    BS-->>APP: Pronto
```

### Ciclo de Vida dos Dados

```
Início da Sessão:
┌─────────────────────────────────────────┐
│ 1. Verifica Session Storage             │
│ 2. Se vazio, inicializa com mock data   │
│ 3. Carrega estado em memória            │
└─────────────────────────────────────────┘
                    │
                    ▼
Durante a Sessão:
┌─────────────────────────────────────────┐
│ • Operações CRUD atualizam Storage      │
│ • Contextos mantêm estado reativo       │
│ • UI sincroniza automaticamente         │
└─────────────────────────────────────────┘
                    │
                    ▼
Fim da Sessão:
┌─────────────────────────────────────────┐
│ • Session Storage limpo pelo navegador  │
│ • Dados perdidos (comportamento demo)   │
└─────────────────────────────────────────┘
```

---

## Referências

- [React Data Flow](https://react.dev/learn/thinking-in-react#step-4-identify-where-your-state-should-live)
- [Flux Architecture](https://facebookarchive.github.io/flux/)
- [Session Storage MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage)

---

```
© 2025 Oryum Tech. Todos os direitos reservados.
Este documento é propriedade exclusiva da Oryum Tech.
Proibida a reprodução, distribuição ou uso sem autorização expressa.
```
