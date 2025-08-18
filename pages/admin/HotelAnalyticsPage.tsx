import React, { useEffect, useState } from 'react';
import { backendService } from '../../services/backendService';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { HotelCheckIn } from '../../types';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const HotelAnalyticsPage: React.FC = () => {
    const [analyticsData, setAnalyticsData] = useState<any>(null);
    const [filteredCheckIns, setFilteredCheckIns] = useState<HotelCheckIn[]>([]);
    const [selectedHotel, setSelectedHotel] = useState<string>('all');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        backendService.getAllHotelsAnalytics()
            .then(data => {
                setAnalyticsData(data);
                setFilteredCheckIns(data.allCheckIns);
                setLoading(false);
            })
            .catch(console.error);
    }, []);

    useEffect(() => {
        if (analyticsData) {
            if (selectedHotel === 'all') {
                setFilteredCheckIns(analyticsData.allCheckIns);
            } else {
                setFilteredCheckIns(analyticsData.allCheckIns.filter((ci: HotelCheckIn) => ci.hotelId === selectedHotel));
            }
        }
    }, [selectedHotel, analyticsData]);

    if (loading) {
        return <div className="text-center py-10">Carregando análises...</div>;
    }

    if (!analyticsData) {
        return <div className="text-center py-10 text-red-500">Não foi possível carregar as análises.</div>;
    }

    const summaryChartData = {
        labels: analyticsData.summary.map((s: any) => s.hotelName),
        datasets: [
            {
                label: 'Total de Hóspedes',
                data: analyticsData.summary.map((s: any) => s.totalGuests),
                backgroundColor: 'rgba(54, 162, 235, 0.6)',
            },
            {
                label: 'Avaliação Média',
                data: analyticsData.summary.map((s: any) => parseFloat(s.avgRating) || 0),
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
            },
        ],
    };

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-800">Análise da Rede Hoteleira</h1>

            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Visão Geral</h2>
                <div style={{ height: '400px' }}>
                    <Bar data={summaryChartData} options={{ responsive: true, maintainAspectRatio: false }} />
                </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Detalhes dos Check-ins</h2>
                <div className="mb-4">
                    <label htmlFor="hotel-filter" className="block text-sm font-medium text-gray-700">Filtrar por Hotel</label>
                    <select
                        id="hotel-filter"
                        value={selectedHotel}
                        onChange={(e) => setSelectedHotel(e.target.value)}
                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                    >
                        <option value="all">Todos os Hotéis</option>
                        {analyticsData.summary.map((s: any) => (
                            <option key={s.hotelId} value={s.hotelId}>{s.hotelName}</option>
                        ))}
                    </select>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="py-2 px-4 border-b text-left">Hotel</th>
                                <th className="py-2 px-4 border-b text-left">Turista</th>
                                <th className="py-2 px-4 border-b text-left">Data</th>
                                <th className="py-2 px-4 border-b text-left">Origem</th>
                                <th className="py-2 px-4 border-b text-left">Motivo</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredCheckIns.map((checkin: HotelCheckIn) => (
                                <tr key={checkin.id}>
                                    <td className="py-2 px-4 border-b">{analyticsData.summary.find((s:any) => s.hotelId === checkin.hotelId)?.hotelName}</td>
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

export default HotelAnalyticsPage;
