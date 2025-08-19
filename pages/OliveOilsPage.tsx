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

      {/* Turismo & Pontos Turísticos */}
      <section>
        <h2 className="text-2xl font-bold text-brand-green mb-4 flex items-center gap-2">
          <MapPin className="w-6 h-6 text-green-600" />
          Turismo & Atrativos
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow p-5 border border-gray-100">
            <h4 className="font-semibold text-brand-dark-green mb-2">Pedra do Segredo</h4>
            <p className="text-gray-600 text-sm">
              Principal cartão-postal da cidade e centro do olivoturismo regional.
            </p>
          </div>
          <div className="bg-white rounded-xl shadow p-5 border border-gray-100">
            <h4 className="font-semibold text-brand-dark-green mb-2">Guaritas do Camaquã</h4>
            <p className="text-gray-600 text-sm">
              Formações rochosas às margens do Rio Camaquã, geossítio de importância mundial.
            </p>
          </div>
          <div className="bg-white rounded-xl shadow p-5 border border-gray-100">
            <h4 className="font-semibold text-brand-dark-green mb-2">Geoparque Mundial UNESCO</h4>
            <p className="text-gray-600 text-sm">
              Capital Gaúcha da Geodiversidade com diversos geossítios e formações geológicas únicas.
            </p>
          </div>
        </div>
        <div className="mt-4">
          <Link to="/routes" className="inline-flex items-center gap-2 text-green-700 hover:underline font-medium">
            Ver todos os atrativos <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Gastronomia */}
      <section>
        <h2 className="text-2xl font-bold text-brand-green mb-4 flex items-center gap-2">
          <Users className="w-6 h-6 text-green-600" />
          Gastronomia Local
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow p-5 border border-gray-100">
            <h4 className="font-semibold text-brand-dark-green mb-2">Churrascaria 21</h4>
            <p className="text-gray-600 text-sm mb-2">
              Tradição em carnes e costela fogo de chão, ambiente familiar com pratos da culinária gaúcha.
            </p>
            <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Churrascaria</span>
          </div>
          <div className="bg-white rounded-xl shadow p-5 border border-gray-100">
            <h4 className="font-semibold text-brand-dark-green mb-2">Cantina Irmãos Micheletto</h4>
            <p className="text-gray-600 text-sm mb-2">
              Culinária italiana com massas e ambiente aconchegante.
            </p>
            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">Italiana</span>
          </div>
        </div>
        <div className="bg-green-50 rounded-xl p-4 mt-6">
          <h4 className="font-semibold text-brand-dark-green mb-2">Influência do Azeite na Gastronomia Local</h4>
          <p className="text-gray-700 text-sm">
            Os restaurantes locais incorporam os azeites premiados da região em seus pratos, criando uma identidade gastronômica única que valoriza os produtos locais.
          </p>
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
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-lg p-5 border border-gray-100">
            <h4 className="font-semibold text-brand-dark-green mb-2">Pousada Olival Vila do Segredo</h4>
            <p className="text-gray-600 text-sm mb-2">
              Experiência no Vale da Pedra do Segredo, rodeada por olivais.
            </p>
            <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Turismo Rural</span>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-5 border border-gray-100">
            <h4 className="font-semibold text-brand-dark-green mb-2">Cyro Palace Hotel</h4>
            <p className="text-gray-600 text-sm mb-2">
              Hotel no centro da cidade.
            </p>
            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">Hotel</span>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-5 border border-gray-100">
            <h4 className="font-semibold text-brand-dark-green mb-2">Chácara do Forte</h4>
            <p className="text-gray-600 text-sm mb-2">
              Ambiente rural com experiências de ecoturismo.
            </p>
            <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Ecoturismo</span>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-5 border border-gray-100">
            <h4 className="font-semibold text-brand-dark-green mb-2">Pousada Bellamina</h4>
            <p className="text-gray-600 text-sm mb-2">
              Pousada com café da manhã caseiro.
            </p>
            <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded">Pousada</span>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-5 border border-gray-100">
            <h4 className="font-semibold text-brand-dark-green mb-2">Hotel Karlton</h4>
            <p className="text-gray-600 text-sm mb-2">
              Hospedagem com localização central.
            </p>
            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">Hotel</span>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-5 border border-gray-100">
            <h4 className="font-semibold text-brand-dark-green mb-2">Portal do Pampa</h4>
            <p className="text-gray-600 text-sm mb-2">
              Estilo campeiro com vista para o campo.
            </p>
            <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">Rural</span>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-5 border border-gray-100">
            <h4 className="font-semibold text-brand-dark-green mb-2">Novo Hotel</h4>
            <p className="text-gray-600 text-sm mb-2">
              Opção econômica no centro.
            </p>
            <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded">Econômico</span>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-5 border border-gray-100">
            <h4 className="font-semibold text-brand-dark-green mb-2">Guaritas Hostel</h4>
            <p className="text-gray-600 text-sm mb-2">
              Ambiente jovem para mochileiros.
            </p>
            <span className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded">Hostel</span>
          </div>
        </div>
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
