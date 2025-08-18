import React from 'react';
import Header from '../Header';
import Footer from '../Footer';

const TouristLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="bg-brand-beige min-h-screen flex flex-col font-sans text-brand-dark-green">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default TouristLayout;
