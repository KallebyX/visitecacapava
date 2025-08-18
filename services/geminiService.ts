
import { GoogleGenAI } from "@google/genai";
import { POINTS_OF_INTEREST } from '../constants';
import type { PointOfInterest } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.warn("API_KEY environment variable not set. Gemini API calls will fail.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

export const askAIGuideStream = async (locationName: string, question: string) => {
  if (!API_KEY) {
    // Simulate a response if API key is not available
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
    if (!API_KEY) {
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

    const poiList = POINTS_OF_INTEREST.map(poi => 
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
