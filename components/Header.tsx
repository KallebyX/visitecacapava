import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import MapOutlineIcon from './MapOutlineIcon';
import { useAuth } from '../context/AuthContext';
import { LogOut, Menu, X, Bot } from 'lucide-react';

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
    
   const mobileNavLinkClass = ({ isActive }: { isActive: boolean }): string =>
    `block px-4 py-3 rounded-md text-lg font-medium transition-colors duration-300 ${
      isActive
        ? 'bg-brand-light-green text-white'
        : 'text-brand-beige hover:bg-brand-light-green/20'
    }`;

  const MobileMenu = () => (
    <div className={`fixed inset-0 z-50 transform transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="absolute inset-0 bg-black/50" onClick={() => setIsMobileMenuOpen(false)}></div>
        <div className="relative w-72 h-full bg-brand-dark-green ml-auto p-6 flex flex-col">
            <button onClick={() => setIsMobileMenuOpen(false)} className="self-end mb-8 text-brand-beige">
                <X size={30}/>
            </button>
            <nav className="flex flex-col space-y-4">
                <NavLink to="/" className={mobileNavLinkClass}>Início</NavLink>
                <NavLink to="/routes" className={mobileNavLinkClass}>Rotas</NavLink>
                <NavLink to="/itinerary" className={mobileNavLinkClass}>Roteiro IA</NavLink>
                <NavLink to="/map" className={mobileNavLinkClass}>Mapa</NavLink>
                <NavLink to="/leaderboard" className={mobileNavLinkClass}>Ranking</NavLink>
                <NavLink to="/profile" className={mobileNavLinkClass}>Meu Perfil</NavLink>
            </nav>
            <button onClick={handleLogout} className="mt-auto flex items-center gap-2 px-4 py-3 rounded-md text-lg font-medium text-brand-red hover:bg-brand-red/10 transition-colors">
                <LogOut size={22} />
                Sair
            </button>
        </div>
    </div>
  );

  return (
    <>
      <header className="bg-brand-beige/80 backdrop-blur-sm sticky top-0 z-40 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            <NavLink to="/" className="flex items-center gap-2 group">
              <div className="w-16 h-16 text-brand-green group-hover:text-brand-light-green transition-colors">
                <MapOutlineIcon />
              </div>
              <div className="text-brand-dark-green">
                <div className="font-display tracking-wider text-xl leading-none">VISITE</div>
                <div className="font-black text-2xl leading-none -mt-1">CAÇAPAVA</div>
                <div className="font-semibold text-sm leading-none">DO SUL</div>
              </div>
            </NavLink>
            <nav className="hidden md:flex items-center space-x-2">
              <NavLink to="/" className={navLinkClass}>Início</NavLink>
              <NavLink to="/routes" className={navLinkClass}>Rotas</NavLink>
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
              <button onClick={() => setIsMobileMenuOpen(true)} className="text-brand-dark-green">
                <Menu size={28}/>
              </button>
            </div>
          </div>
        </div>
      </header>
      <MobileMenu />
    </>
  );
};

export default Header;