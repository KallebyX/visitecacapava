import { backendService } from './backendService';
import { openAIService } from './openaiService';
import type { PointOfInterest, User, ChatMessage } from '../types';

// Chave da API do Gemini - pode ser configurada via variável de ambiente
const API_KEY = (import.meta as any).env?.VITE_GEMINI_API_KEY || "AIzaSyCIO_I4T5g_bTXZDFvHcPvQwO6z2VyIitE";

// Função auxiliar para chamar a API do Gemini com fallback para OpenAI
const callGeminiAPI = async (prompt: string, systemInstruction?: string) => {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`;
    
    let fullPrompt = prompt;
    if (systemInstruction) {
        fullPrompt = `${systemInstruction}\n\n${prompt}`;
    }
    
    const requestBody = {
        contents: [{
            parts: [{
                text: fullPrompt
            }]
        }],
        generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 1024,
        }
    };

    console.log('Chamando API Gemini:', url);

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        });

        console.log('Response status:', response.status);

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Gemini API Error:', errorText);
            throw new Error(`Gemini API error: ${response.status}`);
        }

        const data = await response.json();
        
        if (data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts && data.candidates[0].content.parts[0]) {
            console.log('Resposta recebida do Gemini com sucesso');
            return data.candidates[0].content.parts[0].text;
        } else {
            console.error('Estrutura de resposta inesperada do Gemini:', data);
            throw new Error('Estrutura de resposta inesperada');
        }
    } catch (error) {
        console.warn('Gemini API falhou, tentando com OpenAI...', error);
        
        // Fallback para OpenAI
        try {
            const response = await openAIService.generateContent(prompt, systemInstruction);
            console.log('Resposta recebida do OpenAI com sucesso');
            return response;
        } catch (openAIError) {
            console.error('OpenAI também falhou:', openAIError);
            throw new Error('Ambas APIs (Gemini e OpenAI) falharam');
        }
    }
};

export const askAIGuideStream = async (locationName: string, question: string) => {
  const prompt = `Você é um guia turístico de Caçapava do Sul. Um turista está visitando "${locationName}" e pergunta: "${question}". Responda de forma concisa, útil e calorosa.`;

  try {
    const response = await callGeminiAPI(prompt);
    
    // Simula um stream de resposta
    async function* responseStreamGenerator() {
        const words = response.split(' ');
        for (const word of words) {
            await new Promise(res => setTimeout(res, 50));
            yield { text: word + ' ' };
        }
    }
    return responseStreamGenerator();
  } catch (error) {
    console.error("Error calling Gemini API (askAIGuideStream):", error);
    
    // Fallback to a simulated stream on any API error.
    const simulatedResponse = `Desculpe, meu cérebro de IA está offline no momento. Mas tenho certeza que ${locationName} é incrível! Tente perguntar a um guia local.`;
    
    async function* errorStreamGenerator() {
        for (const word of simulatedResponse.split(' ')) {
            await new Promise(res => setTimeout(res, 50));
            yield { text: word + ' ' };
        }
    }
    return errorStreamGenerator();
  }
};

interface ItineraryPreferences {
    duration: string;
    interests: string[];
    pace: string;
    notes: string;
}

export const generateItinerary = async (preferences: ItineraryPreferences): Promise<string> => {
    // Helper to categorize POIs for better matching
    const getPoiType = (poi: PointOfInterest): string => {
        const name = poi.name.toLowerCase();
        if (name.includes('pedra') || name.includes('guaritas') || name.includes('cascata')) return 'Natureza, Aventura';
        if (name.includes('forte') || name.includes('igreja') || name.includes('casa de ulhôa')) return 'História, Cultura Local';
        if (name.includes('minas')) return 'História, Aventura';
        if (name.includes('churrascaria') || name.includes('doçaria')) return 'Gastronomia';
        return 'Geral';
    }
    
    // Fetch POIs from the backend instead of using static constants
    const pointsOfInterest = await backendService.getPointsOfInterest();

    const poiList = pointsOfInterest.map(poi => 
        `- ${poi.name}: ${poi.description} (Tipo: ${getPoiType(poi)})`
    ).join('\n');

    const prompt = `Crie um roteiro de viagem para Caçapava do Sul com base nas seguintes informações:

Pontos de Interesse Disponíveis:
${poiList}

Preferências do Turista:
- Duração: ${preferences.duration}
- Interesses: ${preferences.interests.join(', ')}
- Ritmo: ${preferences.pace}
- Observações: ${preferences.notes || 'Nenhuma'}

Instruções:
1. Crie um roteiro organizado por dia e período (manhã, tarde, noite)
2. Use apenas os pontos de interesse listados acima
3. Seja amigável e inspirador
4. Escreva de forma limpa, sem formatação markdown
5. Comece com um título criativo

Gere um roteiro personalizado e detalhado.`;
    
    try {
        const response = await callGeminiAPI(prompt);
        return response;
    } catch (error) {
        console.error("Error calling Gemini API for itinerary:", error);
        // Fallback para resposta de demonstração mais inteligente
        return generateDemoItinerary(preferences);
    }
};

// Função para gerar roteiro de demonstração baseado nas preferências
function generateDemoItinerary(preferences: ItineraryPreferences): string {
    const { duration, interests, pace } = preferences;
    const days = parseInt(duration.split(' ')[0]) || 1;
    
    let roteiro = `🌟 Roteiro Personalizado para Caçapava do Sul\n`;
    roteiro += `Duração: ${duration} | Ritmo: ${pace} | Interesses: ${interests.join(', ')}\n\n`;
    
    for (let day = 1; day <= days; day++) {
        roteiro += `=== DIA ${day} ===\n\n`;
        
        // Manhã
        roteiro += `MANHÃ (9h-12h):\n`;
        if (interests.includes('natureza')) {
            roteiro += `- Pedra do Segredo: Trilha matinal com vista espetacular\n`;
            roteiro += `- Tempo: 2-3 horas | Dificuldade: Moderada\n`;
        } else if (interests.includes('historia')) {
            roteiro += `- Igreja Matriz: Arquitetura histórica no centro da cidade\n`;
            roteiro += `- Tempo: 1 hora | Dificuldade: Fácil\n`;
        } else {
            roteiro += `- Centro Histórico: Caminhada pelo coração da cidade\n`;
            roteiro += `- Tempo: 2 horas | Dificuldade: Fácil\n`;
        }
        
        // Tarde
        roteiro += `\nTARDE (14h-17h):\n`;
        if (interests.includes('natureza') && day === 1) {
            roteiro += `- Guaritas do Camaquã: Formações rochosas de 550 milhões de anos\n`;
            roteiro += `- Tempo: 3 horas | Dificuldade: Moderada\n`;
        } else if (interests.includes('gastronomia')) {
            roteiro += `- Tour pelos Azeites: Degustação de azeites premiados\n`;
            roteiro += `- Tempo: 2 horas | Dificuldade: Fácil\n`;
        } else {
            roteiro += `- Minas do Camaquã: História da mineração local\n`;
            roteiro += `- Tempo: 2-3 horas | Dificuldade: Moderada\n`;
        }
        
        // Noite
        roteiro += `\nNOITE (19h):\n`;
        if (interests.includes('gastronomia')) {
            roteiro += `- Jantar em churrascaria tradicional gaúcha\n`;
            roteiro += `- Degustação de vinhos locais\n`;
        } else {
            roteiro += `- Jantar no centro com culinária regional\n`;
            roteiro += `- Caminhada noturna pelas ruas históricas\n`;
        }
        
        if (day < days) {
            roteiro += `\n`;
        }
    }
    
    roteiro += `\n💡 DICAS IMPORTANTES:\n`;
    roteiro += `- Leve protetor solar e água para trilhas\n`;
    roteiro += `- Verifique horários de funcionamento\n`;
    roteiro += `- Use o GPS do app para navegação\n`;
    
    roteiro += `\n⚠️ MODO DEMONSTRAÇÃO: Configure as APIs (Gemini/OpenAI) para roteiros mais precisos e atualizados.\n`;
    
    return roteiro;
}


export const getAIChatResponse = async (history: ChatMessage[], user: User): Promise<string> => {
    const pointsOfInterest = await backendService.getPointsOfInterest();
    const poiList = pointsOfInterest.map(poi => `- ${poi.name}: ${poi.description}`).join('\n');
    
    const visitedPoiObjects = await Promise.all(
        user.visited.map(visit => backendService.getPointOfInterestById(visit.pointId))
    );
    const visitedPoisText = visitedPoiObjects
        .filter(poi => poi !== null)
        .map(poi => poi!.name)
        .join(', ');

    const systemInstruction = `
        Você é 'Cacá', o assistente virtual amigável e especialista do aplicativo "Visite Caçapava do Sul".
        Sua personalidade é calorosa, prestativa e um pouco divertida.
        Seu objetivo é ajudar os turistas a aproveitarem ao máximo a cidade e o aplicativo.

        **Seu Conhecimento:**
        1.  **Sobre a Cidade:** Você conhece todos os pontos turísticos listados abaixo. Use essa lista como sua única fonte de verdade para locais. Não invente lugares.
        2.  **Sobre o App:** Você entende o sistema de gamificação (pontos, badges, ranking). Check-in em um local dá pontos. Completar rotas e visitar locais específicos dá badges (conquistas).
        3.  **Sobre o Usuário:** Você está conversando com ${user.name}. Ele(a) tem ${user.points} pontos e já visitou os seguintes locais: ${visitedPoisText || 'Nenhum'}. Use essa informação para personalizar suas respostas.
        4.  **Navegação:** Quando recomendar locais, SEMPRE mencione que o usuário pode usar o botão "Como Chegar" para navegar com Waze ou Google Maps.
        5.  **Funcionalidades do App:**
           - Seção "Atrações": Todos os pontos turísticos categorizados (natureza, história, gastronomia)
           - Seção "Restaurantes": Locais para comer com sistema de avaliações
           - Seção "Azeites": Produtores locais premiados internacionalmente (mais de 300 prêmios!)
           - Sistema de Pontos: Ganha pontos visitando locais e fazendo check-in
           - Assistente Virtual (você!): Sempre disponível para ajudar

        **Lista de Pontos Turísticos Disponíveis:**
        ${poiList}

        **Informações Especiais sobre Caçapava do Sul:**
        - Famosa pelos azeites premiados (mais de 300 prêmios internacionais!)
        - Patrimônio geológico único (Guaritas do Camaquã)
        - Rica tradição gaúcha e história militar
        - Produtores de azeite: Quinta do Vale, Olivas do Sul (ambos com tours disponíveis)

        **Regras de Conversa:**
        - Seja conciso e direto.
        - Use emojis para deixar a conversa mais leve. 😉
        - Sempre mencione navegação quando recomendar locais
        - Se perguntarem sobre restaurantes, mencione o sistema de avaliações
        - Se perguntarem sobre azeites, destaque os prêmios internacionais
        - Se não souber a resposta, admita e sugira onde o usuário pode encontrar a informação.
        - Sempre incentive o usuário a explorar a cidade.
    `;
    
    try {
        // Para o chat, precisamos formatar o histórico corretamente
        const lastUserMessage = history.filter(msg => msg.role === 'user').pop();
        if (!lastUserMessage) {
            return "Olá! Como posso ajudar você hoje?";
        }
        
        const userPrompt = lastUserMessage.parts[0].text;
        console.log('Chat prompt:', userPrompt);
        
        const response = await callGeminiAPI(userPrompt, systemInstruction);
        return response;
    } catch (error) {
        console.error("Error calling Gemini API for chat:", error);
        // Fallback inteligente baseado na mensagem do usuário
        return generateDemoChatResponse(history, user);
    }
};

// Função para gerar resposta de chat de demonstração
function generateDemoChatResponse(history: ChatMessage[], user: User): string {
    const lastUserMessage = history.filter(msg => msg.role === 'user').pop();
    if (!lastUserMessage) {
        return "Olá! 👋 Sou Cacá, seu guia virtual de Caçapava do Sul! Como posso ajudar?";
    }
    
    const userText = lastUserMessage.parts[0].text.toLowerCase();
    
    // Saudações
    if (userText.includes('olá') || userText.includes('oi') || userText.includes('bom dia')) {
        return `Olá, ${user.name}! 👋 

Que bom te ver aqui! Você já tem ${user.points} pontos no nosso sistema de gamificação. 🎯

Como posso ajudar você a explorar Caçapava do Sul hoje?

⚠️ *Modo demonstração ativo - Configure as APIs para respostas mais precisas*`;
    }
    
    // Perguntas sobre pontos turísticos
    if (userText.includes('pedra') || userText.includes('segredo')) {
        return `🗿 A Pedra do Segredo é nosso cartão postal mais famoso!

É uma formação rochosa única onde uma pedra gigante fica em equilíbrio perfeito. A trilha leva cerca de 1 hora e a vista é incrível! 📸

💡 Use o botão "Como Chegar" no app para navegar até lá com GPS.

⚠️ *Modo demonstração - APIs não configuradas*`;
    }
    
    if (userText.includes('guaritas') || userText.includes('camaquã')) {
        return `🏔️ As Guaritas do Camaquã são espetaculares!

Formações rochosas de 550 milhões de anos que parecem castelos medievais. É considerado um dos geoparques mais importantes do Brasil! 🇧🇷

Perfeito para fotos e contemplação da natureza.

⚠️ *Modo demonstração - Configure as APIs para informações mais detalhadas*`;
    }
    
    // Perguntas sobre azeites
    if (userText.includes('azeite') || userText.includes('oliva')) {
        return `🫒 Caçapava é famosa pelos azeites premiados!

Mais de 300 prêmios internacionais! 🏆 

Os principais produtores são:
- Quinta do Vale
- Olivas do Sul

Ambos oferecem tours e degustação!

⚠️ *Modo demonstração ativo*`;
    }
    
    // Perguntas sobre sistema de pontos
    if (userText.includes('ponto') || userText.includes('badge') || userText.includes('conquista')) {
        return `🎯 Sistema de Gamificação:

Você tem ${user.points} pontos! Continue explorando para ganhar mais:

- Check-in: 10-25 pontos
- Primeira visita: Bônus 2x
- Completar rotas: Badges especiais

${user.visited.length === 0 ? 'Faça seu primeiro check-in para começar! 🚀' : `Você já visitou ${user.visited.length} local(is)! 👏`}

⚠️ *Modo demonstração*`;
    }
    
    // Resposta genérica
    return `Interessante pergunta sobre Caçapava do Sul! 🤔

Sou seu guia virtual e posso ajudar com:
- 🗺️ Pontos turísticos
- 🍽️ Restaurantes 
- 🫒 Azeites premiados
- 🎯 Sistema de pontos
- 📍 Navegação

⚠️ **Modo Demonstração**: Configure as APIs do Gemini ou OpenAI para respostas mais precisas!

O que gostaria de saber?`;
}
