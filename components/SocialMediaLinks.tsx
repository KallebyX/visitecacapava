import React from 'react';
import { FaWhatsapp, FaInstagram, FaFacebook, FaGlobe, FaPhone } from 'react-icons/fa';

interface SocialMediaLinksProps {
  whatsapp?: string;
  instagram?: string;
  facebook?: string;
  website?: string;
  phone?: string;
  restaurantName: string;
}

const SocialMediaLinks: React.FC<SocialMediaLinksProps> = ({
  whatsapp,
  instagram,
  facebook,
  website,
  phone,
  restaurantName
}) => {
  const handleWhatsappClick = () => {
    if (whatsapp) {
      const message = encodeURIComponent(`Olá! Gostaria de saber mais sobre o ${restaurantName}.`);
      window.open(`https://wa.me/${whatsapp}?text=${message}`, '_blank');
    }
  };

  const handlePhoneClick = () => {
    if (phone) {
      window.open(`tel:${phone}`, '_self');
    }
  };

  const handleInstagramClick = () => {
    if (instagram) {
      const username = instagram.startsWith('@') ? instagram.slice(1) : instagram;
      window.open(`https://instagram.com/${username}`, '_blank');
    }
  };

  const handleFacebookClick = () => {
    if (facebook) {
      window.open(`https://facebook.com/${facebook}`, '_blank');
    }
  };

  const handleWebsiteClick = () => {
    if (website) {
      window.open(website, '_blank');
    }
  };

  return (
    <div className="flex flex-wrap gap-3 mt-4">
      {phone && (
        <button
          onClick={handlePhoneClick}
          className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
          title={`Ligar para ${restaurantName}`}
        >
          <FaPhone size={14} />
          <span className="hidden sm:inline">Ligar</span>
        </button>
      )}
      
      {whatsapp && (
        <button
          onClick={handleWhatsappClick}
          className="flex items-center gap-2 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
          title={`WhatsApp do ${restaurantName}`}
        >
          <FaWhatsapp size={14} />
          <span className="hidden sm:inline">WhatsApp</span>
        </button>
      )}
      
      {instagram && (
        <button
          onClick={handleInstagramClick}
          className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-colors text-sm"
          title={`Instagram do ${restaurantName}`}
        >
          <FaInstagram size={14} />
          <span className="hidden sm:inline">Instagram</span>
        </button>
      )}
      
      {facebook && (
        <button
          onClick={handleFacebookClick}
          className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
          title={`Facebook do ${restaurantName}`}
        >
          <FaFacebook size={14} />
          <span className="hidden sm:inline">Facebook</span>
        </button>
      )}
      
      {website && (
        <button
          onClick={handleWebsiteClick}
          className="flex items-center gap-2 px-3 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm"
          title={`Site do ${restaurantName}`}
        >
          <FaGlobe size={14} />
          <span className="hidden sm:inline">Site</span>
        </button>
      )}
    </div>
  );
};

export default SocialMediaLinks;
