import React, { useState, useEffect } from 'react';
import { backendService } from '../../services/backendService';
import { Bar, Doughnut, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { Users, Plane, Heart, Route as RouteIcon, MapPin, Trophy } from 'lucide-react';
import StatCard from '../../components/admin/StatCard';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const chartColors = ['#02a343', '#6cbc3a', '#f2e9c6', '#063f1f', '#d82b2b', '#ffe815'];

const generateChartData = (labels: string[], data: number[], label: string) => ({
    labels,
    datasets: [{
        label,
        data,
        backgroundColor: chartColors.slice(0, labels.length),
        borderColor: '#ffffff',
        borderWidth: 2,
    }],
});

const chartOptions = (title: string) => ({
    responsive: true,
    plugins: {
        legend: { position: 'bottom' as const },
        title: { display: true, text: title, font: { size: 16 } },
    },
});

const AnalyticsPage: React.FC = () => {
    const [analytics, setAnalytics] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        backendService.getAnalyticsData().then(data => {
            setAnalytics(data);
            setLoading(false);
        });
    }, []);

    if (loading) return <p>Carregando análises...</p>;
    if (!analytics) return <p>Não foi possível carregar os dados.</p>;
    
    const { demographics, travelBehavior, satisfaction, routeAnalytics } = analytics;

    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold text-brand-dark-green">Análises de Turismo (BI)</h1>

            {/* Route Analytics Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard icon={Trophy} title="Rota Mais Popular" value={routeAnalytics.mostPopularRoute} isText />
                <StatCard icon={RouteIcon} title="Total de Rotas Completadas" value={(Object.values(routeAnalytics.completionsByRoute) as number[]).reduce((sum, count) => sum + count, 0)} />
                 <StatCard icon={MapPin} title="Rotas Ativas" value={3} />
            </div>

            {/* Demographics Section */}
            <section className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2"><Users className="text-brand-green"/>Demografia dos Visitantes</h2>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <Doughnut data={generateChartData(Object.keys(demographics.byGender), Object.values(demographics.byGender), 'Gênero')} options={chartOptions('Distribuição por Gênero')} />
                    <Bar data={generateChartData(Object.keys(demographics.ageRanges), Object.values(demographics.ageRanges), 'Faixa Etária')} options={chartOptions('Distribuição por Faixa Etária')} />
                    <Pie data={generateChartData(Object.keys(demographics.byNationality), Object.values(demographics.byNationality), 'Nacionalidade')} options={chartOptions('Distribuição por Nacionalidade')} />
                </div>
            </section>
            
            {/* Travel Behavior Section */}
            <section className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2"><Plane className="text-brand-green"/>Comportamento de Viagem</h2>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <Pie data={generateChartData(Object.keys(travelBehavior.byReason), Object.values(travelBehavior.byReason), 'Motivo')} options={chartOptions('Motivo da Viagem')} />
                    <Doughnut data={generateChartData(Object.keys(travelBehavior.byTransport), Object.values(travelBehavior.byTransport), 'Transporte')} options={chartOptions('Meio de Transporte Utilizado')} />
                    <Pie data={generateChartData(Object.keys(travelBehavior.byDiscovery), Object.values(travelBehavior.byDiscovery), 'Canal')} options={chartOptions('Como Conheceu a Cidade')} />
                </div>
            </section>
            
             {/* Satisfaction Section */}
            <section className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2"><Heart className="text-brand-green"/>Níveis de Satisfação</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Bar data={generateChartData(['Péssimo', 'Ruim', 'Boa', 'Muito boa', 'Ótima'], ['Péssimo', 'Ruim', 'Boa', 'Muito boa', 'Ótima'].map(level => satisfaction.poi[level] || 0), 'Avaliações')} options={chartOptions('Opinião sobre Pontos Turísticos')} />
                    <Bar data={generateChartData(['Péssimo', 'Ruim', 'Boa', 'Muito boa', 'Ótima'], ['Péssimo', 'Ruim', 'Boa', 'Muito boa', 'Ótima'].map(level => satisfaction.city[level] || 0), 'Avaliações')} options={chartOptions('Opinião sobre a Cidade')} />
                </div>
            </section>
            
            {/* Route Analytics Detail */}
            <section className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2"><RouteIcon className="text-brand-green"/>Análise de Rotas</h2>
                <div className="grid grid-cols-1">
                    <Bar data={generateChartData(Object.keys(routeAnalytics.completionsByRoute), Object.values(routeAnalytics.completionsByRoute), 'Conclusões')} options={chartOptions('Rotas Completadas por Turistas')} />
                </div>
            </section>

        </div>
    );
};

export default AnalyticsPage;
