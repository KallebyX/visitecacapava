import OpenAI from 'openai';

// Serviço OpenAI para fallback quando Gemini falhar

const API_KEY = (import.meta as any).env?.VITE_OPENAI_API_KEY;

const openai = new OpenAI({
  apiKey: API_KEY,
  dangerouslyAllowBrowser: true // Necessário para uso no lado do cliente
});

export const openAIService = {
  generateContent: async (prompt: string, systemInstruction?: string): Promise<string> => {
    
    if (!API_KEY) {
        console.warn('Chave da API da OpenAI não configurada. Usando resposta de demonstração.');
        // Fallback para resposta de demonstração quando a API key não estiver configurada
        return generateDemoResponse(prompt, systemInstruction);
    }

    console.log('Serviço OpenAI - Chamada real à API');
    
    try {
      const messages: OpenAI.Chat.ChatCompletionMessageParam[] = [];
      if (systemInstruction) {
        messages.push({ role: 'system', content: systemInstruction });
      }
      messages.push({ role: 'user', content: prompt });

      const chatCompletion = await openai.chat.completions.create({
        messages: messages,
        model: 'gpt-3.5-turbo',
      });

      const response = chatCompletion.choices[0].message.content;
      if (response) {
        return response;
      } else {
        throw new Error('OpenAI retornou uma resposta vazia.');
      }
    } catch (error) {
      console.error('Erro ao chamar a API da OpenAI:', error);
      // Se o OpenAI falhar, usa resposta de demonstração
      return generateDemoResponse(prompt, systemInstruction);
    }
  }
};

// Função para gerar respostas de demonstração inteligentes
function generateDemoResponse(prompt: string, systemInstruction?: string): string {
  const lowerPrompt = prompt.toLowerCase();
  
  // Respostas para roteiros/itinerários
  if (lowerPrompt.includes('roteiro') || lowerPrompt.includes('itinerário') || 
      lowerPrompt.includes('dia') || lowerPrompt.includes('visita')) {
    return `🌟 Roteiro Personalizado para Caçapava do Sul

**Dia 1: Descobrindo as Maravilhas Naturais**

**Manhã (9h-12h):**
- Pedra do Segredo: Comece com uma trilha leve até esta famosa formação rochosa em equilíbrio perfeito
- Tempo estimado: 2 horas (incluindo caminhada e contemplação)

**Tarde (14h-17h):**
- Guaritas do Camaquã: Explore as incríveis formações de arenito com 550 milhões de anos
- Dica: Leve protetor solar e água!

**Noite (19h):**
- Jantar em restaurante local com culinária gaúcha tradicional

⚠️ **Modo Demonstração Ativo**: Esta é uma resposta de exemplo. Configure as APIs do Gemini ou OpenAI para respostas personalizadas.`;
  }
  
  // Respostas para chat/perguntas gerais
  if (lowerPrompt.includes('olá') || lowerPrompt.includes('oi') || lowerPrompt.includes('como')) {
    return `Olá! 👋 Sou Cacá, seu assistente virtual para Caçapava do Sul!

Estou aqui para ajudá-lo a explorar nossa cidade incrível. Posso te orientar sobre:
- 🗺️ Pontos turísticos e atrações
- 🍽️ Restaurantes e gastronomia local  
- 🏨 Hospedagem e serviços
- 🎯 Sistema de gamificação do app

⚠️ **Modo Demonstração**: Para respostas mais precisas e atualizadas, configure as APIs de IA.

Como posso ajudar você hoje?`;
  }
  
  // Resposta genérica
  return `Obrigado pela sua pergunta sobre Caçapava do Sul! 

⚠️ **Sistema em Modo Demonstração**: As APIs de inteligência artificial (Gemini e OpenAI) não estão configuradas ou temporariamente indisponíveis.

Para uma experiência completa:
- Configure a chave da API do Google Gemini
- Configure a chave da API da OpenAI como fallback
- Ou entre em contato com um guia turístico local

Enquanto isso, explore os pontos turísticos através do mapa interativo e sistema de check-in do aplicativo!`;
}

