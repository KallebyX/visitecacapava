---
title: Biblioteca de Componentes
version: 1.0.0
last_updated: 2025-11-26
author: Oryum Tech
classification: CONFIDENCIAL - USO INTERNO
---

# Biblioteca de Componentes

## Componentes Principais

### Layouts

| Componente | Descrição | Props |
|------------|-----------|-------|
| `TouristLayout` | Layout principal do turista | children |
| `AdminLayout` | Layout do painel admin | children |
| `HotelLayout` | Layout de gestão hoteleira | children |
| `RestaurantLayout` | Layout de restaurantes | children |

### Navegação e Proteção

| Componente | Descrição | Props |
|------------|-----------|-------|
| `ProtectedRoute` | Proteção de rotas por papel | allowedRoles |
| `Header` | Cabeçalho com logo e usuário | - |
| `Footer` | Rodapé com links | - |

### Mapas

| Componente | Descrição | Props |
|------------|-----------|-------|
| `LeafletMap` | Mapa interativo principal | center, zoom, markers |
| `GameMap` | Mapa com gamificação | pois, onSelect |

### Gamificação

| Componente | Descrição | Props |
|------------|-----------|-------|
| `BadgeIcon` | Exibe um badge | badge, size |
| `LeaderboardCard` | Card de ranking | user, rank |
| `QRCodeScanner` | Scanner de QR | onScan, onError |
| `QRCodeGenerator` | Gerador de QR | poi |

### Cards e Display

| Componente | Descrição | Props |
|------------|-----------|-------|
| `NewsCard` | Card de notícias | title, description, image |
| `RouteCard` | Card de rota turística | route, onClick |
| `StatCard` | Card de estatística | title, value, icon |

### Formulários

| Componente | Descrição | Props |
|------------|-----------|-------|
| `RadioGroup` | Grupo de radio buttons | options, value, onChange |
| `ProfileEditModal` | Modal de edição de perfil | user, onSave, onClose |

### Mídia

| Componente | Descrição | Props |
|------------|-----------|-------|
| `SafeImage` | Imagem com fallback | src, fallback, alt |
| `AttractionsCarousel` | Carrossel de atrações | attractions |

---

## Uso

```tsx
import { BadgeIcon } from '@/components/BadgeIcon';
import { LeafletMap } from '@/components/LeafletMap';

function MyComponent() {
  return (
    <div>
      <BadgeIcon badge={badge} size="lg" />
      <LeafletMap
        center={[-30.5144, -53.4883]}
        zoom={13}
        markers={pois}
      />
    </div>
  );
}
```

---

```
© 2025 Oryum Tech. Todos os direitos reservados.
```
