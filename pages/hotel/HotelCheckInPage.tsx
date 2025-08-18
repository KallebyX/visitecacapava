import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { backendService } from '../../services/backendService';
import { useNavigate } from 'react-router-dom';
import type { TravelReason, TransportMean, DiscoveryChannel, OpinionScale } from '../../types';
import RadioGroup from '../../components/ui/RadioGroup';

const HotelCheckInPage: React.FC = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    
    const initialFormState = {
        touristName: '',
        phone: '',
        profession: '',
        nationality: 'Brasileira',
        birthDate: '',
        gender: 'Masculino' as 'Masculino' | 'Feminino',
        idDocument: '',
        originCity: '',
        travelReason: 'Turismo' as TravelReason,
        transportMean: 'Automóvel' as TransportMean,
        discoveryChannel: 'Rede Social' as DiscoveryChannel,
        poiOpinion: 'Boa' as OpinionScale,
        cityOpinion: 'Boa' as OpinionScale,
        checkInDate: new Date().toISOString().slice(0, 16),
        checkOutDate: '',
    };
    
    const [formState, setFormState] = useState(initialFormState);
    const [saving, setSaving] = useState(false);
    const [success, setSuccess] = useState(false);
    
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormState(prev => ({ ...prev, [name]: value }));
    };
    
    const handleRadioChange = (name: string, value: string) => {
        setFormState(prev => ({...prev, [name]: value}));
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) return;

        setSaving(true);
        setSuccess(false);
        
        const checkInData = {
            ...formState,
            checkInDate: new Date(formState.checkInDate).toISOString(),
            checkOutDate: new Date(formState.checkOutDate).toISOString()
        }

        await backendService.createHotelCheckIn(user.id, checkInData);
        
        setSaving(false);
        setSuccess(true);
        setFormState(initialFormState);

        setTimeout(() => setSuccess(false), 3000);
    };
    
    const inputStyle = "mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-brand-green focus:border-brand-green";

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6 text-brand-dark-green">Registrar Check-in de Hóspede</h1>
            <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md">
                {success && (
                    <div className="bg-brand-green text-white p-4 rounded-lg mb-6 text-center">
                        Check-in registrado com sucesso!
                    </div>
                )}
                <form onSubmit={handleSubmit} className="space-y-8">
                    <fieldset className="grid grid-cols-1 md:grid-cols-2 gap-6 border p-4 rounded-lg">
                        <legend className="text-lg font-semibold px-2">Informações Pessoais</legend>
                        <div className="md:col-span-2">
                            <label htmlFor="touristName" className="block text-sm font-medium text-gray-700">Nome Completo</label>
                            <input type="text" name="touristName" value={formState.touristName} onChange={handleInputChange} required className={inputStyle} />
                        </div>
                        <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Telefone</label>
                            <input type="tel" name="phone" value={formState.phone} onChange={handleInputChange} required className={inputStyle} />
                        </div>
                        <div>
                            <label htmlFor="profession" className="block text-sm font-medium text-gray-700">Profissão</label>
                            <input type="text" name="profession" value={formState.profession} onChange={handleInputChange} required className={inputStyle} />
                        </div>
                        <div>
                            <label htmlFor="nationality" className="block text-sm font-medium text-gray-700">Nacionalidade</label>
                            <input type="text" name="nationality" value={formState.nationality} onChange={handleInputChange} required className={inputStyle} />
                        </div>
                        <div>
                            <label htmlFor="birthDate" className="block text-sm font-medium text-gray-700">Data de Nascimento</label>
                            <input type="date" name="birthDate" value={formState.birthDate} onChange={handleInputChange} required className={inputStyle} />
                        </div>
                        <div>
                            <label htmlFor="gender" className="block text-sm font-medium text-gray-700">Sexo</label>
                            <select name="gender" value={formState.gender} onChange={handleInputChange} required className={inputStyle}>
                                <option>Masculino</option>
                                <option>Feminino</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="idDocument" className="block text-sm font-medium text-gray-700">Documento de Identidade</label>
                            <input type="text" name="idDocument" value={formState.idDocument} onChange={handleInputChange} required className={inputStyle} />
                        </div>
                         <div>
                            <label htmlFor="originCity" className="block text-sm font-medium text-gray-700">Local de Origem (Cidade/Estado)</label>
                            <input type="text" name="originCity" value={formState.originCity} onChange={handleInputChange} required className={inputStyle} />
                        </div>
                         <div>
                            <label htmlFor="checkInDate" className="block text-sm font-medium text-gray-700">Data e Hora do Check-in</label>
                            <input type="datetime-local" name="checkInDate" value={formState.checkInDate} onChange={handleInputChange} required className={inputStyle} />
                        </div>
                         <div>
                            <label htmlFor="checkOutDate" className="block text-sm font-medium text-gray-700">Data do Check-out</label>
                            <input type="date" name="checkOutDate" value={formState.checkOutDate} onChange={handleInputChange} required className={inputStyle} />
                        </div>
                    </fieldset>
                    
                    <fieldset className="space-y-6 border p-4 rounded-lg">
                         <legend className="text-lg font-semibold px-2">Sobre a Viagem</legend>
                         <RadioGroup label="Motivo da Viagem" name="travelReason" options={['Turismo', 'Negócio', 'Convenção', 'Férias', 'Outros']} value={formState.travelReason} onChange={(v) => handleRadioChange('travelReason', v)} required />
                         <RadioGroup label="Meio de Transporte" name="transportMean" options={['Automóvel', 'Ônibus', 'Outros']} value={formState.transportMean} onChange={(v) => handleRadioChange('transportMean', v)} required />
                         <RadioGroup label="Como conheceu Caçapava do Sul?" name="discoveryChannel" options={['Site', 'Jornal', 'TV', 'Indicação de amigos', 'Rede Social', 'Outros']} value={formState.discoveryChannel} onChange={(v) => handleRadioChange('discoveryChannel', v)} required />
                         <RadioGroup label="Qual a opinião sobre os Pontos Turísticos?" name="poiOpinion" options={['Péssimo', 'Ruim', 'Boa', 'Muito boa', 'Ótima']} value={formState.poiOpinion} onChange={(v) => handleRadioChange('poiOpinion', v)} required />
                         <RadioGroup label="Qual a opinião sobre a cidade como um todo?" name="cityOpinion" options={['Péssimo', 'Ruim', 'Boa', 'Muito boa', 'Ótima']} value={formState.cityOpinion} onChange={(v) => handleRadioChange('cityOpinion', v)} required />
                    </fieldset>

                    <div className="flex justify-end gap-4 pt-4">
                        <button type="submit" disabled={saving} className="bg-brand-green text-white font-bold py-2 px-6 rounded-lg hover:bg-brand-dark-green transition-colors disabled:bg-gray-400">
                            {saving ? 'Registrando...' : 'Registrar Check-in'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default HotelCheckInPage;