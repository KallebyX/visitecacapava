import React, { useState, useEffect } from 'react';
import { backendService } from '../../services/backendService';
import { Bar, Doughnut, Pie } from 'react-chartjs-2';
import '../../services/chartjs-config';
import { Users, Plane, Heart, Route as RouteIcon, Star, Trophy, MapPin } from 'lucide-react';
import StatCard from '../../components/admin/StatCard';

const chartColors = ['#02a343', '#6cbc3a', '#063f1f', '#f2e9c6', '#d82b2b', '#ffe815'];
const chartColorsAlt = ['#063f1f', '#02a343', '#6cbc3a', '#a5d6a7', '#c8e6c9'];


const generateChartData = (labels: string[], data: number[], label: string, colors: string[] = chartColors) => ({
    labels,
    datasets: [{
        label,
        data,
        backgroundColor: colors.slice(0, labels.length),
        borderColor: '#ffffff',
        borderWidth: 2,
    }],
});

const chartOptions = (title: string, legendPosition: 'bottom' | 'right' = 'bottom') => ({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: { 
            position: legendPosition,
            labels: {
                boxWidth: 12,
                padding: 15,
                font: {
                    size: 12
                }
            }
         },
        title: { 
            display: true, 
            text: title, 
            font: { size: 16, weight: 'bold' },
            color: '#334155',
            padding: {
                bottom: 20
            }
        },
    },
    scales: { // Only for Bar charts, but doesn't hurt others
        y: {
            grid: {
                color: '#e2e8f0',
            },
            ticks: {
                color: '#64748b'
            }
        },
        x: {
            grid: {
                display: false,
            },
            ticks: {
                color: '#64748b'
            }
        }
    }
});

const AnalyticsCard: React.FC<{title: string, icon: React.ElementType, children: React.ReactNode}> = ({ title, icon: Icon, children }) => (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200/80">
        <h2 className="text-xl font-semibold mb-4 text-slate-700 flex items-center gap-3">
            <Icon className="text-brand-green" size={24} />
            {title}
        </h2>
        <div className="h-80"> {/* Fixed height for chart containers */}
            {children}
        </div>
    </div>
);


const AnalyticsPage: React.FC = () => {
    const [analytics, setAnalytics] = useState<any>(null);
    const [summary, setSummary] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const [analyticsData, summaryData] = await Promise.all([
                backendService.getAnalyticsData(),
                backendService.getAnalyticsSummary()
            ]);
            setAnalytics(analyticsData);
            setSummary(summaryData);
            setLoading(false);
        }
        fetchData();
    }, []);

    if (loading) return <p>Carregando análises...</p>;
    if (!analytics || !summary) return <p>Não foi possível carregar os dados.</p>;
    
    const { demographics, travelBehavior, satisfaction, routeAnalytics } = analytics;

    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold text-slate-800">Business Intelligence</h1>
            
            {/* Summary Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard icon={Users} title="Visitantes Únicos" value={summary.totalVisitors} />
                <StatCard icon={Heart} title="Satisfação Média (Cidade)" value={`${summary.avgCityRating} / 5.0`} isText />
                <StatCard icon={Trophy} title="Rota Mais Popular" value={summary.mostPopularRoute} isText />
            </div>

            {/* Demographics & Behavior */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
                <AnalyticsCard title="Distribuição por Gênero" icon={Users}>
                    <Doughnut data={generateChartData(Object.keys(demographics.byGender), Object.values(demographics.byGender), 'Gênero')} options={chartOptions('', 'right')} />
                </AnalyticsCard>
                 <AnalyticsCard title="Distribuição por Faixa Etária" icon={Users}>
                    <Bar data={generateChartData(Object.keys(demographics.ageRanges), Object.values(demographics.ageRanges), 'Faixa Etária', chartColorsAlt)} options={chartOptions('')} />
                </AnalyticsCard>
                 <AnalyticsCard title="Motivo da Viagem" icon={Plane}>
                    <Pie data={generateChartData(Object.keys(travelBehavior.byReason), Object.values(travelBehavior.byReason), 'Motivo')} options={chartOptions('', 'right')} />
                </AnalyticsCard>
            </div>
            
             {/* Satisfaction Section */}
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <AnalyticsCard title="Opinião sobre Pontos Turísticos" icon={MapPin}>
                    <Bar data={generateChartData(['Péssimo', 'Ruim', 'Boa', 'Muito boa', 'Ótima'], ['Péssimo', 'Ruim', 'Boa', 'Muito boa', 'Ótima'].map(level => satisfaction.poi[level] || 0), 'Avaliações', chartColorsAlt)} options={chartOptions('')} />
                </AnalyticsCard>
                <AnalyticsCard title="Opinião sobre a Cidade" icon={Heart}>
                     <Bar data={generateChartData(['Péssimo', 'Ruim', 'Boa', 'Muito boa', 'Ótima'], ['Péssimo', 'Ruim', 'Boa', 'Muito boa', 'Ótima'].map(level => satisfaction.city[level] || 0), 'Avaliações', chartColorsAlt)} options={chartOptions('')} />
                </AnalyticsCard>
             </div>
            
            {/* Route Analytics Detail */}
            <AnalyticsCard title="Rotas Completadas por Turistas" icon={RouteIcon}>
                 <Bar data={generateChartData(Object.keys(routeAnalytics.completionsByRoute), Object.values(routeAnalytics.completionsByRoute), 'Conclusões', chartColorsAlt)} options={chartOptions('')} />
            </AnalyticsCard>

        </div>
    );
};

export default AnalyticsPage;