---
title: Estratégia de Testes
version: 1.0.0
last_updated: 2025-11-26
author: Oryum Tech
classification: CONFIDENCIAL - USO INTERNO
---

# Estratégia de Testes

## Visão Geral

> **Nota**: O MVP atual não possui suite de testes implementada. Esta documentação descreve a estratégia recomendada para implementação.

## Pirâmide de Testes

```
        /\
       /  \
      / E2E\        5%  - Testes End-to-End
     /------\
    /Integra-\     15%  - Testes de Integração
   /   ção    \
  /------------\
 /  Unitários   \   80%  - Testes Unitários
/________________\
```

## Ferramentas Recomendadas

| Tipo | Ferramenta | Uso |
|------|------------|-----|
| Unit | Vitest | Funções e componentes |
| Components | React Testing Library | Renderização e interação |
| E2E | Playwright | Fluxos completos |
| Coverage | Istanbul/c8 | Métricas de cobertura |

## Estrutura de Testes

```
src/
├── components/
│   └── BadgeIcon/
│       ├── BadgeIcon.tsx
│       └── BadgeIcon.test.tsx
├── services/
│   └── backendService.test.ts
├── utils/
│   ├── geolocation.test.ts
│   └── qrCodeSystem.test.ts
└── __tests__/
    ├── e2e/
    │   └── checkin.spec.ts
    └── integration/
        └── gamification.test.ts
```

## Exemplos de Testes

### Teste Unitário

```typescript
// utils/geolocation.test.ts
import { describe, it, expect } from 'vitest';
import { calculateDistance, withinCheckinRadius } from './geolocation';

describe('geolocation', () => {
  describe('calculateDistance', () => {
    it('should calculate distance between two points', () => {
      const coord1 = { lat: -30.5144, lng: -53.4883 };
      const coord2 = { lat: -30.5145, lng: -53.4884 };

      const distance = calculateDistance(coord1, coord2);

      expect(distance).toBeLessThan(20); // metros
    });
  });

  describe('withinCheckinRadius', () => {
    it('should return true when within 75m', () => {
      const userPos = { lat: -30.5144, lng: -53.4883 };
      const poiPos = { lat: -30.5144, lng: -53.4884 };

      expect(withinCheckinRadius(userPos, poiPos)).toBe(true);
    });

    it('should return false when outside radius', () => {
      const userPos = { lat: -30.5144, lng: -53.4883 };
      const poiPos = { lat: -30.52, lng: -53.49 };

      expect(withinCheckinRadius(userPos, poiPos)).toBe(false);
    });
  });
});
```

### Teste de Componente

```typescript
// components/BadgeIcon.test.tsx
import { render, screen } from '@testing-library/react';
import { BadgeIcon } from './BadgeIcon';

describe('BadgeIcon', () => {
  const mockBadge = {
    id: 'pioneiro',
    name: 'Pioneiro',
    description: 'Primeiro check-in',
    icon: 'flag'
  };

  it('renders badge name', () => {
    render(<BadgeIcon badge={mockBadge} />);
    expect(screen.getByText('Pioneiro')).toBeInTheDocument();
  });

  it('shows tooltip on hover', async () => {
    render(<BadgeIcon badge={mockBadge} />);
    // ... test tooltip
  });
});
```

### Teste E2E

```typescript
// __tests__/e2e/checkin.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Check-in Flow', () => {
  test('should complete check-in successfully', async ({ page }) => {
    // Login
    await page.goto('/login');
    await page.fill('[name="email"]', 'turista@email.com');
    await page.fill('[name="password"]', 'senha123');
    await page.click('button[type="submit"]');

    // Navigate to map
    await page.click('[data-testid="nav-map"]');

    // Click on POI
    await page.click('[data-testid="poi-marker-forte"]');

    // Perform check-in
    await page.click('[data-testid="btn-checkin"]');

    // Verify success
    await expect(page.locator('.toast-success')).toBeVisible();
  });
});
```

## Cobertura Mínima

| Métrica | Mínimo | Ideal |
|---------|--------|-------|
| Statements | 70% | 85% |
| Branches | 60% | 80% |
| Functions | 70% | 85% |
| Lines | 70% | 85% |

## Comandos

```bash
# Executar todos os testes
npm test

# Com cobertura
npm run test:coverage

# Watch mode
npm run test:watch

# E2E
npm run test:e2e
```

---

```
© 2025 Oryum Tech. Todos os direitos reservados.
```
