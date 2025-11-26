---
title: Resolução de Problemas
version: 1.0.0
last_updated: 2025-11-26
author: Oryum Tech
classification: CONFIDENCIAL - USO INTERNO
---

# Resolução de Problemas

## Problemas Comuns

### Build Falhou

**Sintoma**: Deploy falha com erro de build

**Causas comuns**:
- Erro de TypeScript
- Dependência faltando
- Variável de ambiente não configurada

**Solução**:
```bash
# Testar build localmente
npm run build

# Verificar erros de TypeScript
npx tsc --noEmit

# Verificar dependências
rm -rf node_modules && npm install
```

---

### Página em Branco

**Sintoma**: App carrega mas mostra tela branca

**Causas comuns**:
- Erro de JavaScript não capturado
- Falha ao carregar dados iniciais

**Solução**:
1. Abrir DevTools (F12)
2. Verificar aba Console para erros
3. Verificar aba Network para falhas
4. Limpar Session Storage e recarregar

---

### Login Não Funciona

**Sintoma**: Credenciais corretas mas login falha

**Causas comuns**:
- Session Storage corrompido
- Dados mock não inicializados

**Solução**:
```javascript
// No console do navegador
sessionStorage.clear();
location.reload();
```

---

### Mapa Não Carrega

**Sintoma**: Área do mapa fica cinza

**Causas comuns**:
- Leaflet CSS não carregado
- Container sem altura definida

**Solução**:
- Verificar import do CSS do Leaflet
- Garantir altura fixa no container do mapa

---

### IA Não Responde

**Sintoma**: Chat de IA não retorna respostas

**Causas comuns**:
- API key inválida ou expirada
- Rate limit excedido
- Erro de rede

**Solução**:
1. Verificar console para erros
2. Verificar validade das API keys
3. Verificar limites de uso nas dashboards dos provedores

---

### Check-in Falha

**Sintoma**: "Fora do raio" mesmo estando no local

**Causas comuns**:
- GPS impreciso
- Coordenadas do POI incorretas

**Solução**:
- Verificar coordenadas do POI em `data/authentic-pois.ts`
- Testar com GPS mais preciso (área aberta)
- Aumentar raio de check-in temporariamente para teste

---

## Contato de Suporte

Para problemas não listados:

- **Email**: suporte@oryumtech.com.br
- **Slack**: #visite-cacapava-dev

---

```
© 2025 Oryum Tech. Todos os direitos reservados.
```
