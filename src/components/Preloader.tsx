import { useEffect, useState } from 'react';

const Preloader = () => {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-mithila-blue via-blue-700 to-mithila-orange transition-opacity duration-1000 ${
        fadeOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="text-center">
        <div className="relative mb-8">
          <div className="w-48 h-48 mx-auto mb-6 bg-white rounded-full flex items-center justify-center animate-pulse-slow shadow-2xl p-4">
            <img 
              src="/LOGOS_page-0002.png" 
              alt="Mithila Bazaar Logo" 
              className="w-full h-full object-contain animate-float"
            />
          </div>
          <div className="absolute -top-2 -right-2 w-8 h-8 bg-mithila-orange rounded-full animate-ping"></div>
        </div>
        <h2 className="text-4xl font-bold text-white mb-3 animate-fade-in">
          Mithila Bazaar
        </h2>
        <p className="text-xl text-white/90 font-medium animate-fade-in mb-6">
          आपका अपना मिथिला बाज़ार
        </p>
        <div className="flex justify-center">
          <div className="w-12 h-1 bg-white rounded-full overflow-hidden">
            <div className="w-full h-full bg-mithila-orange animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preloader;
