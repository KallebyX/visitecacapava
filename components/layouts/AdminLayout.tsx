import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { LayoutDashboard, Route, LogOut, BarChart3, MapPin } from 'lucide-react';
import MapOutlineIcon from '../MapOutlineIcon';

const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };
    
    const navLinkClass = ({ isActive }: { isActive: boolean }): string =>
    `flex items-center gap-4 px-4 py-3 rounded-r-lg text-base transition-colors duration-200 border-l-4 ${
      isActive
        ? 'bg-brand-green/10 text-white font-semibold border-brand-green'
        : 'border-transparent hover:bg-slate-800'
    }`;


    return (
        <div className="min-h-screen flex bg-slate-100 text-slate-800">
            <aside className="w-64 bg-slate-900 text-slate-400 flex flex-col shrink-0">
                <div className="flex items-center gap-3 h-24 mb-4 px-6 border-b border-slate-800">
                    <div className="w-10 h-10 text-brand-light-green">
                        <MapOutlineIcon />
                    </div>
                    <div>
                        <div className="font-semibold text-sm leading-none text-slate-500">PAINEL</div>
                        <div className="font-display tracking-wider text-xl leading-none text-white">ADMIN</div>
                    </div>
                </div>
                <nav className="flex-grow px-2 py-4 space-y-2">
                    <NavLink to="/admin" end className={navLinkClass}>
                        <LayoutDashboard size={20} />
                        <span>Dashboard</span>
                    </NavLink>
                    <NavLink to="/admin/routes" className={navLinkClass}>
                        <Route size={20} />
                        <span>Gerenciar Rotas</span>
                    </NavLink>
                    <NavLink to="/admin/pois" className={navLinkClass}>
                        <MapPin size={20} />
                        <span>Gerenciar Pontos</span>
                    </NavLink>
                     <NavLink to="/admin/analytics" className={navLinkClass}>
                        <BarChart3 size={20} />
                        <span>Analytics (BI)</span>
                    </NavLink>
                </nav>
                 <div className="mt-auto p-4 border-t border-slate-800">
                    <div className="p-2 mb-2">
                        <p className="font-semibold text-white truncate">{user?.name}</p>
                        <p className="text-sm opacity-70 truncate">{user?.email}</p>
                    </div>
                    <button onClick={handleLogout} className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-lg text-base bg-slate-800 hover:bg-brand-red text-white transition-colors">
                        <LogOut size={20}/>
                        <span>Sair</span>
                    </button>
                </div>
            </aside>
            <main className="flex-grow p-6 lg:p-8 overflow-y-auto">
                {children}
            </main>
        </div>
    );
};

export default AdminLayout;