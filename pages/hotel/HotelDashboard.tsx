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
        import React, { useEffect, useState } from 'react';
import { backendService } from '../../services/backendService';
import { Bar, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';
import { useAuth } from '../../context/AuthContext';
import { HotelCheckIn } from '../../types';
import { chartColors, transparentChartColors } from '../../utils/chartUtils';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

const StatCard: React.FC<{ title: string; value: string | number; icon: React.ReactNode }> = ({ title, value, icon }) => (
    <div className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4">
        <div className="bg-blue-100 text-blue-600 p-3 rounded-full">
            {icon}
        </div>
        <div>
            <p className="text-sm text-gray-500">{title}</p>
            <p className="text-2xl font-bold text-gray-800">{value}</p>
        </div>
    </div>
);

const ChartCard: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">{title}</h3>
        {children}
    </div>
);

const HotelDashboard: React.FC = () => {
    const { user } = useAuth();
    const [dashboardData, setDashboardData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user?.id) {
            backendService.getHotelDashboardData(user.id)
                .then(data => {
                    setDashboardData(data);
                    setLoading(false);
                })
                .catch(console.error);
        }
    }, [user]);

    if (loading) {
        return <div className="text-center py-10">Carregando dados do hotel...</div>;
    }

    if (!dashboardData) {
        return <div className="text-center py-10 text-red-500">Não foi possível carregar os dados.</div>;
    }

    const reasonData = {
        labels: Object.keys(dashboardData.travelBehavior.byReason),
        datasets: [{
            data: Object.values(dashboardData.travelBehavior.byReason),
            backgroundColor: transparentChartColors,
            borderColor: chartColors,
            borderWidth: 1,
        }],
    };

    const originData = {
        labels: Object.keys(dashboardData.demographics.byOrigin),
        datasets: [{
            label: 'Hóspedes por Origem',
            data: Object.values(dashboardData.demographics.byOrigin),
            backgroundColor: 'rgba(54, 162, 235, 0.6)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
        }],
    };

    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold text-gray-800">Dashboard do Hotel</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard title="Total de Hóspedes" value={dashboardData.totalGuests} icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>} />
                {/* Add more StatCards if needed, e.g., average stay duration */}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ChartCard title="Motivo da Viagem">
                    <Doughnut data={reasonData} />
                </ChartCard>
                <ChartCard title="Origem dos Hóspedes">
                    <Bar data={originData} options={{ indexAxis: 'y' }} />
                </ChartCard>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">Últimos Check-ins</h3>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="py-2 px-4 border-b text-left">Nome do Turista</th>
                                <th className="py-2 px-4 border-b text-left">Data do Check-in</th>
                                <th className="py-2 px-4 border-b text-left">Origem</th>
                                <th className="py-2 px-4 border-b text-left">Motivo</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dashboardData.recentCheckIns.map((checkin: HotelCheckIn) => (
                                <tr key={checkin.id}>
                                    <td className="py-2 px-4 border-b">{checkin.touristName}</td>
                                    <td className="py-2 px-4 border-b">{new Date(checkin.checkInDate).toLocaleDateString()}</td>
                                    <td className="py-2 px-4 border-b">{checkin.originCity}</td>
                                    <td className="py-2 px-4 border-b">{checkin.travelReason}</td>
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
    );
};

export default HotelDashboard;
