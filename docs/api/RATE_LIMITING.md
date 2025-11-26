---
title: Rate Limiting
version: 1.0.0
last_updated: 2025-11-26
author: Oryum Tech
classification: CONFIDENCIAL - USO INTERNO
---

# Políticas de Rate Limiting

## Visão Geral

O rate limiting protege a API contra uso excessivo e garante disponibilidade para todos os usuários.

> **Nota**: O MVP atual não implementa rate limiting no mock service. Esta documentação descreve a política planejada para produção.

## Limites por Papel

| Papel | Requests/min | Requests/hora | Requests/dia |
|-------|--------------|---------------|--------------|
| Tourist | 60 | 1.000 | 10.000 |
| Hotel | 120 | 2.000 | 20.000 |
| Restaurant | 120 | 2.000 | 20.000 |
| Secretaria | 300 | 5.000 | 50.000 |
| API Key (Partner) | 600 | 10.000 | 100.000 |

## Limites por Endpoint

| Endpoint | Limite | Janela |
|----------|--------|--------|
| `POST /auth/login` | 5 | 1 min |
| `POST /checkin` | 10 | 1 min |
| `GET /pois` | 100 | 1 min |
| `POST /*/upload` | 5 | 1 min |
| `GET /ai/chat` | 20 | 1 min |

## Headers de Rate Limit

Toda resposta inclui headers informativos:

```http
HTTP/1.1 200 OK
X-RateLimit-Limit: 60
X-RateLimit-Remaining: 45
X-RateLimit-Reset: 1700000000
X-RateLimit-Policy: 60;w=60
```

| Header | Descrição |
|--------|-----------|
| `X-RateLimit-Limit` | Limite total na janela |
| `X-RateLimit-Remaining` | Requisições restantes |
| `X-RateLimit-Reset` | Timestamp Unix do reset |
| `X-RateLimit-Policy` | Política aplicada |

## Resposta de Limite Excedido

```http
HTTP/1.1 429 Too Many Requests
Content-Type: application/json
Retry-After: 30
X-RateLimit-Limit: 60
X-RateLimit-Remaining: 0
X-RateLimit-Reset: 1700000030

{
  "success": false,
  "error": {
    "code": "SYS_003",
    "message": "Muitas requisições. Aguarde 30 segundos.",
    "retryAfter": 30
  }
}
```

## Algoritmo

### Token Bucket

```
┌─────────────────────────────────────┐
│           Token Bucket              │
│                                     │
│  Capacidade: 60 tokens              │
│  Taxa de refill: 1 token/segundo    │
│                                     │
│  ████████████░░░░░░░░  45/60        │
│                                     │
└─────────────────────────────────────┘
```

Cada requisição consome 1 token. Tokens são reabastecidos continuamente.

## Implementação (Exemplo com Redis)

```typescript
// Pseudocódigo do rate limiter
async function checkRateLimit(userId: string): Promise<boolean> {
  const key = `ratelimit:${userId}`;
  const limit = 60;
  const window = 60; // segundos

  const current = await redis.incr(key);

  if (current === 1) {
    await redis.expire(key, window);
  }

  return current <= limit;
}
```

## Boas Práticas para Clientes

### 1. Implemente Retry com Backoff

```typescript
async function requestWithRetry(url: string, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    const response = await fetch(url);

    if (response.status === 429) {
      const retryAfter = response.headers.get('Retry-After') || 30;
      await sleep(Number(retryAfter) * 1000);
      continue;
    }

    return response;
  }
  throw new Error('Max retries exceeded');
}
```

### 2. Monitore os Headers

```typescript
function checkRateLimit(response: Response) {
  const remaining = response.headers.get('X-RateLimit-Remaining');

  if (Number(remaining) < 10) {
    console.warn('Rate limit baixo:', remaining);
    // Reduzir frequência de requisições
  }
}
```

### 3. Cache Respostas

```typescript
// Cache local para reduzir requisições
const cache = new Map();

async function getCachedPois() {
  const cacheKey = 'pois';
  const cached = cache.get(cacheKey);

  if (cached && Date.now() - cached.timestamp < 60000) {
    return cached.data;
  }

  const data = await api.getPois();
  cache.set(cacheKey, { data, timestamp: Date.now() });
  return data;
}
```

## Exceções

### Endpoints sem Rate Limit

- `GET /health` - Health check
- `GET /` - Root/documentação

### Aumento de Limite

Para solicitar aumento de limite:

1. Contate suporte@oryumtech.com.br
2. Descreva caso de uso
3. Aguarde avaliação (até 5 dias úteis)

---

```
© 2025 Oryum Tech. Todos os direitos reservados.
```
