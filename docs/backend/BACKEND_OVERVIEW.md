---
title: Visão Geral do Backend
version: 1.0.0
last_updated: 2025-11-26
author: Oryum Tech
classification: CONFIDENCIAL - USO INTERNO
---

# Visão Geral do Backend

## 📋 Índice

1. [Estado Atual](#estado-atual)
2. [Arquitetura Mock](#arquitetura-mock)
3. [Serviços Implementados](#serviços-implementados)
4. [Arquitetura de Produção](#arquitetura-de-produção)

---

## Estado Atual

### Mock Backend

O projeto Visite Caçapava atualmente opera com um **mock backend** implementado diretamente no frontend. Esta abordagem foi escolhida para o MVP, permitindo desenvolvimento rápido sem infraestrutura de servidor.

```
⚠️ AVISO
Este não é um backend real. Todos os dados são armazenados
no Session Storage do navegador e não persistem entre sessões.
```

### Localização dos Serviços

```
services/
├── backendService.ts      # Mock CRUD operations
├── geminiService.ts       # Google Gemini AI integration
├── openaiService.ts       # OpenAI fallback
└── googleMapsService.ts   # Google Maps integration
```

---

## Arquitetura Mock

### backendService.ts

O serviço principal que simula todas as operações de backend:

```typescript
// Principais categorias de operações
const backendService = {
  // Autenticação
  login(email, password),

  // Usuários
  getUserById(userId),
  updateUser(userId, data),
  getLeaderboard(),

  // POIs
  getPois(),
  getPoiById(poiId),
  createPoi(poiData),
  updatePoi(poiId, poiData),
  deletePoi(poiId),

  // Rotas
  getRoutes(),
  getRouteById(routeId),
  createRoute(routeData),
  updateRoute(routeId, routeData),
  deleteRoute(routeId),

  // Gamificação
  checkIn(userId, poiId),
  getBadges(),

  // Hotel
  createHotelCheckIn(data),
  getHotelCheckIns(hotelId),

  // Analytics
  getAdminStats(),
  getAnalytics(startDate, endDate)
};
```

### Simulação de Latência

```typescript
// Delay artificial para simular rede
const simulateNetworkDelay = () =>
  new Promise(resolve =>
    setTimeout(resolve, Math.random() * 250 + 50)
  );
```

---

## Serviços Implementados

### 1. AI Services

**geminiService.ts** - Integração primária com Google Gemini
**openaiService.ts** - Fallback para OpenAI

```typescript
// Fluxo de fallback
try {
  response = await geminiService.generate(prompt);
} catch (error) {
  response = await openaiService.generate(prompt);
}
```

### 2. Geolocation Utils

```typescript
// utils/geolocation.ts
- calculateDistance(coord1, coord2)   // Haversine
- insideBBox(lat, lng)                // Validação de limites
- withinCheckinRadius(user, poi)      // Raio de 75m
- withinDiscoveryRadius(user, poi)    // Raio de 60m
```

### 3. QR Code System

```typescript
// utils/qrCodeSystem.ts
- generateQRCode(poiId)               // Gera QR com HMAC
- validateQRCode(qrString, location)  // Valida assinatura
```

---

## Arquitetura de Produção

### Stack Recomendada

```
┌─────────────────────────────────────────────┐
│                 Frontend                     │
│              (React/Vercel)                  │
└─────────────────────┬───────────────────────┘
                      │ REST/GraphQL
┌─────────────────────▼───────────────────────┐
│              API Gateway                     │
│            (Kong/Express)                    │
└─────────────────────┬───────────────────────┘
                      │
    ┌─────────────────┼─────────────────┐
    │                 │                 │
┌───▼───┐       ┌─────▼─────┐     ┌─────▼─────┐
│ Auth  │       │   Core    │     │ Analytics │
│Service│       │  Service  │     │  Service  │
└───┬───┘       └─────┬─────┘     └─────┬─────┘
    │                 │                 │
┌───▼─────────────────▼─────────────────▼─────┐
│               PostgreSQL + Redis             │
└─────────────────────────────────────────────┘
```

### Tecnologias Recomendadas

| Componente | Tecnologia |
|------------|------------|
| Runtime | Node.js 20 LTS |
| Framework | Express ou Fastify |
| ORM | Prisma |
| Banco de Dados | PostgreSQL 15 |
| Cache | Redis |
| Auth | JWT + Passport.js |
| Validação | Zod |
| Documentação | Swagger/OpenAPI |

---

```
© 2025 Oryum Tech. Todos os direitos reservados.
Este documento é propriedade exclusiva da Oryum Tech.
Proibida a reprodução, distribuição ou uso sem autorização expressa.
```
