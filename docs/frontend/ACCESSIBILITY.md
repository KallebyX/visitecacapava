---
title: Padrões de Acessibilidade
version: 1.0.0
last_updated: 2025-11-26
author: Oryum Tech
classification: CONFIDENCIAL - USO INTERNO
---

# Padrões de Acessibilidade

## Conformidade

O Visite Caçapava busca conformidade com **WCAG 2.1 Nível AA**.

## Recursos Implementados

### VLibras

Integração com o tradutor de Libras do governo:

```html
<!-- index.html -->
<div vw class="enabled">
  <div vw-access-button class="active"></div>
  <div vw-plugin-wrapper>
    <div class="vw-plugin-top-wrapper"></div>
  </div>
</div>
<script src="https://vlibras.gov.br/app/vlibras-plugin.js"></script>
<script>
  new window.VLibras.Widget('https://vlibras.gov.br/app');
</script>
```

### Navegação por Teclado

| Tecla | Ação |
|-------|------|
| `Tab` | Navegar entre elementos |
| `Enter` | Ativar elemento |
| `Escape` | Fechar modais |
| `Arrow Keys` | Navegar em menus |

### ARIA Labels

```tsx
// Exemplo de componente acessível
<button
  aria-label="Fazer check-in no Forte Dom Pedro II"
  aria-describedby="checkin-help"
  onClick={handleCheckIn}
>
  <MapPin aria-hidden="true" />
  Check-in
</button>
<span id="checkin-help" className="sr-only">
  Clique para registrar sua visita e ganhar pontos
</span>
```

## Checklist de Acessibilidade

### Perceptível

- [x] Texto alternativo em imagens
- [x] Contraste mínimo 4.5:1
- [x] Conteúdo não depende apenas de cor
- [x] Texto redimensionável até 200%
- [x] VLibras integrado

### Operável

- [x] Navegação por teclado
- [x] Sem armadilhas de teclado
- [x] Skip links (pular navegação)
- [x] Títulos de página descritivos
- [x] Foco visível

### Compreensível

- [x] Idioma da página definido (pt-BR)
- [x] Labels em formulários
- [x] Mensagens de erro claras
- [x] Instruções consistentes

### Robusto

- [x] HTML semântico
- [x] ARIA quando necessário
- [x] Compatível com leitores de tela

## Cores e Contraste

| Combinação | Ratio | Status |
|------------|-------|--------|
| brand-dark-green / brand-beige | 7.5:1 | ✅ AAA |
| brand-green / white | 4.8:1 | ✅ AA |
| brand-red / white | 5.2:1 | ✅ AA |
| gray-500 / white | 4.6:1 | ✅ AA |

## Testes de Acessibilidade

### Ferramentas

- axe DevTools (Chrome extension)
- WAVE Web Accessibility Evaluator
- Lighthouse Accessibility Audit
- NVDA/VoiceOver para testes manuais

### Comando de Teste

```bash
# Com Lighthouse CI
npx lighthouse https://visitecacapava.vercel.app --only-categories=accessibility
```

---

```
© 2025 Oryum Tech. Todos os direitos reservados.
```
