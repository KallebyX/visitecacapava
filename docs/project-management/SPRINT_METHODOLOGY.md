---
title: Metodologia de Sprints
version: 1.0.0
last_updated: 2025-11-26
author: Oryum Tech
classification: CONFIDENCIAL - USO INTERNO
---

# Metodologia de Sprints

## Framework Adotado

O Visite Caçapava utiliza **Scrum adaptado** para equipes pequenas, com sprints de 2 semanas.

## Estrutura do Sprint

### Timeline

```
Semana 1:
├── Segunda: Sprint Planning (2h)
├── Terça-Quinta: Desenvolvimento
└── Sexta: Review interno

Semana 2:
├── Segunda-Quarta: Desenvolvimento
├── Quinta: Code freeze + QA
└── Sexta: Sprint Review + Retrospectiva
```

### Cerimônias

| Cerimônia | Duração | Participantes | Objetivo |
|-----------|---------|---------------|----------|
| Sprint Planning | 2h | Todo time | Definir escopo do sprint |
| Daily Standup | 15min | Dev team | Sincronização diária |
| Sprint Review | 1h | Time + Stakeholders | Demonstrar entregas |
| Retrospectiva | 1h | Todo time | Melhoria contínua |

## Artefatos

### Product Backlog

Mantido pelo Product Owner com itens priorizados:

```markdown
## Formato de User Story

**Como** [persona]
**Quero** [funcionalidade]
**Para** [benefício]

### Critérios de Aceite
- [ ] Critério 1
- [ ] Critério 2

### Definição de Pronto
- [ ] Código revisado
- [ ] Testes passando
- [ ] Documentação atualizada
```

### Sprint Backlog

Itens selecionados para o sprint atual:

| ID | User Story | Pontos | Responsável | Status |
|----|------------|--------|-------------|--------|
| US-001 | Check-in QR Code | 8 | Dev 1 | Done |
| US-002 | Sistema de badges | 5 | Dev 2 | In Progress |

### Increment

Produto potencialmente entregável ao final de cada sprint.

## Estimativas

### Story Points (Fibonacci)

| Pontos | Complexidade | Exemplo |
|--------|--------------|---------|
| 1 | Trivial | Correção de typo |
| 2 | Simples | Ajuste de estilo |
| 3 | Pequeno | Novo componente simples |
| 5 | Médio | Feature com integração |
| 8 | Grande | Sistema completo |
| 13 | Muito grande | Considerar quebrar |

### Velocidade do Time

- Sprint médio: 25-30 pontos
- Capacidade ajustada por férias/feriados

## Definition of Done (DoD)

### Para User Stories

- [ ] Código implementado e funcionando
- [ ] Testes unitários escritos (>80% cobertura)
- [ ] Code review aprovado
- [ ] Sem erros de lint
- [ ] Documentação atualizada (se aplicável)
- [ ] Deploy em staging verificado
- [ ] QA aprovado

### Para Sprints

- [ ] Todas as stories "Done" atendem DoD
- [ ] Build de produção criado
- [ ] Release notes documentadas
- [ ] Stakeholders notificados

## Boards e Tracking

### Colunas do Kanban

```
┌─────────────┬─────────────┬─────────────┬─────────────┬─────────────┐
│   Backlog   │  To Do      │ In Progress │  Review     │    Done     │
├─────────────┼─────────────┼─────────────┼─────────────┼─────────────┤
│ Priorizado  │ Sprint      │ Máx 2 por   │ Code review │ Critérios   │
│ pelo PO     │ atual       │ pessoa      │ + QA        │ atendidos   │
└─────────────┴─────────────┴─────────────┴─────────────┴─────────────┘
```

### Labels

| Label | Cor | Uso |
|-------|-----|-----|
| `bug` | Vermelho | Correção de erro |
| `feature` | Verde | Nova funcionalidade |
| `enhancement` | Azul | Melhoria |
| `documentation` | Amarelo | Documentação |
| `priority: high` | Laranja | Urgente |

## Métricas

### Sprint Metrics

| Métrica | Objetivo | Como Medir |
|---------|----------|------------|
| Velocidade | Consistente | Média últimos 3 sprints |
| Burndown | Linear | Gráfico diário |
| Scope creep | < 10% | Items adicionados/removidos |
| Bug escape | < 5% | Bugs encontrados pós-deploy |

### Burndown Chart

```
Pontos
  30 │ ●
     │   ●
  20 │     ●  ○
     │       ●  ○
  10 │         ●  ○
     │           ●  ○
   0 │─────────────●──○
     └─────────────────────
       D1 D2 D3 D4 D5 ... D10

● Ideal   ○ Real
```

## Comunicação

### Canais

| Canal | Uso |
|-------|-----|
| Slack #dev | Comunicação diária |
| Slack #alerts | Notificações automáticas |
| Email | Comunicação formal |
| Meet | Cerimônias e pareamentos |

### Templates

#### Daily Standup

```markdown
**Ontem:**
- [O que completei]

**Hoje:**
- [O que vou fazer]

**Bloqueios:**
- [Impedimentos, se houver]
```

#### Sprint Review

```markdown
## Sprint [N] Review

### Entregas
- Feature X: [demo link]
- Bug fix Y: [descrição]

### Métricas
- Velocidade: X pontos
- Bugs encontrados: N
- Cobertura de testes: X%

### Próximos passos
- [Itens para próximo sprint]
```

---

```
© 2025 Oryum Tech. Todos os direitos reservados.
```
