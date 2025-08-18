import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { LayoutDashboard, LogOut, UserPlus } from 'lucide-react';
import MapOutlineIcon from '../MapOutlineIcon';

const HotelLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };
    
    const navLinkClass = ({ isActive }: { isActive: boolean }): string =>
    `flex items-center gap-3 px-4 py-3 rounded-lg text-lg transition-colors ${
      isActive
        ? 'bg-brand-green text-white'
        : 'hover:bg-brand-dark-green/10'
    }`;


    return (
        <div className="min-h-screen flex bg-gray-100">
            <aside className="w-64 bg-brand-dark-green text-brand-beige flex flex-col p-4">
                 <div className="flex items-center gap-2 mb-8 p-2">
                    <div className="w-10 h-10 text-brand-light-green">
                        <MapOutlineIcon />
                    </div>
                    <div>
                        <div className="font-semibold text-sm leading-none">PORTAL</div>
                        <div className="font-display tracking-wider text-lg leading-none">HOTEL</div>
                    </div>
                </div>
                <nav className="flex-grow space-y-2">
                    <NavLink to="/hotel" end className={navLinkClass}>
                        <LayoutDashboard size={22} />
                        <span>Dashboard</span>
                    </NavLink>
                    <NavLink to="/hotel/checkin" className={navLinkClass}>
                        <UserPlus size={22} />
                        <span>Check-in de Hóspede</span>
                    </NavLink>
                </nav>
                 <div className="mt-auto">
                    <div className="p-2 mb-2 border-t border-brand-green/20">
                        <p className="font-semibold">{user?.name}</p>
                        <p className="text-sm opacity-70">{user?.email}</p>
                    </div>
                    <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-lg text-brand-beige hover:bg-brand-red/80 transition-colors">
                        <LogOut size={22}/>
                        <span>Sair</span>
                    </button>
                </div>
            </aside>
            <main className="flex-grow p-8 overflow-y-auto">
                {children}
            </main>
        </div>
    );
};

export default HotelLayout;
