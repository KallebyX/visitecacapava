import React from 'react';
import { BookOpen, Castle, Mountain, Trees } from 'lucide-react';

const HistorySection: React.FC<{ title: string, icon: React.ReactNode, children: React.ReactNode }> = ({ title, icon, children }) => (
    <section className="mb-12">
        <div className="flex items-center mb-4">
            <div className="bg-green-100 text-green-600 p-3 rounded-full mr-4">
                {icon}
            </div>
            <h2 className="text-3xl font-bold text-slate-800">{title}</h2>
        </div>
        <div className="prose prose-lg max-w-none text-slate-700">
            {children}
        </div>
    </section>
);

const AboutCityPage: React.FC = () => {
    return (
        <div className="bg-white p-8 md:p-12 rounded-xl shadow-sm border">
            <header className="text-center mb-12">
                <h1 className="text-5xl font-extrabold text-green-700 tracking-tight">Caçapava do Sul</h1>
                <p className="mt-4 text-xl text-slate-600">A Capital Gaúcha da Geodiversidade</p>
            </header>

            <HistorySection title="Nossa História" icon={<BookOpen size={28} />}>
                <p>
                    Fundada em 1831, Caçapava do Sul tem uma história rica e profundamente entrelaçada com os eventos que moldaram o Rio Grande do Sul. 
                    A cidade foi a <strong>2ª Capital Farroupilha</strong> durante a Revolução Farroupilha, um período de grande importância histórica para o estado. 
                    Suas ruas e edifícios antigos, como o Forte Dom Pedro II, são testemunhas silenciosas de batalhas e decisões que definiram fronteiras e culturas.
                </p>
            </HistorySection>

            <HistorySection title="Pontos Turísticos Emblemáticos" icon={<Castle size={28} />}>
                <p>
                    Nossos pontos turísticos contam nossa história e revelam belezas únicas. O <strong>Forte Dom Pedro II</strong>, erguido para proteger a fronteira sul, hoje é um monumento à nossa herança militar. 
                    As <strong>Minas do Camaquã</strong>, um antigo complexo de mineração de cobre, oferecem uma paisagem quase lunar e uma fascinante viagem ao passado industrial da região. 
                    Já a <strong>Igreja Matriz Nossa Senhora da Assunção</strong> se destaca no centro da cidade com sua imponente arquitetura gótica.
                </p>
            </HistorySection>

            <HistorySection title="Lendas e Misticismo" icon={<Mountain size={28} />}>
                <p>
                    Caçapava é uma terra de lendas. A mais famosa envolve a <strong>Pedra do Segredo</strong>, uma formação rochosa que equilibra uma pedra de toneladas em um pequeno ponto de apoio. 
                    Diz a lenda que a pedra guarda segredos antigos dos povos indígenas que habitavam a região. Outro local místico são as <strong>Guaritas</strong>, com suas formações rochosas que se assemelham a sentinelas silenciosas, guardando a entrada para um mundo de paisagens deslumbrantes e energia inexplicável.
                </p>
            </HistorySection>
            
             <HistorySection title="Capital da Geodiversidade" icon={<Trees size={28} />}>
                <p>
                    Reconhecida oficialmente como a "Capital Gaúcha da Geodiversidade", Caçapava do Sul é um museu a céu aberto. 
                    A região abriga uma incrível variedade de rochas, minerais e formações geológicas que contam a história de bilhões de anos do nosso planeta. 
                    Do ouro encontrado em nossas minas às paisagens esculpidas pelo tempo no Parque das Guaritas, cada canto da cidade é uma aula de geologia e uma celebração da natureza.
                </p>
            </HistorySection>
        </div>
    );
};

export default AboutCityPage;
