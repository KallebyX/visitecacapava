import React, { useState } from 'react';

interface SafeImageProps {
    src: string;
    alt: string;
    className?: string;
    fallbackText?: string;
    fallbackColor?: string;
}

const SafeImage: React.FC<SafeImageProps> = ({ 
    src, 
    alt, 
    className = '', 
    fallbackText,
    fallbackColor = '#6CBC3A' 
}) => {
    const [imageError, setImageError] = useState(false);
    
    // Criar um SVG placeholder baseado no texto alternativo
    const createFallbackSvg = (text: string, color: string) => {
        const svgContent = `
            <svg xmlns="http://www.w3.org/2000/svg" width="400" height="200" viewBox="0 0 400 200">
                <rect width="400" height="200" fill="${color}"/>
                <text x="50%" y="50%" font-family="Arial" font-size="16" fill="white" text-anchor="middle" dy=".3em">${text}</text>
            </svg>
        `;
        return `data:image/svg+xml;base64,${btoa(svgContent)}`;
    };

    const handleImageError = () => {
        setImageError(true);
    };

    const displayText = fallbackText || alt || 'Imagem não disponível';
    
    if (imageError || !src) {
        return (
            <img
                src={createFallbackSvg(displayText, fallbackColor)}
                alt={alt}
                className={className}
            />
        );
    }

    return (
        <img
            src={src}
            alt={alt}
            className={className}
            onError={handleImageError}
        />
    );
};

export default SafeImage;
