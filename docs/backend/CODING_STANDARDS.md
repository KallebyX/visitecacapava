---
title: Padrões de Código
version: 1.0.0
last_updated: 2025-11-26
author: Oryum Tech
classification: CONFIDENCIAL - USO INTERNO
---

# Padrões de Código

## TypeScript

### Tipos

```typescript
// ✅ Usar interfaces para objetos
interface User {
  id: string;
  name: string;
}

// ✅ Usar type para unions/aliases
type UserRole = 'tourist' | 'hotel' | 'admin';

// ✅ Evitar any - usar unknown se necessário
function process(data: unknown): void {
  if (typeof data === 'string') {
    // narrowing
  }
}
```

### Componentes React

```typescript
// ✅ Componentes funcionais com tipagem
interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
}

export function Button({ label, onClick, variant = 'primary' }: ButtonProps) {
  return (
    <button
      className={`btn btn-${variant}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
}
```

### Hooks

```typescript
// ✅ Custom hooks com tipagem
function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue] as const;
}
```

## Tailwind CSS

```tsx
// ✅ Classes organizadas por categoria
<div className="
  flex items-center justify-between
  p-4 mb-2
  bg-white rounded-lg shadow-md
  hover:shadow-lg transition-shadow
">

// ✅ Extrair para componentes quando repetitivo
const cardClasses = "bg-white rounded-lg shadow-md p-4";
```

## Importações

```typescript
// ✅ Ordem de importações
// 1. React e bibliotecas externas
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// 2. Componentes internos
import { Button } from '@/components/ui/Button';

// 3. Hooks e contextos
import { useAuth } from '@/context/AuthContext';

// 4. Serviços e utilitários
import { backendService } from '@/services/backendService';

// 5. Tipos
import type { User } from '@/types';

// 6. Estilos e assets
import './styles.css';
```

## Tratamento de Erros

```typescript
// ✅ Try-catch com tipagem
try {
  const result = await apiCall();
} catch (error) {
  if (error instanceof APIError) {
    showToast(error.message);
  } else {
    console.error('Unexpected error:', error);
    showToast('Erro inesperado');
  }
}
```

---

```
© 2025 Oryum Tech. Todos os direitos reservados.
```
