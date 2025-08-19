import React from 'react';
import { FaCreditCard, FaMoneyBillWave, FaMobileAlt } from 'react-icons/fa';
import { MdPix } from 'react-icons/md';
import { SiVisa, SiMastercard } from 'react-icons/si';

interface RestaurantDetailsProps {
  specialties: string[];
  paymentMethods: string[];
}

const RestaurantDetails: React.FC<RestaurantDetailsProps> = ({
  specialties,
  paymentMethods
}) => {
  const getPaymentIcon = (method: string) => {
    const methodLower = method.toLowerCase();
    
    if (methodLower.includes('pix')) return <MdPix size={16} />;
    if (methodLower.includes('cartão')) return <FaCreditCard size={16} />;
    if (methodLower.includes('dinheiro')) return <FaMoneyBillWave size={16} />;
    if (methodLower.includes('vr') || methodLower.includes('va')) return <FaMobileAlt size={16} />;
    
    return <FaCreditCard size={16} />;
  };

  return (
    <div className="mt-4 space-y-3">
      {/* Specialties */}
      {specialties.length > 0 && (
        <div>
          <h5 className="text-sm font-semibold text-gray-700 mb-2">🍽️ Especialidades</h5>
          <div className="flex flex-wrap gap-2">
            {specialties.map((specialty, index) => (
              <span 
                key={index}
                className="bg-amber-50 text-amber-700 px-3 py-1 rounded-full text-xs font-medium border border-amber-200"
              >
                {specialty}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Payment Methods */}
      {paymentMethods.length > 0 && (
        <div>
          <h5 className="text-sm font-semibold text-gray-700 mb-2">💳 Formas de Pagamento</h5>
          <div className="flex flex-wrap gap-2">
            {paymentMethods.map((method, index) => (
              <span 
                key={index}
                className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-xs font-medium border border-green-200 flex items-center gap-1"
              >
                {getPaymentIcon(method)}
                {method}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default RestaurantDetails;
