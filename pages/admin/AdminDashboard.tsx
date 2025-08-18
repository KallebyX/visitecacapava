import React, { useState, useEffect } from 'react';
import { backendService } from '../../services/backendService';
import StatCard from '../../components/admin/StatCard';
import { Users, Map, CheckSquare, Star } from 'lucide-react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const AdminDashboard: React.FC = () => {
    const [stats, setStats] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        backendService.getAdminStats().then(data => {
            setStats(data);
            setLoading(false);
        });
    }, []);

    const chartData = {
        labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul'],
        datasets: [
            {
                label: 'Novos Turistas',
                data: [65, 59, 80, 81, 56, 55, 40],
                backgroundColor: 'rgba(2, 163, 67, 0.6)',
                borderColor: 'rgba(2, 163, 67, 1)',
                borderWidth: 1,
            },
            {
                label: 'Check-ins Totais',
                data: [150, 120, 190, 170, 130, 140, 110],
                backgroundColor: 'rgba(108, 188, 58, 0.6)',
                borderColor: 'rgba(108, 188, 58, 1)',
                borderWidth: 1,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: 'Atividade Turística (Simulado)',
            },
        },
    };

    if (loading) return <p>Carregando dashboard...</p>;

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6 text-brand-dark-green">Dashboard da Secretaria</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatCard icon={Users} title="Total de Turistas" value={stats.totalTourists} />
                <StatCard icon={Map} title="Total de Rotas" value={stats.totalRoutes} />
                <StatCard icon={CheckSquare} title="Total de Check-ins" value={stats.totalCheckIns} />
                <StatCard icon={Star} title="Ponto Mais Visitado" value={stats.mostVisitedPoi} isText />
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
                <Bar options={chartOptions} data={chartData} />
            </div>
        </div>
    );
};

export default AdminDashboard;
