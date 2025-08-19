import { useEffect } from 'react';

export const useErrorHandler = () => {
    useEffect(() => {
        // Interceptar erros de imagem e substituir por placeholders
        const handleImageError = (event: Event) => {
            const target = event.target as HTMLImageElement;
            if (target && target.tagName === 'IMG') {
                const fallbackText = target.alt || 'Imagem não disponível';
                const svgContent = `
                    <svg xmlns="http://www.w3.org/2000/svg" width="400" height="200" viewBox="0 0 400 200">
                        <rect width="400" height="200" fill="#6CBC3A"/>
                        <text x="50%" y="50%" font-family="Arial" font-size="16" fill="white" text-anchor="middle" dy=".3em">${fallbackText}</text>
                    </svg>
                `;
                target.src = `data:image/svg+xml;base64,${btoa(svgContent)}`;
                target.removeEventListener('error', handleImageError);
            }
        };

        // Adicionar listener global para erros de imagem
        document.addEventListener('error', handleImageError, true);

        // Suprimir erros específicos do console que não afetam a funcionalidade
        const originalConsoleError = console.error;
        console.error = (...args) => {
            const message = args[0];
            if (typeof message === 'string') {
                // Suprimir erros conhecidos que não afetam a funcionalidade
                if (
                    message.includes('FrameDoesNotExistError') ||
                    message.includes('runtime.lastError') ||
                    message.includes('Failed to load resource') ||
                    message.includes('Google Maps API') ||
                    message.includes('CORS policy')
                ) {
                    return; // Não exibir esses erros
                }
            }
            originalConsoleError.apply(console, args);
        };

        // Cleanup
        return () => {
            document.removeEventListener('error', handleImageError, true);
            console.error = originalConsoleError;
        };
    }, []);
};

export default useErrorHandler;
