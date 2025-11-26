---
title: Referências Técnicas
version: 1.0.0
last_updated: 2025-11-26
author: Oryum Tech
classification: CONFIDENCIAL - USO INTERNO
---

# Referências Técnicas

## Padrões e Normas

### Documentação

| Padrão | Descrição | Aplicação |
|--------|-----------|-----------|
| ISO/IEC 26514:2022 | Documentação técnica de software | Estrutura geral |
| IEEE 1016-2009 | Design de software | Documentos de arquitetura |
| ISO/IEC 25010:2011 | Qualidade de produto de software | Métricas de qualidade |

### Segurança

| Padrão | Descrição | Aplicação |
|--------|-----------|-----------|
| OWASP Top 10 | Principais vulnerabilidades web | Segurança da aplicação |
| LGPD (Lei 13.709/2018) | Proteção de dados pessoais | Privacidade e compliance |
| ISO 27001 | Gestão de segurança da informação | Referência de boas práticas |

### Acessibilidade

| Padrão | Descrição | Aplicação |
|--------|-----------|-----------|
| WCAG 2.1 AA | Diretrizes de acessibilidade | Interface do usuário |
| eMAG 3.1 | Modelo brasileiro de acessibilidade | Conformidade gov.br |

## Documentação Oficial

### React & Ecosystem

| Recurso | URL | Uso |
|---------|-----|-----|
| React Documentation | https://react.dev | Framework principal |
| React Router | https://reactrouter.com | Roteamento SPA |
| React Hooks | https://react.dev/reference/react | State management |

### TypeScript

| Recurso | URL | Uso |
|---------|-----|-----|
| TypeScript Handbook | https://typescriptlang.org/docs | Tipagem estática |
| TSConfig Reference | https://typescriptlang.org/tsconfig | Configuração |

### Build Tools

| Recurso | URL | Uso |
|---------|-----|-----|
| Vite Documentation | https://vite.dev | Build tool |
| Rollup | https://rollupjs.org | Bundling |
| esbuild | https://esbuild.github.io | Transpilação |

### Styling

| Recurso | URL | Uso |
|---------|-----|-----|
| Tailwind CSS | https://tailwindcss.com/docs | Framework CSS |
| PostCSS | https://postcss.org | Processamento CSS |

### APIs de IA

| Recurso | URL | Uso |
|---------|-----|-----|
| Google AI Studio | https://ai.google.dev | Gemini API |
| OpenAI API Docs | https://platform.openai.com/docs | Fallback AI |

### Mapas

| Recurso | URL | Uso |
|---------|-----|-----|
| Leaflet | https://leafletjs.com/reference | Biblioteca de mapas |
| React Leaflet | https://react-leaflet.js.org | Wrapper React |
| OpenStreetMap | https://wiki.openstreetmap.org | Tiles de mapa |

### Infraestrutura

| Recurso | URL | Uso |
|---------|-----|-----|
| Vercel Docs | https://vercel.com/docs | Hospedagem |
| GitHub Actions | https://docs.github.com/actions | CI/CD |

## Bibliotecas Utilizadas

### Core

```
react@18.2.0
├── Licença: MIT
├── Docs: https://react.dev
└── Uso: Framework UI

react-dom@18.2.0
├── Licença: MIT
├── Docs: https://react.dev/reference/react-dom
└── Uso: Renderização DOM

react-router-dom@7.5.0
├── Licença: MIT
├── Docs: https://reactrouter.com
└── Uso: Roteamento
```

### Utilitários

```
crypto-js@4.2.0
├── Licença: MIT
├── Docs: https://cryptojs.gitbook.io
└── Uso: Criptografia (HMAC-SHA256)

date-fns@4.1.0
├── Licença: MIT
├── Docs: https://date-fns.org
└── Uso: Manipulação de datas

uuid@11.1.0
├── Licença: MIT
├── Docs: https://github.com/uuidjs/uuid
└── Uso: Geração de IDs únicos
```

### UI

```
lucide-react@0.487.0
├── Licença: ISC
├── Docs: https://lucide.dev
└── Uso: Ícones

recharts@2.15.0
├── Licença: MIT
├── Docs: https://recharts.org
└── Uso: Gráficos

chart.js@4.4.7
├── Licença: MIT
├── Docs: https://chartjs.org
└── Uso: Gráficos (admin)
```

### Mapas

```
leaflet@1.9.4
├── Licença: BSD-2-Clause
├── Docs: https://leafletjs.com
└── Uso: Mapas interativos

react-leaflet@5.0.0
├── Licença: Hippocratic-2.1
├── Docs: https://react-leaflet.js.org
└── Uso: Wrapper React para Leaflet
```

## Artigos e Tutoriais

### Arquitetura

| Título | Fonte | Relevância |
|--------|-------|------------|
| React Architecture Best Practices | React Blog | Estrutura de componentes |
| Feature-Sliced Design | FSD Docs | Organização de código |
| Clean Architecture in Frontend | Various | Separação de concerns |

### Performance

| Título | Fonte | Relevância |
|--------|-------|------------|
| Web Vitals | web.dev | Métricas de performance |
| React Performance Optimization | React Docs | Otimização de renders |
| Code Splitting in React | Vite Docs | Lazy loading |

### Segurança

| Título | Fonte | Relevância |
|--------|-------|------------|
| OWASP Cheat Sheet Series | OWASP | Práticas de segurança |
| React Security Best Practices | Snyk | Segurança em React |

## Ferramentas de Desenvolvimento

### IDEs e Editores

| Ferramenta | Uso | Configuração |
|------------|-----|--------------|
| VS Code | Editor principal | .vscode/settings.json |
| WebStorm | Alternativa | Configuração padrão |

### Extensões Recomendadas (VS Code)

```json
{
  "recommendations": [
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "bradlc.vscode-tailwindcss",
    "dsznajder.es7-react-js-snippets",
    "formulahendry.auto-rename-tag"
  ]
}
```

### DevTools

| Ferramenta | Uso |
|------------|-----|
| React DevTools | Debug de componentes |
| Redux DevTools | Debug de estado (se usar Redux) |
| Lighthouse | Auditoria de performance |
| axe DevTools | Auditoria de acessibilidade |

## Recursos Adicionais

### Comunidades

| Comunidade | URL | Uso |
|------------|-----|-----|
| React Discord | discord.gg/reactiflux | Suporte da comunidade |
| Stack Overflow | stackoverflow.com/questions/tagged/reactjs | Q&A |
| GitHub Discussions | github.com/facebook/react/discussions | Discussões oficiais |

### Newsletters

| Newsletter | URL | Conteúdo |
|------------|-----|----------|
| React Status | react.statuscode.com | Notícias semanais |
| JavaScript Weekly | javascriptweekly.com | JS ecosystem |
| Frontend Focus | frontendfoc.us | Frontend em geral |

### Cursos e Certificações

| Recurso | Plataforma | Relevância |
|---------|------------|------------|
| React - The Complete Guide | Udemy | Fundamentos avançados |
| TypeScript Deep Dive | GitBook | TypeScript avançado |
| Testing React Apps | Testing Library | Testes |

## Changelog de Referências

| Data | Alteração |
|------|-----------|
| 2025-11-26 | Documento criado com referências iniciais |

---

```
© 2025 Oryum Tech. Todos os direitos reservados.
```
