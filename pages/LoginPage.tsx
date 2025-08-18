import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import MapOutlineIcon from '../components/MapOutlineIcon';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await login(email, password);
    
    setLoading(false);

    if (result.success) {
        switch(result.role) {
            case 'tourist':
                navigate(from === '/login' || from.startsWith('/admin') || from.startsWith('/hotel') ? '/' : from, { replace: true });
                break;
            case 'secretaria':
                navigate('/admin');
                break;
            case 'hotel':
                navigate('/hotel');
                break;
            default:
                navigate('/');
        }
    } else {
      setError('Email ou senha inválidos. Por favor, tente novamente.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-dark-green p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
            <div className="inline-block w-24 h-24 text-brand-light-green">
              <MapOutlineIcon />
            </div>
             <div className="text-brand-beige">
              <div className="font-display tracking-wider text-3xl leading-none">VISITE</div>
              <div className="font-black text-4xl leading-none -mt-1">CAÇAPAVA</div>
              <div className="font-semibold text-xl leading-none">DO SUL</div>
            </div>
        </div>
        
        <div className="bg-brand-beige p-8 rounded-2xl shadow-2xl">
          <h2 className="text-2xl font-bold text-center text-brand-dark-green mb-6">Login</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-brand-green focus:border-brand-green sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="password"className="block text-sm font-medium text-gray-700">Senha</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-brand-green focus:border-brand-green sm:text-sm"
              />
            </div>
            
            {error && <p className="text-brand-red text-sm">{error}</p>}

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-brand-green hover:bg-brand-dark-green focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-light-green disabled:bg-gray-400"
              >
                {loading ? 'Entrando...' : 'Entrar'}
              </button>
            </div>
          </form>
           <div className="mt-6 p-4 bg-green-50 border-l-4 border-brand-green rounded-r-lg text-sm">
                <p className="font-bold">Para demonstração, use:</p>
                <ul className="list-disc list-inside mt-1 text-gray-700">
                    <li><strong className="font-semibold">Turista:</strong> turista@email.com</li>
                    <li><strong className="font-semibold">Hotel:</strong> hotel@email.com</li>
                    <li><strong className="font-semibold">Admin:</strong> secretaria@email.com</li>
                </ul>
                <p className="mt-2">A senha para todos é: <strong className="font-semibold">senha123</strong></p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
