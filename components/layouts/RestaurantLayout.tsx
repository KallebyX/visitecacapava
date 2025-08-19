import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { User, LogOut, Menu, X, Star, Users, TrendingUp, MessageSquare } from 'lucide-react';
import MapOutlineIcon from '../MapOutlineIcon';

interface RestaurantLayoutProps {
  children: React.ReactNode;
}

const RestaurantLayout: React.FC<RestaurantLayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navigationItems = [
    { to: '/restaurant', label: 'Dashboard', icon: TrendingUp },
    { to: '/restaurant/reviews', label: 'Avaliações', icon: Star },
    { to: '/restaurant/customers', label: 'Clientes', icon: Users },
    { to: '/restaurant/feedback', label: 'Feedback', icon: MessageSquare },
  ];

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <NavLink to="/restaurant" className="flex items-center space-x-3">
              <div className="w-10 h-10 text-orange-600">
                <MapOutlineIcon />
              </div>
              <div className="text-brand-dark-green">
                <div className="font-display text-lg leading-none">VISITE</div>
                <div className="font-black text-xl leading-none -mt-1">CAÇAPAVA</div>
              </div>
            </NavLink>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    className={({ isActive }) =>
                      `flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                        isActive
                          ? 'text-orange-600 bg-orange-50'
                          : 'text-gray-600 hover:text-orange-600 hover:bg-orange-50'
                      }`
                    }
                    end={item.to === '/restaurant'}
                  >
                    <Icon size={18} />
                    <span>{item.label}</span>
                  </NavLink>
                );
              })}
            </nav>

            {/* User Menu */}
            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-orange-600 flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
                <div className="text-sm">
                  <div className="font-medium text-gray-900">{user.name}</div>
                  <div className="text-gray-500">Restaurante</div>
                </div>
              </div>
              
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-600 hover:text-red-600 transition-colors"
              >
                <LogOut size={18} />
                <span className="hidden md:inline">Sair</span>
              </button>

              {/* Mobile menu button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 rounded-md text-gray-600 hover:text-orange-600"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    className={({ isActive }) =>
                      `flex items-center space-x-3 px-3 py-2 rounded-md text-base font-medium transition-colors ${
                        isActive
                          ? 'text-orange-600 bg-orange-50'
                          : 'text-gray-600 hover:text-orange-600 hover:bg-orange-50'
                      }`
                    }
                    onClick={() => setIsMobileMenuOpen(false)}
                    end={item.to === '/restaurant'}
                  >
                    <Icon size={20} />
                    <span>{item.label}</span>
                  </NavLink>
                );
              })}
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
};

export default RestaurantLayout;
