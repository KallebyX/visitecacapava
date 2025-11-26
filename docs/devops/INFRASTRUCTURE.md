---
title: Documentação de Infraestrutura
version: 1.0.0
last_updated: 2025-11-26
author: Oryum Tech
classification: CONFIDENCIAL - USO INTERNO
---

# Documentação de Infraestrutura

## Arquitetura Atual (MVP)

```
┌─────────────────────────────────────────────────┐
│                   Internet                       │
└─────────────────────────┬───────────────────────┘
                          │
┌─────────────────────────▼───────────────────────┐
│              Vercel Edge Network                 │
│  ┌───────────────────────────────────────────┐  │
│  │           CDN Global (300+ POPs)          │  │
│  └───────────────────────────────────────────┘  │
│  ┌───────────────────────────────────────────┐  │
│  │         Static Files (React SPA)          │  │
│  │              Vite Build Output            │  │
│  └───────────────────────────────────────────┘  │
└─────────────────────────────────────────────────┘
                          │
         ┌────────────────┼────────────────┐
         │                │                │
┌────────▼────────┐ ┌─────▼─────┐ ┌────────▼────────┐
│  Google Gemini  │ │  OpenAI   │ │ OpenStreetMap   │
│      API        │ │    API    │ │   Tile Server   │
└─────────────────┘ └───────────┘ └─────────────────┘
```

## Especificações Vercel

| Recurso | Limite (Hobby) | Limite (Pro) |
|---------|----------------|--------------|
| Bandwidth | 100 GB/mês | 1 TB/mês |
| Build Time | 6000 min/mês | 24000 min/mês |
| Serverless Functions | 100/deploy | Ilimitado |
| Deployments | Ilimitado | Ilimitado |

## Arquitetura Futura (Produção)

```
┌─────────────────────────────────────────────────┐
│                   Usuários                       │
└─────────────────────────┬───────────────────────┘
                          │
┌─────────────────────────▼───────────────────────┐
│               Cloudflare CDN                     │
│                 (SSL/DDoS)                       │
└─────────────────────────┬───────────────────────┘
                          │
        ┌─────────────────┴─────────────────┐
        │                                   │
┌───────▼───────┐                   ┌───────▼───────┐
│  Vercel Edge  │                   │  KVM2 Server  │
│  (Frontend)   │                   │   (Backend)   │
└───────────────┘                   └───────┬───────┘
                                            │
                                ┌───────────┴───────────┐
                                │                       │
                        ┌───────▼───────┐       ┌───────▼───────┐
                        │  PostgreSQL   │       │    Redis      │
                        │   Database    │       │    Cache      │
                        └───────────────┘       └───────────────┘
```

## Servidor KVM2 (Planejado)

| Especificação | Valor |
|---------------|-------|
| vCPU | 4 cores |
| RAM | 8 GB |
| Storage | 100 GB SSD |
| OS | Ubuntu 22.04 LTS |
| Location | Brasil |

---

```
© 2025 Oryum Tech. Todos os direitos reservados.
```
