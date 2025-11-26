---
title: Guia de Deploy
version: 1.0.0
last_updated: 2025-11-26
author: Oryum Tech
classification: CONFIDENCIAL - USO INTERNO
---

# Guia de Deploy

## 📋 Índice

1. [Visão Geral](#visão-geral)
2. [Deploy na Vercel](#deploy-na-vercel)
3. [Variáveis de Ambiente](#variáveis-de-ambiente)
4. [Deploy Manual](#deploy-manual)
5. [Rollback](#rollback)

---

## Visão Geral

O Visite Caçapava está configurado para deploy automático na **Vercel**, com integração ao GitHub para deployments contínuos.

```mermaid
flowchart LR
    GIT[GitHub] -->|Push| VERCEL[Vercel]
    VERCEL -->|Build| BUILD[npm run build]
    BUILD -->|Deploy| CDN[Vercel Edge]
    CDN -->|Serve| USERS[Usuários]
```

### URLs

| Ambiente | URL |
|----------|-----|
| Produção | https://visitecacapava.vercel.app |
| Preview | https://visitecacapava-*.vercel.app |

---

## Deploy na Vercel

### Configuração Inicial

1. **Conectar Repositório**
   - Acesse [vercel.com](https://vercel.com)
   - Import do GitHub: `KallebyX/visitecacapava`

2. **Configurações de Build**

```json
// vercel.json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist"
}
```

3. **Framework Preset**: Vite

### Deploy Automático

Cada push para branches específicas dispara deploy:

| Branch | Ambiente | URL |
|--------|----------|-----|
| main | Produção | visitecacapava.vercel.app |
| develop | Preview | visitecacapava-develop.vercel.app |
| feature/* | Preview | visitecacapava-{branch}.vercel.app |

---

## Variáveis de Ambiente

### Configuração no Vercel

1. Acesse Project Settings > Environment Variables
2. Adicione as variáveis:

| Variável | Ambiente | Descrição |
|----------|----------|-----------|
| `VITE_GEMINI_API_KEY` | Todos | Chave da API Gemini |
| `VITE_OPENAI_API_KEY` | Todos | Chave da API OpenAI |
| `VITE_GOOGLE_MAPS_API_KEY` | Todos | Chave Google Maps |

### Arquivo .env Local

```env
# .env (não commitar!)
VITE_GEMINI_API_KEY=sua_chave_gemini
VITE_OPENAI_API_KEY=sua_chave_openai
VITE_GOOGLE_MAPS_API_KEY=sua_chave_google
```

---

## Deploy Manual

### Via CLI

```bash
# Instalar Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy de preview
vercel

# Deploy de produção
vercel --prod
```

### Via Interface

1. Acesse o projeto na Vercel
2. Clique em "Deployments"
3. Selecione "Create Deployment"
4. Escolha a branch
5. Confirme

---

## Rollback

### Via Interface

1. Acesse "Deployments" no projeto
2. Encontre o deployment anterior estável
3. Clique nos "..." e selecione "Promote to Production"

### Via CLI

```bash
# Listar deployments
vercel ls

# Promover deployment específico
vercel promote [deployment-url]
```

---

## Checklist de Deploy

### Pré-Deploy

- [ ] Testes passando localmente
- [ ] Build sem erros (`npm run build`)
- [ ] Variáveis de ambiente configuradas
- [ ] Código revisado e aprovado

### Pós-Deploy

- [ ] Verificar URL de produção
- [ ] Testar funcionalidades críticas
- [ ] Verificar logs de erro
- [ ] Monitorar performance

---

## Troubleshooting

### Build Falhou

```bash
# Verificar logs no Vercel Dashboard
# Ou via CLI:
vercel logs [deployment-url]
```

### Variáveis não Carregando

- Verificar prefixo `VITE_`
- Confirmar ambiente correto (Production/Preview)
- Rebuild após adicionar variáveis

### 404 em Rotas

O `vercel.json` deve ter rewrite para SPA:

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/" }
  ]
}
```

---

```
© 2025 Oryum Tech. Todos os direitos reservados.
```
