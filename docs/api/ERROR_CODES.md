---
title: Códigos de Erro
version: 1.0.0
last_updated: 2025-11-26
author: Oryum Tech
classification: CONFIDENCIAL - USO INTERNO
---

# Códigos de Erro

## 📋 Índice

1. [Estrutura de Erros](#estrutura-de-erros)
2. [Erros de Autenticação](#erros-de-autenticação)
3. [Erros de Usuário](#erros-de-usuário)
4. [Erros de POI](#erros-de-poi)
5. [Erros de Rota](#erros-de-rota)
6. [Erros de Gamificação](#erros-de-gamificação)
7. [Erros de Geolocalização](#erros-de-geolocalização)
8. [Erros de QR Code](#erros-de-qr-code)
9. [Erros de Sistema](#erros-de-sistema)
10. [Tratamento de Erros](#tratamento-de-erros)

---

## Estrutura de Erros

### Formato Padrão

```typescript
interface APIError {
  success: false;
  error: {
    code: string;       // Código único do erro
    message: string;    // Mensagem amigável em pt-BR
    details?: string;   // Detalhes técnicos (desenvolvimento)
    field?: string;     // Campo relacionado (validação)
    timestamp: string;  // ISO 8601
  };
}
```

### Exemplo

```json
{
  "success": false,
  "error": {
    "code": "AUTH_001",
    "message": "Credenciais inválidas. Verifique seu email e senha.",
    "timestamp": "2025-11-26T10:30:00.000Z"
  }
}
```

---

## Erros de Autenticação

### AUTH_001 - Credenciais Inválidas

**Descrição**: Email ou senha incorretos.

**Causa**: Usuário forneceu credenciais que não correspondem a nenhum registro.

**Resolução**: Verificar email e senha, ou usar "Esqueci minha senha".

```typescript
{
  code: "AUTH_001",
  message: "Credenciais inválidas. Verifique seu email e senha."
}
```

---

### AUTH_002 - Sessão Expirada

**Descrição**: Token de sessão expirou.

**Causa**: Inatividade prolongada ou token com validade vencida.

**Resolução**: Fazer login novamente.

```typescript
{
  code: "AUTH_002",
  message: "Sua sessão expirou. Por favor, faça login novamente."
}
```

---

### AUTH_003 - Acesso Negado

**Descrição**: Usuário não tem permissão para o recurso.

**Causa**: Tentativa de acesso a funcionalidade restrita ao papel do usuário.

**Resolução**: Usar conta com permissões adequadas.

```typescript
{
  code: "AUTH_003",
  message: "Você não tem permissão para acessar este recurso."
}
```

---

### AUTH_004 - Conta Bloqueada

**Descrição**: Conta temporariamente bloqueada.

**Causa**: Múltiplas tentativas de login falhas.

**Resolução**: Aguardar período de bloqueio ou contatar suporte.

```typescript
{
  code: "AUTH_004",
  message: "Conta bloqueada por múltiplas tentativas. Aguarde 15 minutos."
}
```

---

### AUTH_005 - Token Inválido

**Descrição**: Token de autenticação inválido ou malformado.

**Causa**: Token corrompido ou manipulado.

**Resolução**: Fazer logout e login novamente.

```typescript
{
  code: "AUTH_005",
  message: "Token de autenticação inválido. Faça login novamente."
}
```

---

## Erros de Usuário

### USER_001 - Usuário Não Encontrado

**Descrição**: ID de usuário não existe no sistema.

**Causa**: ID inválido ou usuário foi removido.

**Resolução**: Verificar ID ou buscar usuário por outro método.

```typescript
{
  code: "USER_001",
  message: "Usuário não encontrado."
}
```

---

### USER_002 - Email Já Existe

**Descrição**: Email já está cadastrado.

**Causa**: Tentativa de registro com email existente.

**Resolução**: Usar outro email ou recuperar acesso da conta existente.

```typescript
{
  code: "USER_002",
  message: "Este email já está cadastrado. Faça login ou recupere sua senha.",
  field: "email"
}
```

---

### USER_003 - Dados Inválidos

**Descrição**: Dados do usuário não passaram na validação.

**Causa**: Campos obrigatórios faltando ou formato incorreto.

**Resolução**: Corrigir dados conforme validação indicada.

```typescript
{
  code: "USER_003",
  message: "Dados inválidos. Verifique os campos destacados.",
  field: "phone"
}
```

---

### USER_004 - Perfil Incompleto

**Descrição**: Perfil do usuário está incompleto para a ação.

**Causa**: Campos obrigatórios do perfil não preenchidos.

**Resolução**: Completar perfil antes de continuar.

```typescript
{
  code: "USER_004",
  message: "Complete seu perfil para continuar."
}
```

---

## Erros de POI

### POI_001 - POI Não Encontrado

**Descrição**: Ponto de interesse não existe.

**Causa**: ID inválido ou POI foi removido.

**Resolução**: Verificar ID ou atualizar lista de POIs.

```typescript
{
  code: "POI_001",
  message: "Ponto de interesse não encontrado."
}
```

---

### POI_002 - Já Visitado

**Descrição**: Usuário já fez check-in neste POI.

**Causa**: Tentativa de check-in duplicado.

**Resolução**: Visitar outro POI ou verificar histórico.

```typescript
{
  code: "POI_002",
  message: "Você já fez check-in neste local."
}
```

---

### POI_003 - POI Inativo

**Descrição**: POI está temporariamente desativado.

**Causa**: Manutenção ou fechamento temporário.

**Resolução**: Tentar novamente mais tarde ou escolher outro POI.

```typescript
{
  code: "POI_003",
  message: "Este ponto turístico está temporariamente indisponível."
}
```

---

### POI_004 - Coordenadas Inválidas

**Descrição**: Coordenadas do POI são inválidas.

**Causa**: Erro de cadastro do POI.

**Resolução**: Contatar administrador para correção.

```typescript
{
  code: "POI_004",
  message: "Erro nas coordenadas deste ponto. Contate o suporte."
}
```

---

## Erros de Rota

### ROUTE_001 - Rota Não Encontrada

**Descrição**: Rota turística não existe.

**Causa**: ID inválido ou rota foi removida.

**Resolução**: Verificar ID ou atualizar lista de rotas.

```typescript
{
  code: "ROUTE_001",
  message: "Rota não encontrada."
}
```

---

### ROUTE_002 - Rota Sem POIs

**Descrição**: Rota não possui pontos de interesse válidos.

**Causa**: Erro de configuração da rota.

**Resolução**: Contatar administrador.

```typescript
{
  code: "ROUTE_002",
  message: "Esta rota não possui pontos de interesse válidos."
}
```

---

### ROUTE_003 - Rota Já Completada

**Descrição**: Usuário já completou esta rota.

**Causa**: Todos os POIs da rota já foram visitados.

**Resolução**: Escolher outra rota.

```typescript
{
  code: "ROUTE_003",
  message: "Você já completou esta rota!"
}
```

---

## Erros de Gamificação

### GAME_001 - Pontos Insuficientes

**Descrição**: Usuário não tem pontos suficientes.

**Causa**: Tentativa de ação que requer mais pontos.

**Resolução**: Ganhar mais pontos com check-ins.

```typescript
{
  code: "GAME_001",
  message: "Você não tem pontos suficientes para esta ação."
}
```

---

### GAME_002 - Badge Não Disponível

**Descrição**: Badge não pode ser desbloqueado.

**Causa**: Critérios não atendidos.

**Resolução**: Verificar critérios do badge.

```typescript
{
  code: "GAME_002",
  message: "Você ainda não atende aos critérios para este badge."
}
```

---

### GAME_003 - Check-in Inválido

**Descrição**: Check-in não pôde ser processado.

**Causa**: Erro durante processamento.

**Resolução**: Tentar novamente.

```typescript
{
  code: "GAME_003",
  message: "Não foi possível processar o check-in. Tente novamente."
}
```

---

## Erros de Geolocalização

### GEO_001 - Localização Inválida

**Descrição**: Coordenadas fora dos limites do município.

**Causa**: Usuário está fora de Caçapava do Sul.

**Resolução**: Estar dentro dos limites do município.

```typescript
{
  code: "GEO_001",
  message: "Você está fora dos limites de Caçapava do Sul."
}
```

---

### GEO_002 - Fora do Raio

**Descrição**: Distância ao POI maior que permitida.

**Causa**: Usuário está a mais de 75 metros do POI.

**Resolução**: Aproximar-se do ponto turístico.

```typescript
{
  code: "GEO_002",
  message: "Aproxime-se do local para fazer check-in (máx. 75m)."
}
```

---

### GEO_003 - GPS Indisponível

**Descrição**: Não foi possível obter localização GPS.

**Causa**: Permissão negada ou GPS desligado.

**Resolução**: Ativar GPS e conceder permissão.

```typescript
{
  code: "GEO_003",
  message: "Ative o GPS e permita acesso à localização."
}
```

---

### GEO_004 - Precisão Insuficiente

**Descrição**: GPS com precisão muito baixa.

**Causa**: Sinal GPS fraco.

**Resolução**: Ir para área aberta e aguardar.

```typescript
{
  code: "GEO_004",
  message: "Sinal GPS fraco. Vá para uma área aberta."
}
```

---

## Erros de QR Code

### QR_001 - QR Inválido

**Descrição**: QR code não é válido ou foi adulterado.

**Causa**: Assinatura HMAC não confere.

**Resolução**: Usar QR code oficial do ponto turístico.

```typescript
{
  code: "QR_001",
  message: "QR code inválido. Use apenas QR codes oficiais."
}
```

---

### QR_002 - QR Expirado

**Descrição**: QR code ultrapassou validade de 24 horas.

**Causa**: Timestamp muito antigo.

**Resolução**: Solicitar novo QR code.

```typescript
{
  code: "QR_002",
  message: "QR code expirado. Solicite um novo no local."
}
```

---

### QR_003 - QR Malformado

**Descrição**: Estrutura do QR code está incorreta.

**Causa**: QR code corrompido ou não é do sistema.

**Resolução**: Escanear novamente ou usar outro QR.

```typescript
{
  code: "QR_003",
  message: "QR code não reconhecido. Tente escanear novamente."
}
```

---

### QR_004 - POI do QR Não Encontrado

**Descrição**: POI referenciado no QR não existe.

**Causa**: POI foi removido após geração do QR.

**Resolução**: Contatar administrador.

```typescript
{
  code: "QR_004",
  message: "Ponto turístico do QR code não está mais disponível."
}
```

---

## Erros de Sistema

### SYS_001 - Erro Interno

**Descrição**: Erro inesperado no sistema.

**Causa**: Falha não prevista.

**Resolução**: Tentar novamente ou contatar suporte.

```typescript
{
  code: "SYS_001",
  message: "Erro interno. Tente novamente em alguns instantes."
}
```

---

### SYS_002 - Serviço Indisponível

**Descrição**: Serviço temporariamente fora do ar.

**Causa**: Manutenção ou sobrecarga.

**Resolução**: Aguardar e tentar novamente.

```typescript
{
  code: "SYS_002",
  message: "Serviço temporariamente indisponível. Tente em alguns minutos."
}
```

---

### SYS_003 - Rate Limit

**Descrição**: Muitas requisições em pouco tempo.

**Causa**: Uso excessivo da API.

**Resolução**: Aguardar período de cooldown.

```typescript
{
  code: "SYS_003",
  message: "Muitas tentativas. Aguarde 1 minuto."
}
```

---

### SYS_004 - Erro de Rede

**Descrição**: Falha na comunicação de rede.

**Causa**: Problema de conectividade.

**Resolução**: Verificar conexão e tentar novamente.

```typescript
{
  code: "SYS_004",
  message: "Erro de conexão. Verifique sua internet."
}
```

---

## Tratamento de Erros

### Frontend - React

```typescript
// hooks/useErrorHandler.ts

interface ErrorHandler {
  handleError: (error: APIError) => void;
  showError: (message: string) => void;
}

function useErrorHandler(): ErrorHandler {
  const handleError = (error: APIError) => {
    const { code, message } = error.error;

    switch (code) {
      case 'AUTH_002':
        // Sessão expirada - redirecionar para login
        logout();
        navigate('/login');
        break;

      case 'AUTH_003':
        // Acesso negado - mostrar mensagem
        showToast(message, 'warning');
        break;

      case 'GEO_003':
        // GPS - solicitar permissão
        requestLocationPermission();
        break;

      default:
        // Erro genérico
        showToast(message, 'error');
    }
  };

  return { handleError, showError };
}
```

### Componente de Erro

```tsx
// components/ErrorDisplay.tsx

interface ErrorDisplayProps {
  error: APIError;
  onRetry?: () => void;
}

function ErrorDisplay({ error, onRetry }: ErrorDisplayProps) {
  const { code, message } = error.error;

  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
      <div className="flex items-center gap-2">
        <AlertCircle className="text-red-500" />
        <span className="font-medium text-red-800">{message}</span>
      </div>

      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-2 text-sm text-red-600 underline"
        >
          Tentar novamente
        </button>
      )}

      <span className="text-xs text-red-400 block mt-2">
        Código: {code}
      </span>
    </div>
  );
}
```

---

## Referências

- [HTTP Status Codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)
- [REST API Error Handling](https://restfulapi.net/http-status-codes/)
- [Problem Details for HTTP APIs (RFC 7807)](https://datatracker.ietf.org/doc/html/rfc7807)

---

```
© 2025 Oryum Tech. Todos os direitos reservados.
Este documento é propriedade exclusiva da Oryum Tech.
Proibida a reprodução, distribuição ou uso sem autorização expressa.
```
