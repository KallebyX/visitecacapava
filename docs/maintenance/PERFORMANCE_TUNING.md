---
title: Tuning de Performance
version: 1.0.0
last_updated: 2025-11-26
author: Oryum Tech
classification: CONFIDENCIAL - USO INTERNO
---

# Tuning de Performance

## Métricas Alvo

### Core Web Vitals

| Métrica | Alvo | Atual | Status |
|---------|------|-------|--------|
| LCP (Largest Contentful Paint) | < 2.5s | ~2.1s | ✅ Bom |
| FID (First Input Delay) | < 100ms | ~45ms | ✅ Bom |
| CLS (Cumulative Layout Shift) | < 0.1 | ~0.05 | ✅ Bom |
| TTFB (Time to First Byte) | < 200ms | ~150ms | ✅ Bom |

### Métricas Adicionais

| Métrica | Alvo | Descrição |
|---------|------|-----------|
| Bundle size | < 500KB | JavaScript total gzipped |
| Time to Interactive | < 3.5s | Página utilizável |
| First Contentful Paint | < 1.5s | Primeiro conteúdo visível |

## Otimizações Implementadas

### 1. Code Splitting

```typescript
// Lazy loading de rotas
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));
const HotelDashboard = lazy(() => import('./pages/HotelDashboard'));
const RestaurantDashboard = lazy(() => import('./pages/RestaurantDashboard'));

// Uso com Suspense
<Suspense fallback={<LoadingSpinner />}>
  <Routes>
    <Route path="/admin/*" element={<AdminDashboard />} />
  </Routes>
</Suspense>
```

### 2. Otimização de Imagens

```typescript
// Lazy loading de imagens
<img
  src={poi.imageUrl}
  loading="lazy"
  decoding="async"
  alt={poi.name}
/>

// Formato WebP com fallback
<picture>
  <source srcSet="image.webp" type="image/webp" />
  <source srcSet="image.jpg" type="image/jpeg" />
  <img src="image.jpg" alt="Descrição" />
</picture>
```

### 3. Memoização

```typescript
// React.memo para componentes puros
const POICard = memo(({ poi, onSelect }: POICardProps) => {
  return (/* ... */);
});

// useMemo para cálculos pesados
const sortedLeaderboard = useMemo(() => {
  return [...users].sort((a, b) => b.totalPoints - a.totalPoints);
}, [users]);

// useCallback para handlers
const handleCheckIn = useCallback((poiId: string) => {
  // lógica de check-in
}, [userId]);
```

### 4. Virtualização de Listas

```typescript
// Para listas grandes (quando implementado)
import { FixedSizeList as List } from 'react-window';

const LeaderboardVirtual = ({ users }) => (
  <List
    height={400}
    itemCount={users.length}
    itemSize={60}
    width="100%"
  >
    {({ index, style }) => (
      <div style={style}>
        <UserRow user={users[index]} />
      </div>
    )}
  </List>
);
```

### 5. Caching de Dados

```typescript
// Session Storage para dados frequentes
const getCachedPOIs = () => {
  const cached = sessionStorage.getItem('pois');
  if (cached) {
    const { data, timestamp } = JSON.parse(cached);
    if (Date.now() - timestamp < 5 * 60 * 1000) { // 5 min
      return data;
    }
  }
  return null;
};
```

## Configuração de Build

### Vite Config Otimizado

```typescript
// vite.config.ts
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-ui': ['lucide-react', 'recharts'],
          'vendor-maps': ['leaflet', 'react-leaflet'],
        },
      },
    },
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    sourcemap: false,
  },
});
```

### Análise de Bundle

```bash
# Analisar tamanho do bundle
npm run build -- --report

# Visualizar dependências
npx vite-bundle-visualizer
```

## Monitoramento de Performance

### Lighthouse CI

```yaml
# .github/workflows/lighthouse.yml
- name: Lighthouse CI
  uses: treosh/lighthouse-ci-action@v10
  with:
    urls: |
      https://visitecacapava.vercel.app
    budgetPath: ./lighthouse-budget.json
```

### Budget de Performance

```json
// lighthouse-budget.json
[
  {
    "path": "/*",
    "resourceSizes": [
      { "resourceType": "script", "budget": 300 },
      { "resourceType": "stylesheet", "budget": 50 },
      { "resourceType": "image", "budget": 500 },
      { "resourceType": "total", "budget": 1000 }
    ],
    "resourceCounts": [
      { "resourceType": "third-party", "budget": 10 }
    ]
  }
]
```

## Otimizações de Rede

### Prefetching

```html
<!-- Prefetch de rotas prováveis -->
<link rel="prefetch" href="/static/js/admin.chunk.js" />

<!-- Preconnect para APIs externas -->
<link rel="preconnect" href="https://generativelanguage.googleapis.com" />
<link rel="preconnect" href="https://api.openai.com" />
```

### Service Worker (Futuro)

```typescript
// sw.ts - Cache de assets estáticos
const CACHE_NAME = 'visite-cacapava-v1';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/static/js/main.js',
  '/static/css/main.css',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
    })
  );
});
```

## Checklist de Performance

### Build

- [ ] Minificação habilitada
- [ ] Tree shaking funcionando
- [ ] Code splitting configurado
- [ ] Source maps desabilitados em produção
- [ ] Console.logs removidos

### Runtime

- [ ] Lazy loading de imagens
- [ ] Memoização de componentes pesados
- [ ] Debounce em inputs de busca
- [ ] Virtualização de listas longas
- [ ] Cleanup de effects e subscriptions

### Assets

- [ ] Imagens otimizadas (WebP)
- [ ] Fontes com font-display: swap
- [ ] SVGs otimizados
- [ ] Favicon em múltiplos tamanhos

### Rede

- [ ] Gzip/Brotli habilitado
- [ ] Cache headers configurados
- [ ] CDN para assets estáticos
- [ ] Preconnect para APIs externas

## Troubleshooting

### Performance Lenta

```bash
# 1. Verificar bundle size
npm run build && ls -la dist/assets/

# 2. Analisar com Lighthouse
npx lighthouse https://visitecacapava.vercel.app --view

# 3. Verificar Network no DevTools
# - Recursos bloqueando render
# - Requisições lentas
# - Waterfall de carregamento
```

### Memory Leaks

```typescript
// Verificar cleanup de effects
useEffect(() => {
  const subscription = api.subscribe(handler);

  return () => {
    subscription.unsubscribe(); // Importante!
  };
}, []);

// Verificar listeners
useEffect(() => {
  window.addEventListener('resize', handler);

  return () => {
    window.removeEventListener('resize', handler);
  };
}, []);
```

---

```
© 2025 Oryum Tech. Todos os direitos reservados.
```
