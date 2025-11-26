---
title: Estrutura de Pastas
version: 1.0.0
last_updated: 2025-11-26
author: Oryum Tech
classification: CONFIDENCIAL - USO INTERNO
---

# Estrutura de Pastas do Projeto

## Estrutura Completa

```
visitecacapava/
│
├── 📁 .github/                    # Configurações GitHub
│   └── workflows/                 # GitHub Actions
│
├── 📁 components/                 # Componentes React
│   ├── 📁 admin/                  # Componentes administrativos
│   │   ├── ChartCard.tsx
│   │   ├── InfoCard.tsx
│   │   ├── PointsAdjustmentModal.tsx
│   │   ├── SecretaryDashboard.tsx
│   │   └── StatCard.tsx
│   │
│   ├── 📁 layouts/                # Layouts por papel
│   │   ├── AdminLayout.tsx
│   │   ├── HotelLayout.tsx
│   │   ├── RestaurantLayout.tsx
│   │   └── TouristLayout.tsx
│   │
│   ├── 📁 ui/                     # Componentes de UI básicos
│   │   └── RadioGroup.tsx
│   │
│   └── [Componentes compartilhados]
│       ├── AccessibilityPanel.tsx
│       ├── BadgeIcon.tsx
│       ├── Footer.tsx
│       ├── Header.tsx
│       ├── LeafletMap.tsx
│       ├── ProtectedRoute.tsx
│       ├── QRCodeGenerator.tsx
│       ├── QRCodeScanner.tsx
│       └── ...
│
├── 📁 context/                    # React Context providers
│   ├── AuthContext.tsx            # Autenticação
│   └── GamificationContext.tsx    # Gamificação
│
├── 📁 data/                       # Dados estáticos
│   ├── authentic-pois.ts          # POIs verificados
│   ├── authenticity.ts            # Validação de dados
│   └── thematicRoutes.ts          # Rotas temáticas
│
├── 📁 docs/                       # Documentação
│   └── [Estrutura completa de docs]
│
├── 📁 hooks/                      # Custom hooks
│   └── useErrorHandler.ts
│
├── 📁 pages/                      # Componentes de página
│   ├── 📁 admin/                  # Páginas de admin
│   ├── 📁 hotel/                  # Páginas de hotel
│   ├── 📁 restaurant/             # Páginas de restaurante
│   └── [Páginas de turista]
│
├── 📁 public/                     # Assets estáticos
│   └── 📁 img/
│       ├── logo/
│       ├── pontos_turisticos/
│       └── restaurantes/
│
├── 📁 services/                   # Serviços de negócio
│   ├── backendService.ts
│   ├── geminiService.ts
│   ├── openaiService.ts
│   └── googleMapsService.ts
│
├── 📁 utils/                      # Utilitários
│   ├── qrCodeSystem.ts
│   ├── checkinSystem.ts
│   ├── geolocation.ts
│   └── dataValidation.ts
│
├── 📄 App.tsx                     # Componente raiz
├── 📄 index.tsx                   # Entry point
├── 📄 index.html                  # HTML template
├── 📄 index.css                   # Estilos globais
├── 📄 types.ts                    # Definições de tipos
├── 📄 constants.ts                # Constantes e mock data
├── 📄 mapStyles.ts                # Estilos de mapa
│
├── 📄 package.json
├── 📄 tsconfig.json
├── 📄 vite.config.ts
├── 📄 tailwind.config.js
├── 📄 postcss.config.js
├── 📄 vercel.json
└── 📄 CLAUDE.md
```

## Convenções de Nomenclatura

| Tipo | Convenção | Exemplo |
|------|-----------|---------|
| Componentes | PascalCase | `UserProfile.tsx` |
| Páginas | PascalCase | `HomePage.tsx` |
| Hooks | camelCase + use | `useAuth.ts` |
| Serviços | camelCase + Service | `backendService.ts` |
| Utilitários | camelCase | `geolocation.ts` |
| Contextos | PascalCase + Context | `AuthContext.tsx` |
| Tipos | PascalCase | `User`, `PointOfInterest` |

---

```
© 2025 Oryum Tech. Todos os direitos reservados.
```
