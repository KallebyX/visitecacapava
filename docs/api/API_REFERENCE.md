---
title: Referência da API
version: 1.0.0
last_updated: 2025-11-26
author: Oryum Tech
classification: CONFIDENCIAL - USO INTERNO
---

# Referência da API

## 📋 Índice

1. [Visão Geral](#visão-geral)
2. [Autenticação](#autenticação)
3. [Endpoints de Usuário](#endpoints-de-usuário)
4. [Endpoints de POI](#endpoints-de-poi)
5. [Endpoints de Rotas](#endpoints-de-rotas)
6. [Endpoints de Gamificação](#endpoints-de-gamificação)
7. [Endpoints de Hotel](#endpoints-de-hotel)
8. [Endpoints de Analytics](#endpoints-de-analytics)
9. [Códigos de Erro](#códigos-de-erro)

---

## Visão Geral

### Informações Gerais

> **Nota**: Esta documentação descreve a API mock implementada em `services/backendService.ts`. Em produção, esta API será substituída por endpoints REST reais.

**Base URL (Mock)**: N/A (client-side)
**Base URL (Futura)**: `https://api.visitecacapava.com.br/v1`

### Convenções

- Todos os métodos retornam Promises
- Datas no formato ISO 8601
- IDs são strings UUID-like
- Respostas simulam delay de rede (50-300ms)

### Estrutura de Resposta

```typescript
// Resposta de sucesso
{
  success: true,
  data: { ... },
  message?: string
}

// Resposta de erro
{
  success: false,
  error: string,
  code?: string
}
```

---

## Autenticação

### login

Autentica um usuário no sistema.

```typescript
async function login(email: string, password: string): Promise<LoginResult>
```

**Parâmetros:**
| Nome | Tipo | Obrigatório | Descrição |
|------|------|-------------|-----------|
| email | string | Sim | Email do usuário |
| password | string | Sim | Senha do usuário |

**Retorno:**
```typescript
interface LoginResult {
  success: boolean;
  user?: User;
  role?: UserRole;
  error?: string;
}
```

**Exemplo:**
```typescript
const result = await backendService.login('turista@email.com', 'senha123');

// Sucesso
{
  success: true,
  user: {
    id: 'user-1',
    name: 'João Turista',
    email: 'turista@email.com',
    role: 'tourist',
    points: 150,
    badges: ['pioneiro'],
    visited: [...]
  },
  role: 'tourist'
}

// Erro
{
  success: false,
  error: 'Credenciais inválidas'
}
```

**Credenciais de Demo:**
| Email | Senha | Role |
|-------|-------|------|
| turista@email.com | senha123 | tourist |
| hotel@email.com | senha123 | hotel |
| restaurante@email.com | senha123 | restaurant |
| secretaria@email.com | senha123 | secretaria |

---

## Endpoints de Usuário

### getUserById

Obtém um usuário pelo ID.

```typescript
async function getUserById(userId: string): Promise<User | null>
```

**Parâmetros:**
| Nome | Tipo | Obrigatório | Descrição |
|------|------|-------------|-----------|
| userId | string | Sim | ID do usuário |

**Retorno:**
```typescript
interface User {
  id: string;
  name: string;
  email: string;
  role: 'tourist' | 'hotel' | 'restaurant' | 'secretaria';
  avatarUrl: string;
  points: number;
  visited: Visit[];
  badges: string[];
  routeProgress: RouteProgress[];
  bio?: string;
  phone?: string;
  hometown?: string;
  socialMedia?: SocialMedia;
  followers?: string[];
  following?: string[];
}
```

---

### updateUser

Atualiza dados de um usuário.

```typescript
async function updateUser(userId: string, data: Partial<User>): Promise<User>
```

**Parâmetros:**
| Nome | Tipo | Obrigatório | Descrição |
|------|------|-------------|-----------|
| userId | string | Sim | ID do usuário |
| data | Partial<User> | Sim | Dados a atualizar |

**Campos atualizáveis:**
- name
- avatarUrl
- bio
- phone
- hometown
- socialMedia
- privacySettings

**Exemplo:**
```typescript
const updated = await backendService.updateUser('user-1', {
  name: 'João Silva',
  bio: 'Amante de viagens',
  socialMedia: {
    instagram: '@joaoviaja'
  }
});
```

---

### getLeaderboard

Obtém ranking de turistas por pontos.

```typescript
async function getLeaderboard(): Promise<User[]>
```

**Retorno:**
Array de usuários turistas ordenados por pontos (decrescente).

**Exemplo:**
```typescript
const leaderboard = await backendService.getLeaderboard();
// [
//   { id: 'user-5', name: 'Maria', points: 500, ... },
//   { id: 'user-3', name: 'Pedro', points: 350, ... },
//   { id: 'user-1', name: 'João', points: 150, ... },
// ]
```

---

## Endpoints de POI

### getPois

Obtém todos os pontos de interesse.

```typescript
async function getPois(): Promise<PointOfInterest[]>
```

**Retorno:**
```typescript
interface PointOfInterest {
  id: string;
  name: string;
  description: string;
  longDescription: string;
  imageUrl: string;
  website?: string;
  points: number;
  lat: number;
  lng: number;
}
```

---

### getPoiById

Obtém um POI específico.

```typescript
async function getPoiById(poiId: string): Promise<PointOfInterest | null>
```

---

### createPoi

Cria um novo ponto de interesse (Admin).

```typescript
async function createPoi(poiData: Omit<PointOfInterest, 'id'>): Promise<PointOfInterest>
```

**Parâmetros:**
| Nome | Tipo | Obrigatório | Descrição |
|------|------|-------------|-----------|
| name | string | Sim | Nome do POI |
| description | string | Sim | Descrição curta |
| longDescription | string | Sim | Descrição detalhada |
| imageUrl | string | Sim | URL da imagem |
| lat | number | Sim | Latitude |
| lng | number | Sim | Longitude |
| points | number | Sim | Pontos por check-in |
| website | string | Não | Website |

---

### updatePoi

Atualiza um ponto de interesse (Admin).

```typescript
async function updatePoi(poiId: string, poiData: Partial<PointOfInterest>): Promise<PointOfInterest>
```

---

### deletePoi

Remove um ponto de interesse (Admin).

```typescript
async function deletePoi(poiId: string): Promise<void>
```

---

## Endpoints de Rotas

### getRoutes

Obtém todas as rotas turísticas.

```typescript
async function getRoutes(): Promise<Route[]>
```

**Retorno:**
```typescript
interface Route {
  id: string;
  name: string;
  description: string;
  pointsOfInterest: string[]; // IDs dos POIs
  imageUrl?: string;
  distance?: number; // km
  estimatedTime?: number; // minutos
  difficulty?: 'Fácil' | 'Moderado' | 'Difícil';
  category?: string;
}
```

---

### getRouteById

Obtém uma rota específica.

```typescript
async function getRouteById(routeId: string): Promise<Route | null>
```

---

### createRoute

Cria uma nova rota (Admin).

```typescript
async function createRoute(routeData: Omit<Route, 'id'>): Promise<Route>
```

---

### updateRoute

Atualiza uma rota (Admin).

```typescript
async function updateRoute(routeId: string, routeData: Partial<Route>): Promise<Route>
```

---

### deleteRoute

Remove uma rota (Admin).

```typescript
async function deleteRoute(routeId: string): Promise<void>
```

---

## Endpoints de Gamificação

### checkIn

Registra check-in de usuário em um POI.

```typescript
async function checkIn(userId: string, poiId: string): Promise<CheckInResult>
```

**Parâmetros:**
| Nome | Tipo | Obrigatório | Descrição |
|------|------|-------------|-----------|
| userId | string | Sim | ID do usuário |
| poiId | string | Sim | ID do POI |

**Retorno:**
```typescript
interface CheckInResult {
  success: boolean;
  message: string;
  pointsEarned?: number;
  newBadges?: Badge[];
  error?: string;
}
```

**Exemplo:**
```typescript
const result = await backendService.checkIn('user-1', 'forte-dom-pedro');

// Sucesso com novo badge
{
  success: true,
  message: 'Check-in realizado com sucesso!',
  pointsEarned: 25,
  newBadges: [{
    id: 'guardiao_patrimonio',
    name: 'Guardião do Patrimônio',
    description: 'Visitou o Forte Dom Pedro II e o Museu Militar'
  }]
}

// Já visitado
{
  success: false,
  error: 'Você já fez check-in neste local'
}
```

---

### getBadges

Obtém todos os badges disponíveis.

```typescript
async function getBadges(): Promise<Badge[]>
```

**Retorno:**
```typescript
interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  criteria: (visitedIds: Set<string>) => boolean;
}
```

---

## Endpoints de Hotel

### createHotelCheckIn

Registra check-in de hóspede no hotel.

```typescript
async function createHotelCheckIn(checkInData: HotelCheckInData): Promise<HotelCheckIn>
```

**Parâmetros:**
```typescript
interface HotelCheckInData {
  hotelId: string;
  touristName: string;
  phone: string;
  profession: string;
  nationality: string;
  birthDate: string; // YYYY-MM-DD
  gender: 'Masculino' | 'Feminino';
  idDocument: string;
  originCity: string;
  travelReason: 'Turismo' | 'Negócio' | 'Convenção' | 'Férias' | 'Outros';
  transportMean: 'Automóvel' | 'Ônibus' | 'Outros';
  discoveryChannel: 'Site' | 'Jornal' | 'TV' | 'Indicação de amigos' | 'Rede Social' | 'Outros';
  poiOpinion: 'Péssimo' | 'Ruim' | 'Boa' | 'Muito boa' | 'Ótima';
  cityOpinion: 'Péssimo' | 'Ruim' | 'Boa' | 'Muito boa' | 'Ótima';
  checkInDate: string;
  checkOutDate: string;
}
```

---

### getHotelCheckIns

Obtém check-ins de um hotel.

```typescript
async function getHotelCheckIns(hotelId: string): Promise<HotelCheckIn[]>
```

---

## Endpoints de Analytics

### getAdminStats

Obtém estatísticas para dashboard administrativo.

```typescript
async function getAdminStats(): Promise<AdminStats>
```

**Retorno:**
```typescript
interface AdminStats {
  totalTourists: number;
  totalCheckIns: number;
  totalPois: number;
  totalRoutes: number;
  averagePointsPerUser: number;
  mostVisitedPois: Array<{ id: string; name: string; visits: number }>;
  recentActivity: Activity[];
}
```

---

### getAnalytics

Obtém analytics detalhados por período.

```typescript
async function getAnalytics(startDate: string, endDate: string): Promise<Analytics>
```

**Parâmetros:**
| Nome | Tipo | Obrigatório | Descrição |
|------|------|-------------|-----------|
| startDate | string | Sim | Data inicial (ISO) |
| endDate | string | Sim | Data final (ISO) |

**Retorno:**
```typescript
interface Analytics {
  period: { start: string; end: string };
  visitors: {
    total: number;
    byDay: Array<{ date: string; count: number }>;
    byOrigin: Array<{ city: string; count: number }>;
  };
  checkIns: {
    total: number;
    byPoi: Array<{ poiId: string; poiName: string; count: number }>;
  };
  demographics: {
    byNationality: Array<{ nationality: string; count: number }>;
    byProfession: Array<{ profession: string; count: number }>;
    byTravelReason: Array<{ reason: string; count: number }>;
  };
}
```

---

## Códigos de Erro

### Tabela de Erros

| Código | Mensagem | Descrição |
|--------|----------|-----------|
| AUTH_001 | Credenciais inválidas | Email ou senha incorretos |
| AUTH_002 | Sessão expirada | Token de sessão expirado |
| AUTH_003 | Acesso negado | Sem permissão para o recurso |
| USER_001 | Usuário não encontrado | ID de usuário inválido |
| USER_002 | Email já existe | Email já cadastrado |
| POI_001 | POI não encontrado | ID de POI inválido |
| POI_002 | Já visitado | Check-in duplicado |
| ROUTE_001 | Rota não encontrada | ID de rota inválido |
| GEO_001 | Localização inválida | Coordenadas fora do município |
| GEO_002 | Fora do raio | Distância maior que 75m |
| QR_001 | QR inválido | Assinatura não confere |
| QR_002 | QR expirado | Timestamp > 24h |

### Tratamento de Erros

```typescript
try {
  const result = await backendService.checkIn(userId, poiId);
  if (!result.success) {
    // Handle business error
    console.error(result.error);
  }
} catch (error) {
  // Handle system error
  console.error('Erro de sistema:', error);
}
```

---

## Referências

- [OpenAPI Specification](https://spec.openapis.org/oas/v3.1.0)
- [REST API Design](https://restfulapi.net/)
- [JSON:API](https://jsonapi.org/)

---

```
© 2025 Oryum Tech. Todos os direitos reservados.
Este documento é propriedade exclusiva da Oryum Tech.
Proibida a reprodução, distribuição ou uso sem autorização expressa.
```
