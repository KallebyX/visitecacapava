import React, { useState, useEffect } from 'react';
import { backendService } from '../../services/backendService';
import { User, Mail, Phone, Award } from 'lucide-react';

const ManageTouristsPage: React.FC = () => {
    const [tourists, setTourists] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        backendService.getAllTouristsData().then(data => {
            setTourists(data);
            setLoading(false);
        });
    }, []);

    const filteredTourists = tourists.filter(t => 
        t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) return <p>Carregando dados dos turistas...</p>;

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-slate-800">Gerenciar Turistas</h1>
            
            <div className="bg-white p-4 rounded-lg shadow-sm border">
                <input
                    type="text"
                    placeholder="Buscar por nome ou email..."
                    className="w-full p-2 border rounded-md"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
                <table className="min-w-full divide-y divide-slate-200">
                    <thead className="bg-slate-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Nome</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Contato</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Pontos</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-slate-200">
                        {filteredTourists.map(tourist => (
                            <tr key={tourist.id}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <User className="h-5 w-5 text-slate-400 mr-3" />
                                        <span className="font-medium text-slate-800">{tourist.name}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                                    <div className="flex items-center mb-1">
                                        <Mail className="h-4 w-4 text-slate-400 mr-2" />
                                        <span>{tourist.email}</span>
                                    </div>
                                    <div className="flex items-center">
                                        <Phone className="h-4 w-4 text-slate-400 mr-2" />
                                        <span>{tourist.phone}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center text-sm font-semibold text-amber-600">
                                        <Award className="h-5 w-5 mr-2" />
                                        <span>{tourist.points}</span>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageTouristsPage;
