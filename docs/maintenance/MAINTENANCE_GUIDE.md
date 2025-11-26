---
title: Guia de Manutenção
version: 1.0.0
last_updated: 2025-11-26
author: Oryum Tech
classification: CONFIDENCIAL - USO INTERNO
---

# Guia de Manutenção

## Tarefas de Manutenção

### Diárias

- [ ] Verificar logs de erro na Vercel
- [ ] Monitorar uso de APIs (Gemini/OpenAI)
- [ ] Verificar disponibilidade do serviço

### Semanais

- [ ] Revisar PRs pendentes
- [ ] Atualizar dependências de segurança
- [ ] Backup de configurações

### Mensais

- [ ] Atualizar dependências (npm update)
- [ ] Revisar limites de API
- [ ] Analisar métricas de uso
- [ ] Atualizar documentação

---

## Atualização de Dependências

```bash
# Verificar atualizações disponíveis
npm outdated

# Atualizar dependências patch/minor
npm update

# Atualizar major (com cuidado)
npm install package@latest

# Verificar vulnerabilidades
npm audit

# Corrigir vulnerabilidades
npm audit fix
```

---

## Monitoramento

### Vercel Analytics

- Acesse: Project → Analytics
- Métricas: Page Views, Visitors, Performance

### Logs

```bash
# Via CLI
vercel logs [deployment-url]

# Ou no Dashboard
Project → Deployments → Logs
```

---

## Adicionando Novo POI

1. Editar `data/authentic-pois.ts`
2. Adicionar imagem em `public/img/pontos_turisticos/`
3. Atualizar rotas em `data/thematicRoutes.ts` (se aplicável)
4. Testar localmente
5. Commitar e fazer deploy

---

## Adicionando Novo Badge

1. Editar `constants.ts`
2. Adicionar ao array `BADGES`:

```typescript
{
  id: 'novo_badge',
  name: 'Nome do Badge',
  description: 'Descrição do critério',
  icon: 'icon-name', // Lucide icon
  criteria: (visitedIds) => {
    // Lógica de desbloqueio
    return visitedIds.has('poi-id');
  }
}
```

---

## Rotação de API Keys

1. Gerar nova key no provedor
2. Atualizar em Vercel Settings → Environment Variables
3. Redeploy
4. Revogar key antiga

---

```
© 2025 Oryum Tech. Todos os direitos reservados.
```
