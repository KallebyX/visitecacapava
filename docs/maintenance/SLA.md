---
title: Acordo de Nível de Serviço (SLA)
version: 1.0.0
last_updated: 2025-11-26
author: Oryum Tech
classification: CONFIDENCIAL - USO INTERNO
---

# Acordo de Nível de Serviço (SLA)

## Escopo

Este SLA define os níveis de serviço para a plataforma Visite Caçapava, operada pela Oryum Tech para a Secretaria de Turismo de Caçapava do Sul.

## Definições

| Termo | Definição |
|-------|-----------|
| **Disponibilidade** | Percentual de tempo que o serviço está operacional |
| **Downtime** | Período em que o serviço está indisponível |
| **Incident** | Evento que causa degradação ou interrupção |
| **RTO** | Recovery Time Objective - tempo máximo para restaurar |
| **RPO** | Recovery Point Objective - perda máxima de dados aceitável |

## Níveis de Serviço

### Disponibilidade

| Ambiente | SLA | Downtime Máximo/Mês |
|----------|-----|---------------------|
| Produção | 99.5% | 3.6 horas |
| Staging | 95% | 36 horas |

### Janelas de Manutenção

| Tipo | Horário | Notificação |
|------|---------|-------------|
| Planejada | Domingos 02:00-06:00 (BRT) | 72 horas antes |
| Emergencial | Qualquer | Imediata |

*Manutenções planejadas não contam como downtime para SLA.*

## Classificação de Incidentes

### Severidade

| Nível | Descrição | Exemplo |
|-------|-----------|---------|
| **P1 - Crítico** | Serviço totalmente indisponível | Site fora do ar |
| **P2 - Alto** | Funcionalidade crítica comprometida | Check-in não funciona |
| **P3 - Médio** | Funcionalidade secundária afetada | Chatbot indisponível |
| **P4 - Baixo** | Impacto mínimo, workaround disponível | Bug visual |

### Tempos de Resposta

| Severidade | Resposta Inicial | Atualização | Resolução |
|------------|------------------|-------------|-----------|
| P1 | 15 minutos | 30 minutos | 4 horas |
| P2 | 1 hora | 2 horas | 8 horas |
| P3 | 4 horas | 8 horas | 48 horas |
| P4 | 24 horas | 72 horas | 2 semanas |

## Métricas de Performance

### Objetivos

| Métrica | Objetivo | Medição |
|---------|----------|---------|
| Tempo de carregamento (LCP) | < 2.5s | p95 |
| Tempo de resposta API | < 500ms | p95 |
| Taxa de erro | < 1% | Média diária |
| Check-ins processados | 100% | Todos validados |

### Monitoramento

```yaml
Ferramentas:
  - UptimeRobot: Disponibilidade (5 min interval)
  - Vercel Analytics: Performance
  - Sentry: Erros (quando implementado)

Alertas:
  - Downtime > 1 min: Slack + Email
  - Error rate > 5%: Slack
  - Response time > 3s: Slack
```

## Suporte

### Canais

| Canal | Disponibilidade | Uso |
|-------|-----------------|-----|
| Email (suporte@oryumtech.com.br) | 24/7 | Todos os casos |
| Slack (acordado com cliente) | Horário comercial | P1/P2 |
| Telefone (emergência) | 24/7 | Apenas P1 |

### Horário de Suporte

| Nível | Segunda-Sexta | Sábado | Domingo/Feriados |
|-------|---------------|--------|------------------|
| Padrão | 09:00-18:00 (BRT) | - | - |
| Plantão (P1/P2) | 24 horas | 24 horas | 24 horas |

## Exclusões

O SLA **não se aplica** a:

1. **Manutenção planejada** notificada com antecedência
2. **Força maior** (desastres naturais, ataques, etc.)
3. **Dependências externas** fora do controle:
   - Indisponibilidade do Vercel
   - Indisponibilidade de APIs de terceiros (Google, OpenAI)
   - Problemas de conectividade do usuário
4. **Uso indevido** da plataforma
5. **Ambientes não-produção** (staging, development)

## Compensações

### Créditos de Serviço

| Disponibilidade Mensal | Crédito |
|------------------------|---------|
| 99.0% - 99.5% | 10% |
| 95.0% - 99.0% | 25% |
| < 95.0% | 50% |

*Créditos aplicados ao período de faturamento seguinte.*

### Processo de Solicitação

1. Cliente notifica via email em até 30 dias
2. Oryum Tech verifica logs e métricas
3. Resposta em até 10 dias úteis
4. Crédito aplicado se procedente

## Responsabilidades

### Oryum Tech

- Manter infraestrutura operacional
- Monitorar disponibilidade e performance
- Responder a incidentes conforme SLA
- Comunicar manutenções planejadas
- Fornecer relatórios mensais

### Cliente

- Reportar incidentes prontamente
- Fornecer informações para diagnóstico
- Manter informações de contato atualizadas
- Usar a plataforma conforme documentação

## Relatórios

### Relatório Mensal de SLA

```markdown
# Relatório de SLA - [Mês/Ano]

## Resumo
- Disponibilidade: XX.XX%
- Incidentes: N
- SLA Atingido: ✅/❌

## Métricas
| Métrica | Objetivo | Realizado |
|---------|----------|-----------|
| Uptime | 99.5% | XX.XX% |
| LCP p95 | <2.5s | X.Xs |
| Error rate | <1% | X.XX% |

## Incidentes
| Data | Severidade | Duração | Causa | Resolução |
|------|------------|---------|-------|-----------|
| ... | ... | ... | ... | ... |

## Ações de Melhoria
- [Lista de ações planejadas]
```

### Frequência

| Relatório | Frequência | Destinatário |
|-----------|------------|--------------|
| Disponibilidade | Mensal | Cliente |
| Incidentes P1/P2 | Imediato | Cliente |
| Performance | Mensal | Interno |
| Review completo | Trimestral | Cliente + Interno |

## Revisão do SLA

Este SLA será revisado:

- **Anualmente**: Revisão completa
- **A cada incidente P1**: Avaliar adequação
- **Sob solicitação**: Mediante acordo das partes

## Vigência

Este SLA entra em vigor na data de assinatura do contrato de serviço e permanece válido enquanto durar a relação contratual.

---

```
© 2025 Oryum Tech. Todos os direitos reservados.
```
