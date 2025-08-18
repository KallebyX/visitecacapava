import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { backendService } from '../../services/backendService';
import type { HotelCheckIn } from '../../types';
import StatCard from '../../components/admin/StatCard';
import { BedDouble, UserCheck, Calendar } from 'lucide-react';

const HotelDashboard: React.FC = () => {
    const { user } = useAuth();
    const [checkIns, setCheckIns] = useState<HotelCheckIn[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user) {
            backendService.getHotelCheckIns(user.id).then(data => {
                setCheckIns(data.sort((a,b) => new Date(b.checkInDate).getTime() - new Date(a.checkInDate).getTime()));
                setLoading(false);
            });
        }
    }, [user]);

    if (loading) return <p>Carregando dashboard do hotel...</p>;
    
    const today = new Date().toISOString().split('T')[0];
    const todaysCheckIns = checkIns.filter(c => c.checkInDate.startsWith(today)).length;


    return (
        <div>
            <h1 className="text-3xl font-bold mb-6 text-brand-dark-green">Dashboard do Hotel</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <StatCard icon={BedDouble} title="Ocupação Atual (Simulado)" value="75%" />
                <StatCard icon={UserCheck} title="Check-ins Hoje" value={todaysCheckIns} />
                <StatCard icon={Calendar} title="Total de Registros" value={checkIns.length} />
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-4">Registros de Hóspedes Recentes</h2>
                 <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b">
                                <th className="p-4">Nome do Hóspede</th>
                                <th className="p-4">Data do Check-in</th>
                                <th className="p-4">Data do Check-out</th>
                            </tr>
                        </thead>
                        <tbody>
                            {checkIns.slice(0, 10).map(checkin => (
                                <tr key={checkin.id} className="border-b hover:bg-gray-50">
                                    <td className="p-4 font-semibold">{checkin.touristName}</td>
                                    <td className="p-4">{new Date(checkin.checkInDate).toLocaleString()}</td>
                                    <td className="p-4">{new Date(checkin.checkOutDate).toLocaleDateString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default HotelDashboard;
