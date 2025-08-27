import React, { useEffect, useState } from 'react';
import { backendService } from '../../services/backendService';
import { Bar, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';
import { useAuth } from '../../context/AuthContext';
import { HotelCheckIn } from '../../types';
import { chartColors } from '../../utils/chartUtils';
import { BedDouble, Users, MapPin } from 'lucide-react';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

const StatCard: React.FC<{ title: string; value: string | number; icon: React.ReactNode }> = ({ title, value, icon }) => (
    <div className="bg-white p-6 rounded-2xl shadow-lg flex items-center space-x-4 border border-gray-200/80">
        <div className="bg-brand-light-green/30 text-brand-green p-4 rounded-full">
            {icon}
        </div>
        <div>
            <p className="text-sm text-gray-500 font-medium">{title}</p>
            <p className="text-3xl font-bold text-brand-dark-green">{value}</p>
        </div>
    </div>
);

const ChartCard: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200/80">
        <h3 className="text-xl font-bold text-brand-dark-green mb-4">{title}</h3>
        <div className="h-64 flex items-center justify-center">
            {children}
        </div>
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
                .catch(error => {
                    console.error("Failed to load hotel dashboard:", error);
                    setLoading(false);
                });
        }
    }, [user]);

    if (loading) {
        return <div className="text-center py-20 font-medium text-gray-600">Carregando dashboard do hotel...</div>;
    }

    if (!dashboardData) {
        return <div className="text-center py-20 font-bold text-red-600">Não foi possível carregar os dados do hotel.</div>;
    }

    const reasonData = {
        labels: Object.keys(dashboardData.travelBehavior.byReason),
        datasets: [{
            data: Object.values(dashboardData.travelBehavior.byReason),
            backgroundColor: [
                'rgba(59, 130, 246, 0.8)',   // blue
                'rgba(236, 72, 153, 0.8)',   // pink
                'rgba(107, 114, 128, 0.8)',  // gray
                'rgba(20, 184, 166, 0.8)',   // teal
                'rgba(34, 197, 94, 0.8)',    // green
                'rgba(234, 179, 8, 0.8)',    // yellow
            ],
            borderColor: [
                'rgba(59, 130, 246, 1)',     // blue
                'rgba(236, 72, 153, 1)',     // pink
                'rgba(107, 114, 128, 1)',    // gray
                'rgba(20, 184, 166, 1)',     // teal
                'rgba(34, 197, 94, 1)',      // green
                'rgba(234, 179, 8, 1)',      // yellow
            ],
            borderWidth: 2,
        }],
    };

    const originData = {
        labels: Object.keys(dashboardData.demographics.byOrigin),
        datasets: [{
            label: 'Hóspedes',
            data: Object.values(dashboardData.demographics.byOrigin),
            backgroundColor: 'rgba(34, 197, 94, 0.8)',
            borderColor: 'rgba(34, 197, 94, 1)',
            borderWidth: 1,
        }],
    };
    
    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
    };

    return (
        <div className="space-y-8">
            <h1 className="text-4xl font-bold text-brand-dark-green font-display tracking-wide">Dashboard do Hotel</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <StatCard title="Total de Hóspedes" value={dashboardData.totalGuests} icon={<Users size={28} />} />
                {/* Placeholder for other stats */}
                <StatCard title="Check-ins Hoje" value={0} icon={<BedDouble size={28} />} />
                <StatCard title="Principal Origem" value={Object.keys(dashboardData.demographics.byOrigin)[0] || 'N/A'} icon={<MapPin size={28} />} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                <div className="lg:col-span-2">
                    <ChartCard title="Motivo da Viagem">
                        <Doughnut data={reasonData} options={chartOptions} />
                    </ChartCard>
                </div>
                <div className="lg:col-span-3">
                    <ChartCard title="Origem dos Hóspedes">
                        <Bar data={originData} options={{ ...chartOptions, indexAxis: 'y' }} />
                    </ChartCard>
                </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200/80">
                <h3 className="text-xl font-bold text-brand-dark-green mb-4">Últimos Check-ins</h3>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="py-3 px-4 border-b text-left text-sm font-semibold text-gray-600 uppercase">Nome do Turista</th>
                                <th className="py-3 px-4 border-b text-left text-sm font-semibold text-gray-600 uppercase">Data do Check-in</th>
                                <th className="py-3 px-4 border-b text-left text-sm font-semibold text-gray-600 uppercase">Origem</th>
                                <th className="py-3 px-4 border-b text-left text-sm font-semibold text-gray-600 uppercase">Motivo</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {dashboardData.recentCheckIns.map((checkin: HotelCheckIn) => (
                                <tr key={checkin.id} className="hover:bg-gray-50">
                                    <td className="py-3 px-4">{checkin.touristName}</td>
                                    <td className="py-3 px-4">{new Date(checkin.checkInDate).toLocaleDateString()}</td>
                                    <td className="py-3 px-4">{checkin.originCity}</td>
                                    <td className="py-3 px-4">{checkin.travelReason}</td>
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
