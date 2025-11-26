---
title: Dependências do Projeto
version: 1.0.0
last_updated: 2025-11-26
author: Oryum Tech
classification: CONFIDENCIAL - USO INTERNO
---

# Dependências do Projeto

## Dependências de Produção

| Pacote | Versão | Licença | Justificativa |
|--------|--------|---------|---------------|
| `react` | ^18.2.0 | MIT | Framework UI principal |
| `react-dom` | ^18.2.0 | MIT | Renderização DOM |
| `react-router-dom` | ^6.25.1 | MIT | Roteamento client-side |
| `@google/genai` | ^1.14.0 | Apache-2.0 | Integração Google Gemini |
| `openai` | ^5.16.0 | MIT | Integração OpenAI (fallback) |
| `leaflet` | ^1.9.4 | BSD-2-Clause | Mapas interativos |
| `react-leaflet` | ^4.2.1 | MIT | Wrapper React para Leaflet |
| `chart.js` | ^4.4.2 | MIT | Gráficos e visualização |
| `react-chartjs-2` | ^5.2.0 | MIT | Wrapper React para Chart.js |
| `recharts` | ^3.1.2 | MIT | Gráficos composáveis |
| `crypto-js` | ^4.2.0 | MIT | HMAC-SHA256 para QR codes |
| `lucide-react` | ^0.540.0 | ISC | Biblioteca de ícones |
| `react-icons` | ^5.5.0 | MIT | Ícones adicionais |

## Dependências de Desenvolvimento

| Pacote | Versão | Licença | Justificativa |
|--------|--------|---------|---------------|
| `typescript` | ~5.8.2 | Apache-2.0 | Tipagem estática |
| `vite` | ^6.2.0 | MIT | Build tool e dev server |
| `tailwindcss` | ^3.4.17 | MIT | Framework CSS |
| `postcss` | ^8.5.6 | MIT | Processamento CSS |
| `autoprefixer` | ^10.4.21 | MIT | Prefixos de vendor |
| `@types/react` | ^19.1.12 | MIT | Tipos TypeScript |
| `@types/node` | ^22.14.0 | MIT | Tipos Node.js |
| `@types/leaflet` | ^1.9.20 | MIT | Tipos Leaflet |
| `@types/crypto-js` | ^4.2.2 | MIT | Tipos crypto-js |

## Análise de Licenças

Todas as dependências utilizam licenças permissivas compatíveis com software proprietário:

| Licença | Compatível | Requisitos |
|---------|------------|------------|
| MIT | ✅ Sim | Incluir copyright em distribuições |
| ISC | ✅ Sim | Similar ao MIT |
| BSD-2-Clause | ✅ Sim | Incluir copyright |
| Apache-2.0 | ✅ Sim | Incluir NOTICE se existir |

## Vulnerabilidades

```bash
# Verificar vulnerabilidades
npm audit

# Corrigir automaticamente
npm audit fix

# Relatório detalhado
npm audit --json > audit-report.json
```

## Atualização

### Verificar Atualizações

```bash
npm outdated
```

### Política de Atualização

| Tipo | Ação | Frequência |
|------|------|------------|
| Patch (x.x.X) | Atualizar | Imediato se segurança |
| Minor (x.X.0) | Avaliar changelog | Mensal |
| Major (X.0.0) | Planejamento | Quando necessário |

## Dependências Futuras (Produção)

| Pacote | Propósito |
|--------|-----------|
| `prisma` | ORM para PostgreSQL |
| `express` | Framework HTTP |
| `jsonwebtoken` | Autenticação JWT |
| `bcrypt` | Hash de senhas |
| `redis` | Cache |
| `zod` | Validação de schemas |

---

```
© 2025 Oryum Tech. Todos os direitos reservados.
```
