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
    const [validationErrors, setValidationErrors] = useState<string[]>([]);
    
    // Calculate date constraints
    const today = new Date().toISOString().split('T')[0];
    const minBirthDate = '1900-01-01';
    const minCheckOutDate = formState.checkInDate ? 
        new Date(formState.checkInDate).toISOString().split('T')[0] : today;
    
    const validateForm = (): string[] => {
        const errors: string[] = [];
        
        // Validate birth date
        if (formState.birthDate) {
            const birthDate = new Date(formState.birthDate);
            const minDate = new Date('1900-01-01');
            const maxDate = new Date();
            
            if (birthDate < minDate || birthDate > maxDate) {
                errors.push('Data de nascimento deve estar entre 1900 e hoje');
            }
        }
        
        // Validate check dates
        if (formState.checkInDate && formState.checkOutDate) {
            const checkInDate = new Date(formState.checkInDate);
            const checkOutDate = new Date(formState.checkOutDate);
            
            if (checkOutDate <= checkInDate) {
                errors.push('Data de check-out deve ser posterior ao check-in');
            }
        }
        
        return errors;
    };
    
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormState(prev => ({ ...prev, [name]: value }));
        
        // Clear validation errors when user starts typing
        if (validationErrors.length > 0) {
            setValidationErrors([]);
        }
        
        // Auto-adjust check-out date when check-in changes
        if (name === 'checkInDate' && formState.checkOutDate) {
            const checkInDate = new Date(value);
            const checkOutDate = new Date(formState.checkOutDate);
            
            if (checkOutDate <= checkInDate) {
                const nextDay = new Date(checkInDate);
                nextDay.setDate(nextDay.getDate() + 1);
                setFormState(prev => ({ 
                    ...prev, 
                    [name]: value,
                    checkOutDate: nextDay.toISOString().split('T')[0]
                }));
                return;
            }
        }
    };
    
    const handleRadioChange = (name: string, value: string) => {
        setFormState(prev => ({...prev, [name]: value}));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) return;

        // Validate form
        const errors = validateForm();
        if (errors.length > 0) {
            setValidationErrors(errors);
            return;
        }

        // Validate with backend
        if (!backendService.validateBirthDate(formState.birthDate)) {
            setValidationErrors(['Data de nascimento inválida']);
            return;
        }

        if (!backendService.validateCheckDates(formState.checkInDate, formState.checkOutDate)) {
            setValidationErrors(['Check-out deve ser posterior ao check-in']);
            return;
        }

        setSaving(true);
        setSuccess(false);
        setValidationErrors([]);
        
        const checkInData = {
            touristName: formState.touristName,
            phone: formState.phone,
            profession: formState.profession,
            nationality: formState.nationality,
            birthDate: formState.birthDate,
            gender: formState.gender,
            idDocument: formState.idDocument,
            originCity: formState.originCity,
            travelReason: formState.travelReason,
            transportMean: formState.transportMean,
            discoveryChannel: formState.discoveryChannel,
            poiOpinion: formState.poiOpinion,
            cityOpinion: formState.cityOpinion,
            checkInDate: formState.checkInDate,
            checkOutDate: formState.checkOutDate
        };

        try {
            await backendService.createHotelCheckIn(user.id, checkInData);
            setSuccess(true);
            setSaving(false);
        } catch (error) {
            setSaving(false);
            console.error('Error creating check-in:', error);
            setValidationErrors(['Erro ao registrar check-in. Tente novamente.']);
            return;
        }

        // Reset form after successful submission
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
                
                {validationErrors.length > 0 && (
                    <div className="bg-red-100 border border-red-400 text-red-700 p-4 rounded-lg mb-6">
                        <h4 className="font-semibold mb-2">Corrija os seguintes erros:</h4>
                        <ul className="list-disc list-inside space-y-1">
                            {validationErrors.map((error, index) => (
                                <li key={index}>{error}</li>
                            ))}
                        </ul>
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
                            <label htmlFor="birthDate" className="block text-sm font-medium text-gray-700">
                                Data de Nascimento
                                <span className="text-xs text-gray-500 ml-2">(Entre 1900 e hoje)</span>
                            </label>
                            <input 
                                type="date" 
                                name="birthDate" 
                                value={formState.birthDate} 
                                onChange={handleInputChange} 
                                min={minBirthDate}
                                max={today}
                                required 
                                className={inputStyle} 
                            />
                        </div>
                        <div>
                            <label htmlFor="gender" className="block text-sm font-medium text-gray-700">Sexo</label>
                            <select name="gender" value={formState.gender} onChange={handleInputChange} className={inputStyle}>
                                <option value="Masculino">Masculino</option>
                                <option value="Feminino">Feminino</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="idDocument" className="block text-sm font-medium text-gray-700">Documento de Identidade</label>
                            <input type="text" name="idDocument" value={formState.idDocument} onChange={handleInputChange} required className={inputStyle} />
                        </div>
                        <div>
                            <label htmlFor="originCity" className="block text-sm font-medium text-gray-700">Cidade de Origem</label>
                            <input type="text" name="originCity" value={formState.originCity} onChange={handleInputChange} required className={inputStyle} />
                        </div>
                        <div>
                            <label htmlFor="checkInDate" className="block text-sm font-medium text-gray-700">Data do Check-in</label>
                            <input 
                                type="datetime-local" 
                                name="checkInDate" 
                                value={formState.checkInDate} 
                                onChange={handleInputChange} 
                                min={new Date().toISOString().slice(0, 16)}
                                required 
                                className={inputStyle} 
                            />
                        </div>
                        <div>
                            <label htmlFor="checkOutDate" className="block text-sm font-medium text-gray-700">
                                Data do Check-out
                                <span className="text-xs text-gray-500 ml-2">(Deve ser posterior ao check-in)</span>
                            </label>
                            <input 
                                type="date" 
                                name="checkOutDate" 
                                value={formState.checkOutDate} 
                                onChange={handleInputChange} 
                                min={minCheckOutDate}
                                required 
                                className={inputStyle} 
                            />
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