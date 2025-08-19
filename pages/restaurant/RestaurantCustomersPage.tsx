import React, { useState } from 'react';
import { FaUser, FaCalendar, FaHeart, FaMapMarkerAlt, FaPhone, FaEnvelope, FaFilter, FaSearch } from 'react-icons/fa';

interface Customer {
  id: string;
  name: string;
  email: string;
  phone?: string;
  city: string;
  visits: number;
  lastVisit: string;
  favoriteItem: string;
  totalSpent: number;
  isRegular: boolean;
  notes?: string;
}

const RestaurantCustomersPage: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([
    {
      id: '1',
      name: 'Maria Silva',
      email: 'maria.silva@email.com',
      phone: '(55) 9 9999-1234',
      city: 'Caçapava do Sul',
      visits: 12,
      lastVisit: '2024-12-15',
      favoriteItem: 'Churrasco Completo',
      totalSpent: 840.50,
      isRegular: true,
      notes: 'Cliente preferencial, sempre vem aos domingos em família'
    },
    {
      id: '2',
      name: 'João Santos',
      email: 'joao.santos@email.com',
      phone: '(53) 9 8888-5678',
      city: 'Bagé',
      visits: 3,
      lastVisit: '2024-12-10',
      favoriteItem: 'Costela Assada',
      totalSpent: 210.00,
      isRegular: false
    },
    {
      id: '3',
      name: 'Ana Costa',
      email: 'ana.costa@email.com',
      city: 'Porto Alegre',
      visits: 1,
      lastVisit: '2024-12-05',
      favoriteItem: 'Galeto com Polenta',
      totalSpent: 85.00,
      isRegular: false,
      notes: 'Turista, primeira visita'
    },
    {
      id: '4',
      name: 'Pedro Oliveira',
      email: 'pedro.oliveira@email.com',
      phone: '(55) 9 7777-9012',
      city: 'Caçapava do Sul',
      visits: 8,
      lastVisit: '2024-12-12',
      favoriteItem: 'Linguiça Artesanal',
      totalSpent: 520.00,
      isRegular: true,
      notes: 'Sempre pede desconto, mas é cliente fiel'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'regular' | 'new'>('all');
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [showNotes, setShowNotes] = useState<{[key: string]: boolean}>({});

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.city.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterType === 'all' || 
                         (filterType === 'regular' && customer.isRegular) ||
                         (filterType === 'new' && !customer.isRegular);
    
    return matchesSearch && matchesFilter;
  });

  const totalCustomers = customers.length;
  const regularCustomers = customers.filter(c => c.isRegular).length;
  const newCustomers = customers.filter(c => !c.isRegular).length;
  const totalRevenue = customers.reduce((sum, c) => sum + c.totalSpent, 0);

  const toggleNotes = (customerId: string) => {
    setShowNotes(prev => ({
      ...prev,
      [customerId]: !prev[customerId]
    }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h1 className="text-3xl font-bold text-brand-dark-green mb-4">
          Gestão de Clientes
        </h1>
        
        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <FaUser size={24} color="#3b82f6" />
              <div>
                <p className="text-2xl font-bold text-blue-700">{totalCustomers}</p>
                <p className="text-sm text-blue-600">Total de Clientes</p>
              </div>
            </div>
          </div>
          
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <FaHeart size={24} color="#16a34a" />
              <div>
                <p className="text-2xl font-bold text-green-700">{regularCustomers}</p>
                <p className="text-sm text-green-600">Clientes Fiéis</p>
              </div>
            </div>
          </div>
          
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <FaUser size={24} color="#8b5cf6" />
              <div>
                <p className="text-2xl font-bold text-purple-700">{newCustomers}</p>
                <p className="text-sm text-purple-600">Novos Clientes</p>
              </div>
            </div>
          </div>
          
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <span className="text-2xl">💰</span>
              <div>
                <p className="text-2xl font-bold text-yellow-700">
                  R$ {totalRevenue.toFixed(2)}
                </p>
                <p className="text-sm text-yellow-600">Receita Total</p>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <div className="flex-1 relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              placeholder="Buscar por nome, email ou cidade..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-green"
            />
          </div>
          
          <div className="flex items-center gap-2">
            <FaFilter color="#6b7280" size={16} />
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as 'all' | 'regular' | 'new')}
              className="border border-gray-300 rounded-lg px-3 py-2"
            >
              <option value="all">Todos os Clientes</option>
              <option value="regular">Clientes Fiéis</option>
              <option value="new">Novos Clientes</option>
            </select>
          </div>
        </div>
      </div>

      {/* Customers List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredCustomers.map(customer => (
          <div key={customer.id} className="bg-white rounded-xl shadow-lg p-6">
            {/* Customer Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-brand-green rounded-full flex items-center justify-center">
                  <FaUser color="white" size={20} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                    {customer.name}
                    {customer.isRegular && (
                      <FaHeart color="#16a34a" size={14} title="Cliente Fiel" />
                    )}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <FaMapMarkerAlt size={12} />
                    {customer.city}
                  </div>
                </div>
              </div>
              
              <div className="text-right">
                <div className="text-sm text-gray-500">Visitas</div>
                <div className="text-2xl font-bold text-brand-green">{customer.visits}</div>
              </div>
            </div>

            {/* Customer Info */}
            <div className="space-y-3 mb-4">
              <div className="flex items-center gap-2 text-sm">
                <FaEnvelope size={14} color="#6b7280" />
                <span className="text-gray-600">{customer.email}</span>
              </div>
              
              {customer.phone && (
                <div className="flex items-center gap-2 text-sm">
                  <FaPhone size={14} color="#6b7280" />
                  <span className="text-gray-600">{customer.phone}</span>
                </div>
              )}
              
              <div className="flex items-center gap-2 text-sm">
                <FaCalendar size={14} color="#6b7280" />
                <span className="text-gray-600">
                  Última visita: {new Date(customer.lastVisit).toLocaleDateString('pt-BR')}
                </span>
              </div>
            </div>

            {/* Favorite & Spending */}
            <div className="bg-gray-50 rounded-lg p-3 mb-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                <div>
                  <span className="text-gray-500">Prato Favorito:</span>
                  <div className="font-medium text-gray-800">{customer.favoriteItem}</div>
                </div>
                <div>
                  <span className="text-gray-500">Total Gasto:</span>
                  <div className="font-medium text-green-600">R$ {customer.totalSpent.toFixed(2)}</div>
                </div>
              </div>
            </div>

            {/* Notes */}
            {customer.notes && (
              <div className="mb-4">
                <button
                  onClick={() => toggleNotes(customer.id)}
                  className="text-sm text-brand-green hover:text-brand-dark-green font-medium"
                >
                  {showNotes[customer.id] ? 'Ocultar' : 'Ver'} Observações
                </button>
                
                {showNotes[customer.id] && (
                  <div className="mt-2 bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <p className="text-sm text-blue-700">{customer.notes}</p>
                  </div>
                )}
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-2">
              <button
                onClick={() => setSelectedCustomer(customer)}
                className="flex-1 bg-brand-green text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-brand-dark-green transition-colors"
              >
                Ver Detalhes
              </button>
              <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm hover:bg-gray-50 transition-colors">
                Editar
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredCustomers.length === 0 && (
        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
          <FaUser size={48} color="#d1d5db" className="mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-600 mb-2">
            Nenhum cliente encontrado
          </h3>
          <p className="text-gray-500">
            {searchTerm 
              ? 'Tente ajustar os filtros de busca.'
              : 'Ainda não há clientes cadastrados.'
            }
          </p>
        </div>
      )}

      {/* Customer Detail Modal */}
      {selectedCustomer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl p-6 max-w-md w-full mx-4">
            <h3 className="text-xl font-bold text-brand-dark-green mb-4">
              Detalhes do Cliente
            </h3>
            <div className="space-y-3">
              <div>
                <span className="text-gray-500">Nome:</span>
                <div className="font-medium">{selectedCustomer.name}</div>
              </div>
              <div>
                <span className="text-gray-500">Email:</span>
                <div className="font-medium">{selectedCustomer.email}</div>
              </div>
              {selectedCustomer.phone && (
                <div>
                  <span className="text-gray-500">Telefone:</span>
                  <div className="font-medium">{selectedCustomer.phone}</div>
                </div>
              )}
              <div>
                <span className="text-gray-500">Cidade:</span>
                <div className="font-medium">{selectedCustomer.city}</div>
              </div>
              <div>
                <span className="text-gray-500">Status:</span>
                <div className="font-medium">
                  {selectedCustomer.isRegular ? '❤️ Cliente Fiel' : '🆕 Novo Cliente'}
                </div>
              </div>
            </div>
            
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setSelectedCustomer(null)}
                className="flex-1 bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition-colors"
              >
                Fechar
              </button>
              <button className="flex-1 bg-brand-green text-white py-2 px-4 rounded-lg hover:bg-brand-dark-green transition-colors">
                Editar Cliente
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RestaurantCustomersPage;
