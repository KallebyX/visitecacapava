---
title: Pipeline CI/CD
version: 1.0.0
last_updated: 2025-11-26
author: Oryum Tech
classification: CONFIDENCIAL - USO INTERNO
---

# Pipeline CI/CD

## Fluxo Atual

```mermaid
flowchart LR
    DEV[Developer] -->|Push| GH[GitHub]
    GH -->|Webhook| VERCEL[Vercel]
    VERCEL -->|Build| BUILD[npm run build]
    BUILD -->|Deploy| PROD[Production]
```

## GitHub Actions (Recomendado)

```yaml
# .github/workflows/ci.yml
name: CI/CD Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - run: npm ci
      - run: npm run lint

  build:
    runs-on: ubuntu-latest
    needs: lint
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-artifact@v4
        with:
          name: dist
          path: dist/

  deploy-preview:
    runs-on: ubuntu-latest
    needs: build
    if: github.event_name == 'pull_request'
    steps:
      - uses: actions/checkout@v4
      - uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}

  deploy-production:
    runs-on: ubuntu-latest
    needs: build
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v4
      - uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'
```

## Stages do Pipeline

| Stage | Ação | Trigger |
|-------|------|---------|
| Lint | Verificação de código | Push/PR |
| Build | Compilação TypeScript | Push/PR |
| Test | Testes unitários | Push/PR |
| Preview | Deploy de preview | PR |
| Production | Deploy de produção | Push main |

## Secrets Necessários

| Secret | Descrição |
|--------|-----------|
| `VERCEL_TOKEN` | Token de API da Vercel |
| `VERCEL_ORG_ID` | ID da organização |
| `VERCEL_PROJECT_ID` | ID do projeto |

---

```
© 2025 Oryum Tech. Todos os direitos reservados.
```
