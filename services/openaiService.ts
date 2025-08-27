// Serviço OpenAI para fallback quando Gemini falhar
export const openAIService = {
  generateContent: async (prompt: string, systemInstruction?: string): Promise<string> => {
    // Implementação básica de fallback
    // Em produção, aqui seria a integração real com a API OpenAI
    
    console.log('OpenAI Service - Fallback mode');
    
    // Simula uma resposta básica para evitar erros
    const fallbackResponse = `Desculpe, o serviço de IA principal está temporariamente indisponível. 
    Aqui está uma resposta básica para sua pergunta: "${prompt}". 
    Recomendamos entrar em contato com um guia local para informações mais detalhadas.`;
    
    return fallbackResponse;
  }
};
