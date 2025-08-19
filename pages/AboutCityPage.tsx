import React, { useState, useEffect } from 'react';
import { 
    BookOpen, Castle, Mountain, Trees, MapPin, Clock, Gem, Pickaxe, 
    History, Camera, Calendar, Users, Star, Award, PlayCircle, ChevronLeft, 
    ChevronRight, Info, Zap, Eye, ArrowRight, Activity, Globe, ShieldCheck
} from 'lucide-react';

interface TimelineEvent {
    year: string;
    title: string;
    description: string;
    type: 'founding' | 'war' | 'mining' | 'modern';
}

interface GeologicalFormation {
    name: string;
    age: string;
    composition: string;
    significance: string;
    image: string;
    coordinates: { lat: number; lng: number };
}

interface MiningHistory {
    mineral: string;
    period: string;
    production: string;
    impact: string;
    currentStatus: string;
}

const AboutCityPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState('overview');
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);

    const timelineEvents: TimelineEvent[] = [
        {
            year: "1831",
            title: "Fundação de Caçapava do Sul",
            description: "Estabelecimento oficial da cidade como um importante ponto estratégico na fronteira sul do Brasil.",
            type: "founding"
        },
        {
            year: "1835-1845",
            title: "2ª Capital Farroupilha",
            description: "Durante a Revolução Farroupilha, Caçapava serviu como segunda capital da República Rio-Grandense.",
            type: "war"
        },
        {
            year: "1865",
            title: "Início da Mineração",
            description: "Descoberta e exploração das primeiras jazidas de cobre nas Minas do Camaquã.",
            type: "mining"
        },
        {
            year: "1884",
            title: "Emancipação Municipal",
            description: "Caçapava do Sul conquista sua emancipação política, tornando-se município independente.",
            type: "founding"
        },
        {
            year: "1940-1990",
            title: "Auge da Mineração",
            description: "Período de intensa atividade minerária com extração de cobre, ouro e outros minerais.",
            type: "mining"
        },
        {
            year: "1996",
            title: "Fim da Era do Cobre",
            description: "Encerramento das atividades da Mina Camaquã, marcando transição para nova economia.",
            type: "mining"
        },
        {
            year: "2006",
            title: "Capital da Geodiversidade",
            description: "Reconhecimento oficial como Capital Gaúcha da Geodiversidade pelo rico patrimônio geológico.",
            type: "modern"
        },
        {
            year: "2009",
            title: "Candidatura UNESCO",
            description: "Início do processo de candidatura do Geoparque Pampa para reconhecimento internacional.",
            type: "modern"
        },
        {
            year: "2023",
            title: "UNESCO Global Geopark",
            description: "Conquista histórica: Geoparque Pampa recebe certificação UNESCO, destacando Caçapava como patrimônio mundial da geodiversidade.",
            type: "modern"
        }
    ];

    const geologicalFormations: GeologicalFormation[] = [
        {
            name: "Guaritas do Camaquã",
            age: "550 milhões de anos",
            composition: "Arenitos e conglomerados",
            significance: "Formações únicas que revelam antigos ambientes desérticos",
            image: "/images/guaritas.jpg",
            coordinates: { lat: -30.509, lng: -53.482 }
        },
        {
            name: "Complexo Granítico",
            age: "600-550 milhões de anos",
            composition: "Granitos e gnaisses",
            significance: "Rochas que formam a base estrutural da região",
            image: "/images/granito.jpg",
            coordinates: { lat: -30.515, lng: -53.489 }
        },
        {
            name: "Jazidas de Calcário",
            age: "250-200 milhões de anos",
            composition: "Calcário dolomítico",
            significance: "Importante para a indústria cimenteira e construção civil",
            image: "/images/calcario.jpg",
            coordinates: { lat: -30.521, lng: -53.501 }
        }
    ];

    const miningHistory: MiningHistory[] = [
        {
            mineral: "Cobre",
            period: "1865-1996",
            production: "450.000 toneladas",
            impact: "Principal atividade econômica por mais de um século",
            currentStatus: "Mina desativada - Turismo geológico"
        },
        {
            mineral: "Ouro",
            period: "1870-1950",
            production: "12 toneladas estimadas",
            impact: "Atraiu garimpeiros e impulsionou crescimento urbano",
            currentStatus: "Extração artesanal ocasional"
        },
        {
            mineral: "Calcário",
            period: "1950-presente",
            production: "2 milhões ton/ano",
            impact: "Base da indústria cimenteira regional",
            currentStatus: "Ativa - Sustentabilidade ambiental"
        },
        {
            mineral: "Pedras Ornamentais",
            period: "1980-presente",
            production: "50.000 m³/ano",
            impact: "Valorização de granitos e gnaisses locais",
            currentStatus: "Crescimento no mercado nacional"
        }
    ];

    const heroImages = [
        "/images/cacapava-panorama.jpg",
        "/images/minas-camaqua.jpg",
        "/images/guaritas-sunset.jpg",
        "/images/centro-historico.jpg"
    ];

    useEffect(() => {
        if (isPlaying) {
            const interval = setInterval(() => {
                setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
            }, 4000);
            return () => clearInterval(interval);
        }
    }, [isPlaying, heroImages.length]);

    const TabButton: React.FC<{ id: string; label: string; icon: React.ReactNode; isActive: boolean }> = 
        ({ id, label, icon, isActive }) => (
        <button
            onClick={() => setActiveTab(id)}
            className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                isActive 
                    ? 'bg-green-600 text-white shadow-lg transform scale-105' 
                    : 'bg-gray-100 text-gray-700 hover:bg-green-100 hover:text-green-700'
            }`}
        >
            {icon}
            <span>{label}</span>
        </button>
    );

    const StatCard: React.FC<{ icon: React.ReactNode; value: string; label: string; color: string }> = 
        ({ icon, value, label, color }) => (
        <div className={`bg-gradient-to-br ${color} p-6 rounded-xl text-white shadow-lg transform hover:scale-105 transition-all duration-300`}>
            <div className="flex items-center justify-between">
                <div>
                    <div className="text-3xl font-bold">{value}</div>
                    <div className="text-sm opacity-90">{label}</div>
                </div>
                <div className="text-4xl opacity-75">{icon}</div>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
            {/* Hero Section */}
            <section className="relative h-96 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-green-900/90 to-blue-900/90 z-10"></div>
                <div 
                    className="absolute inset-0 bg-cover bg-center transition-all duration-1000"
                    style={{ backgroundImage: `url(${heroImages[currentImageIndex]})` }}
                ></div>
                
                <div className="relative z-20 h-full flex items-center justify-center text-center text-white">
                    <div className="max-w-4xl px-4">
                        <h1 className="text-6xl font-extrabold mb-6 tracking-tight">
                            Caçapava do Sul
                        </h1>
                        <p className="text-2xl mb-8 opacity-95">
                            A Capital Gaúcha da Geodiversidade
                        </p>
                        <div className="flex justify-center space-x-4">
                            <button
                                onClick={() => setIsPlaying(!isPlaying)}
                                className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 px-6 py-3 rounded-lg font-medium transition-all duration-300"
                            >
                                <PlayCircle size={20} />
                                <span>{isPlaying ? 'Pausar' : 'Reproduzir'} Tour</span>
                            </button>
                            <button className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm hover:bg-white/30 px-6 py-3 rounded-lg font-medium transition-all duration-300">
                                <Camera size={20} />
                                <span>Galeria</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Navigation arrows */}
                <button 
                    onClick={() => setCurrentImageIndex((prev) => (prev - 1 + heroImages.length) % heroImages.length)}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 z-30 bg-white/20 backdrop-blur-sm hover:bg-white/30 p-2 rounded-full transition-all duration-300"
                >
                    <ChevronLeft className="text-white" size={24} />
                </button>
                <button 
                    onClick={() => setCurrentImageIndex((prev) => (prev + 1) % heroImages.length)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 z-30 bg-white/20 backdrop-blur-sm hover:bg-white/30 p-2 rounded-full transition-all duration-300"
                >
                    <ChevronRight className="text-white" size={24} />
                </button>
            </section>

            {/* Statistics Section */}
            <section className="py-12 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <StatCard 
                            icon={<Calendar />} 
                            value="193" 
                            label="Anos de História" 
                            color="from-green-600 to-green-700"
                        />
                        <StatCard 
                            icon={<Pickaxe />} 
                            value="131" 
                            label="Anos de Mineração" 
                            color="from-blue-600 to-blue-700"
                        />
                        <StatCard 
                            icon={<Mountain />} 
                            value="15+" 
                            label="Formações Geológicas" 
                            color="from-purple-600 to-purple-700"
                        />
                        <StatCard 
                            icon={<Users />} 
                            value="33K" 
                            label="Habitantes" 
                            color="from-orange-600 to-orange-700"
                        />
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-12 px-4">
                <div className="max-w-7xl mx-auto">
                    {/* Tab Navigation */}
                    <div className="flex flex-wrap justify-center gap-4 mb-12">
                        <TabButton 
                            id="overview" 
                            label="Visão Geral" 
                            icon={<Eye size={20} />} 
                            isActive={activeTab === 'overview'} 
                        />
                        <TabButton 
                            id="history" 
                            label="História" 
                            icon={<History size={20} />} 
                            isActive={activeTab === 'history'} 
                        />
                        <TabButton 
                            id="mining" 
                            label="Mineração" 
                            icon={<Pickaxe size={20} />} 
                            isActive={activeTab === 'mining'} 
                        />
                        <TabButton 
                            id="geology" 
                            label="Geologia" 
                            icon={<Gem size={20} />} 
                            isActive={activeTab === 'geology'} 
                        />
                        <TabButton 
                            id="culture" 
                            label="Cultura" 
                            icon={<Star size={20} />} 
                            isActive={activeTab === 'culture'} 
                        />
                    </div>

                    {/* Tab Content */}
                    <div className="bg-white rounded-2xl shadow-xl p-8">
                        {activeTab === 'overview' && (
                            <div className="space-y-12">
                                <div className="text-center mb-12">
                                    <h2 className="text-4xl font-bold text-gray-800 mb-4">
                                        Um Tesouro Geológico no Coração do Rio Grande do Sul
                                    </h2>
                                    <p className="text-xl text-gray-600 max-w-4xl mx-auto">
                                        Caçapava do Sul é muito mais que uma cidade histórica: é um verdadeiro museu a céu aberto 
                                        que preserva bilhões de anos da história da Terra, combinando patrimônio geológico único 
                                        com rica herança cultural e tradições que resistem ao tempo.
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                                    <div className="space-y-6">
                                        <h3 className="text-2xl font-bold text-gray-800 flex items-center">
                                            <MapPin className="mr-3 text-green-600" />
                                            Localização Estratégica
                                        </h3>
                                        <p className="text-gray-600 leading-relaxed">
                                            Situada na região da Campanha do Rio Grande do Sul, Caçapava ocupa uma posição 
                                            privilegiada que a conecta naturalmente com importantes centros urbanos. 
                                            A 320 km de Porto Alegre e 180 km de Pelotas, a cidade serve como portal 
                                            de entrada para o Geoparque Caçapava, reconhecido internacionalmente.
                                        </p>
                                        
                                        <h3 className="text-2xl font-bold text-gray-800 flex items-center">
                                            <Activity className="mr-3 text-blue-600" />
                                            Economia e Desenvolvimento
                                        </h3>
                                        <p className="text-gray-600 leading-relaxed">
                                            A economia local diversificou-se ao longo dos anos, mantendo a mineração 
                                            como base sólida, especialmente na extração de calcário para a indústria 
                                            cimenteira. O turismo geológico e cultural cresce exponencialmente, 
                                            transformando antigos sítios minerários em atrações mundiais.
                                        </p>
                                    </div>

                                    <div className="space-y-6">
                                        <h3 className="text-2xl font-bold text-gray-800 flex items-center">
                                            <Globe className="mr-3 text-purple-600" />
                                            Reconhecimento Internacional
                                        </h3>
                                        <p className="text-gray-600 leading-relaxed">
                                            O título de "Capital Gaúcha da Geodiversidade" foi o primeiro passo para o reconhecimento 
                                            internacional. Em 2023, Caçapava atingiu o ápice deste processo com a certificação UNESCO 
                                            Global Geopark do Geoparque Pampa, tornando-se oficialmente patrimônio mundial da geodiversidade. 
                                            A cidade abriga uma das maiores diversidades geológicas do planeta em uma área relativamente 
                                            pequena, com rochas que datam de 2 bilhões de anos e formações que são referência mundial 
                                            em estudos geológicos.
                                        </p>
                                        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-4">
                                            <div className="flex items-center">
                                                <Award className="text-green-600 mr-2" size={20} />
                                                <span className="font-semibold text-green-800">UNESCO Global Geopark 2023</span>
                                            </div>
                                            <p className="text-green-700 text-sm mt-1">
                                                Reconhecimento oficial da UNESCO destacando Caçapava como patrimônio geológico mundial
                                            </p>
                                        </div>

                                        <h3 className="text-2xl font-bold text-gray-800 flex items-center">
                                            <ShieldCheck className="mr-3 text-green-600" />
                                            Preservação e Sustentabilidade
                                        </h3>
                                        <p className="text-gray-600 leading-relaxed">
                                            A cidade desenvolveu um modelo exemplar de conservação que equilibra 
                                            desenvolvimento econômico com preservação ambiental. Projetos de recuperação 
                                            de áreas mineradas transformaram cicatrizes industriais em laboratórios 
                                            naturais e espaços de contemplação únicos.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'history' && (
                            <div className="space-y-12">
                                <div className="text-center mb-12">
                                    <h2 className="text-4xl font-bold text-gray-800 mb-4">
                                        Uma Jornada Através dos Séculos
                                    </h2>
                                    <p className="text-xl text-gray-600">
                                        Da fundação aos dias atuais, cada período marcou profundamente a identidade caçapavana
                                    </p>
                                </div>

                                {/* Timeline */}
                                <div className="relative">
                                    <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-green-600 to-blue-600"></div>
                                    
                                    {timelineEvents.map((event, index) => (
                                        <div key={index} className={`relative flex items-center mb-12 ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
                                            <div className={`w-5/12 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                                                <div className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-green-600">
                                                    <div className="text-2xl font-bold text-green-600 mb-2">{event.year}</div>
                                                    <h3 className="text-xl font-semibold text-gray-800 mb-3">{event.title}</h3>
                                                    <p className="text-gray-600">{event.description}</p>
                                                </div>
                                            </div>
                                            
                                            <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-green-600 rounded-full border-4 border-white shadow-lg"></div>
                                        </div>
                                    ))}
                                </div>

                                {/* Historical Highlights */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
                                    <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-6 rounded-xl border border-amber-200">
                                        <Castle className="text-amber-600 mb-4" size={48} />
                                        <h3 className="text-xl font-bold text-gray-800 mb-3">Forte Dom Pedro II</h3>
                                        <p className="text-gray-600">
                                            Construído em 1846, o forte representa a importância estratégica militar 
                                            de Caçapava na defesa das fronteiras sulinas do Império.
                                        </p>
                                    </div>

                                    <div className="bg-gradient-to-br from-red-50 to-pink-50 p-6 rounded-xl border border-red-200">
                                        <BookOpen className="text-red-600 mb-4" size={48} />
                                        <h3 className="text-xl font-bold text-gray-800 mb-3">Capital Farroupilha</h3>
                                        <p className="text-gray-600">
                                            Durante a Revolução Farroupilha (1835-1845), serviu como segunda capital 
                                            da República Rio-Grandense, sedimentando sua importância política.
                                        </p>
                                    </div>

                                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200">
                                        <Award className="text-blue-600 mb-4" size={48} />
                                        <h3 className="text-xl font-bold text-gray-800 mb-3">Era Moderna</h3>
                                        <p className="text-gray-600">
                                            O reconhecimento como Capital da Geodiversidade em 2006 foi apenas o início. 
                                            A conquista da certificação UNESCO Global Geopark em 2023 marca uma nova era 
                                            focada no turismo científico internacional, geoturismo sustentável e preservação 
                                            do patrimônio geológico mundial.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'mining' && (
                            <div className="space-y-12">
                                <div className="text-center mb-12">
                                    <h2 className="text-4xl font-bold text-gray-800 mb-4">
                                        Minas do Camaquã: Um Legado de Mais de 150 Anos
                                    </h2>
                                    <p className="text-xl text-gray-600">
                                        Da descoberta do cobre à moderna extração de calcário, a mineração moldou 
                                        a identidade e o desenvolvimento de Caçapava do Sul
                                    </p>
                                </div>

                                {/* Mining History Cards */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    {miningHistory.map((mining, index) => (
                                        <div key={index} className="bg-gradient-to-br from-gray-50 to-blue-50 p-8 rounded-xl border shadow-lg hover:shadow-xl transition-all duration-300">
                                            <div className="flex items-center mb-4">
                                                <Gem className="text-blue-600 mr-3" size={32} />
                                                <h3 className="text-2xl font-bold text-gray-800">{mining.mineral}</h3>
                                            </div>
                                            
                                            <div className="space-y-4">
                                                <div>
                                                    <span className="font-semibold text-gray-700">Período:</span>
                                                    <span className="ml-2 text-gray-600">{mining.period}</span>
                                                </div>
                                                <div>
                                                    <span className="font-semibold text-gray-700">Produção:</span>
                                                    <span className="ml-2 text-gray-600">{mining.production}</span>
                                                </div>
                                                <div>
                                                    <span className="font-semibold text-gray-700">Impacto:</span>
                                                    <p className="text-gray-600 mt-1">{mining.impact}</p>
                                                </div>
                                                <div className="pt-2 border-t border-gray-200">
                                                    <span className="font-semibold text-gray-700">Status Atual:</span>
                                                    <p className="text-gray-600 mt-1">{mining.currentStatus}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Calcário Section */}
                                <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 rounded-2xl">
                                    <h3 className="text-3xl font-bold mb-6 text-center">
                                        Calcário: O Ouro Branco de Caçapava
                                    </h3>
                                    
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                        <div>
                                            <h4 className="text-xl font-semibold mb-4">Características Geológicas</h4>
                                            <ul className="space-y-2 text-blue-100">
                                                <li>• <strong>Formação:</strong> Período Permiano (250-300 milhões de anos)</li>
                                                <li>• <strong>Composição:</strong> 95% CaCO₃ (carbonato de cálcio)</li>
                                                <li>• <strong>Pureza:</strong> Uma das mais altas do Brasil</li>
                                                <li>• <strong>Reservas:</strong> Estimadas em 500 milhões de toneladas</li>
                                            </ul>
                                        </div>
                                        
                                        <div>
                                            <h4 className="text-xl font-semibold mb-4">Aplicações Industriais</h4>
                                            <ul className="space-y-2 text-blue-100">
                                                <li>• <strong>Cimento:</strong> Principal matéria-prima regional</li>
                                                <li>• <strong>Siderurgia:</strong> Fundente na produção de aço</li>
                                                <li>• <strong>Agricultura:</strong> Correção de pH do solo</li>
                                                <li>• <strong>Química:</strong> Produção de cal e derivados</li>
                                            </ul>
                                        </div>
                                    </div>

                                    <div className="mt-8 p-6 bg-white/10 rounded-lg backdrop-blur-sm">
                                        <h4 className="text-xl font-semibold mb-3">Sustentabilidade e Futuro</h4>
                                        <p className="text-blue-100">
                                            As modernas técnicas de extração de calcário em Caçapava seguem rigorosos 
                                            protocolos ambientais, incluindo recuperação de áreas degradadas, 
                                            monitoramento da qualidade do ar e água, e programas de reflorestamento. 
                                            O objetivo é manter a atividade econômica em harmonia com a preservação 
                                            do patrimônio geológico único da região.
                                        </p>
                                    </div>
                                </div>

                                {/* Mine Tour Section */}
                                <div className="bg-gray-900 text-white p-8 rounded-2xl">
                                    <h3 className="text-3xl font-bold mb-6 text-center">
                                        Tour pelas Minas: Uma Viagem ao Centro da Terra
                                    </h3>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        <div className="text-center p-4">
                                            <Clock className="mx-auto mb-4 text-yellow-400" size={48} />
                                            <h4 className="text-xl font-semibold mb-2">Duração</h4>
                                            <p className="text-gray-300">3 horas de experiência completa</p>
                                        </div>
                                        
                                        <div className="text-center p-4">
                                            <Users className="mx-auto mb-4 text-green-400" size={48} />
                                            <h4 className="text-xl font-semibold mb-2">Grupos</h4>
                                            <p className="text-gray-300">Máximo 15 pessoas por tour</p>
                                        </div>
                                        
                                        <div className="text-center p-4">
                                            <Star className="mx-auto mb-4 text-blue-400" size={48} />
                                            <h4 className="text-xl font-semibold mb-2">Experiência</h4>
                                            <p className="text-gray-300">Guias especializados em geologia</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'geology' && (
                            <div className="space-y-12">
                                <div className="text-center mb-12">
                                    <h2 className="text-4xl font-bold text-gray-800 mb-4">
                                        Geodiversidade: 2 Bilhões de Anos em Exposição
                                    </h2>
                                    <p className="text-xl text-gray-600">
                                        Caçapava abriga uma das mais impressionantes coleções naturais de formações geológicas do mundo
                                    </p>
                                </div>

                                {/* Geological Formations */}
                                <div className="space-y-8">
                                    {geologicalFormations.map((formation, index) => (
                                        <div key={index} className="bg-gradient-to-r from-purple-50 to-blue-50 p-8 rounded-xl border shadow-lg">
                                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                                <div className="lg:col-span-2">
                                                    <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                                                        <Mountain className="mr-3 text-purple-600" />
                                                        {formation.name}
                                                    </h3>
                                                    
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                                                        <div>
                                                            <span className="font-semibold text-gray-700">Idade:</span>
                                                            <span className="ml-2 text-gray-600">{formation.age}</span>
                                                        </div>
                                                        <div>
                                                            <span className="font-semibold text-gray-700">Composição:</span>
                                                            <span className="ml-2 text-gray-600">{formation.composition}</span>
                                                        </div>
                                                    </div>
                                                    
                                                    <p className="text-gray-600 leading-relaxed">{formation.significance}</p>
                                                    
                                                    <button className="mt-4 flex items-center space-x-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-all duration-300">
                                                        <MapPin size={16} />
                                                        <span>Ver no Mapa</span>
                                                    </button>
                                                </div>
                                                
                                                <div className="relative">
                                                    <div className="aspect-square bg-gray-200 rounded-lg overflow-hidden">
                                                        <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center">
                                                            <Camera className="text-gray-500" size={48} />
                                                        </div>
                                                    </div>
                                                    <div className="absolute top-2 right-2 bg-black/50 text-white px-2 py-1 rounded text-sm">
                                                        {formation.age}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Geological Timeline */}
                                <div className="bg-gray-900 text-white p-8 rounded-2xl">
                                    <h3 className="text-3xl font-bold mb-8 text-center">
                                        Linha do Tempo Geológica de Caçapava
                                    </h3>
                                    
                                    <div className="space-y-6">
                                        <div className="flex items-center">
                                            <div className="w-32 text-yellow-400 font-bold">2 Bi anos</div>
                                            <div className="flex-1 bg-gradient-to-r from-yellow-600 to-orange-600 h-2 rounded mr-4"></div>
                                            <div className="w-48 text-sm">Complexo Encantadas (rochas mais antigas)</div>
                                        </div>
                                        
                                        <div className="flex items-center">
                                            <div className="w-32 text-green-400 font-bold">600 Mi anos</div>
                                            <div className="flex-1 bg-gradient-to-r from-green-600 to-blue-600 h-2 rounded mr-4"></div>
                                            <div className="w-48 text-sm">Granitos e metamórficas do Escudo</div>
                                        </div>
                                        
                                        <div className="flex items-center">
                                            <div className="w-32 text-purple-400 font-bold">550 Mi anos</div>
                                            <div className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 h-2 rounded mr-4"></div>
                                            <div className="w-48 text-sm">Formação das Guaritas</div>
                                        </div>
                                        
                                        <div className="flex items-center">
                                            <div className="w-32 text-blue-400 font-bold">250 Mi anos</div>
                                            <div className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 h-2 rounded mr-4"></div>
                                            <div className="w-48 text-sm">Depósitos de calcário</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'culture' && (
                            <div className="space-y-12">
                                <div className="text-center mb-12">
                                    <h2 className="text-4xl font-bold text-gray-800 mb-4">
                                        Cultura e Tradições: A Alma Caçapavana
                                    </h2>
                                    <p className="text-xl text-gray-600">
                                        Entre lendas, festivais e tradições que atravessam gerações
                                    </p>
                                </div>

                                {/* Cultural Highlights */}
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    <div className="bg-gradient-to-br from-red-50 to-pink-50 p-6 rounded-xl border border-red-200 hover:shadow-lg transition-all duration-300">
                                        <Star className="text-red-600 mb-4" size={48} />
                                        <h3 className="text-xl font-bold text-gray-800 mb-3">Festivais Tradicionais</h3>
                                        <p className="text-gray-600 mb-4">
                                            O Festival de Inverno e a Feira do Livro são eventos que celebram a rica cultura local.
                                        </p>
                                        <button className="flex items-center text-red-600 hover:text-red-700 font-medium">
                                            <span>Saiba mais</span>
                                            <ArrowRight className="ml-2" size={16} />
                                        </button>
                                    </div>

                                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl border border-green-200 hover:shadow-lg transition-all duration-300">
                                        <Mountain className="text-green-600 mb-4" size={48} />
                                        <h3 className="text-xl font-bold text-gray-800 mb-3">Lendas e Mistérios</h3>
                                        <p className="text-gray-600 mb-4">
                                            A Pedra do Segredo e outras formações rochosas guardam histórias ancestrais.
                                        </p>
                                        <button className="flex items-center text-green-600 hover:text-green-700 font-medium">
                                            <span>Explorar</span>
                                            <ArrowRight className="ml-2" size={16} />
                                        </button>
                                    </div>

                                    <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-xl border border-blue-200 hover:shadow-lg transition-all duration-300">
                                        <Users className="text-blue-600 mb-4" size={48} />
                                        <h3 className="text-xl font-bold text-gray-800 mb-3">Comunidade</h3>
                                        <p className="text-gray-600 mb-4">
                                            O espírito hospitaleiro e a preservação das tradições gaúchas.
                                        </p>
                                        <button className="flex items-center text-blue-600 hover:text-blue-700 font-medium">
                                            <span>Conhecer</span>
                                            <ArrowRight className="ml-2" size={16} />
                                        </button>
                                    </div>
                                </div>

                                {/* Interactive Culture Map */}
                                <div className="bg-gray-900 text-white p-8 rounded-2xl">
                                    <h3 className="text-2xl font-bold mb-6 text-center">
                                        Mapa Cultural Interativo
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div>
                                            <h4 className="text-lg font-semibold mb-4 text-yellow-400">Patrimônio Histórico</h4>
                                            <ul className="space-y-2 text-gray-300">
                                                <li>• Igreja Matriz Nossa Senhora da Assunção</li>
                                                <li>• Museu Municipal</li>
                                                <li>• Casa de Cultura</li>
                                                <li>• Centro Histórico</li>
                                            </ul>
                                        </div>
                                        <div>
                                            <h4 className="text-lg font-semibold mb-4 text-green-400">Eventos Anuais</h4>
                                            <ul className="space-y-2 text-gray-300">
                                                <li>• Festival de Inverno (Julho)</li>
                                                <li>• Feira do Livro (Setembro)</li>
                                                <li>• Semana Farroupilha (Setembro)</li>
                                                <li>• Festa da Geodiversidade (Outubro)</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="py-16 bg-gradient-to-r from-green-600 to-blue-600 text-white">
                <div className="max-w-4xl mx-auto text-center px-4">
                    <h2 className="text-4xl font-bold mb-6">
                        Descubra Caçapava do Sul
                    </h2>
                    <p className="text-xl mb-8 opacity-90">
                        Venha conhecer pessoalmente este tesouro geológico e cultural único no mundo
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <button className="bg-white text-green-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center">
                            <Calendar className="mr-2" size={20} />
                            Agendar Visita
                        </button>
                        <button className="bg-green-700 hover:bg-green-800 px-8 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center">
                            <MapPin className="mr-2" size={20} />
                            Ver Roteiros
                        </button>
                        <button className="bg-blue-700 hover:bg-blue-800 px-8 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center">
                            <Info className="mr-2" size={20} />
                            Mais Informações
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AboutCityPage;
