
import { MessageSquare, X } from 'lucide-react';
import { useState } from 'react';

const FloatingWhatsApp = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  const whatsappMessage = encodeURIComponent(
    "Hi! I'm interested in Mithila Bazaar. Please tell me more about your services and franchise opportunities."
  );
  
  const whatsappNumber = "+917070848333";

  const handleWhatsAppClick = () => {
    window.open(`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`, '_blank');
    setIsOpen(false);
  };

  return (
    <>
      {/* Floating Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110 animate-bounce"
          aria-label="WhatsApp Support"
        >
          {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
        </button>
      </div>

      {/* Chat Popup */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-40 bg-white rounded-2xl shadow-2xl border border-gray-200 w-80 max-w-[calc(100vw-3rem)] animate-scale-in">
          <div className="bg-green-500 text-white p-4 rounded-t-2xl">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <MessageSquare size={20} />
              </div>
              <div>
                <h3 className="font-bold">मिथिला बाज़ार Support</h3>
                <p className="text-sm text-green-100">Typically replies instantly</p>
              </div>
            </div>
          </div>
          <div className="p-4">
            <div className="bg-gray-100 rounded-lg p-3 mb-4">
              <p className="text-sm text-gray-700">
                नमस्ते! How can we help you today? Ask about our products, franchise opportunities, or store locations.
              </p>
            </div>
            <button
              onClick={handleWhatsAppClick}
              className="w-full bg-green-500 hover:bg-green-600 text-white py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
            >
              <MessageSquare size={18} />
              <span>Start WhatsApp Chat</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default FloatingWhatsApp;
