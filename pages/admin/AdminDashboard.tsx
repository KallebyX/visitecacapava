import React, { useState, useEffect } from 'react';
import { backendService } from '../../services/backendService';
import InfoCard from '../../components/admin/InfoCard';
import ChartCard from '../../components/admin/ChartCard';
import { Users, MapPin, CheckCircle, Hotel, Bot, BarChart2 } from 'lucide-react';
import { Bar } from 'react-chartjs-2';
import '../../services/chartjs-config';
import { chartColors } from '../../utils/chartUtils';

const AdminDashboard: React.FC = () => {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        backendService.getFullAdminDashboardData().then(response => {
            setData(response);
            setLoading(false);
        }).catch(err => {
            console.error("Failed to load dashboard data:", err);
            setLoading(false);
        });
    }, []);

    if (loading) return <p className="text-center text-slate-500 mt-10">Carregando dashboard aprimorado...</p>;
    if (!data) return <p className="text-center text-red-500 mt-10">Falha ao carregar os dados do dashboard.</p>;

    const { analytics, totalTourists, totalRoutes, totalCheckIns, totalHotelCheckIns, botUsage } = data;

    const genderData = {
        labels: Object.keys(analytics.demographics.byGender),
        datasets: [{
            data: Object.values(analytics.demographics.byGender),
            backgroundColor: [chartColors.blue, chartColors.pink, chartColors.gray],
        }],
    };

    const ageRangeData = {
        labels: Object.keys(analytics.demographics.ageRanges),
        datasets: [{
            data: Object.values(analytics.demographics.ageRanges),
            backgroundColor: [chartColors.teal, chartColors.green, chartColors.yellow, chartColors.orange, chartColors.red],
        }],
    };
    
    const originData = {
        labels: Object.keys(analytics.demographics.byNationality),
        datasets: [{
            label: 'Visitantes por Origem',
            data: Object.values(analytics.demographics.byNationality),
            backgroundColor: chartColors.purple,
        }],
    };

    const travelReasonData = {
        labels: Object.keys(analytics.travelBehavior.byReason),
        datasets: [{
            data: Object.values(analytics.travelBehavior.byReason),
            backgroundColor: [chartColors.indigo, chartColors.cyan, chartColors.lime],
        }],
    };

    return (
        <div className="space-y-6 pb-10">
            <h1 className="text-3xl font-bold text-slate-800">Dashboard da Secretaria</h1>
            
            {/* --- Métricas Principais --- */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
                <InfoCard icon={Users} title="Turistas (App)" value={totalTourists} color="#3b82f6" />
                <InfoCard icon={Hotel} title="Check-ins (Hoteis)" value={totalHotelCheckIns} color="#10b981" />
                <InfoCard icon={CheckCircle} title="Check-ins (POIs)" value={totalCheckIns} color="#f97316" />
                <InfoCard icon={MapPin} title="Rotas Criadas" value={totalRoutes} color="#8b5cf6" />
                <InfoCard icon={Bot} title="Interações (Bot)" value={botUsage.totalInteractions} color="#14b8a6" />
                <InfoCard icon={BarChart2} title="Satisfação (Bot)" value={botUsage.satisfaction} color="#6366f1" />
            </div>

            {/* --- Demografia --- */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <ChartCard title="Gênero" chartType="pie" data={genderData} />
                <ChartCard title="Faixa Etária" chartType="doughnut" data={ageRangeData} />
                <ChartCard title="Motivo da Viagem" chartType="pie" data={travelReasonData} />
            </div>
            
            {/* --- Origem e Uso do Bot --- */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                <div className="lg:col-span-3 bg-white p-6 rounded-xl shadow-sm border border-slate-200/80">
                    <h3 className="text-lg font-semibold text-slate-700 mb-4">Origem dos Visitantes</h3>
                    <div className="h-80">
                        <Bar data={originData} options={{ maintainAspectRatio: false, indexAxis: 'y' }} />
                    </div>
                </div>
                <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-slate-200/80">
                    <h3 className="text-lg font-semibold text-slate-700 mb-4">Perguntas Frequentes (Bot)</h3>
                    <ul className="space-y-3 text-slate-600">
                        {botUsage.commonQuestions.map((q: any) => (
                            <li key={q.question} className="flex justify-between items-center text-sm">
                                <span>{q.question}</span>
                                <span className="font-bold text-slate-800 bg-slate-100 px-2 py-1 rounded-md">{q.count}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;