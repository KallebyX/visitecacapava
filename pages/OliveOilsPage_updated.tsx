import React from 'react';
import { Award, Leaf, MapPin, Star, Users, Calendar, Building2, Home, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const oliveOilProducers = [
  {
    name: 'Prosperato',
    highlights: [
      'Marca mais premiada do Brasil (~300 prêmios)',
      'Reconhecida pelo guia Flos Olei (Itália) com 95/100 pontos em 2024 e 97/100 em 2025',
      'Líder do EVOO World Ranking 2024 como melhor produtora do hemisfério sul',
      'Selo Ouro de Azeite Extravirgem Premium RS',
      'Premiada em concursos na Itália, Grécia, EUA, Japão, Argentina e Israel',
      'Empório com degustação na BR-290 (Vila Progresso)',
      'Exporta para EUA e outros países',
      'Produção: ~200 ha, 35 mil litros/ano',
      'Experiência turística: degustação, loja, visitação',
    ],
    description: 'Líder nacional em prêmios e inovação, referência em qualidade e exportação. Destaque no Flos Olei e EVOO World Ranking. Empório aberto ao público com degustações.',
    awards: [
      'EVO IOOC 2024 – Ouro (Itália)',
      'Athena IOOC 2024 – Prata (Grécia)',
      'NYIOOC 2020 – Prata (EUA)',
      'Japan IOOC 2019 – Ouro',
      'Best in Class – NYIOOC 2019 – Ouro',
      'Gran Prestigio Oro – Olivinus 2017 (Argentina)',
      'Ouro – Terraolivo 2017 (Israel)',
      'Menção Honrosa – Leone d’oro dei Mastri Oleari 2017 (Itália)'
    ],
    website: 'https://prosperato.com.br',
    location: 'BR-290, Vila Progresso, Caçapava do Sul',
  },
  {
    name: 'Don José',
    highlights: [
      'Produção manual e comunitária na Fazenda Pitangueira',
      'Premiado com Selo Ibraoliva — Produtos Premium RS',
      'Tradição, autenticidade e turismo rural',
    ],
    description: 'Marca criada em Caçapava do Sul, símbolo de produção familiar e comunitária, premiada e com forte ligação ao turismo rural.',
    awards: ['Selo Ibraoliva – Produtos Premium RS'],
    website: '',
    location: 'Fazenda Pitangueira, Caçapava do Sul',
  },
  {
    name: 'Alma do Segredo',
    highlights: [
      'Produção no Vale da Pedra do Segredo',
      'Azeite extra virgem, perfil sensorial equilibrado',
      'Notas de alcachofra, tomate, frutas frescas',
      'Processo mecânico a frio',
      'Premiado em concursos nacionais',
    ],
    description: 'Azeite de edição limitada, com perfil sensorial delicado e foco em certificações orgânicas. Premiado e referência gourmet local.',
    awards: ['Medalha de ouro em concurso nacional (2023)'],
    website: '',
    location: 'Vale da Pedra do Segredo, Caçapava do Sul',
  },
  // Outros produtores podem ser adicionados aqui
];

const otherProducers = [
  'Vila do Segredo',
  'Costi Olivos',
  'Nuance',
  'Guaritas',
  'Cerro dos Olivais',
  'Olivas São Pedro',
  'Olivas da Coxilha',
];

const OliveOilsPage: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto py-10 px-4 space-y-12">
      {/* Introdução */}
      <section className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-extrabold text-brand-dark-green mb-2 flex items-center justify-center gap-3">
          <Leaf className="w-10 h-10 text-green-600" />
          Azeites de Caçapava do Sul
        </h1>
        <p className="text-lg text-gray-700 max-w-3xl mx-auto">
          Caçapava do Sul é referência nacional e internacional em azeite de oliva extravirgem, unindo tradição, inovação e sustentabilidade. Reconhecida como Geoparque Mundial da UNESCO e Capital Gaúcha da Geodiversidade, a cidade lidera a produção e a qualidade do azeite brasileiro, com marcas premiadas e experiências únicas de olivoturismo.
        </p>
      </section>

      {/* Destaque dos principais produtores */}
      <section>
        <h2 className="text-2xl font-bold text-brand-green mb-6 flex items-center gap-2">
          <Award className="w-6 h-6 text-yellow-500" />
          Destaques e Reconhecimento Internacional
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          {oliveOilProducers.map((producer) => (
            <div key={producer.name} className="bg-white rounded-2xl shadow-lg p-6 border border-green-100 flex flex-col gap-3">
              <div className="flex items-center gap-3 mb-2">
                <Leaf className="w-6 h-6 text-green-600" />
                <h3 className="text-xl font-bold text-brand-dark-green">{producer.name}</h3>
              </div>
              <p className="text-gray-700 mb-2">{producer.description}</p>
              <ul className="list-disc ml-6 text-gray-600 text-sm mb-2">
                {producer.highlights.map((h, i) => <li key={i}>{h}</li>)}
              </ul>
              {producer.awards && (
                <div className="mb-2">
                  <span className="font-semibold text-green-700">Prêmios:</span>
                  <ul className="list-disc ml-6 text-gray-600 text-sm">
                    {producer.awards.map((a, i) => <li key={i}>{a}</li>)}
                  </ul>
                </div>
              )}
              {producer.website && (
                <a href={producer.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-sm">Site oficial</a>
              )}
              <div className="flex items-center gap-2 text-gray-500 text-xs mt-2">
                <MapPin className="w-4 h-4" /> {producer.location}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8">
          <h4 className="font-semibold text-brand-green mb-2">Outros produtores locais:</h4>
          <ul className="flex flex-wrap gap-3 text-gray-700 text-sm">
            {otherProducers.map((name) => (
              <li key={name} className="bg-green-50 px-3 py-1 rounded-full border border-green-100">{name}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* Fenazeite */}
      <section>
        <h2 className="text-2xl font-bold text-brand-green mb-4 flex items-center gap-2">
          <Calendar className="w-6 h-6 text-green-600" />
          Festa Nacional do Azeite de Oliva (Fenazeite)
        </h2>
        <p className="text-gray-700 mb-4">
          A Fenazeite é o maior evento anual de Caçapava do Sul, celebrando a cultura olivícola local. Em 2024, a 3ª edição reuniu cerca de 30 mil visitantes, com degustações, feira da agricultura familiar, shows, palestras, oficinas e passeios turísticos aos olivais. O evento fortalece a identidade local e projeta Caçapava como referência nacional e internacional em azeite de oliva.
        </p>
        <ul className="list-disc ml-6 text-gray-600 text-sm mb-4">
          <li>Mais de 20 mil pessoas em 2024, mesmo com chuva</li>
          <li>Expositores de artesanato e agricultura familiar, experiências gastronômicas e shows culturais</li>
          <li>Passeios turísticos a olivais e geossítios</li>
          <li>Próxima edição: novembro de 2025</li>
        </ul>
        <div className="flex flex-wrap gap-3 mt-2">
          <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs">Identidade local</span>
          <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs">Turismo & Gastronomia</span>
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs">Reconhecimento internacional</span>
        </div>
      </section>

      {/* Links para outras seções */}
      <section className="grid md:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl shadow p-6 border border-gray-100 flex flex-col gap-2">
          <h3 className="font-semibold text-brand-dark-green flex items-center gap-2 mb-2"><Home className="w-5 h-5 text-green-600" /> Turismo & Pontos Turísticos</h3>
          <p className="text-gray-600 text-sm mb-2">Descubra as belezas naturais, geossítios e monumentos históricos de Caçapava do Sul, Geoparque Mundial da UNESCO e Capital Gaúcha da Geodiversidade.</p>
          <Link to="/routes" className="text-green-700 hover:underline flex items-center gap-1 text-sm font-medium">Ver atrativos <ChevronRight className="w-4 h-4" /></Link>
        </div>
        <div className="bg-white rounded-2xl shadow p-6 border border-gray-100 flex flex-col gap-2">
          <h3 className="font-semibold text-brand-dark-green flex items-center gap-2 mb-2"><Users className="w-5 h-5 text-green-600" /> Gastronomia Local</h3>
          <p className="text-gray-600 text-sm mb-2">Sabores autênticos: churrascarias, restaurantes, cafés e a influência do azeite de oliva na culinária regional.</p>
          <Link to="/restaurants" className="text-green-700 hover:underline flex items-center gap-1 text-sm font-medium">Ver restaurantes <ChevronRight className="w-4 h-4" /></Link>
        </div>
      </section>

      {/* Indústrias de Calcário */}
      <section>
        <h2 className="text-2xl font-bold text-brand-green mb-4 flex items-center gap-2">
          <Building2 className="w-6 h-6 text-gray-500" />
          Indústrias de Calcário
        </h2>
        <p className="text-gray-700 mb-2">
          Caçapava do Sul é a Capital Nacional do Calcário, responsável por cerca de 80% do calcário produzido no RS. Empresas como Inducal, Dagoberto Barcellos, FIDA, Sangalli e outras sustentam a economia local há décadas, empregando centenas de trabalhadores e impulsionando a agropecuária gaúcha.
        </p>
      </section>

      {/* Hospedagem */}
      <section>
        <h2 className="text-2xl font-bold text-brand-green mb-4 flex items-center gap-2">
          <Home className="w-6 h-6 text-green-600" />
          Hospedagem & Experiências
        </h2>
        <p className="text-gray-700 mb-2">
          De pousadas rurais charmosas a hotéis urbanos, Caçapava do Sul oferece opções para todos os perfis de viajantes. Destaque para a Pousada Olival Vila do Segredo, Cyro Palace Hotel, Chácara do Forte, Bellamina, Karlton, Portal do Pampa, Novo Hotel e Guaritas Hostel.
        </p>
      </section>

      {/* Fontes */}
      <section className="text-xs text-gray-500 mt-8">
        <div className="font-semibold mb-1">Fontes:</div>
        <ul className="list-disc ml-6">
          <li>Secretaria de Turismo/Geoparque Caçapava</li>
          <li>TravelTerapia, Pedra do Segredo, Portal Farrapo, Gazeta de Caçapava, Forbes Brasil, Ibraoliva</li>
          <li>Sites institucionais das indústrias de calcário e azeite</li>
          <li>TripAdvisor, Facebook/Instagram oficiais, Prefeitura</li>
        </ul>
        <div className="mt-2">Atualizado em agosto de 2025</div>
      </section>
    </div>
  );
};

export default OliveOilsPage;
