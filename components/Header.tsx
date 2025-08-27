import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import MapOutlineIcon from './MapOutlineIcon';
import { useAuth } from '../context/AuthContext';
import { LogOut, Menu, X, Bot } from 'lucide-react';

const mobileNavLinkClass = ({ isActive }: { isActive: boolean }): string =>
  `block px-4 py-3 rounded-md text-lg font-medium transition-colors duration-300 ${
    isActive
      ? 'bg-brand-light-green text-white'
      : 'text-brand-beige hover:bg-brand-light-green/20'
  }`;

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose, onLogout }) => {
  const handleNavClick = () => {
    // Pequeno delay para permitir a transição visual antes de fechar
    setTimeout(() => {
      onClose();
    }, 100);
  };

  const handleLogoutClick = () => {
    onLogout();
    onClose();
  };

  return (
    <div className={`fixed inset-0 z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="absolute inset-0 bg-black/50" onClick={onClose}></div>
        <div className="relative w-72 h-full bg-brand-dark-green ml-auto p-6 flex flex-col">
            <button onClick={onClose} className="self-end mb-8 text-brand-beige" aria-label="Fechar menu">
                <X size={30}/>
            </button>
            <nav className="flex flex-col space-y-2">
                <NavLink to="/" className={mobileNavLinkClass} onClick={handleNavClick}>Início</NavLink>
                <NavLink to="/routes" className={mobileNavLinkClass} onClick={handleNavClick}>Rotas Jogáveis</NavLink>
                <NavLink to="/attractions" className={mobileNavLinkClass} onClick={handleNavClick}>Atrações</NavLink>
                <NavLink to="/restaurants" className={mobileNavLinkClass} onClick={handleNavClick}>Restaurantes</NavLink>
                <NavLink to="/olive-oils" className={mobileNavLinkClass} onClick={handleNavClick}>Azeites</NavLink>
                <NavLink to="/itinerary" className={mobileNavLinkClass} onClick={handleNavClick}>
                  <div className="flex items-center gap-2">
                    <Bot size={20}/>
                    <span>Roteiro IA</span>
                  </div>
                </NavLink>
                <NavLink to="/challenges" className={mobileNavLinkClass} onClick={handleNavClick}>Desafios</NavLink>
                <NavLink to="/map" className={mobileNavLinkClass} onClick={handleNavClick}>Mapa</NavLink>
                <NavLink to="/gallery" className={mobileNavLinkClass} onClick={handleNavClick}>Galeria</NavLink>
                <NavLink to="/about" className={mobileNavLinkClass} onClick={handleNavClick}>A Cidade</NavLink>
                <NavLink to="/leaderboard" className={mobileNavLinkClass} onClick={handleNavClick}>Ranking</NavLink>
                <NavLink to="/profile" className={mobileNavLinkClass} onClick={handleNavClick}>Meu Perfil</NavLink>
            </nav>
            <button onClick={handleLogoutClick} className="mt-auto flex items-center gap-2 px-4 py-3 rounded-md text-lg font-medium text-brand-red hover:bg-brand-red/10 transition-colors">
                <LogOut size={22} />
                Sair
            </button>
        </div>
    </div>
  );
};

const Header: React.FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Close mobile menu on route change
    setIsMobileMenuOpen(false);
  }, [location]);
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  
  const navLinkClass = ({ isActive }: { isActive: boolean }): string =>
    `px-4 py-2 rounded-md text-sm font-medium transition-colors duration-300 ${
      isActive
        ? 'bg-brand-light-green text-white'
        : 'text-brand-dark-green hover:bg-brand-light-green/20'
    }`;

  return (
    <>
      <header className="bg-brand-beige/80 backdrop-blur-sm sticky top-0 z-40 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            <NavLink to="/" className="flex items-center gap-2 sm:gap-3 group">
              <img 
                src="/img/logo/VisiteCacapavaSimbolo.png" 
                alt="Visite Caçapava" 
                className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 object-contain group-hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  // Fallback para texto se a imagem falhar
                  target.parentElement!.innerHTML = `
                    <div class="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 bg-brand-green rounded-full flex items-center justify-center text-white font-bold text-sm sm:text-base md:text-lg">
                      VC
                    </div>
                  `;
                }}
              />
              <div className="text-brand-dark-green">
                <div className="font-display tracking-wider text-sm sm:text-base md:text-lg lg:text-xl leading-none">VISITE</div>
                <div className="font-black text-lg sm:text-xl md:text-2xl leading-none -mt-1">CAÇAPAVA</div>
                <div className="font-semibold text-xs sm:text-sm leading-none hidden sm:block">DO SUL</div>
              </div>
            </NavLink>
            <nav className="hidden md:flex items-center space-x-2">
              <NavLink to="/" className={navLinkClass}>Início</NavLink>
              <NavLink to="/routes" className={navLinkClass}>Rotas Jogáveis</NavLink>
              <NavLink to="/itinerary" className={navLinkClass}>
                <div className="flex items-center gap-1.5">
                  <Bot size={16}/>
                  <span>Roteiro IA</span>
                </div>
              </NavLink>
              <NavLink to="/map" className={navLinkClass}>Mapa</NavLink>
              <NavLink to="/leaderboard" className={navLinkClass}>Ranking</NavLink>
              <NavLink to="/profile" className={navLinkClass}>Meu Perfil</NavLink>
              <button onClick={handleLogout} className="ml-4 flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium text-brand-red hover:bg-brand-red/10 transition-colors">
                  <LogOut size={16} />
                  Sair
              </button>
            </nav>
            <div className="md:hidden">
              <button onClick={() => setIsMobileMenuOpen(true)} className="text-brand-dark-green" aria-label="Abrir menu">
                <Menu size={28}/>
              </button>
            </div>
          </div>
        </div>
      </header>
      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} onLogout={handleLogout} />
    </>
  );
};

export default Header;