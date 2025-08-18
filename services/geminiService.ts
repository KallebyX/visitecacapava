

import { GoogleGenAI } from "@google/genai";
import { backendService } from './backendService';
import type { PointOfInterest, User, ChatMessage } from '../types';

const API_KEY = process.env.API_KEY;

// A more robust check for a valid key. A typical Google API key is ~39 characters.
const isApiKeyValid = API_KEY && API_KEY.length > 30;

if (!isApiKeyValid) {
  console.warn("API_KEY environment variable not set or is invalid. Gemini API calls will be simulated.");
}

const ai = isApiKeyValid ? new GoogleGenAI({ apiKey: API_KEY! }) : null;


export const askAIGuideStream = async (locationName: string, question: string) => {
  if (!ai) {
    // Simulate a response if API key is not available or invalid
    const simulatedResponse = `Desculpe, meu cérebro de IA está offline no momento. Mas tenho certeza que ${locationName} é incrível! Tente perguntar a um guia local.`;
    
    async function* streamGenerator() {
        for (const word of simulatedResponse.split(' ')) {
            await new Promise(res => setTimeout(res, 50));
            yield { text: word + ' ' };
        }
    }
    return streamGenerator();
  }

  const prompt = `Você é um guia turístico amigável e experiente de Caçapava do Sul, Brasil. Um turista está visitando "${locationName}" e tem uma pergunta. Responda de forma concisa, útil e calorosa. Pergunta: "${question}"`;

  try {
    const response = await ai.models.generateContentStream({
      model: "gemini-2.5-flash",
      contents: prompt,
    });
    return response;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    async function* errorStreamGenerator() {
      yield { text: "Ocorreu um erro ao contatar o guia de IA. Por favor, tente novamente mais tarde." };
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
    if (!ai) {
        return Promise.resolve("Modo de demonstração: A API do Gemini não está configurada. Aqui está um exemplo de roteiro:\n\n### Dia 1: Aventura e Natureza\n\n**Manhã:**\n- **Pedra do Segredo:** Comece o dia com uma trilha leve e aprecie a vista incrível deste famoso ponto turístico.\n\n**Tarde:**\n- **Guaritas:** Explore as formações rochosas que parecem castelos. Ótimo para fotos!\n\n**Noite:**\n- **Churrascaria Rodeio:** Termine o dia com um autêntico churrasco gaúcho.");
    }

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

    const prompt = `
        Você é um guia turístico especialista e criativo para a cidade de Caçapava do Sul, no Brasil.
        Sua tarefa é criar um roteiro de viagem personalizado e detalhado, baseado nas preferências de um turista.

        **Contexto - Pontos de Interesse Disponíveis:**
        Aqui está uma lista dos pontos de interesse em Caçapava do Sul que você DEVE usar como base para suas recomendações. Não invente lugares que não estão nesta lista.
        ${poiList}

        **Preferências do Turista:**
        - **Duração da Viagem:** ${preferences.duration}
        - **Principais Interesses:** ${preferences.interests.join(', ')}
        - **Ritmo Desejado:** ${preferences.pace}
        - **Observações Adicionais:** ${preferences.notes || 'Nenhuma.'}

        **Sua Tarefa:**
        1.  Crie um roteiro dia a dia, se a duração for maior que um dia.
        2.  Use os pontos de interesse da lista fornecida que melhor se encaixam nos interesses do turista.
        3.  Organize as atividades de forma lógica (manhã, tarde, noite) e considere o ritmo solicitado.
        4.  Para cada sugestão, escreva um parágrafo curto e envolvente, explicando por que o local é uma boa escolha e o que o turista pode fazer lá.
        5.  O tom deve ser amigável, acolhedor e inspirador.
        6.  Retorne a resposta em formato **Markdown**, usando títulos (##, ###) para os dias e negrito (**) para os nomes dos locais.

        Comece o roteiro com um título criativo.
    `;
    
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
        });
        return response.text;
    } catch (error) {
        console.error("Error calling Gemini API for itinerary:", error);
        throw new Error("Ocorreu um erro ao contatar o guia de IA. Por favor, tente novamente mais tarde.");
    }
};


export const getAIChatResponse = async (history: ChatMessage[], user: User): Promise<string> => {
    if (!ai) {
        return "Desculpe, meu cérebro de IA está offline. Não consigo conversar agora.";
    }

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

        **Lista de Pontos Turísticos Disponíveis:**
        ${poiList}

        **Regras de Conversa:**
        - Seja conciso e direto.
        - Use emojis para deixar a conversa mais leve. 😉
        - Se não souber a resposta, admita e sugira onde o usuário pode encontrar a informação.
        - Sempre incentive o usuário a explorar a cidade.
    `;
    
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: history,
            config: {
                systemInstruction,
            }
        });

        return response.text;
    } catch (error) {
        console.error("Error calling Gemini API for chat:", error);
        return "Oops! Tive um pequeno curto-circuito. 😵 Poderia tentar perguntar de novo?";
    }
};
