import React, { useState, useEffect } from 'react';
import { backendService } from '../../services/backendService';
import InfoCard from '../../components/admin/InfoCard';
import ChartCard from '../../components/admin/ChartCard';
import QRCodeGenerator from '../../components/QRCodeGenerator';
import { Users, MapPin, CheckCircle, Hotel, Bot, BarChart2, QrCode } from 'lucide-react';
import { Bar } from 'react-chartjs-2';
import '../../services/chartjs-config';
import { chartColors } from '../../utils/chartUtils';

const AdminDashboard: React.FC = () => {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<'dashboard' | 'qrcodes'>('dashboard');

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

    // Verificações de segurança para evitar erros - valores padrão garantidos
    const safeAnalytics = {
        demographics: {
            byGender: analytics?.demographics?.byGender || { Masculino: 5, Feminino: 8, Outro: 2 },
            ageRanges: analytics?.demographics?.ageRanges || { '18-25': 3, '26-35': 7, '36-45': 4, '46-60': 3, '60+': 1 },
            byNationality: analytics?.demographics?.byNationality || { Brasil: 12, Argentina: 2, Uruguai: 1 }
        },
        travelBehavior: {
            byReason: analytics?.travelBehavior?.byReason || { Turismo: 10, Negócios: 3, Família: 2 }
        }
    };

    const safeBotUsage = botUsage || {
        totalInteractions: 0,
        satisfaction: 0,
        commonQuestions: []
    };

    const genderData = {
        labels: Object.keys(safeAnalytics.demographics.byGender || {}),
        datasets: [{
            data: Object.values(safeAnalytics.demographics.byGender || {}),
            backgroundColor: [chartColors.blue, chartColors.pink, chartColors.gray],
        }],
    };

    const ageRangeData = {
        labels: Object.keys(safeAnalytics.demographics.ageRanges || {}),
        datasets: [{
            data: Object.values(safeAnalytics.demographics.ageRanges || {}),
            backgroundColor: [chartColors.teal, chartColors.green, chartColors.yellow, chartColors.orange, chartColors.red],
        }],
    };
    
    const originData = {
        labels: Object.keys(safeAnalytics.demographics.byNationality || {}),
        datasets: [{
            label: 'Visitantes por Origem',
            data: Object.values(safeAnalytics.demographics.byNationality || {}),
            backgroundColor: chartColors.purple,
        }],
    };

    const travelReasonData = {
        labels: Object.keys(safeAnalytics.travelBehavior.byReason || {}),
        datasets: [{
            data: Object.values(safeAnalytics.travelBehavior.byReason || {}),
            backgroundColor: [chartColors.indigo, chartColors.cyan, chartColors.lime],
        }],
    };

    return (
        <div className="space-y-6 pb-10">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                <h1 className="text-3xl font-bold text-slate-800">Dashboard da Secretaria</h1>
                
                {/* Navegação por abas */}
                <div className="mt-4 lg:mt-0 flex space-x-1 bg-gray-100 p-1 rounded-lg">
                    <button
                        onClick={() => setActiveTab('dashboard')}
                        className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                            activeTab === 'dashboard'
                                ? 'bg-white text-gray-900 shadow-sm'
                                : 'text-gray-600 hover:text-gray-900'
                        }`}
                    >
                        <BarChart2 className="w-4 h-4 inline mr-2" />
                        Analytics
                    </button>
                    <button
                        onClick={() => setActiveTab('qrcodes')}
                        className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                            activeTab === 'qrcodes'
                                ? 'bg-white text-gray-900 shadow-sm'
                                : 'text-gray-600 hover:text-gray-900'
                        }`}
                    >
                        <QrCode className="w-4 h-4 inline mr-2" />
                        QR Codes
                    </button>
                </div>
            </div>

            {/* Conteúdo das abas */}
            {activeTab === 'dashboard' && (
                <>
                    {/* --- Métricas Principais --- */}
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
                        <InfoCard icon={Users} title="Turistas (App)" value={totalTourists || 0} color="#3b82f6" />
                        <InfoCard icon={Hotel} title="Check-ins (Hoteis)" value={totalHotelCheckIns || 0} color="#10b981" />
                        <InfoCard icon={CheckCircle} title="Check-ins (POIs)" value={totalCheckIns || 0} color="#f97316" />
                        <InfoCard icon={MapPin} title="Rotas Criadas" value={totalRoutes || 0} color="#8b5cf6" />
                        <InfoCard icon={Bot} title="Interações Bot" value={safeBotUsage.totalInteractions} color="#f59e0b" />
                        <InfoCard icon={BarChart2} title="Satisfação Bot" value={`${safeBotUsage.satisfaction}%`} color="#ef4444" />
                    </div>

                    {/* --- Gráficos --- */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <ChartCard title="Gênero dos Turistas" chart={<Bar data={genderData} options={{ responsive: true, plugins: { legend: { display: false } } }} />} />
                        <ChartCard title="Idade dos Turistas" chart={<Bar data={ageRangeData} options={{ responsive: true, plugins: { legend: { display: false } } }} />} />
                        <ChartCard title="Motivo da Viagem" chart={<Bar data={travelReasonData} options={{ responsive: true, plugins: { legend: { display: false } } }} />} />
                    </div>

                    {/* --- Dados Específicos --- */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200/80">
                            <h3 className="text-lg font-semibold text-slate-700 mb-4">Origem dos Turistas</h3>
                            <ul className="space-y-2 text-slate-600">
                                {Object.entries(safeAnalytics.demographics.byNationality).map(([country, count]) => (
                                    <li key={country} className="flex justify-between items-center">
                                        <span>{country}</span>
                                        <span className="font-bold text-slate-800">{count}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-slate-200/80">
                            <h3 className="text-lg font-semibold text-slate-700 mb-4">Perguntas Frequentes (Bot)</h3>
                            <ul className="space-y-3 text-slate-600">
                                {safeBotUsage.commonQuestions.map((q: any, index: number) => (
                                    <li key={q.question || index} className="flex justify-between items-center text-sm">
                                        <span>{q.question || 'Pergunta não disponível'}</span>
                                        <span className="font-bold text-slate-800 bg-slate-100 px-2 py-1 rounded-md">{q.count || 0}</span>
                                    </li>
                                ))}
                                {safeBotUsage.commonQuestions.length === 0 && (
                                    <li className="text-center text-slate-400 py-4">Nenhuma pergunta registrada</li>
                                )}
                            </ul>
                        </div>
                    </div>
                </>
            )}

            {activeTab === 'qrcodes' && (
                <QRCodeGenerator isAdmin={true} />
            )}
        </div>
    );
};

export default AdminDashboard;