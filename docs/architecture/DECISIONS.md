---
title: Architecture Decision Records (ADRs)
version: 1.0.0
last_updated: 2025-11-26
author: Oryum Tech
classification: CONFIDENCIAL - USO INTERNO
---

# Architecture Decision Records (ADRs)

## 📋 Índice

1. [Sobre ADRs](#sobre-adrs)
2. [ADR-001: Frontend SPA sem Backend](#adr-001-frontend-spa-sem-backend)
3. [ADR-002: React Context vs Redux](#adr-002-react-context-vs-redux)
4. [ADR-003: TypeScript como Linguagem](#adr-003-typescript-como-linguagem)
5. [ADR-004: Tailwind CSS para Estilização](#adr-004-tailwind-css-para-estilização)
6. [ADR-005: Leaflet vs Google Maps](#adr-005-leaflet-vs-google-maps)
7. [ADR-006: Vite como Build Tool](#adr-006-vite-como-build-tool)
8. [ADR-007: Session Storage para Persistência](#adr-007-session-storage-para-persistência)
9. [ADR-008: Gemini como IA Principal](#adr-008-gemini-como-ia-principal)
10. [ADR-009: HMAC-SHA256 para QR Codes](#adr-009-hmac-sha256-para-qr-codes)
11. [ADR-010: Vercel para Deploy](#adr-010-vercel-para-deploy)

---

## Sobre ADRs

Architecture Decision Records (ADRs) documentam decisões arquiteturais significativas tomadas durante o desenvolvimento do projeto. Cada ADR captura o contexto, a decisão tomada, as alternativas consideradas e as consequências.

### Template

```markdown
## ADR-XXX: Título

**Data**: YYYY-MM-DD
**Status**: Proposto | Aceito | Descontinuado | Substituído por ADR-XXX

### Contexto
[Descreva o problema ou necessidade]

### Decisão
[Descreva a decisão tomada]

### Alternativas Consideradas
[Liste as alternativas avaliadas]

### Consequências
[Descreva os impactos positivos e negativos]
```

---

## ADR-001: Frontend SPA sem Backend

**Data**: 2025-01-15
**Status**: Aceito

### Contexto

O projeto Visite Caçapava precisa ser desenvolvido como MVP (Minimum Viable Product) com recursos limitados de tempo e orçamento. A equipe precisa decidir entre implementar uma arquitetura completa com backend ou focar inicialmente apenas no frontend.

### Decisão

Desenvolver o projeto como uma Single Page Application (SPA) pura em React, sem backend dedicado, utilizando mock services e Session Storage para persistência temporária.

### Alternativas Consideradas

| Alternativa | Prós | Contras |
|-------------|------|---------|
| **Full-stack (Node.js + DB)** | Persistência real, escalável | Mais tempo, mais custo |
| **BaaS (Firebase)** | Rápido setup, escalável | Vendor lock-in, custos variáveis |
| **SPA com mock** ✅ | Rápido, zero custo, foco em UX | Sem persistência real |

### Consequências

**Positivas:**
- ✅ Desenvolvimento acelerado
- ✅ Zero custos de infraestrutura
- ✅ Deploy simplificado (static hosting)
- ✅ Foco total em experiência do usuário

**Negativas:**
- ❌ Dados não persistem entre sessões
- ❌ Não escalável para produção real
- ❌ Sem autenticação segura real
- ❌ Requer retrabalho para versão de produção

### Revisão

Esta decisão será revisada quando o MVP for validado e houver necessidade de persistência real.

---

## ADR-002: React Context vs Redux

**Data**: 2025-01-18
**Status**: Aceito

### Contexto

O aplicativo necessita de gerenciamento de estado global para autenticação e gamificação. É necessário escolher entre Context API nativo do React ou uma biblioteca de estado como Redux.

### Decisão

Utilizar React Context API para gerenciamento de estado global, criando dois contextos principais: AuthContext e GamificationContext.

### Alternativas Consideradas

| Alternativa | Prós | Contras |
|-------------|------|---------|
| **Redux** | Previsível, DevTools poderosas | Boilerplate, curva de aprendizado |
| **Zustand** | Simples, leve | Dependência adicional |
| **MobX** | Reativo, menos boilerplate | Paradigma diferente |
| **Context API** ✅ | Nativo, sem dependências | Pode causar re-renders |

### Consequências

**Positivas:**
- ✅ Nenhuma dependência adicional
- ✅ Integração natural com React
- ✅ Código mais simples
- ✅ Fácil de entender

**Negativas:**
- ❌ Pode causar re-renders desnecessários
- ❌ DevTools menos poderosas que Redux
- ❌ Escalabilidade limitada para estados complexos

### Mitigação

Dividir contextos por domínio (Auth, Gamification) para limitar re-renders e usar `useMemo` quando necessário.

---

## ADR-003: TypeScript como Linguagem

**Data**: 2025-01-10
**Status**: Aceito

### Contexto

Escolher entre JavaScript puro ou TypeScript para o desenvolvimento do frontend.

### Decisão

Utilizar TypeScript como linguagem principal do projeto.

### Alternativas Consideradas

| Alternativa | Prós | Contras |
|-------------|------|---------|
| **JavaScript** | Sem configuração, mais rápido início | Sem tipos, mais erros em runtime |
| **TypeScript** ✅ | Tipos, melhor tooling, menos bugs | Configuração, curva de aprendizado |
| **Flow** | Tipagem gradual | Menos popular, tooling inferior |

### Consequências

**Positivas:**
- ✅ Detecção de erros em tempo de compilação
- ✅ IntelliSense e autocomplete superiores
- ✅ Refatoração mais segura
- ✅ Documentação inline via tipos
- ✅ Melhor experiência de desenvolvimento

**Negativas:**
- ❌ Configuração inicial necessária
- ❌ Build step adicional
- ❌ Curva de aprendizado para tipos complexos

---

## ADR-004: Tailwind CSS para Estilização

**Data**: 2025-01-12
**Status**: Aceito

### Contexto

Escolher abordagem de estilização para o frontend: CSS tradicional, CSS-in-JS, ou utility-first CSS.

### Decisão

Utilizar Tailwind CSS como framework de estilização principal.

### Alternativas Consideradas

| Alternativa | Prós | Contras |
|-------------|------|---------|
| **CSS Modules** | Escopo local, familiar | Verboso, arquivos separados |
| **Styled Components** | CSS-in-JS, dinâmico | Runtime overhead, bundle maior |
| **Sass/SCSS** | Variáveis, mixins | Setup adicional, arquivos grandes |
| **Tailwind CSS** ✅ | Rápido, consistente, purge | Classes longas, curva de aprendizado |

### Consequências

**Positivas:**
- ✅ Desenvolvimento rápido com utilities
- ✅ Bundle CSS otimizado (PurgeCSS)
- ✅ Consistência de design system
- ✅ Responsividade fácil
- ✅ Customização via config

**Negativas:**
- ❌ Classes podem ficar longas no JSX
- ❌ Curva de aprendizado inicial
- ❌ Difícil extração para design tokens

### Mitigação

Usar `@apply` para componentes repetitivos e criar componentes React para abstrair classes complexas.

---

## ADR-005: Leaflet vs Google Maps

**Data**: 2025-01-20
**Status**: Aceito

### Contexto

O aplicativo necessita de mapas interativos para exibir pontos turísticos. Escolher entre bibliotecas de mapas disponíveis.

### Decisão

Utilizar Leaflet como biblioteca principal de mapas, com OpenStreetMap como provider de tiles.

### Alternativas Consideradas

| Alternativa | Prós | Contras |
|-------------|------|---------|
| **Google Maps** | Feature-rich, familiar | Custos, API key obrigatória |
| **Mapbox** | Bonito, customizável | Custos após limite gratuito |
| **Leaflet + OSM** ✅ | Gratuito, open source | Menos features que Google |
| **Here Maps** | Enterprise-ready | Menos popular |

### Consequências

**Positivas:**
- ✅ Zero custos de API
- ✅ Open source e extensível
- ✅ Leve e performático
- ✅ Grande comunidade
- ✅ Privacidade (não depende do Google)

**Negativas:**
- ❌ Menos features que Google Maps
- ❌ Street View não disponível
- ❌ Tiles podem ter menor qualidade em áreas remotas

### Notas

Google Maps pode ser usado como complemento para features específicas como Street View, quando necessário.

---

## ADR-006: Vite como Build Tool

**Data**: 2025-01-11
**Status**: Aceito

### Contexto

Escolher uma ferramenta de build para desenvolvimento e produção do projeto React.

### Decisão

Utilizar Vite como build tool e dev server.

### Alternativas Consideradas

| Alternativa | Prós | Contras |
|-------------|------|---------|
| **Create React App** | Popular, zero config | Lento, ejection problemático |
| **Next.js** | SSR, rotas automáticas | Overhead para SPA puro |
| **Webpack** | Flexível, maduro | Configuração complexa |
| **Vite** ✅ | Rápido, ESM nativo, simples | Relativamente novo |

### Consequências

**Positivas:**
- ✅ HMR instantâneo (< 50ms)
- ✅ Build de produção rápido com Rollup
- ✅ Suporte nativo a TypeScript
- ✅ Configuração mínima
- ✅ Plugins bem documentados

**Negativas:**
- ❌ Ecossistema menor que Webpack
- ❌ Alguns plugins não compatíveis
- ❌ Comportamento diferente entre dev e prod (ESM vs bundle)

---

## ADR-007: Session Storage para Persistência

**Data**: 2025-01-22
**Status**: Aceito

### Contexto

Como MVP sem backend, precisamos de uma forma de persistir dados durante a sessão do usuário.

### Decisão

Utilizar Session Storage do navegador para persistência de dados mock.

### Alternativas Consideradas

| Alternativa | Prós | Contras |
|-------------|------|---------|
| **Local Storage** | Persiste entre sessões | Dados obsoletos acumulam |
| **Session Storage** ✅ | Limpo ao fechar | Dados perdidos na sessão |
| **IndexedDB** | Mais capacidade | Complexidade desnecessária |
| **Apenas memória** | Mais simples | Perde ao navegar/recarregar |

### Consequências

**Positivas:**
- ✅ Reset automático (comportamento demo desejado)
- ✅ Isolamento por aba
- ✅ API simples (getItem/setItem)
- ✅ Não acumula dados obsoletos

**Negativas:**
- ❌ Dados perdidos ao fechar navegador
- ❌ Limite de ~5MB
- ❌ Síncrono (pode bloquear UI)

---

## ADR-008: Gemini como IA Principal

**Data**: 2025-02-01
**Status**: Aceito

### Contexto

Implementar assistente virtual com IA para ajudar turistas. Escolher provedor de API de IA.

### Decisão

Utilizar Google Gemini como IA principal, com OpenAI GPT-3.5 como fallback.

### Alternativas Consideradas

| Alternativa | Prós | Contras |
|-------------|------|---------|
| **OpenAI GPT-4** | Mais capaz | Mais caro |
| **OpenAI GPT-3.5** | Equilibrado | Rate limits |
| **Google Gemini** ✅ | Rápido, free tier generoso | Mais novo |
| **Anthropic Claude** | Seguro, longo contexto | Menos acessível |

### Consequências

**Positivas:**
- ✅ Tier gratuito generoso do Gemini
- ✅ Baixa latência
- ✅ Fallback garante disponibilidade
- ✅ Flexibilidade para trocar modelos

**Negativas:**
- ❌ Duas integrações para manter
- ❌ Respostas podem variar entre provedores
- ❌ Dependência de serviços externos

---

## ADR-009: HMAC-SHA256 para QR Codes

**Data**: 2025-02-10
**Status**: Aceito

### Contexto

Sistema de check-in por QR code precisa de validação para prevenir fraudes.

### Decisão

Implementar assinatura HMAC-SHA256 nos QR codes com validação de timestamp e localização.

### Alternativas Consideradas

| Alternativa | Prós | Contras |
|-------------|------|---------|
| **Sem validação** | Simples | Vulnerável a fraude |
| **Hash simples** | Fácil implementar | Previsível |
| **HMAC-SHA256** ✅ | Seguro, padrão | Requer secret |
| **JWT** | Padrão estabelecido | Overhead para QR |

### Consequências

**Positivas:**
- ✅ Proteção contra QR codes forjados
- ✅ Validação de timestamp (24h)
- ✅ Validação de localização (75m)
- ✅ Padrão criptográfico reconhecido

**Negativas:**
- ❌ Secret key precisa ser protegida
- ❌ Complexidade adicional
- ❌ QR codes maiores

---

## ADR-010: Vercel para Deploy

**Data**: 2025-01-25
**Status**: Aceito

### Contexto

Escolher plataforma para hosting e deploy do frontend.

### Decisão

Utilizar Vercel para deploy e hosting da aplicação.

### Alternativas Consideradas

| Alternativa | Prós | Contras |
|-------------|------|---------|
| **GitHub Pages** | Gratuito, simples | Sem CI/CD integrado |
| **Netlify** | Similar ao Vercel | Edge functions mais limitadas |
| **Vercel** ✅ | Otimizado para React, preview deploys | Vendor lock-in |
| **AWS S3 + CloudFront** | Escalável, customizável | Configuração complexa |

### Consequências

**Positivas:**
- ✅ Deploy automático via GitHub
- ✅ Preview deployments para PRs
- ✅ SSL automático
- ✅ CDN global
- ✅ Gratuito para projetos pequenos

**Negativas:**
- ❌ Vendor lock-in potencial
- ❌ Limites no tier gratuito
- ❌ Menos controle que self-hosting

---

## Registro de Mudanças

| Data | ADR | Mudança |
|------|-----|---------|
| 2025-11-26 | Todos | Documentação inicial criada |

---

```
© 2025 Oryum Tech. Todos os direitos reservados.
Este documento é propriedade exclusiva da Oryum Tech.
Proibida a reprodução, distribuição ou uso sem autorização expressa.
```
