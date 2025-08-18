
import React from 'react';
import MapOutlineIcon from './MapOutlineIcon';

const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-dark-green text-brand-beige">
      <div className="container mx-auto px-4 py-8 text-center">
        <div className="flex justify-center items-center gap-2 mb-4">
          <div className="w-10 h-10 text-brand-light-green">
            <MapOutlineIcon />
          </div>
          <span className="font-display text-2xl">Visite Caçapava do Sul</span>
        </div>
        <p className="text-sm opacity-80">
          © {new Date().getFullYear()} Prefeitura de Caçapava do Sul. Todos os direitos reservados.
        </p>
         <p className="text-xs opacity-60 mt-2">
          Uma plataforma de turismo gamificada para explorar o melhor da nossa cidade.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
