import React from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Route, LogOut, BarChart3, MapPin, Map, Users, Trophy, Home, BarChart2, Award, Hotel } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import MapOutlineIcon from '../MapOutlineIcon';

const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

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

    const getLinkClass = (path: string) => {
        // Adjust for index route
        const fullPath = path === '/' ? '/admin' : `/admin${path}`;
        const isActive = location.pathname === fullPath || (path !== '/' && location.pathname.startsWith(fullPath));
        return `flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
            isActive 
                ? 'bg-green-100 text-green-700' 
                : 'text-slate-600 hover:bg-slate-100'
        }`;
    };

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
                <nav className="mt-6">
                    <NavLink to="/admin" icon={<Home size={20} />}>Dashboard</NavLink>
                    <NavLink to="/admin/routes" icon={<Route size={20} />}>Rotas</NavLink>
                    <NavLink to="/admin/pois" icon={<MapPin size={20} />}>Pontos de Interesse</NavLink>
                    <NavLink to="/admin/challenges" icon={<Award size={20} />}>Desafios</NavLink>
                    <NavLink to="/admin/tourists" icon={<Users size={20} />}>Turistas</NavLink>
                    <NavLink to="/admin/hotel-analytics" icon={<Hotel size={20} />}>Hotéis</NavLink>
                    <NavLink to="/admin/analytics" icon={<BarChart2 size={20} />}>Analytics</NavLink>
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