# Configuração das APIs de IA

O sistema agora suporta duas APIs de IA com fallback automático:

## APIs Suportadas

### 1. Google Gemini (Principal)
- Modelo: `gemini-2.5-flash`
- Usado por padrão para todas as funcionalidades de IA
- Mais econômico e rápido

### 2. OpenAI GPT (Fallback)
- Modelo: `gpt-4o-mini`
- Ativado automaticamente quando Gemini falha
- Mantém a mesma qualidade de resposta

## Sistema de Fallback

O sistema funciona da seguinte forma:

1. **Tentativa com Gemini**: Primeira tentativa sempre com Gemini
2. **Fallback Automático**: Se Gemini falhar, usa OpenAI automaticamente
3. **Transparência**: Indicador visual mostra qual API está ativa

## Indicador de Status

Um pequeno badge aparece nas telas com IA mostrando:
- 🔵 **Gemini AI**: Quando usando Google Gemini
- 🟢 **OpenAI GPT**: Quando usando OpenAI como fallback
- 🔴 **IA Offline**: Se ambas APIs falharem

## Configuração de Variáveis de Ambiente

Para usar suas próprias chaves de API, crie um arquivo `.env` na raiz do projeto:

```env
# API do Gemini (Google)
VITE_GEMINI_API_KEY=sua_chave_gemini_aqui

# API do OpenAI (Backup)
VITE_OPENAI_API_KEY=sua_chave_openai_aqui
```

**Importante**: Nunca commite o arquivo `.env` com suas chaves reais!

## Funcionalidades com IA

As seguintes funcionalidades usam IA com fallback automático:

1. **Roteiro Personalizado** (`/itinerary`)
   - Cria roteiros baseados em preferências
   - Considera tempo, interesses e ritmo

2. **Assistente Virtual** (Chat)
   - Responde dúvidas sobre a cidade
   - Dá recomendações personalizadas

3. **Guia nos Pontos Turísticos**
   - Informações contextuais sobre locais
   - Respostas a perguntas específicas

## Monitoramento

O sistema verifica automaticamente qual API está disponível:
- Verificação inicial ao carregar
- Re-verificação a cada 5 minutos
- Troca automática se uma API ficar disponível

## Tratamento de Erros

Se ambas APIs falharem:
- Mensagens de erro amigáveis são exibidas
- Funcionalidades básicas continuam funcionando
- Apenas recursos de IA ficam indisponíveis

## Custos

- **Gemini**: Gratuito até 1 milhão de tokens/mês
- **OpenAI**: Cobrado por uso (modelo mini é mais econômico)

Recomenda-se monitorar o uso para evitar custos inesperados.
